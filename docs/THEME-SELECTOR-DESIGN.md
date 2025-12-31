## Theme Selector Design

This document describes the design of the theme selector used in the demo navbar, and a
documented alternative layout you can switch to in the future.

### Current Design: Per-Theme Flavor Card Rows

The current implementation presents **each theme flavor as its own card-like row**
inside the theme selector dropdown.

Each row (a `.theme-item` button) contains:

- A circular **theme icon** on the left (`.theme-icon`), tinted with the flavor’s accent
  color.
- A text stack (`.theme-copy`) with:
  - `.theme-title`: family name + flavor name  
    (e.g. `Catppuccin · Mocha`).
  - `.theme-description`: a short, per-flavor description sourced from
    `ThemeFlavor.description`.
- A subtle checkmark (`.theme-check`) on the right when the flavor is active.

Structurally, these rows are created in `wireFlavorSelector` in `src/index.ts`. The
`ThemeFlavor` type includes:

- `id`, `name`, `cssFile`, `icon?`, `family`, `appearance`, `colors`
- `description: string` – the text used in `.theme-description` and included in the
  `aria-label` for assistive technologies.

Visually, the dropdown is designed to feel cohesive with the navbar:

- The panel uses the same theme-aware surface and border tokens as the
  `.navbar-dropdown`, so there is no strong inner/outer container contrast.
- Rows use soft hover and active states, with clear keyboard focus outlines.

This **per-theme flavor** layout makes each flavor’s personality explicit: users scan
titles and descriptions and pick a specific flavor directly from the list.

### Alternative Design: Per-Family Cards (Not Currently Used)

An alternative layout would present **one card per theme family** (Bulma, Catppuccin,
GitHub, Dracula), with flavors nested inside the card.

In that model:

- Each family card would show:
  - A family-level title (e.g. `Catppuccin Themes`).
  - A family-level description from `ThemeFamilyMeta.description`.
  - A small set of controls for the family’s flavors (e.g. pills or inline buttons for
    Latte, Frappé, Macchiato, Mocha).
- Users would first choose a family, then a flavor within that family.

To move from the current per-theme design to this per-family design you would:

1. Treat `ThemeFamilyMeta.description` as the primary descriptive copy instead of
   `ThemeFlavor.description`.
2. Change the DOM structure inside each `.theme-family-group` in `wireFlavorSelector` so
   it renders a **single card per family** with nested controls for individual flavors.
3. Update the SCSS in `src/scss/custom/_overrides.scss` so the card styles apply to the
   family container rather than to each individual flavor row.

At the moment, the project intentionally uses the **per-theme flavor** layout because
it:

- Keeps selection to a single step (“pick the exact flavor you want”).
- Allows flavor-specific descriptions that can explain differences within the same
  family.
- Maps cleanly onto the `THEMES` array, where each entry is a selectable flavor.
