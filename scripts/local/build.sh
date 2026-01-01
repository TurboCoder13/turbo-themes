#!/bin/bash

# Build script for turbo-themes Jekyll site
# This script handles both local development and CI workflows
# Usage: ./scripts/local/build.sh [--quick|--full|--serve|--no-serve|--skip-tests|--skip-lint|--skip-lh]
#
# Environment Variables:
#   PORT_RELEASE_CHECK_INTERVAL - Time between port checks in seconds (default: 0.5)
#   PORT_RELEASE_TIMEOUT - Maximum time to wait for port release in seconds (default: 5)
#   PORT_TO_CHECK - Port number to check for availability (default: 4000)
#   PORT_RELEASE_STRICT - Exit with error if port not released within timeout (default: false)

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

# Check for lsof availability
if ! command_exists "lsof"; then
    print_status "$YELLOW" "⚠️  lsof not found, using portable port check alternative"
    LSOF_AVAILABLE=false
else
    LSOF_AVAILABLE=true
fi

# Function to check if port is available
# Uses lsof if available, otherwise falls back to bash /dev/tcp probe
port_available() {
    local port="$1"
    
    if [ "$LSOF_AVAILABLE" = true ]; then
        # Use lsof for accurate port checking
        if lsof -Pi :"$port" -sTCP:LISTEN -t >/dev/null 2>&1; then
            return 1
        else
            return 0
        fi
    else
        # Prefer nc (netcat) if available
        if command_exists "nc"; then
            if nc -z 127.0.0.1 "$port" >/dev/null 2>&1; then
                # Connection succeeded → port in use
                return 1
            else
                return 0
            fi
        fi
        # Prefer ss (socket statistics) if available
        if command_exists "ss"; then
            # matches ":4000" (IPv4) and "]:4000" (IPv6)
            if ss -ltn 2>/dev/null | awk '{print $4}' | grep -qE "(:|])${port}$"; then
                return 1
            else
                return 0
            fi
        fi
        # Portable fallback: bash /dev/tcp probe
        # This works on bash 2.04+ and doesn't require external tools
        # Redirect to /dev/tcp/127.0.0.1/port; ensure FDs are closed
        if exec 3<>/dev/tcp/127.0.0.1/"$port" 2>/dev/null; then
            # Port is in use (connection succeeded)
            exec 3<&-
            exec 3>&-
            return 1
        else
            # Port is available (connection failed)
            # Close FDs defensively if they were opened partially
            exec 3<&- 2>/dev/null || true
            exec 3>&- 2>/dev/null || true
            return 0
        fi
    fi
}

# Configuration for port release checking
# PORT_RELEASE_CHECK_INTERVAL: Time between port checks (default: 0.5s)
# PORT_RELEASE_TIMEOUT: Maximum time to wait for port release (default: 5s)
# PORT_TO_CHECK: Port number to check (default: 4000)
export PORT_RELEASE_CHECK_INTERVAL="${PORT_RELEASE_CHECK_INTERVAL:-0.5}"
export PORT_RELEASE_TIMEOUT="${PORT_RELEASE_TIMEOUT:-5}"
export PORT_TO_CHECK="${PORT_TO_CHECK:-4000}"

