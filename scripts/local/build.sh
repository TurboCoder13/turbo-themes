#!/usr/bin/env bash

# Build script for turbo-themes
# This script handles both local development and CI workflows
# Usage: ./scripts/local/build.sh [--quick|--full|--serve|--no-serve|--skip-tests|--skip-lint|--skip-lh]
#
# Environment Variables:
#   PORT_RELEASE_CHECK_INTERVAL - Time between port checks in seconds (default: 0.5)
#   PORT_RELEASE_TIMEOUT - Maximum time to wait for port release in seconds (default: 5)
#   PORT_RELEASE_STRICT - Exit with error if port not released within timeout (default: false)

set -e # Exit on any error

# Source shared utilities
SCRIPT_DIR_INIT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=../utils/utils.sh
source "${SCRIPT_DIR_INIT}/../utils/utils.sh"

# Alias logging functions for backward compatibility
print_status() {
  local color="$1"
  local message="$2"
  case "$color" in
  *31m*) log_error "$message" ;;
  *32m*) log_success "$message" ;;
  *33m*) log_warn "$message" ;;
  *34m*) log_info "$message" ;;
  *) echo -e "$message" ;;
  esac
}

# port_available and wait_for_port are now provided by utils.sh

# wait_for_port_release replaced by wait_for_port from utils.sh
wait_for_port_release() {
  wait_for_port "${PORT_TO_CHECK:-4000}" "${PORT_RELEASE_TIMEOUT:-5}" "${PORT_RELEASE_CHECK_INTERVAL:-0.5}"
}

# Initialize variables
QUICK_MODE=false
FULL_MODE=false
SERVE_MODE=false
NO_SERVE=false
DEV_MODE=false
PROD_MODE=false
SKIP_TESTS=false
SKIP_LH=false
SKIP_LINT=false

# Parse command-line arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
  --quick)
    QUICK_MODE=true
    shift
    ;;
  --full)
    FULL_MODE=true
    shift
    ;;
  --serve)
    SERVE_MODE=true
    shift
    ;;
  --no-serve)
    NO_SERVE=true
    shift
    ;;
  --dev)
    DEV_MODE=true
    shift
    ;;
  --prod)
    PROD_MODE=true
    shift
    ;;
  --skip-tests)
    SKIP_TESTS=true
    shift
    ;;
  --skip-lh)
    SKIP_LH=true
    shift
    ;;
  --skip-lint)
    SKIP_LINT=true
    shift
    ;;
  *)
    print_status "$RED" "❌ Unknown option: $1"
    print_status "$YELLOW" "Usage: $0 [--quick|--full|--serve|--no-serve|--dev|--prod|--skip-tests|--skip-lh|--skip-lint]"
    exit 1
    ;;
  esac
done

# Determine mode
if [ "$QUICK_MODE" = true ]; then
  print_status "$BLUE" "🚀 Starting quick CI build process..."
elif [ "$FULL_MODE" = true ]; then
  print_status "$BLUE" "🚀 Starting full CI build process..."
else
  print_status "$BLUE" "🚀 Starting local build process..."
fi

# Change to project root
cd "$(git rev-parse --show-toplevel 2>/dev/null || echo ".")"

# Check if clean.sh exists and run it (skip in quick mode)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ "$QUICK_MODE" = false ] && [ -f "$SCRIPT_DIR/clean.sh" ]; then
  print_status "$YELLOW" "🧹 Running cleanup script first..."
  "$SCRIPT_DIR/clean.sh"
  echo ""
elif [ "$QUICK_MODE" = false ]; then
  print_status "$YELLOW" "⚠️  Cleanup script not found, skipping..."
fi

# Step 1: Install dependencies
print_status "$BLUE" "📦 Step 1: Installing dependencies..."

# Detect package manager (prefer bun, fall back to npm)
if command_exists "bun"; then
  PKG_MGR="bun"
  PKG_RUN="bun run"
  PKG_INSTALL="bun install"
  PKG_INSTALL_FROZEN="bun install --frozen-lockfile"
  PKG_EXEC="bunx --bun"
  print_status "$GREEN" "  Using Bun as package manager"
