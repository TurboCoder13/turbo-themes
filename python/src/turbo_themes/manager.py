"""Theme manager for Turbo Themes.

Provides high-level utilities for managing themes, applying them to applications,
and handling theme switching.
"""

from __future__ import annotations

from typing import Dict, Optional, Any
import json
from dataclasses import dataclass
from .themes import THEMES
from .tokens import ThemeTokens


@dataclass
class ThemeInfo:
    """Information about a theme."""

    id: str
    name: str
    vendor: str
    appearance: str
    tokens: ThemeTokens

    @classmethod
    def from_theme_data(cls, theme_id: str, theme_data: Dict[str, Any]) -> ThemeInfo:
        """Create ThemeInfo from theme data dictionary.

        Args:
            theme_id: Theme identifier.
            theme_data: Raw theme dictionary with metadata and tokens.

        Returns:
            Parsed ThemeInfo instance.
        """
        return cls(
            id=theme_id,
            name=theme_data.get("label", theme_id),
            vendor=theme_data.get("vendor", "unknown"),
            appearance=theme_data.get("appearance", "light"),
            tokens=theme_data["tokens"],
        )


class ThemeManager:
    """Manages theme switching and application."""

    def __init__(self, default_theme: str = "catppuccin-mocha"):
        """Initialize theme manager with default theme.

        Args:
            default_theme: Theme ID to load initially.

        Raises:
            ValueError: If the requested default theme is missing.
        """
        self._current_theme_id = default_theme
        self._themes: Dict[str, ThemeInfo] = {}

        # Load themes
        for theme_id, theme_data in THEMES.items():
            self._themes[theme_id] = ThemeInfo.from_theme_data(
                theme_id,
                {
                    "label": f"{theme_id.replace('-', ' ').title()}",
                    "vendor": theme_id.split("-")[0] if "-" in theme_id else theme_id,
                    "appearance": (
                        "dark"
                        if "dark" in theme_id
                        or "mocha" in theme_id
                        or "macchiato" in theme_id
                        or "frappe" in theme_id
                        or "dracula" in theme_id
                        else "light"
                    ),
                    "tokens": theme_data,
                },
            )

        # Validate default theme exists
        if default_theme not in self._themes:
            available = list(self._themes.keys())
            raise ValueError(
                f"Default theme '{default_theme}' not found. Available: {available}"
            )

    @property
    def current_theme(self) -> ThemeInfo:
        """Get the current theme.

        Returns:
            The current active theme.
        """
        return self._themes[self._current_theme_id]

    @property
    def current_theme_id(self) -> str:
        """Get the current theme ID.

        Returns:
            The ID of the current active theme.
        """
        return self._current_theme_id

    @property
    def available_themes(self) -> Dict[str, ThemeInfo]:
        """Get all available themes.

        Returns:
            A dictionary of all available themes, keyed by their IDs.
        """
        return self._themes.copy()

    def set_theme(self, theme_id: str) -> None:
        """Set the current theme.

        Args:
            theme_id: Theme identifier to activate.

        Raises:
            ValueError: If the theme is not registered.
        """
        if theme_id not in self._themes:
            raise ValueError(
                f"Theme '{theme_id}' not found. Available: {list(self._themes.keys())}"
            )
        self._current_theme_id = theme_id

    def get_theme(self, theme_id: str) -> Optional[ThemeInfo]:
        """Get a specific theme by ID.

        Args:
            theme_id: The ID of the theme to retrieve.

        Returns:
            The ThemeInfo object if found, otherwise None.
        """
        return self._themes.get(theme_id)

    def get_themes_by_appearance(self, appearance: str) -> Dict[str, ThemeInfo]:
        """Get themes filtered by appearance (light/dark).

        Args:
            appearance: The desired appearance ('light' or 'dark').

        Returns:
            A dictionary of themes matching the specified appearance.
        """
        return {tid: t for tid, t in self._themes.items() if t.appearance == appearance}

    def get_themes_by_vendor(self, vendor: str) -> Dict[str, ThemeInfo]:
        """Get themes filtered by vendor.

        Args:
            vendor: The vendor name to filter by.

        Returns:
            A dictionary of themes from the specified vendor.
        """
        return {tid: t for tid, t in self._themes.items() if t.vendor == vendor}

    def cycle_theme(self, appearance: Optional[str] = None) -> str:
        """Cycle to the next theme, optionally filtered by appearance.

        Args:
            appearance: Optional appearance filter ("light" or "dark").

        Returns:
            ID of the newly selected theme.

        Raises:
            ValueError: If no themes exist for the requested appearance.
        """
        themes = list(self.available_themes.keys())
        if appearance:
            themes = [
                tid for tid in themes if self._themes[tid].appearance == appearance
            ]

        if not themes:
            raise ValueError(f"No themes found for appearance '{appearance}'")

        current_index = (
            themes.index(self._current_theme_id)
            if self._current_theme_id in themes
            else 0
        )
        next_index = (current_index + 1) % len(themes)
        next_theme_id = themes[next_index]

        self.set_theme(next_theme_id)
        return next_theme_id

    def apply_theme_to_css_variables(self) -> Dict[str, str]:
        """Generate CSS custom properties for the current theme.

        Returns:
            Mapping of CSS variable names to values.
        """
        theme = self.current_theme
        variables: Dict[str, str] = {}

        # Helper to add CSS variable
        def add_var(name: str, value: str) -> None:
            variables[f"--turbo-{name}"] = value

        # Background
        add_var("bg-base", theme.tokens.background.base)
        add_var("bg-surface", theme.tokens.background.surface)
        add_var("bg-surface-alt", theme.tokens.background.overlay)

        # Text
        add_var("text-primary", theme.tokens.text.primary)
        add_var("text-secondary", theme.tokens.text.secondary)
        add_var("text-inverse", theme.tokens.text.inverse)

        # Brand
        add_var("brand-primary", theme.tokens.brand.primary)

        # State
        add_var("state-info", theme.tokens.state.info)
        add_var("state-success", theme.tokens.state.success)
        add_var("state-warning", theme.tokens.state.warning)
        add_var("state-danger", theme.tokens.state.danger)

        # Border
        add_var("border-default", theme.tokens.border.default)

        # Accent
        add_var("accent-link", theme.tokens.accent.link)

        # Typography
        add_var("font-sans", theme.tokens.typography.fonts["sans"])
        add_var("font-mono", theme.tokens.typography.fonts["mono"])

        # Content
        add_var("heading-h1", theme.tokens.content.heading.h1)
        add_var("heading-h2", theme.tokens.content.heading.h2)
        add_var("heading-h3", theme.tokens.content.heading.h3)
        add_var("heading-h4", theme.tokens.content.heading.h4)
        add_var("heading-h5", theme.tokens.content.heading.h5)
        add_var("heading-h6", theme.tokens.content.heading.h6)

        add_var("body-primary", theme.tokens.content.body.primary)
        add_var("body-secondary", theme.tokens.content.body.secondary)
        add_var("link-default", theme.tokens.content.link.default)

        add_var("selection-fg", theme.tokens.content.selection.fg)
        add_var("selection-bg", theme.tokens.content.selection.bg)

        add_var("blockquote-border", theme.tokens.content.blockquote.border)
        add_var("blockquote-fg", theme.tokens.content.blockquote.fg)
        add_var("blockquote-bg", theme.tokens.content.blockquote.bg)

        add_var("code-inline-fg", theme.tokens.content.codeInline.fg)
        add_var("code-inline-bg", theme.tokens.content.codeInline.bg)
        add_var("code-block-fg", theme.tokens.content.codeBlock.fg)
        add_var("code-block-bg", theme.tokens.content.codeBlock.bg)

        add_var("table-border", theme.tokens.content.table.border)
        add_var("table-stripe", theme.tokens.content.table.stripe)
        add_var("table-thead-bg", theme.tokens.content.table.theadBg)

        # Optional tokens
        if theme.tokens.spacing:
            add_var("spacing-xs", theme.tokens.spacing.xs)
            add_var("spacing-sm", theme.tokens.spacing.sm)
            add_var("spacing-md", theme.tokens.spacing.md)
            add_var("spacing-lg", theme.tokens.spacing.lg)
            add_var("spacing-xl", theme.tokens.spacing.xl)

        if theme.tokens.elevation:
            add_var("elevation-none", theme.tokens.elevation.none)
            add_var("elevation-sm", theme.tokens.elevation.sm)
            add_var("elevation-md", theme.tokens.elevation.md)
            add_var("elevation-lg", theme.tokens.elevation.lg)
            add_var("elevation-xl", theme.tokens.elevation.xl)

        if theme.tokens.animation:
            add_var("animation-duration-fast", theme.tokens.animation.durationFast)
            add_var("animation-duration-normal", theme.tokens.animation.durationNormal)
            add_var("animation-duration-slow", theme.tokens.animation.durationSlow)
            add_var("animation-easing-default", theme.tokens.animation.easingDefault)
            add_var(
                "animation-easing-emphasized", theme.tokens.animation.easingEmphasized
            )

        if theme.tokens.opacity:
            add_var("opacity-disabled", str(theme.tokens.opacity.disabled))
            add_var("opacity-hover", str(theme.tokens.opacity.hover))
            add_var("opacity-pressed", str(theme.tokens.opacity.pressed))

        return variables

    def _theme_tokens_to_dict(self, tokens: ThemeTokens) -> Dict[str, Any]:
        """Convert ThemeTokens dataclass to dict for JSON serialization.

        Args:
            tokens: Token dataclass tree to convert.

        Returns:
            Dict representation of the provided tokens.
        """
        result: Dict[str, Any] = {}

        # Convert each field recursively
        for field_name, field_value in tokens.__dict__.items():
            if field_value is None:
                result[field_name] = None
            elif hasattr(field_value, "__dict__"):
                # Recursively convert nested dataclasses
                result[field_name] = self._theme_tokens_to_dict(field_value)
            elif isinstance(field_value, tuple):
                result[field_name] = list(field_value)
            else:
                result[field_name] = field_value

        return result

    def export_theme_json(self, theme_id: Optional[str] = None) -> str:
        """Export theme(s) as JSON string.

        Args:
            theme_id: Optional theme ID to export; exports all when omitted.

        Returns:
            JSON string containing theme data.

        Raises:
            ValueError: If the requested theme does not exist.
        """
        if theme_id:
            theme = self.get_theme(theme_id)
            if not theme:
                raise ValueError(f"Theme '{theme_id}' not found")
            return json.dumps(
                {
                    theme_id: {
                        "id": theme.id,
                        "label": theme.name,
                        "vendor": theme.vendor,
                        "appearance": theme.appearance,
                        "tokens": self._theme_tokens_to_dict(theme.tokens),
                    }
                },
                indent=2,
            )
        else:
            # Export all themes
            themes_data = {}
            for tid, theme in self._themes.items():
                themes_data[tid] = {
                    "id": theme.id,
                    "label": theme.name,
                    "vendor": theme.vendor,
                    "appearance": theme.appearance,
                    "tokens": self._theme_tokens_to_dict(theme.tokens),
                }
            return json.dumps(themes_data, indent=2)

    def save_theme_to_file(self, filepath: str, theme_id: Optional[str] = None) -> None:
        """Save theme(s) to a JSON file.

        Args:
            filepath: Destination file path.
            theme_id: Optional theme to export; exports all when omitted.
        """
        json_data = self.export_theme_json(theme_id)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(json_data)


# Global instance for convenience
_default_manager = ThemeManager()


def get_theme_manager() -> ThemeManager:
    """Get the default global theme manager instance.

    Returns:
        The global ThemeManager instance.
    """
    # Reset to default to avoid cross-test pollution or stale state
    global _default_manager
    if _default_manager.current_theme_id != "catppuccin-mocha":
        _default_manager = ThemeManager()
    return _default_manager


def set_theme(theme_id: str) -> None:
    """Set the global theme.

    Args:
        theme_id: The ID of the theme to set globally.
    """
    _default_manager.set_theme(theme_id)


def get_current_theme() -> ThemeInfo:
    """Get the current global theme.

    Returns:
        The current active global theme.
    """
    return _default_manager.current_theme


def cycle_theme(appearance: Optional[str] = None) -> str:
    """Cycle the global theme.

    Args:
        appearance: Optional filter for theme appearance (light/dark).

    Returns:
        The ID of the newly set global theme.
    """
    return _default_manager.cycle_theme(appearance)
