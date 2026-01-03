// SPDX-License-Identifier: MIT
/**
 * Base Style Dictionary configuration.
 *
 * Consumers should extend this file to target specific platforms.
 * The source tokens are emitted by `scripts/prepare-style-dictionary.mjs`
 * into `dist/tokens/style-dictionary/themes.json`.
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const styleDictionaryTokensDir = path.join(
  projectRoot,
  'dist',
  'tokens',
  'style-dictionary'
);

export default {
  source: [path.join(styleDictionaryTokensDir, 'themes.json')],
  log: {
    // Reduce noise during CI; override in derived configs if needed
    verbosity: 'warn',
  },
};
