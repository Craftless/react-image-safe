import React from "react";
import Input from "../components/ui/Input";
import useImageInput from "../hooks/use-image-input";
import classes from "./ImageUrlForm.module.css";

function ImageUrlForm({
  onUpdateDetails,
}: {
  onUpdateDetails: (object: { passcode?: string; url?: string }) => void;
}) {
  const {
    value: enteredImageUrl,
    hasError: imageUrlHasError,
    isValid: imageUrlValid,
    inputTouchedHandler: imageUrlTouchedHandler,
    valueChangedHandler: imageUrlChangedHandler,
    status,
  } = useImageInput(); // curVal.match(/\.(jpeg|jpg|gif|png)$/) != null

  // const isImageURL = require("image-url-validator").default;
  // isImageURL("https://via.placeholder.com/300/09f/fff.png").then(
  //   (is_image: boolean) => {
  //     console.log(`IS Image: ${is_image}`); //=> true
  //   }
  // );

  // const status = useValidateImageURL(enteredImageUrl);

  function formSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onUpdateDetails({
      url: enteredImageUrl,
    });
  }

  return (
    <div className={classes.outerContainer}>
      <div className={classes.formContainer}>
        <form onSubmit={formSubmitHandler} className={classes.form}>
          <Input
            value={enteredImageUrl}
            onInputChanged={imageUrlChangedHandler}
            onInputBlur={imageUrlTouchedHandler}
            id={Math.random().toFixed(3)}
            showError={imageUrlHasError}
            inputProps={{
              type: "url",
              autoFocus: true,
            }}
          >
            Image URL
          </Input>
          <button disabled={!imageUrlValid} type="submit">
            Confirm
          </button>
          <p>{status}</p>
        </form>
        <div className={classes.previewContainer}>
          {imageUrlValid ? (
            <img src={enteredImageUrl} alt="Preview" />
          ) : (
            "URL is invalid"
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageUrlForm;
