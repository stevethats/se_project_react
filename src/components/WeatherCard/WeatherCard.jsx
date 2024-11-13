import {
  weatherCardOptions,
  defaultWeatherCardOptions,
} from "../../utils/constants";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
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
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
      <img
        className="weather-card__image"
        src={weatherOption.url}
        alt={imageAltText}
      />
    </section>
  );
}

export default WeatherCard;
