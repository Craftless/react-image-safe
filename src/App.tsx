import Modal from "./components/ui/Modal";
import PasscodePadFlex from "./components/functionality/PasscodePadFlex";
import { useState } from "react";

function App() {
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);

  function passcodeModalCloseHandler() {
    setShowPasscodeModal(false);
  }
  return (
    <div>
      {showPasscodeModal && (
        <Modal onClose={passcodeModalCloseHandler}>
          <PasscodePadFlex />
        </Modal>
      )}
    </div>
  );
}

export default App;
