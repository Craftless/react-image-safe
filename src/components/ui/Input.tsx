import classes from "./Input.module.css";
import React from "react";

const Input = React.forwardRef(
  ({ children, id, type, onInputChanged }: { children: React.ReactNode; id: string, type:string, onInputChanged: (event: React.ChangeEvent<HTMLInputElement>) => void  }, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
      <div className={classes.outerContainer}>
        <label htmlFor={`url-input${id}`}>{children}</label>
        <input type={type} ref={ref} onChange={onInputChanged} id={`url-input${id}`} defaultValue="https://picsum.photos/200" />
      </div>
    );
  }
);

export default Input;