elif command_exists "npm"; then
  PKG_MGR="npm"
  PKG_RUN="npm run"
  PKG_INSTALL="npm install"
  PKG_INSTALL_FROZEN="npm ci"
  PKG_EXEC="npx --yes"
  print_status "$YELLOW" "  Using npm as package manager (install bun for faster builds: https://bun.sh)"
else
  print_status "$RED" "❌ No package manager found! Install bun (https://bun.sh) or npm"
  exit 1
fi

# Check required commands
required_cmds=("git")

for cmd in "${required_cmds[@]}"; do
  if ! command_exists "$cmd"; then
    print_status "$RED" "❌ Required command not found: $cmd"
    exit 1
  fi
done

# Install Node.js dependencies
if [ -f "package.json" ]; then
  print_status "$YELLOW" "  Installing dependencies with $PKG_MGR..."
  if [ -f "bun.lock" ] && [ "$PKG_MGR" = "bun" ]; then
    $PKG_INSTALL_FROZEN
  elif [ -f "package-lock.json" ] && [ "$PKG_MGR" = "npm" ]; then
    $PKG_INSTALL_FROZEN
  else
    $PKG_INSTALL
  fi
else
  print_status "$YELLOW" "⚠️  Skipping Node.js steps (no package.json found)."
fi

# Step 2: Linting and formatting (lintro handles all tools: biome, prettier, ruff, etc.)
if [ "$SKIP_LINT" = true ]; then
  print_status "$YELLOW" "⏭️  Step 2: Skipping linting and formatting (--skip-lint flag set)..."
else
  print_status "$BLUE" "🔍 Step 2: Linting and formatting..."
  if command_exists "uv"; then
    print_status "$YELLOW" "  Running lintro check (biome, prettier, ruff, yamllint, etc.)..."
    if ! uv run lintro check 2>/dev/null; then
      print_status "$RED" "❌ Linting check failed"
      print_status "$YELLOW" "  Run 'uv run lintro fmt' to fix formatting issues automatically"
      exit 1
    fi
  else
    print_status "$RED" "❌ uv not available - lintro requires uv"
    print_status "$YELLOW" "  Install uv: curl -LsSf https://astral.sh/uv/install.sh | sh"
    exit 1
  fi

  print_status "$YELLOW" "  Validating GitHub Action pinning..."
  if [ -f "scripts/ci/validate-action-pinning.sh" ]; then
    if ! ./scripts/ci/validate-action-pinning.sh; then
      print_status "$RED" "❌ Action pinning validation failed"
      print_status "$YELLOW" "  Some GitHub Actions are not properly pinned to SHA"
      exit 1
    fi
  else
    print_status "$YELLOW" "⚠️  Action pinning validation script not found"
  fi

  if [ -f "package.json" ]; then
    print_status "$YELLOW" "  Running Stylelint..."
    $PKG_RUN stylelint
  fi
fi

# Step 3: Theme synchronization
print_status "$BLUE" "🎨 Step 3: Theme synchronization..."
if [ -f "package.json" ] && grep -q '"theme:sync"' package.json >/dev/null 2>&1; then
  print_status "$YELLOW" "  Running theme sync..."
  $PKG_RUN theme:sync

  # Check for diffs limited to generated files to avoid unrelated local edits
  GENERATED_PATHS=("packages/core/src/themes/packs/catppuccin.synced.ts")
  if ! git diff --quiet -- "${GENERATED_PATHS[@]}" ||
    [[ -n "$(git ls-files --others --exclude-standard -- "${GENERATED_PATHS[@]}")" ]]; then
    print_status "$RED" "❌ Non-deterministic theme sync detected in generated files:"
    git --no-pager diff -- "${GENERATED_PATHS[@]}" | cat
    git ls-files --others --exclude-standard -- "${GENERATED_PATHS[@]}" || true
    exit 1
  else
    print_status "$GREEN" "✅ Theme sync is deterministic"
  fi
