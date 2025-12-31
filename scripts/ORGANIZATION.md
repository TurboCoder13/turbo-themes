# Scripts Organization

This document describes the organization of scripts in the `turbo-themes` project and
provides guidelines for adding new scripts.

## Directory Structure

```
scripts/
├── ci/           # Continuous Integration scripts (run in GitHub Actions)
├── local/        # Local development scripts (run by developers)
├── utils/        # Shared utility scripts (used by both ci/ and local/)
└── ORGANIZATION.md  # This file
```

## SOLID Principles Applied to Scripts

We follow SOLID principles to maintain clean, maintainable scripts:

### 1. Single Responsibility Principle (SRP)

Each script should have one clear purpose.

**✅ Good:**

- `ci/generate-sbom.sh` - Only generates SBOM
- `ci/validate-links.sh` - Only validates links
- `utils/log.sh` - Only provides logging functions

**❌ Bad:**

- `do-everything.sh` - Builds, tests, deploys, and sends notifications

### 2. Open/Closed Principle (OCP)

Scripts should be open for extension but closed for modification.

**✅ Good:**

- Use environment variables for configuration
- Accept command-line arguments for behavior changes
- Source utility functions rather than duplicating code

```bash
# Example: Configurable through env vars
DEBUG=${DEBUG:-false}
ENVIRONMENT=${ENVIRONMENT:-development}
```

### 3. Liskov Substitution Principle (LSP)

Scripts with similar purposes should be interchangeable.

**✅ Good:**

- All CI scripts return 0 on success, non-zero on failure
- All validation scripts output results in consistent format

### 4. Interface Segregation Principle (ISP)

Scripts should not depend on things they don't use.

**✅ Good:**

- Break large scripts into smaller, focused utilities
- Only source the utility functions you need

### 5. Dependency Inversion Principle (DIP)

Scripts should depend on abstractions (utilities), not concrete implementations.

**✅ Good:**

```bash
# Depend on utility abstraction
source "$(dirname "$0")/../utils/log.sh"
log_info "Starting process"
```

**❌ Bad:**

```bash
# Direct implementation
echo "[INFO] Starting process"  # Duplicated everywhere
```

## Script Categories

### CI Scripts (`ci/`)

Scripts that run in GitHub Actions workflows.

**Characteristics:**

- Non-interactive (no user input)
- Exit with proper status codes (0 = success, non-zero = failure)
- Produce clear, parsable output
- Fast execution (avoid long-running operations)
- Well-documented with comments

**Examples:**

- `generate-sbom.sh` - Generate Software Bill of Materials
- `validate-action-pinning.sh` - Ensure all actions use SHA pins

**Template:**

```bash
#!/usr/bin/env bash
set -euo pipefail  # Exit on error, undefined variables, pipe failures

# Script description and usage
# Usage: ./script-name.sh [options]

# Source utilities
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/../utils/log.sh"

# Main logic
main() {
    log_info "Starting CI task"

    # Your code here

    log_success "CI task completed"
}

# Run main
main "$@"
```

### Local Scripts (`local/`)

Scripts for local development.

**Characteristics:**

- May be interactive (prompt for user input)
- Helpful error messages and guidance
- Can modify local environment
- May have longer execution times

**Examples:**

- `setup-dev.sh` - Set up local development environment
- `run-tests.sh` - Run tests locally with options
- `clean-artifacts.sh` - Clean up build artifacts

**Template:**

```bash
#!/usr/bin/env bash
set -euo pipefail

# Script description
# Usage: ./script-name.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/../utils/log.sh"

main() {
    log_info "Starting local task"

    # Check prerequisites
    if ! command -v node >/dev/null 2>&1; then
        log_error "Node.js is required but not installed"
        exit 1
    fi

    # Your code here

    log_success "Local task completed"
}

main "$@"
```

### Utility Scripts (`utils/`)

Shared functions and utilities.

**Characteristics:**

- Designed to be sourced, not executed directly
- Pure functions (no side effects where possible)
- Well-documented with examples
- Tested and reliable

**Examples:**

- `log.sh` - Logging functions with color output
- `validation.sh` - Common validation functions
- `git-utils.sh` - Git-related helper functions

**Template:**

