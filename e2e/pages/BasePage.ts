import { Page, Locator, expect } from '@playwright/test';
import { ThemeDropdown } from './components/ThemeDropdown';

/**
 * Extended Window interface to include initNavbar function.
 */
interface Window {
  initNavbar?: (doc: globalThis.Document) => void;
}

import { escapeRegex, escapeCssAttributeSelector } from '../helpers';

/**
 * Base page object with common navigation and theme functionality.
 * All page objects should extend this class.
 */
export class BasePage {
  readonly page: Page;
  #themeDropdown: ThemeDropdown | undefined;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Ensure navbar is initialized after page load.
   * Waits for DOM content, checks for initNavbar function, calls it, and verifies navbar is ready.
   */
  async #ensureNavbarInitialized(): Promise<void> {
    // Wait for page to be interactive
    await this.page.waitForLoadState('domcontentloaded');

    // Wait for the script module to load and initNavbar to be available
    await this.page.waitForFunction(
      () =>
        typeof window !== 'undefined' &&
        typeof (window as Window).initNavbar === 'function',
      { timeout: 5000 }
    );

    // Ensure navbar is initialized by calling initNavbar
    await this.page.evaluate(() => {
      const win = window as Window;
      if (win.initNavbar) {
        win.initNavbar(document);
      }
    });

