import "./ToggleSwitch.css";
import React from "react";

const ToggleSwitch = () => {
  const [currentTempUnit, handleToggleSwitchChange] = React.useState("C");

  const handleChange = () => {
    if (currentTempUnit === "C") {
      handleToggleSwitchChange("F");
    }

    if (currentTempUnit === "F") {
      handleToggleSwitchChange("C");
    }
    console.log(currentTempUnit);
  };

  return (
    <label className="switch">
      <input className="switch__box" type="checkbox" onChange={handleChange} />
      <span
        className={
          currentTempUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>
      <p
        className={`switch__temp-F ${
          currentTempUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTempUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
