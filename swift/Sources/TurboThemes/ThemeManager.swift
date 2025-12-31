// SPDX-License-Identifier: MIT
import SwiftUI

@Observable
public final class ThemeManager {
    public private(set) var currentTheme: ThemeDefinition
    public var appearance: ThemeAppearance { currentTheme.appearance }

    public init(defaultTheme: ThemeId = .catppuccinMocha) {
        self.currentTheme = ThemeRegistry.themes[defaultTheme] ?? ThemeRegistry.ordered.first!
    }

    public func setTheme(_ id: ThemeId) {
        if let theme = ThemeRegistry.themes[id] {
            currentTheme = theme
        }
    }

    public func setNext(light: ThemeId? = nil, dark: ThemeId? = nil) {
        switch currentTheme.appearance {
        case .light:
            if let dark = dark ?? ThemeRegistry.ordered.first(where: { $0.appearance == .dark })?.id {
                setTheme(dark)
            }
        case .dark:
            if let light = light ?? ThemeRegistry.ordered.first(where: { $0.appearance == .light })?.id {
                setTheme(light)
            }
        }
    }
}
