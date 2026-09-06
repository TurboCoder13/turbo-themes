/**
 * Manifest-driven contrast suite (#922).
 *
 * Every fg/background pair lives in schema/contrast-pairs.json; this file
 * asserts each declared pair against all themes through the shared loader.
 * The WCAG AA normalizer consumes the same manifest, so `normalize: true`
 * pairs are guaranteed post-normalization and `normalize: false` pairs are
 * regression gates for vendor syncs. Pairs deliberately outside the gate
 * live in the manifest's `exempt` list with reasons.
 */

import { describe, expect, it } from 'vitest';
import { flavors } from '../../packages/core/src/tokens/index';
import {
  checkPair,
  LEVELS,
  loadContrastPairs,
} from '../../scripts/lib/contrast-pairs.mjs';

const manifest = loadContrastPairs();
const flavorTestData = flavors.map((f) => [f.id, f.tokens] as const);

describe('CSS Output - Contrast Pairs Manifest', () => {
  it('covers the expected number of declared pairs', () => {
    // Guards against the pair list silently shrinking.
    expect(manifest.pairs.length).toBeGreaterThanOrEqual(36);
  });

  it('exempts pairs only with a reason', () => {
    for (const item of manifest.exempt ?? []) {
      expect(item.reason.trim().length).toBeGreaterThanOrEqual(20);
    }
  });

  describe.each(manifest.pairs.map((p) => [p.id, p] as const))(
    'pair %s',
    (_id, pair) => {
      it.each(flavorTestData)(
        `%s meets WCAG ${pair.level} (${LEVELS[pair.level]}:1)`,
        (themeId, tokens) => {
          const result = checkPair(pair, tokens);
          expect(
            result.fg,
            `${themeId}: ${pair.fg} is not defined`,
          ).toBeDefined();
          expect(
            result.ok,
            `${themeId}: ${pair.id} ${result.fg} on ${result.worstBg} = ` +
              `${result.worst.toFixed(2)}:1 < ${LEVELS[pair.level]}:1`,
          ).toBe(true);
        },
      );
    },
  );
});
