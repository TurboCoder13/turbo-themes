# Jekyll demo

Minimal Jekyll site that consumes the local `turbo-themes` gem.

## Run locally

```bash
cd examples/jekyll
bundle install
bundle exec jekyll serve --livereload
```

The Gemfile points to the repo root (`path: "../.."`) so you can iterate on the gem and
refresh the site.

## Build to a target folder

```bash
bundle exec jekyll build --destination ./_site
```
