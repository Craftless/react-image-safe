import React from "react";

import classes from "./App.module.css";
import { useContext, useEffect, useRef, useState } from "react";

import InputPage from "./pages/InputPage";
import { ThemeContext, ThemeContextProvider } from "./store/theme-context";
import { Provider } from "react-redux";
import store from "./store/redux/store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Root() {
  const themeCtx = useContext(ThemeContext);

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
      <ToastContainer
        theme={themeCtx.theme}
        toastStyle={{ backgroundColor: themeCtx.toastColour }}
      />
      <button
        onClick={() => {
          toast.success("NOO");
        }}
      >
        IODSF
      </button>
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
