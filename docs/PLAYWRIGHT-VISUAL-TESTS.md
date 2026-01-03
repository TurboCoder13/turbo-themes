# Playwright Visual Regression Tests

## Overview

Visual regression tests in this project use Playwright's snapshot comparison feature to
ensure consistent rendering across themes. These tests compare screenshots of the
homepage with different themes applied.

## Platform-Specific Snapshots

**Key Innovation**: Instead of using different tolerance levels for different platforms,
we store separate snapshots for each platform (macOS and Linux). This allows us to use
**strict tolerance levels everywhere** while avoiding false failures due to platform
rendering differences.

### Snapshot Storage Structure

```
e2e/homepage-theme-snapshots/
├── macos/           # Snapshots generated on macOS
│   ├── homepage-github-dark.png
│   └── homepage-catppuccin-latte.png
└── linux/          # Snapshots generated on Linux (matching CI)
    ├── homepage-github-dark.png
    └── homepage-catppuccin-latte.png
```

### Tolerance Settings

We use **strict tolerance levels everywhere** because snapshots are compared against
platform-specific baselines:

- `maxDiffPixels`: 100
- `threshold`: 0.2
- `maxDiffPixelRatio`: 0.2

### Why Platform-Specific Snapshots?

macOS and Linux render fonts and subpixels differently, causing visual differences that
don't affect functionality:

- Font rendering engines differ between platforms (CoreText vs FreeType)
- Subpixel rendering varies
- Anti-aliasing approaches differ

By maintaining separate snapshots for each platform, we can use strict tolerances while
avoiding false failures.

## Running Visual Tests

### Local Development (macOS)

```bash
# Run all visual tests (uses macOS snapshots)
bun run e2e:visual

# Run specific visual test file
npx playwright test e2e/homepage-theme.spec.ts --grep @visual
```

### CI Environment

Visual tests run automatically as part of the E2E test suite via
`.github/workflows/quality-e2e.yml`. CI uses Linux snapshots for comparison.

### Generating Linux Snapshots Locally

To generate or update Linux snapshots locally (e.g., when adding new themes):

```bash
# Generate Linux snapshots using Docker
bash scripts/local/generate-linux-snapshots.sh
```

This is useful when:

- Adding new themes or components
- Updating snapshots after intentional changes
- Ensuring CI tests will pass before pushing

## Updating Snapshots

If visual changes are intentional and you need to update snapshots:

### Updating macOS Snapshots

```bash
# Update macOS snapshots (run locally on macOS)
npx playwright test --grep @visual --update-snapshots
```

### Updating Linux Snapshots

```bash
# Update Linux snapshots (matches CI environment)
bash scripts/local/generate-linux-snapshots.sh
```

**Important**: Always update both macOS and Linux snapshots when making visual changes
to ensure tests pass in both environments.

## Best Practices

1. **Commit both platform snapshots**: Always commit both macOS and Linux snapshots when
   making visual changes.

2. **Generate Linux snapshots before committing**: Run
   `bash scripts/local/generate-linux-snapshots.sh` before pushing to ensure CI passes.

3. **Review diffs carefully**: When snapshots differ, visually inspect the generated
   diff images to determine if changes are intentional.

4. **Test theme changes locally first**: Use `bun run e2e:visual` to verify changes
   before pushing to CI.

5. **Keep tolerance strict**: Current settings (100 pixels, 0.2 threshold) catch real
   regressions while avoiding false positives thanks to platform-specific snapshots.

## Troubleshooting

### Tests failing in CI but passing locally

**Possible causes**:

1. **Linux snapshots missing**: Run `bash scripts/local/generate-linux-snapshots.sh` to
   create them
2. **Linux snapshots outdated**: Regenerate them after making visual changes
3. **Actual visual regression**: Check the diff images uploaded as CI artifacts

**Solution**:

```bash
# Regenerate Linux snapshots
bash scripts/local/generate-linux-snapshots.sh

# Commit the updated snapshots
git add e2e/homepage-theme-snapshots/linux/
git commit -m "chore: update Linux visual test snapshots"
```

### Snapshots appear blurred or pixelated

This is normal for Linux-generated snapshots. Linux fonts render differently than macOS
due to different font rendering engines (FreeType vs CoreText).

### Need to regenerate snapshots

```bash
# macOS snapshots
bun run e2e:prep
npx playwright test --grep @visual --update-snapshots

# Linux snapshots
bash scripts/local/generate-linux-snapshots.sh
```
