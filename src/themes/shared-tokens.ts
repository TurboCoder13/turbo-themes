// SPDX-License-Identifier: MIT
/**
 * Shared layout tokens for all themes
 *
 * These tokens provide consistent spacing, elevation, animation, and opacity
 * values across all themes. Individual themes can override these values
 * if needed, but having shared defaults ensures consistency.
 */

export const layoutTokens = {
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  elevation: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  animation: {
    durationFast: '150ms',
    durationNormal: '300ms',
    durationSlow: '500ms',
    easingDefault: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easingEmphasized: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
  },
  opacity: {
    disabled: 0.5,
    hover: 0.8,
    pressed: 0.6,
  },
} as const;
