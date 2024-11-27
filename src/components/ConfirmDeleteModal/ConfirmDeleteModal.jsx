import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ isOpen, onCloseClick, onDeleteClick }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal__content_type_delete">
        <button
          className="modal__close"
          type="button"
          onClick={onCloseClick}
        ></button>
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
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
