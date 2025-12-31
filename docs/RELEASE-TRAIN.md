# Release Train Documentation

This document describes the complete release train process for turbo-themes, ensuring
consistent and automated releases.

## 🚂 Release Train Flow

The release train now follows a two-stage PR-based process:

1. **Semantic PR Title** → 2. **Commit Message** → 3. **Version PR** → 4. **Publish PR**
   → 5. **Release**

### 1-2. Semantic PR Title & Commit Message Validation

**Workflows:** `quality-semantic-pr-title.yml`, `quality-ci-main.yml`

**Purpose:** Ensures PR titles follow Conventional Commits format

**Allowed Types:**

- `chore` - Maintenance tasks
- `ci` - CI/CD changes
- `docs` - Documentation updates
- `feat` - New features
- `fix` - Bug fixes
- `perf` - Performance improvements
- `refactor` - Code refactoring
- `revert` - Revert previous changes
- `style` - Code style changes
- `test` - Test updates

**Format:** `type(scope): description`

**Examples:**

- ✅ `feat: add dark mode theme`
- ✅ `fix(auth): resolve login issue`
- ✅ `docs: update installation guide`
- ❌ `Add new feature` (missing type)
- ❌ `feat add dark mode` (missing colon)

**Validation Process:**

1. Extracts commit messages between base branch and PR head
2. Validates each commit against Conventional Commits pattern
3. Ensures consistency with PR title validation rules
4. Reports validation results in CI logs

**Script:** `scripts/ci/validate-commit-messages.sh`

### 3. Version PR Creation

**Workflow:** `release-version-pr.yml` **Trigger:** Push to `main` branch OR manual
trigger (workflow_dispatch)

**Purpose:** Creates a version bump PR for review before tag creation

**Process:**

1. **PR Creation** - Creates a PR with:
   - Updated `package.json` version
   - Updated `package-lock.json`
   - Generated/updated `CHANGELOG.md`

**Requirements:**

- PR requires manual approval before merge
- Conventional commit rules apply (same as step 2)

**Quality Assurance:**

- Skips quality gates and build checks (already validated in PR before merge to main)
- Uses **trust-and-skip pattern**: Protected main branch ensures code quality
- Focuses on version management and changelog generation

**Example Workflow:**

```
main branch push
     ↓
Analyze commits for version bump
     ↓
Create version PR (e.g., v0.3.0)
     ↓
Review & Approve
     ↓
Merge version PR → creates git tag v0.3.0
```

**Configuration:** `.releaserc.json` (used in dry-run mode only)

### 4. Publish PR & Publishing

**Workflows:** `release-publish-pr.yml` **Trigger:** Tag push (`v*.*.*`) OR manual
trigger (workflow_dispatch)

**Purpose:** Publishes package to npm and creates GitHub release

**Process:**

1. **SBOM Generation** - Creates and signs Software Bill of Materials
2. **npm Publish** - Publishes to npm registry with provenance
3. **GitHub Release** - Creates GitHub release with SBOM artifacts

**Quality Assurance:**

- Skips redundant quality gates and build checks
- Uses **trust-and-skip pattern**: Code already validated in PR workflow
- Focuses on publishing and release artifact generation
- Fresh build performed for npm publish ensures package integrity

**Requirements:**

- `NPM_TOKEN` secret must be valid
- npm account must have publish permissions for `@turbocoder13/turbo-themes`
- 2FA must be set to "Authorization only" level

### 4.5 Auto Tag Creation

**Workflow:** `release-auto-tag.yml` **Trigger:** Push to main with package.json
changes, Manual (workflow_dispatch)

**Purpose:** Automatically creates git tag after version PR merge

**Process:**

1. Detects package.json version change
2. Checks if tag already exists
3. Creates and pushes tag (e.g., v1.2.3)
4. Triggers publish workflow

**Optimization:**

- Skips all quality gates (trust-and-skip pattern)
- Tag creation completes in < 2 minutes (was 15-20 minutes before optimization)
- Uses protected main branch as quality assurance

**Manual Override:**

Available via workflow_dispatch for emergency tag creation:

- `version` - Version to tag (e.g., v1.2.3)
- `prerelease` - Mark as pre-release

**Use case:** Automatically triggered by version PR merge; manual trigger available for
emergencies

## 🚀 CI/CD Optimization Strategy

### Trust-and-Skip Pattern

The release train implements the **trust-and-skip pattern**, an industry best practice
for CI/CD optimization:

**Philosophy:**

- **Comprehensive validation on PRs** - All quality gates, tests, and builds run before
  merge
- **Protected main branch** - Only validated code reaches main
- **Skip redundant checks in release workflows** - Trust PR validation results
- **Focus release workflows** - Dedicated to versioning and publishing tasks

**Benefits:**

- ⚡ **60% faster release workflows** - Eliminated duplicate linting, testing, and
  building
- 💰 **Reduced CI costs** - Fewer compute minutes per release
- 🎯 **Clearer separation of concerns** - PR validation vs. release automation
- 🔒 **Maintained quality** - No reduction in testing coverage

**What Runs Where:**

| Check Type       | PR Workflow | Version PR Workflow | Publish Workflow   |
| ---------------- | ----------- | ------------------- | ------------------ |
| Linting          | ✅          | ❌ (skip)           | ❌ (skip)          |
| Unit Tests       | ✅          | ❌ (skip)           | ❌ (skip)          |
| E2E Tests        | ✅          | ❌ (skip)           | ❌ (skip)          |
| Lighthouse       | ✅          | ❌ (skip)           | ❌ (skip)          |
| TypeScript Build | ✅          | ❌ (skip)           | ✅ (fresh for npm) |
| SBOM Generation  | ✅          | ❌ (skip)           | ✅ (for release)   |

