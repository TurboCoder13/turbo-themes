// SPDX-License-Identifier: MIT
// AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY
// Generated from: schema/turbo-themes-output.schema.json
// Generator: scripts/codegen/generate-ts-types.mjs
// Run: bun run generate:types:ts


/* eslint-disable @typescript-eslint/no-empty-object-type */

export interface Meta {
  themeIds?: string[];
  vendors?: string[];
  totalThemes?: number;
  lightThemes?: number;
  darkThemes?: number;
}

export interface Vendor {
  name: string;
  homepage: string;
  themes: string[];
}

export interface Background {
  base: string;
  surface: string;
  overlay: string;
}

export interface Text {
  primary: string;
  secondary: string;
  inverse: string;
}

export interface Brand {
  primary: string;
  primaryText: string;
}

export interface State {
  info: string;
  success: string;
  warning: string;
  danger: string;
}

export interface Border {
  default: string;
}

export interface Accent {
  link: string;
}

export interface Spacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface Elevation {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface Animation {
  durationFast: string;
  durationNormal: string;
  durationSlow: string;
  easingDefault: string;
  easingEmphasized: string;
}

export interface Opacity {
  disabled: number;
  hover: number;
  pressed: number;
}

export interface Fonts {
  sans: string;
  mono: string;
}

export interface Typography {
  fonts: Fonts;
  webFonts: string[];
}

export interface Heading {
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
}

export interface Body {
  primary: string;
  secondary: string;
}

export interface Link {
  default: string;
}

export interface Selection {
  fg: string;
  bg: string;
}

export interface Blockquote {
  border: string;
  fg: string;
  bg: string;
}

export interface Code {
  fg: string;
  bg: string;
}

export interface Table {
  border: string;
  stripe: string;
  theadBg: string;
  cellBg?: string;
  headerFg?: string;
}

export interface Content {
  heading: Heading;
  body: Body;
  link: Link;
  selection: Selection;
  blockquote: Blockquote;
  codeInline: Code;
  codeBlock: Code;
  table: Table;
}

export interface CardComponent {
  bg?: string;
  border?: string;
  headerBg?: string;
  footerBg?: string;
}

export interface MessageComponent {
  bg?: string;
  headerBg?: string;
  border?: string;
  bodyFg?: string;
}

export interface PanelComponent {
  bg?: string;
  headerBg?: string;
  headerFg?: string;
  border?: string;
  blockBg?: string;
  blockHoverBg?: string;
  blockActiveBg?: string;
}

export interface BoxComponent {
  bg?: string;
  border?: string;
}

export interface NotificationComponent {
  bg?: string;
  border?: string;
}

export interface ModalComponent {
  bg?: string;
  cardBg?: string;
  headerBg?: string;
  footerBg?: string;
}

export interface DropdownComponent {
  bg?: string;
  itemHoverBg?: string;
  border?: string;
}

export interface TabsComponent {
  border?: string;
  linkBg?: string;
  linkActiveBg?: string;
  linkHoverBg?: string;
}

export interface Components {
  card?: CardComponent;
  message?: MessageComponent;
  panel?: PanelComponent;
  box?: BoxComponent;
  notification?: NotificationComponent;
  modal?: ModalComponent;
  dropdown?: DropdownComponent;
  tabs?: TabsComponent;
}

export interface Tokens {
  background: Background;
  text: Text;
  brand: Brand;
  state: State;
  border: Border;
  accent: Accent;
  spacing?: Spacing;
  elevation?: Elevation;
  animation?: Animation;
  opacity?: Opacity;
  typography: Typography;
  content: Content;
  components?: Components;
}

export interface ThemeValue {
  $description?: string;
  id: string;
  label: string;
  vendor: string;
  appearance: unknown;
  iconUrl?: string;
  tokens: Tokens;
}

export interface TurboThemesOutput {
  $schema?: string;
  $description?: string;
  $version?: string;
  $generated?: string;
  meta?: Meta;
  themes: Record<string, ThemeValue>;
  byVendor?: Record<string, Vendor>;
}

export type Appearance = 'light' | 'dark';

// Re-export main types
export type { ThemeTokens } from "./types.js";
