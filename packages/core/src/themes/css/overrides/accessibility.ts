// SPDX-License-Identifier: MIT
// Accessibility CSS overrides - contrast fixes for specific themes

/**
 * Generate accessibility-related CSS overrides.
 * Includes contrast fixes for themes that need WCAG compliance adjustments.
 *
 * All inks are audited theme tokens (the WCAG AA normalizer clamps text,
 * heading and link tokens against background.base/surface), referenced via
 * `var()` instead of literal hexes so a vendor sync that moves a background
 * or an ink can never desync these fixes from the pipeline again (#832).
 *
 * The two scopes are written as separate rules and never mix namespaces:
 * custom properties inherit, so a page that loads turbo-core.css (which
 * defines default-theme `--turbo-*` on `:root`) alongside a Bulma flavor
 * would otherwise resolve a `[data-flavor]` element's `--turbo-*` fallback
 * from `:root` — i.e. another theme's ink. `[data-flavor]` rules therefore
 * use only the flavor-scoped `--theme-*` variables, and `[data-theme]` rules
 * only the `--turbo-*` variables.
 *
 * Levels follow rendered sizes, not token names: h1-h3 render >= 24px (WCAG
 * large text, 3:1) in Bulma content and turbo-base alike, so they may use the
 * heading tokens. h4 renders 20px at weight 600 in Bulma content — not WCAG
 * large text — so it, like all body-size text, uses the 4.5:1-audited
 * `text.primary` ink.
 */
export function cssAccessibilityOverrides(): string {
  return `/* Accessibility contrast fixes (Axe / WCAG AA) */

/* --- Bulma flavor scope (html[data-flavor], --theme-* namespace) --- */
[data-flavor='catppuccin-latte'] .navbar-item,
[data-flavor='catppuccin-latte'] .has-text-centered > p,
[data-flavor='catppuccin-latte'] a.navbar-item,
[data-flavor='catppuccin-latte'] .title {
  color: var(--theme-text, currentColor);
}

[data-flavor='catppuccin-latte'] .button.is-text,
[data-flavor='catppuccin-latte'] .button.is-ghost,
[data-flavor='catppuccin-latte'] .navbar-item.is-active {
  color: var(--theme-link, currentColor);
}

[data-flavor='catppuccin-latte'] h1 {
  color: var(--theme-h1, currentColor);
}

[data-flavor='catppuccin-latte'] h2 {
  color: var(--theme-h2, currentColor);
}

[data-flavor='catppuccin-latte'] h3 {
  color: var(--theme-h3, currentColor);
}

[data-flavor='catppuccin-latte'] h4 {
  color: var(--theme-text, currentColor);
}

[data-flavor='github-dark'] strong,
[data-flavor='github-dark'] th,
[data-flavor='github-dark'] .has-text-centered > p {
  color: var(--theme-text, currentColor);
}

[data-flavor='github-dark'] .button.is-text,
[data-flavor='github-dark'] .button.is-ghost {
  color: var(--theme-link, currentColor);
}

/* --- Site scope ([data-theme], --turbo-* namespace) --- */
[data-theme='catppuccin-latte'] .navbar-item,
[data-theme='catppuccin-latte'] .has-text-centered > p,
[data-theme='catppuccin-latte'] a.navbar-item,
[data-theme='catppuccin-latte'] .title {
  color: var(--turbo-text-primary, currentColor);
}

[data-theme='catppuccin-latte'] .button.is-text,
[data-theme='catppuccin-latte'] .button.is-ghost,
[data-theme='catppuccin-latte'] .navbar-item.is-active {
  color: var(--turbo-link-default, currentColor);
}

[data-theme='catppuccin-latte'] h1 {
  color: var(--turbo-heading-h1, var(--turbo-text-primary, currentColor));
}

[data-theme='catppuccin-latte'] h2 {
  color: var(--turbo-heading-h2, var(--turbo-text-primary, currentColor));
}

[data-theme='catppuccin-latte'] h3 {
  color: var(--turbo-heading-h3, var(--turbo-text-primary, currentColor));
}

[data-theme='catppuccin-latte'] h4 {
  color: var(--turbo-text-primary, currentColor);
}

[data-theme='github-dark'] strong,
[data-theme='github-dark'] th,
[data-theme='github-dark'] .has-text-centered > p {
  color: var(--turbo-text-primary, currentColor);
}

[data-theme='github-dark'] .button.is-text,
[data-theme='github-dark'] .button.is-ghost {
  color: var(--turbo-link-default, currentColor);
}

/* Focus visibility for keyboard-focusable scrollable code regions */
pre:focus-visible,
.highlight pre:focus-visible,
pre.highlight:focus-visible {
  outline: 2px solid var(--turbo-brand-primary, currentColor);
  outline-offset: 2px;
}`;
}
