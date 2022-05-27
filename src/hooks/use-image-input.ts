import React, { useEffect, useState } from "react";

function useImageInput() {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = enteredValue;
    image.addEventListener("load", () => {
      setStatus(true);
    });
    image.addEventListener("error", () => {
      setStatus(false);
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
    status
  };
}

export default useImageInput;
