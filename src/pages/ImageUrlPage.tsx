import React, { RefObject } from "react";
import { useState } from "react";
import { useRef } from "react";
import Input from "../components/ui/Input";
import classes from "./ImageUrlPage.module.css";

function ImageUrlPage({
  onSubmitForm,
}: {
  onSubmitForm: (event: React.FormEvent<HTMLFormElement>, url: string) => void;
}) {
  const urlRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState("");

  return (
    <div className={classes.outerContainer}>
      <div className={classes.formContainer}>
        <form
          onSubmit={(e) => {
            if (urlRef.current) onSubmitForm(e, urlRef.current.value);
          }}
          className={classes.form}
        >
          <Input type="url" ref={urlRef} id={Math.random().toFixed(3)}>
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
          <img src={preview}/>
        </div>
      </div>
      <div className={classes.unlockContainer}>
        <button>Unlock</button>
      </div>
    </div>
  );
}

export default ImageUrlPage;
