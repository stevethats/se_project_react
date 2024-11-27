import "./Header.css";
import weatherLogo from "../../assets/WeatherLogo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";

function Header({ weatherData, handleAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const username = "Terrence Tegegne";

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
          <p className="header__username">{username}</p>
          <img className="header__avatar" src={avatar} alt="User Avatar" />
        </div>
      </NavLink>
    </header>
  );
}

export default Header;
