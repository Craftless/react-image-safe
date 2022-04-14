import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
import { ReactNode } from "react";

function Modal({ children, onClose }: { children: ReactNode, onClose: () => void }) {
  return (
    <>
      {ReactDOM.createPortal(
        <>
          <div className={classes.backdrop} onClick={onClose}/>
          <div className={classes.modal}>{children}</div>
        </>,
        document.getElementById("overlays") as HTMLDivElement
      )}
    </>
  );
}

export default Modal;
