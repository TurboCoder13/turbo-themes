"""Theme registry for Turbo Themes.

Generated from dist/tokens.json.
"""

from __future__ import annotations

from typing import Dict
from .tokens import (
    ThemeTokens,
    BackgroundTokens,
    TextTokens,
    BrandTokens,
    StateTokens,
    BorderTokens,
    AccentTokens,
    HeadingTokens,
    BodyTokens,
    LinkTokens,
    SelectionTokens,
    BlockquoteTokens,
    CodeTokens,
    TableTokens,
    ContentTokens,
    TypographyTokens,
)

THEMES: Dict[str, ThemeTokens] = {
    "bulma-light": ThemeTokens(
        background=BackgroundTokens(
            base="#ffffff", surface="#f5f5f5", overlay="#eeeeee"
        ),
        text=TextTokens(primary="#363636", secondary="#4a4a4a", inverse="#ffffff"),
        brand=BrandTokens(primary="#00d1b2"),
        state=StateTokens(
            info="#3e8ed0", success="#48c78e", warning="#ffe08a", danger="#f14668"
        ),
        border=BorderTokens(default="#dbdbdb"),
        accent=AccentTokens(link="#485fc7"),
        content=ContentTokens(
            heading=HeadingTokens(
                h1="#00d1b2",
                h2="#485fc7",
                h3="#3e8ed0",
                h4="#48c78e",
                h5="#ffe08a",
                h6="#f14668",
            ),
            body=BodyTokens(primary="#4a4a4a", secondary="#7a7a7a"),
            link=LinkTokens(default="#485fc7"),
            selection=SelectionTokens(fg="#363636", bg="#b5d5ff"),
            blockquote=BlockquoteTokens(border="#dbdbdb", fg="#4a4a4a", bg="#f5f5f5"),
            codeInline=CodeTokens(fg="#f14668", bg="#f5f5f5"),
            codeBlock=CodeTokens(fg="#363636", bg="#f5f5f5"),
            table=TableTokens(
                border="#dbdbdb",
                stripe="#fafafa",
                theadBg="#f0f0f0",
                cellBg="#ffffff",
                headerFg="#363636",
            ),
        ),
        typography=TypographyTokens(
            fonts={
                "sans": '"Nunito Sans", BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
                "mono": '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            },
            webFonts=(
                "https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,400;0,6..12,600;0,6..12,700;1,6..12,400&display=swap",
                "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap",
            ),
        ),
    ),
    "bulma-dark": ThemeTokens(
        background=BackgroundTokens(
            base="#141414", surface="#1f1f1f", overlay="#2b2b2b"
        ),
        text=TextTokens(primary="#f5f5f5", secondary="#dbdbdb", inverse="#141414"),
        brand=BrandTokens(primary="#00d1b2"),
        state=StateTokens(
            info="#3e8ed0", success="#48c78e", warning="#ffe08a", danger="#f14668"
        ),
        border=BorderTokens(default="#363636"),
        accent=AccentTokens(link="#485fc7"),
        content=ContentTokens(
            heading=HeadingTokens(
                h1="#00d1b2",
                h2="#7289da",
                h3="#5dade2",
                h4="#58d68d",
                h5="#f7dc6f",
                h6="#f1948a",
            ),
            body=BodyTokens(primary="#dbdbdb", secondary="#b5b5b5"),
            link=LinkTokens(default="#485fc7"),
            selection=SelectionTokens(fg="#f5f5f5", bg="#3273dc"),
            blockquote=BlockquoteTokens(border="#363636", fg="#dbdbdb", bg="#1f1f1f"),
            codeInline=CodeTokens(fg="#f14668", bg="#2b2b2b"),
            codeBlock=CodeTokens(fg="#f5f5f5", bg="#2b2b2b"),
            table=TableTokens(
                border="#404040",
                stripe="#1c1c1c",
                theadBg="#2d2d2d",
                cellBg="#1a1a1a",
                headerFg="#f5f5f5",
            ),
        ),
        typography=TypographyTokens(
            fonts={
                "sans": '"Nunito Sans", BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
                "mono": '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            },
            webFonts=(
                "https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,400;0,6..12,600;0,6..12,700;1,6..12,400&display=swap",
                "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap",
            ),
        ),
    ),
    "catppuccin-latte": ThemeTokens(
        background=BackgroundTokens(
            base="#eff1f5", surface="#e6e9ef", overlay="#dce0e8"
        ),
        text=TextTokens(primary="#4c4f69", secondary="#6c6f85", inverse="#eff1f5"),
        brand=BrandTokens(primary="#1e66f5"),
        state=StateTokens(
            info="#04a5e5", success="#40a02b", warning="#df8e1d", danger="#d20f39"
        ),
        border=BorderTokens(default="#9ca0b0"),
        accent=AccentTokens(link="#1e66f5"),
        content=ContentTokens(
            heading=HeadingTokens(
                h1="#40a02b",
                h2="#1e66f5",
                h3="#209fb5",
                h4="#df8e1d",
                h5="#8839ef",
                h6="#d20f39",
            ),
            body=BodyTokens(primary="#4c4f69", secondary="#6c6f85"),
            link=LinkTokens(default="#1e66f5"),
            selection=SelectionTokens(fg="#4c4f69", bg="#8c8fa1"),
            blockquote=BlockquoteTokens(border="#8c8fa1", fg="#4c4f69", bg="#e6e9ef"),
            codeInline=CodeTokens(fg="#4c4f69", bg="#ccd0da"),
            codeBlock=CodeTokens(fg="#4c4f69", bg="#ccd0da"),
            table=TableTokens(
                border="#8c8fa1",
                stripe="#ccd0da",
                theadBg="#bcc0cc",
                cellBg=None,
                headerFg=None,
            ),
        ),
        typography=TypographyTokens(
            fonts={
                "sans": 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
                "mono": 'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            },
            webFonts=(
                "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap",
                "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap",
            ),
        ),
    ),
    "catppuccin-frappe": ThemeTokens(
        background=BackgroundTokens(
            base="#303446", surface="#292c3c", overlay="#232634"
        ),
        text=TextTokens(primary="#c6d0f5", secondary="#a5adce", inverse="#303446"),
        brand=BrandTokens(primary="#8caaee"),
        state=StateTokens(
            info="#99d1db", success="#a6d189", warning="#e5c890", danger="#e78284"
        ),
        border=BorderTokens(default="#737994"),
        accent=AccentTokens(link="#8caaee"),
        content=ContentTokens(
            heading=HeadingTokens(
                h1="#a6d189",
                h2="#8caaee",
                h3="#85c1dc",
                h4="#e5c890",
                h5="#ca9ee6",
                h6="#e78284",
            ),
            body=BodyTokens(primary="#c6d0f5", secondary="#a5adce"),
            link=LinkTokens(default="#8caaee"),
            selection=SelectionTokens(fg="#c6d0f5", bg="#838ba7"),
            blockquote=BlockquoteTokens(border="#838ba7", fg="#c6d0f5", bg="#292c3c"),
            codeInline=CodeTokens(fg="#c6d0f5", bg="#414559"),
            codeBlock=CodeTokens(fg="#c6d0f5", bg="#414559"),
            table=TableTokens(
                border="#838ba7",
                stripe="#414559",
                theadBg="#51576d",
                cellBg=None,
                headerFg=None,
            ),
        ),
        typography=TypographyTokens(
            fonts={
                "sans": 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
                "mono": 'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            },
            webFonts=(
                "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap",
                "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap",
            ),
        ),
    ),
    "catppuccin-macchiato": ThemeTokens(
        background=BackgroundTokens(
            base="#24273a", surface="#1e2030", overlay="#181926"
        ),
        text=TextTokens(primary="#cad3f5", secondary="#a5adcb", inverse="#24273a"),
        brand=BrandTokens(primary="#8aadf4"),
        state=StateTokens(
            info="#91d7e3", success="#a6da95", warning="#eed49f", danger="#ed8796"
        ),
        border=BorderTokens(default="#6e738d"),
        accent=AccentTokens(link="#8aadf4"),
        content=ContentTokens(
            heading=HeadingTokens(
                h1="#a6da95",
                h2="#8aadf4",
                h3="#7dc4e4",
                h4="#eed49f",
                h5="#c6a0f6",
                h6="#ed8796",
            ),
            body=BodyTokens(primary="#cad3f5", secondary="#a5adcb"),
            link=LinkTokens(default="#8aadf4"),
            selection=SelectionTokens(fg="#cad3f5", bg="#8087a2"),
            blockquote=BlockquoteTokens(border="#8087a2", fg="#cad3f5", bg="#1e2030"),
            codeInline=CodeTokens(fg="#cad3f5", bg="#363a4f"),
            codeBlock=CodeTokens(fg="#cad3f5", bg="#363a4f"),
            table=TableTokens(
                border="#8087a2",
                stripe="#363a4f",
                theadBg="#494d64",
                cellBg=None,
                headerFg=None,
            ),
        ),
        typography=TypographyTokens(
            fonts={
                "sans": 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
                "mono": 'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            },
            webFonts=(
                "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap",
                "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap",
            ),
        ),
    ),
    "catppuccin-mocha": ThemeTokens(
        background=BackgroundTokens(
            base="#1e1e2e", surface="#181825", overlay="#11111b"
        ),
        text=TextTokens(primary="#cdd6f4", secondary="#a6adc8", inverse="#1e1e2e"),
        brand=BrandTokens(primary="#89b4fa"),
        state=StateTokens(
            info="#89dceb", success="#a6e3a1", warning="#f9e2af", danger="#f38ba8"
        ),
        border=BorderTokens(default="#6c7086"),
        accent=AccentTokens(link="#89b4fa"),
        content=ContentTokens(
            heading=HeadingTokens(
                h1="#a6e3a1",
                h2="#89b4fa",
                h3="#74c7ec",
                h4="#f9e2af",
                h5="#cba6f7",
                h6="#f38ba8",
            ),
            body=BodyTokens(primary="#cdd6f4", secondary="#a6adc8"),
            link=LinkTokens(default="#89b4fa"),
            selection=SelectionTokens(fg="#cdd6f4", bg="#7f849c"),
            blockquote=BlockquoteTokens(border="#7f849c", fg="#cdd6f4", bg="#181825"),
            codeInline=CodeTokens(fg="#cdd6f4", bg="#313244"),
            codeBlock=CodeTokens(fg="#cdd6f4", bg="#313244"),
            table=TableTokens(
                border="#7f849c",
                stripe="#313244",
                theadBg="#45475a",
                cellBg=None,
                headerFg=None,
            ),
        ),
        typography=TypographyTokens(
            fonts={
                "sans": 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
                "mono": 'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            },
            webFonts=(
                "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap",
                "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap",
            ),
        ),
    ),
    "dracula": ThemeTokens(
        background=BackgroundTokens(
            base="#282a36", surface="#21222c", overlay="#44475a"
        ),
        text=TextTokens(primary="#f8f8f2", secondary="#6272a4", inverse="#282a36"),
        brand=BrandTokens(primary="#bd93f9"),
        state=StateTokens(
            info="#8be9fd", success="#50fa7b", warning="#f1fa8c", danger="#ff5555"
        ),
        border=BorderTokens(default="#44475a"),
        accent=AccentTokens(link="#8be9fd"),
        content=ContentTokens(
            heading=HeadingTokens(
                h1="#ff79c6",
                h2="#bd93f9",
                h3="#8be9fd",
                h4="#50fa7b",
                h5="#ffb86c",
                h6="#f1fa8c",
            ),
            body=BodyTokens(primary="#f8f8f2", secondary="#6272a4"),
            link=LinkTokens(default="#8be9fd"),
            selection=SelectionTokens(fg="#f8f8f2", bg="#44475a"),
            blockquote=BlockquoteTokens(border="#bd93f9", fg="#6272a4", bg="#21222c"),
            codeInline=CodeTokens(fg="#50fa7b", bg="#21222c"),
            codeBlock=CodeTokens(fg="#f8f8f2", bg="#21222c"),
            table=TableTokens(
                border="#44475a",
                stripe="#21222c",
                theadBg="#44475a",
                cellBg="#282a36",
                headerFg="#f8f8f2",
            ),
        ),
        typography=TypographyTokens(
            fonts={
                "sans": 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                "mono": '"Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            },
            webFonts=(
                "https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&display=swap",
            ),
        ),
    ),
    "github-light": ThemeTokens(
        background=BackgroundTokens(
            base="#ffffff", surface="#f6f8fa", overlay="#f6f8fa"
        ),
        text=TextTokens(primary="#1f2328", secondary="#59636e", inverse="#ffffff"),
        brand=BrandTokens(primary="#0969da"),
        state=StateTokens(
            info="#0969da", success="#1a7f37", warning="#9a6700", danger="#d1242f"
        ),
        border=BorderTokens(default="#d1d9e0"),
        accent=AccentTokens(link="#0969da"),
        content=ContentTokens(
            heading=HeadingTokens(
                h1="#1a7f37",
                h2="#0969da",
                h3="#0969da",
                h4="#9a6700",
                h5="#1a7f37",
                h6="#d1242f",
            ),
            body=BodyTokens(primary="#1f2328", secondary="#59636e"),
            link=LinkTokens(default="#0969da"),
            selection=SelectionTokens(fg="#1f2328", bg="#b6e3ff"),
            blockquote=BlockquoteTokens(border="#d1d9e0", fg="#59636e", bg="#f6f8fa"),
            codeInline=CodeTokens(fg="#1f2328", bg="#f6f8fa"),
            codeBlock=CodeTokens(fg="#1f2328", bg="#f6f8fa"),
            table=TableTokens(
                border="#d1d9e0",
                stripe="#f6f8fa",
                theadBg="#eaeef2",
                cellBg="#ffffff",
                headerFg="#1f2328",
            ),
        ),
        typography=TypographyTokens(
            fonts={
                "sans": '"Mona Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
                "mono": '"Hubot Sans", ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, "Liberation Mono", monospace',
            },
            webFonts=(
                "https://github.githubassets.com/assets/mona-sans-webfont.woff2",
                "https://github.githubassets.com/assets/hubot-sans-webfont.woff2",
            ),
        ),
    ),
    "github-dark": ThemeTokens(
        background=BackgroundTokens(
            base="#0d1117", surface="#151b23", overlay="#010409"
        ),
        text=TextTokens(primary="#f0f6fc", secondary="#9198a1", inverse="#ffffff"),
        brand=BrandTokens(primary="#1f6feb"),
        state=StateTokens(
            info="#4493f8", success="#3fb950", warning="#d29922", danger="#f85149"
        ),
        border=BorderTokens(default="#3d444d"),
        accent=AccentTokens(link="#4493f8"),
        content=ContentTokens(
            heading=HeadingTokens(
                h1="#3fb950",
                h2="#4493f8",
                h3="#1f6feb",
                h4="#d29922",
                h5="#3fb950",
                h6="#f85149",
            ),
            body=BodyTokens(primary="#f0f6fc", secondary="#9198a1"),
            link=LinkTokens(default="#4493f8"),
            selection=SelectionTokens(fg="#f0f6fc", bg="#264f78"),
            blockquote=BlockquoteTokens(border="#3d444d", fg="#9198a1", bg="#151b23"),
            codeInline=CodeTokens(fg="#f0f6fc", bg="#151b23"),
            codeBlock=CodeTokens(fg="#f0f6fc", bg="#151b23"),
            table=TableTokens(
                border="#3d444d",
                stripe="#161b22",
                theadBg="#21262d",
                cellBg="#0d1117",
                headerFg="#f0f6fc",
            ),
        ),
        typography=TypographyTokens(
            fonts={
                "sans": '"Mona Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
                "mono": '"Hubot Sans", ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, "Liberation Mono", monospace',
            },
            webFonts=(
                "https://github.githubassets.com/assets/mona-sans-webfont.woff2",
                "https://github.githubassets.com/assets/hubot-sans-webfont.woff2",
            ),
        ),
    ),
}
THEME_IDS = tuple(THEMES.keys())

__all__ = ["THEMES", "THEME_IDS", "ThemeTokens"]
