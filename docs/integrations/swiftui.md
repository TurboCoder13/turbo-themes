# SwiftUI Integration

## Install via Swift Package Manager (GitHub)

1. In Xcode, add a package dependency:  
   URL: `https://github.com/TurboCoder13/turbo-themes.git`  
   Version: `from 0.10.8`
2. Add the library product to your target: **TurboThemes**

## Generate sources when developing locally

If you are working inside this repo and need to refresh generated Swift sources:

```bash
bun run build:tokens:swift
```

This copies generated files into `swift/Sources/TurboThemes/`.

## Use the registry

```swift
import TurboThemes

let themes = ThemeRegistry.themes
let mocha = themes[.catppuccinMocha]
// Switch themes by selecting the desired ThemeDefinition
```
