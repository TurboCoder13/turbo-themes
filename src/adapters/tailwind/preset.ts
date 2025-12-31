// SPDX-License-Identifier: MIT
/**
 * Tailwind CSS preset for Turbo Themes
 *
 * Maps Turbo Theme design tokens to Tailwind utility classes.
 * Supports all theme variants and provides semantic color mappings.
 *
 * @example
 * ```js
 * // tailwind.config.js
 * module.exports = {
 *   presets: [require('@turbocoder13/turbo-themes/adapters/tailwind/preset')],
 *   theme: { extend: {} },
 *   plugins: [],
 * };
 * ```
 */

import { themeIds } from '../../tokens/index.js';
import { createColorMappings } from './colors.js';

export interface TurboThemePresetOptions {
  /** Which themes to include in the preset */
  themes?: string[];
  /** Whether to include dark mode variants */
  darkMode?: boolean;
  /** Custom color mappings */
  colors?: Record<string, string>;
}

const defaultOptions: TurboThemePresetOptions = {
  themes: [...themeIds],
  darkMode: true,
  colors: {},
};

export default function preset(userOptions: TurboThemePresetOptions = {}) {
  const options = { ...defaultOptions, ...userOptions };

  // Generate color mappings for all requested themes
  const colorMappings = createColorMappings(options.themes || []);

  return {
    theme: {
      extend: {
        colors: {
          // Base theme colors (always available)
          background: 'var(--turbo-bg-base)',
          surface: 'var(--turbo-bg-surface)',
          'surface-alt': 'var(--turbo-bg-surface-alt)',
          foreground: 'var(--turbo-text-primary)',
          'foreground-secondary': 'var(--turbo-text-secondary)',
          'foreground-inverse': 'var(--turbo-text-inverse)',
          muted: 'var(--turbo-text-secondary)',

          // Brand colors
          primary: 'var(--turbo-brand-primary)',
          brand: 'var(--turbo-brand-primary)',

          // State colors
          success: 'var(--turbo-state-success)',
          error: 'var(--turbo-state-danger)',
          warning: 'var(--turbo-state-warning)',
          info: 'var(--turbo-state-info)',
          danger: 'var(--turbo-state-danger)',

          // Border colors
          border: 'var(--turbo-border-default)',
          'border-strong': 'var(--turbo-border-strong)',

          // Accent colors
          accent: 'var(--turbo-accent-link)',
          link: 'var(--turbo-accent-link)',

          // Content colors
          heading: {
            1: 'var(--turbo-heading-h1)',
            2: 'var(--turbo-heading-h2)',
            3: 'var(--turbo-heading-h3)',
            4: 'var(--turbo-heading-h4)',
            5: 'var(--turbo-heading-h5)',
            6: 'var(--turbo-heading-h6)',
          },
          body: {
            primary: 'var(--turbo-body-primary)',
            secondary: 'var(--turbo-body-secondary)',
          },
          selection: {
            fg: 'var(--turbo-selection-fg)',
            bg: 'var(--turbo-selection-bg)',
          },
          blockquote: {
            border: 'var(--turbo-blockquote-border)',
            fg: 'var(--turbo-blockquote-fg)',
            bg: 'var(--turbo-blockquote-bg)',
          },
          code: {
            inline: {
              fg: 'var(--turbo-code-inline-fg)',
              bg: 'var(--turbo-code-inline-bg)',
            },
            block: {
              fg: 'var(--turbo-code-block-fg)',
              bg: 'var(--turbo-code-block-bg)',
            },
          },
          table: {
            border: 'var(--turbo-table-border)',
            stripe: 'var(--turbo-table-stripe)',
            thead: 'var(--turbo-table-thead-bg)',
            cell: 'var(--turbo-table-cell-bg)',
            header: 'var(--turbo-table-header-fg)',
          },

          // Spacing (if available)
          spacing: {
            xs: 'var(--turbo-spacing-xs, 0.25rem)',
            sm: 'var(--turbo-spacing-sm, 0.5rem)',
            md: 'var(--turbo-spacing-md, 1rem)',
            lg: 'var(--turbo-spacing-lg, 1.5rem)',
            xl: 'var(--turbo-spacing-xl, 2rem)',
          },

          // Custom color mappings
          ...colorMappings,
          ...options.colors,
        },

        // Shadow/elevation support
        boxShadow: {
          'elevation-sm': 'var(--turbo-elevation-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05))',
          'elevation-md':
            'var(--turbo-elevation-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
          'elevation-lg':
            'var(--turbo-elevation-lg, 0 10px 15px -3px rgba(0, 0, 0, 0.1))',
          'elevation-xl':
            'var(--turbo-elevation-xl, 0 20px 25px -5px rgba(0, 0, 0, 0.1))',
        },

        // Animation support
        transitionDuration: {
          fast: 'var(--turbo-animation-duration-fast, 150ms)',
          normal: 'var(--turbo-animation-duration-normal, 300ms)',
          slow: 'var(--turbo-animation-duration-slow, 500ms)',
        },

        transitionTimingFunction: {
          default:
            'var(--turbo-animation-easing-default, cubic-bezier(0.4, 0, 0.2, 1))',
          emphasized:
            'var(--turbo-animation-easing-emphasized, cubic-bezier(0.05, 0.7, 0.1, 1))',
        },

        // Typography
        fontFamily: {
          sans: 'var(--turbo-font-sans)',
          mono: 'var(--turbo-font-mono)',
        },
      },
    },
  };
}

// Export utilities for advanced usage
export { createColorMappings } from './colors.js';
export { getTheme, themesById, themeIds } from '../../tokens/index.js';
