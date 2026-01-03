/* SPDX-License-Identifier: MIT */
/**
 * Copy adapter assets to dist for package exports
 *
 * This script ensures adapter files are available at the paths
 * declared in package.json exports.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
  console.log(`✅ Copied ${path.relative(projectRoot, src)} → ${path.relative(projectRoot, dest)}`);
}

function main() {
  try {
    // Copy Tailwind preset
    copyFile(
      path.join(projectRoot, 'src/adapters/tailwind/preset.ts'),
      path.join(projectRoot, 'dist/adapters/tailwind/preset.js')
    );

    copyFile(
      path.join(projectRoot, 'src/adapters/tailwind/colors.ts'),
      path.join(projectRoot, 'dist/adapters/tailwind/colors.js')
    );

    // Copy Bootstrap adapter
    copyFile(
      path.join(projectRoot, 'src/adapters/bootstrap/_variables.scss'),
      path.join(projectRoot, 'dist/adapters/bootstrap/_variables.scss')
    );

    copyFile(
      path.join(projectRoot, 'src/adapters/bootstrap/_utilities.scss'),
      path.join(projectRoot, 'dist/adapters/bootstrap/_utilities.scss')
    );

    console.log('✅ Adapter assets copied to dist/');
  } catch (error) {
    console.error('❌ Failed to copy adapter assets:', error);
    process.exit(1);
  }
}

main();
