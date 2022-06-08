import Modal from "../components/ui/Modal";
import PasscodePadFlex from "../components/functionality/PasscodePadFlex";
import ImageUrlForm from "./ImageUrlForm";
import { useEffect, useState } from "react";
import { ref, set } from "firebase/database";
import { projectDb } from "../firebase/config";
import { useAppSelector } from "../hooks/redux";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { FirebaseError } from "firebase/app";

// export interface Details {
//   passcode: string;
//   imageUrl: string;
//   confirm: boolean;
// }

// const initialState = {
//   passcode: "",
//   imageUrl: "",
//   confirm: false,
// } as Details;

function InputPage() {
  const [showImageUrlForm, setShowImageUrlForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const passcode = useAppSelector((state) => state.safe.passcode);
  const url = useAppSelector((state) => state.safe.imageUrl);
  const [details, setDetails] = useState(
    {} as { passcode: string; url: string }
  );

  // const [detailsState, dispatch] = useReducer(detailsReducer, initialState);

  // function detailsReducer(
  //   state: Details,
  //   // action: { type: "PASSCODE" | "CONFIRM_URL"; data: string }
  //   action: {
  //     type: "LOCK" | "UNLOCK";
  //     data: { type: "PASSCODE" | "URL"; passcode?: string; imageUrl?: string };
  //   }
  // ) {
  //   switch (action.type) {
  //     case "LOCK":
  //       switch (action.data.type) {
  //         case "PASSCODE":
  //           setShowImageUrlForm(true);
  //           return {
  //             ...state,
  //             passcode: action.data.passcode,
  //           } as Details;
  //         case "URL":
  //           return {
  //             ...state,
  //             imageUrl: action.data.imageUrl,
  //             confirm: true,
  //           } as Details;
  //       }
  //       break;
  //     case "UNLOCK":
  //       switch (action.data.type) {
  //         case "PASSCODE":
  //           break;
  //       }
  //       break;
  //   }

  //   return state;
  // }

  async function saveToDb({
    passcode,
    url,
  }: {
    passcode: string;
    url: string;
  }) {
    setIsLoading(true);
    try {
      const data = await set(ref(projectDb, `/safe/${passcode}`), {
        passcode,
        url,
      });
      alert("Successful.");
    } catch (e) {
      let message;
      const error = e as FirebaseError;
      alert(error.code);
      if (error.code) {
        switch(error.code) {
          case "PERMISSION_DENIED":
            message = "You do not have sufficient permissions to do this. You probably were trying to override"
        }
        alert(error.code);
      }
      console.log("An error occurred", e);
      alert(`Unsuccessful: ${e}`);
    } finally {
      setIsLoading(false);
    }
  }

  const formSubmitHandler = async () => {
    if (!details.passcode) console.log("SADNOFODISN");
    // try {
    //   const response = await fetch(
    //     "https://cyp-image-safe-default-rtdb.firebaseio.com/safe.json",
    //     {
    //       method: "POST",
    //       body: JSON.stringify({
    //         passcode: details.passcode,
    //         url: details.url,
    //       }),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   const data = await response.json();

    //   if (!response.ok) {
    //     let errorMessage = "Something went wrong!";
    //     throw new Error(data?.error?.message || errorMessage);
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  };

  // useEffect(() => {
  //   if (detailsState.confirm && detailsState.imageUrl) formSubmitHandler();
  // }, [detailsState.imageUrl, detailsState.confirm, formSubmitHandler]);

  function updateDetails(object: { passcode?: string; url?: string }) {
    setDetails((cur) => {
      return {
        ...cur,
        ...object,
      };
    });
    if (object.passcode) {
      console.log("SECOND");
      setShowImageUrlForm(true);
    }
  }

  useEffect(() => {
    const execute = async () => {
      if (details.passcode && details.url) {
        console.log("FIRST");
        await saveToDb(details as { passcode: string; url: string });
        setShowImageUrlForm(false);
        setDetails({} as { passcode: string; url: string });
      }
    };
    execute();
  }, [details]);

  function modalCloseHandler() {
    setShowImageUrlForm(false);
  }

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <PasscodePadFlex onUpdateDetails={updateDetails} />
          {showImageUrlForm && (
            <Modal onClose={modalCloseHandler}>
              <ImageUrlForm
                onSubmitForm={formSubmitHandler}
                onUpdateDetails={updateDetails}
              />
            </Modal>
          )}
        </>
      )}
    </>
  );
}

export default InputPage;
