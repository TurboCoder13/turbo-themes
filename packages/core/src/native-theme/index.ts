// SPDX-License-Identifier: MIT
/**
 * Site-native theme tooling (#944): validate a consumer-maintained theme
 * file against the token contract derived from the CSS generator.
 */

export {
  REQUIRED_NATIVE_TOKENS,
  OPTIONAL_NATIVE_TOKENS,
  parseNativeThemeCss,
  validateNativeThemeCss,
  validateNativeThemeTokens,
  formatNativeThemeValidation,
  type NativeThemeValidation,
} from './validator.js';
export {
  assertNativeTheme,
  assertNativeThemeTokens,
  NativeThemeValidationError,
} from './assert.js';
export { runCli } from './cli.js';
