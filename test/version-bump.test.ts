/**
 * Tests for generateChangelogEntry() bucketing logic in scripts/ci/version-bump.mjs.
 *
 * Regression coverage for:
 * - GitHub issue #546: style/refactor/perf/test/chore under Changed (not Fixed)
 * - GitHub issue #581: scope-aware Internal section (ci/build) + human-readable descriptions
 * - Greptile P1 on #602: breaking changes with ci/build scopes must not be dropped
 * - GitHub issue #718: docs type/scope → Internal (not Changed)
 */
import { describe, expect, it } from 'vitest';

// version-bump.mjs is a plain Node ESM script; Vitest runs in Node so the
// import is straightforward. The module only calls main() when import.meta.url
// matches process.argv[1], so importing it here has no side-effects.
const {
  generateChangelogEntry,
  determineBumpType,
  formatChangelogDescription,
  isChangelogInternalScope,
  isChangelogInternalType,
  parseCommit,
} = await import('../scripts/ci/version-bump.mjs');

/**
 * Simulate a git-log --oneline line the way getCommitsSinceLastTag() produces it.
 */
function fakeCommit(
  type: string,
  description: string,
  scope?: string,
  options?: { breakingMarker?: boolean },
): string {
  const scopePart = scope ? `(${scope})` : '';
  const bang = options?.breakingMarker ? '!' : '';
  return `abc1234 ${type}${scopePart}${bang}: ${description}`;
}

