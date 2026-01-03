# Workflows Overview

GitHub Actions workflows for quality checks, deployment, security, and maintenance.

## Naming Convention

Following py-lintro standards:

- **File names:** `category-specific-action.yml` (e.g., `quality-ci-main.yml`,
  `security-codeql.yml`)
- **Workflow names:** `Category - Specific Action` format
- **Job names:** Descriptive with emojis (e.g., `🏗️ Build & Quality Checks`)

## Categories

### Quality Check

- `quality-ci-main.yml` - Main CI pipeline with build, test, linting (CSS/JS/MD), and
  quality gates
- `quality-theme-sync.yml` - Theme synchronization determinism check
- `quality-semantic-pr-title.yml` - PR title validation (Conventional Commits)
- `quality-validate-action-pinning.yml` - SHA pinning compliance check

### Security

- `security-codeql.yml` - CodeQL security analysis
- `security-dependency-review.yml` - Dependency vulnerability scanning
- `security-sbom.yml` - Software Bill of Materials generation
- `security-scorecards.yml` - OpenSSF Scorecard analysis

### Deploy

- `deploy-pages.yml` - GitHub Pages deployment

### Publish

- `publish-npm-on-tag.yml` - npm package publishing on version tags

### Reporting

- `reporting-lighthouse-ci.yml` - Lighthouse performance analysis

### Maintenance

- `maintenance-renovate.yml` - Automated dependency updates

## 📋 Workflow Index

### 🔒 Security Workflows

| Workflow                | Purpose                                                                              | Trigger                   |
| ----------------------- | ------------------------------------------------------------------------------------ | ------------------------- |
| `codeql.yml`            | **Security - CodeQL Code Scanning**<br/>Static analysis for security vulnerabilities | Push (main), PR, Schedule |
| `dependency-review.yml` | **Security - Dependency Review**<br/>Review dependency changes in PRs                | Pull Request              |
| `scorecards.yml`        | **Security - OpenSSF Scorecard Analysis**<br/>Security best practices assessment     | Schedule (weekly), Manual |
| `sbom.yml`              | **Security - SBOM Generation**<br/>Generate Software Bill of Materials               | Push (main), PR, Manual   |

### ✅ Quality Check Workflows

| Workflow                      | Purpose                                                                                 | Trigger                    |
| ----------------------------- | --------------------------------------------------------------------------------------- | -------------------------- |
| `ci.yml`                      | **Quality Check - CI Pipeline**<br/>Main CI: lint, format, test, build, coverage        | Push (main), PR            |
| `semantic-pr-title.yml`       | **Quality Check - PR Title Validation**<br/>Enforce Conventional Commits format         | Pull Request               |
| `theme-sync.yml`              | **Quality Check - Theme Sync Determinism**<br/>Verify theme generation is deterministic | PR (theme files), Schedule |
| `validate-action-pinning.yml` | **Quality Check - Action Pinning Validation**<br/>Enforce SHA pinning for security      | PR (workflow files)        |

### 📊 Reporting Workflows

| Workflow         | Purpose                                                                        | Trigger         |
| ---------------- | ------------------------------------------------------------------------------ | --------------- |
| `lighthouse.yml` | **Reporting - Lighthouse CI**<br/>Web performance, accessibility, SEO analysis | Push (main), PR |

### 🚀 Deploy Workflows

| Workflow    | Purpose                                                   | Trigger     |
| ----------- | --------------------------------------------------------- | ----------- |
| `pages.yml` | **Deploy - GitHub Pages**<br/>Deploy site to GitHub Pages | Push (main) |

### 📦 Publish Workflows

| Workflow             | Purpose                                                          | Trigger            |
| -------------------- | ---------------------------------------------------------------- | ------------------ |
| `publish-on-tag.yml` | **Publish - npm Production**<br/>Publish package to npm registry | Tag push (v*.*.\*) |

### 🔧 Maintenance Workflows

| Workflow       | Purpose                                                                  | Trigger                  |
| -------------- | ------------------------------------------------------------------------ | ------------------------ |
| `renovate.yml` | **Maintenance - Renovate Dependencies**<br/>Automated dependency updates | Schedule (daily), Manual |

## 🎯 Workflow Naming Convention