    // Wait for navbar to be initialized (check for active link if on a page with nav)
    await this.page
      .waitForSelector('nav .navbar-item.is-active', { timeout: 2000 })
      .catch(() => {
        // If no active link found, that's okay - might be on a page without matching nav
      });
  }

  /**
   * Navigate to a specific path.
   */
  async goto(path: string = '/'): Promise<void> {
    await this.page.goto(path);
    await this.#ensureNavbarInitialized();
  }

  /**
   * Get navbar link by test ID.
   */
  getNavLink(name: string): Locator {
    return this.page.getByTestId(`nav-${name}`);
  }

  /**
   * Navigate to a page using navbar link.
   * Verifies that the URL changes to match the link's href after clicking.
   * @param pageName - The name of the page to navigate to (e.g., "home", "components", "forms").
   * @throws Error if navigation fails or URL does not match expected path.
   */
  async navigateToPage(pageName: string): Promise<void> {
    const link = this.getNavLink(pageName);

    // Get the expected URL from the link's href attribute
    const href = await link.getAttribute('href');
    if (!href) {
      throw new Error(`Navigation link "${pageName}" does not have an href attribute`);
    }

    // Normalize the href to get the pathname (handles both absolute and relative URLs)
    let expectedPath: string;
    try {
      // If href is absolute, extract pathname
      const url = new URL(href, this.page.url());
      expectedPath = url.pathname;
    } catch (err) {
      // Treat URL parsing failures as relative hrefs
      if (err instanceof TypeError) {
        expectedPath = href;
      } else {
        // Rethrow unexpected errors to avoid hiding genuine failures
        throw err;
      }
    }

    // Normalize path: remove trailing slashes for comparison (except root)
    const normalizedExpectedPath =
      expectedPath === '/' ? '/' : expectedPath.replace(/\/$/, '');

    // Click the link
    await link.click();

    // Wait for navigation to complete and verify URL matches
    const timeout = 10000; // 10 seconds timeout
    try {
      await this.page.waitForURL(
        (url) => {
          const currentPath =
            url.pathname === '/' ? '/' : url.pathname.replace(/\/$/, '');
          return currentPath === normalizedExpectedPath;
        },
        { timeout }
      );
    } catch {
      const currentUrl = this.page.url();
      throw new Error(
        `Navigation to "${pageName}" failed: expected URL path "${normalizedExpectedPath}", but got "${currentUrl}"`
      );
    }

    await this.#ensureNavbarInitialized();
  }

  /**
   * Verify that a navbar link is active.
   */
  async expectNavLinkActive(pageName: string): Promise<void> {
    const link = this.getNavLink(pageName);
    await expect(link).toHaveClass(/is-active/);
  }

  /**
   * Verify that a navbar link is visible.
   */
  async expectNavLinkVisible(pageName: string): Promise<void> {
    const link = this.getNavLink(pageName);
    await expect(link).toBeVisible();
  }

  /**
   * Get all navbar links dynamically by discovering nav items from the DOM.
   *
   * Discovers all navigation links by finding elements with data-testid attributes
   * starting with "nav-", extracts the nav names, and maps each to a Locator.
   *
   * @param navNames - Optional array of nav names to use instead of discovering from DOM.
   *                   If provided, only these names will be included in the result.
   * @returns A record mapping nav names to their Locators.
   */
  async getAllNavLinks(navNames?: string[]): Promise<Record<string, Locator>> {
    let names: string[];

    if (navNames && navNames.length > 0) {
      // Use provided nav names
      names = navNames;
    } else {
      // Discover nav names from DOM by finding all elements with data-testid starting with "nav-"
      const navLinkElements = await this.page.locator('[data-testid^="nav-"]').all();

      const namesWithNulls = await Promise.all(
        navLinkElements.map(async (element) => {
          const testId = await element.getAttribute('data-testid');
          if (!testId) {
            return null;
          }
          // Extract nav name by removing "nav-" prefix
          return testId.replace(/^nav-/, '');
        })
      );

      // Filter out null values and ensure we have valid names
      names = namesWithNulls.filter(
        (name): name is string => name !== null && name.length > 0
      );
    }

    // Map each name to its Locator using getNavLink
    const links: Record<string, Locator> = {};
    for (const name of names) {
      links[name] = this.getNavLink(name);
    }

    return links;
  }

  /**
   * Get the theme dropdown element.
   */
  getThemeDropdown(): Locator {
    return this.page.getByTestId('theme-dropdown');
  }

  /**
   * Get the theme trigger button.
   */
  getThemeTrigger(): Locator {
    return this.page.getByTestId('theme-trigger');
  }

  /**
   * Get a ThemeDropdown instance for interacting with the theme dropdown.
   * Returns a cached instance to maintain state consistency.
   */
  getThemeDropdownComponent(): ThemeDropdown {
    if (!this.#themeDropdown) {
      this.#themeDropdown = new ThemeDropdown(this.page);
    }
    return this.#themeDropdown;
  }

  /**
   * Open the theme dropdown by hovering.
   * Delegates to ThemeDropdown component.
   */
  async openThemeDropdown(): Promise<void> {
    const themeDropdown = this.getThemeDropdownComponent();
    await themeDropdown.open();
  }

  /**
   * Select a theme from the dropdown.
   * Delegates to ThemeDropdown component and waits for theme to be applied.
   */
  async selectTheme(themeId: string): Promise<void> {
    const themeDropdown = this.getThemeDropdownComponent();
    await themeDropdown.selectTheme(themeId);
    // Wait for theme to be applied before returning
    await this.expectThemeApplied(themeId);
  }

  /**
   * Verify the current theme is applied.
   */
  async expectThemeApplied(themeId: string): Promise<void> {
    // Check HTML theme CSS class
    const escapedThemeId = escapeRegex(themeId);
    await expect(this.page.locator('html')).toHaveClass(
      new RegExp(`(?:^|\\s)theme-${escapedThemeId}(?:\\s|$)`)
    );

    // Check localStorage with polling to handle race conditions
    await expect
      .poll(
        async () => {
          return await this.page.evaluate(() => localStorage.getItem('turbo-theme'));
        },
        { timeout: 5000 }
      )
      .toBe(themeId);

    // Check that theme CSS is loaded (dynamically added link element)
    const escapedThemeIdForCss = escapeRegex(themeId);
    const themeCss = this.page.locator(
      `link[data-theme-id="${escapeCssAttributeSelector(themeId)}"]`
    );
    await expect(themeCss).toHaveAttribute(
      'href',
      new RegExp(`${escapedThemeIdForCss}\\.css`)
    );
  }

  /**
   * Verify theme dropdown is visible.
   */
  async expectThemeDropdownVisible(): Promise<void> {
    await expect(this.getThemeDropdown()).toBeVisible();
    await expect(this.getThemeTrigger()).toBeVisible();
  }

  /**
   * Get the current page URL.
   */
  getUrl(): string {
    return this.page.url();
  }

  /**
   * Verify the current URL matches a pattern or predicate.
   */
  async expectUrl(pattern: string | RegExp | ((url: URL) => boolean)): Promise<void> {
    await expect(this.page).toHaveURL(pattern);
  }

  /**
   * Get the main content element.
   */
  getMainContent(): Locator {
    return this.page.getByTestId('main-content');
  }

  /**
   * Get the theme CSS link element.
   */
  getThemeCss(): Locator {
    return this.page.locator('#theme-flavor-css');
  }
}
