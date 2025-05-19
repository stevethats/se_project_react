import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";
// Use defaultClothingItems for testing
// import { defaultClothingItems } from "../../utils/constants";

import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  onAddClick,
  onCardClick,
  onCardLike,
  clothingItems,
}) {
  const { currentUser } = React.useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__nav">
        <p className="clothes-section__text">Your Items</p>
        <button className="clothes-section__add-button" onClick={onAddClick}>
          + Add new
        </button>
      </div>
      <ul className="clothes-section__cards">
        {clothingItems.map((item) => {
          const isOwn = item.owner === currentUser._id;
          if (isOwn) {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
              />
            );
          }
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
