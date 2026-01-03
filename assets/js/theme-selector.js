const THEME_FAMILIES = {
  bulma: { name: 'Bulma', description: 'Classic Bulma themes' },
  catppuccin: { name: 'Catppuccin', description: 'Soothing pastel themes' },
  github: { name: 'GitHub', description: 'GitHub-inspired themes' },
  dracula: { name: 'Dracula', description: 'Dark vampire aesthetic' },
};
const THEMES = [
  // Bulma themes
  {
    id: 'bulma-light',
    name: 'Light',
    description: 'Classic Bulma look with a bright, neutral palette.',
    cssFile: 'assets/css/themes/bulma-light.css',
    icon: 'assets/img/turbo-themes-logo.png',
    family: 'bulma',
    appearance: 'light',
    colors: { bg: '#ffffff', surface: '#f5f5f5', accent: '#00d1b2', text: '#363636' },
  },
  {
    id: 'bulma-dark',
    name: 'Dark',
    description: 'Dark Bulma theme tuned for low-light reading.',
    cssFile: 'assets/css/themes/bulma-dark.css',
    icon: 'assets/img/turbo-themes-logo.png',
    family: 'bulma',
    appearance: 'dark',
    colors: { bg: '#1a1a2e', surface: '#252540', accent: '#00d1b2', text: '#f5f5f5' },
  },
  // Catppuccin themes
  {
    id: 'catppuccin-latte',
    name: 'Latte',
    description: 'Light, soft Catppuccin palette for daytime use.',
    cssFile: 'assets/css/themes/catppuccin-latte.css',
    icon: 'assets/img/catppuccin-logo-latte.png',
    family: 'catppuccin',
    appearance: 'light',
    colors: { bg: '#eff1f5', surface: '#e6e9ef', accent: '#8839ef', text: '#4c4f69' },
  },
  {
    id: 'catppuccin-frappe',
    name: 'Frappé',
    description: 'Balanced dark Catppuccin theme for focused work.',
    cssFile: 'assets/css/themes/catppuccin-frappe.css',
    icon: 'assets/img/catppuccin-logo-latte.png',
    family: 'catppuccin',
    appearance: 'dark',
    colors: { bg: '#303446', surface: '#414559', accent: '#ca9ee6', text: '#c6d0f5' },
  },
  {
    id: 'catppuccin-macchiato',
    name: 'Macchiato',
    description: 'Deep, atmospheric Catppuccin variant with rich contrast.',
    cssFile: 'assets/css/themes/catppuccin-macchiato.css',
    icon: 'assets/img/catppuccin-logo-macchiato.png',
    family: 'catppuccin',
    appearance: 'dark',
    colors: { bg: '#24273a', surface: '#363a4f', accent: '#c6a0f6', text: '#cad3f5' },
  },
  {
    id: 'catppuccin-mocha',
    name: 'Mocha',
    description: 'Cozy, high-contrast Catppuccin theme for late-night sessions.',
    cssFile: 'assets/css/themes/catppuccin-mocha.css',
    icon: 'assets/img/catppuccin-logo-macchiato.png',
    family: 'catppuccin',
    appearance: 'dark',
    colors: { bg: '#1e1e2e', surface: '#313244', accent: '#cba6f7', text: '#cdd6f4' },
  },
  // Dracula theme
  {
    id: 'dracula',
    name: 'Classic',
    description: 'Iconic Dracula dark theme with vibrant accents.',
    cssFile: 'assets/css/themes/dracula.css',
    icon: 'assets/img/dracula-logo.png',
    family: 'dracula',
    appearance: 'dark',
    colors: { bg: '#282a36', surface: '#44475a', accent: '#bd93f9', text: '#f8f8f2' },
  },
  // GitHub themes
  {
    id: 'github-light',
    name: 'Light',
    description:
      'GitHub-inspired light theme suited for documentation and UI heavy pages.',
    cssFile: 'assets/css/themes/github-light.css',
    icon: 'assets/img/github-logo-light.png',
    family: 'github',
    appearance: 'light',
    colors: { bg: '#ffffff', surface: '#f6f8fa', accent: '#0969da', text: '#1f2328' },
  },
  {
    id: 'github-dark',
    name: 'Dark',
    description: 'GitHub dark theme optimized for code-heavy views.',
    cssFile: 'assets/css/themes/github-dark.css',
    icon: 'assets/img/github-logo-dark.png',
    family: 'github',
    appearance: 'dark',
    colors: { bg: '#0d1117', surface: '#161b22', accent: '#58a6ff', text: '#c9d1d9' },
  },
];
const STORAGE_KEY = 'turbo-theme';
const LEGACY_STORAGE_KEYS = ['bulma-theme-flavor'];
const DEFAULT_THEME = 'catppuccin-mocha';
function getCurrentThemeFromClasses(element) {
  const classList = Array.from(element.classList);
  for (const className of classList) {
    if (className.startsWith('theme-')) {
      return className.substring(6); // Remove 'theme-' prefix
    }
  }
  return null;
}
function getBaseUrl(doc) {
  const baseElement = doc.documentElement;
  const raw = baseElement?.getAttribute('data-baseurl') || '';
  try {
    const u = new URL(raw, 'http://localhost');
    // Only allow same-origin relative paths; strip origin used for parsing
    return u.origin === 'http://localhost' ? u.pathname.replace(/\/$/, '') : '';
  } catch {
    return '';
  }
}
async function applyTheme(doc, themeId) {
  const theme =
    THEMES.find((t) => t.id === themeId) || THEMES.find((t) => t.id === DEFAULT_THEME);
  const baseUrl = getBaseUrl(doc);
  // Add loading state to trigger button
  const trigger = doc.getElementById('theme-flavor-trigger');
  if (trigger) {
    trigger.classList.add('is-loading');
  }
  try {
    // Apply theme class immediately (before CSS loading)
    // This ensures the theme is applied even if CSS loading fails
    const classList = Array.from(doc.documentElement.classList);
    classList.forEach((className) => {
      if (className.startsWith('theme-')) {
        doc.documentElement.classList.remove(className);
      }
    });
    // Add the new theme class (use resolved theme.id, not the input themeId)
    doc.documentElement.classList.add(`theme-${theme.id}`);
    // Lazy load theme CSS if not already loaded
    // Use resolved theme.id consistently (not the input themeId which may have been invalid)
    const themeLinkId = `theme-${theme.id}-css`;
    let themeLink = doc.getElementById(themeLinkId);
    if (!themeLink) {
      themeLink = doc.createElement('link');
      themeLink.id = themeLinkId;
      themeLink.rel = 'stylesheet';
      themeLink.type = 'text/css';
      themeLink.setAttribute('data-theme-id', theme.id);
      try {
        // Resolve path relative to site root
        // Use baseUrl if set, otherwise resolve from root
        const base = baseUrl
          ? `${window.location.origin}${baseUrl}/`
          : `${window.location.origin}/`;
        const resolvedPath = new URL(theme.cssFile, base).pathname;
        themeLink.href = resolvedPath;
      } catch {
        console.warn(`Invalid theme CSS path for ${theme.id}`);
        // Theme class already applied, so we can return successfully
        return;
      }
      // Add to document head
      doc.head.appendChild(themeLink);
      // Wait for CSS to load (but don't fail if it doesn't load)
      try {
        await new Promise((resolve, reject) => {
          // Store timeout ID to clear on success/error (prevents memory leak)
          const timeoutId = setTimeout(() => {
            themeLink.onload = null;
            themeLink.onerror = null;
            reject(new Error(`Theme ${theme.id} load timeout`));
          }, 10000);
          themeLink.onload = () => {
            clearTimeout(timeoutId);
            themeLink.onload = null;
            themeLink.onerror = null;
            resolve();
          };
          themeLink.onerror = () => {
            clearTimeout(timeoutId);
            themeLink.onload = null;
            themeLink.onerror = null;
            reject(new Error(`Failed to load theme ${theme.id}`));
          };
        });
      } catch (error) {
        // CSS loading failed, but theme class is already applied
        // Log the error but don't throw - theme switching should still work
        console.warn(`Theme CSS failed to load for ${theme.id}:`, error);
      }
    }
    // Clean up old theme CSS links (keep current and base themes)
    const themeLinks = doc.querySelectorAll('link[id^="theme-"][id$="-css"]');
    themeLinks.forEach((link) => {
      const linkThemeId = link.id.replace('theme-', '').replace('-css', '');
      if (linkThemeId !== theme.id && linkThemeId !== 'base') {
        link.remove();
      }
    });
    // Update trigger button icon with theme's icon image
    const triggerIcon = doc.getElementById('theme-flavor-trigger-icon');
    if (triggerIcon && theme.icon) {
      try {
        // Resolve path relative to site root
        // Use baseUrl if set, otherwise resolve from root
        const base = baseUrl
          ? `${window.location.origin}${baseUrl}/`
          : `${window.location.origin}/`;
        const resolvedPath = new URL(theme.icon, base).pathname;
        triggerIcon.src = resolvedPath;
        triggerIcon.alt = `${THEME_FAMILIES[theme.family].name} ${theme.name}`;
        triggerIcon.title = `${THEME_FAMILIES[theme.family].name} ${theme.name}`;
      } catch {
        console.warn(`Invalid theme icon path for ${theme.id}`);
      }
    }
    // Update active state in dropdown
    const dropdownItems = doc.querySelectorAll(
      '#theme-flavor-menu .dropdown-item.theme-item'
    );
    dropdownItems.forEach((item) => {
      if (item.getAttribute('data-theme-id') === theme.id) {
        item.classList.add('is-active');
        item.setAttribute('aria-checked', 'true');
      } else {
        item.classList.remove('is-active');
        item.setAttribute('aria-checked', 'false');
      }
    });
  } finally {
    // Remove loading state
    if (trigger) {
      trigger.classList.remove('is-loading');
    }
  }
}
export async function initTheme(documentObj, windowObj) {
  // Migrate legacy storage keys
  for (const legacyKey of LEGACY_STORAGE_KEYS) {
    const legacy = windowObj.localStorage.getItem(legacyKey);
    if (legacy && !windowObj.localStorage.getItem(STORAGE_KEY)) {
      windowObj.localStorage.setItem(STORAGE_KEY, legacy);
      windowObj.localStorage.removeItem(legacyKey);
    }
  }
  // Check if theme was already applied by blocking script
  const initialTheme = windowObj.__INITIAL_THEME__;
  const savedTheme = windowObj.localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
  // If blocking script already applied theme and it matches saved, just load CSS if needed
  if (initialTheme && initialTheme === savedTheme) {
    const currentTheme = getCurrentThemeFromClasses(documentObj.documentElement);
    if (currentTheme === savedTheme) {
      // Theme class already applied by blocking script, just ensure CSS is loaded
      const themeLinkId = `theme-${savedTheme}-css`;
      const themeLink = documentObj.getElementById(themeLinkId);
      if (!themeLink) {
        // CSS not loaded yet, load it now
        await applyTheme(documentObj, savedTheme);
      }
      return;
    }
  }
  // Otherwise, apply theme normally
  await applyTheme(documentObj, savedTheme);
}
export function initNavbar(documentObj) {
  const currentPath = documentObj.location.pathname;
  const navbarItems = documentObj.querySelectorAll('.navbar-item');
  // Find the matching link first
  let matchingItem = null;
  const checkedItems = new Set();
  navbarItems.forEach((item) => {
    const link = item;
    if (link.href) {
      try {
        const linkPath = new URL(link.href).pathname;
        // Remove trailing slashes for comparison
        const normalizedCurrentPath = currentPath.replace(/\/$/, '') || '/';
        const normalizedLinkPath = linkPath.replace(/\/$/, '') || '/';
        checkedItems.add(item);
        if (normalizedCurrentPath === normalizedLinkPath) {
          matchingItem = item;
        }
      } catch {
        // Ignore invalid URLs - don't add to checkedItems
      }
    }
  });
  // Clear all active states except the matching one (only for items that were checked)
  navbarItems.forEach((item) => {
    if (item !== matchingItem && checkedItems.has(item)) {
      item.classList.remove('is-active');
      const link = item;
      // Check if removeAttribute exists (for test mocks that might not have it)
      if (
        link &&
        'removeAttribute' in link &&
        typeof link.removeAttribute === 'function'
      ) {
        link.removeAttribute('aria-current');
      }
    }
  });
  // Set active state for the matching link
  if (matchingItem) {
    matchingItem.classList.add('is-active');
    const link = matchingItem;
    // Check if setAttribute exists (for test mocks that might not have it)
    if (link && 'setAttribute' in link && typeof link.setAttribute === 'function') {
      link.setAttribute('aria-current', 'page');
    }
  }
  // Handle Reports dropdown highlighting
  const reportsLink = documentObj.querySelector('[data-testid="nav-reports"]');
  if (reportsLink) {
    const reportPaths = ['/coverage', '/playwright', '/lighthouse'];
    const normalizedCurrentPath = currentPath.replace(/\/$/, '') || '/';
    const isOnReportsPage = reportPaths.some(
      (path) =>
        normalizedCurrentPath === path || normalizedCurrentPath.startsWith(path + '/')
    );
    if (isOnReportsPage) {
      reportsLink.classList.add('is-active');
    } else {
      reportsLink.classList.remove('is-active');
    }
  }
}
// Only assign to window in browser context
if (typeof window !== 'undefined') {
  window.initNavbar = initNavbar;
}
export function wireFlavorSelector(documentObj, windowObj) {
  const abortController = new AbortController();
  const dropdownMenu = documentObj.getElementById('theme-flavor-menu');
  const trigger = documentObj.getElementById('theme-flavor-trigger');
  // Get the outer dropdown container (navbar-item has-dropdown) for active state toggling
  const dropdown = trigger?.closest('.navbar-item.has-dropdown');
  const selectEl = documentObj.getElementById('theme-flavor-select');
  const baseUrl = getBaseUrl(documentObj);
  if (!dropdownMenu || !trigger || !dropdown) {
    return {
      cleanup: () => {
        abortController.abort();
      },
    };
  }
  let currentIndex = -1;
  const menuItems = [];
  // Get current theme to set initial aria-checked state
  const currentThemeId =
    windowObj.localStorage.getItem(STORAGE_KEY) ||
    getCurrentThemeFromClasses(documentObj.documentElement) ||
    DEFAULT_THEME;
  // Keep optional native select (DDL) in sync with current theme
  if (selectEl) {
    // Clear any existing options
    while (selectEl.firstChild) {
      selectEl.removeChild(selectEl.firstChild);
    }
    THEMES.forEach((theme) => {
      const option = documentObj.createElement('option');
      option.value = theme.id;
      option.textContent = theme.name;
      if (theme.id === currentThemeId) {
        option.selected = true;
      }
      selectEl.appendChild(option);
    });
    // Enable select when JS is active
    selectEl.disabled = false;
    // Allow changing theme via native select
    selectEl.addEventListener('change', (event) => {
      const target = event.target;
      const selectedThemeId = target?.value || DEFAULT_THEME;
      windowObj.localStorage.setItem(STORAGE_KEY, selectedThemeId);
      applyTheme(documentObj, selectedThemeId).catch((error) => {
        console.error(`Failed to apply theme ${selectedThemeId}:`, error);
      });
    });
  }
  // Populate dropdown with grouped theme options
  const families = Object.keys(THEME_FAMILIES);
  let animationDelay = 0;
  families.forEach((familyKey) => {
    const familyThemes = THEMES.filter((t) => t.family === familyKey);
    if (familyThemes.length === 0) return;
    const familyMeta = THEME_FAMILIES[familyKey];
    // Create family group container
    const group = documentObj.createElement('div');
    group.className = 'theme-family-group';
    group.setAttribute('role', 'group');
    group.setAttribute('aria-labelledby', `theme-family-${familyKey}`);
    if (group.style && typeof group.style.setProperty === 'function') {
      group.style.setProperty('--animation-delay', `${animationDelay}ms`);
    }
    animationDelay += 30;
    // Create family header
    const header = documentObj.createElement('div');
    header.className = 'theme-family-header';
    header.id = `theme-family-${familyKey}`;
    const headerTitle = documentObj.createElement('span');
    headerTitle.className = 'theme-family-name';
    headerTitle.textContent = familyMeta.name;
    header.appendChild(headerTitle);
    group.appendChild(header);
    // Create themes container
    const themesContainer = documentObj.createElement('div');
    themesContainer.className = 'theme-family-items';
    familyThemes.forEach((theme) => {
      const item = documentObj.createElement('button');
      item.type = 'button';
      item.className = 'dropdown-item theme-item';
      item.setAttribute('data-theme-id', theme.id);
      item.setAttribute('data-appearance', theme.appearance);
      item.setAttribute('role', 'menuitemradio');
      item.setAttribute(
        'aria-label',
        `${familyMeta.name} ${theme.name} (${theme.appearance}). ${theme.description}`
      );
      item.setAttribute('tabindex', '-1');
      const isActive = theme.id === currentThemeId;
      item.setAttribute('aria-checked', String(isActive));
      if (isActive) {
        item.classList.add('is-active');
      }
      // Icon
      const icon = documentObj.createElement('img');
      icon.className = 'theme-icon';
      if (theme.icon) {
        const iconPath = baseUrl ? `${baseUrl}/${theme.icon}` : theme.icon;
        icon.src = iconPath;
        icon.alt = `${familyMeta.name} ${theme.name}`;
      }
      icon.width = 24;
      icon.height = 24;
      item.appendChild(icon);
      // Text content
      const copy = documentObj.createElement('div');
      copy.className = 'theme-copy';
      const titleEl = documentObj.createElement('span');
      titleEl.className = 'theme-title';
      titleEl.textContent = `${familyMeta.name} · ${theme.name}`;
      copy.appendChild(titleEl);
      const descriptionEl = documentObj.createElement('span');
      descriptionEl.className = 'theme-description';
      descriptionEl.textContent = theme.description;
      copy.appendChild(descriptionEl);
      item.appendChild(copy);
      // Checkmark for active state
      const check = documentObj.createElement('span');
      check.className = 'theme-check';
      const svg = documentObj.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '16');
      svg.setAttribute('height', '16');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'currentColor');
      svg.setAttribute('stroke-width', '3');
      svg.setAttribute('stroke-linecap', 'round');
      svg.setAttribute('stroke-linejoin', 'round');
      const polyline = documentObj.createElementNS(
        'http://www.w3.org/2000/svg',
        'polyline'
      );
      polyline.setAttribute('points', '20 6 9 17 4 12');
      svg.appendChild(polyline);
      check.appendChild(svg);
      item.appendChild(check);
      item.addEventListener('click', (e) => {
        e.preventDefault();
        // Always update localStorage and close dropdown, even if CSS loading fails
        windowObj.localStorage.setItem(STORAGE_KEY, theme.id);
        if (selectEl) {
          selectEl.value = theme.id;
          // Notify any listeners watching the native select
          const changeEvent = new Event('change', { bubbles: true });
          selectEl.dispatchEvent(changeEvent);
        }
        closeDropdown({ restoreFocus: true });
        // Apply theme asynchronously (doesn't block dropdown closing)
        applyTheme(documentObj, theme.id).catch((error) => {
          console.error(`Failed to apply theme ${theme.id}:`, error);
        });
      });
      menuItems.push(item);
      themesContainer.appendChild(item);
    });
    group.appendChild(themesContainer);
    dropdownMenu.appendChild(group);
  });
  // Update aria-expanded on trigger
  const updateAriaExpanded = (expanded) => {
    if (trigger) {
      trigger.setAttribute('aria-expanded', String(expanded));
    }
  };
  // Focus management
  const focusMenuItem = (index) => {
    if (index < 0 || index >= menuItems.length) return;
    const item = menuItems[index];
    // Set tabindex to -1 for all items
    menuItems.forEach((menuItem) => {
      menuItem.setAttribute('tabindex', '-1');
    });
    // Focus and set tabindex to 0 on current item
    item.setAttribute('tabindex', '0');
    item.focus();
    currentIndex = index;
  };
  const closeDropdown = (options = {}) => {
    const { restoreFocus = true } = options;
    if (dropdown) {
      dropdown.classList.remove('is-active');
    }
    updateAriaExpanded(false);
    menuItems.forEach((menuItem) => {
      menuItem.setAttribute('tabindex', '-1');
    });
    currentIndex = -1;
    if (restoreFocus && trigger) {
      // Only restore focus to trigger when explicitly requested (e.g., selection or Esc)
      trigger.focus();
    }
  };
  // Toggle dropdown helper function
  const toggleDropdown = (focusFirst = false) => {
    if (!dropdown) return;
    const isActive = dropdown.classList.toggle('is-active');
    updateAriaExpanded(isActive);
    if (!isActive) {
      currentIndex = -1;
      menuItems.forEach((menuItem) => {
        if (menuItem && typeof menuItem.setAttribute === 'function') {
          menuItem.setAttribute('tabindex', '-1');
          const isActiveItem =
            menuItem.classList && typeof menuItem.classList.contains === 'function'
              ? menuItem.classList.contains('is-active')
              : false;
          menuItem.setAttribute('aria-checked', String(isActiveItem));
        }
      });
    } else if (focusFirst && menuItems.length > 0) {
      // When opening via keyboard, focus first item
      focusMenuItem(0);
    }
  };
  // Toggle dropdown on trigger click (for touch devices)
  if (trigger) {
    trigger.addEventListener(
      'click',
      (e) => {
        e.preventDefault();
        toggleDropdown();
      },
      { signal: abortController.signal }
    );
  }
  // Close dropdown when clicking outside
  documentObj.addEventListener(
    'click',
    (e) => {
      if (dropdown && !dropdown.contains(e.target)) {
        // Close on any outside click; do not steal focus from the newly clicked element
        closeDropdown({ restoreFocus: false });
      }
    },
    { signal: abortController.signal }
  );
  // Handle Escape key globally to close dropdown
  documentObj.addEventListener(
    'keydown',
    (e) => {
      if (e.key === 'Escape' && dropdown && dropdown.classList.contains('is-active')) {
        closeDropdown({ restoreFocus: true });
      }
    },
    { signal: abortController.signal }
  );
  // Keyboard navigation
  if (trigger) {
    trigger.addEventListener(
      'keydown',
      (e) => {
        if (!dropdown) return;
        const key = e.key;
        if (key === 'Enter' || key === ' ') {
          e.preventDefault();
          const wasActive = dropdown.classList.contains('is-active');
          if (wasActive) {
            // If already open, close it
            toggleDropdown(false);
          } else {
            // If closed, open and focus first item
            toggleDropdown(true);
          }
        } else if (key === 'ArrowDown') {
          e.preventDefault();
          if (!dropdown.classList.contains('is-active')) {
            dropdown.classList.add('is-active');
            updateAriaExpanded(true);
            focusMenuItem(0); // Focus first item when opening
          } else {
            // If currentIndex is -1 (dropdown opened via mouse or not yet initialized), focus first item
            if (currentIndex < 0) {
              focusMenuItem(0);
            } else {
              const nextIndex =
                currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
              focusMenuItem(nextIndex);
            }
          }
        } else if (key === 'ArrowUp') {
          e.preventDefault();
          if (!dropdown.classList.contains('is-active')) {
            dropdown.classList.add('is-active');
            updateAriaExpanded(true);
            // Start from last item when opening with ArrowUp
            focusMenuItem(menuItems.length - 1);
          } else {
            // If currentIndex is -1 (dropdown opened via mouse), start from last
            const startIndex = currentIndex < 0 ? menuItems.length - 1 : currentIndex;
            const prevIndex = startIndex > 0 ? startIndex - 1 : menuItems.length - 1;
            focusMenuItem(prevIndex);
          }
        }
      },
      { signal: abortController.signal }
    );
  }
  // Keyboard navigation on menu items
  menuItems.forEach((item, index) => {
    item.addEventListener(
      'keydown',
      (e) => {
        const key = e.key;
        if (key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = index < menuItems.length - 1 ? index + 1 : 0;
          focusMenuItem(nextIndex);
        } else if (key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = index > 0 ? index - 1 : menuItems.length - 1;
          focusMenuItem(prevIndex);
        } else if (key === 'Escape') {
          e.preventDefault();
          closeDropdown();
        } else if (key === 'Enter' || key === ' ') {
          e.preventDefault();
          item.click();
        } else if (key === 'Home') {
          e.preventDefault();
          focusMenuItem(0);
        } else if (key === 'End') {
          e.preventDefault();
          focusMenuItem(menuItems.length - 1);
        }
      },
      { signal: abortController.signal }
    );
  });
  // Initialize aria-expanded
  updateAriaExpanded(false);
  // For navbar dropdown, ensure proper initial state
  if (dropdown) {
    dropdown.classList.remove('is-active');
  }
  return {
    cleanup: () => {
      abortController.abort();
    },
  };
}
export function enhanceAccessibility(documentObj) {
  const pres = documentObj.querySelectorAll('.highlight > pre');
  pres.forEach((pre) => {
    if (!pre.hasAttribute('tabindex')) pre.setAttribute('tabindex', '0');
    if (!pre.hasAttribute('role')) pre.setAttribute('role', 'region');
    if (!pre.hasAttribute('aria-label')) pre.setAttribute('aria-label', 'Code block');
  });
}
// Auto-initialize on DOMContentLoaded
if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initTheme(document, window)
      .then(() => {
        const { cleanup } = wireFlavorSelector(document, window);
        enhanceAccessibility(document);
        // Register cleanup to run on teardown
        const pagehideHandler = () => {
          cleanup();
          window.removeEventListener('pagehide', pagehideHandler);
        };
        window.addEventListener('pagehide', pagehideHandler);
      })
      .catch((error) => {
        console.error('Theme switcher initialization failed:', error);
      });
  });
}
//# sourceMappingURL=index.js.map
