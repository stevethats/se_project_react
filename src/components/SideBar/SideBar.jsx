import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ handleEditProfileClick, handleLogout }) {
  const { currentUser } = React.useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <span className="sidebar__user">
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt="default avatar"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </span>
      <span className="sidebar__profile-buttons">
        <button
          className="sidebar__edit-profile-btn"
          onClick={handleEditProfileClick}
        >
          Edit profile
        </button>
        <button className="sidebar__logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </span>
    </div>
  );
}

export default SideBar;
