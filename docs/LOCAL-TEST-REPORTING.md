# Local Test Reporting Guide

This guide explains how to view test reports locally after running E2E tests and
Lighthouse CI.

## Overview

The project generates two types of test reports:

1. **Playwright E2E Test Report** - Visual regression, accessibility, and smoke tests
2. **Lighthouse Performance Report** - Performance metrics and audit results

## Viewing Playwright Reports Locally

### Generate the Report

Run the E2E tests to generate the Playwright HTML report:

```bash
bun run e2e:ci
```

This creates the `playwright-report/` directory with an interactive HTML report.

### View the Report

#### Option 1: Using Playwright CLI (recommended)

```bash
npx playwright show-report
```

Opens automatically at `http://localhost:9323`

#### Option 2: Using the serve script

```bash
./scripts/local/serve-reports.sh
```

View at `http://localhost:9323`

## Viewing Lighthouse Reports Locally

### Generate the Reports

Run the Lighthouse CI pipeline:

```bash
./scripts/ci/run-lighthouse-ci.sh
```

This creates the `lighthouse-reports/` directory with detailed audit results.

### View the Reports

#### Using the serve script

```bash
./scripts/local/serve-reports.sh
```

View at `http://localhost:3001/`

**Note:** When accessed through the Jekyll server at `http://localhost:4000`, the report
is available at `/lighthouse/` (simplified from `lighthouse-reports/`).

## Using the Multi-Server Script

### Prerequisites

Before running `serve-reports.sh`, ensure:

- Scripts in `scripts/` are executable (e.g.,
  `chmod +x ./scripts/local/serve-reports.sh`)
- Required tools are installed: `bash`

The `serve-reports.sh` script automatically detects which reports are available and
starts the appropriate servers:

```bash
./scripts/local/serve-reports.sh
```

**Note**: The Jekyll server is optional and only needed if you want to access reports
through the Jekyll site (see "Accessing Reports Through Jekyll" section below). If you
want to use Jekyll, start it separately:

```bash
bundle exec jekyll serve --livereload --incremental
```

**Output example:**

```
📊 Test Report Servers
=====================

✅ Playwright HTML Report found
   📍 View at: http://localhost:9323

✅ Lighthouse Reports found
   📍 View at: http://localhost:3001/

Jekyll Site: http://localhost:4000

Starting report servers...

✅ Playwright server started (PID: 12345)
✅ Lighthouse server started (PID: 12346)

Press Ctrl+C to stop all servers
```

## Accessing Reports Through Jekyll

### Prerequisites

Before accessing reports through Jekyll, ensure:

- Scripts in `scripts/` are executable (e.g.,
  `chmod +x ./scripts/local/serve-reports.sh`)
- Required tools are installed: `bash`, `Jekyll`
- Jekyll server is started separately:

  ```bash
  bundle exec jekyll serve --livereload --incremental
  ```

The reports can also be included in the Jekyll build if they exist:

```yaml
# _config.yml
include:
  - playwright-report # Playwright E2E test report
  - lighthouse-reports # Lighthouse performance reports
```

When these directories exist, Jekyll will copy them to `_site/` and make them available
through the main Jekyll server at:

- `http://localhost:4000/playwright/` (simplified from `playwright-report/`)
- `http://localhost:4000/lighthouse/` (simplified from `lighthouse-reports/`)

## CI Deployment

In the CI pipeline, these reports are:

1. Generated during test runs
2. Uploaded as artifacts to GitHub Actions
3. Deployed to GitHub Pages for permanent access

### Lighthouse Reports

- **Workflow**: `reporting-lighthouse-ci.yml`
- **Deploy**: `deploy-lighthouse-pages.yml`
- **Endpoint**:
  `https://<your-github-username>.github.io/<repository-name>/lighthouse-reports/`

### Playwright Reports

- **Generated in**: `quality-e2e.yml`
- **Stored as**: GitHub Actions artifacts
- **View**: In PR checks or actions run details

## Troubleshooting

### Reports not found locally

If you see errors like:

```
ERROR '/playwright' not found.
ERROR '/lighthouse' not found.
```

**Solution**: These directories are only created after running the respective tests.
Run:

```bash
bun run e2e:ci      # For Playwright report
./scripts/ci/run-lighthouse-ci.sh  # For Lighthouse reports
```

### Port already in use

If a port is already in use, you have several options:

#### macOS/Linux (Unix)

#### Option 1: Check processes first (safer)

```bash
# Check what's using the port
lsof -i:9323    # For Playwright (port 9323)
lsof -i:3001    # For Lighthouse (port 3001)

# Kill with gentler signal (allows graceful shutdown)
lsof -ti:9323 | xargs kill    # For Playwright (port 9323)
lsof -ti:3001 | xargs kill    # For Lighthouse (port 3001)
```

#### Option 2: Force kill (use only if Option 1 doesn't work)

```bash
# Force kill existing process
lsof -ti:9323 | xargs kill -9    # For Playwright (port 9323)
lsof -ti:3001 | xargs kill -9    # For Lighthouse (port 3001)
```

#### Option 3: Stop all Node processes (if you're sure)

```bash
pkill -f node    # Stops all Node.js processes
```

#### Windows

#### Option 1: Check processes first (safer)

```cmd
REM Check what's using the port
REM For Playwright (port 9323)
netstat -ano | findstr :9323
REM For Lighthouse (port 3001)
netstat -ano | findstr :3001

REM Kill the process (replace PID with the value from netstat output)
taskkill /PID <PID> /F
```

#### Option 2: One-liner to find and kill

```cmd
REM For Playwright (port 9323)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :9323') do taskkill /PID %%a /F

REM For Lighthouse (port 3001)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001') do taskkill /PID %%a /F
```

#### Option 3: Stop all Node processes (if you're sure)

```cmd
taskkill /IM node.exe /F
```

#### General Recommendations

1. **Check first**: Always check what process is using the port before killing it
2. **Use gentler signals**: Try `kill` without `-9` first (Unix) or `taskkill` without
   `/F` first (Windows) to allow graceful shutdown
3. **Restart terminal**: Sometimes the simplest solution is to close and restart your
   terminal session
4. **Stop Node processes**: If you're certain all Node processes can be stopped, use
   `pkill -f node` (Unix) or `taskkill /IM node.exe /F` (Windows)

After freeing the port, restart the server.

## Workflow Examples

### After Making Changes

1. Run E2E tests to check for visual regressions:

   ```bash
   bun run e2e:ci
   ```

2. View the report:

   ```bash
   npx playwright show-report
   ```

3. Review test results and screenshots

### Full Quality Check

1. Run complete CI pipeline:

   The `build.sh` script runs tests, builds the site, and performs quality checks. Use
   `--quick` for faster builds that skip cleanup and E2E tests, or run without flags for
   the full pipeline including E2E tests. See [scripts/README.md](../scripts/README.md)
   for details.

   ```bash
   ./scripts/local/build.sh --quick
   ```

2. Serve all available reports:

   ```bash
   ./scripts/local/serve-reports.sh
   ```

3. Open browsers to:
   - **Main site**: http://localhost:4000
   - **Tests**: http://localhost:9323 (if available)
   - **Performance**: http://localhost:3001/ (if available)
