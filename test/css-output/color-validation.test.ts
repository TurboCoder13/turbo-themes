/**
 * Color Contrast Accessibility Tests
 *
 * The per-pair WCAG contrast gates moved to schema/contrast-pairs.json and
 * are asserted by contrast-pairs.test.ts (#922). This file keeps the
 * non-pair color sanity checks that have no manifest representation.
 */

import { describe, expect, it } from 'vitest';
import { flavors } from '../../packages/core/src/tokens/index';

// Prepare flavor data for parametrized tests
const flavorTestData = flavors.map((f) => [f.id, f] as const);

describe('CSS Output - Color Contrast Accessibility', () => {
  describe('state colors are unique', () => {
    it.each(flavorTestData)('%s has distinct state colors', (_id, flavor) => {
      const { info, success, warning, danger } = flavor.tokens.state;
      const colors = [info, success, warning, danger];

      // Each state color should be unique
      const unique = new Set(colors);
      expect(unique.size).toBe(4);
    });
  });
});
