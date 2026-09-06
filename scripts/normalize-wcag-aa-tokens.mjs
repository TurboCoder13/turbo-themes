#!/usr/bin/env bun
/**
 * Normalize theme token JSON to strict WCAG 2.x AA contrast.
 *
 * Runs after theme:sync so vendor sync scripts cannot regress AA gates.
 * The audited pair list lives in schema/contrast-pairs.json (#922); this
 * script consumes it through scripts/lib/contrast-pairs.mjs instead of
 * hardcoding its own pair list:
 * - `normalize: true` pairs are rewritten here (text pairs keep the 4.75
 *   headroom above the manifest floors; largeText pairs use their floor).
 * - `normalize: false` pairs are gate-only: after normalization every theme
 *   is checked and the build fails if a pair no longer clears its floor.
 *
 * Ink picking prefers near-theme colors that already clear AA — it does not
 * maximize into #000/#fff when a themed pair (e.g. text.inverse on brand)
 * already meets the floor. Paired fg/bg tokens (code blocks, selection,
 * table headers) nudge the side declared in the manifest (`nudge`).
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import {
  classifyPair,
  contrastRatio as ratio,
  LEVELS,
  loadContrastPairs,
  pairBackgrounds,
  resolveTokenValue,
} from './lib/contrast-pairs.mjs';

const AA_N = 4.75; // headroom above the 4.5 text floor (sampling + AA edge cases)
const AA_L = LEVELS.largeText;
// Interior samples taken along `--gradient-primary` when auditing CTA ink.
const GRADIENT_SAMPLES = 20;
const DIR = 'schema/tokens/themes';
const EXTREMES = ['#000000', '#ffffff'];

// ---------------------------------------------------------------------------
// Manifest-driven pair routing
// ---------------------------------------------------------------------------

const manifest = loadContrastPairs();

/** Rewrite target for a normalize:true pair: text gets headroom, others their floor. */
function rewriteTarget(pair) {
  return pair.level === 'text' ? AA_N : LEVELS[pair.level];
}

/** fg -> { bgs: string[], level } for ink-vs-backgrounds pairs. */
const inkGroups = new Map();
/** code block / selection / table header style pairs. */
const fgBgPairs = [];
/** state.*Text vs state.* fill pairs. */
const statePairs = [];
/** CTA ink vs sampled gradient ramp. */
let gradientPair = null;
/** gate-only pairs, verified after all rewriting. */
const gateOnlyPairs = [];

for (const pair of manifest.pairs) {
  const kind = classifyPair(pair);
  if (!pair.normalize) {
    gateOnlyPairs.push(pair);
  } else if (kind === 'gradient-ink') {
    if (gradientPair) throw new Error(`[normalize-wcag-aa] multiple gradient pairs in manifest`);
    gradientPair = pair;
  } else if (kind === 'fg-bg') {
    if (pair.fg.startsWith('state.')) statePairs.push(pair);
    else fgBgPairs.push(pair);
  } else {
    const group = inkGroups.get(pair.fg) ?? { bgs: [], level: pair.level };
    group.bgs.push(pair.bg);
    inkGroups.set(pair.fg, group);
  }
}

if (statePairs.length > 0 && !gradientPair) {
  // The state loop nudges state.info, the CTA gradient's end stop; the brand
  // block re-audits state.infoText afterwards. Keep the pairing honest.
  console.warn('[normalize-wcag-aa] state pairs present without a gradient pair');
}

// ---------------------------------------------------------------------------
// Color maths
// ---------------------------------------------------------------------------

function hexToRgb(hex) {
  const c = String(hex).replace('#', '');
  // Anything else (8-digit alpha hex, rgb(), a colour name) would parse to NaN
  // and be written back as a corrupt token, so reject it before it spreads.
  if (!/^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(c)) {
    throw new Error(`[normalize-wcag-aa] unsupported color value: ${hex}`);
  }
  const n = c.length === 3 ? c.split('').map((x) => x + x).join('') : c;
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
}

