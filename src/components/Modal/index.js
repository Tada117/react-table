import React, { useRef } from "react";
import ReactDOM from "react-dom";
import "./modal.css";

const Modal = ({ isShowing, hide, children }) => {
  return isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            onClick={(e) => e.stopPropagation()}
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal">
              <div className="modal-header">
                <button
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              {children}
            </div>
          </div>
        </>,
        document.body
      )
    : null;
};

export default Modal;
