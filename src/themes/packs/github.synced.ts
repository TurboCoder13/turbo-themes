import { layoutTokens } from '../shared-tokens.js';
import type { ThemePackage } from '../types.js';

/**
 * GitHub themes - auto-synced from @primer/primitives
 * Based on GitHub's Primer design system colors
 * @see https://primer.style/foundations/color
 *
 * DO NOT EDIT MANUALLY - regenerate with: node scripts/sync-github.mjs
 */
export const githubSynced: ThemePackage = {
  id: 'github',
  name: 'GitHub (synced)',
  homepage: 'https://primer.style/',
  flavors: [
    {
      id: 'github-light',
      label: 'GitHub Light',
      vendor: 'github',
      appearance: 'light',
      iconUrl: '/assets/img/github-logo-light.png',
      tokens: {
        ...layoutTokens,
        background: {
          base: '#ffffff',
          surface: '#f6f8fa',
          overlay: '#f6f8fa',
        },
        text: {
          primary: '#1f2328',
          secondary: '#59636e',
          inverse: '#ffffff',
        },
        brand: {
          primary: '#0969da',
        },
        state: {
          info: '#0969da',
          success: '#1a7f37',
          warning: '#9a6700',
          danger: '#d1242f',
        },
        border: {
          default: '#d1d9e0',
        },
        accent: {
          link: '#0969da',
        },
        typography: {
          fonts: {
            sans: '"Mona Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
            mono: '"Hubot Sans", ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, "Liberation Mono", monospace',
          },
          webFonts: [
            'https://github.githubassets.com/assets/mona-sans-webfont.woff2',
            'https://github.githubassets.com/assets/hubot-sans-webfont.woff2',
          ],
        },
        content: {
          heading: {
            h1: '#1a7f37',
            h2: '#0969da',
            h3: '#0969da',
            h4: '#9a6700',
            h5: '#1a7f37',
            h6: '#d1242f',
          },
          body: {
            primary: '#1f2328',
            secondary: '#59636e',
          },
          link: {
            default: '#0969da',
          },
          selection: {
            fg: '#1f2328',
            bg: '#b6e3ff',
          },
          blockquote: {
            border: '#d1d9e0',
            fg: '#59636e',
            bg: '#f6f8fa',
          },
          codeInline: {
            fg: '#1f2328',
            bg: '#f6f8fa',
          },
          codeBlock: {
            fg: '#1f2328',
            bg: '#f6f8fa',
          },
          table: {
            border: '#d1d9e0',
            stripe: '#f6f8fa',
            theadBg: '#eaeef2',
            cellBg: '#ffffff',
            headerFg: '#1f2328',
          },
        },
        components: {
          card: {
            bg: '#ffffff',
            border: '#d1d9e0',
            headerBg: '#f6f8fa',
            footerBg: '#f6f8fa',
          },
          message: {
            bg: '#f6f8fa',
            headerBg: '#eaeef2',
            border: '#d1d9e0',
            bodyFg: '#1f2328',
          },
          panel: {
            bg: '#ffffff',
            headerBg: '#f6f8fa',
            headerFg: '#1f2328',
            border: '#d1d9e0',
            blockBg: '#f6f8fa',
            blockHoverBg: '#eaeef2',
            blockActiveBg: '#ddf4ff',
          },
          box: {
            bg: '#ffffff',
            border: '#d1d9e0',
          },
          notification: {
            bg: '#f6f8fa',
            border: '#d1d9e0',
          },
          modal: {
            bg: 'rgba(31, 35, 40, 0.5)',
            cardBg: '#ffffff',
            headerBg: '#f6f8fa',
            footerBg: '#f6f8fa',
          },
          dropdown: {
            bg: '#ffffff',
            itemHoverBg: '#f6f8fa',
            border: '#d1d9e0',
          },
          tabs: {
            border: '#d1d9e0',
            linkBg: '#f6f8fa',
            linkActiveBg: '#ffffff',
            linkHoverBg: '#eaeef2',
          },
        },
      },
    },
    {
      id: 'github-dark',
      label: 'GitHub Dark',
      vendor: 'github',
      appearance: 'dark',
      iconUrl: '/assets/img/github-logo-dark.png',
      tokens: {
        ...layoutTokens,
        background: {
          base: '#0d1117',
          surface: '#151b23',
          overlay: '#010409',
        },
        text: {
          primary: '#f0f6fc',
          secondary: '#9198a1',
          inverse: '#ffffff',
        },
        brand: {
          primary: '#1f6feb',
        },
        state: {
          info: '#4493f8',
          success: '#3fb950',
          warning: '#d29922',
          danger: '#f85149',
        },
        border: {
          default: '#3d444d',
        },
        accent: {
          link: '#4493f8',
        },
        typography: {
          fonts: {
            sans: '"Mona Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
            mono: '"Hubot Sans", ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, "Liberation Mono", monospace',
          },
          webFonts: [
            'https://github.githubassets.com/assets/mona-sans-webfont.woff2',
            'https://github.githubassets.com/assets/hubot-sans-webfont.woff2',
          ],
        },
        content: {
          heading: {
            h1: '#3fb950',
            h2: '#4493f8',
            h3: '#1f6feb',
            h4: '#d29922',
            h5: '#3fb950',
            h6: '#f85149',
          },
          body: {
            primary: '#f0f6fc',
            secondary: '#9198a1',
          },
          link: {
            default: '#4493f8',
          },
          selection: {
            fg: '#f0f6fc',
            bg: '#264f78',
          },
          blockquote: {
            border: '#3d444d',
            fg: '#9198a1',
            bg: '#151b23',
          },
          codeInline: {
            fg: '#f0f6fc',
            bg: '#151b23',
          },
          codeBlock: {
            fg: '#f0f6fc',
            bg: '#151b23',
          },
          table: {
            border: '#3d444d',
            stripe: '#161b22',
            theadBg: '#21262d',
            cellBg: '#0d1117',
            headerFg: '#f0f6fc',
          },
        },
        components: {
          card: {
            bg: '#161b22',
            border: '#3d444d',
            headerBg: '#21262d',
            footerBg: '#161b22',
          },
          message: {
            bg: '#161b22',
            headerBg: '#21262d',
            border: '#3d444d',
            bodyFg: '#e6edf3',
          },
          panel: {
            bg: '#161b22',
            headerBg: '#21262d',
            headerFg: '#f0f6fc',
            border: '#3d444d',
            blockBg: '#0d1117',
            blockHoverBg: '#1c2128',
            blockActiveBg: '#264f78',
          },
          box: {
            bg: '#161b22',
            border: '#3d444d',
          },
          notification: {
            bg: '#161b22',
            border: '#3d444d',
          },
          modal: {
            bg: 'rgba(1, 4, 9, 0.8)',
            cardBg: '#161b22',
            headerBg: '#21262d',
            footerBg: '#161b22',
          },
          dropdown: {
            bg: '#161b22',
            itemHoverBg: '#1c2128',
            border: '#3d444d',
          },
          tabs: {
            border: '#3d444d',
            linkBg: '#1c2128',
            linkActiveBg: '#161b22',
            linkHoverBg: '#21262d',
          },
        },
      },
    },
  ],
} as const;
