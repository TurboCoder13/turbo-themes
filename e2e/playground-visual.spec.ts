import { test, expect } from '@playwright/test';

const themes = ['catppuccin-mocha', 'dracula', 'github-dark'];

const examples = [
  { name: 'html-vanilla', path: '/examples/html-vanilla/index.html' },
  { name: 'tailwind', path: '/examples/tailwind/index.html' },
  { name: 'jekyll', path: '/examples/jekyll/index.html' },
];

for (const example of examples) {
  for (const theme of themes) {
    test(`${example.name} - ${theme}`, async ({ page }) => {
      await page.goto(example.path);
      await page.waitForLoadState('networkidle');
      await page.evaluate((t) => {
        document.documentElement.dataset.theme = t;
      }, theme);
      await expect(page).toHaveScreenshot(`${example.name}-${theme}.png`);
    });
  }
}
