#!/usr/bin/env bash
set -euo pipefail

# Generate publish summary for GitHub Actions
# Args: $1 - version, $2 - gem name

if [ $# -ne 2 ]; then
  echo "Usage: $0 <version> <gem-name>"
  exit 1
fi

VERSION="$1"
GEM_NAME="$2"

{
  echo "## 📦 Gem Published Successfully"
  echo ""
  echo "✅ Published to RubyGems: https://rubygems.org/gems/$GEM_NAME"
  echo ""
  echo "| Property | Value |"
  echo "|----------|-------|"
  echo "| **Version** | \`$VERSION\` |"
  echo "| **Package** | \`$GEM_NAME\` |"
  echo ""
  echo "🎉 Release complete!"
} >> "$GITHUB_STEP_SUMMARY"

