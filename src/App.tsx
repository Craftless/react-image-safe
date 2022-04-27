import classes from "./App.module.css";

import Modal from "./components/ui/Modal";
import PasscodePadFlex from "./components/functionality/PasscodePadFlex";
import React, { useState } from "react";
import ImageUrlPage from "./pages/ImageUrlPage";
import CurrentDetailsProvider from "./store/CurrentDetailsProvider";

function App() {
  
  async function formSubmitHandler() {
    const response = await fetch('https://cyp-image-safe-default-rtdb.firebaseio.com/safe.json', {
      method: 'POST',
      body: JSON.stringify(meetup),
      headers: {
        'Content-Type': "application/json"
      }
    })
  }

  function passcodeModalCloseHandler() {
    setShowPasscodeModal(false);
  }
  return (
    <div className={classes.appContainer}>
      <CurrentDetailsProvider>
        <PasscodePadFlex />
        {showPasscodeModal && (
          <Modal onClose={passcodeModalCloseHandler}>
            <ImageUrlPage onSubmitForm={formSubmitHandler} />
          </Modal>
        )}
      </CurrentDetailsProvider>
    </div>
  );
}

export default App;
