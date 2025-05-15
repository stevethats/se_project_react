import React from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";
import weatherLogo from "../../assets/WeatherLogo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  weatherData,
  handleAddClick,
  handleLoginClick,
  handleRegistrationClick,
}) {
  const { isLoggedIn, currentUser } = React.useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const checkAvatar = () => {
    let profileAvatar;
    if (!currentUser.avatar) {
      profileAvatar = (
        <div className="header__avatar">
          <p className="header__avatar-text">
            {currentUser.name.charAt(0).toUpperCase()}
          </p>
        </div>
      );
    } else {
      profileAvatar = (
        <img
          src={currentUser.avatar}
          alt="User Avatar"
          className="header__avatar"
        />
      );
    }
    return profileAvatar;
  };

  if (isLoggedIn) {
    return (
      <header className="header">
        <div className="header__container">
          <NavLink to="/">
            <img
              className="header__logo"
              src={weatherLogo}
              alt="Weather API Logo"
            />
          </NavLink>
          <p className="header__date-and-location">
            {currentDate}, {weatherData.city}
          </p>
        </div>
        <ToggleSwitch />
        <button
          className="header__add-clothes-btn"
          type="button"
          onClick={handleAddClick}
        >
          + Add clothes
        </button>
        <NavLink className="header__profile-link" to="/profile">
          <div className="header__user-container">
            <p className="header__username">{currentUser.name}</p>
            {checkAvatar()}
          </div>
        </NavLink>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="header__container">
        <NavLink to="/">
          <img
            className="header__logo"
            src={weatherLogo}
            alt="Weather API Logo"
          />
        </NavLink>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <ToggleSwitch />
      <button
        className="header__sign-up-btn"
        type="button"
        onClick={handleRegistrationClick}
      >
        Sign Up
      </button>
      <button
        className="header__login-btn"
        type="button"
        onClick={handleLoginClick}
      >
        Login
      </button>
    </header>
  );
}

export default Header;
