import SwiftUI

enum ThemeId: String, CaseIterable {
  case catppuccinMocha = "catppuccin-mocha"
  case catppuccinLatte = "catppuccin-latte"
  case dracula = "dracula"
  case githubDark = "github-dark"
  case githubLight = "github-light"
  case bulmaLight = "bulma-light"
  case bulmaDark = "bulma-dark"
}

struct ThemePalette {
  let backgroundBase: Color
  let backgroundSurface: Color
  let heading: Color
  let bodyPrimary: Color
  let bodySecondary: Color
  let brandPrimary: Color
  let stateSuccess: Color
  let stateDanger: Color
  let stateWarning: Color
  let stateInfo: Color
}

struct ThemeDefinition {
  let id: ThemeId
  let label: String
  let palette: ThemePalette
}

enum ThemeRegistry {
  static let themes: [ThemeId: ThemeDefinition] = [
    .catppuccinMocha: ThemeDefinition(
      id: .catppuccinMocha,
      label: "Catppuccin Mocha",
      palette: ThemePalette(
        backgroundBase: Color(hex: "#1e1e2e"),
        backgroundSurface: Color(hex: "#313244"),
        heading: Color(hex: "#f5e0dc"),
        bodyPrimary: Color(hex: "#cdd6f4"),
        bodySecondary: Color(hex: "#bac2de"),
        brandPrimary: Color(hex: "#cba6f7"),
        stateSuccess: Color(hex: "#a6e3a1"),
        stateDanger: Color(hex: "#f38ba8"),
        stateWarning: Color(hex: "#f9e2af"),
        stateInfo: Color(hex: "#89dceb")
      )
    ),
    .catppuccinLatte: ThemeDefinition(
      id: .catppuccinLatte,
      label: "Catppuccin Latte",
      palette: ThemePalette(
        backgroundBase: Color(hex: "#e6e9ef"),
        backgroundSurface: Color(hex: "#dce0e8"),
        heading: Color(hex: "#4c4f69"),
        bodyPrimary: Color(hex: "#5c5f77"),
        bodySecondary: Color(hex: "#6c6f85"),
        brandPrimary: Color(hex: "#8839ef"),
        stateSuccess: Color(hex: "#40a02b"),
        stateDanger: Color(hex: "#d20f39"),
        stateWarning: Color(hex: "#df8e1d"),
        stateInfo: Color(hex: "#209fb5")
      )
    ),
    .dracula: ThemeDefinition(
      id: .dracula,
      label: "Dracula",
      palette: ThemePalette(
        backgroundBase: Color(hex: "#282a36"),
        backgroundSurface: Color(hex: "#303347"),
        heading: Color(hex: "#f8f8f2"),
        bodyPrimary: Color(hex: "#f8f8f2"),
        bodySecondary: Color(hex: "#c5c8d4"),
        brandPrimary: Color(hex: "#bd93f9"),
        stateSuccess: Color(hex: "#50fa7b"),
        stateDanger: Color(hex: "#ff5555"),
        stateWarning: Color(hex: "#f1fa8c"),
        stateInfo: Color(hex: "#8be9fd")
      )
    ),
    .githubDark: ThemeDefinition(
      id: .githubDark,
      label: "GitHub Dark",
      palette: ThemePalette(
        backgroundBase: Color(hex: "#0d1117"),
        backgroundSurface: Color(hex: "#161b22"),
        heading: Color(hex: "#e6edf3"),
        bodyPrimary: Color(hex: "#c9d1d9"),
        bodySecondary: Color(hex: "#8b949e"),
        brandPrimary: Color(hex: "#2f81f7"),
        stateSuccess: Color(hex: "#3fb950"),
        stateDanger: Color(hex: "#f85149"),
        stateWarning: Color(hex: "#d29922"),
        stateInfo: Color(hex: "#2f81f7")
      )
    ),
    .githubLight: ThemeDefinition(
      id: .githubLight,
      label: "GitHub Light",
      palette: ThemePalette(
        backgroundBase: Color(hex: "#ffffff"),
        backgroundSurface: Color(hex: "#f6f8fa"),
        heading: Color(hex: "#1f2328"),
        bodyPrimary: Color(hex: "#24292f"),
        bodySecondary: Color(hex: "#57606a"),
        brandPrimary: Color(hex: "#0969da"),
        stateSuccess: Color(hex: "#1f883d"),
        stateDanger: Color(hex: "#cf222e"),
        stateWarning: Color(hex: "#9a6700"),
        stateInfo: Color(hex: "#0969da")
      )
    ),
    .bulmaLight: ThemeDefinition(
      id: .bulmaLight,
      label: "Bulma Light",
      palette: ThemePalette(
        backgroundBase: Color(hex: "#ffffff"),
        backgroundSurface: Color(hex: "#f5f5f5"),
        heading: Color(hex: "#242424"),
        bodyPrimary: Color(hex: "#363636"),
        bodySecondary: Color(hex: "#4a4a4a"),
        brandPrimary: Color(hex: "#00d1b2"),
        stateSuccess: Color(hex: "#22c55e"),
        stateDanger: Color(hex: "#ef4444"),
        stateWarning: Color(hex: "#f59e0b"),
        stateInfo: Color(hex: "#3b82f6")
      )
    ),
    .bulmaDark: ThemeDefinition(
      id: .bulmaDark,
      label: "Bulma Dark",
      palette: ThemePalette(
        backgroundBase: Color(hex: "#1a1a2e"),
        backgroundSurface: Color(hex: "#252540"),
        heading: Color(hex: "#f5f5f5"),
        bodyPrimary: Color(hex: "#e5e7eb"),
        bodySecondary: Color(hex: "#cbd5e1"),
        brandPrimary: Color(hex: "#00d1b2"),
        stateSuccess: Color(hex: "#22c55e"),
        stateDanger: Color(hex: "#ef4444"),
        stateWarning: Color(hex: "#f59e0b"),
        stateInfo: Color(hex: "#3b82f6")
      )
    ),
  ]
}

