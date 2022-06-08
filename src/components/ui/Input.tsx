import classes from "./Input.module.css";
import React from "react";

const Input = ({
  children,
  id,
  value,
  showError,
  onInputChanged,
  onInputBlur,
  inputProps,
}: {
  children: React.ReactNode;
  id: string;
  value: string;
  showError: boolean;
  onInputChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInputBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  inputProps: React.HTMLProps<HTMLInputElement>;
}) => {
  const contClasses = `${showError ? classes.error : null} ${
    classes.outerContainer
  }`;

  return (
    <div className={contClasses}>
      <label htmlFor={`url-input${id}`}>{children}</label>
      <input
        value={value}
        onChange={onInputChanged}
        onBlur={onInputBlur}
        id={`url-input${id}`}
        className={classes.input}
        {...inputProps}
      />
    </div>
  );
};

export default Input;
