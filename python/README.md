# turbo-themes (Python)

Generated Python package exposing design tokens and theme registry from Turbo Themes.

## Usage

```python
from turbo_themes import THEMES

theme = THEMES["catppuccin-mocha"]
print(theme.background.base)
```

This package is generated from `dist/tokens.json` via `scripts/generate-python.mjs`.
