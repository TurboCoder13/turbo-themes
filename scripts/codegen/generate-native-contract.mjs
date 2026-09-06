#!/usr/bin/env bun
/**
 * Generate the site-native theme contract (#944).
 *
 * The required token set for a site-native theme file is "everything
 * generateCssVarsFromTokens emits for every theme" — derived here from the
 * generator itself so the contract can never drift from what the CSS
 * generator produces:
 *
 * - required: variable names emitted for ALL flavors (deep integrations and
 *   components may rely on them; the WCAG normalizer audits most of them —
 *   see schema/contrast-pairs.json)
 * - optional: variable names emitted for at least one flavor but not all
 *   (themes may declare them; consumers must fall back gracefully)
 *
 * Output: packages/core/src/native-theme/generated/native-contract.json
 * (committed; verify-generated-tokens.sh treats drift as an error).
 */

import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..', '..');
const OUT = join(
  projectRoot,
  'packages/core/src/native-theme/generated/native-contract.json',
);

// The generator import graph resolves @lgtm-hq/turbo-themes-core subpaths
// against packages/core/dist, which does not exist on a fresh checkout.
// Build it (once) before importing so this step can run inside build:tokens
// and build:packages then compiles dist with the fresh contract.
const coreMappingsDist = join(
  projectRoot,
  'packages/core/dist/themes/css/mappings.js',
);
if (!existsSync(coreMappingsDist)) {
  console.log('[generate-native-contract] building core first (dist missing)...');
  execSync('bun run build:core', { stdio: 'inherit', cwd: projectRoot });
}

// Bun executes TypeScript directly, so the generator can be imported as-is.
const { flavors } = await import(
  join(projectRoot, 'packages/core/src/tokens/index.ts')
);
const { generateCssVarsFromTokens } = await import(
  join(projectRoot, 'packages/css/src/generator.ts')
);

/** @type {Map<string, number>} variable name -> number of flavors emitting it */
const counts = new Map();
for (const flavor of flavors) {
  const vars = generateCssVarsFromTokens(flavor.tokens);
  const names = new Set(vars.map((line) => line.trim().split(':')[0]));
  for (const name of names) counts.set(name, (counts.get(name) ?? 0) + 1);
}

const total = flavors.length;
const required = [];
const optional = [];
for (const [name, count] of [...counts.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  if (count === total) required.push(name);
  else optional.push(name);
}

const contract = {
  $version: 1,
  $description:
    'Site-native theme token contract (#944). Generated from the CSS ' +
    'generator across all flavors by scripts/codegen/generate-native-contract.mjs — do not edit. ' +
    'required: emitted for every flavor; optional: emitted for some flavors. ' +
    'Audited pairs are declared separately in schema/contrast-pairs.json.',
  flavorCount: total,
  required,
  optional,
};

if (required.length < 30) {
  throw new Error(
    `[generate-native-contract] implausibly small required set (${required.length}); ` +
      'the generator shape probably changed',
  );
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(contract, null, 2) + '\n');
console.log(
  `[generate-native-contract] ${required.length} required, ${optional.length} optional tokens ` +
    `from ${total} flavors -> ${OUT.replace(projectRoot + '/', '')}`,
);
