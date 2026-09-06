/**
 * CSS Variables Validation Tests
 *
 * Tests that CSS files contain all required variables with correct values.
 */

import { describe, expect, it } from 'vitest';
import path from 'node:path';
import { flavors, getTokens, themeIds } from '../../packages/core/src/tokens/index';
import {
  turboCoreFile,
  turboThemesDir,
  REQUIRED_CSS_VARIABLES,
  HEX_COLOR_VARIABLES,
  HEX_COLOR_PATTERN,
  parseCssVariables,
  fileExists,
  readFile,
} from './test-utils';

describe('CSS Output - turbo-core.css', () => {
  it('turbo-core.css file exists', () => {
    expect(fileExists(turboCoreFile)).toBe(true);
  });

  it('contains :root selector', () => {
    const css = readFile(turboCoreFile);
    expect(css).toContain(':root');
  });

  it('contains all required CSS variables', () => {
    const css = readFile(turboCoreFile);
    const variables = parseCssVariables(css);

    REQUIRED_CSS_VARIABLES.forEach((varName) => {
      expect(
        variables.has(varName),
        `Missing required variable: ${varName}`
      ).toBe(true);
    });
  });

  it('color variables have valid hex format', () => {
    const css = readFile(turboCoreFile);
    const variables = parseCssVariables(css);

    HEX_COLOR_VARIABLES.forEach((varName) => {
      const value = variables.get(varName);
      if (value) {
        expect(
          HEX_COLOR_PATTERN.test(value),
          `Invalid hex color for ${varName}: ${value}`
        ).toBe(true);
      }
    });
  });

  it('font-sans contains font family', () => {
    const css = readFile(turboCoreFile);
    const variables = parseCssVariables(css);
    const fontSans = variables.get('--turbo-font-sans');

    expect(fontSans).toBeDefined();
    // Should contain Inter as primary font and system-ui fallback
    expect(fontSans).toContain('Inter');
    expect(fontSans).toMatch(/system-ui/);
  });

  it('font-mono contains monospace font family', () => {
    const css = readFile(turboCoreFile);
    const variables = parseCssVariables(css);
    const fontMono = variables.get('--turbo-font-mono');

    expect(fontMono).toBeDefined();
    // Should contain JetBrains Mono as primary font and monospace as fallback
    expect(fontMono).toContain('JetBrains Mono');
    expect(fontMono).toMatch(/monospace/);
  });

  it('contains the design-system tokens (#823)', () => {
    // assets/css/turbo-core.css has two producers: style-dictionary writes the
    // token-only file, copy-adapters (the last step of `bun run build`)
    // overwrites it with the generateCoreCss() version that also carries the
    // design-system tokens. If a build pipeline lets style-dictionary win,
    // these silently disappear — assert them so that cannot regress.
    const css = readFile(turboCoreFile);
    const variables = parseCssVariables(css);
    const designSystemTokens = [
      '--space-md',
      '--radius-md',
      '--shadow-md',
      '--transition-normal',
      '--gradient-primary',
      '--gradient-surface',
      '--turbo-text-on-brand',
    ];

    designSystemTokens.forEach((token) => {
      expect(variables.has(token), `Missing design-system token: ${token}`).toBe(true);
    });
  });
});

