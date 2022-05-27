import Modal from "../components/ui/Modal";
import PasscodePadFlex from "../components/functionality/PasscodePadFlex";
import ImageUrlForm from "./ImageUrlForm";
import React, { useEffect, useReducer, useState } from "react";

export interface Details {
  passcode: string;
  imageUrl: string;
  confirm: boolean;
}


const initialState = {
  passcode: "",
  imageUrl: "",
  confirm: false,
} as Details;

function InputPage() {
  const [showImageUrlForm, setShowImageUrlForm] = useState(false);
  const [detailsState, dispatch] = useReducer(detailsReducer, initialState);

  function detailsReducer(
    state: Details,
    // action: { type: "PASSCODE" | "CONFIRM_URL"; data: string }
    action: {
      type: "LOCK" | "UNLOCK";
      data: { type: "PASSCODE" | "URL"; passcode?: string; imageUrl?: string };
    }
  ) {
    switch (action.type) {
      case "LOCK":
        switch (action.data.type) {
          case "PASSCODE":
            setShowImageUrlForm(true);
            return {
              ...state,
              passcode: action.data.passcode,
            } as Details;
          case "URL":
            return {
              ...state,
              imageUrl: action.data.imageUrl,
              confirm: true,
            } as Details;
        }
        break;
      case "UNLOCK":
        switch (action.data.type) {
          case "PASSCODE":
            break;
        }
        break;
    }

    return state;
  }

  const formSubmitHandler = React.useCallback(async () => {
    if (!detailsState.passcode) console.log("SADNOFODISN");
    try {
      const response = await fetch(
        "https://cyp-image-safe-default-rtdb.firebaseio.com/safe.json",
        {
          method: "POST",
          body: JSON.stringify({
            passcode: detailsState.passcode,
            url: detailsState.imageUrl,
          }),
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
  }, [detailsState.passcode, detailsState.imageUrl]);

  useEffect(() => {
    if (detailsState.confirm && detailsState.imageUrl) formSubmitHandler();
  }, [detailsState.imageUrl, detailsState.confirm, formSubmitHandler]);

 

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
