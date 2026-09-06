---
title: CSS Variables Reference
description: Complete list of all Turbo Themes CSS custom properties.
category: api-reference
order: 2
prev: api-reference/index
next: api-reference/tokens
---

# CSS Variables Reference

Complete list of all CSS custom properties provided by Turbo Themes.

## Background Variables

| Variable             | Description                     | Example Value |
| -------------------- | ------------------------------- | ------------- |
| `--turbo-bg-base`    | Main page background            | `#1e1e2e`     |
| `--turbo-bg-surface` | Card and surface background     | `#313244`     |
| `--turbo-bg-overlay` | Overlay and dropdown background | `#45475a`     |

### Usage

```css
body {
  background-color: var(--turbo-bg-base);
}

.card {
  background-color: var(--turbo-bg-surface);
}

.dropdown-menu {
  background-color: var(--turbo-bg-overlay);
}
```

## Text Variables

| Variable                 | Description                 | Example Value |
| ------------------------ | --------------------------- | ------------- |
| `--turbo-text-primary`   | Primary text color          | `#cdd6f4`     |
| `--turbo-text-secondary` | Secondary/muted text        | `#a6adc8`     |
| `--turbo-text-inverse`   | Text on colored backgrounds | `#1e1e2e`     |

### Usage

```css
body {
  color: var(--turbo-text-primary);
}

.muted {
  color: var(--turbo-text-secondary);
}

.badge {
  background: var(--turbo-brand-primary);
  color: var(--turbo-text-inverse);
}
```

> `--turbo-text-inverse` is only audited against solid fills. For text on a brand
> **gradient**, use [`--turbo-text-on-brand`](#brand-variables) instead.

## Brand Variables

| Variable                     | Description                                     | Example Value |
| ---------------------------- | ----------------------------------------------- | ------------- |
| `--turbo-brand-primary`      | Primary brand/accent color                      | `#89b4fa`     |
| `--turbo-brand-primary-text` | Ink audited for WCAG AA on the brand fill       | `#1e1e2e`     |
| `--turbo-text-on-brand`      | Ink audited for WCAG AA on `--gradient-primary` | `#1e1e2e`     |

`--turbo-text-on-brand` is the ink to use for text painted on a brand gradient. Unlike
`--turbo-text-inverse`, it is contrast-checked at build time against **both**
`--gradient-primary` stops (`--turbo-brand-primary` and `--turbo-state-info`), so labels
stay AA-legible at either end of the ramp in light and dark themes alike.

### Usage

```css
.btn-primary {
  background: var(--gradient-primary, var(--turbo-brand-primary));
  color: var(--turbo-text-on-brand);
}

a {
  color: var(--turbo-brand-primary);
}

.highlight {
  border-left: 4px solid var(--turbo-brand-primary);
}
```

## State Variables

| Variable                     | Description                                 | Example Value |
| ---------------------------- | ------------------------------------------- | ------------- |
| `--turbo-state-success`      | Success state color                         | `#a6e3a1`     |
| `--turbo-state-warning`      | Warning state color                         | `#f9e2af`     |
| `--turbo-state-danger`       | Danger/error state color                    | `#f38ba8`     |
| `--turbo-state-info`         | Info state color                            | `#89dceb`     |
| `--turbo-state-success-text` | Ink audited for WCAG AA on the success fill | `#1e1e2e`     |
| `--turbo-state-warning-text` | Ink audited for WCAG AA on the warning fill | `#1e1e2e`     |
| `--turbo-state-danger-text`  | Ink audited for WCAG AA on the danger fill  | `#1e1e2e`     |
| `--turbo-state-info-text`    | Ink audited for WCAG AA on the info fill    | `#1e1e2e`     |

### Usage

```css
.alert-success {
  background-color: var(--turbo-state-success);
  color: var(--turbo-state-success-text);
}

.alert-warning {
  background-color: var(--turbo-state-warning);
  color: var(--turbo-state-warning-text);
}

.alert-danger {
  background-color: var(--turbo-state-danger);
  color: var(--turbo-state-danger-text);
}

.alert-info {
  background-color: var(--turbo-state-info);
  color: var(--turbo-state-info-text);
}
```

Each `--turbo-state-*-text` ink is computed by the build-time WCAG AA normalizer against
its state fill, so `color`/`background` pairs stay legible in every theme. Prefer them
over `--turbo-text-inverse` on state fills.

## Border Variables

| Variable                 | Description          | Example Value |
| ------------------------ | -------------------- | ------------- |
| `--turbo-border-default` | Default border color | `#45475a`     |

### Usage

```css
.card {
  border: 1px solid var(--turbo-border-default);
}

hr {
  border-color: var(--turbo-border-default);
}

input {
  border: 1px solid var(--turbo-border-default);
}
```

## Syntax Highlighting Variables

For code blocks and syntax highlighting:

| Variable                  | Description       | Example Value |
| ------------------------- | ----------------- | ------------- |
| `--turbo-syntax-comment`  | Code comments     | `#6c7086`     |
| `--turbo-syntax-keyword`  | Language keywords | `#cba6f7`     |
| `--turbo-syntax-string`   | String literals   | `#a6e3a1`     |
| `--turbo-syntax-number`   | Numeric values    | `#fab387`     |
| `--turbo-syntax-function` | Function names    | `#89b4fa`     |
| `--turbo-syntax-type`     | Type annotations  | `#f9e2af`     |
| `--turbo-syntax-variable` | Variables         | `#cdd6f4`     |
| `--turbo-syntax-operator` | Operators         | `#89dceb`     |

### Usage

```css
.token.comment {
  color: var(--turbo-syntax-comment);
}

.token.keyword {
  color: var(--turbo-syntax-keyword);
}

.token.string {
  color: var(--turbo-syntax-string);
}

.token.number {
  color: var(--turbo-syntax-number);
}

.token.function {
  color: var(--turbo-syntax-function);
}
```

## Accent Variables

| Variable                    | Description      | Example Value |
| --------------------------- | ---------------- | ------------- |
| `--turbo-accent-link`       | Link color       | `#89b4fa`     |
| `--turbo-accent-link-hover` | Link hover color | `#b4befe`     |

### Usage

```css
a {
  color: var(--turbo-accent-link);
}

a:hover {
  color: var(--turbo-accent-link-hover);
}
```

## Complete Example

Here's a complete component using all token categories:

```css
.card {
  /* Background */
  background-color: var(--turbo-bg-surface);

  /* Border */
  border: 1px solid var(--turbo-border-default);
  border-radius: 8px;

  /* Spacing */
  padding: 1.5rem;
}

.card-title {
  /* Text */
  color: var(--turbo-text-primary);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.card-description {
  /* Muted text */
  color: var(--turbo-text-secondary);
  margin-bottom: 1rem;
}

.card-action {
  /* Brand color */
  background-color: var(--turbo-brand-primary);
  color: var(--turbo-text-inverse);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.card-action:hover {
  opacity: 0.9;
}
```

## Browser Support

CSS custom properties are supported in all modern browsers:

- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 15+

For older browser support, consider using a PostCSS plugin to generate fallbacks.

## Next Steps

- View [Design Tokens](/docs/api-reference/tokens/) structure
- Explore [Theme Definitions](/docs/api-reference/themes/)
- Learn about [theme switching](/docs/guides/theme-switching/)
