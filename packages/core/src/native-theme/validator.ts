// SPDX-License-Identifier: MIT
/**
 * Site-native theme token validation (#944).
 *
 * A "site-native theme" is a theme token file maintained in a consuming
 * repo and loaded as `[data-theme="…"] { --turbo-*: … }` CSS (or an
 * equivalent JSON map). This module validates such files against the
 * contract generated from the CSS generator itself
 * (generated/native-contract.json), so a missing or misspelled token fails
 * loudly in CI instead of silently falling back in shipped components.
 *
 * The audited contrast pairs behind most of these tokens live separately
 * in schema/contrast-pairs.json (#922); the WCAG AA normalizer guarantees
 * those inks for published flavors.
 */

import contract from './generated/native-contract.json' with { type: 'json' };

/** CSS variable names a native theme must declare (emitted for every flavor). */
export const REQUIRED_NATIVE_TOKENS: readonly string[] = contract.required;
/** CSS variable names a native theme may declare (emitted for some flavors). */
export const OPTIONAL_NATIVE_TOKENS: readonly string[] = contract.optional;

export interface NativeThemeValidation {
  /** true when no required token is missing and nothing unknown/empty is declared. */
  valid: boolean;
  requiredCount: number;
  declaredCount: number;
  /** Required tokens the file does not declare. */
  missing: string[];
  /** `--turbo-*` declarations that are not part of the contract (likely typos). */
  unknown: string[];
  /** `--turbo-*` tokens declared more than once; last declaration wins in CSS. */
  duplicates: string[];
  /** Declarations whose value is empty. */
  empty: string[];
}

/**
 * Validate a token map (`--turbo-x` name → value).
 */
export function validateNativeThemeTokens(tokens: Record<string, string>): NativeThemeValidation {
  const required = new Set(REQUIRED_NATIVE_TOKENS);
  const known = new Set([...REQUIRED_NATIVE_TOKENS, ...OPTIONAL_NATIVE_TOKENS]);

  const declared = new Set<string>();
  const duplicates = new Set<string>();
  const empty: string[] = [];

  for (const [name, value] of Object.entries(tokens)) {
    if (declared.has(name)) duplicates.add(name);
    declared.add(name);
    if (value === undefined || value.trim() === '') empty.push(name);
  }

  const missing = [...required].filter((name) => !declared.has(name)).sort();
  const unknown = [...declared].filter((name) => !known.has(name)).sort();

  return {
    valid: missing.length === 0 && unknown.length === 0 && duplicates.size === 0 && empty.length === 0,
    requiredCount: required.size,
    declaredCount: declared.size,
    missing,
    unknown,
    duplicates: [...duplicates].sort(),
    empty: empty.sort(),
  };
}

/**
 * Parse `--turbo-*` custom property declarations out of CSS.
 *
 * Comments are stripped first so commented-out declarations are not
 * counted, and values inside `var()` fallbacks are never mistaken for
 * declarations (only `name: value;` shapes count).
 *
 * @returns The token map and any names declared more than once.
 */
export function parseNativeThemeCss(css: string): {
  tokens: Record<string, string>;
  duplicates: string[];
} {
  const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const tokens: Record<string, string> = {};
  const occurrences = new Map<string, number>();

  const declaration = /(--turbo-[a-z0-9-]+)\s*:\s*([^;{}]*)(?=;|\}|$)/gi;
  let match: RegExpExecArray | null;
  while ((match = declaration.exec(withoutComments)) !== null) {
    const name = match[1]?.toLowerCase();
    if (!name) continue;
    occurrences.set(name, (occurrences.get(name) ?? 0) + 1);
    tokens[name] = match[2]?.trim() ?? '';
  }

  const duplicates = [...occurrences.entries()]
    .filter(([, count]) => count > 1)
    .map(([name]) => name)
    .sort();

  return { tokens, duplicates };
}

/**
 * Validate a native theme given as CSS source.
 */
export function validateNativeThemeCss(css: string): NativeThemeValidation {
  const { tokens, duplicates } = parseNativeThemeCss(css);
  const result = validateNativeThemeTokens(tokens);
  result.duplicates = duplicates;
  result.valid =
    result.valid && duplicates.length === 0;
  return result;
}

/**
 * Format a validation result as a human-readable report (used by the CLI
 * and the assert helper).
 */
export function formatNativeThemeValidation(
  result: NativeThemeValidation,
  source = 'native theme',
): string {
  const lines: string[] = [];
  const problems: string[] = [];
  if (result.missing.length > 0) {
    problems.push(
      `missing ${result.missing.length} required token(s):\n  ${result.missing.join('\n  ')}`,
    );
  }
  if (result.unknown.length > 0) {
    problems.push(
      `unknown --turbo-* token(s) (${result.unknown.length}; typo or version mismatch?):\n  ` +
        `${result.unknown.join('\n  ')}`,
    );
  }
  if (result.duplicates.length > 0) {
    problems.push(`duplicate declaration(s): ${result.duplicates.join(', ')}`);
  }
  if (result.empty.length > 0) {
    problems.push(`empty value(s): ${result.empty.join(', ')}`);
  }

  if (problems.length === 0) {
    lines.push(`✅ ${source}: ${result.declaredCount}/${result.requiredCount} contract tokens declared, all good.`);
  } else {
    lines.push(`❌ ${source}: ${result.missing.length} missing, ${result.unknown.length} unknown, ` +
      `${result.duplicates.length} duplicate, ${result.empty.length} empty ` +
      `(${result.declaredCount} declared of ${result.requiredCount} required).`);
    lines.push(...problems);
  }
  return lines.join('\n');
}
