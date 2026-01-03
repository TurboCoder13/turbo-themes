// swift-tools-version: 5.9
import PackageDescription

let package = Package(
  name: "ThemeShowcase",
  platforms: [
    .iOS(.v17),
    .macOS(.v13)
  ],
  products: [
    .app(name: "ThemeShowcaseApp", targets: ["ThemeShowcaseApp"])
  ],
  targets: [
    .target(
      name: "ThemeShowcaseApp",
      path: "Sources"
    )
  ]
)

