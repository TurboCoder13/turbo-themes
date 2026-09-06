import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { flavors } from '../../packages/core/src/tokens/index';
import { projectRoot } from './test-utils';

// The shipped core stylesheet, as authored by packages/css `generateCoreCss`.
//
// Deliberately NOT `assets/css/turbo-core.css`: that path has two producers —
// style-dictionary (`build:tokens`, token vars only) and this file copied over
// it by `copy-adapters.mjs`. See #823, which fixed the build.sh ordering and
// added a regression test; this suite keeps reading the packaged file directly.
const packagedCoreCss = path.join(projectRoot, 'packages', 'css', 'dist', 'turbo-core.css');

/**
 * The CTA ink pair itself (`brand.primaryText` vs the sampled
 * `--gradient-primary` ramp) lives in the contrast-pairs manifest and is
 * asserted by contrast-pairs.test.ts (#922). This suite keeps the shipped
 * artifact assertions: the CSS alias must exist and track the audited token.
 */
describe('Text-on-brand (gradient CTA) shipped artifact', () => {
  it('ships --turbo-text-on-brand in the packaged core CSS', () => {
    const core = fs.readFileSync(packagedCoreCss, 'utf8');
    expect(core).toContain('--turbo-text-on-brand:');
    // It must alias the audited per-theme token, not a hard-coded colour,
    // or it would stop tracking theme swaps.
    expect(core).toMatch(/--turbo-text-on-brand:\s*var\(--turbo-brand-primary-text/);
  });

  it('covers both light and dark polarity', () => {
    const appearances = new Set(flavors.map((f) => f.appearance));
    expect(appearances.has('light')).toBe(true);
    expect(appearances.has('dark')).toBe(true);
    // Guard against the matrix silently collapsing to a handful of themes.
    // Keep in step with the flavor count documented in
    // test/integration/bundle-size.test.ts.
    expect(flavors.length).toBeGreaterThanOrEqual(43);
  });
});
