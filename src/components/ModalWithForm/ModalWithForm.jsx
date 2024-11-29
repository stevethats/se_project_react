import "./ModalWithForm.css";
import Modal from "../Modal/Modal.jsx";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  handleCloseClick,
  onSubmit,
}) {
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

export default ModalWithForm;
