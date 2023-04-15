// utils/useTheme.ts
import { useState, useEffect } from "react";

type Theme = typeof defaultTheme;

const darkTheme = {
  colors: {
    primary: "#0070f3",
    secondary: "#eaeaea",
  },
//   typography: {
//     fontFamily: "Helvetica Neue",
//     fontSize: "16px",
//   },
};

const defaultTheme = {
  colors: {
    primary: "#ffffff",
    secondary: "#333333",
  },
//   typography: {
//     fontFamily: "Helvetica Neue",
//     fontSize: "16px",
//   },
};

export function useTheme(themeName: string): Theme {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    switch (themeName) {
      case "default":
        setTheme(defaultTheme);
        break;
      case "dark":
        setTheme(darkTheme);
        break;
      default:
        console.warn(`Invalid theme name: ${themeName}`);
        setTheme(defaultTheme);
        break;
    }
  }, [themeName]);

  return theme;
}
