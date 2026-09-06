/**
 * Integration tests for scripts/codegen/generate-metadata.mjs freshness.
 */
import { mkdtempSync, readFileSync, rmSync, writeFileSync, copyFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

const REPO_ROOT = join(import.meta.dirname, '..', '..');
const GENERATOR = join(REPO_ROOT, 'scripts', 'codegen', 'generate-metadata.mjs');
const VERIFY = join(REPO_ROOT, 'scripts', 'ci', 'verify-generated-tokens.sh');
const CORE_META = join(REPO_ROOT, 'packages', 'core', 'src', 'themes', 'generated', 'metadata.ts');
const SELECTOR_MAPS = join(
  REPO_ROOT,
  'packages',
  'theme-selector',
  'src',
  'generated',
  'theme-maps.ts',
);

describe('generate-metadata.mjs', () => {
  it('is deterministic — re-running leaves committed outputs unchanged', () => {
    const beforeCore = readFileSync(CORE_META, 'utf-8');
    const beforeSelector = readFileSync(SELECTOR_MAPS, 'utf-8');

    const result = spawnSync('bun', [GENERATOR], {
      cwd: REPO_ROOT,
      encoding: 'utf-8',
    });
    expect(result.status, result.stderr || result.stdout).toBe(0);

    expect(readFileSync(CORE_META, 'utf-8')).toBe(beforeCore);
    expect(readFileSync(SELECTOR_MAPS, 'utf-8')).toBe(beforeSelector);
  });

  it('regenerating restores manually edited metadata', () => {
    const original = readFileSync(CORE_META, 'utf-8');
    const backupDir = mkdtempSync(join(tmpdir(), 'metadata-freshness-'));
    const backupPath = join(backupDir, 'metadata.ts');
    copyFileSync(CORE_META, backupPath);

    try {
      writeFileSync(CORE_META, `${original}\n// manual edit should be overwritten\n`);
      expect(readFileSync(CORE_META, 'utf-8')).not.toBe(original);

      const result = spawnSync('bun', [GENERATOR], {
        cwd: REPO_ROOT,
        encoding: 'utf-8',
      });
      expect(result.status, result.stderr || result.stdout).toBe(0);
      expect(readFileSync(CORE_META, 'utf-8')).toBe(original);
    } finally {
      copyFileSync(backupPath, CORE_META);
      rmSync(backupDir, { recursive: true, force: true });
    }
  });

  it(
    'verify-generated-tokens.sh fails when metadata differs from HEAD',
    () => {
      // New/untracked or dirty generated metadata must fail the CI freshness check.
      // The script walks git status over the whole tree, which is slow right
      // after a full build; give both the script and the test room beyond
      // the 5s defaults.
      const result = spawnSync('bash', [VERIFY], {
        cwd: REPO_ROOT,
        encoding: 'utf-8',
        timeout: 30_000,
      });

      const porcelain = spawnSync('git', ['status', '--porcelain', '--', CORE_META, SELECTOR_MAPS], {
        cwd: REPO_ROOT,
        encoding: 'utf-8',
      });
      const isDirty = (porcelain.stdout || '').trim().length > 0;

    if (isDirty) {
      expect(result.status).not.toBe(0);
      expect(result.stderr + result.stdout).toMatch(/uncommitted|Generated tokens/i);
    } else {
      // After the generated files are committed, a temporary edit must fail verify.
      const original = readFileSync(CORE_META, 'utf-8');
      try {
        writeFileSync(CORE_META, `${original}\n// stale\n`);
        const dirtyResult = spawnSync('bash', [VERIFY], {
          cwd: REPO_ROOT,
          encoding: 'utf-8',
        });
        expect(dirtyResult.status).not.toBe(0);
      } finally {
        writeFileSync(CORE_META, original);
      }
    }
  }, 30_000);
});
