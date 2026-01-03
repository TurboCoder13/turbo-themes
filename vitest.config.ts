import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    setupFiles: ['./test/setup.ts'],
    include: ['test/**/*.test.ts', 'test/**/*.test.tsx', 'test/**/*.spec.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/_site/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov', 'json-summary'],
      reportsDirectory: './coverage',
      include: ['src/**/*.ts'],
      exclude: [
        'node_modules/**',
        'dist/**',
        '_site/**',
        '**/*.config.ts',
        '**/*.config.js',
        'scripts/**',
        '.github/**',
        'coverage/**',
        'test/**',
        'e2e/**',
        'src/themes/packs/**/*.synced.ts',
        'src/themes/types.ts',
        'src/themes/css.ts',
      ],
      thresholds: {
        lines: 83,
        functions: 83,
        branches: 82,
        statements: 83,
      },
    },
  },
});
