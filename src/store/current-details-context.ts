import React from "react";

export interface ContentDetail {
  passcode: string;
  url: string;
  setPasscode: React.Dispatch<React.SetStateAction<string>>;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  clearDetails: () => void;
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CurrentDetailsContext = React.createContext<ContentDetail>({
  passcode: "",
  url: "",
  setPasscode: () => {},
  setUrl: () => {},
  clearDetails: () => {},
  showModal: () => {},
});

export default CurrentDetailsContext;