All workflows follow the pattern: `Category - Specific Purpose`

### Categories

- **Security** - Security scanning, vulnerability detection, SBOM
- **Quality Check** - Linting, formatting, validation, testing
- **Testing** - Test suites, coverage reporting
- **Build** - Compilation, bundling, building
- **Deploy** - Deployment to environments
- **Publish** - Publishing to registries
- **Maintenance** - Dependency updates, cleanup, automation
- **Reporting** - Analytics, metrics, reports
- **Release** - Version management, releases

## 🔄 Common Patterns

### Environment Setup

Most workflows use the `setup-env` composite action:

```yaml
- name: Setup environment
  uses: ./.github/actions/setup-env
  with:
    node-version: '22'
    ruby-version: '3.4.7'
```

### Permissions

All workflows follow the principle of least privilege:

```yaml
permissions:
  contents: read # Default
  # Add more only as needed
```

### Concurrency

Workflows use concurrency groups to prevent redundant runs:

```yaml
concurrency:
  group: workflow-name-${{ github.ref }}
  cancel-in-progress: true
```

### Timeouts

All jobs have explicit timeouts:

```yaml
jobs:
  job-name:
    timeout-minutes: 30
```

## 📚 Workflow Details

### Main CI Pipeline (`ci.yml`)

**Full Quality Gate:**

1. Lint code (ESLint)
2. Check formatting (lintro)
3. Lint markdown files
4. Build TypeScript
5. Run tests with coverage
6. Generate coverage badges
7. Check CSS budget
8. Build Jekyll site
9. Run HTMLProofer
10. Generate SBOM

**Matrix Testing:** Node 20/22 × Ruby 3.3/3.4

### Renovate (`renovate.yml`)

**Auto-merge Rules:**

- Patch updates for npm packages
- GitHub Actions with digest pinning

**Schedule:** Daily at 22:00 UTC

### Pages Deployment (`pages.yml`)

**Process:**

1. Build Jekyll site
2. Upload artifact
3. Deploy to GitHub Pages

**Environment:** `github-pages`

### npm Publishing (`publish-on-tag.yml`)

**Process:**

1. Checkout code
2. Setup Node.js
3. Install dependencies
4. Run build
5. Run tests
6. Publish to npm with provenance

**Trigger:** Tag matching `v*.*.*`

## 🛠️ Composite Actions

Reusable actions in `.github/actions/`:

- **setup-env** - Node + Ruby setup with caching
- **post-pr-comment** - PR comment management

See [Actions README](../actions/README.md) for details.

## 🔐 Security Features

### Action Pinning

All actions are pinned to SHA for security. Validated by `validate-action-pinning.yml`.

### Harden Runner

Some workflows use `step-security/harden-runner` for network egress control.

### Minimal Permissions

All workflows follow least-privilege principle.

## 📖 Best Practices

### Adding New Workflows

1. **Name:** Follow `Category - Specific Purpose` pattern
2. **Permissions:** Start with `contents: read`, add only what's needed
3. **Timeout:** Always set `timeout-minutes`
4. **Composite Actions:** Use existing actions to reduce duplication
5. **Documentation:** Update this README

### Workflow File Structure

```yaml
---
name: Category - Specific Purpose

on:
  push:
    branches: [main]
  pull_request:

permissions:
  contents: read

concurrency:
  group: workflow-${{ github.ref }}
  cancel-in-progress: true

jobs:
  job-name:
    name: 🎯 Descriptive Job Name
    runs-on: ubuntu-24.04
    timeout-minutes: 30
    steps:
      - uses: actions/checkout@<sha>
      - uses: ./.github/actions/setup-env
      # ... more steps
```

## 🔗 Related Documentation

- [Composite Actions README](../actions/README.md)
- [Scripts README](../../scripts/README.md)
- [CONTRIBUTING.md](../../CONTRIBUTING.md)
- [SECURITY.md](../../SECURITY.md)

## 📞 Support

For questions about workflows:

1. Review this README
2. Check inline comments in workflow files
3. Review composite action documentation
4. Create an issue for clarification

---

**Last Updated:** 2025-10-05  
**Maintained by:** @eiteldagnin  
**Workflow Count:** 10
