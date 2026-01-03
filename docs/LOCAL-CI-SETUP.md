# Local CI Setup Guide

## 🚀 Quick Start

### Run CI Locally

```bash
# Quick CI (skips cleanup and Lighthouse)
bun run ci:quick

# Full CI (includes Lighthouse performance analysis via npx)
bun run ci:full

# Default CI (same as quick)
bun run ci

# Run CI in Docker (CI-parity: Ubuntu + Ruby 3.3 + Node 20)
bun run ci:docker

# Full CI in Docker (includes Lighthouse --full builds)
bun run ci:docker:full
```

### Run Local Build (dev/prod) with Lighthouse

```bash
# Dev build (runs Lighthouse)
./scripts/local/build.sh --dev

# Prod build (runs Lighthouse)
./scripts/local/build.sh --prod

# Skip Lighthouse explicitly
./scripts/local/build.sh --dev --skip-lh
./scripts/local/build.sh --prod --skip-lh
```

## 📋 What Gets Tested

### Core Checks (Always Run)

- ✅ **ESLint** - Code linting
- ✅ **lintro** - Code formatting
- ✅ **TypeScript** - Type checking and compilation
- ✅ **Tests** - Unit tests with coverage
- ✅ **Theme Sync** - Deterministic theme generation
- ✅ **Jekyll Build** - Static site generation
- ✅ **HTMLProofer** - HTML validation

### Optional Checks

- 🧹 **Cleanup** - Clean build artifacts (skipped in quick mode)
- 📊 **Lighthouse** - Performance analysis
  - Included in `--full` builds and `ci:full` commands
  - Runs by default in `--dev` and `--prod` builds
  - Skipped in `--quick` mode and when `--skip-lh` is provided
- 🔒 **Security** - npm audit for vulnerabilities

## 🔧 Configuration Files

### Required Files

- `scripts/local/build.sh` - Main build and CI script
- `lighthouserc.json` - Lighthouse configuration
- `.husky/pre-commit` - Pre-commit hooks
- `package.json` - npm scripts and dependencies

### Dependencies Added

- `@catppuccin/palette` - Theme palette data
  - Note: Lighthouse CI is executed via `npx @lhci/cli@latest` and is not installed as a
    devDependency to avoid deprecated transitive packages.

## 🎯 Usage Patterns

### Before Committing

```bash
# Run quick checks
bun run ci:quick
```

### Before Pushing

```bash
# Run full CI pipeline
bun run ci:full
```

### Pre-commit Hooks

```bash
# Automatic checks on commit
git commit -m "your message"
# Hooks run: lint, format, theme:sync, build, test
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Theme Sync Failures

```bash
# Check if theme sync is deterministic
bun run theme:sync
git status --porcelain  # Should be empty
```

#### 2. Coverage Threshold Failures

```bash
# Check coverage
bun run test
# Generated files are excluded from coverage
```

#### 3. Lighthouse Failures

```bash
# Test Lighthouse locally
bunx @lhci/cli autorun --config=./lighthouserc.json
```

#### 4. Missing Dependencies

```bash
# Install all dependencies
bun install
bundle install
```

## 📊 CI vs Local Differences

### CI Environment

- Ubuntu 24.04
- Node.js 18/20/22
- Ruby 3.3/3.4
- GitHub Actions

### Local Environment

- Your OS
- Your Node.js version
- Your Ruby version
- Your shell

### Solution

Use Docker or GitHub Codespaces for exact CI environment matching.

```bash
# One-time: build the image
docker build -t turbo-themes-ci .

# Run quick CI inside Docker
bun run ci:docker
```

## 🔍 Debugging

### Check CI Status

```bash
# View recent CI runs
gh run list

# View specific run
gh run view <run-id>
```

### Local Debugging

```bash
# Run individual steps
bun run lint
bun run format
bun run theme:sync
bun run build
npm test
./scripts/local/build.sh --no-serve
```

## 📚 Additional Resources

- [CI Requirements Documentation](./CI-REQUIREMENTS.md)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [HTMLProofer Documentation](https://github.com/gjtorikian/html-proofer)

## 🎯 Best Practices

1. **Always run `bun run ci:quick` before committing**
2. **Run `bun run ci:full` before pushing**
3. **Keep CI and local scripts in sync**
4. **Document all CI dependencies**
5. **Use pre-commit hooks for basic checks**
6. **Test theme sync determinism**
7. **Monitor coverage thresholds**
8. **Keep Lighthouse performance scores high**
