import React, { useContext, useRef, useState } from "react";
import { ThemeContext } from "../../store/theme-context";
import LoadingSpinner from "../ui/LoadingSpinner";
import Switch from "../ui/Switch";
import classes from "./PasscodePadFlex.module.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

function PasscodePadFlex({
  onUpdateDetails,
  onUnlock,
}: {
  onUpdateDetails: (object: { passcode?: string; url?: string }) => void;
  onUnlock: (passcode: string) => void
}) {
  const [enteredPasscode, setEnteredPasscode] = useState("");
  const [touched, setTouched] = useState(false);
  const inputBox = useRef<HTMLInputElement>(null);
  const themeCtx = useContext(ThemeContext);

  function passcodeBtnClickedHandler(type: string) {
    setTouched(true);
    switch (type) {
      case "Lock":
        if (enteredPasscode.trim().length < 4) {
          toast.warn("Please enter a passcode with a length greater than 4.");
          return;
        }
        onUpdateDetails({
          passcode: enteredPasscode,
        });
        break;
      case "Unlock":
        if (enteredPasscode.trim().length < 4) {
          toast.warn("Please enter a passcode with a length greater than 4.");
          return;
        }
        onUnlock(enteredPasscode);
        break;
      default:
        if (isNaN(+type)) {
          toast.warn("Please enter a valid number");
          return;
        }
        setEnteredPasscode((current) => current + type);
        if (inputBox.current)
          inputBox.current.scrollLeft = inputBox.current.scrollWidth;
        break;
    }
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
            touched
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
        <button
          className={classes.clearButton}
          onClick={() => {
            setEnteredPasscode("");
          }}
        >
          &#10005;
        </button>
      </div>
      {/* <div> */}
      <Switch
        onInput={(e) => {
          const el = e.target as HTMLInputElement;
          console.log(el.checked);
          themeCtx.changeTheme(el.checked);
        }}
      />

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
      </div>
    </div>
  );
}

export default PasscodePadFlex;
