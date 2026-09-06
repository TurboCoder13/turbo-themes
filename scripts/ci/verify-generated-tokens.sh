#!/usr/bin/env bash
# SPDX-License-Identifier: MIT
# Purpose: Verify generated tokens (CSS, Python, Swift) are committed
#
# Usage: ./verify-generated-tokens.sh
#
# This script checks that auto-generated token files have no uncommitted changes.
# Used in CI to ensure developers commit generated files after running build:tokens.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/../utils/utils.sh"

# Token paths to check (generated files from Style Dictionary)
TOKEN_PATHS=(
  # Style Dictionary outputs
  'assets/css/turbo-core.css'
  'assets/scss/_tokens.scss'
  'packages/core/src/themes/generated/tokens.js'
  'python/src/turbo_themes/generated/tokens.py'
  'swift/Sources/TurboThemes/Generated/Tokens.swift'
  # Copied tokens.json files
  'packages/core/src/themes/tokens.json'
  'python/src/turbo_themes/tokens.json'
  'swift/Sources/TurboThemes/Resources/tokens.json'
  # Lightweight theme catalog (picker metadata only)
  'packages/core/src/catalog/catalog.json'
  # Theme metadata maps (generate-metadata.mjs)
  'packages/core/src/themes/generated/metadata.ts'
  'packages/theme-selector/src/generated/theme-maps.ts'
  # Theme registry files (manually maintained but derived from tokens.json)
  # These are checked to ensure consistency when tokens.json changes
  'python/src/turbo_themes/themes.py'
  'swift/Sources/TurboThemes/ThemeLoader.swift'
  # Site-native theme contract (#944, generated from the CSS generator)
  'packages/core/src/native-theme/generated/native-contract.json'
  # Generated TypeScript sources (bun run generate:types:ts)
  'packages/core/src/themes/theme-ids.ts'
  'packages/core/src/themes/generated-types.ts'
  # Committed IIFE selector bundles (bun run build:js:dev / build:js:prod)
  'assets/js/theme-selector.js'
  'assets/js/theme-selector.js.map'
  'assets/js/theme-selector.min.js'
)

main() {
  log_info "Verifying generated tokens are committed..."

  # Debug: show overall git status for CI logs (not used in logic)
  git status --porcelain

  # Check only token-related paths (compare against HEAD to catch staged changes too)
  local has_changes=false
  for path in "${TOKEN_PATHS[@]}"; do
    if ! git diff --quiet --exit-code HEAD -- "$path" 2>/dev/null; then
      has_changes=true
      break
    fi
  done

  if [[ "$has_changes" == "false" ]]; then
    log_success "All generated tokens are committed"
    exit 0
  else
    log_error "Generated tokens have uncommitted changes"
    echo ""
    log_info "Changed files:"
    for path in "${TOKEN_PATHS[@]}"; do
      if ! git diff --quiet --exit-code HEAD -- "$path" 2>/dev/null; then
        echo "--- $path ---"
        git diff HEAD -- "$path"
      fi
    done
    echo ""
    log_error "Please run 'bun run build:tokens' and commit the changes"
    exit 1
  fi
}

main "$@"
