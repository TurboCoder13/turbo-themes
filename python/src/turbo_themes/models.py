# SPDX-License-Identifier: MIT
"""Type definitions for Turbo Themes.

Provides typed access to theme tokens loaded from tokens.json.
Replaces the complex quicktype-generated types with a simpler implementation.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum
from typing import Any


class Appearance(Enum):
    """Theme appearance (light or dark)."""

    LIGHT = "light"
    DARK = "dark"


class TokenNamespace:
    """Dynamic namespace for accessing nested token values.

    Converts dict keys to attributes for convenient access like:
        tokens.background.base
        tokens.text.primary
    """

    def __init__(self, data: dict[str, Any]) -> None:
        self._data = data
        for key, value in data.items():
            if isinstance(value, dict):
                setattr(self, key, TokenNamespace(value))
            else:
                setattr(self, key, value)

    def __repr__(self) -> str:
        return f"TokenNamespace({self._data!r})"

    def __getattr__(self, name: str) -> Any:
        # Return None for missing attributes instead of raising
        return None

    def to_dict(self) -> dict[str, Any]:
        """Convert back to dictionary.

        Returns:
            The underlying dictionary data.
        """
        return self._data


@dataclass
class Tokens:
    """Design tokens for a theme.

    Provides attribute access to nested token categories:
        tokens.background.base
        tokens.text.primary
        tokens.state.info
    """

    _data: dict[str, Any] = field(repr=False)

    # Core token categories (always present)
    accent: TokenNamespace = field(init=False)
    background: TokenNamespace = field(init=False)
    border: TokenNamespace = field(init=False)
    brand: TokenNamespace = field(init=False)
    content: TokenNamespace = field(init=False)
    state: TokenNamespace = field(init=False)
    text: TokenNamespace = field(init=False)
    typography: TokenNamespace = field(init=False)

    # Optional token categories
    animation: TokenNamespace | None = field(init=False, default=None)
    components: TokenNamespace | None = field(init=False, default=None)
    elevation: TokenNamespace | None = field(init=False, default=None)
    opacity: TokenNamespace | None = field(init=False, default=None)
    spacing: TokenNamespace | None = field(init=False, default=None)

    def __post_init__(self) -> None:
        """Initialize token namespaces from data dict."""
        for key, value in self._data.items():
            if isinstance(value, dict):
                setattr(self, key, TokenNamespace(value))
            else:
                setattr(self, key, value)

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> Tokens:
        """Create Tokens from a dictionary.

        Args:
            data: Dictionary containing token categories.

        Returns:
            Tokens instance with parsed token namespaces.
        """
        return cls(_data=data)

    def to_dict(self) -> dict[str, Any]:
        """Convert back to dictionary.

        Returns:
            The underlying dictionary data.
        """
        return self._data


@dataclass
class ThemeValue:
    """A single theme definition with metadata and tokens."""

    id: str
    label: str
    vendor: str
    appearance: Appearance
    tokens: Tokens
    description: str | None = None
    icon_url: str | None = None

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> ThemeValue:
        """Create ThemeValue from a dictionary.

        Args:
            data: Dictionary containing theme metadata and tokens.

        Returns:
            ThemeValue instance with parsed data.
        """
        return cls(
            id=data["id"],
            label=data["label"],
            vendor=data["vendor"],
            appearance=Appearance(data["appearance"]),
            tokens=Tokens.from_dict(data["tokens"]),
            description=data.get("$description"),
            icon_url=data.get("iconUrl"),
        )

    def to_dict(self) -> dict[str, Any]:
        """Convert back to dictionary.

        Returns:
            Dictionary representation of the theme.
        """
        result = {
            "id": self.id,
            "label": self.label,
            "vendor": self.vendor,
            "appearance": self.appearance.value,
            "tokens": self.tokens.to_dict(),
        }
        if self.description:
            result["$description"] = self.description
        if self.icon_url:
            result["iconUrl"] = self.icon_url
        return result


@dataclass
class ByVendorValue:
    """Vendor metadata."""

    name: str
    homepage: str
    themes: list[str]

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> ByVendorValue:
        """Create ByVendorValue from a dictionary.

        Args:
            data: Dictionary containing vendor metadata.

        Returns:
            ByVendorValue instance with parsed data.
        """
        return cls(
            name=data["name"],
            homepage=data["homepage"],
            themes=data["themes"],
        )


@dataclass
class Meta:
    """Metadata about the token collection."""

    theme_ids: list[str] = field(default_factory=list)
    vendors: list[str] = field(default_factory=list)
    total_themes: int = 0
    light_themes: int = 0
    dark_themes: int = 0

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> Meta:
        """Create Meta from a dictionary.

        Args:
            data: Dictionary containing collection metadata.

        Returns:
            Meta instance with parsed data.
        """
        return cls(
            theme_ids=data.get("themeIds", []),
            vendors=data.get("vendors", []),
            total_themes=data.get("totalThemes", 0),
            light_themes=data.get("lightThemes", 0),
            dark_themes=data.get("darkThemes", 0),
        )


@dataclass
class TurboThemes:
    """Root container for all themes and metadata."""

    themes: dict[str, ThemeValue]
    by_vendor: dict[str, ByVendorValue] | None = None
    meta: Meta | None = None
    schema: str | None = None
    version: str | None = None
    description: str | None = None
    generated: str | None = None

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> TurboThemes:
        """Create TurboThemes from a dictionary.

        Args:
            data: Dictionary containing themes and metadata.

        Returns:
            TurboThemes instance with parsed themes.
        """
        themes = {
            theme_id: ThemeValue.from_dict(theme_data)
            for theme_id, theme_data in data.get("themes", {}).items()
        }

        by_vendor = None
        if "byVendor" in data:
            by_vendor = {
                vendor_id: ByVendorValue.from_dict(vendor_data)
                for vendor_id, vendor_data in data["byVendor"].items()
            }

        meta = None
        if "meta" in data:
            meta = Meta.from_dict(data["meta"])

        generated = data.get("$generated")

        return cls(
            themes=themes,
            by_vendor=by_vendor,
            meta=meta,
            schema=data.get("$schema"),
            version=data.get("$version"),
            description=data.get("$description"),
            generated=generated,
        )


def turbo_themes_from_dict(data: dict[str, Any]) -> TurboThemes:
    """Create TurboThemes from a dictionary.

    Compatibility function matching quicktype output.

    Args:
        data: Dictionary containing themes and metadata.

    Returns:
        TurboThemes instance with parsed themes.
    """
    return TurboThemes.from_dict(data)


__all__ = [
    "Appearance",
    "ByVendorValue",
    "Meta",
    "ThemeValue",
    "TokenNamespace",
    "Tokens",
    "TurboThemes",
    "turbo_themes_from_dict",
]
