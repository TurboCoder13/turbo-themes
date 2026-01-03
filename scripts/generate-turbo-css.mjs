/* SPDX-License-Identifier: MIT */
/**
 * Generate framework-agnostic CSS variables from compiled tokens.
 *
 * Input:
 *   - dist/tokens/index.js (built from TypeScript)
 *
 * Output:
 *   - assets/css/turbo-core.css
 *   - assets/css/themes/turbo/<id>.css
 *
 * Notes:
 *   - Run after `bun run build` so dist/tokens is available.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const assetsDir = path.join(projectRoot, "assets", "css");
const themesDir = path.join(assetsDir, "themes", "turbo");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function safeWrite(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`✅ Wrote ${path.relative(projectRoot, filePath)}`);
}

function cssVarsFromTokens(tokens) {
  const lines = [];
  const add = (name, value) => lines.push(`  --${name}: ${value};`);

  add("turbo-bg-base", tokens.background.base);
  add("turbo-bg-surface", tokens.background.surface);
  add("turbo-bg-surface-alt", tokens.background.overlay);

  add("turbo-text-primary", tokens.text.primary);
  add("turbo-text-secondary", tokens.text.secondary);
  add("turbo-text-inverse", tokens.text.inverse);

  add("turbo-brand-primary", tokens.brand.primary);

  add("turbo-state-info", tokens.state.info);
  add("turbo-state-success", tokens.state.success);
  add("turbo-state-warning", tokens.state.warning);
  add("turbo-state-danger", tokens.state.danger);

  add("turbo-border-default", tokens.border.default);

  if (tokens.accent?.link) {
    add("turbo-accent-link", tokens.accent.link);
  }

  const heading = tokens.content?.heading;
  if (heading) {
    add("turbo-heading-h1", heading.h1);
    add("turbo-heading-h2", heading.h2);
    add("turbo-heading-h3", heading.h3);
    add("turbo-heading-h4", heading.h4);
    add("turbo-heading-h5", heading.h5);
    add("turbo-heading-h6", heading.h6);
  }
  const body = tokens.content?.body;
  if (body) {
    add("turbo-body-primary", body.primary);
    add("turbo-body-secondary", body.secondary);
  }
  const link = tokens.content?.link;
  if (link?.default) {
    add("turbo-link-default", link.default);
  }
  const selection = tokens.content?.selection;
  if (selection) {
    add("turbo-selection-fg", selection.fg);
    add("turbo-selection-bg", selection.bg);
  }
  const blockquote = tokens.content?.blockquote;
  if (blockquote) {
    add("turbo-blockquote-border", blockquote.border);
    add("turbo-blockquote-fg", blockquote.fg);
    add("turbo-blockquote-bg", blockquote.bg);
  }
  const codeInline = tokens.content?.codeInline;
  if (codeInline) {
    add("turbo-code-inline-fg", codeInline.fg);
    add("turbo-code-inline-bg", codeInline.bg);
  }
  const codeBlock = tokens.content?.codeBlock;
  if (codeBlock) {
    add("turbo-code-block-fg", codeBlock.fg);
    add("turbo-code-block-bg", codeBlock.bg);
  }
  const table = tokens.content?.table;
  if (table) {
    add("turbo-table-border", table.border);
    add("turbo-table-stripe", table.stripe);
    add("turbo-table-thead-bg", table.theadBg);
    if (table.cellBg) add("turbo-table-cell-bg", table.cellBg);
    if (table.headerFg) add("turbo-table-header-fg", table.headerFg);
  }

  const fonts = tokens.typography?.fonts;
  if (fonts) {
    add("turbo-font-sans", fonts.sans);
    add("turbo-font-mono", fonts.mono);
  }

  return lines;
}

async function loadTokensModule() {
  const modPath = pathToFileURL(path.join(distDir, "tokens", "index.js"));
  return import(modPath.href);
}

function renderThemeCss(flavor) {
  const vars = cssVarsFromTokens(flavor.tokens);
  const webFonts = flavor.tokens.typography?.webFonts ?? [];
  const fontImports = webFonts.map((url) => `@import url('${url}');`).join("\n");

  return `${fontImports ? `${fontImports}\n\n` : ""}[data-theme="${flavor.id}"] {\n${vars.join(
    "\n"
  )}\n  color-scheme: ${flavor.appearance === "dark" ? "dark" : "light"};\n}\n`;
}

async function main() {
  const { flavors } = await loadTokensModule();
  if (!Array.isArray(flavors) || flavors.length === 0) {
    throw new Error("No flavors found in dist/tokens/index.js");
  }

  const coreVars = cssVarsFromTokens(flavors[0].tokens);
  const coreCss = `:root {\n${coreVars.join("\n")}\n}\n`;
  safeWrite(path.join(assetsDir, "turbo-core.css"), coreCss);

  flavors.forEach((flavor) => {
    const css = renderThemeCss(flavor);
    const outPath = path.join(themesDir, `${flavor.id}.css`);
    safeWrite(outPath, css);
  });
}

main().catch((error) => {
  console.error("❌ Failed to generate turbo CSS:", error);
  process.exit(1);
});
