import { test, expect } from './fixtures';
import {
  navigateToThemeOption,
  interceptThemeCSS,
  removeThemeCSSInterception,
} from './helpers';

/**
 * Edge case tests for theme functionality.
 *
 * Tests:
 * - Invalid localStorage values
 * - Rapid theme switching
 * - Theme dropdown interaction patterns
 * - Network failures and offline behavior
 */
test.describe('Theme Edge Cases', () => {
  test('should handle rapid theme switching', async ({ homePage }) => {
    await homePage.goto();

    await test.step('Rapidly switch between themes', async () => {
      // Switch to catppuccin-mocha
      await homePage.selectTheme('catppuccin-mocha');

      // Immediately switch to catppuccin-latte
      await homePage.selectTheme('catppuccin-latte');

      // Immediately switch back to catppuccin-mocha
      await homePage.selectTheme('catppuccin-mocha');
    });

    await test.step('Verify final theme is correctly applied', async () => {
      await homePage.expectThemeApplied('catppuccin-mocha');
    });
  });

  test('should handle theme dropdown closing on outside click', async ({
    homePage,
  }) => {
    await homePage.goto();

    await test.step('Open theme dropdown', async () => {
      await homePage.openThemeDropdown();
    });

    await test.step('Click outside dropdown', async () => {
      // Click on main content element - ensure it's visible and not overlapping dropdown
      const mainContent = homePage.getMainContent();
      await expect(mainContent).toBeVisible();
      await mainContent.click();
    });

    await test.step('Verify dropdown closed', async () => {
      const dropdown = homePage.getThemeDropdown();
      // Verify dropdown is closed (no active class) - using Playwright's expect
      // which automatically waits for the condition
      await expect(dropdown).not.toHaveClass(/is-active/);
    });
  });

  test('should maintain theme consistency across page navigations', async ({
    basePage,
  }) => {
    await basePage.goto('/');

    await test.step('Set theme to catppuccin-mocha', async () => {
      await basePage.selectTheme('catppuccin-mocha');
      await basePage.expectThemeApplied('catppuccin-mocha');
    });

    await test.step('Navigate to components page', async () => {
      await basePage.navigateToPage('components');
    });

    await test.step('Verify theme persists on components page', async () => {
      await basePage.expectThemeApplied('catppuccin-mocha');
    });

    await test.step('Navigate to forms page', async () => {
      await basePage.navigateToPage('forms');
    });

    await test.step('Verify theme persists on forms page', async () => {
      await basePage.expectThemeApplied('catppuccin-mocha');
    });

    await test.step('Navigate back to home', async () => {
      await basePage.navigateToPage('home');
    });

    await test.step('Verify theme still persists on home page', async () => {
      await basePage.expectThemeApplied('catppuccin-mocha');
    });
  });

  test('should handle empty localStorage gracefully', async ({ homePage }) => {
    await test.step('Navigate to page, then clear localStorage before reload to test default theme loading', async () => {
      await homePage.goto();
      await homePage.page.evaluate(() => localStorage.clear());
    });

    await test.step('Reload and verify default theme loads', async () => {
      await homePage.page.reload();
      await homePage.page.waitForLoadState('domcontentloaded');

      // Should load with a default theme
      const htmlElement = homePage.page.locator('html');
      const htmlClasses = await htmlElement.getAttribute('class');

      // Verify the expected default theme is applied
      expect(htmlClasses).toMatch(/(?:^|\s)theme-catppuccin-mocha(?:\s|$)/);
    });
  });

  test('should update theme CSS link href correctly', async ({ homePage }) => {
    await homePage.goto();

    await test.step('Switch to catppuccin-mocha and verify CSS link', async () => {
      await homePage.selectTheme('catppuccin-mocha');

      const themeCss = homePage.page.locator('link[data-theme-id="catppuccin-mocha"]');
      const href = await themeCss.getAttribute('href');

      expect(href).toContain('catppuccin-mocha.css');
    });

    await test.step('Switch to catppuccin-latte and verify CSS link updated', async () => {
      await homePage.selectTheme('catppuccin-latte');

      const themeCss = homePage.page.locator('link[data-theme-id="catppuccin-latte"]');
      const href = await themeCss.getAttribute('href');

      expect(href).toContain('catppuccin-latte.css');
      expect(href).not.toContain('catppuccin-mocha.css');
    });
  });

  test.describe('Keyboard Accessibility', () => {
    test('should focus theme trigger and open dropdown with Enter', async ({
      homePage,
      themeDropdown,
    }) => {
      await homePage.goto();

      await test.step('Focus the theme trigger', async () => {
        await themeDropdown.trigger.focus();
        const isFocused = await themeDropdown.trigger.evaluate(
          (el) => document.activeElement === el
        );
        expect(isFocused).toBe(true);
        // Verify tabindex is accessible (should be 0 or not set for button)
        const tabIndex = await themeDropdown.trigger.getAttribute('tabindex');
        expect(tabIndex === null || tabIndex === '0').toBe(true);
      });

      await test.step('Open dropdown with Enter key', async () => {
        await homePage.page.keyboard.press('Enter');
        // Wait for dropdown to become active
        await expect(themeDropdown.dropdown).toHaveClass(/is-active/);
        // Verify dropdown panel is visible
        await expect(themeDropdown.dropdown).toBeVisible();
        // Verify aria-expanded is set correctly
        const ariaExpanded = await themeDropdown.trigger.getAttribute('aria-expanded');
        expect(ariaExpanded).toBe('true');
      });

      await test.step('Navigate options with arrow keys', async () => {
        const options = homePage.page.locator('.dropdown-item[data-theme-id]');
        await expect(options.first()).toBeVisible({ timeout: 2000 });

        // Verify first option is focused after opening with Enter
        const firstOption = options.first();
        await expect(firstOption).toBeFocused({ timeout: 1000 });

        // Navigate to second option with ArrowDown
        await homePage.page.keyboard.press('ArrowDown');
        await homePage.page.waitForTimeout(100);
        const secondOption = options.nth(1);
        await expect(secondOption).toBeFocused({ timeout: 1000 });

        // Navigate back to first option with ArrowUp
        await homePage.page.keyboard.press('ArrowUp');
        await homePage.page.waitForTimeout(100);
        await expect(firstOption).toBeFocused({ timeout: 1000 });
      });

      await test.step('Select theme with Enter key', async () => {
        // First option should be focused, press Enter to select
        await homePage.page.keyboard.press('Enter');

        // Verify dropdown closed
        await expect(themeDropdown.dropdown).not.toHaveClass(/is-active/, {
          timeout: 2000,
        });

        // Verify the selected theme is applied
        const options = homePage.page.locator('.dropdown-item[data-theme-id]');
        const firstOption = options.first();
        const selectedThemeId = await firstOption.getAttribute('data-theme-id');
        expect(selectedThemeId).not.toBeNull();
        await homePage.expectThemeApplied(selectedThemeId!);
      });
    });

    test('should open dropdown with Space key', async ({ homePage, themeDropdown }) => {
      await homePage.goto();

      await test.step('Focus trigger and open with Space', async () => {
        await themeDropdown.trigger.focus();
        const isTriggerFocused = await themeDropdown.trigger.evaluate(
          (el) => document.activeElement === el
        );
        expect(isTriggerFocused).toBe(true);

        // Press Space to open dropdown
        await homePage.page.keyboard.press('Space');

        // Wait for dropdown to open
        await expect(themeDropdown.dropdown).toHaveClass(/is-active/);
        await expect(themeDropdown.dropdown).toBeVisible();

        // Verify aria-expanded is set correctly
        const ariaExpanded = await themeDropdown.trigger.getAttribute('aria-expanded');
        expect(ariaExpanded).toBe('true');
      });
    });

    test('should navigate options with ArrowDown and ArrowUp', async ({
      homePage,
      themeDropdown,
    }) => {
      await homePage.goto();

      await test.step('Open dropdown and navigate to first option', async () => {
        await themeDropdown.trigger.focus();
        await homePage.page.keyboard.press('Enter');
        await expect(themeDropdown.dropdown).toHaveClass(/is-active/);

        const firstOption = homePage.page
          .locator('.dropdown-item[data-theme-id]')
          .first();
        await firstOption.waitFor({ state: 'attached' });

        // Wait for first option to be focused after opening with Enter
        // (Enter should focus the first option automatically)
        await expect(async () => {
          const isFocused = await firstOption.evaluate(
            (el) => document.activeElement === el
          );
          const tabIndex = await firstOption.getAttribute('tabindex');
          if (!isFocused || tabIndex !== '0') {
            throw new Error(
              `First option not focused (focused: ${isFocused}, tabindex: ${tabIndex})`
            );
          }
        }).toPass({ timeout: 2000 });

        // If first option is already focused, pressing ArrowDown will move to second
        // So we don't need to press ArrowDown here - first option should already be focused
        // Verify focus state and tabindex
        const isFocused = await firstOption.evaluate(
          (el) => document.activeElement === el
        );
        const tabIndex = await firstOption.getAttribute('tabindex');
        expect(isFocused).toBe(true);
        expect(tabIndex).toBe('0');
      });

      await test.step('Navigate to second option with ArrowDown', async () => {
        await homePage.page.keyboard.press('ArrowDown');
        // Small delay to ensure focus settles
        await homePage.page.waitForTimeout(100);
        const options = homePage.page.locator('.dropdown-item[data-theme-id]');
        const secondOption = options.nth(1);
        await secondOption.waitFor({ state: 'attached' });

        // Verify focus moved to second option
        await expect(async () => {
          const isFocused = await secondOption.evaluate(
            (el) => document.activeElement === el
          );
          const tabIndex = await secondOption.getAttribute('tabindex');
          if (!isFocused || tabIndex !== '0') {
            throw new Error(
              `Second option not focused (focused: ${isFocused}, tabindex: ${tabIndex})`
            );
          }
        }).toPass({ timeout: 2000 });

        // Verify first option no longer has focus
        const firstOption = options.first();
        const firstTabIndex = await firstOption.getAttribute('tabindex');
        expect(firstTabIndex).toBe('-1');
      });

      await test.step('Navigate back with ArrowUp', async () => {
        await homePage.page.keyboard.press('ArrowUp');
        // Small delay to ensure focus settles
        await homePage.page.waitForTimeout(100);
        const firstOption = homePage.page
          .locator('.dropdown-item[data-theme-id]')
          .first();
        await firstOption.waitFor({ state: 'attached' });

        // Verify focus returned to first option
        await expect(async () => {
          const isFocused = await firstOption.evaluate(
            (el) => document.activeElement === el
          );
          const tabIndex = await firstOption.getAttribute('tabindex');
          if (!isFocused || tabIndex !== '0') {
            throw new Error(
              `First option not focused after ArrowUp (focused: ${isFocused}, tabindex: ${tabIndex})`
            );
          }
        }).toPass({ timeout: 2000 });
      });
    });

    test('should select theme with Enter key', async ({ homePage, themeDropdown }) => {
      await homePage.goto();

      await test.step('Open dropdown and navigate to target theme', async () => {
        await themeDropdown.trigger.focus();
        await homePage.page.keyboard.press('Enter');
        await expect(themeDropdown.dropdown).toHaveClass(/is-active/);

        // Wait for dropdown to be fully open and options to be available
        const themeOptions = homePage.page.locator('.dropdown-item[data-theme-id]');
        await expect(themeOptions.first()).toBeVisible({ timeout: 2000 });

        const selectedThemeId = 'catppuccin-mocha';
        const { targetElement } = await navigateToThemeOption(
          homePage.page,
          selectedThemeId
        );

        // Verify target option is focused or selected before selecting
        await expect(targetElement).toBeFocused({ timeout: 3000 });

        // Small delay to ensure focus has settled before selecting
        await homePage.page.waitForTimeout(100);

        // Press Enter to select the theme
        await homePage.page.keyboard.press('Enter');

        // Wait for dropdown to close
        await expect(themeDropdown.dropdown).not.toHaveClass(/is-active/, {
          timeout: 2000,
        });

        // Verify theme was applied
        await homePage.expectThemeApplied(selectedThemeId);

        // Verify trigger is focused after selection
        await expect(themeDropdown.trigger).toBeFocused({ timeout: 2000 });
      });
    });

    test('should select theme with Space key', async ({ homePage, themeDropdown }) => {
      await homePage.goto();

      await test.step('Open dropdown and select theme with Space', async () => {
        await themeDropdown.trigger.focus();
        await homePage.page.keyboard.press('Enter');
        await expect(themeDropdown.dropdown).toHaveClass(/is-active/);

        // Wait for dropdown to be fully open and options to be available
        const themeOptions = homePage.page.locator('.dropdown-item[data-theme-id]');
        await expect(themeOptions.first()).toBeVisible({ timeout: 2000 });

        const selectedThemeId = 'catppuccin-latte';
        const { targetElement } = await navigateToThemeOption(
          homePage.page,
          selectedThemeId
        );

        // Verify target option is focused or selected before selecting
        await expect(targetElement).toBeFocused({ timeout: 3000 });

        // Small delay to ensure focus has settled before selecting
        await homePage.page.waitForTimeout(100);

        // Press Space to select the theme
        await homePage.page.keyboard.press('Space');

        // Wait for dropdown to close
        await expect(themeDropdown.dropdown).not.toHaveClass(/is-active/, {
          timeout: 2000,
        });

        // Verify theme was applied
        await homePage.expectThemeApplied(selectedThemeId);

        // Verify trigger is focused after selection
        await expect(themeDropdown.trigger).toBeFocused({ timeout: 2000 });
      });
    });

    test('should close dropdown with Escape key', async ({
      homePage,
      themeDropdown,
    }) => {
      await homePage.goto();

      await test.step('Open dropdown and close with Escape', async () => {
        await themeDropdown.trigger.focus();
        await homePage.page.keyboard.press('Enter');
        await expect(themeDropdown.dropdown).toHaveClass(/is-active/);

        await homePage.page.keyboard.press('Escape');
        // Wait for dropdown to close
        await expect(themeDropdown.dropdown).not.toHaveClass(/is-active/, {
          timeout: 1000,
        });
        // Verify trigger is focused after closing
        await expect(themeDropdown.trigger).toBeFocused({ timeout: 2000 });
        // Verify aria-expanded is false
        const ariaExpanded = await themeDropdown.trigger.getAttribute('aria-expanded');
        expect(ariaExpanded).toBe('false');
      });
    });

    test('should navigate with Home and End keys', async ({
      homePage,
      themeDropdown,
    }) => {
      await homePage.goto();

      await test.step('Open dropdown and navigate to middle option', async () => {
        await themeDropdown.trigger.focus();
        await homePage.page.keyboard.press('Enter');
        await expect(themeDropdown.dropdown).toHaveClass(/is-active/);

        // Navigate to middle option
        await homePage.page.keyboard.press('ArrowDown');
        await homePage.page.keyboard.press('ArrowDown');
        const middleOption = homePage.page
          .locator('.dropdown-item[data-theme-id]')
          .nth(2);
        await expect(middleOption).toBeFocused({ timeout: 1000 });
      });

      await test.step('Jump to first option with Home key', async () => {
        await homePage.page.keyboard.press('Home');
        const firstOption = homePage.page
          .locator('.dropdown-item[data-theme-id]')
          .first();
        await expect(firstOption).toBeFocused({ timeout: 1000 });
        const tabIndex = await firstOption.getAttribute('tabindex');
        expect(tabIndex).toBe('0');
      });

      await test.step('Jump to last option with End key', async () => {
        await homePage.page.keyboard.press('End');
        const options = homePage.page.locator('.dropdown-item[data-theme-id]');
        const count = await options.count();
        const lastOption = options.nth(count - 1);
        await expect(lastOption).toBeFocused({ timeout: 1000 });
        const tabIndex = await lastOption.getAttribute('tabindex');
        expect(tabIndex).toBe('0');
      });
    });

    test('should handle boundary conditions with arrow key wrapping', async ({
      homePage,
      themeDropdown,
    }) => {
      await homePage.goto();

      await test.step('Open dropdown and navigate to last option', async () => {
        await themeDropdown.trigger.focus();
        await homePage.page.keyboard.press('Enter');
        await expect(themeDropdown.dropdown).toHaveClass(/is-active/);

        const options = homePage.page.locator('.dropdown-item[data-theme-id]');
        const count = await options.count();

        // Navigate to last option
        await homePage.page.keyboard.press('End');
        const lastOption = options.nth(count - 1);
        await expect(lastOption).toBeFocused({ timeout: 1000 });
      });

      await test.step('ArrowDown at last option wraps to first', async () => {
        await homePage.page.keyboard.press('ArrowDown');
        const firstOption = homePage.page
          .locator('.dropdown-item[data-theme-id]')
          .first();
        await expect(firstOption).toBeFocused({ timeout: 1000 });
      });

      await test.step('ArrowUp at first option wraps to last', async () => {
        await homePage.page.keyboard.press('ArrowUp');
        const options = homePage.page.locator('.dropdown-item[data-theme-id]');
        const count = await options.count();
        const lastOption = options.nth(count - 1);
        await expect(lastOption).toBeFocused({ timeout: 1000 });
      });
    });

    test('should handle rapid keyboard interactions', async ({
      homePage,
      themeDropdown,
    }) => {
      await homePage.goto();

      await test.step('Rapid ArrowDown presses', async () => {
        await themeDropdown.trigger.focus();
        await homePage.page.keyboard.press('Enter');
        await expect(themeDropdown.dropdown).toHaveClass(/is-active/);

        // Wait for dropdown to be fully open and first option to be focused
        const options = homePage.page.locator('.dropdown-item[data-theme-id]');
        await expect(options.first()).toBeVisible({ timeout: 2000 });

        // Wait for first option to be focused after opening with Enter
        await expect(async () => {
          const isFocused = await options
            .first()
            .evaluate((el) => document.activeElement === el);
          if (!isFocused) {
            throw new Error('First option not focused after opening dropdown');
          }
        }).toPass({ timeout: 2000 });

        // Press ArrowDown multiple times with delays to ensure focus settles
        // Start from index 0 (first option), so 3 presses will move to index 3 (4th option)
        // With 4 themes total, we can navigate to the last option
        for (let i = 0; i < 3; i++) {
          await homePage.page.keyboard.press('ArrowDown');
          // Add delay between presses to ensure focus settles
          await homePage.page.waitForTimeout(100);
        }

        // Verify we're on the 4th option (index 3)
        const fourthOption = options.nth(3);
        await expect(fourthOption).toBeFocused({ timeout: 3000 });
      });

      await test.step('Rapid ArrowUp presses', async () => {
        // Press ArrowUp multiple times with delays
        for (let i = 0; i < 2; i++) {
          await homePage.page.keyboard.press('ArrowUp');
          // Add delay between presses to ensure focus settles
          await homePage.page.waitForTimeout(100);
        }

        // Verify we're on the 2nd option (index 1)
        const options = homePage.page.locator('.dropdown-item[data-theme-id]');
        const secondOption = options.nth(1);
        await expect(secondOption).toBeFocused({ timeout: 3000 });
      });

      await test.step('Rapid Enter presses', async () => {
        // Press Enter rapidly - should select and close dropdown
        await homePage.page.keyboard.press('Enter');

        // Verify dropdown closed
        await expect(themeDropdown.dropdown).not.toHaveClass(/is-active/, {
          timeout: 2000,
        });

        // Verify theme was applied (should be the 2nd theme)
        const options = homePage.page.locator('.dropdown-item[data-theme-id]');
        const secondOption = options.nth(1);
        const selectedThemeId = await secondOption.getAttribute('data-theme-id');
        expect(selectedThemeId).not.toBeNull();
        await homePage.expectThemeApplied(selectedThemeId!);
      });
    });

    test('should navigate through all themes using only keyboard', async ({
      homePage,
      themeDropdown,
    }) => {
      await homePage.goto();

      await test.step('Open dropdown', async () => {
        await themeDropdown.trigger.focus();
        await homePage.page.keyboard.press('Enter');
        await expect(themeDropdown.dropdown).toHaveClass(/is-active/);
      });

      await test.step('Navigate through all themes and verify each can be focused', async () => {
        const options = homePage.page.locator('.dropdown-item[data-theme-id]');
        const count = await options.count();

        // After opening with Enter, first option should already be focused
        const firstOption = options.first();
        await expect(firstOption).toBeFocused({ timeout: 1000 });

        // Verify first option tabindex
        const firstTabIndex = await firstOption.getAttribute('tabindex');
        expect(firstTabIndex).toBe('0');

        // Navigate through remaining options
        for (let i = 1; i < count; i++) {
          await homePage.page.keyboard.press('ArrowDown');
          const currentOption = options.nth(i);
          await expect(currentOption).toBeFocused({ timeout: 1000 });

          // Verify tabindex is set correctly
          const tabIndex = await currentOption.getAttribute('tabindex');
          expect(tabIndex).toBe('0');

          // Verify previous option has tabindex="-1"
          const previousOption = options.nth(i - 1);
          const previousTabIndex = await previousOption.getAttribute('tabindex');
          expect(previousTabIndex).toBe('-1');
        }
      });

      await test.step('Select last theme with Enter', async () => {
        await homePage.page.keyboard.press('Enter');

        // Verify dropdown closed
        await expect(themeDropdown.dropdown).not.toHaveClass(/is-active/, {
          timeout: 2000,
        });

        // Verify last theme was applied
        const options = homePage.page.locator('.dropdown-item[data-theme-id]');
        const count = await options.count();
        const lastOption = options.nth(count - 1);
        const selectedThemeId = await lastOption.getAttribute('data-theme-id');
        expect(selectedThemeId).not.toBeNull();
        await homePage.expectThemeApplied(selectedThemeId!);
      });
    });

    test('should handle keyboard navigation from different initial states', async ({
      homePage,
      themeDropdown,
    }) => {
      await homePage.goto();

      await test.step('Set initial theme', async () => {
        await homePage.selectTheme('catppuccin-mocha');
        await homePage.expectThemeApplied('catppuccin-mocha');
      });

      await test.step('Open dropdown with ArrowDown and verify initial focus', async () => {
        await themeDropdown.trigger.focus();
        await homePage.page.keyboard.press('ArrowDown');
        await expect(themeDropdown.dropdown).toHaveClass(/is-active/);

        // ArrowDown should focus first option
        const firstOption = homePage.page
          .locator('.dropdown-item[data-theme-id]')
          .first();
        await expect(firstOption).toBeFocused({ timeout: 1000 });
      });

      await test.step('Close and reopen with ArrowUp', async () => {
        await homePage.page.keyboard.press('Escape');
        await expect(themeDropdown.dropdown).not.toHaveClass(/is-active/);

        await themeDropdown.trigger.focus();
        await homePage.page.keyboard.press('ArrowUp');
        await expect(themeDropdown.dropdown).toHaveClass(/is-active/);

        // ArrowUp should focus last option when opening
        const options = homePage.page.locator('.dropdown-item[data-theme-id]');
        const count = await options.count();
        const lastOption = options.nth(count - 1);
        await expect(lastOption).toBeFocused({ timeout: 1000 });
      });

      await test.step('Verify navigation works from last option', async () => {
        await homePage.page.keyboard.press('ArrowUp');
        const options = homePage.page.locator('.dropdown-item[data-theme-id]');
        const secondToLastOption = options.nth((await options.count()) - 2);
        await expect(secondToLastOption).toBeFocused({ timeout: 1000 });
      });
    });
  });

  test('should handle theme switching in offline mode', async ({ homePage }) => {
    await homePage.goto();

    await test.step('Set initial theme', async () => {
      await homePage.selectTheme('catppuccin-mocha');
      await homePage.expectThemeApplied('catppuccin-mocha');
    });

    await test.step('Switch theme while offline', async () => {
      await homePage.page.context().setOffline(true);
      try {
        // Theme switching should still work (localStorage and DOM updates)
        // even if CSS file can't be loaded
        await homePage.selectTheme('catppuccin-latte');

        // Verify theme CSS class is updated (this doesn't require network)
        await expect(homePage.page.locator('html')).toHaveClass(
          /(?:^|\s)theme-catppuccin-latte(?:\s|$)/
        );

        // Verify localStorage is updated
        const storedTheme = await homePage.page.evaluate(() =>
          localStorage.getItem('turbo-theme')
        );
        expect(storedTheme).toBe('catppuccin-latte');
      } finally {
        await homePage.page.context().setOffline(false);
      }
    });
  });

  test('should handle CSS file load failures gracefully', async ({ homePage }) => {
    await homePage.goto();

    await test.step('Set initial theme', async () => {
      await homePage.selectTheme('catppuccin-mocha');
      await homePage.expectThemeApplied('catppuccin-mocha');
    });

    await test.step('Intercept CSS requests and verify theme switching despite failure', async () => {
      // Intercept requests to theme CSS files and abort to simulate network failure
      await interceptThemeCSS(homePage.page, 'failed');

      try {
        // Theme switching should still update DOM and localStorage
        // even if CSS file fails to load
        await homePage.selectTheme('catppuccin-latte');

        // Verify theme CSS class is updated
        await expect(homePage.page.locator('html')).toHaveClass(
          /(?:^|\s)theme-catppuccin-latte(?:\s|$)/
        );

        // Verify localStorage is updated
        const storedTheme = await homePage.page.evaluate(() =>
          localStorage.getItem('turbo-theme')
        );
        expect(storedTheme).toBe('catppuccin-latte');

        // Verify CSS link is loaded (even if load fails)
        const themeCss = homePage.page.locator(
          'link[data-theme-id="catppuccin-latte"]'
        );
        const href = await themeCss.getAttribute('href');
        expect(href).toContain('catppuccin-latte.css');
      } finally {
        // Always remove route interception to prevent breaking later tests
        await removeThemeCSSInterception(homePage.page);
      }
    });

    await test.step('Verify CSS loads on reload after interception removed', async () => {
      await homePage.page.reload();
      await homePage.page.waitForLoadState('domcontentloaded');

      // Theme should still be applied
      await homePage.expectThemeApplied('catppuccin-latte');
    });
  });

  test('should handle network timeout when loading theme CSS', async ({ homePage }) => {
    await homePage.goto();

    await test.step('Set initial theme', async () => {
      await homePage.selectTheme('catppuccin-mocha');
      await homePage.expectThemeApplied('catppuccin-mocha');
    });

    await test.step('Intercept CSS requests and simulate timeout', async () => {
      // Intercept requests to theme CSS files and abort with timeout error
      await interceptThemeCSS(homePage.page, 'timedout');

      try {
        await test.step('Switch theme despite CSS load timeout', async () => {
          // Theme switching should still work for DOM and localStorage
          await homePage.selectTheme('catppuccin-mocha');

          // Verify theme CSS class is updated immediately
          await expect(homePage.page.locator('html')).toHaveClass(
            /(?:^|\s)theme-catppuccin-mocha(?:\s|$)/
          );

          // Verify localStorage is updated
          const storedTheme = await homePage.page.evaluate(() =>
            localStorage.getItem('turbo-theme')
          );
          expect(storedTheme).toBe('catppuccin-mocha');
        });
      } finally {
        await removeThemeCSSInterception(homePage.page);
      }
    });
  });
});