function rgbToHex([r, g, b]) {
  return (
    '#' +
    [r, g, b]
      .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0'))
      .join('')
  );
}


function mixToward(hex, target, t) {
  const a = hexToRgb(hex);
  const b = hexToRgb(target);
  return rgbToHex(a.map((v, i) => v + (b[i] - v) * t));
}

/**
 * Sample a linear gradient into discrete backgrounds.
 *
 * Clearing AA at both stops is NOT sufficient: when the ink's luminance falls
 * between the two stops' luminances, some interior point of the ramp matches it
 * and contrast collapses there. gruvbox-light-soft did exactly that — 4.75:1
 * and 4.79:1 at the ends, 4.46:1 at 60% along. Sampling the ramp is what makes
 * the audit match what a reader actually sees on the button.
 */
function gradientRamp(from, to, steps = GRADIENT_SAMPLES) {
  if (!to) return [from];
  const out = [];
  for (let i = 0; i <= steps; i++) out.push(mixToward(from, to, i / steps));
  return out;
}

function isExtreme(hex) {
  const h = hex.toLowerCase();
  return h === '#000000' || h === '#000' || h === '#ffffff' || h === '#fff';
}

function ensureContrast(fg, bg, min) {
  if (ratio(fg, bg) >= min) return fg;
  let best = fg;
  let bestR = ratio(fg, bg);
  for (const target of EXTREMES) {
    for (let i = 1; i <= 100; i++) {
      const cand = mixToward(fg, target, i / 100);
      const r = ratio(cand, bg);
      if (r > bestR) {
        bestR = r;
        best = cand;
      }
      if (r >= min) return cand;
    }
  }
  return best;
}

function ensureContrastBg(fg, bg, min) {
  if (ratio(fg, bg) >= min) return bg;
  let best = bg;
  let bestR = ratio(fg, bg);
  for (const target of EXTREMES) {
    for (let i = 1; i <= 100; i++) {
      const cand = mixToward(bg, target, i / 100);
      const r = ratio(fg, cand);
      if (r > bestR) {
        bestR = r;
        best = cand;
      }
      if (r >= min) return cand;
    }
  }
  return best;
}

/**
 * Pick ink for one or more fills: keep the first near-theme candidate that
 * already clears `min` on every background; otherwise nudge a themed seed
 * toward black/white until AA; extremes only as last resort.
 * Returns null when no ink clears every background (caller may nudge fills).
 */
function pickInkOn(bgs, preferred, min) {
  const near = preferred.filter(Boolean);
  const themed = near.filter((c) => !isExtreme(c));

  for (const c of themed) {
    if (bgs.every((bg) => ratio(c, bg) >= min)) return c;
  }

  const seed = themed[0] ?? near[0] ?? '#ffffff';
  for (const target of EXTREMES) {
    for (let i = 1; i <= 100; i++) {
      const cand = mixToward(seed, target, i / 100);
      if (bgs.every((bg) => ratio(cand, bg) >= min)) return cand;
    }
  }

  for (const ext of EXTREMES) {
    if (bgs.every((bg) => ratio(ext, bg) >= min)) return ext;
  }
  return null;
}

/** Extreme (or near-theme) with the best worst-case contrast across fills. */
function bestEffortInk(bgs, preferred) {
  const candidates = [
    ...preferred.filter((c) => c && !isExtreme(c)),
    ...EXTREMES,
  ];
  let best = candidates[0] ?? '#000000';
  let bestScore = -1;
  for (const c of candidates.filter(Boolean)) {
    const score = Math.min(...bgs.map((bg) => ratio(c, bg)));
    if (score > bestScore) {
      bestScore = score;
      best = c;
    }
  }
  return best;
}

function setColor(obj, key, value) {
  if (!obj[key]) obj[key] = { $value: value, $type: 'color' };
  else obj[key].$value = value;
}

function getToken(t, path) {
  return resolveTokenValue(t, path);
}

let filesChanged = 0;
let fixCount = 0;

