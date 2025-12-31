# Composite Actions

This directory contains reusable composite actions for the turbo-themes project.

## 📋 Available Actions

### `setup-env`

Set up Node.js and Ruby with dependency caching.

**Purpose:** Reduce duplication across workflows by providing a standardized environment
setup.

**Inputs:**

- `node-version` (optional): Node.js version to use (default: `22`)
- `ruby-version` (optional): Ruby version to use (default: `3.3`)

**Usage:**

```yaml
- name: Setup environment
  uses: ./.github/actions/setup-env
  with:
    node-version: '22'
    ruby-version: '3.3'
```

**What it does:**

1. Sets up Node.js with npm cache
2. Sets up Ruby with bundler cache
3. Installs Node.js dependencies with `npm ci`

---

### `post-pr-comment`

Post or update a comment on a pull request.

**Purpose:** Provide consistent PR commenting with merge-update support to avoid comment
spam.

**Inputs:**

- `github-token` (required): GitHub token for authentication
- `marker` (required): Unique identifier for the comment (e.g., `coverage-report`)
- `comment-body` (required): The comment content (supports markdown)
- `update-mode` (optional): `replace` or `append` (default: `replace`)

**Usage:**

```yaml
- name: Post coverage comment
  uses: ./.github/actions/post-pr-comment
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    marker: 'coverage-report'
    comment-body: |
      ## Coverage Report
      - Lines: 85%
      - Branches: 78%
    update-mode: replace
```

**What it does:**

1. Searches for existing comment with the specified marker
2. Updates existing comment or creates new one
3. Prevents duplicate comments with the same marker

---

## 🎯 Benefits

### Reduces Duplication

Instead of repeating 10+ lines of setup code in every workflow, use a single action
call.

**Before:**

```yaml
- uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020 # v4
  with:
    node-version: '22'
    cache: npm
- uses: ruby/setup-ruby@d5126b9b3579e429dd52e51e68624dda2e05be25 # v1.267.0
  with:
    ruby-version: '3.3'
    bundler-cache: true
- run: npm ci
```

**After:**

```yaml
- uses: ./.github/actions/setup-env
```

### Consistency

All workflows use identical environment setup, reducing configuration drift.

### Maintainability

Update environment setup once, and all workflows benefit automatically.

## 📚 Creating New Composite Actions

### Directory Structure

```
.github/actions/
└── action-name/
    └── action.yml
```

### Template

```yaml
---
name: Action Name
description: Brief description of what this action does

inputs:
  input-name:
    description: 'Description of the input'
    required: true
    default: 'optional-default-value'

outputs:
  output-name:
    description: 'Description of the output'
    value: ${{ steps.step-id.outputs.value }}

runs:
  using: composite
  steps:
    - name: Step description
      shell: bash
      run: |
        echo "Action logic here"
```

### Best Practices

1. **Clear Naming:** Use descriptive action and input names
2. **Documentation:** Include comprehensive description and usage examples
3. **Defaults:** Provide sensible defaults for optional inputs
4. **Error Handling:** Handle edge cases gracefully
5. **Shell Specification:** Always specify `shell: bash` for run steps
6. **Testing:** Test actions in a workflow before widespread use

## 🔗 Related Documentation

- [GitHub Actions Composite Actions Docs](https://docs.github.com/en/actions/creating-actions/creating-a-composite-action)
- [Workflows README](../workflows/README.md)
- [Scripts README](../../scripts/README.md)

## 📞 Support

For questions about composite actions:

1. Review this README
2. Check the action's `action.yml` file for inline documentation
3. Create an issue for clarification

---

**Last Updated:** 2025-10-05  
**Maintained by:** @eiteldagnin
