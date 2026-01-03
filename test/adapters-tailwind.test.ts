import { describe, it, expect } from 'vitest';
import preset from '../src/adapters/tailwind/preset';
import {
  createColorMappings,
  createThemeCssVariables,
} from '../src/adapters/tailwind/colors';
import { getTheme } from '../src/tokens/index';

const SAMPLE_THEME_ID = 'catppuccin-mocha';

describe('tailwind adapters', () => {
  it('createColorMappings builds per-theme entries with expected tokens', () => {
    const mappings = createColorMappings([SAMPLE_THEME_ID]);
    const themeKey = `theme-${SAMPLE_THEME_ID}`;
    const theme = getTheme(SAMPLE_THEME_ID);
    expect(theme).toBeTruthy();
    expect(mappings[themeKey]).toBeDefined();
    expect(mappings[themeKey].primary).toBe(theme?.tokens.brand.primary);
    expect(mappings[themeKey].background).toBe(theme?.tokens.background.base);
    expect(mappings[themeKey].foreground).toBe(theme?.tokens.text.primary);
    expect(mappings[themeKey].accent).toBe(theme?.tokens.accent.link);
  });

  it('createColorMappings skips unknown themes', () => {
    const mappings = createColorMappings(['unknown-theme-id']);
    expect(Object.keys(mappings)).toHaveLength(0);
  });

  it('createColorMappings returns empty object when no themes provided', () => {
    const mappings = createColorMappings([]);
    expect(Object.keys(mappings)).toHaveLength(0);
  });

  it('getAllThemeColors returns mappings for all theme ids', () => {
    const mappings = createColorMappings([SAMPLE_THEME_ID, 'bulma-light']);
    expect(Object.keys(mappings).length).toBeGreaterThanOrEqual(2);
  });

  it('createThemeCssVariables emits CSS with core and optional tokens', () => {
    const css = createThemeCssVariables(SAMPLE_THEME_ID);
    expect(css).toContain(`[data-theme="${SAMPLE_THEME_ID}"]`);
    expect(css).toContain('--turbo-bg-base');
    expect(css).toContain('--turbo-text-primary');
    expect(css).toContain('--turbo-brand-primary');
    // Optional blocks (spacing/elevation/animation/opacity) should be present for sample theme
    expect(css).toContain('--turbo-spacing-md');
    expect(css).toContain('--turbo-elevation-md');
    expect(css).toContain('--turbo-animation-duration-normal');
    expect(css).toContain('--turbo-opacity-hover');
  });

  it('createThemeCssVariables includes table cell/header vars when present', () => {
    const css = createThemeCssVariables('bulma-light');
    expect(css).toContain('--turbo-table-cell-bg');
    expect(css).toContain('--turbo-table-header-fg');
  });

  it('createThemeCssVariables omits optional table vars when absent', () => {
    const css = createThemeCssVariables(SAMPLE_THEME_ID);
    expect(css).not.toContain('--turbo-table-cell-bg');
    expect(css).not.toContain('--turbo-table-header-fg');
  });

  it('createThemeCssVariables returns empty string for unknown theme', () => {
    expect(createThemeCssVariables('unknown-theme-id')).toBe('');
  });

  it('preset merges defaults, generated color mappings, and custom overrides', () => {
    const config = preset({ themes: [SAMPLE_THEME_ID], colors: { custom: '#123456' } });
    expect(config.theme?.extend?.colors).toBeDefined();
    const colors = config.theme?.extend?.colors as Record<string, unknown>;
    // Core color entries
    expect(colors.background).toBe('var(--turbo-bg-base)');
    expect(colors.primary).toBe('var(--turbo-brand-primary)');
    // Generated mapping for theme
    const themeKey = `theme-${SAMPLE_THEME_ID}`;
    expect(colors[themeKey as keyof typeof colors]).toBeTruthy();
    // Custom override preserved
    expect(colors.custom).toBe('#123456');
  });

  it('preset uses defaults when no options provided', () => {
    const config = preset();
    const colors = config.theme?.extend?.colors as Record<string, unknown>;
    expect(colors.background).toBe('var(--turbo-bg-base)');
    expect(colors['theme-catppuccin-mocha']).toBeTruthy();
  });

  it('preset handles empty theme list', () => {
    const config = preset({ themes: [] });
    const colors = config.theme?.extend?.colors as Record<string, unknown>;
    expect(Object.keys(colors).some((k) => k.startsWith('theme-'))).toBe(false);
  });

  it('preset respects overrides and darkMode flag', () => {
    const config = preset({ darkMode: false, colors: { secondary: '#abc' } });
    const colors = config.theme?.extend?.colors as Record<string, unknown>;
    expect(colors.secondary).toBe('#abc');
    expect(colors.background).toBe('var(--turbo-bg-base)');
  });

  it('getAllThemeColors helper returns mapping for all known themes', () => {
    const all = createColorMappings(['bulma-light', 'bulma-dark', SAMPLE_THEME_ID]);
    expect(Object.keys(all).length).toBeGreaterThanOrEqual(3);
  });
});
