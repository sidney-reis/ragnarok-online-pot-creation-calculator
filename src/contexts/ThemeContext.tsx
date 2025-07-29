import { useEffect, useState, type ReactNode } from "react";
import { ConfigProvider, theme } from "antd";
import type { Theme } from "../types";
import { THEME_STORAGE_KEY } from "../constants";
import { ThemeContext } from "./theme";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
    return savedTheme || "light";
  });

  const toggleTheme = () => {
    const newTheme: Theme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  useEffect(() => {
    // Update the document class for global styling
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  const antdTheme = {
    algorithm:
      currentTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
};