final class ThemeManager: ObservableObject {
  @Published var currentThemeId: ThemeId = .catppuccinMocha

  var theme: ThemeDefinition {
    ThemeRegistry.themes[currentThemeId] ?? ThemeRegistry.themes[.catppuccinMocha]!
  }
}

private struct MetricCard: View {
  let title: String
  let value: String
  let palette: ThemePalette

  var body: some View {
    VStack(alignment: .leading, spacing: 6) {
      Text(title)
        .font(.headline)
        .foregroundColor(palette.heading)
      Text(value)
        .font(.title2.bold())
        .foregroundColor(palette.bodyPrimary)
      Text("Metric pulled from theme colors.")
        .font(.subheadline)
        .foregroundColor(palette.bodySecondary)
    }
    .padding()
    .background(palette.backgroundSurface)
    .cornerRadius(12)
  }
}

struct ComponentsView: View {
  @StateObject private var themeManager = ThemeManager()

  var palette: ThemePalette { themeManager.theme.palette }

  var body: some View {
    ScrollView {
      VStack(alignment: .leading, spacing: 20) {
        HStack {
          VStack(alignment: .leading, spacing: 4) {
            Text("SwiftUI Preview")
              .font(.largeTitle.bold())
              .foregroundColor(palette.heading)
            Text("Switch themes to see palette-driven UI updates.")
              .foregroundColor(palette.bodySecondary)
          }
          Spacer()
          Picker("Theme", selection: $themeManager.currentThemeId) {
            ForEach(ThemeId.allCases, id: \.self) { id in
              Text(ThemeRegistry.themes[id]?.label ?? id.rawValue)
                .tag(id)
            }
          }
          .pickerStyle(.menu)
        }

        VStack(alignment: .leading, spacing: 12) {
          Text("Typography")
            .font(.title2.bold())
            .foregroundColor(palette.heading)
          Text("Heading 1").font(.largeTitle).foregroundColor(palette.heading)
          Text("Body text using palette tokens.")
            .foregroundColor(palette.bodyPrimary)
          Text("Secondary text muted for hierarchy.")
            .foregroundColor(palette.bodySecondary)
        }
        .padding()
        .background(palette.backgroundSurface)
        .cornerRadius(12)

        VStack(alignment: .leading, spacing: 12) {
          Text("Buttons")
            .font(.title2.bold())
            .foregroundColor(palette.heading)
          HStack(spacing: 12) {
            button(label: "Primary", color: palette.brandPrimary)
            button(label: "Success", color: palette.stateSuccess)
            button(label: "Danger", color: palette.stateDanger)
          }
        }
        .padding()
        .background(palette.backgroundSurface)
        .cornerRadius(12)

        VStack(alignment: .leading, spacing: 12) {
          Text("Metrics")
            .font(.title2.bold())
            .foregroundColor(palette.heading)
          LazyVGrid(columns: Array(repeating: GridItem(.flexible(), spacing: 12), count: 2), spacing: 12) {
            MetricCard(title: "Active Users", value: "1,248", palette: palette)
            MetricCard(title: "Conversions", value: "3.8%", palette: palette)
            MetricCard(title: "Latency", value: "123 ms", palette: palette)
            MetricCard(title: "Errors", value: "0.12%", palette: palette)
          }
        }
        .padding()
        .background(palette.backgroundSurface)
        .cornerRadius(12)
      }
      .padding()
    }
    .background(palette.backgroundBase.ignoresSafeArea())
  }

  private func button(label: String, color: Color) -> some View {
    Text(label)
      .padding(.horizontal, 12)
      .padding(.vertical, 8)
      .background(color)
      .foregroundColor(.white)
      .cornerRadius(8)
  }
}

extension Color {
  init(hex: String) {
    var hexString = hex
    if hexString.hasPrefix("#") {
      hexString.removeFirst()
    }
    var int: UInt64 = 0
    Scanner(string: hexString).scanHexInt64(&int)
    let r, g, b: UInt64
    if hexString.count == 6 {
      r = (int >> 16) & 0xff
      g = (int >> 8) & 0xff
      b = int & 0xff
    } else {
      r = 255; g = 255; b = 255
    }
    self.init(.sRGB, red: Double(r) / 255, green: Double(g) / 255, blue: Double(b) / 255, opacity: 1)
  }
}

#Preview {
  ComponentsView()
}

