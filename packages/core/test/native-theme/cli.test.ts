// SPDX-License-Identifier: MIT
import { afterEach, describe, expect, it, vi } from 'vitest';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { runCli } from '../../src/native-theme/cli.js';
import { REQUIRED_NATIVE_TOKENS } from '../../src/native-theme/validator.js';

function makeTempDir(): string {
  return mkdtempSync(join(tmpdir(), 'native-theme-cli-'));
}

describe('native-theme CLI', () => {
  let dir: string;

  afterEach(() => {
    if (dir) rmSync(dir, { recursive: true, force: true });
    vi.restoreAllMocks();
  });

  it('prints usage with both commands and exits 0 for --help', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    expect(runCli(['--help'])).toBe(0);
    const usage = log.mock.calls.map((c) => c[0]).join('');
    expect(usage).toContain('validate-native');
    expect(usage).toContain('init-native-theme');
    expect(usage).toContain('--force');
  });

  it('exits 2 for an unknown command', () => {
    const err = vi.spyOn(console, 'error').mockImplementation(() => {});
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    expect(runCli(['nope'])).toBe(2);
    expect(err).toHaveBeenCalledWith(expect.stringContaining('unknown command'));
    expect(log).toHaveBeenCalled();
  });

  it('exits 2 when validate-native has no file argument', () => {
    const err = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(runCli(['validate-native'])).toBe(2);
    expect(err).toHaveBeenCalledWith(expect.stringContaining('usage'));
  });

  it('exits 2 when the theme file does not exist', () => {
    const err = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(runCli(['validate-native', '/nonexistent/theme.css'])).toBe(2);
    expect(err).toHaveBeenCalledWith(expect.stringContaining('file not found'));
  });

  it('validates a complete CSS theme with exit 0 and prints the report', () => {
    dir = makeTempDir();
    const file = join(dir, 'acme.css');
    writeFileSync(file, `[data-theme='acme'] {\n${REQUIRED_NATIVE_TOKENS.map((n) => `  ${n}: #123456;`).join('\n')}\n}\n`);

    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    expect(runCli(['validate-native', file])).toBe(0);
    expect(log).toHaveBeenCalledWith(expect.stringContaining('90/90'));
  });

  it('emits a JSON report with --json and exit 1 for an invalid theme', () => {
    dir = makeTempDir();
    const file = join(dir, 'broken.css');
    writeFileSync(file, '[data-theme=\'acme\'] { --turbo-bg-base: #ffffff; }');

    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const code = runCli(['validate-native', file, '--json']);
    expect(code).toBe(1);
    const report = JSON.parse(log.mock.calls.map((c) => c[0]).join(''));
    expect(report.valid).toBe(false);
    expect(report.missing.length).toBeGreaterThan(0);
  });

  it('validates a JSON token map file', () => {
    dir = makeTempDir();
    const file = join(dir, 'acme.json');
    const tokens = Object.fromEntries(REQUIRED_NATIVE_TOKENS.map((n) => [n, '#abcdef']));
    writeFileSync(file, JSON.stringify(tokens));

    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    expect(runCli(['validate-native', file, '--json'])).toBe(0);
    const report = JSON.parse(log.mock.calls.map((c) => c[0]).join(''));
    expect(report.valid).toBe(true);
  });

  it('exits 2 for invalid JSON input', () => {
    dir = makeTempDir();
    const file = join(dir, 'broken.json');
    writeFileSync(file, '{ not json');

    const err = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(runCli(['validate-native', file])).toBe(2);
    expect(err).toHaveBeenCalledWith(expect.stringContaining('invalid JSON'));
  });

  it('exits 2 for JSON input that is not an object', () => {
    dir = makeTempDir();
    const file = join(dir, 'array.json');
    writeFileSync(file, '[]');

    const err = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(runCli(['validate-native', file])).toBe(2);
    expect(err).toHaveBeenCalledWith(expect.stringContaining('JSON input must be an object'));
  });

  it('init-native-theme writes a scaffold flagged as placeholder until filled', () => {
    dir = makeTempDir();
    const out = join(dir, 'acme.css');
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});

    expect(runCli(['init-native-theme', 'acme', '--out', out])).toBe(0);
    expect(log).toHaveBeenCalledWith(expect.stringContaining('scaffold written'));

    const scaffold = readFileSync(out, 'utf8');
    expect(scaffold).toContain("[data-theme='acme']");

    // The untouched scaffold is `initial` everywhere: validation must NOT
    // pass until a real palette replaces the placeholders.
    const report = vi.spyOn(console, 'log').mockImplementation(() => {});
    expect(runCli(['validate-native', out])).toBe(1);
    expect(report).toHaveBeenCalledWith(expect.stringContaining('placeholder'));
  });

  it('init-native-theme refuses to overwrite without --force', () => {
    dir = makeTempDir();
    const out = join(dir, 'acme.css');
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const err = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(runCli(['init-native-theme', 'acme', '--out', out])).toBe(0);
    expect(runCli(['init-native-theme', 'acme', '--out', out])).toBe(2);
    expect(err).toHaveBeenCalledWith(expect.stringContaining('already exists'));

    expect(runCli(['init-native-theme', 'acme', '--out', out, '--force'])).toBe(0);
    expect(log).toHaveBeenCalled();
  });

  it('exits 2 when JSON token values are not strings', () => {
    dir = makeTempDir();
    const file = join(dir, 'mixed.json');
    const tokens: Record<string, unknown> = { '--turbo-bg-base': null };
    for (const n of REQUIRED_NATIVE_TOKENS) tokens[n] = '#123456';
    tokens['--turbo-bg-base'] = null;
    writeFileSync(file, JSON.stringify(tokens));

    const err = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(runCli(['validate-native', file])).toBe(2);
    expect(err).toHaveBeenCalledWith(expect.stringContaining('JSON values must be strings'));
  });

  it('exits 2 for an invalid theme id in init-native-theme', () => {
    const err = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(runCli(['init-native-theme', 'Bad Id!'])).toBe(2);
    expect(err).toHaveBeenCalledWith(expect.stringContaining('usage'));
  });
});
