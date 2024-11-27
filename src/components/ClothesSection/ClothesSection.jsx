import "./ClothesSection.css";
// Use defaultClothingItems for testing
// import { defaultClothingItems } from "../../utils/constants";

import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onAddClick, onCardClick, clothingItems }) {
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
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
