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
    if (savedTheme) {
      return savedTheme;
    }

    // Use system preference as default
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? "dark" : "light";
  });

  // Disable transitions during startup
  useEffect(() => {
    document.documentElement.classList.add("no-transitions");

    // Enable transitions after a short delay to allow initial render
    const timer = setTimeout(() => {
      document.documentElement.classList.remove("no-transitions");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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
