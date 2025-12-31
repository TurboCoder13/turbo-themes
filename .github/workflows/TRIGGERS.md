# Workflow Triggers Documentation

This document provides a comprehensive overview of all GitHub Actions workflows in
turbo-themes, their triggers, and purposes.

## Trigger Matrix

| Workflow                        | Push (main) | Push (tags) | Pull Request | Schedule  | Manual | workflow_run |
| ------------------------------- | ----------- | ----------- | ------------ | --------- | ------ | ------------ |
| quality-ci-main                 | ✅          |             | ✅           |           |        |              |
| reusable-quality                |             |             |              |           |        | Called       |
| reusable-build                  |             |             |              |           |        | Called       |
| reusable-sbom                   |             |             |              |           |        | Called       |
| reporting-lighthouse-ci         | ✅          |             | ✅           |           |        |              |
| security-codeql                 | ✅          |             | ✅           | ✅ Weekly |        |              |
| security-dependency-review      |             |             | ✅           |           |        |              |
| security-sbom                   | ✅          |             | ✅           |           | ✅     |              |
| security-scorecards             | ✅          |             |              |           |        |              |
| quality-theme-sync              | ✅          |             | ✅           |           |        |              |
| quality-semantic-pr-title       |             |             | ✅           |           |        |              |
| quality-validate-action-pinning | ✅          |             | ✅           |           |        |              |
| deploy-pages                    |             |             |              |           | ✅     | ✅           |
| release-version-pr              | ✅          |             |              |           | ✅     |              |
| release-publish-pr              |             | ✅ v*.*.\*  |              |           | ✅     |              |
| publish-npm-test                |             |             |              |           | ✅     |              |
| release-auto-tag                |             |             |              |           | ✅     |              |
| maintenance-renovate            |             |             |              | ✅ Daily  |        |              |
| maintenance-auto-bump-refs      |             |             |              | ✅ Weekly |        |              |

## Workflow Categories

### Quality & Testing

#### quality-ci-main.yml

**Triggers:** Push to main, Pull requests  
**Purpose:** Main CI pipeline with build, test, lint, coverage

**When it runs:**

- Every push to `main` branch
- Every pull request (open, sync, reopen)

**What it does:**

- Matrix builds across Node 20/22 and Ruby 3.3/3.4
- Runs linters (ESLint, lintro, Markdown, Stylelint)
- Executes tests with coverage
- Builds TypeScript and Jekyll site
- Validates HTML
- Uploads coverage to Codecov
- Posts coverage comment on PRs

#### reusable-quality.yml

**Triggers:** Called by other workflows  
**Purpose:** Reusable quality checks (lint, format, typecheck)

#### reusable-build.yml

**Triggers:** Called by other workflows  
**Purpose:** Reusable build workflow (TypeScript + Jekyll)

#### quality-semantic-pr-title.yml

**Triggers:** Pull requests  
**Purpose:** Validates PR titles follow Conventional Commits

#### quality-theme-sync.yml

**Triggers:** Push to main, Pull requests  
**Purpose:** Validates theme files are in sync

#### quality-validate-action-pinning.yml

**Triggers:** Push to main, Pull requests  
**Purpose:** Ensures all GitHub Actions use SHA pinning

### Security

#### security-codeql.yml

**Triggers:** Push to main, Pull requests, Weekly schedule  
**Purpose:** CodeQL security analysis

**Schedule:** Every Sunday at 00:00 UTC

#### security-dependency-review.yml

**Triggers:** Pull requests  
**Purpose:** Reviews dependencies for security vulnerabilities

#### security-sbom.yml

**Triggers:** Push to main, Pull requests, Manual  
**Purpose:** Generates and signs SBOM files

#### security-scorecards.yml

**Triggers:** Push to main  
**Purpose:** OpenSSF Scorecard security analysis

#### reusable-sbom.yml

**Triggers:** Called by other workflows  
**Purpose:** Reusable SBOM generation with signing

### Deployment

#### deploy-pages.yml

**Triggers:** workflow_run (after Quality Check - CI Pipeline), Manual
(workflow_dispatch)  
**Purpose:** Deploys Jekyll site to GitHub Pages with test reports

**What it does:**

- Builds Jekyll site with production configuration (no E2E tests)
- Downloads test report artifacts from all 3 test workflows:
  - Coverage reports from `Quality Check - CI Pipeline`
  - Playwright reports from `Quality Check - E2E Tests`
  - Lighthouse reports from `Reporting - Lighthouse CI`
- Merges reports into site before deployment
- Deploys complete site to GitHub Pages

**Dependencies:** Waits for test workflows to complete, then downloads their artifacts

### Publishing & Releases

#### release-version-pr.yml

**Triggers:** Push to main, Manual (workflow_dispatch) **Purpose:** Create a version
bump PR with CHANGELOG updates

**What it does:**

- Triggered automatically on every push to main (or manually via workflow_dispatch)
- Analyzes conventional commits since last tag to determine version bump
- Checks if a version PR already exists (avoids duplicates)
- Creates a PR with:
  - Updated package.json version
  - Generated/updated CHANGELOG.md with categorized changes
  - Detailed PR description with commit analysis

**Optimization:** Skips quality gates and build checks (trust-and-skip pattern)

**Conventional Commits Analysis:**