describe('generateChangelogEntry – changelog section bucketing', () => {
  describe('true fix types → ### 🐛 Fixed', () => {
    it.each(['fix', 'bugfix', 'patch'] as const)(
      '"%s" commit appears under Fixed',
      (type) => {
        const commits = [fakeCommit(type, 'resolve null pointer')];
        const entry = generateChangelogEntry(commits, '1.0.1', 'patch');
        expect(entry).toContain('### 🐛 Fixed');
        expect(entry).toContain('- Resolve null pointer');
        expect(entry).not.toContain('### 🔧 Changed');
        expect(entry).not.toContain('### 🤖 Internal');
      },
    );
  });

  describe('non-fix patch types → ### 🔧 Changed (not ### 🐛 Fixed)', () => {
    it.each(['style', 'refactor', 'perf', 'test', 'chore'] as const)(
      '"%s" commit appears under Changed, not Fixed',
      (type) => {
        const commits = [fakeCommit(type, `update ${type} thing`)];
        const entry = generateChangelogEntry(commits, '1.0.1', 'patch');
        expect(entry).toContain('### 🔧 Changed');
        expect(entry).toContain(`- Update ${type} thing`);
        expect(entry).not.toContain('### 🐛 Fixed');
      },
    );
  });

  describe('issue #718: docs type → ### 🤖 Internal (not Changed/Fixed)', () => {
    it('docs commit appears under Internal, not Fixed or Changed', () => {
      const commits = [
        fakeCommit('docs', 'add AGENTS.md with Cursor Cloud dev environment instructions (#542)'),
      ];
      const entry = generateChangelogEntry(commits, '0.22.1', 'patch');

      expect(entry).not.toContain('### 🐛 Fixed');
      expect(entry).not.toContain('### 🔧 Changed');
      expect(entry).toContain('### 🤖 Internal');
      expect(entry).toContain(
        '- Add AGENTS.md with Cursor Cloud dev environment instructions (#542)',
      );
    });
  });

  describe('feat types → ### ✨ Added', () => {
    it.each(['feat', 'feature'] as const)('"%s" commit appears under Added', (type) => {
      const commits = [fakeCommit(type, 'add dark mode toggle')];
      const entry = generateChangelogEntry(commits, '1.1.0', 'minor');
      expect(entry).toContain('### ✨ Added');
      expect(entry).toContain('- Add dark mode toggle');
      expect(entry).not.toContain('### 🐛 Fixed');
      expect(entry).not.toContain('### 🔧 Changed');
    });
  });

  describe('ignored types are omitted entirely', () => {
    it.each(['ci', 'build', 'release'] as const)(
      '"%s" commits do not appear in changelog',
      (type) => {
        const commits = [
          fakeCommit(type, 'update workflow'),
          fakeCommit('fix', 'real fix'), // included so the entry is non-empty (ignored types produce no output)
        ];
        const entry = generateChangelogEntry(commits, '1.0.1', 'patch');
        expect(entry).not.toContain('update workflow');
        expect(entry).not.toContain('Update workflow');
      },
    );
  });

  describe('issue #581/#648/#718: ci/build/test/docs scopes → ### 🤖 Internal (not consumer sections)', () => {
    it.each(['ci', 'build', 'test', 'docs'] as const)(
      'fix(%s) appears under Internal, not Fixed',
      (scope) => {
        const commits = [
          fakeCommit('fix', 'address greptile findings', scope),
          fakeCommit('fix', 'resolve token lookup', 'core'),
        ];
        const entry = generateChangelogEntry(commits, '1.0.1', 'patch');

        expect(entry).toContain('### 🐛 Fixed');
        expect(entry).toContain('- Resolve token lookup');
        expect(entry).toContain('### 🤖 Internal');
        expect(entry).toContain('- Address greptile findings');
        // Must not also appear under Fixed
        const fixedSection = entry.split('### 🤖 Internal')[0];
        expect(fixedSection).not.toContain('Address greptile findings');
      },
    );

    it.each(['ci', 'build', 'test', 'docs'] as const)(
      'feat(%s) appears under Internal, not Added',
      (scope) => {
        const commits = [
          fakeCommit('feat', 'wire release workflow', scope),
          fakeCommit('feat', 'add theme export'),
        ];
        const entry = generateChangelogEntry(commits, '1.1.0', 'minor');

        expect(entry).toContain('### ✨ Added');
        expect(entry).toContain('- Add theme export');
        expect(entry).toContain('### 🤖 Internal');
        expect(entry).toContain('- Wire release workflow');
        const addedSection = entry.split('### 🤖 Internal')[0];
        expect(addedSection).not.toContain('Wire release workflow');
      },
    );

    it.each(['ci', 'build', 'test', 'docs'] as const)(
      'chore(%s) appears under Internal, not Changed',
      (scope) => {
        const commits = [
          fakeCommit('chore', 'tweak pipeline cache', scope),
          fakeCommit('style', 'format README'),
        ];
        const entry = generateChangelogEntry(commits, '1.0.1', 'patch');

        expect(entry).toContain('### 🔧 Changed');
        expect(entry).toContain('- Format README');
        expect(entry).toContain('### 🤖 Internal');
        expect(entry).toContain('- Tweak pipeline cache');
        const changedSection = entry.split('### 🤖 Internal')[0];
        expect(changedSection).not.toContain('Tweak pipeline cache');
      },
    );

    it('scope matching is case-insensitive', () => {
      const commits = [
        fakeCommit('fix', 'uppercase scope noise', 'CI'),
        fakeCommit('fix', 'real consumer fix'),
      ];
      const entry = generateChangelogEntry(commits, '1.0.1', 'patch');
      expect(entry).toContain('- Real consumer fix');
      expect(entry).toContain('### 🤖 Internal');
      expect(entry).toContain('- Uppercase scope noise');
    });

    it('non-internal scopes still appear in the correct section', () => {
      const commits = [fakeCommit('fix', 'resolve token lookup', 'core')];
      const entry = generateChangelogEntry(commits, '1.0.1', 'patch');
      expect(entry).toContain('### 🐛 Fixed');
      expect(entry).toContain('- Resolve token lookup');
      expect(entry).not.toContain('### 🤖 Internal');
    });
  });

  describe('Greptile P1 #602: breaking changes bypass Internal scope routing', () => {
    it('fix(ci) with BREAKING CHANGE in description appears under BREAKING CHANGES', () => {
      const commits = [
        fakeCommit('fix', 'BREAKING CHANGE drop Node 16 support', 'ci'),
      ];
      const entry = generateChangelogEntry(commits, '2.0.0', 'major');

      expect(entry).toContain('### ⚠️ BREAKING CHANGES');
      expect(entry).toContain('- BREAKING CHANGE drop Node 16 support');
      expect(entry).not.toContain('### 🤖 Internal');
      expect(entry).not.toContain('### 🐛 Fixed');
    });

    it('fix(ci)!: breaking marker appears under BREAKING CHANGES', () => {
      const commits = [
        fakeCommit('fix', 'drop Node 16 support', 'ci', { breakingMarker: true }),
      ];
      const entry = generateChangelogEntry(commits, '2.0.0', 'major');

      expect(entry).toContain('### ⚠️ BREAKING CHANGES');
      expect(entry).toContain('- Drop Node 16 support');
      expect(entry).not.toContain('### 🤖 Internal');
    });

    it('feat(build)!: still bumps major and documents the break', () => {
      const commits = [
        fakeCommit('feat', 'remove legacy build pipeline', 'build', { breakingMarker: true }),
      ];
      expect(determineBumpType(commits)).toBe('major');
      const entry = generateChangelogEntry(commits, '2.0.0', 'major');
      expect(entry).toContain('### ⚠️ BREAKING CHANGES');
      expect(entry).toContain('- Remove legacy build pipeline');
      expect(entry).not.toContain('### 🤖 Internal');
    });
  });

  describe('issue #581: human-readable changelog descriptions', () => {
    it('capitalizes the first character of each entry', () => {
      const commits = [fakeCommit('fix', 'bucket docs under Changed (#570)')];
      const entry = generateChangelogEntry(commits, '1.0.1', 'patch');
      expect(entry).toContain('- Bucket docs under Changed (#570)');
      expect(entry).not.toContain('- bucket docs under Changed (#570)');
    });

    it('preserves trailing PR refs from the commit message', () => {
      const commits = [fakeCommit('feat', 'add dark mode toggle (#580)')];
      const entry = generateChangelogEntry(commits, '1.1.0', 'minor');
      expect(entry).toContain('- Add dark mode toggle (#580)');
    });

    it('leaves already-capitalized descriptions unchanged aside from first char', () => {
      expect(formatChangelogDescription('Resolve null pointer')).toBe('Resolve null pointer');
      expect(formatChangelogDescription('add theme')).toBe('Add theme');
      expect(formatChangelogDescription('')).toBe('');
    });
  });

  describe('mixed release with multiple types', () => {
    it('routes each type to the correct section', () => {
      const commits = [
        fakeCommit('feat', 'add theme export'),
        fakeCommit('fix', 'fix token import'),
        fakeCommit('docs', 'update README'),
        fakeCommit('chore', 'bump deps'),
        fakeCommit('refactor', 'simplify renderer'),
        fakeCommit('ci', 'add lint job'), // ignored type
        fakeCommit('fix', 'address greptile P2 findings', 'ci'), // Internal scope
      ];
      const entry = generateChangelogEntry(commits, '1.1.1', 'minor');

      expect(entry).toContain('### ✨ Added');
      expect(entry).toContain('- Add theme export');

      expect(entry).toContain('### 🐛 Fixed');
      expect(entry).toContain('- Fix token import');

      expect(entry).toContain('### 🔧 Changed');
      expect(entry).toContain('- Bump deps');
      expect(entry).toContain('- Simplify renderer');

      expect(entry).not.toContain('add lint job');
      expect(entry).toContain('### 🤖 Internal');
      expect(entry).toContain('- Update README');
      expect(entry).toContain('- Address greptile P2 findings');
      const changedSection = entry.split('### 🤖 Internal')[0];
      expect(changedSection).not.toContain('Update README');
    });
  });

  describe('scoped commits', () => {
    it('docs(site) commit goes to Internal, not Changed/Fixed (#718)', () => {
      const commits = [fakeCommit('docs', 'add API reference', 'site')];
      const entry = generateChangelogEntry(commits, '1.0.1', 'patch');
      expect(entry).toContain('### 🤖 Internal');
      expect(entry).toContain('- Add API reference');
      expect(entry).not.toContain('### 🔧 Changed');
      expect(entry).not.toContain('### 🐛 Fixed');
    });

    it('fix(core) commit goes to Fixed', () => {
      const commits = [fakeCommit('fix', 'resolve token lookup', 'core')];
      const entry = generateChangelogEntry(commits, '1.0.1', 'patch');
      expect(entry).toContain('### 🐛 Fixed');
      expect(entry).not.toContain('### 🔧 Changed');
    });
  });
});