for (const file of readdirSync(DIR).filter((f) => f.endsWith('.tokens.json'))) {
  const path = join(DIR, file);
  const json = JSON.parse(readFileSync(path, 'utf8'));
  const t = json.tokens;
  if (!t?.background?.base?.$value) {
    // Silent skips hide an unnormalized theme; name it so CI logs show which.
    console.warn(`[normalize-wcag-aa] skipping ${file}: missing tokens.background.base`);
    continue;
  }

  // Overlay can be a mid-tone accent surface; the manifest decides which inks
  // must also clear it (the overlay pairs), so no hardcoding here.
  let changed = false;

  const bump = (label, oldVal, neu) => {
    if (String(oldVal).toLowerCase() !== String(neu).toLowerCase()) {
      console.log(`[normalize-wcag-aa] ${file}: ${label} ${oldVal} -> ${neu}`);
      changed = true;
      fixCount++;
    }
  };

  // --- Ink tokens vs background surfaces (manifest groups) -----------------
  for (const [fgPath, group] of inkGroups) {
    const old = getToken(t, fgPath);
    if (old === undefined) continue;
    const bgs = group.bgs.map((p) => getToken(t, p)).filter(Boolean);
    if (bgs.length === 0) continue;
    const min = group.level === 'text' ? AA_N : AA_L;
    const neu = ensureOnAllBgs(bgs, old, min);
    bump(fgPath, old, neu);
    setToken(t, fgPath, neu);
  }

  // --- Paired fg/bg tokens --------------------------------------------------
  for (const pair of fgBgPairs) {
    const fg = getToken(t, pair.fg);
    const bg = getToken(t, pair.bg);
    if (fg === undefined || bg === undefined) continue;
    const min = rewriteTarget(pair);
    if (pair.nudge === 'bg') {
      const neu = ensureContrastBg(fg, bg, min);
      bump(pair.bg, bg, neu);
      setToken(t, pair.bg, neu);
    } else {
      const neu = ensureContrast(fg, bg, min);
      bump(pair.fg, fg, neu);
      setToken(t, pair.fg, neu);
    }
  }

  // --- State fills and their audited inks -----------------------------------
  for (const pair of statePairs) {
    // pair shape: state.<key>Text vs state.<key>
    const key = pair.bg.split('.')[1];
    if (!t.state?.[key]?.$value) continue;
    let bg = t.state[key].$value;
    const textKey = `${key}Text`;
    const existing = t.state[textKey]?.$value;
    const preferred = [
      existing && !isExtreme(existing) ? existing : null,
      t.text?.inverse?.$value,
      t.text?.primary?.$value,
      t.background?.base?.$value,
    ];
    let fg = pickInkOn([bg], preferred, AA_N) ?? bestEffortInk([bg], preferred);
    if (ratio(fg, bg) < AA_N) {
      // Fill itself cannot host readable ink — nudge the fill until AA clears.
      const next = ensureContrastBg(fg, bg, AA_N);
      if (next.toLowerCase() !== bg.toLowerCase()) {
        bg = next;
        t.state[key].$value = bg;
        changed = true;
        fixCount++;
      }
      if (ratio(fg, bg) < AA_N) {
        fg = bestEffortInk([bg], EXTREMES);
        const nudged = ensureContrastBg(fg, bg, AA_N);
        if (nudged.toLowerCase() !== bg.toLowerCase()) {
          bg = nudged;
          t.state[key].$value = bg;
          changed = true;
          fixCount++;
        }
      }
    }
    // Same rule as the brand ramp below: never write ink the fill cannot
    // host. Both nudge attempts can leave `ratio(fg, bg) < AA_N` (e.g.
    // `ensureContrastBg` returns `bg` unchanged because the fill is already
    // at an extreme), which would ship a token that merely looks audited.
    if (ratio(fg, bg) < AA_N) {
      throw new Error(
        `[normalize-wcag-aa] ${file}: state.${textKey} ${fg} only reaches ` +
          `${ratio(fg, bg).toFixed(2)}:1 on state.${key} ${bg} (needs ${AA_N}:1)`
      );
    }

    const old = existing ?? '';
    setColor(t.state, textKey, fg);
    if (old.toLowerCase() !== fg.toLowerCase()) {
      changed = true;
      fixCount++;
    }
  }

  // --- CTA ink vs the brand gradient ramp -----------------------------------
  // Runs AFTER the state loop on purpose: that loop may nudge state.info,
  // the gradient's end stop. Picking the brand ink first would audit it
  // against a fill that is then moved out from under it.
  if (gradientPair && t.brand?.primary?.$value) {
    // Gradient stops come from the manifest (brand.primary → state.info).
    const [fromPath, toPath] = gradientPair.bg.gradient;
    const rampFor = () => {
      const from = getToken(t, fromPath);
      const to = getToken(t, toPath);
      return gradientRamp(from, to, gradientPair.bg.samples ?? GRADIENT_SAMPLES);
    };
    let brand = t.brand.primary.$value;
    let info = t.state?.info?.$value;
    const existing = t.brand.primaryText?.$value;
    const preferred = [
      existing && !isExtreme(existing) ? existing : null,
      t.text?.inverse?.$value,
      t.background?.base?.$value,
    ];
    // Audit the whole ramp, not just its ends — see gradientRamp().
    let fg = pickInkOn(rampFor(), preferred, AA_N);

    if (!fg) {
      // No single ink clears the ramp — keep themed ink on brand, then nudge
      // the stops apart from the ink until every sampled point is AA. Nudging
      // both stops away from the ink also pulls the interior with them, since
      // each sample is a blend of the two.
      fg = pickInkOn([brand], preferred, AA_N) ?? bestEffortInk([brand], preferred);
      if (ratio(fg, brand) < AA_N) {
        const next = ensureContrastBg(fg, brand, AA_N);
        if (next.toLowerCase() !== brand.toLowerCase()) {
          brand = next;
          t.brand.primary.$value = brand;
          changed = true;
          fixCount++;
        }
      }
      if (info && ratio(fg, info) < AA_N) {
        const next = ensureContrastBg(fg, info, AA_N);
        if (next.toLowerCase() !== info.toLowerCase()) {
          info = next;
          t.state.info.$value = info;
          changed = true;
          fixCount++;
        }
      }
      // Endpoint nudging can still leave an interior dip when the ink sits
      // between the two stops' luminances. Push whichever stop hosts the worst
      // sample further from the ink until the ramp clears.
      for (let pass = 0; pass < GRADIENT_SAMPLES && info; pass++) {
        const ramp = gradientRamp(brand, info);
        const worst = Math.min(...ramp.map((bg) => ratio(fg, bg)));
        if (worst >= AA_N) break;
        const target = ratio(fg, brand) <= ratio(fg, info) ? 'brand' : 'info';
        const current = target === 'brand' ? brand : info;
        const next = ensureContrastBg(fg, current, AA_N + 0.25 * (pass + 1));
        if (next.toLowerCase() === current.toLowerCase()) break;
        if (target === 'brand') {
          brand = next;
          t.brand.primary.$value = brand;
        } else {
          info = next;
          t.state.info.$value = info;
        }
        changed = true;
        fixCount++;
      }
    }

    // Never write ink the ramp cannot host. Failing loudly here beats shipping
    // a token that every downstream artifact would then present as audited.
    const worstOnRamp = Math.min(...rampFor().map((bg) => ratio(fg, bg)));
    if (worstOnRamp < AA_N) {
      throw new Error(
        `[normalize-wcag-aa] ${file}: brand.primaryText ${fg} only reaches ` +
          `${worstOnRamp.toFixed(2)}:1 on the ${brand} → ${info} gradient (needs ${AA_N}:1)`
      );
    }

    const old = existing ?? '';
    setColor(t.brand, 'primaryText', fg);
    if (old.toLowerCase() !== fg.toLowerCase()) {
      changed = true;
      fixCount++;
    }

    // The ramp work above can move state.info, but state.infoText was picked
    // against the pre-nudge fill. Re-audit it so info/infoText cannot
    // silently drop below AA while the brand assertion still passes.
    const finalInfo = t.state?.info?.$value;
    const infoInk = t.state?.infoText?.$value;
    if (finalInfo && infoInk && ratio(infoInk, finalInfo) < AA_N) {
      const repicked =
        pickInkOn([finalInfo], [infoInk, t.text?.inverse?.$value, t.text?.primary?.$value], AA_N) ??
        bestEffortInk([finalInfo], EXTREMES);
      if (ratio(repicked, finalInfo) < AA_N) {
        throw new Error(
          `[normalize-wcag-aa] ${file}: state.infoText cannot reach ${AA_N}:1 on the ` +
            `post-gradient state.info ${finalInfo} (best ${repicked} = ` +
            `${ratio(repicked, finalInfo).toFixed(2)}:1)`
        );
      }
      setColor(t.state, 'infoText', repicked);
      changed = true;
      fixCount++;
    }
  }

  if (changed) {
    writeFileSync(path, JSON.stringify(json, null, 2) + '\n');
    filesChanged++;
  }
}

