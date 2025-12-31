# 0004. CSP 'unsafe-inline' for Theme Blocking Script

Date: 2025-12-05

## Status

Accepted

## Context

The theme-selector feature requires a blocking inline script in the `<head>` of
`_layouts/default.html` (lines 19–87) that:

1. Reads the user's saved theme preference from localStorage
2. Applies the theme class to `<html>` before first paint
3. Preloads the theme CSS file

This script **must** run synchronously before any rendering occurs to prevent Flash of
Unstyled Content (FOUC) — the jarring visual effect where the page first renders with
the wrong theme and then snaps to the correct one.

### The Problem

A strict Content Security Policy (CSP) would use a nonce or hash for inline scripts.
However:

- **Nonces** require server-side generation on each request (not possible with static
  Jekyll sites)
- **Hashes** are fragile — any whitespace or comment change breaks the hash, causing CI
  failures and security alerts

Since turbo-themes is a static Jekyll site deployed to GitHub Pages, we cannot
dynamically generate nonces. Hash-based approaches create maintenance burden and
brittleness in CI/CD pipelines.

### Alternatives Considered

1. **External blocking script**: Would require an additional HTTP request, defeating the
   FOUC prevention goal
2. **Hash-based CSP**: Brittle; any script change breaks the hash
3. **Nonce-based CSP**: Requires server-side rendering, not available for static sites
4. **Accept FOUC**: Poor user experience, not acceptable

## Decision

We consciously permit `'unsafe-inline'` for `script-src` in the CSP to allow the inline
theme-blocking script. This is a documented security trade-off prioritizing user
experience (no FOUC) over strict CSP compliance.

### Current CSP (lines 12–13 in `_layouts/default.html`)

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' 'unsafe-inline'; ..."
/>
```

### Mitigations in Place

1. **Minimal inline code**: The blocking script is kept as small as possible (only theme
   detection and class application)
2. **Input validation**: The script validates theme IDs against an allowlist to prevent
   class injection attacks
3. **URL sanitization**: The `sanitizeUrlPath()` function prevents XSS through
   manipulated `data-baseurl` attributes
4. **No dynamic evaluation**: The script does not use `eval()`, `Function()`, or other
   dynamic code execution
5. **All other scripts external**: All interactive JavaScript (theme-selector, etc.) is
   loaded from external files

### Future Tightening Actions

When any of the following become available, we should revisit this decision:

1. **Server-side rendering**: If we migrate to a server-rendered solution (Next.js,
   Astro SSR, etc.), implement nonce-based CSP
2. **Service Worker theme caching**: A service worker could precompute and cache the
   correct theme class, eliminating the need for blocking JS
3. **CSS-only theme detection**: Future CSS features like `@when` or improved
   `prefers-color-scheme` matching might enable pure CSS theme initialization

## Consequences

### Positive

- Users never see FOUC — themes apply instantly on page load
- No additional HTTP requests for theme initialization
- Works on static hosting (GitHub Pages, Netlify, etc.)
- Simple implementation with no server dependencies

### Negative

- CSP is weaker than ideal (`'unsafe-inline'` opens XSS attack surface)
- Cannot use CSP-based XSS protection for inline scripts
- Security scanners may flag this as a vulnerability

### Neutral

- Decision should be revisited if deployment model changes
- Document this trade-off in security reviews
- Monitor for new CSP features that could enable safer approaches

## References

- [CSP `script-src` directive](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src)
- [FOUC (Flash of Unstyled Content)](https://en.wikipedia.org/wiki/Flash_of_unstyled_content)
- [GitHub Pages limitations](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#guidelines-for-using-github-pages)
- Related: `_layouts/default.html` lines 12–13 (CSP) and 19–87 (blocking script)

## Notes

If implementing a service worker for theme caching in the future, the approach would be:

1. Service worker intercepts navigation requests
2. Checks localStorage for theme preference
3. Injects precomputed theme class into HTML response
4. Eliminates need for inline blocking script
5. Allows removal of `'unsafe-inline'` from CSP

This ADR should be superseded when such an implementation is complete.
