#!/usr/bin/env node
// SPDX-License-Identifier: MIT
/**
 * Prepare Style Dictionary input from compiled tokens.
 *
 * - Reads dist/tokens/index.js (built by `bun run build`)
 * - Writes dist/tokens/style-dictionary/themes.json
 *
 * The output is intentionally simple: a map of themes where each value
 * conforms to Style Dictionary's token shape (objects with { value } leaves).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const styleDictionaryDir = path.join(distDir, 'tokens', 'style-dictionary');

async function loadTokensModule() {
  const tokensModulePath = path.join(distDir, 'tokens', 'index.js');
  if (!fs.existsSync(tokensModulePath)) {
    throw new Error(
      'dist/tokens/index.js not found. Run `bun run build` before preparing Style Dictionary.'
    );
  }

  return import(new URL(`file://${tokensModulePath}`).href);
}

const wrap = (value) => ({ value });

function toStyleDictionaryTheme(flavor) {
  const { tokens } = flavor;
  const sdTheme = {
    meta: {
      id: wrap(flavor.id),
      label: wrap(flavor.label),
      vendor: wrap(flavor.vendor),
      appearance: wrap(flavor.appearance),
    },
    color: {
      background: {
        base: wrap(tokens.background.base),
        surface: wrap(tokens.background.surface),
        overlay: wrap(tokens.background.overlay),
      },
      text: {
        primary: wrap(tokens.text.primary),
        secondary: wrap(tokens.text.secondary),
        inverse: wrap(tokens.text.inverse),
      },
      brand: {
        primary: wrap(tokens.brand.primary),
      },
      state: {
        info: wrap(tokens.state.info),
        success: wrap(tokens.state.success),
        warning: wrap(tokens.state.warning),
        danger: wrap(tokens.state.danger),
      },
      border: {
        default: wrap(tokens.border.default),
      },
      accent: {
        link: wrap(tokens.accent.link),
      },
    },
    content: {
      heading: {
        h1: wrap(tokens.content.heading.h1),
        h2: wrap(tokens.content.heading.h2),
        h3: wrap(tokens.content.heading.h3),
        h4: wrap(tokens.content.heading.h4),
        h5: wrap(tokens.content.heading.h5),
        h6: wrap(tokens.content.heading.h6),
      },
      body: {
        primary: wrap(tokens.content.body.primary),
        secondary: wrap(tokens.content.body.secondary),
      },
      link: {
        default: wrap(tokens.content.link.default),
      },
      selection: {
        fg: wrap(tokens.content.selection.fg),
        bg: wrap(tokens.content.selection.bg),
      },
      blockquote: {
        border: wrap(tokens.content.blockquote.border),
        fg: wrap(tokens.content.blockquote.fg),
        bg: wrap(tokens.content.blockquote.bg),
      },
      codeInline: {
        fg: wrap(tokens.content.codeInline.fg),
        bg: wrap(tokens.content.codeInline.bg),
      },
      codeBlock: {
        fg: wrap(tokens.content.codeBlock.fg),
        bg: wrap(tokens.content.codeBlock.bg),
      },
      table: {
        border: wrap(tokens.content.table.border),
        stripe: wrap(tokens.content.table.stripe),
        theadBg: wrap(tokens.content.table.theadBg),
      },
    },
  };

  if (tokens.content.table.cellBg) {
    sdTheme.content.table.cellBg = wrap(tokens.content.table.cellBg);
  }
  if (tokens.content.table.headerFg) {
    sdTheme.content.table.headerFg = wrap(tokens.content.table.headerFg);
  }

  return sdTheme;
}

async function main() {
  const { flavors } = await loadTokensModule();

  const themes = Object.fromEntries(
    flavors.map((flavor) => [flavor.id, toStyleDictionaryTheme(flavor)])
  );

  fs.mkdirSync(styleDictionaryDir, { recursive: true });
  const outputPath = path.join(styleDictionaryDir, 'themes.json');
  fs.writeFileSync(outputPath, JSON.stringify({ themes }, null, 2), 'utf8');

  console.log(`✅ Wrote ${outputPath}`);
  console.log(`   Themes: ${flavors.length}`);
}

main().catch((error) => {
  console.error('❌ Failed to prepare Style Dictionary input:', error);
  process.exit(1);
});

