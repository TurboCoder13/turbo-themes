// SPDX-License-Identifier: MIT
// Type definitions for theme packages

export interface ThemeTokens {
  background: {
    base: string;
    surface: string;
    overlay: string;
  };
  text: {
    primary: string;
    secondary: string;
    inverse: string;
  };
  brand: {
    primary: string;
    /**
     * Audited AA ink for brand fills. Required in every built token file —
     * the WCAG AA normalizer computes it and validate-schema enforces it in
     * schema/turbo-themes.schema.json — but optional in this interface,
     * which also types the pre-normalization sync packs under themes/packs/
     * (generated before the normalizer runs). The consumer-facing contract
     * is generated-types.ts `Brand`, where it is required.
     */
    primaryText?: string;
  };
  state: {
    info: string;
    success: string;
    warning: string;
    danger: string;
    infoText?: string;
    successText?: string;
    warningText?: string;
    dangerText?: string;
  };
  border: {
    default: string;
  };
  accent: {
    link: string;
  };
  typography: {
    fonts: {
      sans: string;
      mono: string;
    };
    webFonts: string[];
  };
  spacing?: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  elevation?: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  animation?: {
    durationFast: string;
    durationNormal: string;
    durationSlow: string;
    easingDefault: string;
    easingEmphasized: string;
  };
  opacity?: {
    disabled: number;
    hover: number;
    pressed: number;
  };
  content: {
    heading: {
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      h5: string;
      h6: string;
    };
    body: {
      primary: string;
      secondary: string;
    };
    link: {
      default: string;
    };
    selection: {
      fg: string;
      bg: string;
    };
    blockquote: {
      border: string;
      fg: string;
      bg: string;
    };
    codeInline: {
      fg: string;
      bg: string;
    };
    codeBlock: {
      fg: string;
      bg: string;
    };
    table: {
      border: string;
      stripe: string;
      theadBg: string;
      cellBg?: string;
      headerFg?: string;
    };
  };
  // Optional component-specific tokens for enhanced contrast
  // Falls back to surface tokens when not defined
  components?: {
    card?: {
      bg?: string;
      border?: string;
      headerBg?: string;
      footerBg?: string;
    };
    message?: {
      bg?: string;
      headerBg?: string;
      border?: string;
      bodyFg?: string;
    };
    panel?: {
      bg?: string;
      headerBg?: string;
      headerFg?: string;
      border?: string;
      blockBg?: string;
      blockHoverBg?: string;
      blockActiveBg?: string;
    };
    box?: {
      bg?: string;
      border?: string;
    };
    notification?: {
      bg?: string;
      border?: string;
    };
    modal?: {
      bg?: string;
      cardBg?: string;
      headerBg?: string;
      footerBg?: string;
    };
    dropdown?: {
      bg?: string;
      itemHoverBg?: string;
      border?: string;
    };
    tabs?: {
      border?: string;
      linkBg?: string;
      linkActiveBg?: string;
      linkHoverBg?: string;
    };
  };
}

export interface BulmaConfig {
  // Custom breakpoints for responsive design
  breakpoints?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
    widescreen?: string;
    fullhd?: string;
  };
  // Custom spacing scale
  spacing?: {
    small?: string;
    medium?: string;
    large?: string;
  };
  // Custom typography scale
  sizes?: {
    small?: string;
    normal?: string;
    medium?: string;
    large?: string;
  };
  // Custom radius values
  radius?: {
    small?: string;
    normal?: string;
    medium?: string;
    large?: string;
    rounded?: string;
  };
  // Custom shadows
  shadows?: {
    small?: string;
    normal?: string;
    medium?: string;
    large?: string;
  };
}

export interface ThemeFlavor {
  id: string;
  label: string;
  vendor: string;
  appearance: 'light' | 'dark';
  iconUrl?: string;
  tokens: ThemeTokens;
  bulma?: BulmaConfig; // Optional Bulma customizations
}

export interface ThemeLicense {
  /** SPDX license identifier(s), e.g., "MIT" or "Apache-2.0 AND CC-BY-SA-4.0" */
  spdx: string;
  /** URL to the license file or terms */
  url?: string;
  /** Copyright holder or author attribution */
  copyright?: string;
}

export interface ThemeSource {
  /** Package name on npm/pypi/etc */
  package?: string;
  /** Package version used */
  version?: string;
  /** Repository URL */
  repository?: string;
}

export interface ThemePackage {
  id: string;
  name: string;
  homepage: string;
  /** License information for the theme */
  license?: ThemeLicense;
  /** Source attribution for synced/derived themes */
  source?: ThemeSource;
  flavors: ThemeFlavor[];
}
