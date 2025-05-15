import "./ItemCard.css";
import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { isLoggedIn, currentUser } = React.useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser._id);
  let itemLikeButtonClassName = "item-card__like-button";

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike(item, isLiked);
  };

  return isLoggedIn ? (
    <li className="item-card">
      <span className="item-card__header">
        <h2 className="item-card__name">{item.name}</h2>
        <button
          className={`item-card__like-button ${
            isLiked ? "item-card__like-button_active" : ""
          }`}
          onClick={handleLike}
        ></button>
      </span>
      <img
        className="item-card__image"
        src={item.imageUrl}
        alt={item.name}
        onClick={handleCardClick}
      />
    </li>
  ) : (
    <li className="item-card">
      <span className="item-card__header">
        <h2 className="item-card__name">{item.name}</h2>
      </span>
      <img
        className="item-card__image"
        src={item.imageUrl}
        alt={item.name}
        onClick={handleCardClick}
      />
    </li>
  );
}

export default ItemCard;
