import classes from "./Input.module.css";
import React from "react";

const Input = ({
  children,
  id,
  type,
  value,
  onInputChanged,
}: {
  children: React.ReactNode;
  id: string;
  type: string;
  value: string;
  onInputChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className={classes.outerContainer}>
      <label htmlFor={`url-input${id}`}>{children}</label>
      <input
        type={type}
        value={value}
        onChange={onInputChanged}
        id={`url-input${id}`}
        defaultValue="https://picsum.photos/200"
      />
    </div>
  );
};

export default Input;
