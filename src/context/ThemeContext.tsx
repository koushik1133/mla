"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export type ThemeMode = "saffron" | "green";

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isGreenPath = Boolean(pathname?.startsWith("/green"));
  const [theme, setThemeState] = useState<ThemeMode>(() => (isGreenPath ? "green" : "saffron"));

  useEffect(() => {
    const currentTheme = isGreenPath ? "green" : theme;
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", currentTheme);
    }
  }, [isGreenPath, theme]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem("beerla_theme", newTheme);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", newTheme);
    }
  };

  const toggleTheme = () => {
    const next = theme === "saffron" ? "green" : "saffron";
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
