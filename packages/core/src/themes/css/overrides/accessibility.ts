// SPDX-License-Identifier: MIT
// Accessibility CSS overrides - contrast fixes for specific themes

/**
 * Generate accessibility-related CSS overrides.
 * Includes contrast fixes for themes that need WCAG compliance adjustments.
 * Selectors cover both `data-flavor` (Bulma generator) and `data-theme` (site).
 *
 * All inks are audited theme tokens (the WCAG AA normalizer clamps text,
 * heading and link tokens against background.base/surface), referenced via
 * `var()` instead of literal hexes so a vendor sync that moves a background
 * or an ink can never desync these fixes from the pipeline again (#832).
 * Bulma flavors define `--theme-*` under `html[data-flavor=…]`; the site CSS
 * defines `--turbo-*` under `[data-theme=…]`, hence the chained fallbacks.
 */
export function cssAccessibilityOverrides(): string {
  return `/* Accessibility contrast fixes (Axe / WCAG AA) */
[data-flavor='catppuccin-latte'] .navbar-item,
[data-theme='catppuccin-latte'] .navbar-item,
[data-flavor='catppuccin-latte'] .has-text-centered > p,
[data-theme='catppuccin-latte'] .has-text-centered > p,
[data-flavor='catppuccin-latte'] a.navbar-item,
[data-theme='catppuccin-latte'] a.navbar-item,
[data-flavor='catppuccin-latte'] .title,
[data-theme='catppuccin-latte'] .title {
  color: var(--turbo-text-primary, var(--theme-text, currentColor));
}

[data-flavor='catppuccin-latte'] h1,
[data-theme='catppuccin-latte'] h1 {
  color: var(--turbo-heading-h1, var(--theme-h1, currentColor));
}

[data-flavor='catppuccin-latte'] h2,
[data-theme='catppuccin-latte'] h2 {
  color: var(--turbo-heading-h2, var(--theme-h2, currentColor));
}

[data-flavor='catppuccin-latte'] h3,
[data-theme='catppuccin-latte'] h3 {
  color: var(--turbo-heading-h3, var(--theme-h3, currentColor));
}

[data-flavor='catppuccin-latte'] h4,
[data-theme='catppuccin-latte'] h4 {
  color: var(--turbo-heading-h4, var(--theme-h4, currentColor));
}

[data-flavor='catppuccin-latte'] .button.is-text,
[data-theme='catppuccin-latte'] .button.is-text,
[data-flavor='catppuccin-latte'] .button.is-ghost,
[data-theme='catppuccin-latte'] .button.is-ghost,
[data-flavor='catppuccin-latte'] .navbar-item.is-active,
[data-theme='catppuccin-latte'] .navbar-item.is-active {
  color: var(--turbo-link-default, var(--theme-link, currentColor));
}

[data-flavor='github-dark'] strong,
[data-theme='github-dark'] strong,
[data-flavor='github-dark'] th,
[data-theme='github-dark'] th,
[data-flavor='github-dark'] .has-text-centered > p,
[data-theme='github-dark'] .has-text-centered > p {
  color: var(--turbo-text-primary, var(--theme-text, currentColor));
}

[data-flavor='github-dark'] .button.is-text,
[data-theme='github-dark'] .button.is-text,
[data-flavor='github-dark'] .button.is-ghost,
[data-theme='github-dark'] .button.is-ghost {
  color: var(--turbo-link-default, var(--theme-link, currentColor));
}

/* Focus visibility for keyboard-focusable scrollable code regions */
pre:focus-visible,
.highlight pre:focus-visible,
pre.highlight:focus-visible {
  outline: 2px solid var(--turbo-brand-primary, currentColor);
  outline-offset: 2px;
}`;
}