### Separate Test Workflows

Tests are separated into independent workflows for better parallelization:

1. **`quality-ci-main.yml`** - Linting, unit tests, and builds
2. **`quality-e2e.yml`** - End-to-end Playwright tests (3 variants: full, smoke, a11y)
3. **`reporting-lighthouse-ci.yml`** - Performance, accessibility, and SEO analysis

Each workflow runs independently on PRs and main branch, enabling:

- Faster feedback (parallel execution)
- Easier debugging (isolated test failures)
- Selective reruns (only rerun failed workflow)

## 🔄 Workflow Execution Strategy

### Parallel Execution on Main

When code merges to main, multiple workflows trigger simultaneously:

- `quality-ci-main.yml` - Validation
- `quality-e2e.yml` - E2E tests
- `reporting-lighthouse-ci.yml` - Performance analysis
- `release-version-pr.yml` - Version PR creation (if needed)

**This is by design:**

- ✅ Parallel execution is faster than sequential
- ✅ Each workflow has different purpose
- ✅ Isolated failures (one failing doesn't block others)
- ✅ CI resources handle parallelization efficiently

### Sequential Execution in Release Train

After version PR is merged:

1. `release-auto-tag.yml` - Creates tag (< 2 minutes)
2. `release-publish-pr.yml` - Publishes (triggered by tag)
3. `deploy-pages.yml` - Deploys site (after CI completes)

**This is sequential by necessity:**

- Tag must exist before publishing
- Package must be published before announcing
- Fresh build ensures package matches tagged code exactly

## 🔧 Configuration Files

### `.github/workflows/quality-semantic-pr-title.yml`

PR title validation using `TurboCoder13/py-lintro` action

### `.github/workflows/quality-ci-main.yml`

Main CI pipeline with commit validation and release trigger verification

### `.github/workflows/release-version-pr.yml`

Creates the version bump PR after `main` changes pass the quality and build gates.

### `.github/workflows/release-auto-tag.yml`

Creates a git tag (for example, `v0.4.0`) from the approved version PR when
`package.json` changes are merged to `main`.

### `.github/workflows/release-publish-pr.yml`

Tag-triggered publish workflow that re-runs quality and build checks, generates SBOMs,
publishes to npm, and creates the GitHub release.

### `.github/workflows/publish-npm-test.yml`

Manual publish workflow for pushing test/beta builds to npm under a non-`latest`
dist-tag (for example, `beta`).

## 📋 Release Types

### Major Release (`v2.0.0`)

Triggered by:

- `BREAKING CHANGE:` in commit message
- `feat!:` with breaking change description

### Minor Release (`v1.2.0`)

Triggered by:

- `feat:` commits

### Patch Release (`v1.1.1`)

Triggered by:

- `fix:` commits
- `perf:` commits
- `refactor:` commits
- `revert:` commits
- `build:` commits

### No Release

These commit types do not trigger releases:

- `docs:` - Documentation updates
- `style:` - Code style changes
- `test:` - Test updates
- `ci:` - CI/CD changes
- `chore:` - Maintenance tasks

## 🚨 Validation Failures

### PR Title Validation Failure

- PR cannot be merged
- Comment posted explaining the issue
- Must fix title to continue

### Commit Message Validation Failure

- CI pipeline fails
- Must fix commit messages
- Use `git rebase -i` to amend commit messages

### Release Trigger Verification

- Informational only
- Shows whether commits will trigger a release
- Does not block PR merging

## 🔍 Troubleshooting

### Commit Messages Don't Match PR Title

1. Ensure commit messages follow same format as PR title
2. Use `git rebase -i` to amend commit messages
3. Force push to update PR

### Release Not Triggered

1. Check commit types against release rules
2. Ensure commits are on `main` branch
3. Verify the version PR and auto-tag workflows ran successfully:
   - `release-version-pr.yml` created a version PR
   - `release-auto-tag.yml` created a `v*.*.*` tag after the version PR was merged

### Tag Created But No Release

1. Check `release-publish-pr.yml` workflow (for tagged releases) or
   `publish-npm-test.yml` (for manual test publishes)
2. Verify npm token permissions and that `NPM_TOKEN` is configured in repository secrets
3. Check that the GitHub release job completed and attached SBOM artifacts correctly

## 📚 Best Practices

### For Contributors

1. **Use Conventional Commits** - Follow the format strictly
2. **Match PR Title to Commits** - Ensure consistency
3. **Test Locally** - Run `bun run ci:quick` before pushing
4. **Review Release Impact** - Understand what your changes will trigger
5. **Run E2E Tests When Touching UI/Theme Logic** - Use `bun run e2e:ci` (no retries by
   default) to catch flakes locally instead of relying on CI.

### For Maintainers

1. **Monitor Release Workflows** - Ensure they run successfully
2. **Review SBOM Signatures** - Verify security artifacts
3. **Check npm Publishing** - Verify package availability
4. **Update Documentation** - Keep this guide current
5. **Watch for E2E Failures** - Playwright runs in CI with retries disabled; any failure
   (including flaky tests) will fail the workflow and should be investigated before
   releasing.

## 🔗 Related Documentation

- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines
- [CI-REQUIREMENTS.md](../docs/CI-REQUIREMENTS.md) - CI pipeline details
- [LOCAL-CI-SETUP.md](../docs/LOCAL-CI-SETUP.md) - Local development setup
- [Workflows README](../.github/workflows/README.md) - Workflow documentation
- [E2E TESTING](../docs/E2E-TESTING.md) - End-to-end testing and flakiness policy
