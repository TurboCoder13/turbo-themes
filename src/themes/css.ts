// SPDX-License-Identifier: MIT
// CSS generation functions for theme flavors

import type { ThemeFlavor } from './types.js';
import { hexToHsl } from './bulma.js';

// Helper function to generate syntax highlighting CSS
function generateSyntaxHighlightingCSS(flavor: ThemeFlavor): string {
  const { tokens } = flavor;
  const escapedId = CSS.escape
    ? CSS.escape(flavor.id)
    : flavor.id.replace(/[<>"'&\\]/g, '\\$&');

  // Extract syntax colors from theme tokens
  const syntaxColors = {
    fg: tokens.content.codeInline.fg,
    bg: tokens.content.codeInline.bg,
    comment: tokens.text.secondary,
    keyword: tokens.brand.primary,
    string: tokens.state.success,
    number: tokens.state.warning,
    title: tokens.state.info,
    attr: tokens.accent.link,
  };

  return `html[data-flavor='${escapedId}'] .highlight {
  background: ${syntaxColors.bg};
  color: ${syntaxColors.fg};
}
html[data-flavor='${escapedId}'] .highlight pre,
html[data-flavor='${escapedId}'] pre.highlight {
  background: transparent;
  color: ${syntaxColors.fg};
}
html[data-flavor='${escapedId}'] .highlight code {
  background: transparent;
  color: ${syntaxColors.fg};
}
html[data-flavor='${escapedId}'] .highlight .c,
html[data-flavor='${escapedId}'] .highlight .cm,
html[data-flavor='${escapedId}'] .highlight .c1 {
  color: ${syntaxColors.comment};
}
html[data-flavor='${escapedId}'] .highlight .k,
html[data-flavor='${escapedId}'] .highlight .kc,
html[data-flavor='${escapedId}'] .highlight .kd {
  color: ${syntaxColors.keyword};
}
html[data-flavor='${escapedId}'] .highlight .s,
html[data-flavor='${escapedId}'] .highlight .s1,
html[data-flavor='${escapedId}'] .highlight .sb,
html[data-flavor='${escapedId}'] .highlight .sd,
html[data-flavor='${escapedId}'] .highlight .s2 {
  color: ${syntaxColors.string};
}
html[data-flavor='${escapedId}'] .highlight .m,
html[data-flavor='${escapedId}'] .highlight .mi,
html[data-flavor='${escapedId}'] .highlight .mf,
html[data-flavor='${escapedId}'] .highlight .mh {
  color: ${syntaxColors.number};
}
html[data-flavor='${escapedId}'] .highlight .nt,
html[data-flavor='${escapedId}'] .highlight .na {
  color: ${syntaxColors.attr};
}
html[data-flavor='${escapedId}'] .highlight .nn,
html[data-flavor='${escapedId}'] .highlight .nc,
html[data-flavor='${escapedId}'] .highlight .no,
html[data-flavor='${escapedId}'] .highlight .nf {
  color: ${syntaxColors.title};
}`;
}

// Helper function to generate theme CSS variables
function generateThemeCSSVariables(flavor: ThemeFlavor): string {
  const { tokens } = flavor;
  const escapedId = CSS.escape
    ? CSS.escape(flavor.id)
    : flavor.id.replace(/[<>"'&\\]/g, '\\$&');

  // Convert hex colors to HSL for CSS format
  const primaryHsl = hexToHsl(tokens.brand.primary);
  const linkHslObj = hexToHsl(tokens.accent.link);
  const infoHslObj = hexToHsl(tokens.state.info);
  const successHslObj = hexToHsl(tokens.state.success);
  const warningHslObj = hexToHsl(tokens.state.warning);
  const dangerHslObj = hexToHsl(tokens.state.danger);
  const linkHsl = `hsl(${linkHslObj.h}, ${linkHslObj.s}%, ${linkHslObj.l}%)`;
  const infoHsl = `hsl(${infoHslObj.h}, ${infoHslObj.s}%, ${infoHslObj.l}%)`;
  const successHsl = `hsl(${successHslObj.h}, ${successHslObj.s}%, ${successHslObj.l}%)`;
  const warningHsl = `hsl(${warningHslObj.h}, ${warningHslObj.s}%, ${warningHslObj.l}%)`;
  const dangerHsl = `hsl(${dangerHslObj.h}, ${dangerHslObj.s}%, ${dangerHslObj.l}%)`;

  return `html[data-flavor='${escapedId}'] {
  --bulma-body-background-color: ${tokens.background.base};
  --bulma-body-color: ${tokens.text.primary};
  --bulma-scheme-main: ${tokens.background.base};
  --bulma-scheme-main-bis: ${tokens.background.surface};
  --bulma-scheme-main-ter: ${tokens.background.overlay};
  --bulma-scheme-invert: ${tokens.text.primary};
  --bulma-primary-h: ${primaryHsl.h};
  --bulma-primary-s: ${primaryHsl.s}%;
  --bulma-primary-l: ${primaryHsl.l}%;
  --bulma-link: ${linkHsl};
  --bulma-info: ${infoHsl};
  --bulma-success: ${successHsl};
  --bulma-warning: ${warningHsl};
  --bulma-danger: ${dangerHsl};
  --bulma-border: ${tokens.border.default};
  --theme-font-sans:
    ${tokens.typography.fonts.sans};
  --theme-font-mono:
    ${tokens.typography.fonts.mono};
  --theme-text: ${tokens.text.primary};
  --theme-text-muted: ${tokens.text.secondary};
  --theme-h1: ${tokens.content.heading.h1};
  --theme-h2: ${tokens.content.heading.h2};
  --theme-h3: ${tokens.content.heading.h3};
  --theme-h4: ${tokens.content.heading.h4};
  --theme-h5: ${tokens.content.heading.h5};
  --theme-h6: ${tokens.content.heading.h6};
  --theme-link: ${tokens.accent.link};
  --theme-blockquote-border: ${tokens.content.blockquote.border};
  --theme-blockquote-fg: ${tokens.content.blockquote.fg};
  --theme-blockquote-bg: ${tokens.content.blockquote.bg};
  --theme-code-fg: ${tokens.content.codeInline.fg};
  --theme-code-bg: ${tokens.content.codeInline.bg};
  --theme-pre-fg: ${tokens.content.codeBlock.fg};
  --theme-pre-bg: ${tokens.content.codeBlock.bg};
  --theme-table-border: ${tokens.content.table.border};
  --theme-table-stripe: ${tokens.content.table.stripe};
  --theme-table-thead-bg: ${tokens.content.table.theadBg};
  --theme-selection-fg: ${tokens.content.selection.fg};
  --theme-selection-bg: ${tokens.content.selection.bg};
  --syntax-fg: ${tokens.content.codeInline.fg};
  --syntax-bg: ${tokens.content.codeInline.bg};
  --syntax-keyword: ${tokens.brand.primary};
  --syntax-string: ${tokens.state.success};
  --syntax-number: ${tokens.state.warning};
  --syntax-comment: ${tokens.text.secondary};
  --syntax-title: ${tokens.state.info};
  --syntax-attr: ${tokens.accent.link};
  --theme-surface-0: ${tokens.background.base};
  --theme-surface-1: ${tokens.background.surface};
  --theme-surface-2: ${tokens.background.overlay};
  --theme-border: ${tokens.border.default};
  /* Table component tokens (with fallbacks) */
  --theme-table-cell-bg: ${tokens.content.table.cellBg ?? tokens.background.base};
  --theme-table-header-fg: ${tokens.content.table.headerFg ?? tokens.text.primary};
${
  tokens.components
    ? `  /* Card component tokens */
  --theme-card-bg: ${tokens.components.card?.bg ?? tokens.background.surface};
  --theme-card-border: ${tokens.components.card?.border ?? tokens.border.default};
  --theme-card-header-bg: ${tokens.components.card?.headerBg ?? tokens.background.overlay};
  --theme-card-footer-bg: ${tokens.components.card?.footerBg ?? tokens.background.surface};
  /* Message component tokens */
  --theme-message-bg: ${tokens.components.message?.bg ?? tokens.background.surface};
  --theme-message-header-bg: ${tokens.components.message?.headerBg ?? tokens.background.overlay};
  --theme-message-border: ${tokens.components.message?.border ?? tokens.border.default};
  --theme-message-body-fg: ${tokens.components.message?.bodyFg ?? tokens.text.primary};
  /* Panel component tokens */
  --theme-panel-bg: ${tokens.components.panel?.bg ?? tokens.background.surface};
  --theme-panel-header-bg: ${tokens.components.panel?.headerBg ?? tokens.background.overlay};
  --theme-panel-header-fg: ${tokens.components.panel?.headerFg ?? tokens.text.primary};
  --theme-panel-border: ${tokens.components.panel?.border ?? tokens.border.default};
  --theme-panel-block-bg: ${tokens.components.panel?.blockBg ?? tokens.background.surface};
  --theme-panel-block-hover-bg: ${tokens.components.panel?.blockHoverBg ?? tokens.background.overlay};
  --theme-panel-block-active-bg: ${tokens.components.panel?.blockActiveBg ?? tokens.background.overlay};
  /* Box component tokens */
  --theme-box-bg: ${tokens.components.box?.bg ?? tokens.background.surface};
  --theme-box-border: ${tokens.components.box?.border ?? tokens.border.default};
  /* Notification component tokens */
  --theme-notification-bg: ${tokens.components.notification?.bg ?? tokens.background.surface};
  --theme-notification-border: ${tokens.components.notification?.border ?? tokens.border.default};
  /* Modal component tokens */
  --theme-modal-bg: ${tokens.components.modal?.bg ?? 'rgba(10, 10, 10, 0.86)'};
  --theme-modal-card-bg: ${tokens.components.modal?.cardBg ?? tokens.background.surface};
  --theme-modal-header-bg: ${tokens.components.modal?.headerBg ?? tokens.background.overlay};
  --theme-modal-footer-bg: ${tokens.components.modal?.footerBg ?? tokens.background.surface};
  /* Dropdown component tokens */
  --theme-dropdown-bg: ${tokens.components.dropdown?.bg ?? tokens.background.surface};
  --theme-dropdown-item-hover-bg: ${tokens.components.dropdown?.itemHoverBg ?? tokens.background.overlay};
  --theme-dropdown-border: ${tokens.components.dropdown?.border ?? tokens.border.default};
  /* Tabs component tokens */
  --theme-tabs-border: ${tokens.components.tabs?.border ?? tokens.border.default};
  --theme-tabs-link-bg: ${tokens.components.tabs?.linkBg ?? tokens.background.surface};
  --theme-tabs-link-active-bg: ${tokens.components.tabs?.linkActiveBg ?? tokens.background.base};
  --theme-tabs-link-hover-bg: ${tokens.components.tabs?.linkHoverBg ?? tokens.background.overlay};
`
    : ''
}  color-scheme: ${flavor.appearance};
}`;
}

// Generate CSS for a specific flavor
export function cssForFlavor(flavor: ThemeFlavor): string {
  const syntaxCSS = generateSyntaxHighlightingCSS(flavor);
  const variablesCSS = generateThemeCSSVariables(flavor);

  return `/* SPDX-License-Identifier: MIT */
${syntaxCSS}
${variablesCSS}`;
}

// Generate global CSS overrides that apply theme variables
export function cssGlobalOverrides(): string {
  return `/* SPDX-License-Identifier: MIT */
html {
  font-family: var(
    --theme-font-sans,
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Helvetica,
    Arial,
    sans-serif
  );
}
body,
.content {
  font-family: var(
    --theme-font-sans,
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Helvetica,
    Arial,
    sans-serif
  );
}
.title,
.content h1,
.content h2,
.content h3,
.content h4,
.content h5,
.content h6 {
  font-family: var(
    --theme-font-sans,
    system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif
  );
}
code,
kbd,
pre,
samp {
  font-family: var(
    --theme-font-mono,
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Monaco,
    Consolas,
    'Liberation Mono',
    'Courier New',
    monospace
  );
}
html,
body {
  color: var(--theme-text, inherit);
}
.content p {
  color: var(--theme-text, inherit);
}
.title.is-1,
h1 {
  color: var(--theme-h1, var(--theme-text, inherit));
}
.title.is-2,
h2 {
  color: var(--theme-h2, var(--theme-text, inherit));
}
.title.is-3,
h3 {
  color: var(--theme-h3, var(--theme-text, inherit));
}
.title.is-4,
h4 {
  color: var(--theme-h4, var(--theme-text, inherit));
}
.title.is-5,
h5 {
  color: var(--theme-h5, var(--theme-text, inherit));
}
.title.is-6,
h6 {
  color: var(--theme-h6, var(--theme-text, inherit));
}
.content h1 {
  color: var(--theme-h1, var(--theme-text, inherit));
}
.content h2 {
  color: var(--theme-h2, var(--theme-text, inherit));
}
.content h3 {
  color: var(--theme-h3, var(--theme-text, inherit));
}
.content h4 {
  color: var(--theme-h4, var(--theme-text, inherit));
}
.content h5 {
  color: var(--theme-h5, var(--theme-text, inherit));
}
.content h6 {
  color: var(--theme-h6, var(--theme-text, inherit));
}
.label,
label {
  color: var(--theme-label-color, var(--theme-text, inherit));
}
.content a {
  color: var(--theme-link, var(--bulma-link));
}
.content a:hover {
  color: var(--theme-link-hover, var(--theme-link));
}
.content blockquote {
  border-left: 4px solid var(--theme-blockquote-border, currentColor);
  color: var(--theme-blockquote-fg, inherit);
  background: var(--theme-blockquote-bg, transparent);
  font-style: italic;
}
.content hr,
hr {
  height: 0;
  border: 0;
  border-top: 2px solid
    var(
      --theme-hr-color,
      var(--theme-h1, var(--theme-table-border, var(--bulma-border, currentColor)))
    );
  background: none;
}
input[type='checkbox'],
input[type='radio'],
progress,
input[type='range'] {
  accent-color: var(--theme-link, var(--bulma-link));
}
.input:invalid,
.textarea:invalid,
select:invalid,
input:invalid {
  border-color: var(--bulma-danger);
  box-shadow: none;
}
.input:valid,
.textarea:valid,
select:valid,
input:valid {
  border-color: var(--bulma-success);
  box-shadow: none;
}
.input:focus,
.textarea:focus,
select:focus,
input:focus {
  border-color: var(--bulma-link);
  box-shadow: 0 0 0 0.125em color-mix(in srgb, var(--bulma-link), transparent 80%);
  outline: none;
}
.input:-moz-ui-invalid,
input:-moz-ui-invalid,
select:-moz-ui-invalid {
  border-color: var(--bulma-danger);
  box-shadow: none;
}
::placeholder {
  color: var(--theme-text-muted, currentColor);
  opacity: 1;
}
input:-webkit-autofill {
  -webkit-text-fill-color: var(--theme-text, inherit);
  box-shadow: 0 0 0 1000px var(--theme-surface-1, transparent) inset !important;
  filter: none;
}
input[type='file']::file-selector-button {
  background: color-mix(in srgb, var(--theme-link, var(--bulma-link)) 10%, transparent);
  border: 1px solid var(--theme-link, var(--bulma-link));
  color: var(--theme-text, inherit);
  padding: 0.35rem 0.6rem;
  border-radius: 0.4rem;
}
input[type='file']::file-selector-button:hover {
  background: color-mix(in srgb, var(--theme-link, var(--bulma-link)) 18%, transparent);
}
#theme-flavor-select {
  padding-left: 2rem;
}
#theme-flavor-icon {
  display: none;
}
#theme-flavor-select option[data-icon] {
  background-repeat: no-repeat;
  background-size: 1rem 1rem;
  background-position: 0.5rem center;
  padding-left: 1.75rem;
}
#theme-flavor-select:hover {
  border-color: var(--bulma-link);
  box-shadow: 0 0 0 0.125em color-mix(in srgb, var(--bulma-link), transparent 80%);
}
.dropdown.is-theme {
  --bulma-dropdown-item-h: var(--bulma-text-h);
  --bulma-dropdown-item-s: var(--bulma-text-s);
  --bulma-dropdown-item-color-l: var(--bulma-text-l);
  --bulma-dropdown-item-background-l: var(--bulma-scheme-main-l);
  --bulma-dropdown-item-selected-h: var(--bulma-link-h);
  --bulma-dropdown-item-selected-s: var(--bulma-link-s);
  --bulma-dropdown-item-selected-l: var(--bulma-link-l);
  --bulma-dropdown-item-selected-background-l: var(--bulma-link-l);
  --bulma-dropdown-item-selected-color-l: var(--bulma-link-invert-l);
}
.dropdown.is-theme .theme-flavor-trigger {
  background: var(--theme-surface-1, inherit) !important;
  color: var(--theme-text, inherit) !important;
  border: 2px solid var(--theme-table-border, var(--bulma-border, currentColor)) !important;
  border-radius: var(--bulma-radius, 0.375rem) !important;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
  transition: all 0.2s ease !important;
  font-weight: 500 !important;
}
.dropdown.is-theme .theme-flavor-trigger:hover {
  border-color: var(--theme-link, var(--bulma-link)) !important;
  box-shadow: 0 2px 4px color-mix(in srgb, var(--theme-link, var(--bulma-link)), transparent 85%),
    0 0 0 0.125em color-mix(in srgb, var(--theme-link, var(--bulma-link)), transparent 80%) !important;
  background: var(--theme-surface-2, inherit) !important;
}
.dropdown.is-theme .theme-flavor-trigger:focus {
  border-color: var(--theme-link, var(--bulma-link)) !important;
  box-shadow: 0 0 0 0.125em color-mix(in srgb, var(--theme-link, var(--bulma-link)), transparent 80%),
    0 2px 4px color-mix(in srgb, var(--theme-link, var(--bulma-link)), transparent 85%) !important;
  outline: none !important;
}
.dropdown.is-theme .dropdown-menu {
  background: var(--theme-surface-1, inherit) !important;
  border: 2px solid var(--theme-table-border, var(--bulma-border, currentColor)) !important;
  border-radius: var(--bulma-radius, 0.375rem) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1) !important;
  margin-top: 0.25rem !important;
}
.dropdown.is-theme .dropdown-content {
  background-color: transparent !important;
  box-shadow: none !important;
  padding: 0.5rem !important;
  border: none !important;
}
.dropdown.is-theme .dropdown-item {
  color: var(--theme-text, inherit) !important;
  background-color: transparent !important;
  border-radius: var(--bulma-radius-small, 0.25rem) !important;
  padding: 0.625rem 1rem !important;
  display: flex !important;
  align-items: center !important;
  gap: 0.75rem !important;
  border: none !important;
  transition: all 0.15s ease !important;
  font-weight: 400 !important;
}
.dropdown.is-theme .dropdown-item:hover {
  background: var(--theme-surface-2, inherit) !important;
  color: var(--theme-link, var(--bulma-link)) !important;
  transform: translateX(2px);
}
.dropdown.is-theme .dropdown-item.is-active {
  background: var(--theme-link, var(--bulma-link)) !important;
  color: var(--bulma-link-invert, var(--bulma-body-background-color)) !important;
  font-weight: 500 !important;
}
.dropdown.is-theme .dropdown-item.is-active::before {
  content: '✓';
  margin-right: 0.25rem;
  font-weight: bold;
}
.dropdown.is-theme .dropdown-item img {
  border-radius: 50% !important;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important;
}
.table.is-striped tbody tr:nth-child(even) {
  background-color: var(--theme-table-stripe, var(--theme-surface-2, inherit));
}
.box,
.card,
.dropdown-content,
.menu,
.message,
.panel,
.table,
.table td,
.table th,
.modal-card {
  border-color: var(--theme-table-border, var(--bulma-border, currentColor));
}
.table thead th {
  background-color: var(--theme-table-thead-bg, var(--theme-surface-2, inherit));
}
.input:not(.is-success):not(.is-danger),
.textarea:not(.is-success):not(.is-danger),
.select:not(.is-success):not(.is-danger) select,
.button.is-light {
  background-color: var(--theme-surface-1, inherit);
  color: var(--theme-text, inherit);
  border-color: var(--theme-table-border, var(--bulma-border, currentColor));
}
.input:not(.is-success):not(.is-danger):focus,
.textarea:not(.is-success):not(.is-danger):focus,
.select:not(.is-success):not(.is-danger) select:focus {
  border-color: var(--bulma-link);
  box-shadow: 0 0 0 0.125em color-mix(in srgb, var(--bulma-link), transparent 80%);
}

.select.is-theme select {
  background-color: var(--theme-surface-1, inherit) !important;
  color: var(--theme-text, inherit) !important;
  border: 2px solid var(--theme-table-border, var(--bulma-border, currentColor)) !important;
  border-radius: var(--bulma-radius, 0.375rem) !important;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
  padding: 0.5em 2.5em 0.5em 0.75em !important;
  transition: all 0.2s ease !important;
  font-weight: 500 !important;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75em center;
  background-size: 0.75em;
  filter: var(--theme-select-arrow-filter, brightness(0) saturate(100%) invert(0.4));
}
.select.is-theme select:hover {
  border-color: var(--theme-link, var(--bulma-link)) !important;
  box-shadow: 0 2px 4px color-mix(in srgb, var(--theme-link, var(--bulma-link)), transparent 85%) !important;
  background-color: var(--theme-surface-2, inherit) !important;
}
.select.is-theme select:focus {
  border-color: var(--theme-link, var(--bulma-link)) !important;
  box-shadow: 0 0 0 0.125em color-mix(in srgb, var(--theme-link, var(--bulma-link)), transparent 80%),
    0 2px 4px color-mix(in srgb, var(--theme-link, var(--bulma-link)), transparent 85%) !important;
  outline: none !important;
  background-color: var(--theme-surface-1, inherit) !important;
}
.select.is-theme select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.select.is-theme.has-icons-left select {
  padding-left: 2.5em;
}
.navbar {
  background-color: var(--theme-surface-0, inherit) !important;
  border-bottom: 1px solid var(--theme-border, var(--theme-table-border, var(--bulma-border, currentColor))) !important;
  --bulma-navbar-background-color: var(--theme-surface-0, inherit);
  --bulma-navbar-item-color: var(--theme-text, inherit);
  --bulma-navbar-item-hover-background-l-delta: 0.05;
  --bulma-navbar-item-active-background-l-delta: 0.1;
}
.navbar-item,
.navbar-link {
  color: var(--theme-text, inherit) !important;
  --bulma-navbar-item-color-l: var(--bulma-text-l);
}
.navbar-item.is-active,
.navbar-link.is-active {
  color: var(--theme-link, var(--bulma-link)) !important;
  background-color: transparent !important;
  --bulma-navbar-item-color-l: var(--bulma-link-l);
}
.navbar-link:not(.is-arrowless)::after {
  border-color: var(--theme-link, var(--bulma-link)) !important;
}
.navbar-dropdown {
  background-color: var(--theme-surface-1, inherit) !important;
  border-top: 1px solid var(--theme-border, var(--theme-table-border, var(--bulma-border, currentColor))) !important;
  box-shadow: 0 4px 6px rgba(10, 10, 10, 0.1);
  --bulma-navbar-dropdown-background-color: var(--theme-surface-1, inherit);
}
.navbar-dropdown .navbar-item {
  color: var(--theme-text, inherit) !important;
  background-color: transparent !important;
  border: none;
}
.navbar-dropdown .navbar-item:hover {
  background-color: var(--theme-surface-2, inherit) !important;
  color: var(--theme-link, var(--bulma-link)) !important;
}
.navbar-dropdown .navbar-item.is-active {
  background-color: var(--theme-surface-2, inherit) !important;
  color: var(--theme-link, var(--bulma-link)) !important;
}
.navbar-item:hover,
.navbar-link:hover {
  background-color: var(--theme-surface-2, inherit) !important;
  color: var(--theme-link, var(--bulma-link)) !important;
}
a.navbar-item:hover,
a.navbar-item.is-active,
.navbar-link:hover,
.navbar-link.is-active {
  background-color: var(--theme-surface-2, inherit) !important;
  color: var(--theme-link, var(--bulma-link)) !important;
}

/* Accessibility contrast fixes (Axe) */
[data-flavor='catppuccin-latte'] .navbar-item,
[data-flavor='catppuccin-latte'] .has-text-centered > p,
[data-flavor='catppuccin-latte'] a.navbar-item,
[data-flavor='catppuccin-latte'] .title,
[data-flavor='catppuccin-latte'] h1,
[data-flavor='catppuccin-latte'] h2,
[data-flavor='catppuccin-latte'] h3,
[data-flavor='catppuccin-latte'] h4 {
  color: #1e293b; /* strong slate for >=4.5:1 on light bg */
}

[data-flavor='catppuccin-latte'] .button.is-text,
[data-flavor='catppuccin-latte'] .button.is-ghost,
[data-flavor='catppuccin-latte'] .navbar-item.is-active {
  color: #0b66d6; /* deeper blue for >=4.5:1 on light bg */
}

[data-flavor='github-dark'] strong,
[data-flavor='github-dark'] th,
[data-flavor='github-dark'] .has-text-centered > p {
  color: #c9d1d9; /* github-dark foreground */
}

[data-flavor='github-dark'] .button.is-text,
[data-flavor='github-dark'] .button.is-ghost {
  color: #58a6ff; /* accessible link blue on dark bg */
}`;
}
