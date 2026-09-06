// SPDX-License-Identifier: MIT
import { describe, expect, it } from 'vitest';
import { join } from 'node:path';
import {
  checkPair,
  classifyPair,
  contrastRatio,
  loadContrastPairs,
  resolveTokenValue,
} from '../../scripts/lib/contrast-pairs.mjs';

const ROOT = join(import.meta.dirname, '..', '..');
const MANIFEST = join(ROOT, 'schema', 'contrast-pairs.json');

const SAMPLE_TOKENS = {
  background: { base: { $value: '#ffffff' }, surface: { $value: '#f5f5f5' } },
  text: { primary: { $value: '#111111' } },
};

describe('contrast-pairs loader', () => {
  it('loads the real manifest', () => {
    const manifest = loadContrastPairs(MANIFEST);
    expect(manifest.pairs.length).toBeGreaterThanOrEqual(36);
    expect(manifest.levels.text).toBe(4.5);
  });

  it('throws when the manifest is missing', () => {
    expect(() => loadContrastPairs('/nonexistent/manifest.json')).toThrow(/not found/);
  });

  it('throws on duplicate pair ids', () => {
    const path = join(ROOT, 'test/codegen/fixtures/dup-id.json');
    expect(() => loadContrastPairs(path)).toThrow(/duplicate or missing pair id/);
  });

  it('throws on an unknown level', () => {
    const path = join(ROOT, 'test/codegen/fixtures/bad-level.json');
    expect(() => loadContrastPairs(path)).toThrow(/unknown level/);
  });

  it('throws when levels drift from the WCAG floors', () => {
    const path = join(ROOT, 'test/codegen/fixtures/bad-floors.json');
    expect(() => loadContrastPairs(path)).toThrow(/levels\.text/);
  });

  it('throws when normalize is not a boolean', () => {
    const path = join(ROOT, 'test/codegen/fixtures/bad-normalize.json');
    expect(() => loadContrastPairs(path)).toThrow(/normalize must be a boolean/);
  });

  it('throws when an exemption lacks a reason', () => {
    const path = join(ROOT, 'test/codegen/fixtures/bad-exempt.json');
    expect(() => loadContrastPairs(path)).toThrow(/requires a substantive reason/);
  });

  it('classifies pairs by shape', () => {
    const manifest = loadContrastPairs(MANIFEST);
    const byId = Object.fromEntries(manifest.pairs.map((p) => [p.id, p]));
    expect(classifyPair(byId['text-primary/bg-base'])).toBe('ink-vs-backgrounds');
    expect(classifyPair(byId['code-inline'])).toBe('fg-bg');
    expect(classifyPair(byId['cta-ink/gradient'])).toBe('gradient-ink');
  });

  it('resolves token values and guards the prototype chain', () => {
    expect(resolveTokenValue(SAMPLE_TOKENS, 'text.primary')).toBe('#111111');
    expect(resolveTokenValue(SAMPLE_TOKENS, 'text.__proto__.polluted')).toBeUndefined();
    expect(resolveTokenValue(SAMPLE_TOKENS, 'text.missing')).toBeUndefined();
  });

  it('fails a pair loudly when either side does not resolve', () => {
    const result = checkPair(
      { id: 'x', fg: 'text.missing', bg: 'background.base', level: 'text', normalize: false },
      SAMPLE_TOKENS,
    );
    expect(result.ok).toBe(false);
  });

  it('computes a known ratio', () => {
    expect(contrastRatio('#ffffff', '#000000')).toBeCloseTo(21, 1);
  });
});
