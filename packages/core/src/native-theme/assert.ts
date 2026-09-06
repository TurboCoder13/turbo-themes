// SPDX-License-Identifier: MIT
/**
 * Assertion helpers for site-native theme files (#944).
 *
 * Drop this into a consuming repo's CI/test suite to gate a native theme
 * file against the token contract:
 *
 * ```ts
 * import { assertNativeTheme } from '@lgtm-hq/turbo-themes/native-theme';
 * import { readFileSync } from 'node:fs';
 *
 * assertNativeTheme(readFileSync('src/styles/my-theme.css', 'utf8'), 'my-theme');
 * ```
 */

import {
  formatNativeThemeValidation,
  validateNativeThemeCss,
  validateNativeThemeTokens,
  type NativeThemeValidation,
} from './validator.js';

export class NativeThemeValidationError extends Error {
  constructor(readonly validation: NativeThemeValidation, message: string) {
    super(message);
    this.name = 'NativeThemeValidationError';
  }
}

/**
 * Assert a native theme given as CSS source; throws with a full report when
 * the theme does not satisfy the contract.
 */
export function assertNativeTheme(css: string, source = 'native theme'): NativeThemeValidation {
  const result = validateNativeThemeCss(css);
  if (!result.valid) {
    throw new NativeThemeValidationError(result, formatNativeThemeValidation(result, source));
  }
  return result;
}

/**
 * Assert a native theme given as a token map (`--turbo-x` → value).
 */
export function assertNativeThemeTokens(
  tokens: Record<string, string>,
  source = 'native theme',
): NativeThemeValidation {
  const result = validateNativeThemeTokens(tokens);
  if (!result.valid) {
    throw new NativeThemeValidationError(result, formatNativeThemeValidation(result, source));
  }
  return result;
}
