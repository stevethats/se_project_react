import "./ModalWithForm.css";
import Modal from "../Modal/Modal.jsx";

import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  handleCloseClick,
  onSubmit,
  handleRedirectClick,
}) {
  const { activeModal } = React.useContext(CurrentUserContext);

  if (activeModal === "login" || activeModal === "register") {
    return (
      <Modal isOpen={isOpen} onClose={handleCloseClick}>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <span>
            <button className="modal__submit" type="submit">
              {buttonText}
            </button>
            <button
              className="modal__redirect-button"
              type="button"
              onClick={handleRedirectClick}
            >
              {activeModal === "register" ? "or Login" : "or Register"}
            </button>
          </span>
        </form>
      </Modal>
    );
  } else {
    return (
      <Modal isOpen={isOpen} onClose={handleCloseClick}>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button className="modal__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </Modal>
    );
  }
}

export default ModalWithForm;
