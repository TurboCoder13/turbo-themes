# Bootstrap Integration

1. Install the package assets:

   ```bash
   bun add @turbocoder13/turbo-themes
   ```

2. Import the adapter variables before Bootstrap in your Sass entry:

   ```scss
   @use '@turbocoder13/turbo-themes/adapters/bootstrap/variables';
   @use 'bootstrap';
   ```

   When consuming compiled CSS only, include the adapter CSS variables:

   ```html
   <link rel="stylesheet" href="/assets/css/themes/global.css" />
   <link rel="stylesheet" href="/assets/css/adapters/bulma.css" />
   ```

3. Optional helpers:

   ```scss
   @use '@turbocoder13/turbo-themes/adapters/bootstrap/utilities';
   ```

4. Switch themes by setting `data-theme` on `<html>`; CSS variables drive Bootstrap
   tokens at runtime.
