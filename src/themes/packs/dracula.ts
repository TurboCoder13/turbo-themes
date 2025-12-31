import { layoutTokens } from '../shared-tokens.js';
import type { ThemePackage } from '../types.js';

/**
 * Dracula theme
 * Based on the official Dracula color palette
 * @see https://draculatheme.com/contribute
 */
export const draculaThemes: ThemePackage = {
  id: 'dracula',
  name: 'Dracula',
  homepage: 'https://draculatheme.com/',
  flavors: [
    {
      id: 'dracula',
      label: 'Dracula',
      vendor: 'dracula',
      appearance: 'dark',
      iconUrl: '/assets/img/dracula-logo.png',
      tokens: {
        ...layoutTokens,
        background: {
          base: '#282a36', // Background
          surface: '#21222c', // Current Line (darker)
          overlay: '#44475a', // Selection
        },
        text: {
          primary: '#f8f8f2', // Foreground
          secondary: '#6272a4', // Comment
          inverse: '#282a36',
        },
        brand: {
          primary: '#bd93f9', // Purple
        },
        state: {
          info: '#8be9fd', // Cyan
          success: '#50fa7b', // Green
          warning: '#f1fa8c', // Yellow
          danger: '#ff5555', // Red
        },
        border: {
          default: '#44475a', // Selection color
        },
        accent: {
          link: '#8be9fd', // Cyan
        },
        typography: {
          fonts: {
            sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            mono: '"Fira Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          },
          webFonts: [
            'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&display=swap',
          ],
        },
        content: {
          heading: {
            h1: '#ff79c6', // Pink
            h2: '#bd93f9', // Purple
            h3: '#8be9fd', // Cyan
            h4: '#50fa7b', // Green
            h5: '#ffb86c', // Orange
            h6: '#f1fa8c', // Yellow
          },
          body: {
            primary: '#f8f8f2', // Foreground
            secondary: '#6272a4', // Comment
          },
          link: {
            default: '#8be9fd', // Cyan
          },
          selection: {
            fg: '#f8f8f2',
            bg: '#44475a', // Selection
          },
          blockquote: {
            border: '#bd93f9', // Purple
            fg: '#6272a4', // Comment
            bg: '#21222c',
          },
          codeInline: {
            fg: '#50fa7b', // Green
            bg: '#21222c',
          },
          codeBlock: {
            fg: '#f8f8f2',
            bg: '#21222c',
          },
          table: {
            border: '#44475a',
            stripe: '#21222c',
            theadBg: '#44475a',
            cellBg: '#282a36',
            headerFg: '#f8f8f2',
          },
        },
        components: {
          card: {
            bg: '#21222c',
            border: '#6272a4',
            headerBg: '#282a36',
            footerBg: '#21222c',
          },
          message: {
            bg: '#282a36',
            headerBg: '#44475a',
            border: '#6272a4',
            bodyFg: '#f8f8f2',
          },
          panel: {
            bg: '#21222c',
            headerBg: '#44475a',
            headerFg: '#f8f8f2',
            border: '#6272a4',
            blockBg: '#282a36',
            blockHoverBg: '#2e303e',
            blockActiveBg: '#44475a',
          },
          box: {
            bg: '#21222c',
            border: '#6272a4',
          },
          notification: {
            bg: '#282a36',
            border: '#6272a4',
          },
          modal: {
            bg: 'rgba(40, 42, 54, 0.9)',
            cardBg: '#21222c',
            headerBg: '#282a36',
            footerBg: '#21222c',
          },
          dropdown: {
            bg: '#21222c',
            itemHoverBg: '#2e303e',
            border: '#6272a4',
          },
          tabs: {
            border: '#6272a4',
            linkBg: '#2e303e',
            linkActiveBg: '#21222c',
            linkHoverBg: '#44475a',
          },
        },
      },
    },
  ],
} as const;
