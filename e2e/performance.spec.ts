import { test, expect } from '@playwright/test';

test.describe('Performance @performance', () => {
  test('should have no FOUC on page load', async ({ page }) => {
    await page.goto('/');

    // Check theme class is applied immediately (set by blocking script)
    const htmlClasses = await page.evaluate(() => document.documentElement.className);
    expect(htmlClasses).toMatch(/theme-/);
    expect(htmlClasses).toBeTruthy();
  });

  test('should persist theme after hard refresh', async ({ page }) => {
    await page.goto('/');

    // Switch to a specific theme
    // Hover over the dropdown container to open it (dropdown opens on mouseenter)
    const dropdown = page.getByTestId('theme-dropdown');
    await dropdown.hover();

    const menu = page.getByTestId('theme-menu');
    await expect(menu).toBeVisible();

    // Use role-based locator to target the visible menu item, not the hidden option
    await page.getByRole('menuitemradio', { name: 'Catppuccin Latte' }).click();
    await page.waitForTimeout(500); // Wait for theme to apply

    // Hard refresh
    await page.reload();

    // Theme should be applied immediately after reload
    const htmlClasses = await page.evaluate(() => document.documentElement.className);
    expect(htmlClasses).toContain('theme-catppuccin-latte');
  });

  test('should load CSS files efficiently', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    // Check that base CSS is loaded
    const baseCssLoaded = await page.evaluate(() => {
      const link = document.getElementById('theme-base-css');
      return link !== null;
    });
    expect(baseCssLoaded).toBe(true);
  });

  test('should have compact CSS file sizes', async ({ page, request }) => {
    await page.goto('/');

    // Get the current theme CSS file
    const themeClass = await page.evaluate(() => document.documentElement.className);
    const themeMatch = themeClass.match(/theme-([a-z-]+)/);
    expect(themeMatch).toBeTruthy();

    if (themeMatch) {
      const themeName = themeMatch[1];
      const cssUrl = `/assets/css/themes/compiled/${themeName}.css`;

      const response = await request.get(cssUrl);
      expect(response.status()).toBe(200);

      const content = await response.text();
      const sizeKB = Buffer.byteLength(content, 'utf8') / 1024;

      // After purging, CSS should be under 200KB (we achieved ~144KB)
      expect(sizeKB).toBeLessThan(200);
    }
  });
});