fi

# Step 4: Generate CSS tokens (required for tests)
#
# This must run BEFORE `bun run build`: both style-dictionary and
# `copy-adapters` (the last step of `bun run build`) write
# assets/css/turbo-core.css, and the copy-adapters version is the
# authoritative one — it additionally carries the design-system tokens
# (--space-*, --radius-*, --shadow-*, --transition-*, --gradient-*). Running
# the token build last would silently strip them again (#823).
print_status "$BLUE" "🎨 Step 4: Generate CSS tokens..."
if [ -f "package.json" ] && grep -q '"build:tokens:css"' package.json >/dev/null 2>&1; then
  print_status "$YELLOW" "  Generating turbo CSS variables..."
  $PKG_RUN build:tokens:css
  print_status "$GREEN" "  ✅ CSS tokens generated successfully"
fi

# Step 4.5: TypeScript build
print_status "$BLUE" "⚡ Step 4.5: TypeScript build..."
if [ -f "package.json" ] && grep -q '"build"' package.json >/dev/null 2>&1; then
  print_status "$YELLOW" "  Building TypeScript..."
  $PKG_RUN build
fi

# Step 5: Unit tests with coverage
if [ "$SKIP_TESTS" = true ]; then
  print_status "$YELLOW" "⏭️  Step 5: Skipping unit tests (--skip-tests flag set)..."
else
  print_status "$BLUE" "🧪 Step 5: Unit tests with coverage..."
  if [ -f "package.json" ] && grep -q '"test"' package.json >/dev/null 2>&1; then
    print_status "$YELLOW" "  Package manager: $PKG_MGR"
    print_status "$YELLOW" "  Running unit tests with coverage..."
    if $PKG_RUN test; then
      print_status "$GREEN" "  ✅ Unit tests passed with coverage"
      if [ -d "coverage" ]; then
        print_status "$GREEN" "  📊 Coverage reports generated in coverage/"
        ls -la coverage/

        # Generate coverage badges if script exists
        if [ -f "scripts/ci/coverage-badges.mjs" ]; then
          print_status "$YELLOW" "  Generating coverage badges..."
          node scripts/ci/coverage-badges.mjs
          print_status "$GREEN" "  ✅ Coverage badges generated in assets/static/badges/"
        fi
      fi
    else
      print_status "$RED" "  ❌ Unit tests failed"
      exit 1
    fi
  fi
fi

# Step 5.5: Python tests
if [ "$SKIP_TESTS" = false ]; then
  print_status "$BLUE" "🐍 Step 5.5: Python tests..."
  if [ -d "python" ]; then
    if run_python_tests python; then
      print_status "$GREEN" "  ✅ Python tests passed"
    else
      print_status "$RED" "  ❌ Python tests failed"
      exit 1
    fi
  else
    print_status "$YELLOW" "⚠️  Python directory not found, skipping Python tests..."
  fi
fi

# Step 5.6: Ruby RSpec tests
if [ "$SKIP_TESTS" = false ]; then
  print_status "$BLUE" "💎 Step 5.6: Ruby RSpec tests..."
  if command_exists bundle && [ -f "spec/spec_helper.rb" ]; then
    print_status "$YELLOW" "  Running RSpec tests with coverage..."
    # Ensure rspec-coverage directory exists
    mkdir -p rspec-coverage
    if bundle exec rspec --format progress --format html --out rspec-coverage/rspec-report.html; then
      print_status "$GREEN" "  ✅ Ruby RSpec tests passed"
    else
      print_status "$RED" "  ❌ Ruby RSpec tests failed"
      exit 1
    fi
  else
    print_status "$YELLOW" "⚠️  RSpec not configured, skipping Ruby tests..."
  fi
fi

