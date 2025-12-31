import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';

describe('ignore files include generated report directories', () => {
  it('should include playwright-report/ and lighthouse-reports/ in .markdownlintignore', () => {
    const ignorePath = `${process.cwd()}/.markdownlintignore`;
    const content = readFileSync(ignorePath, 'utf8');
    expect(content).toMatch(/(^|\n)playwright-report\/\s*$/m);
    expect(content).toMatch(/(^|\n)lighthouse-reports\/\s*$/m);
  });

  it('should include playwright-report/** and lighthouse-reports/** in .stylelintignore', () => {
    const ignorePath = `${process.cwd()}/.stylelintignore`;
    const content = readFileSync(ignorePath, 'utf8');
    expect(content).toMatch(/(^|\n)playwright-report\/\*\*\s*$/m);
    expect(content).toMatch(/(^|\n)lighthouse-reports\/\*\*\s*$/m);
  });
});
