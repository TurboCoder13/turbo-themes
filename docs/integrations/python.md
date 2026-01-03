# Python Integration

1. Install:

   ```bash
   pip install turbo-themes
   ```

2. Use the registry:

   ```python
   from turbo_themes import ThemeManager, list_theme_ids

   mgr = ThemeManager()
   print(list_theme_ids())
   tokens = mgr.tokens
   ```

3. Regenerate from source (when developing the monorepo):

   ```bash
   bun run build
   node scripts/generate-python.mjs
   ```
