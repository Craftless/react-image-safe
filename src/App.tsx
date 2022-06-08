import classes from "./App.module.css";
import { useContext, useEffect, useRef, useState } from "react";

import InputPage from "./pages/InputPage";
import { ThemeContext, ThemeContextProvider } from "./store/theme-context";
import { Provider } from "react-redux";
import store from "./store/redux/store";

function Root() {
  const themeCtx = useContext(ThemeContext)

  const imageRef = useRef<HTMLImageElement>();
  if (imageRef?.current) {
    imageRef.current.onload = () => {
      console.log("LOADED");
    };
    imageRef.current.onerror = () => {
      console.log("FAILED");
    };
  }
  useEffect(() => {
    console.log("HELP");
  }, []);

  return (
    <div className={classes.appContainer} data-theme={themeCtx.theme}>
      <InputPage />
      {/* <button
        onClick={() => {
          themeCtx.toggleTheme();
        }}
      >
        Change theme
      </button>
      {themeCtx.theme} */}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <Root />
      </ThemeContextProvider>
    </Provider>
  );
}

export default App;
