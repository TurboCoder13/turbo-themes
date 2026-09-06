#!/usr/bin/env node
/**
 * Semantic Version Bump Script
 *
 * Analyzes conventional commits since last tag to determine next version bump.
 * Generates CHANGELOG.md updates and updates package.json version.
 *
 * Usage: node scripts/ci/version-bump.mjs [--dry-run] [--preview]
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '../..');

// Configuration
const CONFIG = {
  majorKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
  // Note: These patterns match by commit type, not literal prefix
  // The matching logic uses parseCommit() which extracts type from "type(scope):"
  minorTypes: ['feat', 'feature'],
  patchTypes: ['fix', 'bugfix', 'patch', 'docs', 'style', 'refactor', 'perf', 'test', 'chore'],
  // Subset of patchTypes that represent true defect fixes (→ "🐛 Fixed" changelog bucket).
  // style/refactor/perf/test/chore (without an internal scope) go to "🔧 Changed".
  // docs type commits are routed to Internal (see changelogInternalTypes).
  fixTypes: ['fix', 'bugfix', 'patch'],
  ignoreTypes: ['ci', 'build', 'release'],
  // Scopes routed to the non-consumer "Internal" changelog section (not Fixed/Added/Changed).
  // These commits still participate in version bump decisions via their type.
  // Breaking changes always stay in BREAKING CHANGES regardless of scope.
  changelogInternalScopes: ['ci', 'build', 'test', 'docs'],
  // Commit types always routed to Internal (Keep a Changelog "Changed" is for
  // consumer-facing functional changes; docs updates are not).
  changelogInternalTypes: ['docs'],
  ignorePatterns: ['chore(release):'], // Full prefix patterns to skip entirely
  changelogFile: join(projectRoot, 'CHANGELOG.md'),
  packageFile: join(projectRoot, 'package.json'),
};

// Enforce the invariant: every fixType must also be a patchType.
for (const t of CONFIG.fixTypes) {
  if (!CONFIG.patchTypes.includes(t)) {
    throw new Error(
      `CONFIG invariant violated: fixType "${t}" is not present in patchTypes. ` +
        'Add it to patchTypes or remove it from fixTypes.',
    );
  }
}

/**
 * Parse conventional commit message
 */
function parseCommit(commit) {
  // Support optional `!` breaking marker: type(scope)!: description
  const match = commit.match(/^(\w+)(\([^)]+\))?(!)?: (.+)$/);
  if (!match) return null;

  const [, type, scope, breakingMarker, description] = match;
  const desc = description.trim();
  return {
    type: type.toLowerCase(),
    scope: scope ? scope.slice(1, -1) : null,
    description: desc,
    breaking:
      Boolean(breakingMarker) ||
      desc.includes('BREAKING CHANGE') ||
      desc.includes('BREAKING CHANGES'),
  };
}

/**
 * Whether a commit's scope belongs in the non-consumer Internal changelog section.
 * Version bump logic is unaffected — only changelog rendering consults this.
 */
function isChangelogInternalScope(scope) {
  if (!scope) return false;
  return CONFIG.changelogInternalScopes.includes(scope.toLowerCase());
}

/**
 * Whether a commit's type belongs in the non-consumer Internal changelog section.
 * Version bump logic is unaffected — only changelog rendering consults this.
 */
function isChangelogInternalType(type) {
  if (!type) return false;
  return CONFIG.changelogInternalTypes.includes(type.toLowerCase());
}

/**
 * Whether a parsed commit (plus raw message) is a breaking change.
 */
function isBreakingCommit(parsed, message) {
  return (
    parsed.breaking ||
    CONFIG.majorKeywords.some((keyword) => message.toLowerCase().includes(keyword.toLowerCase()))
  );
}

/**
 * Post-process a conventional-commit description for changelog readability.
 * Capitalizes the first character; leaves the rest (including trailing PR refs) intact.
 */
function formatChangelogDescription(description) {
  if (!description) return description;
  return description.charAt(0).toUpperCase() + description.slice(1);
}

/**
 * Escape bare emphasis characters so PR titles cannot inject markdown styling.
 * Inline-code spans are left untouched, and an already-escaped marker (odd
 * number of preceding backslashes) is not double-escaped.
 */
function escapeChangelogText(text) {
  let out = '';
  let inCode = false;
  let backslashes = '';
  for (const ch of text) {
    if (ch === '`') {
      inCode = !inCode;
      out += ch;
      backslashes = '';
      continue;
    }
    if (ch === '\\') {
      backslashes += '\\';
      out += ch;
      continue;
    }
    if ((ch === '*' || ch === '_') && !inCode && backslashes.length % 2 === 0) {
      out += '\\';
    }
    out += ch;
    backslashes = '';
  }
  return out;
}

