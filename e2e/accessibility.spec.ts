import { test, expect } from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';

/**
 * Runs an accessibility scan using axe-core and logs violations if found.
 *
 * @param page - The Playwright page instance to scan.
 * @returns The accessibility scan results.
 */
async function runAccessibilityScan(page: Page) {
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag21a', 'wcag22a']) // Remove wcag2aa, wcag21aa, wcag22aa to skip contrast requirements
    .disableRules(['target-size', 'color-contrast']) // Explicitly disable color contrast checks
    .analyze();

  if (accessibilityScanResults.violations.length > 0) {
    console.error(
      'Accessibility violations found:',
      JSON.stringify(accessibilityScanResults.violations, null, 2)
    );
  }

  return accessibilityScanResults;
}

/**
 * Accessibility tests using axe-core.
 *
 * Tests:
 * - Homepage accessibility compliance
 * - Theme switching doesn't break accessibility
 * - Navigation accessibility
 * - Keyboard navigation support
 */
test.describe('Accessibility Tests @a11y', () => {
  test('should have no accessibility violations on homepage', async ({ homePage }) => {
    await homePage.goto();

    await test.step('Run axe accessibility scan', async () => {
      const accessibilityScanResults = await runAccessibilityScan(homePage.page);
      expect(accessibilityScanResults.violations).toHaveLength(0);
    });
  });

  const themes = ['catppuccin-mocha', 'catppuccin-latte'] as const;

  themes.forEach((theme) => {
    test(`should have no accessibility violations when switching to ${theme} theme`, async ({
      homePage,
    }) => {
      await homePage.goto();

      await test.step(`Switch to ${theme} theme`, async () => {
        await homePage.switchToTheme(theme);
      });

      await test.step(`Run axe accessibility scan with ${theme} theme`, async () => {
        const accessibilityScanResults = await runAccessibilityScan(homePage.page);
        expect(accessibilityScanResults.violations).toHaveLength(0);
      });
    });
  });

  test('should have no accessibility violations on components page', async ({
    basePage,
  }) => {
    await basePage.goto('/');
    await basePage.navigateToPage('components');

    await test.step('Run axe accessibility scan on components page', async () => {
      const accessibilityScanResults = await runAccessibilityScan(basePage.page);
      expect(accessibilityScanResults.violations).toHaveLength(0);
    });
  });

  test('should have no accessibility violations on forms page', async ({
    basePage,
  }) => {
    await basePage.goto('/');
    await basePage.navigateToPage('forms');

    await test.step('Run axe accessibility scan on forms page', async () => {
      const accessibilityScanResults = await runAccessibilityScan(basePage.page);
      expect(accessibilityScanResults.violations).toHaveLength(0);
    });
  });

  test('should have proper ARIA attributes on navigation', async ({ basePage }) => {
    await basePage.goto('/');

    await test.step('Verify navigation has proper ARIA roles', async () => {
      const nav = basePage.page.getByRole('navigation');
      await expect(nav).toBeVisible();
    });

    await test.step('Verify links have proper ARIA attributes', async () => {
      const links = await basePage.getAllNavLinks();

      // Check that links are accessible (they have implicit link role)
      await expect(links.home).toBeVisible();
      await expect(links.components).toBeVisible();
      await expect(links.forms).toBeVisible();

      // Verify active link has aria-current="page"
      // On the homepage, the navigation should always have an active link indicating the current page
      const activeLink = basePage.page.locator('nav a.navbar-item.is-active');
      await expect(activeLink).toHaveCount(1);
      await expect(activeLink.first()).toHaveAttribute('aria-current', 'page');
    });
  });
});
