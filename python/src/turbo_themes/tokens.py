"""Typed design tokens for Turbo Themes.

Generated from dist/tokens.json.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, Tuple


@dataclass(frozen=True)
class BackgroundTokens:
    base: str
    surface: str
    overlay: str


@dataclass(frozen=True)
class TextTokens:
    primary: str
    secondary: str
    inverse: str


@dataclass(frozen=True)
class BrandTokens:
    primary: str


@dataclass(frozen=True)
class StateTokens:
    info: str
    success: str
    warning: str
    danger: str


@dataclass(frozen=True)
class BorderTokens:
    default: str


@dataclass(frozen=True)
class AccentTokens:
    link: str


@dataclass(frozen=True)
class HeadingTokens:
    h1: str
    h2: str
    h3: str
    h4: str
    h5: str
    h6: str


@dataclass(frozen=True)
class BodyTokens:
    primary: str
    secondary: str


@dataclass(frozen=True)
class LinkTokens:
    default: str


@dataclass(frozen=True)
class SelectionTokens:
    fg: str
    bg: str


@dataclass(frozen=True)
class BlockquoteTokens:
    border: str
    fg: str
    bg: str


@dataclass(frozen=True)
class CodeTokens:
    fg: str
    bg: str


@dataclass(frozen=True)
class SpacingTokens:
    xs: str
    sm: str
    md: str
    lg: str
    xl: str


@dataclass(frozen=True)
class ElevationTokens:
    none: str
    sm: str
    md: str
    lg: str
    xl: str


@dataclass(frozen=True)
class AnimationTokens:
    durationFast: str
    durationNormal: str
    durationSlow: str
    easingDefault: str
    easingEmphasized: str


@dataclass(frozen=True)
class OpacityTokens:
    disabled: float
    hover: float
    pressed: float


@dataclass(frozen=True)
class TableTokens:
    border: str
    stripe: str
    theadBg: str
    cellBg: str | None
    headerFg: str | None


@dataclass(frozen=True)
class ContentTokens:
    heading: HeadingTokens
    body: BodyTokens
    link: LinkTokens
    selection: SelectionTokens
    blockquote: BlockquoteTokens
    codeInline: CodeTokens
    codeBlock: CodeTokens
    table: TableTokens


@dataclass(frozen=True)
class TypographyTokens:
    fonts: Dict[str, str]
    webFonts: Tuple[str, ...]


@dataclass(frozen=True)
class ThemeTokens:
    background: BackgroundTokens
    text: TextTokens
    brand: BrandTokens
    state: StateTokens
    border: BorderTokens
    accent: AccentTokens
    content: ContentTokens
    typography: TypographyTokens
    spacing: SpacingTokens | None = None
    elevation: ElevationTokens | None = None
    animation: AnimationTokens | None = None
    opacity: OpacityTokens | None = None


__all__ = [
    "ThemeTokens",
    "BackgroundTokens",
    "TextTokens",
    "BrandTokens",
    "StateTokens",
    "BorderTokens",
    "AccentTokens",
    "HeadingTokens",
    "BodyTokens",
    "LinkTokens",
    "SelectionTokens",
    "BlockquoteTokens",
    "CodeTokens",
    "TableTokens",
    "ContentTokens",
    "TypographyTokens",
    "SpacingTokens",
    "ElevationTokens",
    "AnimationTokens",
    "OpacityTokens",
]