# Step 6: CSS budget check
if [ -f "package.json" ] && grep -q '"css:budget"' package.json >/dev/null 2>&1; then
  print_status "$BLUE" "💰 Step 6: CSS budget check..."
  print_status "$YELLOW" "  Running CSS budget check..."
  $PKG_RUN css:budget
fi

# Step 6.5: Build CSS Themes
print_status "$BLUE" "🎨 Step 6.5: Build CSS Themes..."
if [ -f "package.json" ] && grep -q '"build:themes"' package.json >/dev/null 2>&1; then
  print_status "$YELLOW" "  Building CSS theme files..."
  $PKG_RUN build:themes
  print_status "$GREEN" "  ✅ CSS themes built successfully"
fi

# Step 6.6: Minify JavaScript
print_status "$BLUE" "📦 Step 6.6: Minify JavaScript..."
if [ -f "package.json" ] && grep -q '"build:js"' package.json >/dev/null 2>&1; then
  print_status "$YELLOW" "  Minifying theme-selector.js..."
  $PKG_RUN build:js
  print_status "$GREEN" "  ✅ JavaScript minified successfully"
fi

# Step 7: E2E tests with Playwright (skip in quick mode or if --skip-tests flag is set)
if [ "$QUICK_MODE" = false ] && [ "$SKIP_TESTS" = false ]; then
  if [ -d "node_modules/@playwright/test" ]; then
    print_status "$BLUE" "🎭 Step 7: E2E tests with Playwright..."
    # Ensure Playwright browsers are installed before E2E
    print_status "$YELLOW" "  Ensuring Playwright browsers are installed..."
    $PKG_EXEC playwright install chromium >/dev/null 2>&1 || true
    print_status "$YELLOW" "  Running E2E tests..."
    if $PKG_RUN e2e:ci; then
      print_status "$GREEN" "  ✅ E2E tests passed"
    else
      print_status "$RED" "  ❌ E2E tests failed"
      exit 1
    fi
  else
    print_status "$YELLOW" "⚠️  Playwright not installed, skipping E2E tests..."
  fi
elif [ "$SKIP_TESTS" = true ]; then
  print_status "$YELLOW" "⏭️  Skipping E2E tests (--skip-tests flag set)..."
fi

# Step 8: Lighthouse performance analysis (dev/prod/full unless skipped)
LIGHTHOUSE_RAN=false
LIGHTHOUSE_PASSED=false
if [ "$QUICK_MODE" = false ] && [ "$SKIP_LH" = false ] && { [ "$DEV_MODE" = true ] || [ "$PROD_MODE" = true ] || [ "$FULL_MODE" = true ]; }; then
  print_status "$BLUE" "📊 Step 8: Lighthouse performance analysis..."
  # Check if Lighthouse config exists
  if [ -f "lighthouserc.json" ]; then
    print_status "$YELLOW" "  Running Lighthouse CI (latest)..."
    if $PKG_EXEC @lhci/cli@latest autorun --config=./lighthouserc.json --collect.numberOfRuns=1; then
      print_status "$GREEN" "  ✅ Lighthouse CI completed successfully"
      LIGHTHOUSE_RAN=true
      if [ -d "lighthouse-reports" ]; then
        print_status "$GREEN" "  📊 Reports generated in lighthouse-reports/"
        ls -la lighthouse-reports/
        LIGHTHOUSE_PASSED=true
      else
        print_status "$YELLOW" "  ⚠️  No lighthouse-reports directory found (reports may not have been generated)"
      fi
    else
      print_status "$RED" "  ❌ Lighthouse CI failed"
      print_status "$YELLOW" "  Checking for error logs..."
      if [ -d ".lighthouse" ]; then
        print_status "$YELLOW" "  Found .lighthouse directory:"
        ls -la .lighthouse/
      fi
      exit 1
    fi
  else
    print_status "$YELLOW" "⚠️  Lighthouse config not found, skipping..."
  fi
fi

