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

import contract from "./generated/native-contract.json" with { type: "json" };

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
  /** Declarations whose value is the scaffold placeholder keyword `initial`. */
  placeholders: string[];
  /** Token map values that are not strings (JSON token maps only). */
  nonStringValues: string[];
}

/**
 * Validate a token map (`--turbo-x` name → value).
 */
export function validateNativeThemeTokens(tokens: Record<string, unknown>): NativeThemeValidation {
  const required = new Set(REQUIRED_NATIVE_TOKENS);
  const known = new Set([...REQUIRED_NATIVE_TOKENS, ...OPTIONAL_NATIVE_TOKENS]);

  const declared = new Set<string>();
  const duplicates = new Set<string>();
  const empty: string[] = [];
  const placeholders: string[] = [];
  const nonStringValues: string[] = [];

  for (const [name, value] of Object.entries(tokens)) {
    if (declared.has(name)) duplicates.add(name);
    declared.add(name);
    if (typeof value !== "string") {
      nonStringValues.push(name);
      continue;
    }
    if (value.trim() === "") empty.push(name);
    // The scaffold keyword is a placeholder, not a usable theme value.
    else if (value.trim() === "initial") placeholders.push(name);
  }

  const missing = [...required].filter((name) => !declared.has(name)).sort();
  const unknown = [...declared].filter((name) => !known.has(name)).sort();

  const valid =
    missing.length === 0 &&
    unknown.length === 0 &&
    duplicates.size === 0 &&
    empty.length === 0 &&
    placeholders.length === 0 &&
    nonStringValues.length === 0;

  return {
    valid,
    requiredCount: required.size,
    declaredCount: declared.size,
    missing,
    unknown,
    duplicates: [...duplicates].sort(),
    empty: empty.sort(),
    placeholders: placeholders.sort(),
    nonStringValues: nonStringValues.sort(),
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

/**
 * Strip CSS block comments with a linear scan. The regex equivalent - a
 * lazy match between the two comment delimiters - backtracks quadratically
 * on inputs that repeat a comment opening with no closing delimiter, and
 * this validator runs on consumer-provided theme files.
 */
function stripCssComments(css: string): string {
  let out = "";
  let from = 0;
  while (from < css.length) {
    const open = css.indexOf("/*", from);
    if (open === -1) break;
    out += css.slice(from, open);
    const close = css.indexOf("*/", open + 2);
    if (close === -1) {
      from = css.length;
      break;
    }
    from = close + 2;
  }
  out += css.slice(from);
  return out;
}

export function parseNativeThemeCss(css: string): {
  tokens: Record<string, string>;
  duplicates: string[];
} {
  const source = stripCssComments(css);
  const tokens: Record<string, string> = {};
  const occurrences = new Map<string, number>();

  // Positions inside single/double-quoted strings are not declarations: a
  // `content: "--turbo-bg-base: …"` string must not satisfy the contract.
  const quoted: boolean[] = Array.from({ length: source.length }, () => false);
  let quote: string | null = null;
  for (let q = 0; q < source.length; q++) {
    const ch = source[q];
    if (quote) {
      quoted[q] = true;
      if (ch === quote) quote = null;
    } else if (ch === '"' || ch === "'") {
      quote = ch;
      quoted[q] = true;
    }
  }

  // Linear scan for "--turbo-<name> : <value>" declarations. A regex with an
  // open-ended name pattern is quadratic on adversarial input (many repeated
  // prefixes with no colon), and this validator runs on consumer-provided
  // theme files - so every step below is an indexOf/char loop.
  let i = 0;
  // CSS custom property names are case-sensitive and may contain uppercase
  // and underscores; anything outside the contract surfaces as unknown.
  const isNameChar = (ch: string): boolean => /[a-zA-Z0-9_-]/.test(ch);
  while (i < source.length) {
    const at = source.indexOf("--turbo-", i);
    if (at === -1) break;
    if (quoted[at]) {
      i++;
      continue;
    }

    let j = at + "--turbo-".length;
    while (j < source.length && isNameChar(source[j] ?? "")) j++;
    // Names are case-sensitive in CSS: --turbo-BG-base is a different token
    // and surfaces as unknown rather than aliasing --turbo-bg-base.
    const name = source.slice(at, j);

    if (name === "--turbo-") {
      i = j;
      continue;
    }

    let k = j;
    while (k < source.length && /\s/.test(source[k] ?? "")) k++;
    if (source[k] !== ":") {
      i = j;
      continue;
    }
    k++;
    while (k < source.length && /\s/.test(source[k] ?? "")) k++;

    let valueEnd = k;
    while (valueEnd < source.length && source[valueEnd] !== ";" && source[valueEnd] !== "}") {
      const ch = source[valueEnd] ?? "";
      if (ch === '"' || ch === "'") {
        const close = source.indexOf(ch, valueEnd + 1);
        valueEnd = close === -1 ? source.length : close;
      }
      valueEnd++;
    }

    occurrences.set(name, (occurrences.get(name) ?? 0) + 1);
    tokens[name] = source.slice(k, valueEnd).trim();
    i = valueEnd;
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
  result.valid = result.valid && duplicates.length === 0;
  return result;
}

/**
 * Format a validation result as a human-readable report (used by the CLI
 * and the assert helper).
 */
export function formatNativeThemeValidation(
  result: NativeThemeValidation,
  source = "native theme",
): string {
  const lines: string[] = [];
  const problems: string[] = [];
  if (result.missing.length > 0) {
    problems.push(
      `missing ${result.missing.length} required token(s):\n  ${result.missing.join("\n  ")}`,
    );
  }
  if (result.unknown.length > 0) {
    problems.push(
      `unknown --turbo-* token(s) (${result.unknown.length}; typo or version mismatch?):\n  ` +
        `${result.unknown.join("\n  ")}`,
    );
  }
  if (result.duplicates.length > 0) {
    problems.push(`duplicate declaration(s): ${result.duplicates.join(", ")}`);
  }
  if (result.empty.length > 0) {
    problems.push(`empty value(s): ${result.empty.join(", ")}`);
  }
  if (result.placeholders.length > 0) {
    problems.push(`placeholder value(s) still "initial": ${result.placeholders.join(", ")}`);
  }
  if (result.nonStringValues.length > 0) {
    problems.push(`non-string value(s): ${result.nonStringValues.join(", ")}`);
  }

  if (problems.length === 0) {
    lines.push(
      `✅ ${source}: ${result.declaredCount}/${result.requiredCount} contract tokens declared, all good.`,
    );
  } else {
    lines.push(
      `❌ ${source}: ${result.missing.length} missing, ${result.unknown.length} unknown, ` +
        `${result.duplicates.length} duplicate, ${result.empty.length} empty, ` +
        `${result.placeholders.length} placeholder, ${result.nonStringValues.length} non-string ` +
        `(${result.declaredCount} declared of ${result.requiredCount} required).`,
    );
    lines.push(...problems);
  }
  return lines.join("\n");
}
