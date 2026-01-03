/* eslint-env browser */
import { describe, it, expect, beforeEach } from 'vitest';
import {
  initTheme,
  wireFlavorSelector,
  enhanceAccessibility,
  initNavbar,
} from '../src/index';

// happy-dom environment is configured in vitest.config.ts

const STORAGE_KEY = 'turbo-theme';

function createBaseDom() {
  // Reset document
  document.documentElement.className = '';
  document.body.innerHTML = `
    <div class="navbar-item has-dropdown">
      <button id="theme-flavor-trigger" aria-expanded="false"></button>
      <div id="theme-flavor-menu"></div>
    </div>
    <select id="theme-flavor-select" disabled></select>
    <div class="highlight"><pre></pre></div>
  `;
}

describe('index.ts branch coverage', () => {
  beforeEach(() => {
    // Reset localStorage and DOM
    const store: Record<string, string> = {};
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (k: string) => (k in store ? store[k] : null),
        setItem: (k: string, v: string) => {
          store[k] = v;
        },
        removeItem: (k: string) => {
          delete store[k];
        },
        clear: () => {
          Object.keys(store).forEach((k) => delete store[k]);
        },
      },
      writable: true,
    });
    createBaseDom();
  });

  it('initTheme preserves already-applied theme and migrates legacy storage', async () => {
    // Simulate blocking script applying initial theme
    document.documentElement.classList.add('theme-catppuccin-mocha');
    const winWithInitial = window as Window & { __INITIAL_THEME__?: string };
    winWithInitial.__INITIAL_THEME__ = 'catppuccin-mocha';
    window.localStorage.setItem('bulma-theme-flavor', 'bulma-light');

    await initTheme(document, window);

    // Legacy migration: ensure storage migrated and legacy key removed
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('bulma-light');
    expect(window.localStorage.getItem('bulma-theme-flavor')).toBeNull();
  });

  it('initTheme falls back to default when saved theme is unknown', async () => {
    window.localStorage.setItem(STORAGE_KEY, 'unknown-theme');
    await initTheme(document, window);
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('unknown-theme'); // saved value unchanged
    expect(document.documentElement.classList.contains('theme-catppuccin-mocha')).toBe(
      true
    );
  });

  it('wireFlavorSelector returns cleanup immediately when required nodes are missing', () => {
    document.body.innerHTML = ''; // force missing elements
    const { cleanup } = wireFlavorSelector(document, window);
    expect(cleanup).toBeTypeOf('function');
  });

  it('wireFlavorSelector toggles dropdown and applies selected theme', async () => {
    createBaseDom();
    const trigger = document.getElementById(
      'theme-flavor-trigger'
    ) as HTMLButtonElement;
    const menu = document.getElementById('theme-flavor-menu') as HTMLElement;

    const { cleanup } = wireFlavorSelector(document, window);

    // Open dropdown
    trigger.click();
    expect(
      menu.closest('.navbar-item.has-dropdown')?.classList.contains('is-active')
    ).toBe(true);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    // Select first generated theme
    const item = menu.querySelector(
      '[data-theme-id="catppuccin-mocha"]'
    ) as HTMLButtonElement;
    item?.click();
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('catppuccin-mocha');
    expect(document.documentElement.classList.contains('theme-catppuccin-mocha')).toBe(
      true
    );

    // Close via outside click branch
    document.body.click();
    expect(trigger.getAttribute('aria-expanded')).toBe('false');

    cleanup();
  });

  it('wireFlavorSelector supports keyboard navigation and Escape close', () => {
    createBaseDom();
    const trigger = document.getElementById(
      'theme-flavor-trigger'
    ) as HTMLButtonElement;
    const menu = document.getElementById('theme-flavor-menu') as HTMLElement;
    const select = document.getElementById('theme-flavor-select') as HTMLSelectElement;

    const { cleanup } = wireFlavorSelector(document, window);

    // Open via keyboard (ArrowDown) and focus first item
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    const first = menu.querySelector('.theme-item') as HTMLButtonElement;
    expect(first.getAttribute('tabindex')).toBe('0');

    // Change via native select path
    select.value = 'github-light';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('github-light');

    // Close via Escape
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(trigger.getAttribute('aria-expanded')).toBe('false');

    cleanup();
  });

  it('enhanceAccessibility adds attributes to code blocks', () => {
    // One pre is already in base DOM
    enhanceAccessibility(document);
    const pre = document.querySelector('.highlight > pre') as HTMLElement;
    expect(pre.getAttribute('tabindex')).toBe('0');
    expect(pre.getAttribute('role')).toBe('region');
    expect(pre.getAttribute('aria-label')).toBe('Code block');
  });

  it('initNavbar marks matching nav item active', () => {
    document.body.innerHTML = `
      <nav>
        <a class="navbar-item" href="http://localhost/home">Home</a>
        <a class="navbar-item" href="http://localhost/current">Current</a>
      </nav>
    `;
    const url = new URL('http://localhost/current');
    Object.defineProperty(window, 'location', { value: url, writable: true });
    Object.defineProperty(document, 'location', { value: url, writable: true });
    initNavbar(document);
    const items = Array.from(document.querySelectorAll('.navbar-item'));
    const active = items.find((el) => el.classList.contains('is-active'));
    expect(active?.getAttribute('href')).toBe('http://localhost/current');
  });
});
