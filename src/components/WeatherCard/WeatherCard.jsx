import {
  weatherCardOptions,
  defaultWeatherCardOptions,
} from "../../utils/constants";
import "./WeatherCard.css";

import React from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext
  );

  const filteredOption = weatherCardOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOption.length === 0) {
    weatherOption =
      defaultWeatherCardOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOption[0];
  }

  const imageAltText = `${filteredOption[0]?.day ? "day" : "night"} ${
    filteredOption[0]?.condition ? filteredOption[0].condition : ""
  } weather card`;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {currentTemperatureUnit === "F"
          ? weatherData.temp.F
          : weatherData.temp.C}{" "}
        &deg; {currentTemperatureUnit === "F" ? "F" : "C"}
      </p>
      <img
        className="weather-card__image"
        src={weatherOption.url}
        alt={imageAltText}
      />
    </section>
  );
}

export default WeatherCard;
