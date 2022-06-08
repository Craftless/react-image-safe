import React, { createContext, useState } from "react";

interface IThemeContext {
  theme: "light" | "dark";
  toastColour: string;
  changeTheme: (dark?: boolean) => void;
}

export const ThemeContext = createContext({
  theme: "light",
  toastColour: "white",
  changeTheme: (dark?: boolean) => {},
} as IThemeContext);

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("light" as "light" | "dark");
  const toastColour = theme === "light" ? "white" : "#4A4A4A";
  function changeTheme(dark?: boolean) {
    if (dark !== undefined) {
      setTheme(dark ? "dark" : "light");
      return;
    }
    setTheme(theme === "light" ? "dark" : "light");
  }
  return (
    <ThemeContext.Provider value={{ theme, toastColour, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
