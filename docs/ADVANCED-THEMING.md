# Advanced Bulma Theming

This document covers advanced theming capabilities that leverage Bulma's full Sass
customization system.

## Overview

The turbo-themes library now supports complete Bulma customization through Sass
variables, allowing themes to:

- Customize responsive breakpoints per theme
- Modify spacing scales
- Adjust typography sizes
- Configure border radius values
- Define custom shadows
- Use Bulma's Sass mixins and functions

## Theme Configuration

Themes can include advanced Bulma customizations through the `bulma` property in theme
definitions:

```typescript
{
  id: 'my-custom-theme',
  // ... other theme properties
  bulma: {
    breakpoints: {
      mobile: '320px',
      tablet: '769px',
      desktop: '1024px',
      widescreen: '1400px',
      fullhd: '1800px'
    },
    spacing: {
      small: '0.25rem',
      medium: '0.75rem',
      large: '1.25rem'
    },
    radius: {
      small: '0.125rem',
      normal: '0.25rem',
      medium: '0.375rem',
      large: '0.5rem',
      rounded: '1rem'
    },
    shadows: {
      small: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      normal: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      large: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    }
  }
}
```

## Available Customizations

### Breakpoints

Customize responsive breakpoints for theme-specific layouts:

```typescript
bulma: {
  breakpoints: {
    mobile: '320px',     // Mobile-first breakpoint
    tablet: '769px',     // Tablet breakpoint
    desktop: '1024px',   // Desktop breakpoint
    widescreen: '1400px', // Widescreen breakpoint
    fullhd: '1800px'     // Full HD breakpoint
  }
}
```

### Spacing Scale

Define custom spacing values for consistent layouts:

```typescript
bulma: {
  spacing: {
    small: '0.25rem',  // Compact spacing
    medium: '0.75rem', // Standard spacing
    large: '1.25rem'   // Generous spacing
  }
}
```

### Border Radius

Customize border radius for modern, consistent styling:

```typescript
bulma: {
  radius: {
    small: '0.125rem',  // Subtle rounding
    normal: '0.25rem',  // Standard rounding
    medium: '0.375rem', // Moderate rounding
    large: '0.5rem',    // Pronounced rounding
    rounded: '1rem'     // Fully rounded
  }
}
```

### Shadows

Define custom shadow values for depth and hierarchy:

```typescript
bulma: {
  shadows: {
    small: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    normal: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
  }
}
```

## Using Bulma Mixins

Themes can use Bulma's Sass mixins for advanced responsive behavior:

```scss
// In your theme SCSS file
@use '../scss/bulma-mixins';

// Responsive utilities
.my-component {
  @include theme-responsive(tablet) {
    padding: 2rem;
  }

  @include theme-responsive(desktop) {
    padding: 3rem;
  }
}

// Custom button variants
@include theme-button-variant('accent', hsl(220, 89%, 56%));

// Custom text colors
@include theme-text-variant('highlight', hsl(45, 86%, 83%));

// Custom background colors
@include theme-background-variant('surface', hsl(220, 13%, 9%));
```

## Color Palette Access

With direct Sass variable integration, themes have access to Bulma's complete color
palette system. When you configure Bulma with Sass variables (as done in the generated
theme files), Bulma automatically generates a comprehensive set of CSS variables.

### 21-Shade Color System

Bulma generates 21 shades (00-100) for each color automatically. These are accessible
via CSS variables:

```scss
.theme-my-theme {
  // Access specific shades (00 = darkest, 100 = lightest)
  .highlight {
    background-color: hsl(var(--bulma-primary-95)); // Very light shade
    color: hsl(var(--bulma-primary-20)); // Very dark shade
  }

  // Use computed variants (automatically generated)
  .card {
    background-color: hsl(var(--bulma-primary-light)); // Lighter than base
    border: 1px solid hsl(var(--bulma-primary-dark)); // Darker than base
  }

  // Use invert colors (automatically computed for contrast)
  .button {
    background-color: hsl(var(--bulma-primary));
    color: hsl(var(--bulma-primary-invert)); // Automatically contrasting color
  }
}
```

### Available Color Variables

For each color (primary, link, info, success, warning, danger), Bulma generates:

- **Base color**: `--bulma-{color}` (e.g., `--bulma-primary`)
- **Invert color**: `--bulma-{color}-invert` (contrasting color)
- **Light variant**: `--bulma-{color}-light` (lighter than base)
- **Dark variant**: `--bulma-{color}-dark` (darker than base)
- **21 shades**: `--bulma-{color}-00` through `--bulma-{color}-100`

