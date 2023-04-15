// components/ThemeProvider.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { useTheme } from '../utils/useTheme';

type ThemeName = 'default' | 'dark';

type ThemeContextType = {
  themeName: ThemeName;
  setThemeName: (themeName: ThemeName) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  themeName: 'default',
  setThemeName: () => {},
});

type Props = {
  children: React.ReactNode;
};

const THEME_STORAGE_KEY = 'theme';

export default function ThemeProvider({ children }: Props) {
  const [themeName, setThemeName] = useState<ThemeName>(() => {
    if (typeof window !== 'undefined') {
      const storedThemeName = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName;
      return storedThemeName || 'default';
    }
    return 'default';
  });
  const theme = useTheme(themeName);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, themeName);
    }
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName }}>
      <div style={{ color: theme.colors.secondary }}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
