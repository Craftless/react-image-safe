import React, { RefObject, useContext } from "react";
import { useState } from "react";
import { useRef } from "react";
import Input from "../components/ui/Input";
import useInput from "../hooks/use-input";
import CurrentDetailsContext from "../store/current-details-context";
import classes from "./ImageUrlForm.module.css";

function ImageUrlForm({ onSubmitForm }: { onSubmitForm: () => void }) {
  const { value: enteredImageUrl, hasError: imageUrlHasError, isValid: imageUrlValid, inputTouchedHandler: imageUrlTouchedHandler, valueChangedHandler: imageUrlChangedHandler } = useInput(
    (curVal) => curVal.match(/\.(jpeg|jpg|gif|png)$/) != null
  );

  const urlRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState("");
  const curDetailsCtx = useContext(CurrentDetailsContext);

  function formSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (urlRef.current) {
      curDetailsCtx.setUrl(urlRef.current.value);
      curDetailsCtx.showModal(false);
    }
  }

  return (
    <div className={classes.outerContainer}>
      <div className={classes.formContainer}>
        <form onSubmit={formSubmitHandler} className={classes.form}>
          <Input type="url" ref={urlRef} onInputChanged={imageUrlChangedHandler} id={Math.random().toFixed(3)}>
            Image URL
          </Input>
          <button type="submit">Confirm</button>
          <button
            type="button"
            onClick={() => {
              setPreview(urlRef.current?.value as string);
            }}
          >
            Preview
          </button>
        </form>
        <div className={classes.previewContainer}>
          <img src={preview} />
        </div>
      </div>
      <div className={classes.unlockContainer}>
        <button>Unlock</button>
      </div>
    </div>
  );
}

export default ImageUrlForm;
