// SPDX-License-Identifier: MIT
/**
 * Core CSS generation tests.
 * Tests for basic CSS variable generation functionality.
 */
import { describe, it, expect } from 'vitest';
import type { ThemeFlavor, ThemeTokens } from '@lgtm-hq/turbo-themes-core';
import {
  CSS_VAR_PREFIX,
  generateCssVarsFromTokens,
  generateThemeCss,
  generateCoreCss,
  generateCombinedCss,
} from '../../src/generator.js';

const mockTokens: ThemeTokens = {
  background: {
    base: '#1e1e2e',
    surface: '#313244',
    overlay: '#45475a',
  },
  text: {
    primary: '#cdd6f4',
    secondary: '#a6adc8',
    inverse: '#1e1e2e',
  },
  brand: {
    primary: '#89b4fa',
  },
  state: {
    info: '#89dceb',
    success: '#a6e3a1',
    warning: '#f9e2af',
    danger: '#f38ba8',
  },
  border: {
    default: '#45475a',
  },
  accent: {
    link: '#89dceb',
  },
  typography: {
    fonts: {
      sans: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },
    webFonts: [],
  },
  content: {
    heading: {
      h1: '#89b4fa',
      h2: '#89b4fa',
      h3: '#89b4fa',
      h4: '#89b4fa',
      h5: '#89b4fa',
      h6: '#89b4fa',
    },
    body: {
      primary: '#cdd6f4',
      secondary: '#a6adc8',
    },
    link: {
      default: '#89dceb',
    },
    selection: {
      fg: '#1e1e2e',
      bg: '#89b4fa',
    },
    blockquote: {
      border: '#89b4fa',
      fg: '#a6adc8',
      bg: '#313244',
    },
    codeInline: {
      fg: '#f38ba8',
      bg: '#313244',
    },
    codeBlock: {
      fg: '#cdd6f4',
      bg: '#1e1e2e',
    },
    table: {
      border: '#45475a',
      stripe: '#313244',
      theadBg: '#45475a',
      cellBg: '#1e1e2e',
      headerFg: '#cdd6f4',
    },
  },
};

const mockFlavor: ThemeFlavor = {
  id: 'test-theme',
  label: 'Test Theme',
  vendor: 'test',
  appearance: 'dark',
  tokens: mockTokens,
};

describe('CSS_VAR_PREFIX', () => {
  it('should be "turbo"', () => {
    expect(CSS_VAR_PREFIX).toBe('turbo');
  });
});

describe('generateCssVarsFromTokens - core tokens', () => {
  it('should generate CSS variable declarations', () => {
    const lines = generateCssVarsFromTokens(mockTokens);

    expect(lines).toBeInstanceOf(Array);
    expect(lines.length).toBeGreaterThan(0);
  });

  it.each([
    ['background', '--turbo-bg-base: #1e1e2e', '--turbo-bg-surface: #313244', '--turbo-bg-overlay: #45475a'],
    ['text', '--turbo-text-primary: #cdd6f4', '--turbo-text-secondary: #a6adc8', '--turbo-text-inverse: #1e1e2e'],
    ['brand', '--turbo-brand-primary: #89b4fa'],
    ['state', '--turbo-state-info: #89dceb', '--turbo-state-success: #a6e3a1'],
  ])('should include %s tokens', (category, ...expectedVars) => {
    const lines = generateCssVarsFromTokens(mockTokens);
    const joined = lines.join('\n');

    for (const expected of expectedVars) {
      expect(joined, category).toContain(expected);
    }
  });

  it('should include heading tokens', () => {
    const lines = generateCssVarsFromTokens(mockTokens);
    const joined = lines.join('\n');

    expect(joined).toContain('--turbo-heading-h1: #89b4fa');
    expect(joined).toContain('--turbo-heading-h6: #89b4fa');
  });

  it('should include code tokens', () => {
    const lines = generateCssVarsFromTokens(mockTokens);
    const joined = lines.join('\n');

    expect(joined).toContain('--turbo-code-inline-fg: #f38ba8');
    expect(joined).toContain('--turbo-code-block-bg: #1e1e2e');
  });
});

