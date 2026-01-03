#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync, rmSync } from "fs";
import { execSync } from "child_process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const siteExamplesDir = join(rootDir, "_site", "examples");

const copyDir = (from, to) => {
  cpSync(from, to, {
    recursive: true,
    force: true,
    filter: (src) => !src.includes("node_modules"),
  });
};

/**
 * Check if the turbo-themes gem is available to bundler
 */
function isGemAvailable() {
  try {
    execSync("bundle exec ruby -e \"require 'turbo-themes'\"", {
      cwd: rootDir,
      stdio: "pipe",
    });
    return true;
  } catch {
    return false;
  }
}

try {
  if (!existsSync(join(rootDir, "_site"))) {
    mkdirSync(join(rootDir, "_site"));
  }
  rmSync(siteExamplesDir, { recursive: true, force: true });
  mkdirSync(siteExamplesDir, { recursive: true });

  // html-vanilla (static)
  const htmlVanilla = join(rootDir, "examples", "html-vanilla");
  if (existsSync(htmlVanilla)) {
    copyDir(htmlVanilla, join(siteExamplesDir, "html-vanilla"));
  }

  // tailwind (static assets, prebuilt dist)
  const tailwind = join(rootDir, "examples", "tailwind");
  if (existsSync(tailwind)) {
    copyDir(tailwind, join(siteExamplesDir, "tailwind"));
  }

  // jekyll demo build (only if turbo-themes gem is available)
  const jekyllSource = join(rootDir, "examples", "jekyll");
  if (existsSync(jekyllSource)) {
    if (isGemAvailable()) {
      execSync(
        "bundle exec jekyll build --source examples/jekyll --destination _site/examples/jekyll --config examples/jekyll/_config.yml",
        {
          cwd: rootDir,
          stdio: "inherit",
        },
      );
    } else {
      console.log("⚠️  Skipping Jekyll example build (turbo-themes gem not in Bundler environment)");
      console.log("   To enable: add 'gem \"turbo-themes\", path: \".\"' to Gemfile and run 'bundle install'");
      // Copy static files as fallback
      copyDir(jekyllSource, join(siteExamplesDir, "jekyll"));
    }
  }

  console.log("Examples prepared under _site/examples");
} catch (error) {
  console.error("Failed to prepare examples:", error.message);
  process.exit(1);
}

