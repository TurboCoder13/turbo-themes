#!/usr/bin/env bash
# SPDX-License-Identifier: MIT
# Purpose: Generate Linux snapshots for Playwright E2E tests in Docker
#
# This script runs tests in Docker (Linux environment) and updates the Linux snapshots
# via a volume mount, making them directly accessible on the host machine.
#
# Usage: ./scripts/local/generate-linux-snapshots.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

cd "$REPO_ROOT"

IMAGE_NAME="turbo-themes-ci"
CONTAINER_WORK_DIR="/work"

DOCKERFILE_PATH="$REPO_ROOT/Dockerfile"
LOG_FILE="/tmp/snapshot-generation.log"

if [ ! -f "$DOCKERFILE_PATH" ]; then
  echo "❌ Error: Dockerfile not found at $DOCKERFILE_PATH" >&2
  echo "   Please ensure the Dockerfile exists in the repository root." >&2
  exit 1
fi

echo "🐳 Building Docker image for snapshot generation..."
docker build -t "$IMAGE_NAME" .

echo "🧪 Running Playwright visual tests in Docker to generate Linux snapshots..."
if ! docker run --rm \
  -v "$REPO_ROOT:$CONTAINER_WORK_DIR" \
  -w "$CONTAINER_WORK_DIR" \
  "$IMAGE_NAME" \
  /bin/bash -c "npx playwright test --grep @visual --update-snapshots" > "$LOG_FILE" 2>&1; then
  echo '❌ Playwright test failed. Output:'
  cat "$LOG_FILE"
  exit 1
fi

echo "✅ Linux snapshots have been generated in Docker and updated in $REPO_ROOT/e2e/homepage-theme-snapshots/linux/"
echo ""
echo "📋 Next steps:"
echo "  1. Review the snapshot changes"
echo "  2. Commit the updates with: git add e2e/homepage-theme-snapshots/ && git commit -m 'test: update linux e2e snapshots'"
echo "  3. Push to your branch"

