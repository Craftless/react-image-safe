import classes from "./Input.module.css";
import React from "react";

const Input = React.forwardRef(
  ({ children, id, type }: { children: React.ReactNode; id: string, type:string  }, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
      <div className={classes.outerContainer}>
        <label htmlFor={`url-input${id}`}>{children}</label>
        <input type={type} ref={ref} id={`url-input${id}`} defaultValue="https://picsum.photos/200" />
      </div>
    );
  }
);

export default Input;
