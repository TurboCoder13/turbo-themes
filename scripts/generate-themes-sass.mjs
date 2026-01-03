/* SPDX-License-Identifier: MIT */
// Generate Sass theme maps from TypeScript theme data

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Resolve project root from this script location
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// Import compiled modules from dist
const distDir = path.join(projectRoot, "dist");
let registryMod;
let bulmaMod;
try {
  registryMod = await import(pathToFileURL(path.join(distDir, "themes/registry.js")));
  bulmaMod = await import(pathToFileURL(path.join(distDir, "themes/bulma.js")));
} catch (error) {
  console.error(`Failed to import theme modules from ${distDir}:`, error.message);
  console.error("Make sure to run 'bun run build' first to compile TypeScript files.");
  process.exit(1);
}

const { flavors } = registryMod;
// Import hexToHsl from shared bulma module to avoid duplication
const { generateBulmaUse, hexToHsl } = bulmaMod;

// Convert HSL object to Sass HSL function call
function hslToSass(hsl) {
  return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

// Generate a properly formatted CSS font-family list from an array
function generateFontFamilyList(fontArray, forSassMap = false) {
  // Handle null/undefined as empty string
  if (fontArray == null) {
    return forSassMap ? "''" : '';
  }
  
  if (Array.isArray(fontArray)) {
    // Filter out null/undefined values and join all fonts into a comma-separated list
    const fontList = fontArray
      .filter(font => font != null)
      .map(font => {
        // Convert to string and trim whitespace
        const fontStr = String(font).trim();
        if (!fontStr) return null;
        
        // Wrap font names with spaces or special characters in quotes
        if (fontStr.includes(' ') || fontStr.includes(',')) {
          return `"${fontStr}"`;
        }
        return fontStr;
      })
      .filter(font => font != null)
      .join(', ');
    
    // Normalize whitespace and trim
    const cleaned = fontList.replace(/\s+/g, ' ').trim();
    
    if (!cleaned) {
      return forSassMap ? "''" : '';
    }
    
    // For SCSS maps, escape backslashes first, then single quotes, and wrap in single quotes
    // For CSS custom properties, return as-is
    if (forSassMap) {
      const escaped = cleaned.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      return `'${escaped}'`;
    }
    return cleaned;
  }
  
  // Handle non-array values (string, number, etc.)
  const fontStr = String(fontArray).trim();
  if (!fontStr) {
    return forSassMap ? "''" : '';
  }
  
  if (forSassMap) {
    const escaped = fontStr.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    return `'${escaped}'`;
  }
  return fontStr;
}

// Generate Sass map for a single flavor
function generateFlavorSassMap(flavor) {
  const { tokens } = flavor;

  const primaryHsl = hexToHsl(tokens.brand.primary);
  const linkHsl = hexToHsl(tokens.accent.link);
  const infoHsl = hexToHsl(tokens.state.info);
  const successHsl = hexToHsl(tokens.state.success);
  const warningHsl = hexToHsl(tokens.state.warning);
  const dangerHsl = hexToHsl(tokens.state.danger);

  return `  ${flavor.id}: (
    // Color tokens (HSL format for Bulma compatibility)
    primary: ${hslToSass(primaryHsl)},
    link: ${hslToSass(linkHsl)},
    info: ${hslToSass(infoHsl)},
    success: ${hslToSass(successHsl)},
    warning: ${hslToSass(warningHsl)},
    danger: ${hslToSass(dangerHsl)},

    // Typography
    font-sans: ${generateFontFamilyList(tokens.typography.fonts.sans, true)},
    font-mono: ${generateFontFamilyList(tokens.typography.fonts.mono, true)},

    // Background colors
    surface-0: ${tokens.background.base},
    surface-1: ${tokens.background.surface},
    surface-2: ${tokens.background.overlay},

    // Text colors
    text: ${tokens.text.primary},
    text-muted: ${tokens.text.secondary},

    // Heading colors
    h1: ${tokens.content.heading.h1},
    h2: ${tokens.content.heading.h2},
    h3: ${tokens.content.heading.h3},
    h4: ${tokens.content.heading.h4},
    h5: ${tokens.content.heading.h5},
    h6: ${tokens.content.heading.h6},

    // Content colors
    blockquote-border: ${tokens.content.blockquote.border},
    blockquote-fg: ${tokens.content.blockquote.fg},
    blockquote-bg: ${tokens.content.blockquote.bg},
    code-fg: ${tokens.content.codeInline.fg},
    code-bg: ${tokens.content.codeInline.bg},
    pre-fg: ${tokens.content.codeBlock.fg},
    pre-bg: ${tokens.content.codeBlock.bg},

    // Table colors
    table-border: ${tokens.content.table.border},
    table-stripe: ${tokens.content.table.stripe},
    table-thead-bg: ${tokens.content.table.theadBg},

    // Selection colors
    selection-fg: ${tokens.content.selection.fg},
    selection-bg: ${tokens.content.selection.bg},

    // Syntax highlighting
    syntax-fg: ${tokens.content.codeInline.fg},
    syntax-bg: ${tokens.content.codeInline.bg},
    syntax-keyword: ${tokens.brand.primary},
    syntax-string: ${tokens.state.success},
    syntax-number: ${tokens.state.warning},
    syntax-comment: ${tokens.text.secondary},
    syntax-title: ${tokens.state.info},
    syntax-attr: ${tokens.accent.link},

    // Appearance
    appearance: ${flavor.appearance}
  )`;
}

// Generate the complete _themes.scss file
function generateThemesSass() {
  const sassMaps = flavors.map(generateFlavorSassMap).join(',\n');

  return `// SPDX-License-Identifier: MIT
// Auto-generated theme data maps - DO NOT EDIT DIRECTLY
// Generated from TypeScript theme definitions

$themes: (
${sassMaps}
);

// Helper function to get theme values
@function theme-get($theme-name, $property) {
  $theme: map-get($themes, $theme-name);
  @if $theme == null {
    @error "Theme '#{$theme-name}' not found. Available themes: #{map-keys($themes)}";
  }
  $value: map-get($theme, $property);
  @if $value == null {
    @error "Property '#{$property}' not found in theme '#{$theme-name}'";
  }
  @return $value;
}
`;
}

// Write the generated Sass file
const outDir = path.join(projectRoot, "src", "scss");
fs.mkdirSync(outDir, { recursive: true });

const sassContent = generateThemesSass();
const outFile = path.join(outDir, "_themes.scss");
fs.writeFileSync(outFile, sassContent, "utf8");

console.log(`Generated Sass themes file: ${outFile}`);

// Also generate individual theme entry points for separate CSS compilation
// Ensure CSS output directory exists (used by Sass build step, not this script)
fs.mkdirSync(path.join(projectRoot, "assets", "css", "themes"), { recursive: true });

// Generate Google Fonts import URL from webFonts array
function generateFontImports(webFonts) {
  if (!webFonts || webFonts.length === 0) return '';

  const imports = webFonts
    .filter(url => {
      try {
        const urlObj = new URL(url);
        return urlObj.host === 'fonts.googleapis.com';
      } catch {
        return false;
      }
    })
    .map(url => `@import url('${url}');`)
    .join('\n');

  return imports ? `${imports}\n\n` : '';
}

// Generate @font-face declarations for self-hosted fonts (GitHub's Mona Sans, Hubot Sans)
function generateFontFaceDeclarations(webFonts) {
  if (!webFonts || webFonts.length === 0) return '';

  const declarations = [];

  // Check for GitHub fonts (they're woff2 files, not Google Fonts)
  const monaSansUrl = webFonts.find(url => url.includes('mona-sans'));
  const hubotSansUrl = webFonts.find(url => url.includes('hubot-sans'));

  if (monaSansUrl) {
    declarations.push(`@font-face {
  font-family: 'Mona Sans';
  src: url('${monaSansUrl}') format('woff2');
  font-weight: 200 900;
  font-style: normal;
  font-display: swap;
}`);
  }

  if (hubotSansUrl) {
    declarations.push(`@font-face {
  font-family: 'Hubot Sans';
  src: url('${hubotSansUrl}') format('woff2');
  font-weight: 200 900;
  font-style: normal;
  font-display: swap;
}`);
  }

  return declarations.length > 0 ? `${declarations.join('\n\n')}\n\n` : '';
}

// Generate individual theme SCSS files
flavors.forEach((flavor) => {
  const { tokens } = flavor;

  // Convert colors to HSL for theme-specific CSS variables
  const linkHsl = hexToHsl(tokens.accent.link);
  const infoHsl = hexToHsl(tokens.state.info);
  const successHsl = hexToHsl(tokens.state.success);
  const warningHsl = hexToHsl(tokens.state.warning);

  // Prepare theme colors for Bulma (hex format)
  const themeColors = {
    primary: tokens.brand.primary,
    link: tokens.accent.link,
    info: tokens.state.info,
    success: tokens.state.success,
    warning: tokens.state.warning,
    danger: tokens.state.danger,
  };

  // Generate font imports (Google Fonts and self-hosted)
  const googleFontImports = generateFontImports(tokens.typography.webFonts);
  const fontFaceDeclarations = generateFontFaceDeclarations(tokens.typography.webFonts);

  // Generate Bulma @use statement with colors and config
  // Note: generateBulmaUse now correctly emits 'bulma/sass' directly
  const bulmaUseStatement = generateBulmaUse(themeColors, flavor.bulma);

  // Sass requires @use statements to come before any other rules
  // Plain CSS @import url() statements will be compiled to the top of the output CSS
  const themeScss = `// SPDX-License-Identifier: MIT
// Theme-specific Bulma configuration for ${flavor.id}
${bulmaUseStatement}

// Import custom overrides and hacks
@use 'custom/overrides';
@use 'custom/hacks';

// Web font imports (compiled to top of CSS output)
${googleFontImports}${fontFaceDeclarations}

// Theme-specific overrides using Bulma's generated CSS variables
// Note: Bulma automatically generates --bulma-primary-* CSS variables (00-100 shades)
// and --bulma-primary-soft, --bulma-primary-bold variants from the Sass variables above
.theme-${flavor.id} {
  --bulma-body-background-color: ${tokens.background.base};
  --bulma-body-color: ${tokens.text.primary};
  --bulma-border: ${tokens.border.default};
  --bulma-scheme-main: ${tokens.background.base};
  --bulma-scheme-main-bis: ${tokens.background.surface};
  --bulma-scheme-main-ter: ${tokens.background.overlay};
  --bulma-scheme-invert: ${tokens.text.primary};
  --theme-font-sans: ${generateFontFamilyList(tokens.typography.fonts.sans)};
  --theme-font-mono: ${generateFontFamilyList(tokens.typography.fonts.mono)};
  --theme-text: ${tokens.text.primary};
  --theme-text-muted: ${tokens.text.secondary};
  --theme-h1: ${tokens.content.heading.h1};
  --theme-h2: ${tokens.content.heading.h2};
  --theme-h3: ${tokens.content.heading.h3};
  --theme-h4: ${tokens.content.heading.h4};
  --theme-h5: ${tokens.content.heading.h5};
  --theme-h6: ${tokens.content.heading.h6};
  --theme-link: hsl(${linkHsl.h}, ${linkHsl.s}%, ${linkHsl.l}%);
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
  --syntax-string: hsl(${successHsl.h}, ${successHsl.s}%, ${successHsl.l}%);
  --syntax-number: hsl(${warningHsl.h}, ${warningHsl.s}%, ${warningHsl.l}%);
  --syntax-comment: ${tokens.text.secondary};
  --syntax-title: hsl(${infoHsl.h}, ${infoHsl.s}%, ${infoHsl.l}%);
  --syntax-attr: hsl(${linkHsl.h}, ${linkHsl.s}%, ${linkHsl.l}%);
  --theme-surface-0: ${tokens.background.base};
  --theme-surface-1: ${tokens.background.surface};
  --theme-surface-2: ${tokens.background.overlay};
  /* Table component tokens (with fallbacks) */
  --theme-table-cell-bg: ${tokens.content.table.cellBg ?? tokens.background.base};
  --theme-table-header-fg: ${tokens.content.table.headerFg ?? tokens.text.primary};
${tokens.components ? `  /* Card component tokens */
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
` : ''}  color-scheme: ${flavor.appearance};
}

/* Advanced theme component customizations using Bulma's generated color palette */
.theme-${flavor.id} .button.is-theme-primary {
  background-color: hsl(var(--bulma-primary));
  border-color: hsl(var(--bulma-primary));
  color: hsl(var(--bulma-primary-invert));
}

.theme-${flavor.id} .button.is-theme-link {
  background-color: hsl(var(--bulma-link));
  border-color: hsl(var(--bulma-link));
  color: hsl(var(--bulma-link-invert));
}

.theme-${flavor.id} .notification.is-theme-primary {
  background-color: hsl(var(--bulma-primary-light));
  border-left-color: hsl(var(--bulma-primary));
  color: hsl(var(--bulma-primary-dark));
}

.theme-${flavor.id} .has-theme-gradient-primary {
  background: linear-gradient(to right, hsl(var(--bulma-primary)), hsl(var(--bulma-primary-95)));
}

.theme-${flavor.id} .has-theme-gradient-link {
  background: linear-gradient(to right, hsl(var(--bulma-link)), hsl(var(--bulma-link-95)));
}

/* Syntax highlighting for this theme */
.theme-${flavor.id} .highlight {
  background: var(--syntax-bg);
  color: var(--syntax-fg);
}

.theme-${flavor.id} .highlight pre,
.theme-${flavor.id} pre.highlight {
  background: transparent;
  color: var(--syntax-fg);
}

.theme-${flavor.id} .highlight code {
  background: transparent;
  color: var(--syntax-fg);
}

.theme-${flavor.id} .highlight .c,
.theme-${flavor.id} .highlight .cm,
.theme-${flavor.id} .highlight .c1 {
  color: var(--syntax-comment);
}

.theme-${flavor.id} .highlight .k,
.theme-${flavor.id} .highlight .kc,
.theme-${flavor.id} .highlight .kd {
  color: var(--syntax-keyword);
}

.theme-${flavor.id} .highlight .s,
.theme-${flavor.id} .highlight .s1,
.theme-${flavor.id} .highlight .sb,
.theme-${flavor.id} .highlight .sd,
.theme-${flavor.id} .highlight .s2 {
  color: var(--syntax-string);
}

.theme-${flavor.id} .highlight .m,
.theme-${flavor.id} .highlight .mi,
.theme-${flavor.id} .highlight .mf,
.theme-${flavor.id} .highlight .mh {
  color: var(--syntax-number);
}

.theme-${flavor.id} .highlight .nt,
.theme-${flavor.id} .highlight .na {
  color: var(--syntax-attr);
}

.theme-${flavor.id} .highlight .nn,
.theme-${flavor.id} .highlight .nc,
.theme-${flavor.id} .highlight .no,
.theme-${flavor.id} .highlight .nf {
  color: var(--syntax-title);
}
`;

  const themeFile = path.join(outDir, `theme-${flavor.id}.scss`);
  fs.writeFileSync(themeFile, themeScss, "utf8");
  console.log(`Generated theme entry: ${themeFile}`);
});
