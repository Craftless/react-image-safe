import classes from "./App.module.css";

import Modal from "./components/ui/Modal";
import PasscodePadFlex from "./components/functionality/PasscodePadFlex";
import React, { useState } from "react";
import ImageUrlPage from "./pages/ImageUrlPage";

function App() {
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [enteredImageUrls, setEnteredImageUrls] = useState<string[]>([]);

  console.log(enteredImageUrls);

  function formSubmitHandler(
    event: React.FormEvent<HTMLFormElement>,
    ref: React.MutableRefObject<HTMLInputElement[]>
  ) {
    console.log("Working");
    event.preventDefault();
    setShowPasscodeModal(true);
    const urlArray: string[] = ref.current.reduce((prev, current) => {
      prev.push(current.value);
      return prev;
    }, [] as string[]);

    setEnteredImageUrls((current) => {
      return [...current, ...urlArray];
    });
  }

  function passcodeModalCloseHandler() {
    setShowPasscodeModal(false);
  }
  return (
    <div className={classes.appContainer}>
      <ImageUrlPage onSubmitForm={formSubmitHandler} />
      {showPasscodeModal && (
        <Modal onClose={passcodeModalCloseHandler}>
          <PasscodePadFlex />
        </Modal>
      )}
    </div>
  );
}

export default App;
