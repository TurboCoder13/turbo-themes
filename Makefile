.PHONY: playground-html playground-jekyll playground-swift playground-tailwind playground-bootstrap playground-python playground-all playground-help \
	build-help build-all build-core build-themes build-html build-jekyll build-tailwind build-swift \
	test test-unit test-e2e test-python test-lhci test-all test-help ensure-deps serve-reports build-gem install-gem

playground-help:
	@echo "Playground targets:"
	@echo "  playground-html       Open vanilla HTML demo"
	@echo "  playground-jekyll     Serve Jekyll demo (bundle exec jekyll serve)"
	@echo "  playground-swift      Open SwiftUI preview package in Xcode"
	@echo "  playground-tailwind   Run Vite dev server for Tailwind demo"
	@echo "  playground-bootstrap  Open Bootstrap demo (placeholder)"
	@echo "  playground-python     Run Python report demo (placeholder)"
	@echo "  playground-all        Open HTML, Jekyll, Tailwind"

playground-html:
	open examples/html-vanilla/index.html

playground-jekyll:
	cd examples/jekyll && bundle exec jekyll serve --livereload

playground-swift:
	open examples/swift-swiftui/Package.swift

playground-tailwind:
	cd examples/tailwind && bun install && bun run dev

playground-bootstrap:
	@echo "Bootstrap demo placeholder - add implementation in examples/bootstrap/"

playground-python:
	@echo "Python report demo placeholder - add implementation in examples/python-report/"

playground-all: playground-html playground-jekyll playground-tailwind

# Test targets
test-help:
	@echo "Test targets:"
	@echo "  test         - Run all tests (unit + python + e2e + lighthouse)"
	@echo "  test-unit    - Run TypeScript/Vitest unit tests"
	@echo "  test-e2e     - Run Playwright E2E tests"
	@echo "  test-python  - Run Python unit tests"
	@echo "  test-lhci    - Run Lighthouse CI against _site"
	@echo "  test-all     - Alias for test"

test: ensure-deps test-unit test-python test-e2e test-lhci

test-unit:
	@if command -v bun >/dev/null 2>&1 && [ -f "package.json" ]; then \
		bun run test; \
	else \
		echo "❌ bun or package.json missing. Install bun and deps first."; \
		exit 1; \
	fi

test-e2e: install-gem
	@if [ "$${SKIP_E2E:-0}" = "1" ]; then \
		echo "⏭️  Skipping E2E (SKIP_E2E=1)"; \
	else \
		if command -v bun >/dev/null 2>&1 && [ -f "package.json" ]; then \
			bun run e2e:ci; \
		else \
			echo "❌ bun or package.json missing. Install bun and deps first."; \
			exit 1; \
		fi; \
	fi

test-lhci:
	@if [ "$${SKIP_LHCI:-0}" = "1" ]; then \
		echo "⏭️  Skipping Lighthouse (SKIP_LHCI=1)"; \
	else \
		if command -v bun >/dev/null 2>&1 && [ -f "package.json" ]; then \
			bunx --no-install @lhci/cli@latest autorun --config=lighthouserc.json --collect.numberOfRuns=1; \
		else \
			echo "❌ bun or package.json missing. Install bun and deps first."; \
			exit 1; \
		fi; \
	fi

test-python:
	@cd python && (command -v pytest >/dev/null 2>&1 && pytest tests/ -v) || python3 -c "$$PYTHON_TEST_CODE"

define PYTHON_TEST_CODE
import sys
sys.path.insert(0, 'src')
try:
    from turbo_themes.manager import ThemeManager
    manager = ThemeManager()
    print('✅ ThemeManager creation')
    manager.set_theme('github-light')
    print('✅ Theme switching')
    variables = manager.apply_theme_to_css_variables()
    print(f'✅ CSS variables generation ({{len(variables)}} vars)')
    json_data = manager.export_theme_json('catppuccin-latte')
    print('✅ JSON export')
    print('✅ All Python tests passed!')
except Exception as e:
    print(f'❌ Python test failed: {{e}}')
    sys.exit(1)
endef
export PYTHON_TEST_CODE

test-all: ensure-deps test-unit test-python test-e2e
	@$(MAKE) test-lhci

