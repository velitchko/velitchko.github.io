'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Theme = 'retro' | 'professional';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'retro',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('retro');

  useEffect(() => {
    // Sync with the value applied by the FOUC-prevention inline script
    const stored = (localStorage.getItem('site-theme') as Theme) || 'retro';
    setTheme(stored);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'retro' ? 'professional' : 'retro';
      localStorage.setItem('site-theme', next);
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
