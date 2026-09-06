"""Theme manager for Turbo Themes.

Provides high-level utilities for managing themes, applying them to applications,
and handling theme switching.
"""

from __future__ import annotations

import json
from dataclasses import dataclass
from typing import Any

from .css_variables import generate_css_variables
from .models import ThemeValue, Tokens
from .themes import THEMES


@dataclass
class ThemeInfo:
    """Information about a theme."""

    id: str
    name: str
    vendor: str
    appearance: str
    tokens: Tokens

    @classmethod
    def from_theme_value(cls, theme_value: ThemeValue) -> ThemeInfo:
        """Create ThemeInfo from a ThemeValue object.

        Args:
            theme_value: Quicktype-generated ThemeValue object.

        Returns:
            Parsed ThemeInfo instance.
        """
        return cls(
            id=theme_value.id,
            name=theme_value.label,
            vendor=theme_value.vendor,
            appearance=theme_value.appearance.value,
            tokens=theme_value.tokens,
        )


class ThemeManager:
    """Manages theme switching and application.

    Args:
        default_theme: Theme ID to load initially.

    Raises:
        ValueError: If the requested default theme is missing.
    """

    def __init__(self, default_theme: str = "catppuccin-mocha"):
        self._current_theme_id = default_theme
        self._themes: dict[str, ThemeInfo] = {}

        # Pre-computed filter caches for O(1) lookup
        self._by_appearance: dict[str, dict[str, ThemeInfo]] = {"light": {}, "dark": {}}
        self._by_vendor: dict[str, dict[str, ThemeInfo]] = {}

        # Load themes from Quicktype-generated ThemeValue objects
        for theme_id, theme_value in THEMES.items():
            theme_info = ThemeInfo.from_theme_value(theme_value)
            self._themes[theme_id] = theme_info

            # Build filter caches
            if theme_info.appearance in self._by_appearance:
                self._by_appearance[theme_info.appearance][theme_id] = theme_info
            self._by_vendor.setdefault(theme_info.vendor, {})[theme_id] = theme_info

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
    def available_themes(self) -> dict[str, ThemeInfo]:
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

    def get_theme(self, theme_id: str) -> ThemeInfo | None:
        """Get a specific theme by ID.

        Args:
            theme_id: The ID of the theme to retrieve.

        Returns:
            The ThemeInfo object if found, otherwise None.
        """
        return self._themes.get(theme_id)

    def get_themes_by_appearance(self, appearance: str) -> dict[str, ThemeInfo]:
        """Get themes filtered by appearance (light/dark).

        Uses pre-computed cache for O(1) lookup.

        Args:
            appearance: The desired appearance ('light' or 'dark').

        Returns:
            A dictionary of themes matching the specified appearance.
        """
        return self._by_appearance.get(appearance, {}).copy()

    def get_themes_by_vendor(self, vendor: str) -> dict[str, ThemeInfo]:
        """Get themes filtered by vendor.

        Uses pre-computed cache for O(1) lookup.

        Args:
            vendor: The vendor name to filter by.

        Returns:
            A dictionary of themes from the specified vendor.
        """
        return self._by_vendor.get(vendor, {}).copy()

    def cycle_theme(self, appearance: str | None = None) -> str:
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

    def apply_theme_to_css_variables(self) -> dict[str, str]:
        """Generate CSS custom properties for the current theme.

        Uses centralized mapping configuration from config/token-mappings.json
        to ensure consistency with TypeScript and other platforms.

        The actual generation logic is delegated to the css_variables module
        which provides focused, testable helper functions.

        Returns:
            Mapping of CSS variable names to values.
        """
        return generate_css_variables(self.current_theme.tokens)

    def _theme_tokens_to_dict(self, tokens: Tokens) -> dict[str, Any]:
        """Convert Tokens to dict for JSON serialization.

        Args:
            tokens: Token dataclass tree to convert.

        Returns:
            Dict representation of the provided tokens.
        """
        result: dict[str, Any] = {}

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

    def export_theme_json(self, theme_id: str | None = None) -> str:
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

    def save_theme_to_file(self, filepath: str, theme_id: str | None = None) -> None:
        """Save theme(s) to a JSON file.

        Args:
            filepath: Destination file path.
            theme_id: Optional theme to export; exports all when omitted.
        """
        json_data = self.export_theme_json(theme_id)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(json_data)


# Module-level holder so reset can swap the manager without a ``global``
# statement; index 0 is always the live instance.
_manager_box: list[ThemeManager] = [ThemeManager()]


def get_theme_manager() -> ThemeManager:
    """Get the default global theme manager instance.

    Note: This returns the global singleton. Theme state is preserved
    between calls. For test isolation, create a new ThemeManager instance.

    Returns:
        The global ThemeManager instance.
    """
    return _manager_box[0]


def reset_theme_manager() -> None:
    """Reset the global theme manager to default state.

    This is primarily useful for test cleanup to avoid cross-test pollution.
    """
    _manager_box[0] = ThemeManager()


def set_theme(theme_id: str) -> None:
    """Set the global theme.

    Args:
        theme_id: The ID of the theme to set globally.
    """
    get_theme_manager().set_theme(theme_id)


def get_current_theme() -> ThemeInfo:
    """Get the current global theme.

    Returns:
        The current active global theme.
    """
    return get_theme_manager().current_theme


def cycle_theme(appearance: str | None = None) -> str:
    """Cycle the global theme.

    Args:
        appearance: Optional filter for theme appearance (light/dark).

    Returns:
        The ID of the newly set global theme.
    """
    return get_theme_manager().cycle_theme(appearance)