describe('isChangelogInternalScope', () => {
  it.each(['ci', 'build', 'test', 'docs', 'CI', 'Build', 'Test', 'Docs'] as const)(
    '"%s" is internal',
    (scope) => {
      expect(isChangelogInternalScope(scope)).toBe(true);
    },
  );

  it.each(['core', 'site', 'deps'] as const)('"%s" is not internal', (scope) => {
    expect(isChangelogInternalScope(scope)).toBe(false);
  });

  it('null/undefined scopes are not internal', () => {
    expect(isChangelogInternalScope(null)).toBe(false);
    expect(isChangelogInternalScope(undefined)).toBe(false);
  });
});

describe('isChangelogInternalType', () => {
  it.each(['docs', 'Docs'] as const)('"%s" is internal', (type) => {
    expect(isChangelogInternalType(type)).toBe(true);
  });

  it.each(['fix', 'feat', 'chore', 'test', 'style'] as const)('"%s" is not internal', (type) => {
    expect(isChangelogInternalType(type)).toBe(false);
  });

  it('null/undefined types are not internal', () => {
    expect(isChangelogInternalType(null)).toBe(false);
    expect(isChangelogInternalType(undefined)).toBe(false);
  });
});

describe('parseCommit – breaking marker', () => {
  it('detects type(scope)!: as breaking', () => {
    const parsed = parseCommit('fix(ci)!: drop Node 16 support');
    expect(parsed).toMatchObject({
      type: 'fix',
      scope: 'ci',
      description: 'drop Node 16 support',
      breaking: true,
    });
  });

  it('detects BREAKING CHANGE in description without !', () => {
    const parsed = parseCommit('fix(ci): BREAKING CHANGE drop Node 16 support');
    expect(parsed?.breaking).toBe(true);
  });
});

