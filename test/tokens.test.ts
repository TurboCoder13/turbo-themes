import { describe, it, expect } from 'vitest';
import {
  flavors,
  packages,
  themesById,
  getTheme,
  getTokens,
  getThemesByAppearance,
  getThemesByVendor,
  themeIds,
  vendors,
} from '../src/tokens/index';

describe('tokens/index', () => {
  describe('flavors', () => {
    it('exports an array of theme flavors', () => {
      expect(Array.isArray(flavors)).toBe(true);
      expect(flavors.length).toBeGreaterThan(0);
    });

    it('each flavor has required properties', () => {
      flavors.forEach((flavor) => {
        expect(flavor).toHaveProperty('id');
        expect(flavor).toHaveProperty('label');
        expect(flavor).toHaveProperty('vendor');
        expect(flavor).toHaveProperty('appearance');
        expect(flavor).toHaveProperty('tokens');
        expect(['light', 'dark']).toContain(flavor.appearance);
      });
    });

    it('each flavor has complete tokens', () => {
      flavors.forEach((flavor) => {
        const { tokens } = flavor;
        expect(tokens).toHaveProperty('background');
        expect(tokens).toHaveProperty('text');
        expect(tokens).toHaveProperty('brand');
        expect(tokens).toHaveProperty('state');
        expect(tokens).toHaveProperty('border');
        expect(tokens).toHaveProperty('accent');
        expect(tokens).toHaveProperty('typography');
        expect(tokens).toHaveProperty('content');
      });
    });
  });

  describe('packages', () => {
    it('exports theme packages', () => {
      expect(packages).toHaveProperty('bulma');
      expect(packages).toHaveProperty('catppuccin');
      expect(packages).toHaveProperty('dracula');
      expect(packages).toHaveProperty('github');
    });

    it('each package has required properties', () => {
      Object.values(packages).forEach((pkg) => {
        expect(pkg).toHaveProperty('id');
        expect(pkg).toHaveProperty('name');
        expect(pkg).toHaveProperty('homepage');
        expect(pkg).toHaveProperty('flavors');
        expect(Array.isArray(pkg.flavors)).toBe(true);
      });
    });
  });

  describe('themesById', () => {
    it('indexes all themes by ID', () => {
      expect(Object.keys(themesById).length).toBe(flavors.length);
      flavors.forEach((flavor) => {
        expect(themesById[flavor.id]).toBe(flavor);
      });
    });
  });

  describe('getTheme', () => {
    it('returns a theme by ID', () => {
      const theme = getTheme('catppuccin-mocha');
      expect(theme).toBeDefined();
      expect(theme?.id).toBe('catppuccin-mocha');
    });

    it('returns undefined for unknown ID', () => {
      const theme = getTheme('nonexistent-theme');
      expect(theme).toBeUndefined();
    });
  });

  describe('getTokens', () => {
    it('returns tokens by theme ID', () => {
      const tokens = getTokens('catppuccin-mocha');
      expect(tokens).toBeDefined();
      expect(tokens?.background.base).toBe('#1e1e2e');
    });

    it('returns undefined for unknown ID', () => {
      const tokens = getTokens('nonexistent-theme');
      expect(tokens).toBeUndefined();
    });
  });

  describe('getThemesByAppearance', () => {
    it('filters themes by light appearance', () => {
      const lightThemes = getThemesByAppearance('light');
      expect(lightThemes.length).toBeGreaterThan(0);
      lightThemes.forEach((theme) => {
        expect(theme.appearance).toBe('light');
      });
    });

    it('filters themes by dark appearance', () => {
      const darkThemes = getThemesByAppearance('dark');
      expect(darkThemes.length).toBeGreaterThan(0);
      darkThemes.forEach((theme) => {
        expect(theme.appearance).toBe('dark');
      });
    });
  });

  describe('getThemesByVendor', () => {
    it('filters themes by vendor', () => {
      const catppuccinThemes = getThemesByVendor('catppuccin');
      expect(catppuccinThemes.length).toBeGreaterThan(0);
      catppuccinThemes.forEach((theme) => {
        expect(theme.vendor).toBe('catppuccin');
      });
    });

    it('returns empty array for unknown vendor', () => {
      const themes = getThemesByVendor('nonexistent-vendor');
      expect(themes).toEqual([]);
    });
  });

  describe('themeIds', () => {
    it('lists all theme IDs', () => {
      expect(Array.isArray(themeIds)).toBe(true);
      expect(themeIds.length).toBe(flavors.length);
      expect(themeIds).toContain('catppuccin-mocha');
    });
  });

  describe('vendors', () => {
    it('lists all unique vendors', () => {
      expect(Array.isArray(vendors)).toBe(true);
      expect(vendors).toContain('catppuccin');
      expect(vendors).toContain('github');
      // Should be unique
      expect(new Set(vendors).size).toBe(vendors.length);
    });
  });
});
