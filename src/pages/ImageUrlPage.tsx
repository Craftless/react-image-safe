import React from "react";
import { useRef } from "react";
import Input from "../components/ui/Input";
import classes from "./ImageUrlPage.module.css";

function ImageUrlPage({
  onSubmitForm,
}: {
  onSubmitForm: (
    event: React.FormEvent<HTMLFormElement>,
    ref: React.MutableRefObject<HTMLInputElement[]>
  ) => void;
}) {
  const urlRefs = useRef<HTMLInputElement[]>([]);

  return (
    <div className={classes.outerContainer}>
      <div className={classes.formContainer}>
        <form
          onSubmit={(e) => {
            onSubmitForm(e, urlRefs);
          }}
          className={classes.form}
        >
          <Input
            ref={(el) => urlRefs.current.push(el as HTMLInputElement)}
            id={Math.random().toFixed(3)}
          >
            Image URL
          </Input>
          <button type="submit">Confirm</button>
        </form>
      </div>
    </div>
  );
}

export default ImageUrlPage;
