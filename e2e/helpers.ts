import { type Page, type Locator, expect } from '@playwright/test';

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
  highlightColors = ['rgba(255, 0, 0, 0.3)', 'rgba(0, 255, 0, 0.3)', 'rgba(0, 0, 255, 0.3)']
): Promise<void> {
  try {
    // Add visual highlighting boxes to all elements
    for (let i = 0; i < elements.length; i++) {
      const color = highlightColors[i % highlightColors.length];
      await elements[i].evaluate(
        (el, { highlightColor, index }) => {
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
        { highlightColor: color, index: i }
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
  const themeOptions = page.locator('.theme-option[data-theme]');
  const allOptions = await themeOptions.all();

  // Synchronously find the target index by iterating and awaiting getAttribute
  let targetIndex = -1;
  for (let i = 0; i < allOptions.length; i++) {
    const themeId = await allOptions[i].getAttribute('data-theme');
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
  const isFirstFocused = await firstOption.evaluate((el) => document.activeElement === el);

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
      const isFocused = await targetElement.evaluate((el) => document.activeElement === el);
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
    const isFocused = await targetElement.evaluate((el) => document.activeElement === el);
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
export async function waitForStylesheetLoad(locator: Locator): Promise<void> {
  await locator.evaluate((el) =>
    (el as HTMLLinkElement).sheet
      ? Promise.resolve()
      : new Promise<void>((resolve, reject) => {
          el.addEventListener('load', () => resolve(), { once: true });
          el.addEventListener('error', () => reject(new Error('theme css failed to load')), {
            once: true,
          });
        })
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

/** Route pattern matching every theme stylesheet served by the site. */
export const THEME_CSS_ROUTE = '**/assets/css/themes/**/*.css';

/**
 * Serves theme stylesheets with external Google-Fonts @imports stripped.
 *
 * Theme stylesheets start with Google Fonts @imports. CI blocks external
 * font hosts (harden-runner egress policy), which makes the stylesheet
 * <link> fire `error` and the selector roll the lazy load back (#698/#699).
 * Stripping the external imports makes theme application deterministic
 * across local and CI environments. Unroute with
 * `page.unroute(THEME_CSS_ROUTE)` or `page.unrouteAll(...)` when done.
 *
 * @param page - The Playwright page object
 */
export async function serveThemeCssWithoutExternalImports(page: Page): Promise<void> {
  await page.route(THEME_CSS_ROUTE, async (route) => {
    const response = await route.fetch();
    const body = (await response.text()).replace(/@import url\((?:'|")https?:[^)]*\);/g, '');
    const headers = { ...response.headers() };
    // Body was rewritten (and decompressed by response.text()); drop stale
    // length/encoding so Playwright recomputes headers for the new body.
    delete headers['content-length'];
    delete headers['content-encoding'];
    await route.fulfill({ response, body, headers });
  });
}

/**
 * Blocks remote webfont requests so visual captures always render with the
 * fallback font stack.
 *
 * Linux CI baselines are captured with Google Fonts unreachable
 * (harden-runner egress policy), but enforcement can degrade and let the
 * webfont load, flipping dense-text screenshots between two renderings
 * (#706). Aborting the font-host requests up front pins Linux rendering to
 * the fallback stack. macOS baselines are captured locally where the
 * webfont loads, so the block is scoped to Linux to keep each platform
 * consistent with its own baselines.
 *
 * @param page - The Playwright page object
 */
export async function blockRemoteFonts(page: Page): Promise<void> {
  if (process.platform !== 'linux') return;
  await page.route(/https:\/\/fonts\.(googleapis|gstatic)\.com/, (route) => route.abort());
}

/**
 * Waits for document fonts to finish loading before visual captures.
 *
 * Font-metric differences between the fallback and the webfont cause
 * full-page and viewport screenshot flakes when baselines are captured
 * before `document.fonts.ready` settles.
 *
 * @param page - The Playwright page object
 */
export async function waitForFontsReady(page: Page): Promise<void> {
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
}

/**
 * Computes the WCAG contrast ratio between an element's text color and its
 * effective background color.
 *
 * The effective background is resolved by walking up the ancestor chain and
 * alpha-compositing translucent background colors (e.g. color-mix results)
 * until an opaque layer is found. Background images/gradients are ignored,
 * matching axe-core's flat-color approximation.
 *
 * @param target - Locator for the element whose text contrast is measured
 * @returns The contrast ratio (1..21)
 */
export async function getContrastRatio(target: Locator): Promise<number> {
  return target.evaluate((el) => {
    /** Parse a computed CSS color into rgba components (0..255, alpha 0..1). */
    const parseColor = (value: string): { r: number; g: number; b: number; a: number } | null => {
      const legacy = value.match(
        /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/
      );
      if (legacy) {
        return {
          r: Number(legacy[1]),
          g: Number(legacy[2]),
          b: Number(legacy[3]),
          a: legacy[4] === undefined ? 1 : Number(legacy[4]),
        };
      }
      const modern = value.match(
        /^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)$/
      );
      if (modern) {
        return {
          r: Number(modern[1]) * 255,
          g: Number(modern[2]) * 255,
          b: Number(modern[3]) * 255,
          a: modern[4] === undefined ? 1 : Number(modern[4]),
        };
      }
      return null;
    };

    type Rgba = { r: number; g: number; b: number; a: number };

    /** Composite a translucent foreground layer over an opaque background. */
    const over = (fg: Rgba, bg: Rgba): Rgba => ({
      r: fg.r * fg.a + bg.r * (1 - fg.a),
      g: fg.g * fg.a + bg.g * (1 - fg.a),
      b: fg.b * fg.a + bg.b * (1 - fg.a),
      a: 1,
    });

    /**
     * Extract gradient color stops from a computed background-image. Computed
     * styles serialize stop colors as rgb()/rgba()/color(srgb …), so the same
     * parser applies. Returns [] for none/unparseable images.
     */
    const gradientStops = (image: string): Rgba[] => {
      if (!image || image === 'none' || !image.includes('gradient(')) return [];
      const stops: Rgba[] = [];
      const colorPattern = /rgba?\([^)]+\)|color\(srgb[^)]+\)/g;
      for (const match of image.match(colorPattern) ?? []) {
        const parsed = parseColor(match);
        if (parsed) stops.push(parsed);
      }
      return stops;
    };

    // Collect background layers from the element upward until opaque. The
    // first gradient encountered contributes its stops: contrast is later
    // evaluated against EVERY stop and the worst ratio wins, since text sits
    // on all of them as the gradient sweeps (#741).
    const layers: Rgba[] = [];
    let stops: Rgba[] = [];
    let node: Element | null = el;
    let foundOpaque = false;
    while (node) {
      const style = getComputedStyle(node);
      if (stops.length === 0) {
        stops = gradientStops(style.backgroundImage);
        if (stops.length > 0 && stops.every((s) => s.a >= 1)) {
          foundOpaque = true;
          break;
        }
      }
      const bgValue = style.backgroundColor;
      const parsed = parseColor(bgValue);
      if (!parsed) {
        // Fail loudly on unknown spaces (oklch/lab/display-p3, etc.) so a
        // silent skip cannot under-report contrast when themes leave sRGB.
        throw new Error(`Unparsable background color: ${bgValue}`);
      }
      if (parsed.a > 0) {
        layers.push(parsed);
        if (parsed.a >= 1) {
          foundOpaque = true;
          break;
        }
      }
      node = node.parentElement;
    }
    if (!foundOpaque) {
      layers.push({ r: 255, g: 255, b: 255, a: 1 });
    }

    let background = layers[layers.length - 1] as Rgba;
    for (let i = layers.length - 2; i >= 0; i--) {
      background = over(layers[i] as Rgba, background);
    }

    // With a gradient present, the effective backgrounds are its stops
    // (translucent stops composited over the backdrop resolved above).
    const backgrounds: Rgba[] =
      stops.length > 0 ? stops.map((s) => (s.a >= 1 ? { ...s, a: 1 } : over(s, background))) : [background];

    const textColor = parseColor(getComputedStyle(el).color);
    if (!textColor) {
      throw new Error(`Unparsable text color: ${getComputedStyle(el).color}`);
    }

    /** WCAG relative luminance of an opaque sRGB color. */
    const luminance = (c: Rgba): number => {
      const channel = (v: number): number => {
        const s = v / 255;
        return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * channel(c.r) + 0.7152 * channel(c.g) + 0.0722 * channel(c.b);
    };

    let worst = Infinity;
    for (const bg of backgrounds) {
      const text = textColor.a < 1 ? over(textColor, bg) : textColor;
      const l1 = luminance(text);
      const l2 = luminance(bg);
      worst = Math.min(worst, (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05));
    }
    return worst;
  });
}

/**
 * Waits for a theme to be fully applied by checking CSS custom properties.
 * More reliable than waitForTimeout as it confirms actual CSS application.
 *
 * @param page - The Playwright page instance
 * @param themeId - The theme ID to wait for (optional, just verifies CSS vars exist)
 * @param timeoutMs - Maximum time to wait (default: 5000ms)
 */
export async function waitForThemeApplied(page: Page, themeId?: string, timeoutMs = 5000): Promise<boolean> {
  try {
    await page.waitForFunction(
      (expectedTheme) => {
        const style = getComputedStyle(document.documentElement);
        const bgBase = style.getPropertyValue('--turbo-bg-base');
        // Check that CSS variables are populated (non-empty)
        if (!bgBase || bgBase.trim() === '') {
          return false;
        }
        if (!expectedTheme) {
          return true;
        }
        if (document.documentElement.dataset.theme !== expectedTheme) {
          return false;
        }

        // Href can update before the sheet's custom properties paint. Read the
        // expected brand from the active theme stylesheet and wait until the
        // computed value matches (avoids mid-swap / transition contrast flakes).
        const link = document.querySelector('#turbo-theme-css') as HTMLLinkElement | null;
        if (!link?.href?.includes(`${expectedTheme}.css`) || !link.sheet) {
          return false;
        }
        let expectedBrand = '';
        for (const rule of Array.from(link.sheet.cssRules)) {
          if (!(rule instanceof CSSStyleRule)) continue;
          const value = rule.style.getPropertyValue('--turbo-brand-primary').trim();
          if (value) {
            expectedBrand = value;
            break;
          }
        }
        if (!expectedBrand) {
          return false;
        }
        const actualBrand = style.getPropertyValue('--turbo-brand-primary').trim();
        return actualBrand === expectedBrand;
      },
      themeId,
      { timeout: timeoutMs }
    );
    return true;
  } catch {
    console.warn(`Theme application timed out after ${timeoutMs}ms${themeId ? ` for theme "${themeId}"` : ''}`);
    return false;
  }
}
