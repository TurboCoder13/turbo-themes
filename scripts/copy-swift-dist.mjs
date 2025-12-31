#!/usr/bin/env node
// SPDX-License-Identifier: MIT
/**
 * Copy generated Swift files from dist/swift to swift/Sources/TurboThemes.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const srcDir = path.join(root, 'dist', 'swift');
const destDir = path.join(root, 'swift', 'Sources', 'TurboThemes');

const copy = (src, dest) => {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`✅ copied ${path.relative(root, src)} -> ${path.relative(root, dest)}`);
};

if (!fs.existsSync(srcDir)) {
  console.error('dist/swift not found. Run style-dictionary first.');
  process.exit(1);
}

for (const file of fs.readdirSync(srcDir)) {
  if (file.endsWith('.swift')) {
    copy(path.join(srcDir, file), path.join(destDir, file));
  }
}