// --- Gate-only pairs (normalize: false) -------------------------------------
// Verified after all rewriting so a vendor sync that breaks one of these
// pairs fails the build with the offending theme, pair, and ratio named.
const gateFailures = [];
if (gateOnlyPairs.length > 0) {
  for (const file of readdirSync(DIR).filter((f) => f.endsWith('.tokens.json'))) {
    const json = JSON.parse(readFileSync(join(DIR, file), 'utf8'));
    const t = json.tokens;
    if (!t?.background?.base?.$value) continue;
    for (const pair of gateOnlyPairs) {
      const result = checkGatePair(pair, t);
      if (!result.ok) {
        gateFailures.push(
          `${file}: ${pair.id} ${result.fg} on ${result.worstBg} = ${result.worst.toFixed(2)}:1 ` +
            `(needs ${LEVELS[pair.level]}:1)`,
        );
      }
    }
  }
}
if (gateFailures.length > 0) {
  console.error(
    `[normalize-wcag-aa] gate-only contrast pairs failed:\n  ` +
      gateFailures.join('\n  '),
  );
  process.exitCode = 1;
}

console.log(`[normalize-wcag-aa] updated ${filesChanged} theme files (${fixCount} value fixes)`);

// ---------------------------------------------------------------------------
// Helpers working on the raw token tree
// ---------------------------------------------------------------------------

