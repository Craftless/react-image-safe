import React, { useContext } from "react";
import { useState } from "react";
import Input from "../components/ui/Input";
import useInput from "../hooks/use-input";
import CurrentDetailsContext from "../store/current-details-context";
import classes from "./ImageUrlForm.module.css";

function ImageUrlForm({
  onSubmitForm,
  onUpdateDetails,
}: {
  onSubmitForm: () => void;
  onUpdateDetails: React.Dispatch<{
    type: "PASSCODE" | "CONFIRM_URL";
    data: string;
  }>;
}) {
  const {
    value: enteredImageUrl,
    hasError: imageUrlHasError,
    isValid: imageUrlValid,
    inputTouchedHandler: imageUrlTouchedHandler,
    valueChangedHandler: imageUrlChangedHandler,
  } = useInput((curVal) => curVal.match(/\.(jpeg|jpg|gif|png)$/) != null);

  const [preview, setPreview] = useState("");
  const curDetailsCtx = useContext(CurrentDetailsContext);

  function formSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onUpdateDetails({ type: "CONFIRM_URL", data: enteredImageUrl });
  }

  return (
    <div className={classes.outerContainer}>
      <div className={classes.formContainer}>
        <form onSubmit={formSubmitHandler} className={classes.form}>
          <Input
            type="url"
            value={enteredImageUrl}
            onInputChanged={imageUrlChangedHandler}
            id={Math.random().toFixed(3)}
          >
            Image URL
          </Input>
          <button type="submit">Confirm</button>
        </form>
        <div className={classes.previewContainer}>
          <img src={enteredImageUrl} alt="Preview" />
        </div>
      </div>
    </div>
  );
}

export default ImageUrlForm;
