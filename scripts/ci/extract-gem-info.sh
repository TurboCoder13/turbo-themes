#!/usr/bin/env bash
set -euo pipefail

# Extract gem information and output to GitHub Actions
# Outputs: name, version, path

GEM_FILE=$(find . -maxdepth 1 -name "turbo-themes-*.gem" -type f | head -1)

if [ -z "$GEM_FILE" ]; then
  echo "❌ No gem file found"
  exit 1
fi

GEM_NAME=$(basename "$GEM_FILE")
VERSION=$(echo "$GEM_NAME" | sed -n 's/turbo-themes-\(.*\)\.gem/\1/p')

if [ -z "$VERSION" ]; then
  echo "❌ Failed to extract version from gem file: $GEM_NAME"
  exit 1
fi

{
  echo "name=$GEM_NAME"
  echo "version=$VERSION"
  echo "path=$GEM_FILE"
} >> "$GITHUB_OUTPUT"

echo "📦 Gem: $GEM_NAME"
echo "🏷️  Version: $VERSION"