# Workflow testing with ACT
.PHONY: test-workflows-help test-workflows test-workflows-quick test-workflows-list test-workflows-dry test-workflows-clean
test-workflows-help:
	@echo "Workflow testing targets (requires ACT + Docker):"
	@echo "  test-workflows       - Run all testable workflows"
	@echo "  test-workflows-quick - Run quality workflows only (fastest)"
	@echo "  test-workflows-list  - List all available workflows"
	@echo "  test-workflows-dry   - Dry-run (show commands without executing)"
	@echo ""
	@echo "Options (pass via environment):"
	@echo "  WORKFLOW=name        - Test specific workflow (e.g., WORKFLOW=quality-ci-main)"
	@echo "  CATEGORY=cat         - Filter by category (quality|security|publish|release|maintenance|reporting|deploy|other)"
	@echo "  EVENT=type           - Force event type (push|pull_request|tag|workflow_dispatch)"

test-workflows:
	@./scripts/local/test-workflows-act.sh $(if $(WORKFLOW),$(WORKFLOW),) \
		$(if $(CATEGORY),--category $(CATEGORY),) \
		$(if $(EVENT),--event $(EVENT),)

test-workflows-quick:
	@./scripts/local/test-workflows-act.sh --category quality

test-workflows-list:
	@./scripts/local/test-workflows-act.sh --list

test-workflows-dry:
	@./scripts/local/test-workflows-act.sh --dry-run $(if $(WORKFLOW),$(WORKFLOW),)

test-workflows-clean:
	@echo "Cleaning up stale ACT containers..."
	@docker ps -a --filter "name=act-" -q | xargs -r docker rm -f 2>/dev/null || true

ensure-deps:
	@if ! command -v bun >/dev/null 2>&1; then \
		echo "❌ bun is required. Install from https://bun.sh"; \
		exit 1; \
	fi
	@if [ -f "package.json" ] && [ ! -d "node_modules" ]; then \
		echo "📦 Installing JS deps with bun install..."; \
		bun install; \
	fi
	@if [ -d "node_modules/@playwright/test" ]; then \
		echo "🎭 Ensuring Playwright browsers are installed..."; \
		bunx playwright install chromium >/dev/null 2>&1 || true; \
	fi
	@if [ -f "Gemfile" ]; then \
		if ! command -v bundle >/dev/null 2>&1; then \
			echo "❌ bundle is required (Ruby/Bundler) to build the Jekyll site for E2E."; \
			exit 1; \
		fi; \
		if [ ! -d "vendor/bundle" ]; then \
			echo "💎 Installing Ruby gems (bundle install --path vendor/bundle)..."; \
			BUNDLE_PATH=vendor/bundle bundle install >/dev/null; \
		fi; \
	fi

serve-reports:
	@if ! command -v bunx >/dev/null 2>&1; then \
		echo "❌ bunx required to serve reports (http-server)."; exit 1; \
	fi
	@echo "Serving _site (and reports if present) on http://127.0.0.1:4173 ..."
	@bunx --no-install http-server _site -a 127.0.0.1 -p 4173 -c-1 -s

# Gem targets for local Jekyll theme testing
build-gem:
	@echo "💎 Building turbo-themes gem..."
	@./scripts/build-gem.sh

install-gem: build-gem
	@echo "💎 Refreshing Bundler to use local gem..."
	@bundle install --quiet

# Build targets
build-help:
	@echo "Build targets:"
	@echo "  build-core      bun run build (tokens/ts)"
	@echo "  build-themes    bun run build:themes (CSS/themes)"
	@echo "  build-html      build core+themes for vanilla demo"
	@echo "  build-jekyll    build core+themes and Jekyll site"
	@echo "  build-tailwind  bun build inside examples/tailwind"
	@echo "  build-swift     SwiftUI preview (open in Xcode)"
	@echo "  build-all       core + themes + Jekyll"

build-core:
	bun run build

build-themes:
	bun run build:themes

build-html: build-core build-themes
	@echo "HTML demo built. Open examples/html-vanilla/index.html"

build-jekyll: build-core build-themes
	bundle exec jekyll build --config _config.yml

build-tailwind:
	cd examples/tailwind && bun install && bun run build

build-swift:
	@echo "Open examples/swift-swiftui/Package.swift in Xcode to build previews."

build-all: build-core build-themes build-jekyll

help: playground-help build-help test-help test-workflows-help