describe('CSS Output - Theme Files', () => {
  describe('theme file existence', () => {
    it.each(themeIds)('%s.css exists', (themeId) => {
      const themePath = path.join(turboThemesDir, `${themeId}.css`);
      expect(fileExists(themePath)).toBe(true);
    });
  });

  describe('theme selector', () => {
    it.each(themeIds)('%s.css has correct data-theme selector', (themeId) => {
      const themePath = path.join(turboThemesDir, `${themeId}.css`);
      const css = readFile(themePath);
      expect(css).toContain(`[data-theme="${themeId}"]`);
    });
  });

  describe('required variables', () => {
    it.each(themeIds)('%s.css has all required CSS variables', (themeId) => {
      const themePath = path.join(turboThemesDir, `${themeId}.css`);
      const css = readFile(themePath);
      const variables = parseCssVariables(css);

      REQUIRED_CSS_VARIABLES.forEach((varName) => {
        expect(
          variables.has(varName),
          `${themeId}: Missing required variable: ${varName}`
        ).toBe(true);
      });
    });
  });

  describe('hex color validation', () => {
    it.each(themeIds)('%s.css has valid hex colors', (themeId) => {
      const themePath = path.join(turboThemesDir, `${themeId}.css`);
      const css = readFile(themePath);
      const variables = parseCssVariables(css);

      HEX_COLOR_VARIABLES.forEach((varName) => {
        const value = variables.get(varName);
        if (value) {
          expect(
            HEX_COLOR_PATTERN.test(value),
            `${themeId}: Invalid hex color for ${varName}: ${value}`
          ).toBe(true);
        }
      });
    });
  });

  describe('color-scheme', () => {
    it.each(flavors.map((f) => [f.id, f.appearance] as const))(
      '%s.css has correct color-scheme: %s',
      (themeId, appearance) => {
        const themePath = path.join(turboThemesDir, `${themeId}.css`);
        const css = readFile(themePath);
        expect(css).toContain(`color-scheme: ${appearance}`);
      }
    );
  });
});

describe('CSS Output - Token Consistency', () => {
  describe('CSS matches TypeScript tokens', () => {
    it.each(themeIds)('%s CSS values match TypeScript tokens', (themeId) => {
      const themePath = path.join(turboThemesDir, `${themeId}.css`);
      const css = readFile(themePath);
      const cssVars = parseCssVariables(css);
      const tokens = getTokens(themeId);

      if (!tokens) {
        throw new Error(`No tokens found for theme: ${themeId}`);
      }

      // Check background tokens
      expect(cssVars.get('--turbo-bg-base')).toBe(tokens.background.base);
      expect(cssVars.get('--turbo-bg-surface')).toBe(tokens.background.surface);
      expect(cssVars.get('--turbo-bg-overlay')).toBe(tokens.background.overlay);

      // Check text tokens
      expect(cssVars.get('--turbo-text-primary')).toBe(tokens.text.primary);
      expect(cssVars.get('--turbo-text-secondary')).toBe(tokens.text.secondary);
      expect(cssVars.get('--turbo-text-inverse')).toBe(tokens.text.inverse);

      // Check brand tokens
      expect(cssVars.get('--turbo-brand-primary')).toBe(tokens.brand.primary);

      // Check state tokens
      expect(cssVars.get('--turbo-state-info')).toBe(tokens.state.info);
      expect(cssVars.get('--turbo-state-success')).toBe(tokens.state.success);
      expect(cssVars.get('--turbo-state-warning')).toBe(tokens.state.warning);
      expect(cssVars.get('--turbo-state-danger')).toBe(tokens.state.danger);

      // Check border tokens
      expect(cssVars.get('--turbo-border-default')).toBe(tokens.border.default);
    });
  });

  describe('heading color consistency', () => {
    it.each(themeIds)('%s heading colors match tokens', (themeId) => {
      const themePath = path.join(turboThemesDir, `${themeId}.css`);
      const css = readFile(themePath);
      const cssVars = parseCssVariables(css);
      const tokens = getTokens(themeId);

      if (!tokens?.content?.heading) {
        throw new Error(`No heading tokens found for theme: ${themeId}`);
      }

      const heading = tokens.content.heading;
      expect(cssVars.get('--turbo-heading-h1')).toBe(heading.h1);
      expect(cssVars.get('--turbo-heading-h2')).toBe(heading.h2);
      expect(cssVars.get('--turbo-heading-h3')).toBe(heading.h3);
      expect(cssVars.get('--turbo-heading-h4')).toBe(heading.h4);
      expect(cssVars.get('--turbo-heading-h5')).toBe(heading.h5);
      expect(cssVars.get('--turbo-heading-h6')).toBe(heading.h6);
    });
  });
});
