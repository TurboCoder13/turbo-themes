// SPDX-License-Identifier: MIT
/**
 * Shared loader for schema/contrast-pairs.json (#922).
 *
 * The WCAG AA normalizer, the contrast test suite, and future consumers
 * (report, helper) all resolve token paths, gradient sampling, and pair
 * levels through this module so there is exactly one answer to "what does
 * AA mean for a theme".
 *
 * Luminance maths lives here for scripts; the test suite still uses
 * test-utils.ts until #920 consolidates the duplicated helpers.
 */

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const MANIFEST_PATH = join(process.cwd(), 'schema', 'contrast-pairs.json');

/** Contrast floors by level name, mirrored by schema/contrast-pairs.schema.json. */
export const LEVELS = { text: 4.5, largeText: 3.0, nonText: 3.0 };

export function hexToRgb(hex) {
  const c = String(hex).replace('#', '');
  if (!/^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(c)) {
    throw new Error(`[contrast-pairs] unsupported color value: ${hex}`);
  }
  const n = c.length === 3 ? c.split('').map((x) => x + x).join('') : c;
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
}

export function mixHex(from, to, position) {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  return (
    '#' +
    a
      .map((v, i) =>
        Math.max(0, Math.min(255, Math.round(v + (b[i] - v) * position)))
          .toString(16)
          .padStart(2, '0'),
      )
      .join('')
  );
}

export function luminance(hex) {
  const rgb = hexToRgb(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

export function contrastRatio(a, b) {
  const La = luminance(a);
  const Lb = luminance(b);
  const [hi, lo] = La > Lb ? [La, Lb] : [Lb, La];
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Load and structurally check the manifest.
 *
 * @param {string} [path] - Manifest path; defaults to schema/contrast-pairs.json.
 * @returns {{ $version: number, levels: Record<string, number>, pairs: Array, exempt: Array }}
 */
export function loadContrastPairs(path = MANIFEST_PATH) {
  if (!existsSync(path)) {
    throw new Error(`[contrast-pairs] manifest not found: ${path}`);
  }
  const manifest = JSON.parse(readFileSync(path, 'utf8'));
  if (!manifest.$version || !manifest.levels || !Array.isArray(manifest.pairs)) {
    throw new Error(`[contrast-pairs] malformed manifest: ${path}`);
  }
  const seen = new Set();
  for (const pair of manifest.pairs) {
    if (!pair.id || seen.has(pair.id)) {
      throw new Error(`[contrast-pairs] duplicate or missing pair id: ${pair.id}`);
    }
    seen.add(pair.id);
    if (!(pair.level in LEVELS)) {
      throw new Error(`[contrast-pairs] ${pair.id}: unknown level ${pair.level}`);
    }
    if (typeof pair.normalize !== 'boolean') {
      throw new Error(`[contrast-pairs] ${pair.id}: normalize must be a boolean`);
    }
  }
  for (const item of manifest.exempt ?? []) {
    if (!item.reason || item.reason.length < 20) {
      throw new Error(
        `[contrast-pairs] exemption ${item.fg}/${item.bg} requires a substantive reason`,
      );
    }
  }
  return manifest;
}

/** Resolve a dot path ("content.codeInline.bg") to a token's $value. */
export function resolveTokenValue(tokens, path) {
  let cur = tokens;
  for (const key of path.split('.')) {
    cur = cur?.[key];
    if (cur === undefined || cur === null) return undefined;
  }
  return typeof cur === 'object' ? cur.$value : cur;
}

function resolveGradient(bg, tokens) {
  const [fromPath, toPath] = bg.gradient;
  const from = resolveTokenValue(tokens, fromPath);
  const to = resolveTokenValue(tokens, toPath);
  if (from === undefined || to === undefined) return [];
  const out = [];
  for (let i = 0; i <= bg.samples; i++) {
    out.push(mixHex(from, to, i / bg.samples));
  }
  return out;
}

/**
 * Resolve a pair's backgrounds to concrete hex samples.
 * A solid background yields [hex]; a gradient background yields `samples + 1`
 * blends of the ramp.
 */
export function pairBackgrounds(pair, tokens) {
  if (typeof pair.bg === 'string') {
    const value = resolveTokenValue(tokens, pair.bg);
    return value === undefined ? [] : [value];
  }
  return resolveGradient(pair.bg, tokens);
}

/**
 * Worst-case contrast for a pair on a theme: the minimum ratio across the
 * resolved backgrounds (a gradient's interior samples included).
 *
 * @returns {{ ok: boolean, worst: number, worstBg: string | undefined, fg: string | undefined }}
 *   `worst` is 0 and `worstBg` undefined when either side fails to resolve.
 */
export function checkPair(pair, tokens) {
  const fg = resolveTokenValue(tokens, pair.fg);
  const backgrounds = pairBackgrounds(pair, tokens);
  if (fg === undefined || backgrounds.length === 0) {
    return { ok: false, worst: 0, worstBg: undefined, fg };
  }
  let worst = Infinity;
  let worstBg;
  for (const bg of backgrounds) {
    const r = contrastRatio(fg, bg);
    if (r < worst) {
      worst = r;
      worstBg = bg;
    }
  }
  return { ok: worst >= LEVELS[pair.level], worst, worstBg, fg };
}

/**
 * Classify a pair for the normalizer:
 * - 'gradient-ink': ink audited across a sampled gradient ramp (CTA ink)
 * - 'ink-vs-backgrounds': one ink token asserted against background surfaces
 * - 'fg-bg': two sibling tokens paired with each other (code blocks, states…)
 */
export function classifyPair(pair) {
  if (typeof pair.bg === 'object') return 'gradient-ink';
  if (pair.fg.split('.').includes('background') || pair.bg.split('.').includes('background')) {
    return 'ink-vs-backgrounds';
  }
  return 'fg-bg';
}
