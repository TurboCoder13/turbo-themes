import { expect, test } from './fixtures';
import { takeScreenshotWithHighlight, takeScreenshotWithMultipleHighlights } from './helpers';
import type { BasePage } from './pages/BasePage';

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
 * @param pageName - The name of the page to navigate to ("components" | "themes").
 * @param urlPattern - The regex pattern to match the expected URL.
 * @param otherLinkNames - Array of other link names that should not be active.
 */
async function testNavigation(
  basePage: BasePage,
  pageName: 'components' | 'themes',
  urlPattern: RegExp,
  otherLinkNames: Array<'home' | 'components' | 'themes'>
): Promise<void> {
  const link = basePage.getNavLink(pageName);

  await test.step(`Take screenshot before navigation`, async () => {
    await takeScreenshotWithHighlight(basePage.page, link, `before-navigate-${pageName}`);
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
      `${pageName} link should have active class after navigation`
    ).toHaveClass(/active/);

    // Verify other links are not active
    for (const otherLinkName of otherLinkNames) {
      await expect(
        basePage.getNavLink(otherLinkName),
        `${otherLinkName} link should not be active when on ${pageName} page`
      ).not.toHaveClass(/active/);
    }

    // Take screenshot after navigation
    await takeScreenshotWithHighlight(basePage.page, activeLink, `after-navigate-${pageName}`);
  });
}

test.describe('Navigation Smoke Tests @smoke', () => {
  test.beforeEach(async ({ basePage }) => {
    await basePage.goto('/');
  });

  test('should render the restored bubble examples layout', async ({ basePage }) => {
    await basePage.goto('/examples/');
    await expect(basePage.page.getByTestId('examples-heading')).toBeVisible();

    const firstCard = basePage.page.locator('.example-card').first();
    const bubble = firstCard.locator('.example-bubble');
    await expect(firstCard).toBeVisible();
    await expect(bubble).toBeVisible();

    const cardBox = await firstCard.boundingBox();
    const bubbleBox = await bubble.boundingBox();
    expect(cardBox, 'example card box').toBeTruthy();
    expect(bubbleBox, 'example bubble box').toBeTruthy();

    // Compact bubble cards (pre-#705 density), not full-bleed sparse surface cards.
    expect(cardBox!.width).toBeLessThanOrEqual(320);
    expect(Math.abs((bubbleBox!.width ?? 0) - (bubbleBox!.height ?? 0))).toBeLessThanOrEqual(2);

    const hero = basePage.page.locator('.examples-hero');
    await expect(hero).toHaveCSS('text-align', 'center');
  });

  test('should display all navbar links', async ({ basePage }) => {
    await test.step('Verify all navbar links are visible', async () => {
      const links = await basePage.getAllNavLinks();

      await basePage.expectNavLinkVisible('home');
      await basePage.expectNavLinkVisible('components');
      await basePage.expectNavLinkVisible('themes');

      // Verify initial active state: Home link should be active on home page
      await expect(links.home, 'Home link should be active on initial page load').toHaveClass(
        /active/
      );

      // Verify other links are not active initially
      await expect(
        links.components,
        'Components link should not be active on home page'
      ).not.toHaveClass(/active/);
      await expect(links.themes, 'Forms link should not be active on home page').not.toHaveClass(
        /active/
      );

      // Take screenshot highlighting all navbar links
      await takeScreenshotWithMultipleHighlights(
        basePage.page,
        [links.home, links.components, links.themes],
        'navbar-links-display'
      );
    });
  });

  test('should navigate to Components page', async ({ basePage }) => {
    await testNavigation(basePage, 'components', /\/components\/?$/, ['home', 'themes']);
  });

  test('should navigate to Forms page', async ({ basePage }) => {
    await testNavigation(basePage, 'themes', /\/themes\/?$/, ['home', 'components']);
  });

  test('should keep exactly one active nav link per section page', async ({
    basePage,
  }) => {
    const pages: Array<{ path: string; expected: 'home' | 'themes' | 'examples' }> = [
      { path: '/', expected: 'home' },
      { path: '/themes/', expected: 'themes' },
      { path: '/examples/', expected: 'examples' },
    ];

    for (const { path, expected } of pages) {
      await test.step(`${path}: exactly one active nav link matching ${expected}`, async () => {
        await basePage.goto(path);
        const activeLinks = basePage.page.locator('nav a.nav-link.active');
        await expect(activeLinks).toHaveCount(1);
        await expect(basePage.getNavLink(expected)).toHaveClass(/active/);
        await expect(activeLinks.first()).toHaveAttribute('aria-current', 'page');
      });
    }
  });

  // #742 reproduced at constrained desktop widths — wide enough that the full
  // nav is still rendered (above the 768px mobile-menu breakpoint), narrow
  // enough that the brand used to be squeezed under the first nav pill. A very
  // wide viewport has slack to spare and cannot catch the regression.
  const overlapWidths = [1280, 1024, 900];

  for (const width of overlapWidths) {
    test(`should not overlap the brand with the first nav pill at ${width}px`, async ({
      basePage,
    }) => {
      await basePage.page.setViewportSize({ width, height: 900 });
      await basePage.goto('/');

      const brand = basePage.page.getByTestId('navbar-brand');
      const homeLink = basePage.getNavLink('home');
      await expect(brand).toBeVisible();
      await expect(homeLink).toBeVisible();

      const brandBox = await brand.boundingBox();
      const homeBox = await homeLink.boundingBox();
      expect(brandBox, 'brand bounding box').toBeTruthy();
      expect(homeBox, 'home nav bounding box').toBeTruthy();

      const overlaps =
        brandBox!.x < homeBox!.x + homeBox!.width &&
        brandBox!.x + brandBox!.width > homeBox!.x &&
        brandBox!.y < homeBox!.y + homeBox!.height &&
        brandBox!.y + brandBox!.height > homeBox!.y;

      expect(
        overlaps,
        `brand and Home nav pill must not intersect at ${width}px`
      ).toBe(false);
    });
  }

  test('should navigate back to Home page', async ({ basePage }) => {
    await test.step('First navigate to Components', async () => {
      await basePage.navigateToPage('components');
      await basePage.expectUrl(/\/components\/?$/);

      // Verify Components is active before navigating away
      await expect(
        basePage.getNavLink('components'),
        'Components link should be active before navigating to Home'
      ).toHaveClass(/active/);
    });

    const homeLink = basePage.getNavLink('home');

    await test.step('Take screenshot before navigating back', async () => {
      await takeScreenshotWithHighlight(basePage.page, homeLink, 'before-navigate-home');
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
        'Home link should have active class after navigation'
      ).toHaveClass(/active/);

      // Verify other links are not active
      await expect(
        basePage.getNavLink('components'),
        'Components link should not be active when on Home page'
      ).not.toHaveClass(/active/);
      await expect(
        basePage.getNavLink('themes'),
        'Forms link should not be active when on Home page'
      ).not.toHaveClass(/active/);

      // Take screenshot after navigating back
      await takeScreenshotWithHighlight(basePage.page, activeHome, 'after-navigate-home');
    });
  });
});