- `feat:` → minor version bump
- `fix:` → patch version bump
- `BREAKING CHANGE` → major version bump
- `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `chore:` → patch version bump

**Use case:** Creates version bump PR for review and approval before tag creation

#### release-auto-tag.yml

**Triggers:** Push to main (package.json changes), Manual (workflow_dispatch)
**Purpose:** Automatically create release tags after version PR merge

**What it does:**

- Triggered after version PR is merged to main
- Checks if current package.json version tag exists
- Creates and pushes git tag (e.g., v1.2.3) if missing
- Triggers release-publish-pr workflow for npm publishing

**Optimization:** Skips all quality gates (trust-and-skip pattern) **Speed:** Tag
creation completes in < 2 minutes (was 15-20 minutes before optimization)

**Use case:** Completes the release automation pipeline; manual trigger available for
emergencies

#### release-publish-pr.yml

**Triggers:** Push tags matching `v*.*.*`, Manual (workflow_dispatch) **Purpose:**
Publish to npm and create GitHub release

**What it does:**

- Triggered when a version tag is created
- Generates and signs SBOM (Software Bill of Materials)
- Performs fresh build for npm publishing
- Publishes to npm with provenance attestation
- Creates GitHub release with signed SBOM artifacts:
  - CycloneDX JSON/XML (with signatures)
  - SPDX JSON (with signature)

**Optimization:** Skips redundant quality gates (trust-and-skip pattern) **Fresh
Build:** Ensures published package matches exact tagged code

**Requirements:**

- NPM_TOKEN secret must be configured (with "Authorization only" 2FA level)
- Valid npm credentials for @turbocoder13/turbo-themes

**Example:** Tag `v1.2.3` triggers full publish and release

#### publish-npm-test.yml

**Triggers:** Manual (workflow_dispatch) **Purpose:** Test npm publish with custom
dist-tag

**Inputs:**

- `tag` - npm dist-tag (e.g., beta, next, canary)

**Optimization:** Skips quality and build jobs (trust-and-skip pattern), keeps SBOM for
publish testing

**Use case:** Testing publish process with pre-release tags

### Maintenance

#### maintenance-renovate.yml

**Triggers:** Daily schedule  
**Purpose:** Renovate Bot configuration validation

**Schedule:** Every day at 02:00 UTC

#### maintenance-auto-bump-refs.yml

**Triggers:** Weekly schedule  
**Purpose:** Auto-updates action SHA references

**Schedule:** Every Monday at 03:00 UTC

### Reporting

#### reporting-lighthouse-ci.yml

**Triggers:** Push to main, Pull requests  
**Purpose:** Performance analysis with Lighthouse

**What it does:**

- Builds full site
- Runs Lighthouse CI analysis
- Posts results comment on PRs
- Uploads reports as artifacts

## Workflow Dependencies

### Release Train (Sequential)

```
version PR merged → main
  ↓
release-auto-tag.yml (creates tag)
  ↓ (tag push triggers)
release-publish-pr.yml (publishes to npm)
  └── reusable-sbom (only dependency)
```

### PR Validation (Parallel)

```
PR opened/updated
  ↓ (all run in parallel)
  ├── quality-ci-main.yml
  ├── quality-e2e.yml
  ├── reporting-lighthouse-ci.yml
  └── quality-semantic-pr-title.yml
```

### Main Branch Validation (Parallel)

```
Merge to main
  ↓ (all run in parallel)
  ├── quality-ci-main.yml
  ├── quality-e2e.yml
  ├── reporting-lighthouse-ci.yml
  └── release-version-pr.yml (if release-worthy commits)
```

### Optimized Workflows (Trust-and-Skip)

- `release-version-pr.yml` - No dependencies
- `release-auto-tag.yml` - No dependencies
- `release-publish-pr.yml` - Only SBOM
- `publish-npm-test.yml` - Only SBOM

### Pages Deployment

```
quality-ci-main, quality-e2e, reporting-lighthouse-ci
  └── deploy-pages (via workflow_run, downloads artifacts from all 3)
```

**Note:** Release workflows use the **trust-and-skip pattern** to avoid duplicate
quality checks. All validation happens in PR workflows before code reaches main.

## Manual Workflows

These workflows can only be triggered manually via GitHub UI or API:

1. **publish-npm-test** - Test npm publish
2. **release-auto-tag** - Create version tag
3. **security-sbom** - Generate SBOM (also auto-triggers)

To trigger manually:

1. Go to Actions tab
2. Select workflow
3. Click "Run workflow"
4. Fill in inputs (if any)
5. Click "Run workflow" button

## Concurrency Groups

Workflows use concurrency groups to prevent multiple runs:

- `ci-${{ github.ref }}` - CI pipeline per branch
- `lighthouse-${{ github.ref }}` - Lighthouse per branch
- `sbom-${{ github.ref }}` - SBOM generation per branch
- `pages-coverage` - Coverage deployment (no concurrency)
- `publish-${{ github.ref }}` - Publish per tag
- `semantic-release` - One semantic release at a time

**cancel-in-progress:** Most workflows cancel in-progress runs when new commits arrive,
except:

- Publishing workflows (never cancel)
- Release workflows (never cancel)

## Timeouts

All workflows have explicit timeouts to prevent hanging:

- Quality checks: 45 minutes (matrix builds)
- Build workflows: 20 minutes
- SBOM generation: 15 minutes
- Lighthouse: 20 minutes
- Publish: 20 minutes
- Maintenance: 10 minutes

## Adding New Workflows

When creating a new workflow:

1. Choose appropriate triggers
2. Add to this documentation
3. Set explicit timeouts
4. Define concurrency group
5. Use reusable workflows where possible
6. Add harden-runner for security
7. Pin actions to SHA
8. Document in workflow file header

## Questions?

For questions about workflows:

- Check workflow file headers for detailed documentation
- Review `.github/workflows/README.md`
- See `.github/workflows/EGRESS-POLICIES.md` for security
- Open an issue with the `ci` label
