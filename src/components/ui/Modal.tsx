import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
import { ReactNode, useContext } from "react";
import { ThemeContext } from "../../store/theme-context";

function Modal({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose?: () => void;
}) {
  const themeCtx = useContext(ThemeContext);
  return ReactDOM.createPortal(
    <div data-theme={themeCtx.theme}>
      <div className={classes.backdrop} onClick={onClose} />
      <div className={classes.modal}>
        {onClose && (
          <button className={classes.close} onClick={onClose}>
            &#10005;
          </button>
        )}
        {children}
      </div>
    </div>,
    document.getElementById("overlays") as HTMLDivElement
  );
}

export default Modal;
