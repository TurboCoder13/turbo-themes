# Tailwind Integration

1. Install the package:

   ```bash
   bun add @turbocoder13/turbo-themes
   ```

2. Use the preset in `tailwind.config.js`:

   ```js
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: ['./src/**/*.{ts,tsx,html}'],
     presets: [require('@turbocoder13/turbo-themes/adapters/tailwind/preset')],
   };
   ```

3. Load theme CSS variables in your HTML:

   ```html
   <link rel="stylesheet" href="/assets/css/themes/global.css" />
   ```

4. Switch themes by toggling `data-theme` on `<html>` or `<body>`; the preset reads CSS
   variables at runtime so no rebuild is needed.