```bash
#!/usr/bin/env bash
# Utility functions for [purpose]
# Source this file: source utils/example.sh

# Function description
# Arguments:
#   $1 - First argument description
# Returns:
#   0 on success, 1 on failure
# Example:
#   my_function "value"
my_function() {
    local arg1="${1:-}"

    # Implementation

    return 0
}
```

## Guidelines for Adding New Scripts

### 1. Choose the Correct Directory

- **CI tasks** → `ci/`
- **Developer tasks** → `local/`
- **Shared functions** → `utils/`

### 2. Follow Naming Conventions

- Use kebab-case: `generate-sbom.sh`, `validate-links.sh`
- Be descriptive: `check-node-version.sh` not `check.sh`
- Use verbs: `build-`, `test-`, `deploy-`, `validate-`

### 3. Script Structure

Every script should have:

1. **Shebang**: `#!/usr/bin/env bash`
2. **Error handling**: `set -euo pipefail`
3. **Header comment**: Purpose, usage, author
4. **Imports**: Source utilities needed
5. **Functions**: Break logic into functions
6. **Main function**: Entry point
7. **Execution**: `main "$@"`

### 4. Documentation

Include in script header:

```bash
#!/usr/bin/env bash
#
# Script Name: generate-sbom.sh
# Description: Generates Software Bill of Materials in multiple formats
# Usage: ./generate-sbom.sh [--format json|xml|both]
# Dependencies: syft
# Author: Turbo Coder
# Date: 2025-10-05
#
```

### 5. Error Handling

```bash
# Always use set -euo pipefail
set -euo pipefail

# Check prerequisites
if ! command -v required-tool >/dev/null 2>&1; then
    echo "Error: required-tool is not installed" >&2
    exit 1
fi

# Use trap for cleanup
cleanup() {
    rm -f /tmp/tempfile
}
trap cleanup EXIT
```

### 6. Logging

Use utility logging functions:

```bash
source "$(dirname "$0")/../utils/log.sh"

log_info "Informational message"
log_success "Success message"
log_warning "Warning message"
log_error "Error message"
```

### 7. Configuration

Prefer environment variables over hardcoded values:

```bash
# Good: Configurable with defaults
OUTPUT_DIR="${OUTPUT_DIR:-./output}"
VERBOSE="${VERBOSE:-false}"

# Usage: OUTPUT_DIR=/tmp VERBOSE=true ./script.sh
```

### 8. Exit Codes

Use meaningful exit codes:

- `0` - Success
- `1` - General error
- `2` - Misuse (invalid arguments)
- `126` - Command cannot execute
- `127` - Command not found

## Testing Scripts

Test scripts before committing:

```bash
# Test with shellcheck
shellcheck scripts/ci/*.sh

# Test execution
bash -n script.sh  # Syntax check
./script.sh        # Actual run
```

## Common Patterns

### Parsing Arguments

```bash
parse_args() {
    while [[ $# -gt 0 ]]; do
        case $1 in
            --verbose|-v)
                VERBOSE=true
                shift
                ;;
            --output|-o)
                OUTPUT_DIR="$2"
                shift 2
                ;;
            --help|-h)
                show_usage
                exit 0
                ;;
            *)
                echo "Unknown option: $1" >&2
                show_usage
                exit 2
                ;;
        esac
    done
}
```

### Checking Prerequisites

```bash
check_prerequisites() {
    local missing=()

    for cmd in node npm git; do
        if ! command -v "$cmd" >/dev/null 2>&1; then
            missing+=("$cmd")
        fi
    done

    if [ ${#missing[@]} -gt 0 ]; then
        log_error "Missing required commands: ${missing[*]}"
        return 1
    fi

    return 0
}
```

### Safe Temporary Files

```bash
create_temp_file() {
    local temp_file
    temp_file=$(mktemp) || {
        log_error "Failed to create temp file"
        return 1
    }
    echo "$temp_file"
}

# Usage with cleanup
temp_file=$(create_temp_file)
trap "rm -f '$temp_file'" EXIT
```

## Resources

- [Google Shell Style Guide](https://google.github.io/styleguide/shellguide.html)
- [Bash Best Practices](https://bertvv.github.io/cheat-sheets/Bash.html)
- [ShellCheck](https://www.shellcheck.net/) - Shell script analyzer

## Questions?

If you have questions about script organization or need help creating a new script,
please:

1. Check existing scripts for patterns
2. Review this documentation
3. Ask in GitHub Discussions
4. Open an issue with the `question` label
