import React, { useRef, useState } from "react";
import classes from "./PasscodePadFlex.module.css";

const buttonsText: string[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "Lock",
  "0",
  "Unlock",
];

let showError = false;
function PasscodePadFlex({
  onUpdateDetails,
}: {
  onUpdateDetails: React.Dispatch<{
    type: "LOCK" | "UNLOCK";
    data: { type: "PASSCODE" | "URL"; passcode?: string; imageUrl?: string };
  }>;
}) {
  const [message, setMessage] = useState("");
  const [enteredPasscode, setEnteredPasscode] = useState("");
  const inputBox = useRef<HTMLInputElement>(null);

  function passcodeBtnClickedHandler(type: string) {
    switch (type) {
      case "Lock":
        if (enteredPasscode.trim().length < 4) {
          setMessage("Please enter a passcode with a length greater than 4.");
          return;
        }
        onUpdateDetails({ type: "LOCK", data: { type: "PASSCODE", passcode: enteredPasscode }});
        break;
      case "Unlock":
        break;
      default:
        if (isNaN(+type)) {
          setMessage("Please enter a valid number");
          return;
        }
        setEnteredPasscode((current) => current + type);
        setMessage("");
        if (inputBox.current)
          inputBox.current.scrollLeft = inputBox.current.scrollWidth;
        break;
    }
    showError = true;
  }

  function checkForValidity() {
    if (enteredPasscode.trim().length < 4) return false;
    if (isNaN(+enteredPasscode)) return false;

    return true;
  }

  return (
    <div className={classes.outerContainer}>
      <div className={classes.passcodeTextContainer}>
        <label htmlFor="passcode-field">Passcode:</label>
        <input
          className={`${classes.passcodeText} ${
            showError
              ? checkForValidity()
                ? classes.valid
                : classes.invalid
              : ""
          }`}
          ref={inputBox}
          id="passcode-field"
          value={enteredPasscode}
          readOnly
        />
        <button className={classes.clearButton} onClick={() => {
          setEnteredPasscode("");
        }}>
          &#10005;
        </button>
      </div>
      {/* <div> */}
      <div className={classes.buttonsContainer}>
        {buttonsText.map((item) => {
          return (
            <div className={classes.buttonContainer} key={item}>
              <button
                className={classes.button}
                onClick={passcodeBtnClickedHandler.bind(null, item)}
              >
                {item}
              </button>
            </div>
          );
        })}
        {/* </div> */}
      </div>
      <p>{message || <>&#10240;</>}</p>
    </div>
  );
}

export default PasscodePadFlex;
