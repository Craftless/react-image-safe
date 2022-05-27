import classes from "./App.module.css";
import { useRef, useState } from "react";

import InputPage from "./pages/InputPage";
import { ThemeContextProvider } from "./store/theme-context";

function App() {
  const [theme, setTheme] = useState("light" as "light" | "dark");

  const imageRef = useRef<HTMLImageElement>();
  if (imageRef?.current) {
    imageRef.current.onload = () => {
      console.log("LOADED");
    };
    imageRef.current.onerror = () => {
      console.log("FAILED");
    };
  }

  return (
    <ThemeContextProvider>
      <div className={classes.appContainer} data-theme={theme}>
        <InputPage />
        <button
          onClick={() => {
            setTheme("dark");
          }}
        >
          Change theme
        </button>
        {theme}
      </div>
    </ThemeContextProvider>
  );
}

export default App;
