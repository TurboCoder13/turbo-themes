#!/usr/bin/env node
// SPDX-License-Identifier: MIT
/**
 * Sync the project version across all platform packages.
 * Source of truth: ./VERSION
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const versionFile = path.join(root, 'VERSION');
const version = fs.readFileSync(versionFile, 'utf8').trim();

const log = (msg) => console.log(`✅ ${msg}`);

const writeJsonVersion = (filePath, keyPath = ['version']) => {
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  let target = data;
  for (let i = 0; i < keyPath.length - 1; i += 1) {
    target = target[keyPath[i]];
  }
  const leaf = keyPath[keyPath.length - 1];
  target[leaf] = version;
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
  log(`synced ${path.relative(root, filePath)}`);
};

const replaceInFile = (filePath, regex, replacement, description) => {
  if (!fs.existsSync(filePath)) return;
  const raw = fs.readFileSync(filePath, 'utf8');
  const next = raw.replace(regex, replacement);
  fs.writeFileSync(filePath, next);
  log(`synced ${description}`);
};

// npm package.json
writeJsonVersion(path.join(root, 'package.json'));

// Ruby gem version
replaceInFile(
  path.join(root, 'lib', 'turbo-themes', 'version.rb'),
  /VERSION = "[^"]+"/,
  `VERSION = "${version}"`,
  'Ruby gem version'
);

// Python package version
replaceInFile(
  path.join(root, 'python', 'pyproject.toml'),
  /version\s*=\s*"[^"]+"/,
  `version = "${version}"`,
  'python/pyproject.toml'
);

// Python __version__
const pyInit = path.join(root, 'python', 'src', 'turbo_themes', '__init__.py');
if (fs.existsSync(pyInit)) {
  const raw = fs.readFileSync(pyInit, 'utf8');
  const marker = '__version__ =';
  const line = `${marker} "${version}"`;
  const next = raw.includes(marker)
    ? raw.replace(/__version__\s*=\s*"[^"]+"/, line)
    : `${raw}\n${line}\n`;
  fs.writeFileSync(pyInit, next);
  log('python __version__');
}

// Swift version shim
const swiftVersionFile = path.join(root, 'swift', 'Sources', 'TurboThemes', 'Version.swift');
const swiftVersionContent = `// SPDX-License-Identifier: MIT\n// Auto-synced by scripts/sync-version.mjs\n\npublic enum TurboThemesVersion {\n    public static let string = "${version}"\n}\n`;
fs.mkdirSync(path.dirname(swiftVersionFile), { recursive: true });
fs.writeFileSync(swiftVersionFile, swiftVersionContent);
log('swift Version.swift');

// Dart package (optional)
replaceInFile(
  path.join(root, 'dart', 'pubspec.yaml'),
  /version:\\s*[0-9]+\\.[0-9]+\\.[0-9]+/,
  `version: ${version}`,
  'dart pubspec'
);

// Kotlin gradle (optional)
replaceInFile(
  path.join(root, 'kotlin', 'build.gradle.kts'),
  /version = "[^"]+"/,
  `version = "${version}"`,
  'kotlin build.gradle.kts'
);