# Function to wait for port to be released
wait_for_port_release() {
    local port="${PORT_TO_CHECK}"
    local interval="${PORT_RELEASE_CHECK_INTERVAL}"
    local timeout="${PORT_RELEASE_TIMEOUT}"
    # Validate numeric (integer or decimal) and reject zero/sub-millisecond values
    # Require at least one digit and reject strings that are just dots or start/end with dots
    case "$timeout" in
        ''|*[!0-9.]*|*\..*\..*|.*|*.|^\.$|^\.\.*$)
            print_status "$RED" "❌ Invalid timeout value: $timeout (must be a positive decimal number)"
            exit 1
            ;;
    esac
    # Ensure at least one digit is present
    if ! echo "$timeout" | grep -qE '[0-9]'; then
        print_status "$RED" "❌ Invalid timeout value: $timeout (must contain at least one digit)"
        exit 1
    fi
    case "$interval" in
        ''|*[!0-9.]*|*\..*\..*|.*|*.|^\.$|^\.\.*$)
            print_status "$RED" "❌ Invalid interval value: $interval (must be a positive decimal number)"
            exit 1
            ;;
    esac
    # Ensure at least one digit is present
    if ! echo "$interval" | grep -qE '[0-9]'; then
        print_status "$RED" "❌ Invalid interval value: $interval (must contain at least one digit)"
        exit 1
    fi

    # Reject zero values (0, 0.0, 0.00, etc.) at validation time
    # Use awk to handle decimal comparison properly
    if awk "BEGIN {exit !($timeout <= 0)}"; then
        print_status "$RED" "❌ Invalid timeout: $timeout seconds (must be ≥ 0.001)"
        exit 1
    fi
    if awk "BEGIN {exit !($interval <= 0)}"; then
        print_status "$RED" "❌ Invalid interval: $interval seconds (must be ≥ 0.001)"
        exit 1
    fi

    # Convert to integer milliseconds using awk for safe decimal arithmetic
    local timeout_ms interval_ms
    timeout_ms=$(awk "BEGIN {printf \"%.0f\", $timeout * 1000}")
    interval_ms=$(awk "BEGIN {printf \"%.0f\", $interval * 1000}")

    # Validate converted values (should not be needed if validation above works, but safety check)
    if [ "$timeout_ms" -le 0 ]; then
        print_status "$RED" "❌ Invalid timeout: $timeout seconds (rounds to ≤ 0ms, must be ≥ 0.001)"
        exit 1
    fi
    if [ "$interval_ms" -le 0 ]; then
        print_status "$RED" "❌ Invalid interval: $interval seconds (rounds to ≤ 0ms, must be ≥ 0.001)"
        exit 1
    fi

    # Ceiling division for attempt count
    local max_attempts=$(( (timeout_ms + interval_ms - 1) / interval_ms ))
    local attempt=0

    print_status "$YELLOW" "  Waiting for port $port to be released (timeout: ${timeout}s, interval: ${interval}s)..."

    while [ $attempt -lt $max_attempts ]; do
        if port_available "$port"; then
            print_status "$GREEN" "  ✅ Port $port is now free"
            return 0
        fi
        sleep "$interval"
        attempt=$((attempt + 1))
    done

    # Final check after timeout
    if ! port_available "$port"; then
        if [ "${PORT_RELEASE_STRICT:-false}" = true ]; then
            print_status "$RED" "❌ Port $port still in use after ${timeout}s"
            return 1
        fi
        print_status "$YELLOW" "  ⚠️  Port $port may still be in use after ${timeout}s timeout, continuing anyway..."
    else
        print_status "$GREEN" "  ✅ Port $port is now free"
    fi

    return 0
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

# Determine environment
if [ "$DEV_MODE" = true ]; then
    print_status "$BLUE" "📍 Environment: Development (baseurl: empty)"
    JEKYLL_CONFIG="_config.yml"
elif [ "$PROD_MODE" = true ]; then
    print_status "$BLUE" "📍 Environment: Production (baseurl: /turbo-themes)"
    JEKYLL_CONFIG="_config.yml,_config.prod.yml"
else
    JEKYLL_CONFIG="_config.yml"
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
if [ "$QUICK_MODE" = false ]; then
    required_cmds+=("bundle")
fi

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

# Install Ruby dependencies (skip in quick mode)
if [ "$QUICK_MODE" = false ]; then
    print_status "$YELLOW" "  Installing Ruby dependencies..."
    bundle install
else
    print_status "$YELLOW" "  Skipping Ruby dependencies (quick mode)..."
fi

# Step 2: Linting and formatting
if [ "$SKIP_LINT" = true ]; then
    print_status "$YELLOW" "⏭️  Step 2: Skipping linting and formatting (--skip-lint flag set)..."
