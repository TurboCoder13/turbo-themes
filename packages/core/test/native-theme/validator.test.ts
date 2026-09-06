// SPDX-License-Identifier: MIT
import { describe, expect, it } from 'vitest';
import {
  formatNativeThemeValidation,
  parseNativeThemeCss,
  validateNativeThemeCss,
  validateNativeThemeTokens,
  REQUIRED_NATIVE_TOKENS,
  OPTIONAL_NATIVE_TOKENS,
} from '../../src/native-theme/validator.js';
import {
  assertNativeTheme,
  assertNativeThemeTokens,
  NativeThemeValidationError,
} from '../../src/native-theme/assert.js';

/** Build a CSS file declaring exactly the given token names with a value. */
function cssFor(names: readonly string[]): string {
  return `[data-theme='acme'] {\n${names.map((n) => `  ${n}: #123456;`).join('\n')}\n}`;
}

describe('native-theme contract', () => {
  it('declares a plausible required set', () => {
    // Core inks and surfaces every deep integration reads.
    for (const token of [
      '--turbo-bg-base',
      '--turbo-text-primary',
      '--turbo-brand-primary',
      '--turbo-state-success-text', // audited ink emitted since #820
      '--turbo-border-default',
    ]) {
      expect(REQUIRED_NATIVE_TOKENS).toContain(token);
    }
    // Optional groups are theme-dependent, never required.
    expect(OPTIONAL_NATIVE_TOKENS).toContain('--turbo-spacing-md');
    expect(REQUIRED_NATIVE_TOKENS).not.toContain('--turbo-spacing-md');
  });

  it('is satisfied by every shipped flavor generated CSS', async () => {
    // The contract is generated from the generator itself, so every flavor
    // must round-trip through the validator. This also pins the contract to
    // generator changes: a flavor that stops emitting a required token is a
    // build-time failure, not a silent native-consumer regression.
    const { flavors } = await import('../../src/tokens/index.js');
    const { generateThemeCss } = await import(
      '../../../css/src/generator.ts'
    );
    for (const flavor of flavors) {
      const result = validateNativeThemeCss(generateThemeCss(flavor));
      expect(
        result.valid,
        `${flavor.id}: ${result.missing.join(', ')} missing`,
      ).toBe(true);
    }
  });
});

describe('validateNativeThemeCss', () => {
  it('passes a complete theme', () => {
    const result = validateNativeThemeCss(cssFor(REQUIRED_NATIVE_TOKENS));
    expect(result.valid).toBe(true);
    expect(result.missing).toEqual([]);
    expect(result.unknown).toEqual([]);
  });

  it('flags missing required tokens', () => {
    const result = validateNativeThemeCss(cssFor(REQUIRED_NATIVE_TOKENS.slice(0, 10)));
    expect(result.valid).toBe(false);
    expect(result.missing.length).toBe(REQUIRED_NATIVE_TOKENS.length - 10);
  });

  it('flags unknown tokens as likely typos', () => {
    const css = `${cssFor(REQUIRED_NATIVE_TOKENS)}\n[data-theme='acme'] { --turbo-state-dangerx: #ff0000; }`;
    const result = validateNativeThemeCss(css);
    expect(result.valid).toBe(false);
    expect(result.unknown).toEqual(['--turbo-state-dangerx']);
  });

  it('accepts optional tokens without penalty', () => {
    const css = `${cssFor(REQUIRED_NATIVE_TOKENS)}\n[data-theme='acme'] { --turbo-spacing-md: 1rem; }`;
    const result = validateNativeThemeCss(css);
    expect(result.valid).toBe(true);
  });

  it('flags duplicate declarations', () => {
    const css = `${cssFor(REQUIRED_NATIVE_TOKENS)}\n[data-theme='acme'] { --turbo-bg-base: #654321; }`;
    const result = validateNativeThemeCss(css);
    expect(result.valid).toBe(false);
    expect(result.duplicates).toEqual(['--turbo-bg-base']);
  });

  it('ignores commented-out declarations', () => {
    const css = `${cssFor(REQUIRED_NATIVE_TOKENS)}\n/* --turbo-bg-base: #ffffff; */`;
    const result = validateNativeThemeCss(css);
    expect(result.duplicates).toEqual([]);
    expect(result.valid).toBe(true);
  });

  it('flags empty values', () => {
    const css = `[data-theme='acme'] {\n${REQUIRED_NATIVE_TOKENS.map((n) => `  ${n}: ;`).join('\n')}\n}`;
    const result = validateNativeThemeCss(css);
    expect(result.valid).toBe(false);
    expect(result.empty.length).toBe(REQUIRED_NATIVE_TOKENS.length);
  });
});

describe('parseNativeThemeCss', () => {
  it('extracts declarations from selectors, media queries, and var() values', () => {
    const { tokens } = parseNativeThemeCss(`
      @media (prefers-color-scheme: dark) {
        [data-theme='acme'] {
          --turbo-bg-base: #111111;
          --turbo-accent-link: var(--turbo-brand-primary);
        }
      }
    `);
    expect(tokens['--turbo-bg-base']).toBe('#111111');
    expect(tokens['--turbo-accent-link']).toBe('var(--turbo-brand-primary)');
  });

  it('does not treat var() usage as a declaration', () => {
    const { tokens } = parseNativeThemeCss('.btn { color: var(--turbo-text-primary); }');
    expect(Object.keys(tokens)).toEqual([]);
  });
});

describe('validateNativeThemeTokens', () => {
  it('accepts a JSON token map', () => {
    const tokens = Object.fromEntries(REQUIRED_NATIVE_TOKENS.map((n) => [n, '#123456']));
    expect(validateNativeThemeTokens(tokens).valid).toBe(true);
  });
});

describe('assert helpers', () => {
  it('returns the validation when valid', () => {
    const result = assertNativeTheme(cssFor(REQUIRED_NATIVE_TOKENS), 'acme');
    expect(result.valid).toBe(true);
    expect(() => assertNativeThemeTokens({ '--turbo-bg-base': '#fff' })).toThrow(
      NativeThemeValidationError,
    );
  });

  it('formats a readable report', () => {
    const report = formatNativeThemeValidation(validateNativeThemeCss(''), 'acme.css');
    expect(report).toContain('acme.css');
    expect(report).toContain('missing');
  });
});
