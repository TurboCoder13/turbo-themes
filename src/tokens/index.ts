// SPDX-License-Identifier: MIT
/**
 * Platform-agnostic design tokens export
 *
 * This module exports pure theme data (colors, typography, etc.) without
 * any DOM, CSS, or platform-specific code. Use this for:
 *
 * - React Native apps
 * - Flutter apps (via JSON export)
 * - iOS/Android native apps
 * - Any platform that needs theme colors
 *
 * For web apps, you can also import the CSS files directly:
 * import '@turbocoder13/turbo-themes/css/catppuccin-mocha.css'
 */

// Re-export types for consumers
export type { ThemeTokens, ThemeFlavor, ThemePackage } from '../themes/types.js';

// Import all theme packs
import { bulmaThemes } from '../themes/packs/bulma.js';
import { catppuccinSynced } from '../themes/packs/catppuccin.synced.js';
import { draculaThemes } from '../themes/packs/dracula.js';
import { githubSynced } from '../themes/packs/github.synced.js';
import type { ThemeFlavor, ThemeTokens } from '../themes/types.js';

/**
 * All available theme packages
 */
export const packages = {
  bulma: bulmaThemes,
  catppuccin: catppuccinSynced,
  dracula: draculaThemes,
  github: githubSynced,
} as const;

/**
 * All available theme flavors as a flat array
 */
export const flavors: readonly ThemeFlavor[] = [
  ...bulmaThemes.flavors,
  ...catppuccinSynced.flavors,
  ...draculaThemes.flavors,
  ...githubSynced.flavors,
] as const;

/**
 * Theme flavors indexed by ID for quick lookup
 */
export const themesById: Record<string, ThemeFlavor> = Object.fromEntries(
  flavors.map((flavor) => [flavor.id, flavor])
);

/**
 * Get a theme by ID
 * @param id - Theme identifier (e.g., 'catppuccin-mocha')
 * @returns The theme flavor or undefined if not found
 */
export function getTheme(id: string): ThemeFlavor | undefined {
  return themesById[id];
}

/**
 * Get theme tokens by ID (convenience function)
 * @param id - Theme identifier (e.g., 'catppuccin-mocha')
 * @returns The theme tokens or undefined if not found
 */
export function getTokens(id: string): ThemeTokens | undefined {
  return themesById[id]?.tokens;
}

/**
 * Get all themes matching an appearance (light/dark)
 * @param appearance - 'light' or 'dark'
 * @returns Array of matching theme flavors
 */
export function getThemesByAppearance(
  appearance: 'light' | 'dark'
): readonly ThemeFlavor[] {
  return flavors.filter((f) => f.appearance === appearance);
}

/**
 * Get all themes from a specific vendor
 * @param vendor - Vendor name (e.g., 'catppuccin', 'github')
 * @returns Array of matching theme flavors
 */
export function getThemesByVendor(vendor: string): readonly ThemeFlavor[] {
  return flavors.filter((f) => f.vendor === vendor);
}

/**
 * List of all available theme IDs
 */
export const themeIds: readonly string[] = flavors.map((f) => f.id);

/**
 * List of all available vendors
 */
export const vendors: readonly string[] = [...new Set(flavors.map((f) => f.vendor))];