/**
 * Greedy word-wrap a "- …" bullet with a two-space hanging indent, measuring
 * continuation lines including their indent. Must stay byte-identical to the
 * markdown formatter's reflow (same width as defaults.prettier.overrides *.md
 * printWidth in .lintro-config.yaml), otherwise the quality gate and the
 * generator fight over CHANGELOG.md on every release.
 */
const CHANGELOG_WIDTH = 88;
const CHANGELOG_INDENT = '  ';
function wrapBullet(entry) {
  const lines = [];
  let line = entry;
  let width = CHANGELOG_WIDTH;
  let indent = 0;
  while (line.length > width) {
    const cut = line.lastIndexOf(' ', width);
    // An unbreakable token longer than the width: keep it overflowing the
    // same way the formatter does instead of looping forever.
    if (cut <= indent) break;
    lines.push(line.slice(0, cut));
    line = CHANGELOG_INDENT + line.slice(cut + 1);
    indent = CHANGELOG_INDENT.length;
    width = CHANGELOG_WIDTH - indent;
  }
  lines.push(line);
  return lines.join('\n');
}

/**
 * Get commits since last tag
 */
function getCommitsSinceLastTag() {
  try {
    const lastTag = execSync('git describe --tags --abbrev=0', {
      encoding: 'utf8',
      cwd: projectRoot,
    }).trim();

    const commits = execSync(`git log ${lastTag}..HEAD --oneline --no-merges`, {
      encoding: 'utf8',
      cwd: projectRoot,
    })
      .trim()
      .split('\n')
      .filter(Boolean);

    return { lastTag, commits };
  } catch {
    // No tags found, get all commits
    const commits = execSync('git log --oneline --no-merges', {
      encoding: 'utf8',
      cwd: projectRoot,
    })
      .trim()
      .split('\n')
      .filter(Boolean);

    return { lastTag: null, commits };
  }
}

/**
 * Determine version bump type
 */
function determineBumpType(commits) {
  let hasBreaking = false;
  let hasFeature = false;
  let hasFix = false;

  for (const commit of commits) {
    // Extract commit message (remove hash prefix)
    const message = commit.replace(/^[a-f0-9]{7,} /, '');
    const parsed = parseCommit(message);
    if (!parsed) continue;

    // Skip ignored commit types based on parsed type
    if (CONFIG.ignoreTypes.includes(parsed.type)) {
      continue;
    }

    // Skip specific full patterns (like "chore(release):")
    if (CONFIG.ignorePatterns.some((pattern) => message.toLowerCase().startsWith(pattern))) {
      continue;
    }

    if (isBreakingCommit(parsed, message)) {
      hasBreaking = true;
    } else if (CONFIG.minorTypes.includes(parsed.type)) {
      hasFeature = true;
    } else if (CONFIG.patchTypes.includes(parsed.type)) {
      hasFix = true;
    }
  }

  if (hasBreaking) return 'major';
  if (hasFeature) return 'minor';
  if (hasFix) return 'patch';

  return null; // No version bump needed
}

/**
 * Parse current version
 */
function parseVersion(versionString) {
  const match = versionString.match(/^(\d+)\.(\d+)\.(\d+)(?:-(.+))?$/);
  if (!match) throw new Error(`Invalid version format: ${versionString}`);

  const [, major, minor, patch, prerelease] = match;
  return {
    major: Number.parseInt(major, 10),
    minor: Number.parseInt(minor, 10),
    patch: Number.parseInt(patch, 10),
    prerelease: prerelease || null,
  };
}

/**
 * Calculate next version
 */
function calculateNextVersion(currentVersion, bumpType) {
  const version = parseVersion(currentVersion);

  switch (bumpType) {
    case 'major':
      return `${version.major + 1}.0.0`;
    case 'minor':
      return `${version.major}.${version.minor + 1}.0`;
    case 'patch':
      return `${version.major}.${version.minor}.${version.patch + 1}`;
    default:
      return currentVersion;
  }
}

/**
 * Generate changelog entry
 */
