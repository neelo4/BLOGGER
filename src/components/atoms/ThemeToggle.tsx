import { useEffect, useState } from 'react';
import { setTheme, getStoredTheme, type Theme, initTheme } from '@/shared/lib/theme';
import { Button } from './Button';

export function ThemeToggle() {
  const [theme, setLocal] = useState<Theme>(getStoredTheme() ?? 'light');

  useEffect(() => {
    initTheme();
    // Ensure initial attribute is in sync
    const current = getStoredTheme();
    if (current) setLocal(current);
  }, []);

  const next = theme === 'light' ? 'dark' : 'light';

  return (
    <Button
      variant="ghost"
      onClick={() => {
        setTheme(next);
        setLocal(next);
      }}
      title={`Switch to ${next} theme`}
    >
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </Button>
  );
}

export default ThemeToggle;

