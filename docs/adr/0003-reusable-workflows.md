# 3. Adopt Reusable GitHub Actions Workflows

Date: 2025-10-05

## Status

Accepted

## Context

As the project grew, we accumulated multiple GitHub Actions workflows with significant
duplication:

- Quality checks repeated in multiple workflows
- Build steps duplicated across CI and publish workflows
- SBOM generation copied in several places
- Inconsistent implementations of the same logic
- Difficult to maintain and update

This duplication led to:

- **Maintenance Burden** - Changes required updates in multiple files
- **Inconsistency** - Same task implemented differently
- **Error Prone** - Easy to miss updates in one workflow
- **Poor DRY** - Violates "Don't Repeat Yourself" principle
- **Slower Onboarding** - New contributors confused by duplication

We need a solution that:

- Eliminates workflow duplication
- Ensures consistency across workflows
- Simplifies maintenance
- Allows composition of common tasks
- Maintains clarity and readability

Alternatives considered:

1. **Composite Actions** - Good for steps, but not full jobs with multiple steps
2. **Reusable Workflows** - Perfect for complete job workflows
3. **Workflow Templates** - Manual, doesn't prevent drift
4. **Monolithic Workflows** - Hard to maintain, not modular
5. **External CI System** - Too much migration effort

## Decision

We will adopt Reusable GitHub Actions Workflows for common tasks.

Create three reusable workflows:

1. **reusable-quality.yml** - Linting, formatting, type checking
2. **reusable-build.yml** - TypeScript + Jekyll build, tests
3. **reusable-sbom.yml** - SBOM generation and signing

Caller workflows:

- `quality-ci-main.yml` - Can call reusables for specific matrix combinations
- `publish-npm-on-tag.yml` - Calls all three for quality gates
- `publish-npm-test.yml` - Calls all three for test publish
- `release-semantic-release.yml` - Calls all three before release
- `security-sbom.yml` - Calls reusable-sbom directly

Design principles:

- **Single Responsibility** - Each reusable workflow has one clear purpose
- **Parameterization** - Accept inputs for flexibility (Node/Ruby versions)
- **Artifact Sharing** - Upload artifacts for downstream jobs
- **Self-Contained** - Include all necessary steps
- **Documentation** - Clear header explaining purpose and usage

## Consequences

### Positive

- **DRY Compliance** - Single source of truth for common tasks
- **Consistency** - Same logic everywhere
- **Easier Maintenance** - Update once, applies everywhere
- **Faster Development** - New workflows compose existing reusables
- **Better Testing** - Reusables can be tested independently
- **Clearer Intent** - Caller workflows show high-level structure
- **Versioning** - Can pin reusable workflow versions
- **Reduced Duplication** - ~60% reduction in workflow YAML

### Negative

- **Indirection** - Caller workflows less self-contained
- **Debugging Complexity** - Need to trace through multiple files
- **Limited Flexibility** - Reusables must accommodate all use cases
- **Git History** - Changes span multiple files
- **Learning Curve** - Team needs to understand reusable workflow syntax

### Neutral

- **File Organization** - Separate files for reusables
- **Permission Management** - Permissions declared in both places
- **Documentation** - Need to document how reusables work
- **Migration Effort** - One-time cost to refactor existing workflows

## References

- [GitHub Reusable Workflows Documentation](https://docs.github.com/en/actions/using-workflows/reusing-workflows)
- [Workflow Best Practices](https://docs.github.com/en/actions/learn-github-actions/best-practices-for-using-github-actions)
- [DRY Principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)

## Notes

### Reusable Workflow Structure

Each reusable workflow follows this pattern:

```yaml
name: Reusable - [Purpose]
on:
  workflow_call:
    inputs:
      # Optional parameters with defaults

permissions:
  # Minimal required permissions

jobs:
  [job-name]:
    name: [Descriptive Name]
    runs-on: ubuntu-24.04
    timeout-minutes: [reasonable-timeout]
    steps:
      # Self-contained steps
```

### Calling Reusable Workflows

Caller workflows use this syntax:

```yaml
jobs:
  quality:
    name: Quality Gate
    uses: ./.github/workflows/reusable-quality.yml
    permissions:
      contents: read
```

### Parameters

Reusable workflows accept parameters for flexibility:

```yaml
# reusable-build.yml
inputs:
  node-version:
    type: string
    default: '22'
  ruby-version:
    type: string
    default: '3.3'
```

### Artifact Passing

Workflows pass data via artifacts:

```yaml
# Reusable workflow uploads
- name: Upload artifact
  uses: actions/upload-artifact@...
  with:
    name: build-output
    path: dist/

# Caller downloads
- name: Download artifact
  uses: actions/download-artifact@...
  with:
    name: build-output
```

### Implementation Notes

1. **reusable-quality.yml**
   - Runs ESLint, lintro (formatting), TypeScript type checking
   - Validates with stylelint and markdownlint (when configured)
   - Fast execution (~5 minutes)
   - No artifacts produced

2. **reusable-build.yml**
   - Builds TypeScript package
   - Builds Jekyll site
   - Runs tests with coverage
   - Uploads build artifacts and coverage
   - Moderate execution (~15 minutes)

3. **reusable-sbom.yml**
   - Generates SBOM in multiple formats
   - Signs SBOMs with Sigstore
   - Verifies signatures
   - Uploads signed SBOMs
   - Moderate execution (~10 minutes)

### Migration Strategy

1. Create reusable workflows
2. Update one caller at a time
3. Verify each caller works
4. Remove duplicated workflow code
5. Document changes

### Future Enhancements

Potential additional reusables:

- `reusable-deploy.yml` - Deployment logic
- `reusable-security.yml` - Security scans
- `reusable-performance.yml` - Performance tests
