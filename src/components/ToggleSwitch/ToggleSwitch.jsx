import "./ToggleSwitch.css";
import React from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  //For Testing purposes:
  // const [currentTempUnit, handleToggleSwitchChange] = React.useState("C");

  // const handleChange = () => {
  //   if (currentTempUnit === "C") {
  //     handleToggleSwitchChange("F");
  //   }

  //   if (currentTempUnit === "F") {
  //     handleToggleSwitchChange("C");
  //   }
  //   console.log(currentTempUnit);
  // };

  const { currentTemperatureUnit, handleToggleSwitchChange } = React.useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="switch">
      <input
        className="switch__box"
        type="checkbox"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTemperatureUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>
      <p
        className={`switch__temp-F ${
          currentTemperatureUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTemperatureUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
