import { Page, Locator, expect } from '@playwright/test';

/**
 * Escapes a string for safe use in CSS attribute selectors.
 * Escapes backslashes and double quotes to prevent selector injection.
 *
 * @param value - The string value to escape
 * @returns The escaped string safe for use in CSS attribute selectors
 */
export function escapeCssAttributeSelector(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

/**
 * Escapes regex metacharacters in a string for safe use in RegExp.
 * Prevents regex injection attacks by escaping special characters.
 *
 * @param str - The string to escape
 * @returns The escaped string safe for use in RegExp
 */
export function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Converts a color string (rgba/hsla/hex8) to an opaque version.
 * Falls back to the original color if conversion fails.
 *
 * @param color - Color string in rgba, hsla, or hex8 format
 * @returns Opaque color string
 */
function toOpaqueColor(color: string): string {
  try {
    // Handle rgba colors: rgba(r, g, b, a) -> rgba(r, g, b, 1)
    const rgbaMatch = color.match(
      /^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*[\d.]+)?\s*\)$/i
    );
    if (rgbaMatch) {
      return `rgb(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]})`;
    }

    // Handle hsla colors: hsla(h, s%, l%, a) -> hsl(h, s%, l%)
    const hslaMatch = color.match(
      /^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%(?:\s*,\s*[\d.]+)?\s*\)$/i
    );
    if (hslaMatch) {
      return `hsl(${hslaMatch[1]}, ${hslaMatch[2]}%, ${hslaMatch[3]}%)`;
    }

    // Handle 8-digit hex colors: #RRGGBBAA -> #RRGGBB
    const hex8Match = color.match(/^#([0-9a-f]{8})$/i);
    if (hex8Match) {
      return `#${hex8Match[1].slice(0, 6)}`;
    }

    // Handle 4-digit hex colors: #RGBA -> #RGB
    const hex4Match = color.match(/^#([0-9a-f]{4})$/i);
    if (hex4Match) {
      const r = hex4Match[1][0];
      const g = hex4Match[1][1];
      const b = hex4Match[1][2];
      return `#${r}${r}${g}${g}${b}${b}`;
    }
  } catch {
    // Fall through to return original color
  }

  // Fallback: return original color if conversion fails
  return color;
}

/**
 * Helper function to take a screenshot with visual annotations.
 * Highlights the element being tested by overlaying a semi-transparent color.
 *
 * @param page - The Playwright page object
 * @param element - The element to highlight
 * @param screenshotName - Name for the screenshot file
 * @param highlightColor - Color to use for highlighting (default: red with 30% opacity)
 */
export async function takeScreenshotWithHighlight(
  page: Page,
  element: Locator,
  screenshotName: string,
  highlightColor = 'rgba(255, 0, 0, 0.3)'
): Promise<void> {
  // Compute opaque color for border
  const opaqueColor = toOpaqueColor(highlightColor);

  // Add visual highlighting box to the element
  await element.evaluate(
    (el, { backgroundColor, borderColor }) => {
      const box = el.getBoundingClientRect();
      const highlight = document.createElement('div');
      highlight.style.position = 'absolute';
      highlight.style.top = `${box.top + window.scrollY}px`;
      highlight.style.left = `${box.left + window.scrollX}px`;
      highlight.style.width = `${box.width}px`;
      highlight.style.height = `${box.height}px`;
      highlight.style.backgroundColor = backgroundColor;
      highlight.style.border = `2px solid ${borderColor}`;
      highlight.style.pointerEvents = 'none';
      highlight.style.zIndex = '999999';
      highlight.setAttribute('data-test-highlight', 'true');
      document.body.appendChild(highlight);
    },
    { backgroundColor: highlightColor, borderColor: opaqueColor }
  );

  // Wait for the highlight element to be present in the DOM
  await page.waitForSelector('[data-test-highlight="true"]');

  // Wait for one frame to ensure rendering is complete
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => resolve());
      })
  );

  try {
    // Take screenshot
    await page.screenshot({
      path: `test-results/${screenshotName}.png`,
      fullPage: true,
    });
  } finally {
    // Clean up the highlight - always runs even if errors occur
    await page.evaluate(() => {
      const highlights = document.querySelectorAll('[data-test-highlight]');
      highlights.forEach((h) => h.remove());
    });
  }
}

/**
 * Helper function to highlight multiple elements in a screenshot.
 *
 * @param page - The Playwright page object
 * @param elements - Array of elements to highlight
 * @param screenshotName - Name for the screenshot file
 * @param highlightColors - Colors to use for each element (cycles if fewer colors than elements)
 */
export async function takeScreenshotWithMultipleHighlights(
  page: Page,
  elements: Locator[],
  screenshotName: string,
  highlightColors = [
    'rgba(255, 0, 0, 0.3)',
    'rgba(0, 255, 0, 0.3)',
    'rgba(0, 0, 255, 0.3)',
  ]
): Promise<void> {
  try {
    // Add visual highlighting boxes to all elements
    for (let i = 0; i < elements.length; i++) {
      const color = highlightColors[i % highlightColors.length];
      await elements[i].evaluate(
        (el, highlightColor, index) => {
          const box = el.getBoundingClientRect();
          const highlight = document.createElement('div');
          highlight.style.position = 'absolute';
          highlight.style.top = `${box.top + window.scrollY}px`;
          highlight.style.left = `${box.left + window.scrollX}px`;
          highlight.style.width = `${box.width}px`;
          highlight.style.height = `${box.height}px`;
          highlight.style.backgroundColor = highlightColor;
          highlight.style.border = '2px solid rgba(0, 0, 0, 0.8)';
          highlight.style.pointerEvents = 'none';
          highlight.style.zIndex = String(999999 - index);
          highlight.setAttribute('data-test-highlight', `true-${index}`);
          document.body.appendChild(highlight);
        },
        color,
        i
      );
    }

    // Wait briefly to ensure highlights are rendered
    await page.waitForTimeout(50);

    // Take screenshot
    await page.screenshot({
      path: `test-results/${screenshotName}.png`,
      fullPage: true,
    });
  } finally {
    // Clean up all highlights - always runs even if errors occur
    await page.evaluate(() => {
      const highlights = document.querySelectorAll('[data-test-highlight]');
      highlights.forEach((h) => h.remove());
    });
  }
}

