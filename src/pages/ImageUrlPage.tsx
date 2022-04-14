import React from "react";
import classes from "./ImageUrlPage.module.css";

function ImageUrlPage({onSubmitForm}: {onSubmitForm: (event: React.FormEvent<HTMLFormElement>) => void}) {
  

  return (
    <div className={classes.outerContainer}>
      <div className={classes.formContainer}>
        <form onSubmit={onSubmitForm}>
          <input />
          <button type="submit">Confirm</button>
        </form>
      </div>
    </div>
  );
}

export default ImageUrlPage;
