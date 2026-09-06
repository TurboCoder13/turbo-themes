---
title: Site-Native Themes
description:
  Maintain theme token files in your own repo and validate them against the Turbo Themes
  token contract.
category: guides
order: 4
prev: guides/custom-themes
next: guides/performance
---

# Site-Native Themes

A _site-native theme_ is a theme token file that lives in **your** repo — not in
`packages/core/src/themes` — and is loaded as ordinary CSS:

```css
[data-theme='acme'] {
  --turbo-bg-base: #ffffff;
  --turbo-text-primary: #1a1a2e;
  /* … */
}
```

Use one when you want a bespoke palette to participate in the token system: every
component and integration that reads `--turbo-*` custom properties (`--turbo-bg-base`,
`--turbo-state-success-text`, `--turbo-brand-primary`, …) re-skins automatically. Use a
_flavor_ instead when the theme should ship to everyone through the published packs.

## The contract

Turbo Themes publishes the exact set of tokens a deep integration reads — the same set
the CSS generator emits for every theme:

- **Required** (90 tokens): surfaces (`--turbo-bg-*`), text inks, brand and state colors
  — including the audited `--turbo-state-*-text` inks — borders, links, headings, code,
  and table tokens.
- **Optional** (18 tokens): spacing, elevation, animation, and opacity tokens that some
  themes customize. Declare them if you use them; consumers fall back gracefully.

The contract is generated from the CSS generator itself, so it can never drift from what
components actually read.

## Validating

### CLI

```console
npx turbo-themes validate-native src/styles/acme.css
✅ src/styles/acme.css: 90/90 contract tokens declared, all good.

# exits non-zero on failure, so CI gates work
```

The validator reports **missing** required tokens, **unknown** `--turbo-*` tokens
(likely typos), **duplicate** declarations, and **empty** values. It accepts CSS source
or a JSON map (`{ "--turbo-bg-base": "#ffffff", … }`), and `--json` emits a
machine-readable report.

### Scaffold

```console
npx turbo-themes init-native-theme acme --out src/styles/acme.css
```

writes a stub declaring every required token; replace the placeholders with your palette
and re-run `validate-native`.

### In your test suite

```ts
import { assertNativeTheme } from '@lgtm-hq/turbo-themes/native-theme';
import { readFileSync } from 'node:fs';

test('acme theme satisfies the token contract', () => {
  assertNativeTheme(readFileSync('src/styles/acme.css', 'utf8'), 'acme');
});
```

The node API is also importable directly:

```ts
import { validateNativeThemeCss } from '@lgtm-hq/turbo-themes/native-theme';

const result = validateNativeThemeCss(cssSource);
// { valid, missing, unknown, duplicates, empty, declaredCount, requiredCount }
```

## What the contract does and does not guarantee

The validator checks **presence, spelling, uniqueness, and placeholder values** of
tokens, folding declarations from every selector and `@media` block into one set — keep
one canonical `[data-theme="…"]` block per theme file. It does **not** check that your
palette is readable — contrast is a property of your color choices. Published flavors
are build-time normalized to WCAG 2.2 AA (see the
[accessibility guide](/guides/accessibility/)); for native themes, run your own contrast
checks on the same fg/background pairs the toolkit audits (the pair list is importable
from the package as `@lgtm-hq/turbo-themes/contrast-pairs.json`).

## See also

- [Custom Themes](/guides/custom-themes/) — customizing published flavors.
- [Advanced Theming](/guides/advanced-theming/) — component-level tokens.
