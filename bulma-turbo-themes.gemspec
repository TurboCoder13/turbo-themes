# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "bulma-turbo-themes"
  spec.version       = "0.11.0"
  spec.authors       = ["Turbo Coder"]
  spec.email         = ["turbocoder13@users.noreply.github.com"]

  spec.summary       = "DEPRECATED: Use 'turbo-themes' gem instead."
  spec.description   = "This gem has been renamed to 'turbo-themes'. Please update your Gemfile to `gem \"turbo-themes\"`."
  spec.homepage      = "https://github.com/TurboCoder13/turbo-themes"
  spec.license       = "MIT"
  spec.required_ruby_version = ">= 3.1.0"

  spec.metadata = {
    "bug_tracker_uri" => "https://github.com/TurboCoder13/turbo-themes/issues",
    "changelog_uri" => "https://github.com/TurboCoder13/turbo-themes/blob/main/CHANGELOG.md",
    "documentation_uri" => "https://turbocoder13.github.io/turbo-themes/",
    "homepage_uri" => spec.homepage,
    "source_code_uri" => spec.homepage,
  }

  spec.post_install_message = <<~MSG
    ⚠️  DEPRECATION WARNING ⚠️
    The 'bulma-turbo-themes' gem has been renamed to 'turbo-themes'.
    Please update your Gemfile:
      gem "turbo-themes"
  MSG

  spec.add_dependency "turbo-themes", "~> 1.0"

  spec.files = [
    "lib/bulma-turbo-themes.rb",
    "LICENSE",
    "README.md",
    "CHANGELOG.md",
  ].select { |f| File.file?(f) }
  spec.require_paths = ["lib"]
end

