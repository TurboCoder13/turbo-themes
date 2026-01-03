#!/bin/bash

# Quick serve script for turbo-themes Jekyll site
# This script serves the existing site without rebuilding.

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local color="$1"
    local message="$2"
    echo -e "${color}${message}${NC}"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if port is available
port_available() {
    local port="$1"
    ! lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1
}

print_status "$BLUE" "🚀 Quick serve for turbo-themes..."

# Check if Ruby/Bundler is available
if ! command_exists "bundle"; then
    print_status "$RED" "❌ bundle not found! Please install Ruby and Bundler first."
    exit 1
fi

# Always ensure a build exists; allow non-interactive via flags
auto_build=true
start_ts_watch=true

for arg in "$@"; do
  case "$arg" in
    --no-build)
      auto_build=false
      shift
      ;;
    --no-ts-watch)
      start_ts_watch=false
      shift
      ;;
  esac
done

if [ ! -d "_site" ]; then
  if [ "$auto_build" = true ]; then
    print_status "$BLUE" "🔨 Building site before serving..."
    bundle exec jekyll build
  else
    print_status "$RED" "❌ _site missing and --no-build set. Exiting."
    exit 1
  fi
fi

# Find an available port
local_port=4000
while ! port_available $local_port; do
    local_port=$((local_port + 1))
    if [ $local_port -gt 4010 ]; then
        print_status "$RED" "❌ No available ports found between 4000-4010"
        exit 1
    fi
done

print_status "$GREEN" "🚀 Starting Jekyll server on port $local_port..."
print_status "$BLUE" "📱 Site will be available at: http://localhost:$local_port"
print_status "$YELLOW" "💡 Press Ctrl+C to stop the server"
print_status "$BLUE" "🔄 Live reload is enabled - changes will auto-refresh"
echo ""

# Detect package manager for TypeScript watch
PKG_RUN=""
if command_exists "bun"; then
  PKG_RUN="bun run"
elif command_exists "npm"; then
  PKG_RUN="npm run"
fi

# Start Jekyll server with live reload and optional TypeScript watch in parallel
if [ "$start_ts_watch" = true ]; then
  if grep -q '"ts:watch"' package.json >/dev/null 2>&1; then
    if [ -n "$PKG_RUN" ]; then
      print_status "$BLUE" "⚡ Starting TypeScript watcher (tsc --watch)"
      ($PKG_RUN ts:watch >/dev/null 2>&1 &)
    else
      print_status "$YELLOW" "⚠️ Skipping TypeScript watcher: bun/npm not found"
    fi
  fi
fi
bundle exec jekyll serve --port $local_port --livereload --incremental
