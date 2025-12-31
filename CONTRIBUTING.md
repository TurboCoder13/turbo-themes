# Contributing

Thanks for contributing! Please follow these guidelines to keep things smooth.

## Development setup

### Prerequisites

- **Bun** (recommended): 1.3+ - [Install Bun](https://bun.sh/docs/installation)
- **Node.js** (alternative): 22+ with npm
- **Ruby**: 3.3+ with Bundler (for Jekyll demo site)
- **uv**: Python package manager (for lintro)

### Quick Start with Bun (Recommended)

```bash
# Install dependencies (5-10x faster than npm)
bun install
bundle install

# Build everything
bun run build           # TypeScript compilation
bun run build:themes    # Generate CSS themes

# Run the dev server
bun run serve           # Builds and serves with live reload
```

### Alternative: npm (if Bun is unavailable)

```bash
npm ci
bundle install
npm run build
npm run build:themes
npm run serve
```

### Build Commands

| Command                   | Description                                      |
| ------------------------- | ------------------------------------------------ |
| `bun run build`           | Compile TypeScript to JavaScript                 |
| `bun run build:themes`    | Generate CSS theme files in `assets/css/themes/` |
| `bun run build:ci:jekyll` | Build Jekyll site for CI                         |
| `bun run serve`           | Build and serve with live reload                 |

**Note:** CSS theme files in `assets/css/themes/` are build artifacts and are
git-ignored. They are automatically generated during the build process and should not be
committed to version control.

### Available Rake tasks

This is a hybrid Bun/Ruby project (npm compatible). Rake tasks are available for
gem-related operations:

```bash
rake -T                 # List all available tasks
rake build              # Build the Ruby gem (includes Bun build)
rake build:npm          # Build JS package (TypeScript -> JavaScript) via Bun
rake build:gem          # Build Ruby gem specifically
rake clean              # Remove built artifacts (*.gem, dist/, _site/)
rake verify:gem         # Verify gem can be built successfully
rake verify:all         # Run all checks (lint, test, and build)
rake console            # Open IRB with the gem loaded for debugging
```

Most developers will use `bun run build:gem` which handles the full build process, but
Rake tasks are useful for gem-specific operations and are required by the RubyGems
publishing workflow.

## Testing and linting

```bash
# Run tests with coverage
bun run test

# Lint code
bun run lint        # ESLint for TypeScript
bun run stylelint   # Stylelint for CSS
bun run mdlint      # Markdownlint for docs

# Format code
bun run format      # Check formatting
bun run format:write # Auto-fix formatting
```

All commands work with both `bun run` and `npm run`.

## Commits and PRs

- Use conventional commits (e.g., `feat:`, `fix:`, `docs:`)
- Include a clear description and link to issues
- Ensure checks are green (lint, tests, typecheck if applicable)
- Be respectful and follow the Code of Conduct

## Reporting issues

- Use the templates under `.github/ISSUE_TEMPLATE/`
- Security issues: do not open public issues; see `SECURITY.md`