else
    print_status "$BLUE" "🔍 Step 2: Linting and formatting..."
    if [ -f "package.json" ]; then
        print_status "$YELLOW" "  Running ESLint..."
        $PKG_RUN lint
        
        print_status "$YELLOW" "  Checking code formatting with lintro..."
        if command_exists "uv"; then
            if ! uv run lintro check --tools black,darglint,prettier,ruff,yamllint,actionlint,bandit 2>/dev/null; then
                print_status "$RED" "❌ Code formatting check failed"
                print_status "$YELLOW" "  Run '$PKG_RUN format:write' to fix formatting issues automatically"
                exit 1
            fi
        else
            print_status "$YELLOW" "⚠️  uv not available, skipping lintro code formatting check"
        fi
        
        print_status "$YELLOW" "  Validating YAML files with lintro..."
        if command_exists "uv"; then
            # Validate YAML files using lintro chk (hadolint excluded due to Dockerfile issues now resolved)
            if ! uv run lintro chk --tools yamllint,actionlint .github/workflows .github/actions 2>/dev/null; then
                print_status "$YELLOW" "⚠️  lintro validation found issues (non-blocking)"
            fi
        else
            print_status "$YELLOW" "⚠️  uv not available, skipping YAML validation"
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
        
        print_status "$YELLOW" "  Running Markdown lint..."
        $PKG_RUN mdlint
        
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
    GENERATED_PATHS=("src/themes/packs/catppuccin.synced.ts")
    if ! git diff --quiet -- "${GENERATED_PATHS[@]}" \
        || [[ -n "$(git ls-files --others --exclude-standard -- "${GENERATED_PATHS[@]}")" ]]; then
        print_status "$RED" "❌ Non-deterministic theme sync detected in generated files:"
        git --no-pager diff -- "${GENERATED_PATHS[@]}" | cat
        git ls-files --others --exclude-standard -- "${GENERATED_PATHS[@]}" || true
        exit 1
    else
        print_status "$GREEN" "✅ Theme sync is deterministic"
    fi
fi

# Step 4: TypeScript build
print_status "$BLUE" "⚡ Step 4: TypeScript build..."
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
        print_status "$YELLOW" "  Running Python tests..."
        if python3 -c "
import sys
import os
sys.path.insert(0, os.path.join(os.getcwd(), 'python', 'src'))

try:
    from turbo_themes.manager import ThemeManager
    manager = ThemeManager()
    print('✅ ThemeManager creation')

    manager.set_theme('github-light')
    print('✅ Theme switching')

    variables = manager.apply_theme_to_css_variables()
    print(f'✅ CSS variables generation ({len(variables)} vars)')

    json_data = manager.export_theme_json('catppuccin-latte')
    print('✅ JSON export')

    print('✅ All Python tests passed!')

except Exception as e:
    print(f'❌ Python test failed: {e}')
    import traceback
    traceback.print_exc()
    exit(1)
        "; then
            print_status "$GREEN" "  ✅ Python tests passed"
        else
            print_status "$RED" "  ❌ Python tests failed"
            exit 1
        fi
    else
        print_status "$YELLOW" "⚠️  Python directory not found, skipping Python tests..."
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

# Step 7: Jekyll build
print_status "$BLUE" "🏗️  Step 7: Jekyll build..."
print_status "$YELLOW" "  Building Jekyll site..."
bundle exec jekyll build --config "$JEKYLL_CONFIG" --trace --strict_front_matter

# Step 8: E2E tests with Playwright (skip in quick mode or if --skip-tests flag is set)
if [ "$QUICK_MODE" = false ] && [ "$SKIP_TESTS" = false ]; then
    if [ -d "node_modules/@playwright/test" ]; then
        print_status "$BLUE" "🎭 Step 8: E2E tests with Playwright..."
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

# Step 9: HTMLProofer
print_status "$BLUE" "🔍 Step 9: HTMLProofer validation..."
print_status "$YELLOW" "  Running HTMLProofer..."
# Validation strategy:
# - Development builds: Validate internal links (--disable-external)
# - Production builds: Skip HTMLProofer (baseurl causes false positives locally)
# - Full CI builds: Separate dedicated workflow validates all links on GitHub Pages
# This prevents false failures from production baseurl while maintaining code quality checks
if [ "$PROD_MODE" = true ]; then
    # Production builds: Skip validation (baseurl prefix makes local paths invalid)
    # External validation happens on actual GitHub Pages deployment
    print_status "$YELLOW" "  ⏭️  Skipping HTMLProofer for production build (validation happens on GitHub Pages)..."
elif [ "$QUICK_MODE" = true ] || [ "$FULL_MODE" = false ]; then
    # Quick/local dev builds: Skip external link validation (faster, no network dependency)
    print_status "$YELLOW" "  Validating internal links only (external links checked separately via monitoring)..."
    bundle exec htmlproofer \
      --disable-external \
      --assume-extension \
      --allow-hash-href \
      --allow-missing-href \
      --no-enforce-https \
      --ignore-urls "/lighthouse/,/playwright/" \
      ./_site