/**
 * Navigates to a theme option using keyboard navigation.
 * Locates all theme options, finds the target by theme ID, presses ArrowDown
 * the required number of times, and waits for the target to be focused or selected.
 *
 * @param page - The Playwright page object
 * @param selectedThemeId - The theme ID to navigate to
 * @returns An object containing the target element locator and its index
 */
export async function navigateToThemeOption(
  page: Page,
  selectedThemeId: string
): Promise<{ targetElement: Locator; targetIndex: number }> {
  // Locate all theme options
  const themeOptions = page.locator('.dropdown-item[data-theme-id]');
  const allOptions = await themeOptions.all();

  // Synchronously find the target index by iterating and awaiting getAttribute
  let targetIndex = -1;
  for (let i = 0; i < allOptions.length; i++) {
    const themeId = await allOptions[i].getAttribute('data-theme-id');
    if (themeId === selectedThemeId) {
      targetIndex = i;
      break;
    }
  }

  if (targetIndex < 0) {
    throw new Error(`Theme option with ID "${selectedThemeId}" not found`);
  }

  // Get the target element locator
  const targetElement = themeOptions.nth(targetIndex);

  // Wait for dropdown to be fully open and options to be available
  await expect(themeOptions.first()).toBeVisible({ timeout: 2000 });

  // Check if first option is already focused (e.g., if dropdown was opened with Enter)
  const firstOption = themeOptions.first();
  const isFirstFocused = await firstOption.evaluate(
    (el) => document.activeElement === el
  );

  // If first option is not focused, press ArrowDown to focus it
  // If it's already focused and targetIndex is 0, we're done
  if (!isFirstFocused) {
    await page.keyboard.press('ArrowDown');
    // Wait for first option to be focused
    await expect(async () => {
      const focused = await firstOption.evaluate((el) => document.activeElement === el);
      if (!focused) {
        throw new Error('First option is not focused after ArrowDown');
      }
    }).toPass({ timeout: 1000 });
  }

  // If target is already at index 0 and focused, we're done
  if (targetIndex === 0) {
    // Verify focus
    await expect(async () => {
      const isFocused = await targetElement.evaluate(
        (el) => document.activeElement === el
      );
      if (!isFocused) {
        throw new Error('Target option (index 0) is not focused');
      }
    }).toPass({ timeout: 1000 });
    return { targetElement, targetIndex };
  }

  // Navigate from first option (index 0) to target option
  // Press ArrowDown (targetIndex) times to reach the target
  for (let i = 0; i < targetIndex; i++) {
    await page.keyboard.press('ArrowDown');
    // Wait longer between presses to ensure focus settles
    await page.waitForTimeout(100);
  }

  // Wait for the target option to be focused with increased timeout
  await expect(async () => {
    const isFocused = await targetElement.evaluate(
      (el) => document.activeElement === el
    );
    const tabIndex = await targetElement.getAttribute('tabindex');
    if (!isFocused && tabIndex !== '0') {
      throw new Error(
        `Target option is not focused (focused: ${isFocused}, tabindex: ${tabIndex})`
      );
    }
  }).toPass({ timeout: 3000 });

  return { targetElement, targetIndex };
}

/**
 * Waits for a stylesheet link element to be fully loaded.
 * Checks if the sheet property exists (already loaded) or waits for the 'load' event.
 * Rejects if the stylesheet fails to load.
 *
 * @param locator - The Playwright locator for the stylesheet link element
 * @returns Promise that resolves when the stylesheet is loaded
 * @throws Error if the stylesheet fails to load
 */
export async function waitForStylesheetLoad(
  locator: Locator,
  timeoutMs: number = 8000
): Promise<void> {
  await locator.evaluate(
    (el, timeout) =>
      (el as HTMLLinkElement).sheet
        ? Promise.resolve()
        : new Promise<void>((resolve, reject) => {
            const to = window.setTimeout(() => {
              resolve();
            }, timeout);
            el.addEventListener(
              'load',
              () => {
                window.clearTimeout(to);
                resolve();
              },
              { once: true }
            );
            el.addEventListener(
              'error',
              () => {
                window.clearTimeout(to);
                reject(new Error('theme css failed to load'));
              },
              { once: true }
            );
          }),
    timeoutMs
  );
}

/**
 * Intercepts CSS requests and aborts theme CSS files while allowing other CSS to load.
 * This is useful for testing theme switching behavior when CSS files fail to load.
 *
 * @param page - The Playwright page object
 * @param abortReason - The reason to abort the request ('failed' or 'timedout')
 */
export async function interceptThemeCSS(
  page: Page,
  abortReason: 'failed' | 'timedout'
): Promise<void> {
  await page.route('**/*.css', (route) => {
    const url = route.request().url();
    // Only abort theme CSS files, not other CSS
    if (url.includes('themes/')) {
      route.abort(abortReason);
    } else {
      route.continue();
    }
  });
}

/**
 * Removes CSS route interception previously set up by interceptThemeCSS.
 *
 * @param page - The Playwright page object
 */
export async function removeThemeCSSInterception(page: Page): Promise<void> {
  await page.unroute('**/*.css');
}
