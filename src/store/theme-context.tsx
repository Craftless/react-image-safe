import React, { createContext, useState } from "react";

interface IThemeContext {
  theme: "light" | "dark";
  changeTheme: (dark?: boolean) => void;
}

export const ThemeContext = createContext({
  theme: "light",
  changeTheme: (dark?: boolean) => {},
} as IThemeContext);

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("light" as "light" | "dark");
  function changeTheme(dark?: boolean) {
    if (dark !== undefined) {
      setTheme(dark ? "dark" : "light");
      return;
    }
    setTheme(theme === "light" ? "dark" : "light");
  }
  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
