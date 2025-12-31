#!/usr/bin/env bash
# SPDX-License-Identifier: MIT
# Purpose: Run CI pipeline inside Docker to mirror GitHub Actions env
#
# Usage: ci-docker.sh [--full]
#   --full  Run full pipeline (includes Lighthouse)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

FULL_MODE=false
for arg in "$@"; do
  case "$arg" in
    --full)
      FULL_MODE=true
      ;;
    *)
      ;;
  esac
done

cd "$REPO_ROOT"

IMAGE_NAME="turbo-themes-ci"

echo "[+] Building Docker image $IMAGE_NAME..."
docker build -t "$IMAGE_NAME" .

echo "[+] Running CI pipeline inside container..."
if [ "$FULL_MODE" = true ]; then
  docker run --rm \
    -e CI=1 \
    -v "$REPO_ROOT":"/work" \
    -w /work \
    "$IMAGE_NAME" \
    /bin/bash -lc "./scripts/local/build.sh --full --no-serve"
else
  docker run --rm \
    -e CI=1 \
    -v "$REPO_ROOT":"/work" \
    -w /work \
    "$IMAGE_NAME" \
    /bin/bash -lc "./scripts/local/build.sh --quick --no-serve"
fi

echo "[✓] CI pipeline completed in Docker"


