import React, { useEffect, useState } from "react";

let currentImg: HTMLImageElement | null = null;

function useImageInput() {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = enteredValue;
    currentImg = image;
    image.addEventListener("load", (event) => {
      if (currentImg === event.target) {
        setStatus(true);
        currentImg = null;
      }
    });
    image.addEventListener("error", (event) => {
      if (currentImg === event.target) {
        setStatus(false);
        currentImg = null;
      }
    });
  }, [enteredValue]);

  const isValid = status;

  const hasError = !isValid && isTouched;

  function valueChangedHandler(
    event?: React.ChangeEvent<HTMLInputElement>,
    currentValue?: string
  ) {
    if (event) setEnteredValue(event.target.value);
    else if (currentValue) setEnteredValue(currentValue);
  }

  function inputTouchedHandler(event?: React.FocusEvent<HTMLInputElement>) {
    setIsTouched(true);
  }

  return {
    value: enteredValue,
    isValid,
    hasError,
    valueChangedHandler,
    inputTouchedHandler,
    status,
  };
}

export default useImageInput;
