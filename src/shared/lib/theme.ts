export type Theme = 'light' | 'dark';

const KEY = 'app_theme';

export function getStoredTheme(): Theme | null {
  const t = localStorage.getItem(KEY);
  return t === 'light' || t === 'dark' ? t : null;
}

export function setTheme(t: Theme) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem(KEY, t);
}

export function initTheme() {
  const stored = getStoredTheme();
  if (stored) {
    document.documentElement.setAttribute('data-theme', stored);
  }
}

