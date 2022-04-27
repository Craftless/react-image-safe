import Modal from "../components/ui/Modal";
import PasscodePadFlex from "../components/functionality/PasscodePadFlex";
import ImageUrlForm from "./ImageUrlForm";
import React, { useEffect, useReducer, useState } from "react";

export interface Details {
  passcode: string;
  imageUrl: string;
}

const initialState = {
  passcode: "",
  imageUrl: "",
} as Details;

function InputPage() {
  const [showImageUrlForm, setShowImageUrlForm] = useState(false);
  const [detailsState, dispatch] = useReducer(detailsReducer, initialState);

  function detailsReducer(
    state: Details,
    action: { type: "PASSCODE" | "CONFIRM_URL"; data: string }
  ) {
    switch (action.type) {
      case "PASSCODE":
        setShowImageUrlForm(true);
        return {
          passcode: action.data,
          imageUrl: state.imageUrl,
        } as Details;
      case "CONFIRM_URL":
        // formSubmitHandler();
        return {
          passcode: state.passcode,
          imageUrl: action.data,
        } as Details;
    }
    return state;
  }

  useEffect(() => {
    if (detailsState.imageUrl) formSubmitHandler();
  }, [detailsState.imageUrl]);

  async function formSubmitHandler() {
    if (!detailsState.passcode) console.log("SADNOFODISN");
    try {
      const response = await fetch(
        "https://cyp-image-safe-default-rtdb.firebaseio.com/safe.json",
        {
          method: "POST",
          body: JSON.stringify(detailsState),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = "Something went wrong!";
        throw new Error(data?.error?.message || errorMessage);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function modalCloseHandler() {
    setShowImageUrlForm(false);
  }

  let content = <PasscodePadFlex onUpdateDetails={dispatch} />;
  if (showImageUrlForm) {
    content = (
      <Modal onClose={modalCloseHandler}>
        <ImageUrlForm
          onSubmitForm={formSubmitHandler}
          onUpdateDetails={dispatch}
        />
      </Modal>
    );
  }

  return <>{content}</>;
}

export default InputPage;
