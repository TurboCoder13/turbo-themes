# SPDX-License-Identifier: MIT
# AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY
# Generated from: schema/turbo-themes-output.schema.json
# Generator: scripts/codegen/generate-python-types.mjs
# Run: bun run generate:types:python

"""Generated type definitions from JSON Schema.

This module provides dataclass definitions that match the JSON Schema
for turbo-themes output format.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Dict, List, Optional



class Appearance(Enum):
    """Theme appearance mode."""

    LIGHT = "light"
    DARK = "dark"


@dataclass
class Meta:
    """Generated dataclass for Meta."""

    theme_ids: Optional[List[str]] = None
    vendors: Optional[List[str]] = None
    total_themes: Optional[int] = None
    light_themes: Optional[int] = None
    dark_themes: Optional[int] = None

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Meta":
        """Create Meta from dictionary."""
        return cls(
            theme_ids=data.get("themeIds"),
            vendors=data.get("vendors"),
            total_themes=data.get("totalThemes"),
            light_themes=data.get("lightThemes"),
            dark_themes=data.get("darkThemes"),
        )

@dataclass
class Vendor:
    """Generated dataclass for Vendor."""

    name: str
    homepage: str
    themes: List[str]

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Vendor":
        """Create Vendor from dictionary."""
        return cls(
            name=data["name"],
            homepage=data["homepage"],
            themes=data["themes"],
        )

@dataclass
class Background:
    """Generated dataclass for Background."""

    base: str
    surface: str
    overlay: str

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Background":
        """Create Background from dictionary."""
        return cls(
            base=data["base"],
            surface=data["surface"],
            overlay=data["overlay"],
        )

@dataclass
class Text:
    """Generated dataclass for Text."""

    primary: str
    secondary: str
    inverse: str

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Text":
        """Create Text from dictionary."""
        return cls(
            primary=data["primary"],
            secondary=data["secondary"],
            inverse=data["inverse"],
        )

@dataclass
class Brand:
    """Generated dataclass for Brand."""

    primary: str
    primary_text: str

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Brand":
        """Create Brand from dictionary."""
        return cls(
            primary=data["primary"],
            primary_text=data["primaryText"],
        )

@dataclass
class State:
    """Generated dataclass for State."""

    info: str
    success: str
    warning: str
    danger: str

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "State":
        """Create State from dictionary."""
        return cls(
            info=data["info"],
            success=data["success"],
            warning=data["warning"],
            danger=data["danger"],
        )

@dataclass
class Border:
    """Generated dataclass for Border."""

    default: str

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Border":
        """Create Border from dictionary."""
        return cls(
            default=data["default"],
        )

@dataclass
class Accent:
    """Generated dataclass for Accent."""

    link: str

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Accent":
        """Create Accent from dictionary."""
        return cls(
            link=data["link"],
        )

@dataclass
class Spacing:
    """Generated dataclass for Spacing."""

    xs: str
    sm: str
    md: str
    lg: str
    xl: str

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Spacing":
        """Create Spacing from dictionary."""
        return cls(
            xs=data["xs"],
            sm=data["sm"],
            md=data["md"],
            lg=data["lg"],
            xl=data["xl"],
        )

@dataclass
class Elevation:
    """Generated dataclass for Elevation."""

    none: str
    sm: str
    md: str
    lg: str
    xl: str

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Elevation":
        """Create Elevation from dictionary."""
        return cls(
            none=data["none"],
            sm=data["sm"],
            md=data["md"],
            lg=data["lg"],
            xl=data["xl"],
        )

@dataclass
class Animation:
    """Generated dataclass for Animation."""

    duration_fast: str
    duration_normal: str
    duration_slow: str
    easing_default: str
    easing_emphasized: str

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Animation":
        """Create Animation from dictionary."""
        return cls(
            duration_fast=data["durationFast"],
            duration_normal=data["durationNormal"],
            duration_slow=data["durationSlow"],
            easing_default=data["easingDefault"],
            easing_emphasized=data["easingEmphasized"],
        )

@dataclass
class Opacity:
    """Generated dataclass for Opacity."""

    disabled: float
    hover: float
    pressed: float

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Opacity":
        """Create Opacity from dictionary."""
        return cls(
            disabled=data["disabled"],
            hover=data["hover"],
            pressed=data["pressed"],
        )

@dataclass
class Fonts:
    """Generated dataclass for Fonts."""

    sans: str
    mono: str

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Fonts":
        """Create Fonts from dictionary."""
        return cls(
            sans=data["sans"],
            mono=data["mono"],
        )

@dataclass
class Heading:
    """Generated dataclass for Heading."""

    h1: str
    h2: str
    h3: str
    h4: str
    h5: str
    h6: str

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Heading":
        """Create Heading from dictionary."""
        return cls(
            h1=data["h1"],
            h2=data["h2"],
            h3=data["h3"],
            h4=data["h4"],
            h5=data["h5"],
            h6=data["h6"],
        )

@dataclass
class Body:
    """Generated dataclass for Body."""

    primary: str
    secondary: str

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Body":
        """Create Body from dictionary."""
        return cls(
            primary=data["primary"],
            secondary=data["secondary"],
        )

@dataclass
class Link:
    """Generated dataclass for Link."""

    default: str

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Link":
        """Create Link from dictionary."""
        return cls(
            default=data["default"],
        )

@dataclass
class Selection:
    """Generated dataclass for Selection."""

    fg: str
    bg: str

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Selection":
        """Create Selection from dictionary."""
        return cls(
            fg=data["fg"],
            bg=data["bg"],
        )

@dataclass
class Blockquote:
    """Generated dataclass for Blockquote."""

    border: str
    fg: str
    bg: str

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Blockquote":
        """Create Blockquote from dictionary."""
        return cls(
            border=data["border"],
            fg=data["fg"],
            bg=data["bg"],
        )

@dataclass
class Code:
    """Generated dataclass for Code."""

    fg: str
    bg: str

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Code":
        """Create Code from dictionary."""
        return cls(
            fg=data["fg"],
            bg=data["bg"],
        )

@dataclass
class Table:
    """Generated dataclass for Table."""

    border: str
    stripe: str
    thead_bg: str
    cell_bg: Optional[str] = None
    header_fg: Optional[str] = None

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Table":
        """Create Table from dictionary."""
        return cls(
            border=data["border"],
            stripe=data["stripe"],
            thead_bg=data["theadBg"],
            cell_bg=data.get("cellBg"),
            header_fg=data.get("headerFg"),
        )

@dataclass
class CardComponent:
    """Generated dataclass for CardComponent."""

    bg: Optional[str] = None
    border: Optional[str] = None
    header_bg: Optional[str] = None
    footer_bg: Optional[str] = None

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "CardComponent":
        """Create CardComponent from dictionary."""
        return cls(
            bg=data.get("bg"),
            border=data.get("border"),
            header_bg=data.get("headerBg"),
            footer_bg=data.get("footerBg"),
        )

@dataclass
class MessageComponent:
    """Generated dataclass for MessageComponent."""

    bg: Optional[str] = None
    header_bg: Optional[str] = None
    border: Optional[str] = None
    body_fg: Optional[str] = None

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "MessageComponent":
        """Create MessageComponent from dictionary."""
        return cls(
            bg=data.get("bg"),
            header_bg=data.get("headerBg"),
            border=data.get("border"),
            body_fg=data.get("bodyFg"),
        )

@dataclass
class PanelComponent:
    """Generated dataclass for PanelComponent."""

    bg: Optional[str] = None
    header_bg: Optional[str] = None
    header_fg: Optional[str] = None
    border: Optional[str] = None
    block_bg: Optional[str] = None
    block_hover_bg: Optional[str] = None
    block_active_bg: Optional[str] = None

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "PanelComponent":
        """Create PanelComponent from dictionary."""
        return cls(
            bg=data.get("bg"),
            header_bg=data.get("headerBg"),
            header_fg=data.get("headerFg"),
            border=data.get("border"),
            block_bg=data.get("blockBg"),
            block_hover_bg=data.get("blockHoverBg"),
            block_active_bg=data.get("blockActiveBg"),
        )

@dataclass
class BoxComponent:
    """Generated dataclass for BoxComponent."""

    bg: Optional[str] = None
    border: Optional[str] = None

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "BoxComponent":
        """Create BoxComponent from dictionary."""
        return cls(
            bg=data.get("bg"),
            border=data.get("border"),
        )

@dataclass
class NotificationComponent:
    """Generated dataclass for NotificationComponent."""

    bg: Optional[str] = None
    border: Optional[str] = None

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "NotificationComponent":
        """Create NotificationComponent from dictionary."""
        return cls(
            bg=data.get("bg"),
            border=data.get("border"),
        )

@dataclass
class ModalComponent:
    """Generated dataclass for ModalComponent."""

    bg: Optional[str] = None
    card_bg: Optional[str] = None
    header_bg: Optional[str] = None
    footer_bg: Optional[str] = None

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "ModalComponent":
        """Create ModalComponent from dictionary."""
        return cls(
            bg=data.get("bg"),
            card_bg=data.get("cardBg"),
            header_bg=data.get("headerBg"),
            footer_bg=data.get("footerBg"),
        )

@dataclass
class DropdownComponent:
    """Generated dataclass for DropdownComponent."""

    bg: Optional[str] = None
    item_hover_bg: Optional[str] = None
    border: Optional[str] = None

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "DropdownComponent":
        """Create DropdownComponent from dictionary."""
        return cls(
            bg=data.get("bg"),
            item_hover_bg=data.get("itemHoverBg"),
            border=data.get("border"),
        )

@dataclass
class TabsComponent:
    """Generated dataclass for TabsComponent."""

    border: Optional[str] = None
    link_bg: Optional[str] = None
    link_active_bg: Optional[str] = None
    link_hover_bg: Optional[str] = None

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "TabsComponent":
        """Create TabsComponent from dictionary."""
        return cls(
            border=data.get("border"),
            link_bg=data.get("linkBg"),
            link_active_bg=data.get("linkActiveBg"),
            link_hover_bg=data.get("linkHoverBg"),
        )

@dataclass
class Typography:
    """Generated dataclass for Typography."""

    fonts: Fonts
    web_fonts: List[str]

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Typography":
        """Create Typography from dictionary."""
        return cls(
            fonts=Fonts.from_dict(data["fonts"]),
            web_fonts=data["webFonts"],
        )

@dataclass
class Content:
    """Generated dataclass for Content."""

    heading: Heading
    body: Body
    link: Link
    selection: Selection
    blockquote: Blockquote
    code_inline: Code
    code_block: Code
    table: Table

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Content":
        """Create Content from dictionary."""
        return cls(
            heading=Heading.from_dict(data["heading"]),
            body=Body.from_dict(data["body"]),
            link=Link.from_dict(data["link"]),
            selection=Selection.from_dict(data["selection"]),
            blockquote=Blockquote.from_dict(data["blockquote"]),
            code_inline=Code.from_dict(data["codeInline"]),
            code_block=Code.from_dict(data["codeBlock"]),
            table=Table.from_dict(data["table"]),
        )

@dataclass
class Components:
    """Generated dataclass for Components."""

    card: Optional[CardComponent] = None
    message: Optional[MessageComponent] = None
    panel: Optional[PanelComponent] = None
    box: Optional[BoxComponent] = None
    notification: Optional[NotificationComponent] = None
    modal: Optional[ModalComponent] = None
    dropdown: Optional[DropdownComponent] = None
    tabs: Optional[TabsComponent] = None

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Components":
        """Create Components from dictionary."""
        return cls(
            card=CardComponent.from_dict(data["card"]) if "card" in data else None,
            message=MessageComponent.from_dict(data["message"]) if "message" in data else None,
            panel=PanelComponent.from_dict(data["panel"]) if "panel" in data else None,
            box=BoxComponent.from_dict(data["box"]) if "box" in data else None,
            notification=NotificationComponent.from_dict(data["notification"]) if "notification" in data else None,
            modal=ModalComponent.from_dict(data["modal"]) if "modal" in data else None,
            dropdown=DropdownComponent.from_dict(data["dropdown"]) if "dropdown" in data else None,
            tabs=TabsComponent.from_dict(data["tabs"]) if "tabs" in data else None,
        )

@dataclass
class Tokens:
    """Generated dataclass for Tokens."""

    background: Background
    text: Text
    brand: Brand
    state: State
    border: Border
    accent: Accent
    typography: Typography
    content: Content
    spacing: Optional[Spacing] = None
    elevation: Optional[Elevation] = None
    animation: Optional[Animation] = None
    opacity: Optional[Opacity] = None
    components: Optional[Components] = None

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "Tokens":
        """Create Tokens from dictionary."""
        return cls(
            background=Background.from_dict(data["background"]),
            text=Text.from_dict(data["text"]),
            brand=Brand.from_dict(data["brand"]),
            state=State.from_dict(data["state"]),
            border=Border.from_dict(data["border"]),
            accent=Accent.from_dict(data["accent"]),
            typography=Typography.from_dict(data["typography"]),
            content=Content.from_dict(data["content"]),
            spacing=Spacing.from_dict(data["spacing"]) if "spacing" in data else None,
            elevation=Elevation.from_dict(data["elevation"]) if "elevation" in data else None,
            animation=Animation.from_dict(data["animation"]) if "animation" in data else None,
            opacity=Opacity.from_dict(data["opacity"]) if "opacity" in data else None,
            components=Components.from_dict(data["components"]) if "components" in data else None,
        )

@dataclass
class ThemeValue:
    """Generated dataclass for ThemeValue."""

    id: str
    label: str
    vendor: str
    appearance: Any
    tokens: Tokens
    $description: Optional[str] = None
    icon_url: Optional[str] = None

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "ThemeValue":
        """Create ThemeValue from dictionary."""
        return cls(
            id=data["id"],
            label=data["label"],
            vendor=data["vendor"],
            appearance=data["appearance"],
            tokens=Tokens.from_dict(data["tokens"]),
            $description=data.get("$description"),
            icon_url=data.get("iconUrl"),
        )

@dataclass
class TurboThemesOutput:
    """Generated dataclass for TurboThemesOutput."""

    themes: Dict[str, ThemeValue]
    $schema: Optional[str] = None
    $description: Optional[str] = None
    $version: Optional[str] = None
    $generated: Optional[str] = None
    meta: Optional[Meta] = None
    by_vendor: Optional[Dict[str, Vendor]] = None

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "TurboThemesOutput":
        """Create TurboThemesOutput from dictionary."""
        return cls(
            themes=data["themes"],
            $schema=data.get("$schema"),
            $description=data.get("$description"),
            $version=data.get("$version"),
            $generated=data.get("$generated"),
            meta=Meta.from_dict(data["meta"]) if "meta" in data else None,
            by_vendor=data.get("byVendor"),
        )
