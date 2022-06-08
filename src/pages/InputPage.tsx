import Modal from "../components/ui/Modal";
import PasscodePadFlex from "../components/functionality/PasscodePadFlex";
import ImageUrlForm from "./ImageUrlForm";
import { useEffect, useState } from "react";
import { get, ref, set } from "firebase/database";
import { projectDb } from "../firebase/config";
import { useAppSelector } from "../hooks/redux";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { FirebaseError } from "firebase/app";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function InputPage() {
  const [showImageUrlForm, setShowImageUrlForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const passcode = useAppSelector((state) => state.safe.passcode);
  const url = useAppSelector((state) => state.safe.imageUrl);
  const [details, setDetails] = useState(
    {} as { passcode: string; url: string }
  );

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
      toast.success("Success!");
    } catch (e) {
      let message;
      const error = e as FirebaseError;
      if (error.code) {
        switch (error.code) {
          case "PERMISSION_DENIED":
            message =
              "You do not have sufficient permissions to do this. This is probably because the passcode you used is taken.";
        }
      }
      toast.error(`Unsuccessful! ${message}`);
    } finally {
      setIsLoading(false);
    }
  }

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

  async function unlock(passcode: string) {
    const data = await get(ref(projectDb, `/safe/${passcode}`));
    console.log(data.val().url);
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
          <PasscodePadFlex onUpdateDetails={updateDetails} onUnlock={unlock} />
          {showImageUrlForm && (
            <Modal onClose={modalCloseHandler}>
              <ImageUrlForm onUpdateDetails={updateDetails} />
            </Modal>
          )}
        </>
      )}
    </>
  );
}

export default InputPage;
