# This Gemfile is for the turbo-themes Ruby gem (build/publish/test tooling),
# NOT the docs site — the site is built with Astro (see apps/site/). It backs:
#   - `bun run build:gem` / scripts/build-gem.sh
#   - RSpec tests in spec/ (see Rakefile, scripts/local/build.sh Step 5.6)
#   - .github/workflows/publish-gem.yml (bundler-cache: true)
# The `jekyll` gem is a runtime dependency of the published gem itself
# (see turbo-themes.gemspec), used by consumers building Jekyll sites with it.
source "https://rubygems.org"

gem "jekyll", "~> 4.4"
gem "webrick", "~> 1.9"

# Local gem for development and E2E tests
gem "turbo-themes", path: "."

# Useful during development
group :development do
  gem "html-proofer", "~> 5.0"
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-sitemap", "~> 1.4"
end

# Testing
group :development, :test do
  gem "rspec", "~> 3.13"
  gem "simplecov", "~> 1.0"
  gem "simplecov-html", "~> 0.13"
end
