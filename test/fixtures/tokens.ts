/**
 * Token fixtures for tests.
 *
 * Provides minimal valid token structures for testing theme generation
 * and CSS output without importing from the actual token data.
 */
import type { ThemeTokens, ThemeFlavor } from '../../packages/core/src/themes/types.js';

/**
 * Creates a minimal valid ThemeTokens object for testing.
 * Use overrides to customize specific token values.
 *
 * @example
 * const tokens = createMockTokens({ background: { base: '#000000' } });
 */
export function createMockTokens(overrides: Partial<ThemeTokens> = {}): ThemeTokens {
  return {
    background: {
      base: '#ffffff',
      surface: '#f5f5f5',
      overlay: '#e0e0e0',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
      inverse: '#ffffff',
    },
    brand: {
      primary: '#3273dc',
      primaryText: '#ffffff',
    },
    state: {
      info: '#3e8ed0',
      success: '#48c78e',
      warning: '#ffe08a',
      danger: '#f14668',
    },
    border: {
      default: '#dbdbdb',
    },
    accent: {
      link: '#485fc7',
    },
    typography: {
      fonts: {
        sans: 'Inter, sans-serif',
        mono: 'JetBrains Mono, monospace',
      },
      webFonts: ['https://fonts.googleapis.com/css2?family=Inter'],
    },
    content: {
      heading: {
        h1: '#111111',
        h2: '#222222',
        h3: '#333333',
        h4: '#444444',
        h5: '#555555',
        h6: '#666666',
      },
      body: {
        primary: '#333333',
        secondary: '#666666',
      },
      link: {
        default: '#485fc7',
      },
      selection: {
        fg: '#ffffff',
        bg: '#3273dc',
      },
      blockquote: {
        border: '#dbdbdb',
        fg: '#666666',
        bg: '#f5f5f5',
      },
      codeInline: {
        fg: '#333333',
        bg: '#f5f5f5',
      },
      codeBlock: {
        fg: '#333333',
        bg: '#f5f5f5',
      },
      table: {
        border: '#dbdbdb',
        stripe: '#fafafa',
        theadBg: '#f0f0f0',
      },
    },
    ...overrides,
  };
}

/**
 * Creates a minimal valid ThemeFlavor for testing.
 * Use overrides to customize flavor properties or tokens.
 *
 * @example
 * const flavor = createMockFlavor({ id: 'dark-theme', appearance: 'dark' });
 */
export function createMockFlavor(overrides: Partial<ThemeFlavor> = {}): ThemeFlavor {
  const { tokens: tokenOverrides, ...flavorOverrides } = overrides;
  return {
    id: 'test-theme',
    label: 'Test Theme',
    vendor: 'test',
    appearance: 'light',
    tokens: createMockTokens(tokenOverrides as Partial<ThemeTokens>),
    ...flavorOverrides,
  };
}

// Pre-defined token fixtures for common test scenarios

/** Minimal light theme tokens */
export const LIGHT_THEME_TOKENS = createMockTokens();

/** Dark theme tokens with inverted colors */
export const DARK_THEME_TOKENS = createMockTokens({
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
  content: {
    heading: {
      h1: '#f5e0dc',
      h2: '#f2cdcd',
      h3: '#f5c2e7',
      h4: '#cba6f7',
      h5: '#f38ba8',
      h6: '#eba0ac',
    },
    body: {
      primary: '#cdd6f4',
      secondary: '#a6adc8',
    },
    link: {
      default: '#89b4fa',
    },
    selection: {
      fg: '#1e1e2e',
      bg: '#89b4fa',
    },
    blockquote: {
      border: '#585b70',
      fg: '#a6adc8',
      bg: '#313244',
    },
    codeInline: {
      fg: '#cdd6f4',
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
    },
  },
});

/** Tokens without web fonts (for testing font import behavior) */
export const NO_WEBFONTS_TOKENS = createMockTokens({
  typography: {
    fonts: {
      sans: 'system-ui, sans-serif',
      mono: 'monospace',
    },
    webFonts: [],
  },
});

/** Low contrast tokens for accessibility testing edge cases */
export const LOW_CONTRAST_TOKENS = createMockTokens({
  background: {
    base: '#808080',
    surface: '#909090',
    overlay: '#a0a0a0',
  },
  text: {
    primary: '#999999',
    secondary: '#888888',
    inverse: '#777777',
  },
});

/**
 * Catppuccin Mocha-style tokens for CSS generator tests.
 * Used by packages/css/test/generator.test.ts and optional-tokens.test.ts.
 * These values are verified by specific test assertions, do not change without updating tests.
 */
export const CSS_GENERATOR_MOCK_TOKENS: ThemeTokens = {
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
    primaryText: '#1e1e2e',
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
