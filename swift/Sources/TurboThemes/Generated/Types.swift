// SPDX-License-Identifier: MIT
// AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY
// Generated from: schema/turbo-themes-output.schema.json
// Generator: scripts/codegen/generate-swift-types.mjs
// Run: bun run generate:types:swift

import Foundation


/// Theme appearance mode
public enum GeneratedAppearance: String, Codable, Equatable, Sendable {
    case light
    case dark
}

/// Generated struct for GeneratedMeta
public struct GeneratedMeta: Codable, Equatable, Sendable {
    public let themeIds: [String]?
    public let vendors: [String]?
    public let totalThemes: Int?
    public let lightThemes: Int?
    public let darkThemes: Int?
}

/// Generated struct for GeneratedVendor
public struct GeneratedVendor: Codable, Equatable, Sendable {
    public let name: String
    public let homepage: String
    public let themes: [String]
}

/// Generated struct for GeneratedBackground
public struct GeneratedBackground: Codable, Equatable, Sendable {
    public let base: String
    public let surface: String
    public let overlay: String
}

/// Generated struct for GeneratedText
public struct GeneratedText: Codable, Equatable, Sendable {
    public let primary: String
    public let secondary: String
    public let inverse: String
}

/// Generated struct for GeneratedBrand
public struct GeneratedBrand: Codable, Equatable, Sendable {
    public let primary: String
    /// Text/icon color for fills using brand.primary (WCAG AA)
    public let primaryText: String
}

/// Generated struct for GeneratedState
public struct GeneratedState: Codable, Equatable, Sendable {
    public let info: String
    public let success: String
    public let warning: String
    public let danger: String
}

/// Generated struct for GeneratedBorder
public struct GeneratedBorder: Codable, Equatable, Sendable {
    public let `default`: String

    enum CodingKeys: String, CodingKey {
        case `default` = "default"
    }
}

/// Generated struct for GeneratedAccent
public struct GeneratedAccent: Codable, Equatable, Sendable {
    public let link: String
}

/// Generated struct for GeneratedSpacing
public struct GeneratedSpacing: Codable, Equatable, Sendable {
    public let xs: String
    public let sm: String
    public let md: String
    public let lg: String
    public let xl: String
}

/// Generated struct for GeneratedElevation
public struct GeneratedElevation: Codable, Equatable, Sendable {
    public let `none`: String
    public let sm: String
    public let md: String
    public let lg: String
    public let xl: String

    enum CodingKeys: String, CodingKey {
        case `none` = "none"
        case sm
        case md
        case lg
        case xl
    }
}

/// Generated struct for GeneratedAnimation
public struct GeneratedAnimation: Codable, Equatable, Sendable {
    public let durationFast: String
    public let durationNormal: String
    public let durationSlow: String
    public let easingDefault: String
    public let easingEmphasized: String
}

/// Generated struct for GeneratedOpacity
public struct GeneratedOpacity: Codable, Equatable, Sendable {
    public let disabled: Double
    public let hover: Double
    public let pressed: Double
}

/// Generated struct for GeneratedFonts
public struct GeneratedFonts: Codable, Equatable, Sendable {
    public let sans: String
    public let mono: String
}

/// Generated struct for GeneratedHeading
public struct GeneratedHeading: Codable, Equatable, Sendable {
    public let h1: String
    public let h2: String
    public let h3: String
    public let h4: String
    public let h5: String
    public let h6: String
}

/// Generated struct for GeneratedBody
public struct GeneratedBody: Codable, Equatable, Sendable {
    public let primary: String
    public let secondary: String
}

/// Generated struct for GeneratedLink
public struct GeneratedLink: Codable, Equatable, Sendable {
    public let `default`: String

    enum CodingKeys: String, CodingKey {
        case `default` = "default"
    }
}

/// Generated struct for GeneratedSelection
public struct GeneratedSelection: Codable, Equatable, Sendable {
    public let fg: String
    public let bg: String
}

/// Generated struct for GeneratedBlockquote
public struct GeneratedBlockquote: Codable, Equatable, Sendable {
    public let border: String
    public let fg: String
    public let bg: String
}

/// Generated struct for GeneratedCode
public struct GeneratedCode: Codable, Equatable, Sendable {
    public let fg: String
    public let bg: String
}

/// Generated struct for GeneratedTable
public struct GeneratedTable: Codable, Equatable, Sendable {
    public let border: String
    public let stripe: String
    public let theadBg: String
    public let cellBg: String?
    public let headerFg: String?
}

