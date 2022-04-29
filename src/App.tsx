import classes from "./App.module.css";
import React, { useRef } from "react";

import InputPage from "./pages/InputPage";

function App() {
  const imageRef = useRef<HTMLImageElement>();
  if (imageRef?.current) {
    imageRef.current.onload = () => {
      console.log("LOADED");
    }
    imageRef.current.onerror = () => {
      console.log("FAILED");
    }
  }

  return (
    <div className={classes.appContainer}>
      <InputPage />
      <img
        src="https://picsum.photos/129031283192"
        width={400}
        ref={imageRef as React.MutableRefObject<HTMLImageElement>}
      />
    </div>
  );
}

export default App;
