import { ReactNode, createContext, useState } from "react";

const theme = {
  colors: {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    text: 'var(--color-text)',
  },
  main: {
    background: 'var(--main-background)',
    search:{
        
    }
  }
};

export type ThemeType = typeof theme;

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme,
  setTheme: () => {},
});

export const ThemeProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(theme);

  const setTheme = (theme: ThemeType) => setCurrentTheme(theme);

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