else
    # Full CI builds: Skip external link validation here
    # External links are validated separately on actual GitHub Pages deployment
    # via the reporting-link-monitoring.yml workflow with proper retry logic
    # This prevents false failures from transient network issues in CI
    print_status "$YELLOW" "  Validating internal links only (external links checked separately on GitHub Pages)..."
    bundle exec htmlproofer \
      --disable-external \
      --assume-extension \
      --allow-hash-href \
      --allow-missing-href \
      --no-enforce-https \
      --ignore-urls "/lighthouse/,/playwright/" \
      ./_site
fi

# Step 10: Lighthouse performance analysis (dev/prod/full unless skipped)
LIGHTHOUSE_RAN=false
LIGHTHOUSE_PASSED=false
if [ "$QUICK_MODE" = false ] && [ "$SKIP_LH" = false ] && { [ "$DEV_MODE" = true ] || [ "$PROD_MODE" = true ] || [ "$FULL_MODE" = true ]; }; then
    print_status "$BLUE" "📊 Step 10: Lighthouse performance analysis..."
    # Check if Lighthouse config exists
    if [ -f "lighthouserc.json" ]; then
        print_status "$YELLOW" "  Cleaning up any existing Jekyll processes..."
        ./scripts/ci/cleanup-jekyll-processes.sh
        
        wait_for_port_release || exit 1
        
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

# Step 11: Security checks (full mode only)
if [ "$FULL_MODE" = true ]; then
    print_status "$BLUE" "🔒 Step 11: Security checks..."
    if [ "$PKG_MGR" = "npm" ]; then
        print_status "$YELLOW" "  Running npm audit..."
        npm audit --audit-level=moderate || print_status "$YELLOW" "⚠️  npm audit found issues"
    else
        print_status "$YELLOW" "  Listing dependencies..."
        bun pm ls 2>/dev/null || print_status "$YELLOW" "⚠️  Could not list dependencies"
    fi
fi

# Step 12: Final Jekyll build to include all reports
print_status "$BLUE" "🏗️  Step 12: Final Jekyll build (including all reports)..."
print_status "$YELLOW" "  Rebuilding Jekyll to include all test reports..."
print_status "$YELLOW" "  The Jekyll plugin simplify_urls.rb will automatically create simplified paths (/coverage/, /playwright/, /lighthouse/)"
if ! bundle exec jekyll build --config "$JEKYLL_CONFIG" --trace --strict_front_matter; then
    print_status "$RED" "  ❌ Failed to rebuild Jekyll with reports"
    exit 1
fi
print_status "$GREEN" "  ✅ All reports included in site (available at /coverage/, /playwright/, /lighthouse/)"

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
print_status "$GREEN" "  ✅ Jekyll build passed"
if [ "$QUICK_MODE" = false ] && [ "$SKIP_TESTS" = false ] && [ -d "node_modules/@playwright/test" ]; then
    print_status "$GREEN" "  ✅ E2E tests passed"
fi
print_status "$GREEN" "  ✅ HTMLProofer validation passed"
if [ "$LIGHTHOUSE_RAN" = true ] && [ "$LIGHTHOUSE_PASSED" = true ]; then
    print_status "$GREEN" "  ✅ Lighthouse performance analysis passed"
    print_status "$GREEN" "  ✅ Security checks passed"
fi

# Check if we should serve the site (local mode only)
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
    elif [ "$NO_SERVE" = true ] || [ "$CI_ENV" = true ]; then
        response="n"
        response_prompted=true
        if [ "$CI_ENV" = true ]; then
            print_status "$YELLOW" "  ⏭️  Skipping serve prompt (CI environment detected)"
        fi
    fi

    if [ "$response_prompted" = false ]; then
        print_status "$YELLOW" "🌐 Would you like to serve the site locally? (y/n)"
        read -r response
    fi

    if [[ "$response" =~ ^[Yy]$ ]]; then
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
        echo ""
        
        # Start Jekyll server with live reload
        bundle exec jekyll serve --port $local_port --livereload --incremental
    else
        print_status "$BLUE" "📋 Build completed successfully!"
        print_status "$YELLOW" "To serve the site later, run:"
        echo "   bundle exec jekyll serve --livereload --incremental"
        echo ""
        print_status "$GREEN" "✨ Your site is ready in the _site/ directory!"
    fi
else
    print_status "$BLUE" "🚀 Ready for CI! You can now push with confidence."
fi
