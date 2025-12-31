#!/usr/bin/env node
// SPDX-License-Identifier: MIT
/**
 * Build all platform artifacts in sequence.
 */

import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const run = (cmd) => {
  console.log(`\n▶ ${cmd}`);
  execSync(cmd, { stdio: 'inherit', cwd: root });
};

run('bun run build');
run('bun run build:themes');
run('bun run build:tokens:all');
run('bun run build:js');