describe('determineBumpType – patchTypes still trigger patch bump', () => {
  it.each(['docs', 'style', 'refactor', 'perf', 'test', 'chore'] as const)(
    '"%s" commit triggers a patch bump',
    (type) => {
      const commits = [fakeCommit(type, 'some change')];
      const bumpType = determineBumpType(commits);
      expect(bumpType).toBe('patch');
    },
  );

  it.each(['fix', 'bugfix', 'patch'] as const)(
    '"%s" commit triggers a patch bump',
    (type) => {
      const commits = [fakeCommit(type, 'some fix')];
      const bumpType = determineBumpType(commits);
      expect(bumpType).toBe('patch');
    },
  );

  describe('issue #581: scoped ci/build commits still trigger release bumps', () => {
    it('fix(ci) still triggers a patch bump', () => {
      const commits = [fakeCommit('fix', 'address greptile findings', 'ci')];
      expect(determineBumpType(commits)).toBe('patch');
    });

    it('feat(build) still triggers a minor bump', () => {
      const commits = [fakeCommit('feat', 'add build cache', 'build')];
      expect(determineBumpType(commits)).toBe('minor');
    });

    it('type ci (not scope) still does not trigger a bump', () => {
      const commits = [fakeCommit('ci', 'update workflow')];
      expect(determineBumpType(commits)).toBeNull();
    });

    it('fix(ci)!: triggers a major bump', () => {
      const commits = [
        fakeCommit('fix', 'drop Node 16 support', 'ci', { breakingMarker: true }),
      ];
      expect(determineBumpType(commits)).toBe('major');
    });
  });
});

describe('changelog wrapping and emphasis escaping', () => {
  it('wraps long bullets with a two-space hanging indent at 88 columns', () => {
    const commits = [
      fakeCommit(
        'fix',
        'Bump browserslist and postcss-selector-parser in examples/tailwind for OSV advisories (#933)',
      ),
    ];
    const entry = generateChangelogEntry(commits, '0.42.6', 'patch');
    expect(entry).toContain(
      '- Bump browserslist and postcss-selector-parser in examples/tailwind for OSV advisories\n  (#933)',
    );
    for (const line of entry.split('\n')) {
      expect(line.length).toBeLessThanOrEqual(88);
    }
  });

  it('keeps continuation lines within the width including their indent', () => {
    const longTitle =
      'refactor the generated theme pipeline so that every adapter, coverage shim, and catalog entry is produced from one audited source of truth without duplicating steps';
    const commits = [fakeCommit('fix', longTitle)];
    const entry = generateChangelogEntry(commits, '1.0.1', 'patch');
    for (const line of entry.split('\n')) {
      expect(line.length).toBeLessThanOrEqual(88);
    }
    expect(entry.split('\n').filter((l) => l.startsWith('  ')).length).toBeGreaterThan(0);
  });

  it('escapes bare emphasis markers from titles', () => {
    const commits = [fakeCommit('fix', 'handle a*b and c_d inputs')];
    const entry = generateChangelogEntry(commits, '1.0.1', 'patch');
    expect(entry).toContain('a\\*b');
    expect(entry).toContain('c\\_d');
  });

  it('leaves inline code spans untouched', () => {
    const commits = [fakeCommit('fix', 'support `foo_bar` flag')];
    const entry = generateChangelogEntry(commits, '1.0.1', 'patch');
    expect(entry).toContain('`foo_bar`');
  });

  it('does not double-escape an already-escaped marker', () => {
    const commits = [fakeCommit('fix', 'literal \\* stays escaped')];
    const entry = generateChangelogEntry(commits, '1.0.1', 'patch');
    expect(entry).toContain('\\*');
    expect(entry).not.toContain('\\\\*');
  });
});