function generateChangelogEntry(commits, version, bumpType) {
  if (!bumpType) return null;

  const features = [];
  const fixes = [];
  const breaking = [];
  const others = [];
  const internal = [];

  for (const commit of commits) {
    // Extract commit message (remove hash prefix)
    const message = commit.replace(/^[a-f0-9]{7,} /, '');
    const parsed = parseCommit(message);
    if (!parsed) continue;

    // Skip ignored commit types based on parsed type
    if (CONFIG.ignoreTypes.includes(parsed.type)) {
      continue;
    }

    // Skip specific full patterns (like "chore(release):")
    if (CONFIG.ignorePatterns.some((pattern) => message.toLowerCase().startsWith(pattern))) {
      continue;
    }

    const entry = wrapBullet(
      `- ${escapeChangelogText(formatChangelogDescription(parsed.description))}`,
    );
    const isBreaking = isBreakingCommit(parsed, message);

    // Breaking changes always appear under BREAKING CHANGES, even for ci/build scopes,
    // so a major bump is never unexplained in the changelog.
    if (isBreaking) {
      breaking.push(entry);
      continue;
    }

    // Route non-consumer scopes/types (e.g. fix(ci): …, docs(site): …) to Internal —
    // not Fixed/Added/Changed. Bump decisions still use these via determineBumpType().
    if (isChangelogInternalScope(parsed.scope) || isChangelogInternalType(parsed.type)) {
      internal.push(entry);
      continue;
    }

    if (CONFIG.minorTypes.includes(parsed.type)) {
      features.push(entry);
    } else if (CONFIG.fixTypes.includes(parsed.type)) {
      fixes.push(entry);
    } else {
      // style, refactor, perf, test, chore → "### 🔧 Changed"
      others.push(entry);
    }
  }

  const today = new Date().toISOString().split('T')[0];
  let changelog = `## [${version}] - ${today}\n\n`;

  if (breaking.length > 0) {
    changelog += `### ⚠️ BREAKING CHANGES\n\n`;
    changelog += breaking.join('\n') + '\n\n';
  }

  if (features.length > 0) {
    changelog += `### ✨ Added\n\n`;
    changelog += features.join('\n') + '\n\n';
  }

  if (fixes.length > 0) {
    changelog += `### 🐛 Fixed\n\n`;
    changelog += fixes.join('\n') + '\n\n';
  }

  if (others.length > 0) {
    changelog += `### 🔧 Changed\n\n`;
    changelog += others.join('\n') + '\n\n';
  }

  if (internal.length > 0) {
    changelog += `### 🤖 Internal\n\n`;
    changelog += internal.join('\n') + '\n\n';
  }

  return changelog;
}

/**
 * Update package.json version
 */
function updatePackageVersion(newVersion) {
  const packagePath = CONFIG.packageFile;
  const packageContent = JSON.parse(readFileSync(packagePath, 'utf8'));

  packageContent.version = newVersion;

  writeFileSync(packagePath, JSON.stringify(packageContent, null, 2) + '\n');
  console.log(`📦 Updated package.json version to ${newVersion}`);
}

/**
 * Update CHANGELOG.md
 */
function updateChangelog(changelogEntry) {
  const changelogPath = CONFIG.changelogFile;
  const changelogContent = readFileSync(changelogPath, 'utf8');

  // Replace [Unreleased] section with new version entry
  const updatedContent = changelogContent.replace(
    /## \[Unreleased\][\s\S]*?(?=## \[|$)/,
    `## [Unreleased]\n\n### Added\n\n- TBD\n\n${changelogEntry}`
  );

  writeFileSync(changelogPath, updatedContent);
  console.log(`📝 Updated CHANGELOG.md`);
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run');
  const isPreview = args.includes('--preview');

  console.log('🚀 Semantic Version Bump Analysis\n');

  // Get commits since last tag
  const { lastTag, commits } = getCommitsSinceLastTag();
  console.log(`📋 Analyzing ${commits.length} commits since ${lastTag || 'beginning'}`);

  if (commits.length === 0) {
    console.log('✅ No commits to analyze, no version bump needed');
    return;
  }

  // Determine bump type
  const bumpType = determineBumpType(commits);
  console.log(`🔍 Bump type: ${bumpType || 'none'}`);

  if (!bumpType) {
    console.log('✅ No version bump needed based on conventional commits');
    return;
  }

  // Calculate next version
  const packageContent = JSON.parse(readFileSync(CONFIG.packageFile, 'utf8'));
  const currentVersion = packageContent.version;
  const nextVersion = calculateNextVersion(currentVersion, bumpType);

  console.log(`📈 Version bump: ${currentVersion} → ${nextVersion}`);

  // Generate changelog entry
  const changelogEntry = generateChangelogEntry(commits, nextVersion, bumpType);

  if (isPreview || isDryRun) {
    console.log('\n📝 Preview of changes:');
    console.log('='.repeat(50));
    console.log(changelogEntry);
    console.log('='.repeat(50));
    console.log(`\n📦 package.json: ${currentVersion} → ${nextVersion}`);

    if (isDryRun) {
      console.log('\n🔍 Dry run complete - no files modified');
    }
    return;
  }

  // Apply changes
  updatePackageVersion(nextVersion);
  updateChangelog(changelogEntry);

  console.log('\n✅ Version bump complete!');
  console.log(`📦 New version: ${nextVersion}`);
  console.log('📝 CHANGELOG.md updated');
  console.log('📦 package.json updated');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export {
  determineBumpType,
  calculateNextVersion,
  generateChangelogEntry,
  formatChangelogDescription,
  isChangelogInternalScope,
  isChangelogInternalType,
  isBreakingCommit,
  parseCommit,
};
