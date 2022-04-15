import classes from "./App.module.css";

import Modal from "./components/ui/Modal";
import PasscodePadFlex from "./components/functionality/PasscodePadFlex";
import React, { useState } from "react";
import ImageUrlPage from "./pages/ImageUrlPage";

function App() {
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [enteredImageUrl, setEnteredImageUrl] = useState("");

  console.log(enteredImageUrl);

  function formSubmitHandler(
    event: React.FormEvent<HTMLFormElement>,
    url: string
  ) {
    event.preventDefault();
    setShowPasscodeModal(true);

    setEnteredImageUrl(url);
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
