import { request } from "./api";

const getForecastWeather = (location, apiKey) => {
  return request(
    `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=imperial&appid=${apiKey}`
  );
};

const filterDataFromWeatherApi = (data) => {
  if (!data) {
    return null;
  }
  const weather = {};
  weather.city = data.name;
  weather.temp = {
    F: Math.round(data.main.temp),
    C: Math.round((data.main.temp - 32) * (5 / 9)),
  };
  weather.type = getWeatherType(weather.temp.F);
  weather.condition = data.weather[0].main.toLowerCase();
  weather.isDay = isDay(data.sys, Date.now() / 1000);
  return weather;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise < now && now < sunset;
};

const getWeatherType = (temp) => {
  if (temp >= 86) {
    return "hot";
  } else if (temp >= 66 && temp < 86) {
    return "warm";
  } else {
    return "cold";
  }
};

export { getForecastWeather, filterDataFromWeatherApi };
