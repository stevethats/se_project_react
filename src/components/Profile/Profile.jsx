import "./Profile.css";

import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  onAddClick,
  onCardClick,
  clothingItems,
  handleEditProfileClick,
  handleEditProfileSubmit,
  handleLogout,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleEditProfileClick={handleEditProfileClick}
          handleEditProfileSubmit={handleEditProfileSubmit}
          handleLogout={handleLogout}
        />
      </section>
      <section className="profile__clothes-items">
        <ClothesSection
          onAddClick={onAddClick}
          onCardClick={onCardClick}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
}

export default Profile;
