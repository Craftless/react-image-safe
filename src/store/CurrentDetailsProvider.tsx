import { ReactNode, useState } from "react";
import CurrentDetailsContext from "./current-details-context";

function CurrentDetailsProvider({ children }: { children: ReactNode }) {
  const [passcode, setPasscode] = useState("");
  const [url, setUrl] = useState("");
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);

  function clearDetailsHandler() {
    setPasscode("");
    setUrl("");
  }

  return (
    <CurrentDetailsContext.Provider
      value={{
        passcode: passcode,
        url: url,
        setPasscode: setPasscode,
        setUrl: setUrl,
        clearDetails: clearDetailsHandler,
        showModal: setShowPasscodeModal,
      }}
    >
      {children}
    </CurrentDetailsContext.Provider>
  );
}

export default CurrentDetailsProvider;
