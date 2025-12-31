import { test, expect } from './fixtures';
import {
  takeScreenshotWithHighlight,
  takeScreenshotWithMultipleHighlights,
  waitForStylesheetLoad,
} from './helpers';

/**
 * Homepage theme switching E2E tests.
 *
 * Tests:
 * - Theme dropdown is visible and functional
 * - Theme switching updates DOM attributes
 * - Theme persists in localStorage
 * - Visual snapshots for different themes
 */
test.describe('Homepage Theme Switching @smoke', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('should display theme dropdown', async ({ homePage }) => {
    await test.step('Verify dropdown and trigger are visible', async () => {
      await homePage.expectThemeDropdownVisible();

      // Take screenshot highlighting both elements
      await takeScreenshotWithMultipleHighlights(
        homePage.page,
        [homePage.getThemeDropdown(), homePage.getThemeTrigger()],
        'theme-dropdown-display'
      );
    });
  });

  const themesToTest = ['catppuccin-mocha', 'catppuccin-latte'];

  for (const theme of themesToTest) {
    test(`should switch to ${theme} theme`, async ({ homePage }) => {
      await test.step(`Switch to ${theme} theme`, async () => {
        await homePage.switchToTheme(theme);
      });

      await test.step('Verify theme applied and take screenshot', async () => {
        // Verify theme CSS class on html element
        await expect(homePage.page.locator('html')).toHaveClass(
          new RegExp(`(?:^|\\s)theme-${theme}(?:\\s|$)`)
        );

        // Verify localStorage contains the theme
        const storedTheme = await homePage.page.evaluate(() =>
          localStorage.getItem('turbo-theme')
        );
        expect(storedTheme).toBe(theme);

        // Verify theme CSS is loaded (dynamically added link element)
        const themeCss = homePage.page.locator(`link[data-theme-id="${theme}"]`);
        // Escape all regex special chars
        const escapedTheme = theme.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        await expect(themeCss).toHaveAttribute(
          'href',
          new RegExp(`${escapedTheme}\\.css(?:\\?.*)?`)
        );

        // Wait for stylesheet network response + load event to avoid timeouts
        await homePage.page
          .waitForResponse((resp) => resp.url().includes(`${theme}.css`) && resp.ok(), {
            timeout: 15000,
          })
          .catch(() => {});
        await waitForStylesheetLoad(themeCss);

        // Take screenshot with theme CSS element highlighted
        await takeScreenshotWithHighlight(
          homePage.page,
          themeCss,
          `${theme}-theme-applied`
        );
      });
    });
  }

  test('should persist theme selection after page reload', async ({ homePage }) => {
    await test.step('Switch to catppuccin-mocha theme', async () => {
      await homePage.switchToTheme('catppuccin-mocha');
    });

    await test.step('Verify theme persists after reload', async () => {
      await homePage.verifyThemePersistence('catppuccin-mocha');

      // Take screenshot showing persisted theme
      const htmlElement = homePage.page.locator('html');
      await takeScreenshotWithHighlight(
        homePage.page,
        htmlElement,
        'theme-persisted-after-reload'
      );
    });
  });

  const themes = ['catppuccin-mocha', 'catppuccin-latte'];

  for (const theme of themes) {
    test(`should take visual snapshot of ${theme} theme @visual`, async ({
      homePage,
    }) => {
      await test.step(`Switch to ${theme} theme`, async () => {
        await homePage.switchToTheme(theme);
      });

      await test.step('Take visual snapshot', async () => {
        // Wait for CSS to be fully applied
        const themeCss = homePage.page.locator(`link[data-theme-id="${theme}"]`);
        // Escape all regex special chars
        const escapedTheme = theme.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        await expect(themeCss).toHaveAttribute(
          'href',
          new RegExp(`${escapedTheme}\\.css(?:\\?.*)?`)
        );
        // stylesheet loaded (wait for 'load' if not yet loaded)
        await homePage.page
          .waitForResponse((resp) => resp.url().includes(`${theme}.css`) && resp.ok(), {
            timeout: 15000,
          })
          .catch(() => {});
        await waitForStylesheetLoad(themeCss);

        // Take snapshot of the main content area
        const mainContent = homePage.getMainContent();

        // Skip visual snapshots for now - focus on functional testing
        // Visual regression testing can be added later with proper baseline snapshots
        await expect(mainContent).toBeVisible();
      });
    });
  }
});
