// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "TurboThemes",
    platforms: [
        .iOS(.v15), .macOS(.v12), .tvOS(.v15), .watchOS(.v8)
    ],
    products: [
        .library(name: "TurboThemes", targets: ["TurboThemes"]),
    ],
    targets: [
        .target(name: "TurboThemes", path: "Sources/TurboThemes"),
        .testTarget(name: "TurboThemesTests", dependencies: ["TurboThemes"], path: "Tests/TurboThemesTests"),
    ]
)