function ensureOnAllBgs(bgs, fg, min) {
  const ok = (cand) => bgs.every((bg) => ratio(cand, bg) >= min);
  if (ok(fg)) return fg;
  // Search mixes toward black and white; keep the first candidate that
  // clears every background (avoids sequential tug-of-war across layers).
  let best = fg;
  let bestScore = Math.min(...bgs.map((bg) => ratio(fg, bg)));
  for (const target of EXTREMES) {
    for (let i = 1; i <= 100; i++) {
      const cand = mixToward(fg, target, i / 100);
      const score = Math.min(...bgs.map((bg) => ratio(cand, bg)));
      if (score > bestScore) {
        bestScore = score;
        best = cand;
      }
      if (ok(cand)) return cand;
    }
  }
  return best;
}

function setToken(tree, path, value) {
  const keys = path.split('.');
  let cur = tree;
  for (let i = 0; i < keys.length - 1; i++) {
    cur = cur?.[keys[i]];
    if (cur === undefined || cur === null) return;
  }
  const leaf = keys[keys.length - 1];
  if (typeof cur[leaf] === 'object' && cur[leaf] !== null) cur[leaf].$value = value;
  else cur[leaf] = value;
}

function checkGatePair(pair, tokens) {
  const fg = getToken(tokens, pair.fg);
  const backgrounds = pairBackgrounds(pair, tokens);
  let ok = true;
  let worst = Infinity;
  let worstBg;
  for (const bg of backgrounds) {
    const r = ratio(fg, bg);
    if (r < worst) {
      worst = r;
      worstBg = bg;
    }
    if (r < LEVELS[pair.level]) ok = false;
  }
  return { ok, worst, worstBg, fg };
}
