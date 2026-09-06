import { describe, expect, it, afterEach } from 'vitest';
import { cssForFlavor } from '../../src/themes/css.js';
import { createMockFlavor, createMockTokens } from '../../../../test/helpers/mocks.js';

describe('cssForFlavor - CSS ID escaping', () => {
  it('escapes special characters in flavor ID', () => {
    const flavor = createMockFlavor({ id: 'theme:special' });
    const css = cssForFlavor(flavor);
    expect(css).toContain('data-flavor=');
  });

  it('handles IDs starting with numbers', () => {
    const flavor = createMockFlavor({ id: '123-theme' });
    const css = cssForFlavor(flavor);
    expect(css).toContain('data-flavor=');
  });

  it('handles IDs with spaces', () => {
    const flavor = createMockFlavor({ id: 'my theme' });
    const css = cssForFlavor(flavor);
    expect(css).toContain('data-flavor=');
  });
});

describe('cssForFlavor - CSS escaping fallback', () => {
  // happy-dom exposes CSS as a getter-only global, so swap it via
  // defineProperty and restore the original descriptor afterwards.
  const originalDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'CSS');

  afterEach(() => {
    if (originalDescriptor) {
      Object.defineProperty(globalThis, 'CSS', originalDescriptor);
    } else {
      delete (globalThis as { CSS?: unknown }).CSS;
    }
  });

  it('uses fallback escaping when CSS.escape is unavailable', () => {
    // @ts-expect-error - intentionally removing for test
    Object.defineProperty(globalThis, 'CSS', { configurable: true, value: undefined });

    const flavor = createMockFlavor({ id: 'test:theme' });
    const css = cssForFlavor(flavor);
    expect(css).toContain('data-flavor=');
    expect(css).toContain('.highlight');
  });

  it('handles null character in ID with fallback', () => {
    // @ts-expect-error - intentionally removing for test
    Object.defineProperty(globalThis, 'CSS', { configurable: true, value: undefined });

    const flavor = createMockFlavor({ id: 'test\0theme' });
    const css = cssForFlavor(flavor);
    expect(css).toContain('data-flavor=');
  });
});

describe('cssForFlavor - edge cases', () => {
  it('handles missing optional token paths gracefully', () => {
    const tokens = createMockTokens();
    delete (tokens.content.table as Record<string, unknown>).cellBg;
    delete (tokens.content.table as Record<string, unknown>).headerFg;

    const flavor = createMockFlavor({ tokens });
    const css = cssForFlavor(flavor);

    expect(css).toContain('--theme-table-cell-bg:');
    expect(css).toContain('--theme-table-header-fg:');
  });

  it('handles empty components object', () => {
    const tokens = createMockTokens();
    tokens.components = {};

    const flavor = createMockFlavor({ tokens });
    const css = cssForFlavor(flavor);

    expect(css).toContain('/* SPDX-License-Identifier: MIT */');
  });

  it('handles deeply nested component tokens', () => {
    const tokens = createMockTokens();
    tokens.components = {
      card: { bg: '#ffffff' },
      panel: { bg: '#f5f5f5' },
    };

    const flavor = createMockFlavor({ tokens });
    const css = cssForFlavor(flavor);

    expect(css).toContain('/* Card component tokens */');
    expect(css).toContain('/* Panel component tokens */');
  });

  it('handles null values in token path traversal', () => {
    const tokens = createMockTokens();
    (tokens.content as Record<string, unknown>).heading = null;

    const flavor = createMockFlavor({ tokens });
    const css = cssForFlavor(flavor);

    expect(css).toContain('--theme-h1:');
    expect(css).toContain('/* SPDX-License-Identifier: MIT */');
  });

  it('handles primitive values in token path traversal', () => {
    const tokens = createMockTokens();
    (tokens.content as Record<string, unknown>).blockquote = 'invalid';

    const flavor = createMockFlavor({ tokens });
    const css = cssForFlavor(flavor);

    expect(css).toContain('--theme-blockquote-border:');
  });

  it('handles missing HSL color paths gracefully', () => {
    const tokens = createMockTokens();
    (tokens as Record<string, unknown>).brand = { primary: undefined };

    const flavor = createMockFlavor({ tokens });
    const css = cssForFlavor(flavor);

    expect(css).toContain('/* SPDX-License-Identifier: MIT */');
  });

  it('handles undefined state colors in HSL generation', () => {
    const tokens = createMockTokens();
    (tokens.state as Record<string, unknown>).info = undefined;

    const flavor = createMockFlavor({ tokens });
    const css = cssForFlavor(flavor);

    expect(css).toContain('--bulma-info:');
  });

  it('handles component with partially undefined nested paths', () => {
    const tokens = createMockTokens();
    tokens.components = {
      card: { bg: '#ffffff' },
      modal: {},
    };

    const flavor = createMockFlavor({ tokens });
    const css = cssForFlavor(flavor);

    expect(css).toContain('--theme-modal-bg:');
    expect(css).toContain('rgba(10, 10, 10, 0.86)');
  });

  it('handles component traversal hitting null value', () => {
    const tokens = createMockTokens();
    tokens.components = {
      panel: null as unknown as Record<string, string>,
    };

    const flavor = createMockFlavor({ tokens });
    const css = cssForFlavor(flavor);

    expect(css).toContain('--theme-panel-bg:');
  });

  it('handles component traversal hitting primitive value', () => {
    const tokens = createMockTokens();
    tokens.components = {
      box: 'invalid' as unknown as Record<string, string>,
    };

    const flavor = createMockFlavor({ tokens });
    const css = cssForFlavor(flavor);

    expect(css).toContain('--theme-box-bg:');
  });

  it('handles non-string final value in token traversal', () => {
    const tokens = createMockTokens();
    (tokens.content.heading as Record<string, unknown>).h1 = 123;

    const flavor = createMockFlavor({ tokens });
    const css = cssForFlavor(flavor);

    expect(css).toContain('--theme-h1:');
  });

  it('handles component token returning non-string value', () => {
    const tokens = createMockTokens();
    tokens.components = {
      card: { bg: 42 as unknown as string },
    };

    const flavor = createMockFlavor({ tokens });
    const css = cssForFlavor(flavor);

    expect(css).toContain('--theme-card-bg:');
  });

  it('emits component tokens with fallbacks when components is deleted', () => {
    const tokens = createMockTokens();
    delete (tokens as Record<string, unknown>).components;

    const flavor = createMockFlavor({ tokens });
    const css = cssForFlavor(flavor);

    expect(css).toContain('/* SPDX-License-Identifier: MIT */');
    expect(css).toContain('/* Card component tokens */');
    expect(css).toContain('--theme-card-bg:');
  });

  it('emits component tokens with fallbacks when components is undefined', () => {
    const tokens = createMockTokens();
    tokens.components = undefined;

    const flavor = createMockFlavor({ tokens });
    const css = cssForFlavor(flavor);

    expect(css).toContain('/* SPDX-License-Identifier: MIT */');
    expect(css).toContain('--theme-card-bg:');
  });
});
