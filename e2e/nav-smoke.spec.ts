import { test, expect } from './fixtures';
import {
  takeScreenshotWithHighlight,
  takeScreenshotWithMultipleHighlights,
} from './helpers';
import { BasePage } from './pages/BasePage';

/**
 * Navigation smoke tests.
 *
 * Tests basic navigation functionality:
 * - Navbar links are visible
 * - Clicking links navigates correctly
 * - Active state updates appropriately
 */

/**
 * Parameterized helper to test navigation to a page.
 *
 * @param basePage - The base page object.
 * @param pageName - The name of the page to navigate to ("components" | "forms").
 * @param urlPattern - The regex pattern to match the expected URL.
 * @param otherLinkNames - Array of other link names that should not be active.
 */
async function testNavigation(
  basePage: BasePage,
  pageName: 'components' | 'forms',
  urlPattern: RegExp,
  otherLinkNames: Array<'home' | 'components' | 'forms'>
): Promise<void> {
  const link = basePage.getNavLink(pageName);

  await test.step(`Take screenshot before navigation`, async () => {
    await takeScreenshotWithHighlight(
      basePage.page,
      link,
      `before-navigate-${pageName}`
    );
  });

  await test.step(`Navigate to ${pageName} page`, async () => {
    await basePage.navigateToPage(pageName);
  });

  await test.step('Verify navigation successful', async () => {
    await basePage.expectUrl(urlPattern);

    // Verify the link is still visible (navbar is present)
    const activeLink = basePage.getNavLink(pageName);
    await expect(activeLink).toBeVisible();

    // Verify active state: link should be active
    await expect(
      activeLink,
      `${pageName} link should have is-active class after navigation`
    ).toHaveClass(/is-active/);

    // Verify other links are not active
    for (const otherLinkName of otherLinkNames) {
      await expect(
        basePage.getNavLink(otherLinkName),
        `${otherLinkName} link should not be active when on ${pageName} page`
      ).not.toHaveClass(/is-active/);
    }

    // Take screenshot after navigation
    await takeScreenshotWithHighlight(
      basePage.page,
      activeLink,
      `after-navigate-${pageName}`
    );
  });
}

test.describe('Navigation Smoke Tests @smoke', () => {
  test.beforeEach(async ({ basePage }) => {
    await basePage.goto('/');
  });

  test('should display all navbar links', async ({ basePage }) => {
    await test.step('Verify all navbar links are visible', async () => {
      const links = await basePage.getAllNavLinks();

      await basePage.expectNavLinkVisible('home');
      await basePage.expectNavLinkVisible('components');
      await basePage.expectNavLinkVisible('forms');

      // Verify initial active state: Home link should be active on home page
      await expect(
        links.home,
        'Home link should be active on initial page load'
      ).toHaveClass(/is-active/);

      // Verify other links are not active initially
      await expect(
        links.components,
        'Components link should not be active on home page'
      ).not.toHaveClass(/is-active/);
      await expect(
        links.forms,
        'Forms link should not be active on home page'
      ).not.toHaveClass(/is-active/);

      // Take screenshot highlighting all navbar links
      await takeScreenshotWithMultipleHighlights(
        basePage.page,
        [links.home, links.components, links.forms],
        'navbar-links-display'
      );
    });
  });

  test('should navigate to Components page', async ({ basePage }) => {
    await testNavigation(basePage, 'components', /\/components\/?$/, ['home', 'forms']);
  });

  test('should navigate to Forms page', async ({ basePage }) => {
    await testNavigation(basePage, 'forms', /\/forms\/?$/, ['home', 'components']);
  });

  test('should navigate back to Home page', async ({ basePage }) => {
    await test.step('First navigate to Components', async () => {
      await basePage.navigateToPage('components');
      await basePage.expectUrl(/\/components\/?$/);

      // Verify Components is active before navigating away
      await expect(
        basePage.getNavLink('components'),
        'Components link should be active before navigating to Home'
      ).toHaveClass(/is-active/);
    });

    const homeLink = basePage.getNavLink('home');

    await test.step('Take screenshot before navigating back', async () => {
      await takeScreenshotWithHighlight(
        basePage.page,
        homeLink,
        'before-navigate-home'
      );
    });

    await test.step('Navigate back to Home', async () => {
      await basePage.navigateToPage('home');
    });

    await test.step('Verify navigation to home successful', async () => {
      await basePage.expectUrl((url) => url.pathname === '/' || url.pathname === '');

      // Verify the link is still visible (navbar is present)
      const activeHome = basePage.getNavLink('home');
      await expect(activeHome).toBeVisible();

      // Verify active state: Home link should be active
      await expect(
        activeHome,
        'Home link should have is-active class after navigation'
      ).toHaveClass(/is-active/);

      // Verify other links are not active
      await expect(
        basePage.getNavLink('components'),
        'Components link should not be active when on Home page'
      ).not.toHaveClass(/is-active/);
      await expect(
        basePage.getNavLink('forms'),
        'Forms link should not be active when on Home page'
      ).not.toHaveClass(/is-active/);

      // Take screenshot after navigating back
      await takeScreenshotWithHighlight(
        basePage.page,
        activeHome,
        'after-navigate-home'
      );
    });
  });
});
