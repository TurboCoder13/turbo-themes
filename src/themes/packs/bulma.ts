import { layoutTokens } from '../shared-tokens.js';
import type { ThemePackage } from '../types.js';

/**
 * Bulma default themes - Light and Dark variants
 * Based on Bulma's default color scheme with enhanced typography
 * @see https://bulma.io/documentation/customize/with-sass/
 *
 * Typography: Nunito Sans - A modern, friendly sans-serif that
 * complements Bulma's clean, European design aesthetic.
 * Monospace: JetBrains Mono for code blocks.
 */
export const bulmaThemes: ThemePackage = {
  id: 'bulma',
  name: 'Bulma',
  homepage: 'https://bulma.io/',
  flavors: [
    {
      id: 'bulma-light',
      label: 'Bulma Light',
      vendor: 'bulma',
      appearance: 'light',
      iconUrl: '/assets/img/turbo-themes-logo.png',
      tokens: {
        ...layoutTokens,
        background: {
          base: '#ffffff',
          surface: '#f5f5f5',
          overlay: '#eeeeee',
        },
        text: {
          primary: '#363636',
          secondary: '#4a4a4a',
          inverse: '#ffffff',
        },
        brand: {
          primary: '#00d1b2', // Bulma turquoise
        },
        state: {
          info: '#3e8ed0',
          success: '#48c78e',
          warning: '#ffe08a',
          danger: '#f14668',
        },
        border: {
          default: '#dbdbdb',
        },
        accent: {
          link: '#485fc7',
        },
        typography: {
          fonts: {
            sans: '"Nunito Sans", BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
            mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          },
          webFonts: [
            'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,400;0,6..12,600;0,6..12,700;1,6..12,400&display=swap',
            'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap',
          ],
        },
        content: {
          heading: {
            // Colorful headings using Bulma's vibrant palette
            h1: '#00d1b2', // Turquoise (primary brand)
            h2: '#485fc7', // Purple (link color)
            h3: '#3e8ed0', // Blue (info)
            h4: '#48c78e', // Green (success)
            h5: '#ffe08a', // Yellow (warning) - darkened for light bg
            h6: '#f14668', // Red (danger)
          },
          body: {
            primary: '#4a4a4a',
            secondary: '#7a7a7a',
          },
          link: {
            default: '#485fc7',
          },
          selection: {
            fg: '#363636',
            bg: '#b5d5ff',
          },
          blockquote: {
            border: '#dbdbdb',
            fg: '#4a4a4a',
            bg: '#f5f5f5',
          },
          codeInline: {
            fg: '#f14668',
            bg: '#f5f5f5',
          },
          codeBlock: {
            fg: '#363636',
            bg: '#f5f5f5',
          },
          table: {
            border: '#dbdbdb',
            stripe: '#fafafa',
            theadBg: '#f0f0f0',
            cellBg: '#ffffff',
            headerFg: '#363636',
          },
        },
        components: {
          card: {
            bg: '#ffffff',
            border: '#d5d5d5',
            headerBg: '#f5f5f5',
            footerBg: '#fafafa',
          },
          message: {
            bg: '#f8f9fa',
            headerBg: '#eef1f4',
            border: '#d5dbe1',
            bodyFg: '#4a4a4a',
          },
          panel: {
            bg: '#ffffff',
            headerBg: '#f0f0f0',
            headerFg: '#363636',
            border: '#d5d5d5',
            blockBg: '#fafafa',
            blockHoverBg: '#f5f5f5',
            blockActiveBg: '#eef6fc',
          },
          box: {
            bg: '#ffffff',
            border: '#e0e0e0',
          },
          notification: {
            bg: '#f5f5f5',
            border: '#e0e0e0',
          },
          modal: {
            bg: 'rgba(10, 10, 10, 0.86)',
            cardBg: '#ffffff',
            headerBg: '#f5f5f5',
            footerBg: '#fafafa',
          },
          dropdown: {
            bg: '#ffffff',
            itemHoverBg: '#f5f5f5',
            border: '#dbdbdb',
          },
          tabs: {
            border: '#dbdbdb',
            linkBg: '#f5f5f5',
            linkActiveBg: '#ffffff',
            linkHoverBg: '#eeeeee',
          },
        },
      },
    },
    {
      id: 'bulma-dark',
      label: 'Bulma Dark',
      vendor: 'bulma',
      appearance: 'dark',
      iconUrl: '/assets/img/turbo-themes-logo.png',
      tokens: {
        ...layoutTokens,
        background: {
          base: '#141414',
          surface: '#1f1f1f',
          overlay: '#2b2b2b',
        },
        text: {
          primary: '#f5f5f5',
          secondary: '#dbdbdb',
          inverse: '#141414',
        },
        brand: {
          primary: '#00d1b2', // Bulma turquoise
        },
        state: {
          info: '#3e8ed0',
          success: '#48c78e',
          warning: '#ffe08a',
          danger: '#f14668',
        },
        border: {
          default: '#363636',
        },
        accent: {
          link: '#485fc7',
        },
        typography: {
          fonts: {
            sans: '"Nunito Sans", BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
            mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          },
          webFonts: [
            'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,400;0,6..12,600;0,6..12,700;1,6..12,400&display=swap',
            'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap',
          ],
        },
        content: {
          heading: {
            // Colorful headings using Bulma's vibrant palette (adjusted for dark bg)
            h1: '#00d1b2', // Turquoise (primary brand)
            h2: '#7289da', // Lighter purple for dark mode
            h3: '#5dade2', // Lighter blue for dark mode
            h4: '#58d68d', // Lighter green for dark mode
            h5: '#f7dc6f', // Yellow (good contrast on dark)
            h6: '#f1948a', // Lighter red for dark mode
          },
          body: {
            primary: '#dbdbdb',
            secondary: '#b5b5b5',
          },
          link: {
            default: '#485fc7',
          },
          selection: {
            fg: '#f5f5f5',
            bg: '#3273dc',
          },
          blockquote: {
            border: '#363636',
            fg: '#dbdbdb',
            bg: '#1f1f1f',
          },
          codeInline: {
            fg: '#f14668',
            bg: '#2b2b2b',
          },
          codeBlock: {
            fg: '#f5f5f5',
            bg: '#2b2b2b',
          },
          table: {
            border: '#404040',
            stripe: '#1c1c1c',
            theadBg: '#2d2d2d',
            cellBg: '#1a1a1a',
            headerFg: '#f5f5f5',
          },
        },
        components: {
          card: {
            bg: '#1c1c1c',
            border: '#3a3a3a',
            headerBg: '#252525',
            footerBg: '#1f1f1f',
          },
          message: {
            bg: '#1f1f1f',
            headerBg: '#2a2a2a',
            border: '#404040',
            bodyFg: '#e0e0e0',
          },
          panel: {
            bg: '#1c1c1c',
            headerBg: '#2a2a2a',
            headerFg: '#f5f5f5',
            border: '#3a3a3a',
            blockBg: '#1f1f1f',
            blockHoverBg: '#262626',
            blockActiveBg: '#2d3748',
          },
          box: {
            bg: '#1c1c1c',
            border: '#3a3a3a',
          },
          notification: {
            bg: '#252525',
            border: '#404040',
          },
          modal: {
            bg: 'rgba(0, 0, 0, 0.86)',
            cardBg: '#1c1c1c',
            headerBg: '#252525',
            footerBg: '#1f1f1f',
          },
          dropdown: {
            bg: '#1c1c1c',
            itemHoverBg: '#2a2a2a',
            border: '#404040',
          },
          tabs: {
            border: '#404040',
            linkBg: '#252525',
            linkActiveBg: '#1c1c1c',
            linkHoverBg: '#2a2a2a',
          },
        },
      },
    },
  ],
} as const;
