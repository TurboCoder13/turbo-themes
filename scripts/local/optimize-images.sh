#!/bin/bash

# SPDX-License-Identifier: MIT
# Image optimization script for turbo-themes
# This script optimizes PNG images for better Lighthouse performance
# Requires: ImageMagick (convert command), libwebp

set -euo pipefail

IMAGES_DIR="assets/img"
TEMP_DIR=$(mktemp -d)

cleanup() {
  rm -rf "$TEMP_DIR"
}
trap cleanup EXIT

if ! command -v convert &> /dev/null; then
  echo "Error: ImageMagick is required. Please install it with: brew install imagemagick"
  exit 1
fi

if ! command -v cwebp &> /dev/null; then
  echo "Warning: cwebp (libwebp) not found. WebP conversion will be skipped."
  echo "Install with: brew install webp"
fi

echo "🖼️  Starting image optimization..."

# Optimize catppuccin-logo-macchiato.png (1544x1544 is too large for 28x28 display)
if [ -f "$IMAGES_DIR/catppuccin-logo-macchiato.png" ]; then
  echo "📉 Resizing catppuccin-logo-macchiato.png to 256x256..."
  convert "$IMAGES_DIR/catppuccin-logo-macchiato.png" \
    -resize 256x256 \
    -quality 85 \
    "$IMAGES_DIR/catppuccin-logo-macchiato.png"
  echo "✅ Resized successfully"
fi

# Optimize dracula logo (512x512 is also oversized)
if [ -f "$IMAGES_DIR/dracula-logo.png" ]; then
  echo "📉 Resizing dracula-logo.png to 256x256..."
  convert "$IMAGES_DIR/dracula-logo.png" \
    -resize 256x256 \
    -quality 85 \
    "$IMAGES_DIR/dracula-logo.png"
  echo "✅ Resized successfully"
fi

# Optimize github logos
for img in "$IMAGES_DIR/github-logo-light.png" "$IMAGES_DIR/github-logo-dark.png"; do
  if [ -f "$img" ]; then
    echo "📉 Optimizing $(basename "$img")..."
    convert "$img" \
      -quality 85 \
      "$img"
    echo "✅ Optimized successfully"
  fi
done

# Convert to WebP if cwebp is available
if command -v cwebp &> /dev/null; then
  echo "🔄 Converting PNG files to WebP format..."
  for png in "$IMAGES_DIR"/*.png; do
    if [ -f "$png" ]; then
      webp="${png%.png}.webp"
      echo "Converting $(basename "$png") to WebP..."
      cwebp -q 85 "$png" -o "$webp"
    fi
  done
  echo "✅ WebP conversion complete"
fi

echo "📊 Image optimization complete!"
echo "File sizes before and after optimization:"
ls -lh "$IMAGES_DIR"/*.png

if command -v cwebp &> /dev/null; then
  echo ""
  echo "WebP file sizes:"
  ls -lh "$IMAGES_DIR"/*.webp 2>/dev/null || echo "No WebP files generated"
fi
