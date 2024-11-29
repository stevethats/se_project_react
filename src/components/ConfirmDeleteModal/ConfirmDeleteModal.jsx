import "./ConfirmDeleteModal.css";
import Modal from "../Modal/Modal.jsx";

function ConfirmDeleteModal({ isOpen, onCloseClick, onDeleteClick }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseClick}
      modalContent={"modal__content modal__content_type_delete"}
    >
      <p className="modal__caption">
        Are you sure you want to delete this item?
      </p>
      <p className="modal__caption">This action is irreversible.</p>
      <button
        className="modal__delete modal__delete_type_confirm"
        type="button"
        onClick={onDeleteClick}
      >
        Yes, delete item
      </button>
      <button className="modal__cancel" type="button" onClick={onCloseClick}>
        Cancel
      </button>
    </Modal>
  );
}

export default ConfirmDeleteModal;
