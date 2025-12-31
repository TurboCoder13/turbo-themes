// SPDX-License-Identifier: MIT
/**
 * Color mappings for Tailwind preset
 *
 * Generates semantic color classes for each theme variant.
 */

import { getTheme, themeIds } from '../../tokens/index.js';
import { layoutTokens } from '../../themes/shared-tokens.js';

type ThemeColors = {
  primary: string;
  surface: string;
  background: string;
  foreground: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  border: string;
};

/**
 * Create color mappings for the given theme IDs
 * Generates classes like `bg-theme-{id}`, `text-theme-{id}-primary`, etc.
 */
export function createColorMappings(themeIds: readonly string[]) {
  const mappings: Record<string, ThemeColors> = {};

  themeIds.forEach((themeId) => {
    const theme = getTheme(themeId);
    if (!theme) return;

    const themeKey = themeId.replace(/[^a-zA-Z0-9]/g, '-');

    // Theme-specific color mappings
    mappings[`theme-${themeKey}`] = {
      primary: theme.tokens.brand.primary,
      surface: theme.tokens.background.surface,
      background: theme.tokens.background.base,
      foreground: theme.tokens.text.primary,
      accent: theme.tokens.accent.link,
      success: theme.tokens.state.success,
      warning: theme.tokens.state.warning,
      danger: theme.tokens.state.danger,
      info: theme.tokens.state.info,
      border: theme.tokens.border.default,
    };
  });

  return mappings;
}

/**
 * Get all available theme color mappings
 */
export function getAllThemeColors() {
  return createColorMappings(themeIds);
}

/**
 * Create CSS custom properties for a theme
 */
export function createThemeCssVariables(themeId: string): string {
  const theme = getTheme(themeId);
  if (!theme) return '';

  const tokens = theme.tokens;
  const lines: string[] = [];

  // Helper to add CSS variable
  const addVar = (name: string, value: string) => {
    lines.push(`  --turbo-${name}: ${value};`);
  };

  // Background
  addVar('bg-base', tokens.background.base);
  addVar('bg-surface', tokens.background.surface);
  addVar('bg-surface-alt', tokens.background.overlay);

  // Text
  addVar('text-primary', tokens.text.primary);
  addVar('text-secondary', tokens.text.secondary);
  addVar('text-inverse', tokens.text.inverse);

  // Brand
  addVar('brand-primary', tokens.brand.primary);

  // State
  addVar('state-info', tokens.state.info);
  addVar('state-success', tokens.state.success);
  addVar('state-warning', tokens.state.warning);
  addVar('state-danger', tokens.state.danger);

  // Border
  addVar('border-default', tokens.border.default);

  // Accent
  addVar('accent-link', tokens.accent.link);

  // Content
  addVar('heading-h1', tokens.content.heading.h1);
  addVar('heading-h2', tokens.content.heading.h2);
  addVar('heading-h3', tokens.content.heading.h3);
  addVar('heading-h4', tokens.content.heading.h4);
  addVar('heading-h5', tokens.content.heading.h5);
  addVar('heading-h6', tokens.content.heading.h6);

  addVar('body-primary', tokens.content.body.primary);
  addVar('body-secondary', tokens.content.body.secondary);
  addVar('link-default', tokens.content.link.default);

  addVar('selection-fg', tokens.content.selection.fg);
  addVar('selection-bg', tokens.content.selection.bg);

  addVar('blockquote-border', tokens.content.blockquote.border);
  addVar('blockquote-fg', tokens.content.blockquote.fg);
  addVar('blockquote-bg', tokens.content.blockquote.bg);

  addVar('code-inline-fg', tokens.content.codeInline.fg);
  addVar('code-inline-bg', tokens.content.codeInline.bg);
  addVar('code-block-fg', tokens.content.codeBlock.fg);
  addVar('code-block-bg', tokens.content.codeBlock.bg);

  addVar('table-border', tokens.content.table.border);
  addVar('table-stripe', tokens.content.table.stripe);
  addVar('table-thead-bg', tokens.content.table.theadBg);
  if (tokens.content.table.cellBg) {
    addVar('table-cell-bg', tokens.content.table.cellBg);
  }
  if (tokens.content.table.headerFg) {
    addVar('table-header-fg', tokens.content.table.headerFg);
  }

  // Typography
  addVar('font-sans', tokens.typography.fonts.sans);
  addVar('font-mono', tokens.typography.fonts.mono);

  // Optional tokens
  const spacing = tokens.spacing ?? layoutTokens.spacing;
  addVar('spacing-xs', spacing.xs);
  addVar('spacing-sm', spacing.sm);
  addVar('spacing-md', spacing.md);
  addVar('spacing-lg', spacing.lg);
  addVar('spacing-xl', spacing.xl);

  const elevation = tokens.elevation ?? layoutTokens.elevation;
  addVar('elevation-none', elevation.none);
  addVar('elevation-sm', elevation.sm);
  addVar('elevation-md', elevation.md);
  addVar('elevation-lg', elevation.lg);
  addVar('elevation-xl', elevation.xl);

  const animation = tokens.animation ?? layoutTokens.animation;
  addVar('animation-duration-fast', animation.durationFast);
  addVar('animation-duration-normal', animation.durationNormal);
  addVar('animation-duration-slow', animation.durationSlow);
  addVar('animation-easing-default', animation.easingDefault);
  addVar('animation-easing-emphasized', animation.easingEmphasized);

  const opacity = tokens.opacity ?? layoutTokens.opacity;
  addVar('opacity-disabled', opacity.disabled.toString());
  addVar('opacity-hover', opacity.hover.toString());
  addVar('opacity-pressed', opacity.pressed.toString());

  return `[data-theme="${themeId}"] {\n${lines.join('\n')}\n}`;
}
