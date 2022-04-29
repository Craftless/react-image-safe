import React, { useEffect, useState } from "react";

function useInput(validationFunc?: (enteredValue: string) => boolean) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [status, setStatus] = useState(false);

  // const status = useValidateImageURL(enteredValue);

  useEffect(() => {
    const image = new Image();
    image.src = enteredValue;
    image.addEventListener("load", () => {
      setStatus(true);
    });
    image.addEventListener("error", () => {
      setStatus(false);
    });
    // const thin = async () => {
    //   const status = await doesImageExist(enteredValue);
    //   setStatus(status);
    // };
    // thin();

  //   testImage(enteredValue, (url, result) => {
  //     setStatus(result === "success");
  //     console.log(result);
  //   }, 10000);
  }, [enteredValue]);

  // const doesImageExist: (url: string) => Promise<boolean> = async (
  //   url: string
  // ) =>
  //   new Promise((resolve) => {
  //     const img = new Image();

  //     img.src = url;
  //     img.onload = () => resolve(true);
  //     img.onerror = () => resolve(false);
  //   });

  // function testImage(
  //   url: string,
  //   callback: (url: string, result: "success" | "error" | "timeout") => void,
  //   timeout: number
  // ) {
  //   timeout = timeout || 5000;
  //   var timedOut = false,
  //     timer: NodeJS.Timeout;
  //   var img = new Image();
  //   img.onerror = img.onabort = function () {
  //     if (!timedOut) {
  //       clearTimeout(timer);
  //       callback(url, "error");
  //     }
  //   };
  //   img.onload = function () {
  //     if (!timedOut) {
  //       clearTimeout(timer);
  //       callback(url, "success");
  //     }
  //   };
  //   img.src = url;
  //   timer = setTimeout(function () {
  //     timedOut = true;
  //     // reset .src to invalid URL so it stops previous
  //     // loading, but doesn't trigger new load
  //     img.src = "//!!!!/test.jpg";
  //     callback(url, "timeout");
  //   }, timeout);
  // }

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

export default useInput;
