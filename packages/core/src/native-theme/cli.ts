#!/usr/bin/env node
// SPDX-License-Identifier: MIT
/**
 * turbo-themes CLI — site-native theme tooling (#944).
 *
 *   turbo-themes validate-native <file.css|file.json> [--json]
 *       Validate a native theme file against the token contract.
 *       Exit 0 when valid, 1 otherwise.
 *
 *   turbo-themes init-native-theme <theme-id> [--out <path>]
 *       Emit a scaffold CSS file declaring every required token.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import {
  formatNativeThemeValidation,
  REQUIRED_NATIVE_TOKENS,
  validateNativeThemeCss,
  validateNativeThemeTokens,
} from './validator.js';

const USAGE = `turbo-themes <command>

Commands:
  validate-native <file.css|file.json> [--json]
      Validate a site-native theme file against the token contract.
  init-native-theme <theme-id> [--out <path>]
      Write a scaffold declaring every required token.

Options:
  --json    Machine-readable report (validate-native)
  --out     Output path (init-native-theme; default: <theme-id>.css)
  -h, --help
`;

function readThemeFile(path: string): {
  css?: string;
  tokens?: Record<string, string>;
  error?: string;
} {
  if (!existsSync(path)) {
    return { error: `file not found: ${path}` };
  }
  const content = readFileSync(path, 'utf8');
  const looksLikeJson = path.endsWith('.json') || content.trim().startsWith('{');
  if (looksLikeJson) {
    try {
      const parsed = JSON.parse(content);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return { tokens: parsed as Record<string, string> };
      }
      return { error: 'JSON input must be an object of token name → value' };
    } catch (e) {
      return { error: `invalid JSON in ${path}: ${(e as Error).message}` };
    }
  }
  return { css: content };
}

function runValidateNative(args: string[]): number {
  const asJson = args.includes('--json');
  const positional = args.filter((a) => !a.startsWith('--'));
  const file = positional[0];
  if (!file || positional.length !== 1) {
    console.error('usage: turbo-themes validate-native <file.css|file.json> [--json]');
    return 2;
  }
  const { css, tokens, error } = readThemeFile(file);
  if (error) {
    console.error(`error: ${error}`);
    return 2;
  }
  const result = css !== undefined ? validateNativeThemeCss(css) : validateNativeThemeTokens(tokens!);

  if (asJson) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log(formatNativeThemeValidation(result, file));
  }
  return result.valid ? 0 : 1;
}

function runInitNativeTheme(args: string[]): number {
  const positional = args.filter((a) => !a.startsWith('--'));
  const outIndex = args.indexOf('--out');
  const themeId = positional[0];
  if (!themeId || !/^[a-z0-9-]+$/i.test(themeId)) {
    console.error('usage: turbo-themes init-native-theme <theme-id> [--out <path>]');
    return 2;
  }
  const out = outIndex >= 0 ? args[outIndex + 1] : `${themeId}.css`;
  if (!out) {
    console.error('usage: turbo-themes init-native-theme <theme-id> [--out <path>]');
    return 2;
  }

  const scaffold = `/* ${themeId} — site-native theme scaffold (turbo-themes init-native-theme)
 *
 * Replace each placeholder with your palette, then validate:
 *   turbo-themes validate-native ${out}
 * Required tokens: ${REQUIRED_NATIVE_TOKENS.length}. Optional tokens
 * (spacing/elevation/animation/opacity) may be added later.
 */
[data-theme='${themeId}'] {
${REQUIRED_NATIVE_TOKENS.map((name) => `  ${name}: initial;`).join('\n')}
}
`;
  writeFileSync(out, scaffold);
  console.log(`✅ scaffold written to ${out} (${REQUIRED_NATIVE_TOKENS.length} tokens)`);
  console.log('   every value is `initial` — replace with real colors, then run:');
  console.log(`   turbo-themes validate-native ${out}`);
  return 0;
}

export function runCli(argv: string[] = process.argv.slice(2)): number {
  const [command, ...rest] = argv;
  if (!command || command === '-h' || command === '--help' || command === 'help') {
    console.log(USAGE);
    return 0;
  }
  switch (command) {
    case 'validate-native':
      return runValidateNative(rest);
    case 'init-native-theme':
      return runInitNativeTheme(rest);
    default:
      console.error(`unknown command: ${command}\n`);
      console.log(USAGE);
      return 2;
  }
}
