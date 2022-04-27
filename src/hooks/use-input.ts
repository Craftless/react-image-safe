import React, { useState } from "react";

function useInput(validationFunc: (enteredValue: string) => boolean) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validationFunc(enteredValue);

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
  };
}

export default useInput;