/// Generated struct for GeneratedCardComponent
public struct GeneratedCardComponent: Codable, Equatable, Sendable {
    public let bg: String?
    public let border: String?
    public let headerBg: String?
    public let footerBg: String?
}

/// Generated struct for GeneratedMessageComponent
public struct GeneratedMessageComponent: Codable, Equatable, Sendable {
    public let bg: String?
    public let headerBg: String?
    public let border: String?
    public let bodyFg: String?
}

/// Generated struct for GeneratedPanelComponent
public struct GeneratedPanelComponent: Codable, Equatable, Sendable {
    public let bg: String?
    public let headerBg: String?
    public let headerFg: String?
    public let border: String?
    public let blockBg: String?
    public let blockHoverBg: String?
    public let blockActiveBg: String?
}

/// Generated struct for GeneratedBoxComponent
public struct GeneratedBoxComponent: Codable, Equatable, Sendable {
    public let bg: String?
    public let border: String?
}

/// Generated struct for GeneratedNotificationComponent
public struct GeneratedNotificationComponent: Codable, Equatable, Sendable {
    public let bg: String?
    public let border: String?
}

/// Generated struct for GeneratedModalComponent
public struct GeneratedModalComponent: Codable, Equatable, Sendable {
    public let bg: String?
    public let cardBg: String?
    public let headerBg: String?
    public let footerBg: String?
}

/// Generated struct for GeneratedDropdownComponent
public struct GeneratedDropdownComponent: Codable, Equatable, Sendable {
    public let bg: String?
    public let itemHoverBg: String?
    public let border: String?
}

/// Generated struct for GeneratedTabsComponent
public struct GeneratedTabsComponent: Codable, Equatable, Sendable {
    public let border: String?
    public let linkBg: String?
    public let linkActiveBg: String?
    public let linkHoverBg: String?
}

/// Generated struct for GeneratedTypography
public struct GeneratedTypography: Codable, Equatable, Sendable {
    public let fonts: Fonts
    public let webFonts: [String]
}

/// Generated struct for GeneratedContent
public struct GeneratedContent: Codable, Equatable, Sendable {
    public let heading: Heading
    public let body: Body
    public let link: Link
    public let selection: Selection
    public let blockquote: Blockquote
    public let codeInline: Code
    public let codeBlock: Code
    public let table: Table
}

/// Generated struct for GeneratedComponents
public struct GeneratedComponents: Codable, Equatable, Sendable {
    public let card: CardComponent?
    public let message: MessageComponent?
    public let panel: PanelComponent?
    public let box: BoxComponent?
    public let notification: NotificationComponent?
    public let modal: ModalComponent?
    public let dropdown: DropdownComponent?
    public let tabs: TabsComponent?
}

/// Generated struct for GeneratedTokens
public struct GeneratedTokens: Codable, Equatable, Sendable {
    public let background: Background
    public let text: Text
    public let brand: Brand
    public let state: State
    public let border: Border
    public let accent: Accent
    public let spacing: Spacing?
    public let elevation: Elevation?
    public let animation: Animation?
    public let opacity: Opacity?
    public let typography: Typography
    public let content: Content
    public let components: Components?
}

/// Generated struct for GeneratedThemeValue
public struct GeneratedThemeValue: Codable, Equatable, Sendable {
    public let _description: String?
    public let id: String
    public let label: String
    public let vendor: String
    public let appearance: Any
    public let iconUrl: String?
    public let tokens: Tokens

    enum CodingKeys: String, CodingKey {
        case _description = "$description"
        case id
        case label
        case vendor
        case appearance
        case iconUrl
        case tokens
    }
}

/// Generated struct for GeneratedTurboThemesOutput
public struct GeneratedTurboThemesOutput: Codable, Equatable, Sendable {
    public let _schema: String?
    public let _description: String?
    public let _version: String?
    /// SHA-256 hex digest of JSON.stringify(content excluding $generated). Hashing is over the normalized JSON representation, not raw file bytes, so whitespace-only edits do not invalidate the hash. Covers all other fields including $version, so the hash changes on every regeneration or version bump. Use this field to detect stale caches or verify structural integrity.
    public let _generated: String?
    public let meta: Meta?
    public let themes: [String: ThemeValue]
    public let byVendor: [String: Vendor]?

    enum CodingKeys: String, CodingKey {
        case _schema = "$schema"
        case _description = "$description"
        case _version = "$version"
        case _generated = "$generated"
        case meta
        case themes
        case byVendor
    }
}
