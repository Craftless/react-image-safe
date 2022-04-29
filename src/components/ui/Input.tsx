import classes from "./Input.module.css";
import React from "react";

const Input = ({
  children,
  id,
  type,
  value,
  showError,
  onInputChanged,
  onInputBlur,
}: {
  children: React.ReactNode;
  id: string;
  type: string;
  value: string;
  showError: boolean;
  onInputChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInputBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}) => {
  const contClasses = `${showError ? classes.error : null} ${
    classes.outerContainer
  }`;
 
  return (
    <div className={contClasses}>
      <label htmlFor={`url-input${id}`}>{children}</label>
      <input
        type={type}
        value={value}
        onChange={onInputChanged}
        onBlur={onInputBlur}
        id={`url-input${id}`}
      />
    </div>
  );
};

export default Input;