### Using Bulma's Color Functions in Sass

In your theme SCSS files, you can use Bulma's color functions:

```scss
@use 'bulma/sass/utilities/functions' as bulma-fn;

.theme-my-theme {
  // Use Bulma's color functions for advanced manipulation
  .custom-element {
    // Get invert color programmatically
    background-color: bulma-fn.bulmaFindColorInvert($primary);

    // Get light variant
    border-color: bulma-fn.bulmaFindLightColor($primary);

    // Get dark variant
    color: bulma-fn.bulmaFindDarkColor($primary);
  }
}
```

## Helper Classes

Bulma automatically generates helper classes for all color variants. These work
automatically with your theme colors:

```html
<!-- Text color helpers -->
<p class="has-text-primary">Normal primary text</p>
<p class="has-text-primary-light">Light primary text</p>
<p class="has-text-primary-dark">Dark primary text</p>
<p class="has-text-primary-invert">Inverted primary text (for contrast)</p>

<!-- Background color helpers -->
<div class="has-background-primary">Primary background</div>
<div class="has-background-primary-light">Light primary background</div>
<div class="has-background-primary-dark">Dark primary background</div>

<!-- Button variants -->
<button class="button is-primary">Primary button</button>
<button class="button is-primary-light">Light primary button</button>
<button class="button is-primary-dark">Dark primary button</button>
```

### Accessing Specific Shades

You can also access specific shades (00-100) via custom CSS:

```css
.my-custom-element {
  /* Use very light shade (95) */
  background-color: hsl(var(--bulma-primary-95));

  /* Use very dark shade (10) */
  color: hsl(var(--bulma-primary-10));
}
```

## Advanced Color Functions

Use Bulma's color manipulation functions in your theme SCSS files:

```scss
@use 'bulma/sass/utilities/functions' as bulma-fn;

// Get color variants programmatically
$primary-invert: bulma-fn.bulmaFindColorInvert($primary);
$primary-light: bulma-fn.bulmaFindLightColor($primary);
$primary-dark: bulma-fn.bulmaFindDarkColor($primary);

// Use in your theme styles
.theme-my-theme {
  .custom-button {
    background-color: $primary;
    color: $primary-invert; // Automatically contrasting color

    &:hover {
      background-color: $primary-dark;
    }
  }
}
```

### On-Scheme Colors

Bulma's color system automatically handles light/dark mode awareness. The `-invert`
variants ensure proper contrast regardless of the color scheme:

```scss
.theme-my-theme {
  // Automatically contrasting text on primary background
  .primary-section {
    background-color: hsl(var(--bulma-primary));
    color: hsl(var(--bulma-primary-invert)); // Always readable
  }
}
```

## Best Practices

### Performance Considerations

- Only customize what you need - unused customizations still generate CSS
- Use the color palette system instead of manual color calculations
- Leverage Bulma's built-in responsive utilities

### Maintainability

- Document custom breakpoints and spacing choices
- Use consistent naming conventions
- Test customizations across all breakpoints

### Accessibility

- Ensure sufficient color contrast ratios
- Test focus indicators with custom shadows
- Verify responsive behavior on various devices

## Migration from CSS Variables

If migrating from the previous CSS variable approach:

1. **Remove CSS custom properties** - These are no longer needed
2. **Add Sass configurations** - Use the `bulma` property in theme definitions
3. **Update component styles** - Use Bulma's generated CSS variables instead of custom
   ones
4. **Test thoroughly** - Verify all visual elements render correctly

## Examples

### Compact Theme

```typescript
{
  id: 'compact',
  // ... theme tokens
  bulma: {
    spacing: {
      small: '0.125rem',
      medium: '0.5rem',
      large: '1rem'
    },
    radius: {
      small: '0.0625rem',
      normal: '0.125rem',
      rounded: '0.5rem'
    }
  }
}
```

### Modern Theme

```typescript
{
  id: 'modern',
  // ... theme tokens
  bulma: {
    radius: {
      normal: '0.5rem',
      large: '1rem',
      rounded: '2rem'
    },
    shadows: {
      normal: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      large: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    }
  }
}
```

This advanced theming system unlocks Bulma's full potential while maintaining the
simplicity and performance of the turbo themes approach.
