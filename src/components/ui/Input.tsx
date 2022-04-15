import classes from "./Input.module.css";
import React from "react";

const Input = React.forwardRef(
  ({ children, id }: { children: React.ReactNode; id: string }, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
      <div className={classes.outerContainer}>
        <label htmlFor={`url-input${id}`}>{children}</label>
        <input ref={ref} id={`url-input${id}`} />
      </div>
    );
  }
);

export default Input;
