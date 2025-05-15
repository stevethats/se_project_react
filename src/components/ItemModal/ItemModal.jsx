import React from "react";
import "./ItemModal.css";
import Modal from "../Modal/Modal";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, card, onCloseClick, onDeleteClick }) {
  const { currentUser, selectedCard } = React.useContext(CurrentUserContext);

  const isOwn = selectedCard.owner === currentUser._id;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseClick}
      modalContent={"modal__content modal__content_type_image"}
    >
      <img className="modal__image" src={card.imageUrl} alt={card.name} />
      <div className="modal__footer">
        <span>
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </span>
        {isOwn && (
          <button
            className="modal__delete"
            type="button"
            onClick={onDeleteClick}
          >
            Delete item
          </button>
        )}
      </div>
    </Modal>
  );
}

export default ItemModal;
