/* SPDX-License-Identifier: MIT */
// Build theme CSS bundles and framework-agnostic turbo variables.
//
// Steps:
// 1. Generate turbo CSS variables from tokens (no framework coupling)
// 2. Build critical.css (above-the-fold styles)
// 3. Build base.css (shared styles, minimal Bulma)
// 4. Build individual theme bundles (full Bulma compilation)

import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { execSync, execFileSync } from "node:child_process";

// Resolve project root from this script location
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// Import compiled modules from dist
const distDir = path.join(projectRoot, "dist");
const registryMod = await import(pathToFileURL(path.join(distDir, "themes/registry.js")));
const { flavors } = registryMod;

const viteBin =
  process.platform === 'win32'
    ? path.join(projectRoot, 'node_modules', '.bin', 'vite.cmd')
    : path.join(projectRoot, 'node_modules', '.bin', 'vite');

console.log('Generating framework-agnostic turbo CSS variables...');
try {
  execSync('node scripts/generate-turbo-css.mjs', {
    cwd: projectRoot,
    stdio: 'inherit',
    env: {
      ...process.env,
    },
  });
} catch (error) {
  console.error('Failed to generate turbo CSS:', error.message);
  process.exit(1);
}

console.log('Building optimized theme CSS files...');

// Build critical CSS (above-the-fold styles)
console.log('Building critical.css (above-the-fold styles)...');
try {
  execFileSync(
    viteBin,
    ['build', '--config', 'vite.config.js', '--mode', 'production', '--logLevel', 'error'],
    {
      cwd: projectRoot,
      env: {
        ...process.env,
        THEME_ENTRY: 'src/scss/critical.scss',
        THEME_OUTPUT: 'assets/css/themes/critical.css',
      },
      stdio: 'inherit'
    }
  );
} catch (error) {
  console.error('Failed to build critical.css:', error.message);
  process.exit(1);
}

// Build base CSS (minimal shared styles, no Bulma framework)
console.log('Building base.css (minimal shared styles)...');
try {
  execFileSync(
    viteBin,
    ['build', '--config', 'vite.config.js', '--mode', 'production', '--logLevel', 'error'],
    {
      cwd: projectRoot,
      env: {
        ...process.env,
        THEME_ENTRY: 'src/scss/base.scss',
        THEME_OUTPUT: 'assets/css/themes/base.css',
      },
      stdio: 'inherit'
    }
  );
} catch (error) {
  console.error('Failed to build base.css:', error.message);
  process.exit(1);
}

// Validate and sanitize flavor ID to prevent path traversal
function validateFlavorId(id) {
  // Reject any values containing path separators, "..", or leading slashes
  if (!id || typeof id !== 'string') {
    throw new Error(`Invalid flavor ID: ${id}`);
  }
  if (id.includes('..') || id.includes('/') || id.includes('\\') || id.startsWith('.')) {
    throw new Error(`Invalid flavor ID contains path traversal characters: ${id}`);
  }
  // Enforce whitelist pattern: only alphanumeric, hyphen, underscore
  if (!/^[A-Za-z0-9_-]+$/.test(id)) {
    throw new Error(`Invalid flavor ID format (only alphanumeric, hyphen, underscore allowed): ${id}`);
  }
  return id;
}

// Build individual theme bundles (each with self-contained Bulma compilation)
console.log(`Building ${flavors.length} self-contained theme bundles...`);
flavors.forEach((flavor) => {
  const safeId = validateFlavorId(flavor.id);
  const themeFile = path.join('src', 'scss', `theme-${safeId}.scss`);
  const outputFile = path.join('assets', 'css', 'themes', 'compiled', `${safeId}.css`);

  console.log(`Building ${flavor.id} theme bundle (with full Bulma compilation)...`);

  try {
    // Use Vite to build this specific theme with its own Bulma instance
    execFileSync(
      viteBin,
      ['build', '--config', 'vite.config.js', '--mode', 'production', '--logLevel', 'error'],
      {
        cwd: projectRoot,
        env: {
          ...process.env,
          THEME_ENTRY: themeFile,
          THEME_OUTPUT: outputFile,
        },
        stdio: 'inherit'
      }
    );
  } catch (error) {
    console.error(`Failed to build theme ${flavor.id}:`, error.message);
    process.exit(1);
  }
});

console.log('All self-contained theme bundles built successfully!');