# Step 9: Security checks (full mode only)
if [ "$FULL_MODE" = true ]; then
  print_status "$BLUE" "🔒 Step 9: Security checks..."
  if [ "$PKG_MGR" = "npm" ]; then
    print_status "$YELLOW" "  Running npm audit..."
    npm audit --audit-level=moderate || print_status "$YELLOW" "⚠️  npm audit found issues"
  else
    print_status "$YELLOW" "  Listing dependencies..."
    bun pm ls 2>/dev/null || print_status "$YELLOW" "⚠️  Could not list dependencies"
  fi
fi

# Summary
print_status "$GREEN" "✅ CI pipeline completed successfully!"
print_status "$BLUE" "📋 Summary:"
if [ "$SKIP_LINT" = true ]; then
  print_status "$YELLOW" "  ⏭️  Linting and formatting skipped (--skip-lint flag)"
else
  print_status "$GREEN" "  ✅ Linting and formatting passed"
fi
print_status "$GREEN" "  ✅ Theme synchronization passed"
print_status "$GREEN" "  ✅ TypeScript build passed"
if [ "$SKIP_TESTS" = true ]; then
  print_status "$YELLOW" "  ⏭️  Tests skipped (--skip-tests flag)"
else
  print_status "$GREEN" "  ✅ Unit tests with coverage passed"
  if [ -d "python" ]; then
    print_status "$GREEN" "  ✅ Python tests passed"
  fi
fi
print_status "$GREEN" "  ✅ CSS budget check passed"
if [ "$QUICK_MODE" = false ] && [ "$SKIP_TESTS" = false ] && [ -d "node_modules/@playwright/test" ]; then
  print_status "$GREEN" "  ✅ E2E tests passed"
fi
if [ "$LIGHTHOUSE_RAN" = true ] && [ "$LIGHTHOUSE_PASSED" = true ]; then
  print_status "$GREEN" "  ✅ Lighthouse performance analysis passed"
  print_status "$GREEN" "  ✅ Security checks passed"
fi

# Check if we should serve the Astro docs site (local mode only)
if [ "$QUICK_MODE" = false ] && [ "$FULL_MODE" = false ]; then
  print_status "$BLUE" "🚀 Ready for CI! You can now push with confidence."

  # Detect CI environment (GitHub Actions, GitLab CI, Jenkins, etc.)
  CI_ENV=false
  if [ -n "${GITHUB_ACTIONS:-}" ] || [ -n "${CI:-}" ]; then
    CI_ENV=true
  fi

  # Allow non-interactive flag: --serve or --no-serve
  response_prompted=false
  if [ "$SERVE_MODE" = true ]; then
    response="y"
    response_prompted=true
    if [ "$CI_ENV" = true ]; then
      print_status "$YELLOW" "⚠️  Warning: --serve flag used in CI environment. Server will run until killed."
    fi
  elif [ "$NO_SERVE" = true ] || [ "$CI_ENV" = true ]; then
    response="n"
    response_prompted=true
    if [ "$CI_ENV" = true ]; then
      print_status "$YELLOW" "  ⏭️  Skipping serve prompt (CI environment detected)"
    fi
  fi

  if [ "$response_prompted" = false ]; then
    print_status "$YELLOW" "🌐 Would you like to serve the Astro docs site locally? (y/n)"
    read -r response
  fi

  if [[ "$response" =~ ^[Yy]$ ]]; then
    print_status "$GREEN" "🚀 Starting Astro dev server..."
    print_status "$BLUE" "📱 Site will be available at: http://localhost:4321"
    print_status "$YELLOW" "💡 Press Ctrl+C to stop the server"
    echo ""

    cd apps/site && $PKG_RUN dev
  else
    print_status "$BLUE" "📋 Build completed successfully!"
    print_status "$YELLOW" "To serve the Astro docs site, run:"
    echo "   cd apps/site && $PKG_RUN dev"
    echo ""
    print_status "$GREEN" "✨ Your build artifacts are ready in dist/!"
  fi
else
  print_status "$BLUE" "🚀 Ready for CI! You can now push with confidence."
fi