describe('generateThemeCss', () => {
  it('should generate CSS with data-theme selector', () => {
    const css = generateThemeCss(mockFlavor);

    expect(css).toContain('[data-theme="test-theme"]');
    expect(css).toContain('--turbo-bg-base: #1e1e2e');
  });

  it('should include color-scheme for dark themes', () => {
    const css = generateThemeCss(mockFlavor);

    expect(css).toContain('color-scheme: dark');
  });

  it('should include color-scheme for light themes', () => {
    const lightFlavor: ThemeFlavor = {
      ...mockFlavor,
      id: 'light-theme',
      appearance: 'light',
    };
    const css = generateThemeCss(lightFlavor);

    expect(css).toContain('color-scheme: light');
  });

  it('should include web font imports if provided', () => {
    const flavorWithFonts: ThemeFlavor = {
      ...mockFlavor,
      tokens: {
        ...mockTokens,
        typography: {
          ...mockTokens.typography,
          webFonts: ['https://fonts.googleapis.com/css2?family=Inter'],
        },
      },
    };
    const css = generateThemeCss(flavorWithFonts);

    expect(css).toContain("@import url('https://fonts.googleapis.com/css2?family=Inter')");
  });

  it('should reject web fonts from untrusted domains', () => {
    const flavorWithUntrustedFont: ThemeFlavor = {
      ...mockFlavor,
      tokens: {
        ...mockTokens,
        typography: {
          ...mockTokens.typography,
          webFonts: ['https://evil.example.com/malicious.css'],
        },
      },
    };
    const css = generateThemeCss(flavorWithUntrustedFont);

    expect(css).not.toContain('@import');
    expect(css).not.toContain('evil.example.com');
  });

  it('should reject HTTP (non-HTTPS) font URLs', () => {
    const flavorWithHttpFont: ThemeFlavor = {
      ...mockFlavor,
      tokens: {
        ...mockTokens,
        typography: {
          ...mockTokens.typography,
          webFonts: ['http://fonts.googleapis.com/css2?family=Inter'],
        },
      },
    };
    const css = generateThemeCss(flavorWithHttpFont);

    expect(css).not.toContain('@import');
  });

  it('should allow all trusted font providers', () => {
    const trustedUrls = [
      'https://fonts.googleapis.com/css2?family=Roboto',
      'https://fonts.gstatic.com/font.woff2',
      'https://use.typekit.net/abc123.css',
      'https://fonts.bunny.net/css?family=Inter',
      'https://rsms.me/inter/inter.css',
      'https://fonts.cdnfonts.com/css/font.css',
    ];

    for (const url of trustedUrls) {
      const flavorWithFont: ThemeFlavor = {
        ...mockFlavor,
        tokens: {
          ...mockTokens,
          typography: {
            ...mockTokens.typography,
            webFonts: [url],
          },
        },
      };
      const css = generateThemeCss(flavorWithFont);

      expect(css).toContain(`@import url('${url}')`);
    }
  });

  it('should filter out invalid URLs while keeping valid ones', () => {
    const flavorWithMixedFonts: ThemeFlavor = {
      ...mockFlavor,
      tokens: {
        ...mockTokens,
        typography: {
          ...mockTokens.typography,
          webFonts: [
            'https://fonts.googleapis.com/css2?family=Inter',
            'https://evil.com/bad.css',
            'https://fonts.bunny.net/css?family=Roboto',
          ],
        },
      },
    };
    const css = generateThemeCss(flavorWithMixedFonts);

    expect(css).toContain("@import url('https://fonts.googleapis.com/css2?family=Inter')");
    expect(css).toContain("@import url('https://fonts.bunny.net/css?family=Roboto')");
    expect(css).not.toContain('evil.com');
  });
});

describe('generateCoreCss', () => {
  it('should generate CSS with :root selector', () => {
    const css = generateCoreCss(mockFlavor);

    expect(css).toContain(':root {');
    expect(css).toContain('--turbo-bg-base: #1e1e2e');
  });

  it('should not include data-theme selector', () => {
    const css = generateCoreCss(mockFlavor);

    expect(css).not.toContain('data-theme');
  });
});

describe('generateCombinedCss', () => {
  const flavors = [
    mockFlavor,
    { ...mockFlavor, id: 'second-theme', label: 'Second Theme' },
  ];

  it('should include header comment', () => {
    const css = generateCombinedCss(flavors, 'test-theme');

    expect(css).toContain('Turbo Themes');
    expect(css).toContain('do not edit');
  });

  it('should include :root with default theme', () => {
    const css = generateCombinedCss(flavors, 'test-theme');

    expect(css).toContain(':root {');
  });

  it('should include all theme selectors', () => {
    const css = generateCombinedCss(flavors, 'test-theme');

    expect(css).toContain('[data-theme="test-theme"]');
    expect(css).toContain('[data-theme="second-theme"]');
  });

  it('should throw if no flavors provided', () => {
    expect(() => generateCombinedCss([], 'test-theme')).toThrow('No flavors provided');
  });

  it('should use first flavor as default if specified default not found', () => {
    const css = generateCombinedCss(flavors, 'nonexistent');

    expect(css).toContain(':root {');
  });
});
