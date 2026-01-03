# frozen_string_literal: true

require_relative "lib/turbo-themes/version"

Gem::Specification.new do |spec|
  spec.name = "turbo-themes"
  spec.version = TurboThemes::VERSION
  spec.authors = ["Turbo Coder"]
  spec.email = ["turbocoder13@users.noreply.github.com"]

  spec.summary = "Universal, accessible theme packs and a drop-in theme selector"
  spec.description = "Turbo Themes provides framework-agnostic color schemes and an accessible theme selector component for Jekyll sites and beyond."
  spec.homepage = "https://github.com/TurboCoder13/turbo-themes"
  spec.license = "MIT"
  spec.required_ruby_version = ">= 3.1.0"

  spec.metadata = {
    "bug_tracker_uri" => "https://github.com/TurboCoder13/turbo-themes/issues",
    "changelog_uri" => "https://github.com/TurboCoder13/turbo-themes/blob/main/CHANGELOG.md",
    "documentation_uri" => "https://turbocoder13.github.io/turbo-themes/",
    "homepage_uri" => spec.homepage,
    "source_code_uri" => spec.homepage,
  }

  # Specify which files should be added to the gem when it is released.
  # Jekyll themes need assets in the root, not nested
  spec.files = Dir[
    "lib/**/*",
    "assets/**/*",
    "_layouts/**/*",
    "_includes/**/*",
    "_data/**/*",
    "README.md",
    "LICENSE",
    "CHANGELOG.md"
  ].select { |f| File.file?(f) }

  spec.bindir = "exe"
  spec.executables = spec.files.grep(%r{\Aexe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  # Jekyll theme support
  spec.add_runtime_dependency "jekyll", ">= 3.5", "< 5.0"
end


