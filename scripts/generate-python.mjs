/* SPDX-License-Identifier: MIT */
/**
 * Generate Python tokens and theme registry from dist/tokens.json.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distTokensPath = path.join(projectRoot, "dist", "tokens.json");
const outDir = path.join(projectRoot, "python", "src", "turbo_themes");

function loadTokens() {
  if (!fs.existsSync(distTokensPath)) {
    throw new Error("dist/tokens.json not found. Run `bun run build` first.");
  }
  const raw = fs.readFileSync(distTokensPath, "utf8");
  return JSON.parse(raw);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`✅ Wrote ${path.relative(projectRoot, filePath)}`);
}

function renderTokensPy() {
  return `"""Typed design tokens for Turbo Themes.\n\nGenerated from dist/tokens.json.\n"""\nfrom __future__ import annotations\n\nfrom dataclasses import dataclass\nfrom typing import Dict, Tuple\n\n\n@dataclass(frozen=True)\nclass BackgroundTokens:\n    base: str\n    surface: str\n    overlay: str\n\n\n@dataclass(frozen=True)\nclass TextTokens:\n    primary: str\n    secondary: str\n    inverse: str\n\n\n@dataclass(frozen=True)\nclass BrandTokens:\n    primary: str\n\n\n@dataclass(frozen=True)\nclass StateTokens:\n    info: str\n    success: str\n    warning: str\n    danger: str\n\n\n@dataclass(frozen=True)\nclass BorderTokens:\n    default: str\n\n\n@dataclass(frozen=True)\nclass AccentTokens:\n    link: str\n\n\n@dataclass(frozen=True)\nclass HeadingTokens:\n    h1: str\n    h2: str\n    h3: str\n    h4: str\n    h5: str\n    h6: str\n\n\n@dataclass(frozen=True)\nclass BodyTokens:\n    primary: str\n    secondary: str\n\n\n@dataclass(frozen=True)\nclass LinkTokens:\n    default: str\n\n\n@dataclass(frozen=True)\nclass SelectionTokens:\n    fg: str\n    bg: str\n\n\n@dataclass(frozen=True)\nclass BlockquoteTokens:\n    border: str\n    fg: str\n    bg: str\n\n\n@dataclass(frozen=True)\nclass CodeTokens:\n    fg: str\n    bg: str\n\n\n@dataclass(frozen=True)\nclass TableTokens:\n    border: str\n    stripe: str\n    theadBg: str\n    cellBg: str | None\n    headerFg: str | None\n\n\n@dataclass(frozen=True)\nclass ContentTokens:\n    heading: HeadingTokens\n    body: BodyTokens\n    link: LinkTokens\n    selection: SelectionTokens\n    blockquote: BlockquoteTokens\n    codeInline: CodeTokens\n    codeBlock: CodeTokens\n    table: TableTokens\n\n\n@dataclass(frozen=True)\nclass TypographyTokens:\n    fonts: Dict[str, str]\n    webFonts: Tuple[str, ...]\n\n\n@dataclass(frozen=True)\nclass ThemeTokens:\n    background: BackgroundTokens\n    text: TextTokens\n    brand: BrandTokens\n    state: StateTokens\n    border: BorderTokens\n    accent: AccentTokens\n    content: ContentTokens\n    typography: TypographyTokens\n\n\n__all__ = [\n    "ThemeTokens",\n    "BackgroundTokens",\n    "TextTokens",\n    "BrandTokens",\n    "StateTokens",\n    "BorderTokens",\n    "AccentTokens",\n    "HeadingTokens",\n    "BodyTokens",\n    "LinkTokens",\n    "SelectionTokens",\n    "BlockquoteTokens",\n    "CodeTokens",\n    "TableTokens",\n    "ContentTokens",\n    "TypographyTokens",\n]\n`;
}

function pyValue(val) {
  if (Array.isArray(val)) {
    return `(${val.map(pyValue).join(", ")}${val.length === 1 ? "," : ""})`;
  }
  if (val === null || val === undefined) return "None";
  if (typeof val === "string") {
    const escaped = val
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'");
    return `'${escaped}'`;
  }
  if (typeof val === "number") return String(val);
  if (typeof val === "boolean") return val ? "True" : "False";
  if (typeof val === "object") {
    const entries = Object.entries(val)
      .map(([k, v]) => `'${k}': ${pyValue(v)}`)
      .join(", ");
    return `{${entries}}`;
  }
  return "None";
}

function renderThemesPy(tokensJson) {
  const themes = tokensJson.themes || {};
  const lines = [
    '"""Theme registry for Turbo Themes.\n\nGenerated from dist/tokens.json.\n"""',
    'from __future__ import annotations',
    '',
    'from typing import Dict',
    'from .tokens import ThemeTokens, BackgroundTokens, TextTokens, BrandTokens, StateTokens,',
    'BorderTokens, AccentTokens, HeadingTokens, BodyTokens, LinkTokens, SelectionTokens,',
    'BlockquoteTokens, CodeTokens, TableTokens, ContentTokens, TypographyTokens',
    '',
    'THEMES: Dict[str, ThemeTokens] = {',
  ];

  for (const [id, theme] of Object.entries(themes)) {
    const t = theme.tokens;
    lines.push(`    '${id}': ThemeTokens(`);
    lines.push(`        background=BackgroundTokens(base=${pyValue(t.background.base)}, surface=${pyValue(t.background.surface)}, overlay=${pyValue(t.background.overlay)}),`);
    lines.push(`        text=TextTokens(primary=${pyValue(t.text.primary)}, secondary=${pyValue(t.text.secondary)}, inverse=${pyValue(t.text.inverse)}),`);
    lines.push(`        brand=BrandTokens(primary=${pyValue(t.brand.primary)}),`);
    lines.push(`        state=StateTokens(info=${pyValue(t.state.info)}, success=${pyValue(t.state.success)}, warning=${pyValue(t.state.warning)}, danger=${pyValue(t.state.danger)}),`);
    lines.push(`        border=BorderTokens(default=${pyValue(t.border.default)}),`);
    lines.push(`        accent=AccentTokens(link=${pyValue(t.accent.link)}),`);
    lines.push(`        content=ContentTokens(`);
    lines.push(`            heading=HeadingTokens(h1=${pyValue(t.content.heading.h1)}, h2=${pyValue(t.content.heading.h2)}, h3=${pyValue(t.content.heading.h3)}, h4=${pyValue(t.content.heading.h4)}, h5=${pyValue(t.content.heading.h5)}, h6=${pyValue(t.content.heading.h6)}),`);
    lines.push(`            body=BodyTokens(primary=${pyValue(t.content.body.primary)}, secondary=${pyValue(t.content.body.secondary)}),`);
    lines.push(`            link=LinkTokens(default=${pyValue(t.content.link.default)}),`);
    lines.push(`            selection=SelectionTokens(fg=${pyValue(t.content.selection.fg)}, bg=${pyValue(t.content.selection.bg)}),`);
    lines.push(`            blockquote=BlockquoteTokens(border=${pyValue(t.content.blockquote.border)}, fg=${pyValue(t.content.blockquote.fg)}, bg=${pyValue(t.content.blockquote.bg)}),`);
    lines.push(`            codeInline=CodeTokens(fg=${pyValue(t.content.codeInline.fg)}, bg=${pyValue(t.content.codeInline.bg)}),`);
    lines.push(`            codeBlock=CodeTokens(fg=${pyValue(t.content.codeBlock.fg)}, bg=${pyValue(t.content.codeBlock.bg)}),`);
    lines.push(`            table=TableTokens(border=${pyValue(t.content.table.border)}, stripe=${pyValue(t.content.table.stripe)}, theadBg=${pyValue(t.content.table.theadBg)}, cellBg=${pyValue(t.content.table.cellBg || null)}, headerFg=${pyValue(t.content.table.headerFg || null)}),`);
    lines.push('        ),');
    lines.push(`        typography=TypographyTokens(fonts=${pyValue(t.typography.fonts)}, webFonts=${pyValue(t.typography.webFonts || [])}),`);
    lines.push('    ),');
  }

  lines.push('}');
  lines.push('THEME_IDS = tuple(THEMES.keys())');
  lines.push('');
  lines.push("__all__ = ['THEMES', 'THEME_IDS', 'ThemeTokens']");

  return lines.join("\n");
}

function main() {
  const tokensJson = loadTokens();
  const tokensPy = renderTokensPy();
  const themesPy = renderThemesPy(tokensJson);

  writeFile(path.join(outDir, "tokens.py"), tokensPy);
  writeFile(path.join(outDir, "themes.py"), themesPy);
}

main();
