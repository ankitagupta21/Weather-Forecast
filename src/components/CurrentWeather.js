import React from "react";

const CurrentWeather = ({ data, changeTempUnit }) => {
  const currData = {
    temp: data.main.temp,
    temp_max: data.main.temp_max,
    temp_min: data.main.temp_min,
    humidity: data.main.humidity,
    speed: data.wind.speed,
    deg: data.wind.deg,
    description:
      data.weather[0].description.charAt(0).toUpperCase() +
      data.weather[0].description.slice(1),
    icon: data.weather[0].icon,
  };
  const direction = (degree) => {
    if (degree > 337.5) return "Northerly";
    if (degree > 292.5) return "North Westerly";
    if (degree > 247.5) return "Westerly";
    if (degree > 202.5) return "South Westerly";
    if (degree > 157.5) return "Southerly";
    if (degree > 122.5) return "South Easterly";
    if (degree > 67.5) return "Easterly";
    if (degree > 22.5) {
      return "North Easterly";
    }
    return "Northerly";
  };

  const [tempUnit, setTempUnit] = React.useState("F");

  const handleTempUnitChange = () => {
    setTempUnit(tempUnit === "F" ? "C" : "F");
  };

  return (
    <div>
      <p>
        Temperature:{" "}
        {tempUnit === "F" ? currData.temp : changeTempUnit(currData.temp)} °
        {tempUnit}
      </p>
      <p>
        Maximum Temperature:{" "}
        {tempUnit === "F"
          ? currData.temp_max
          : changeTempUnit(currData.temp_max)}{" "}
        °{tempUnit}
      </p>
      <p>
        Minimum Temperature:{" "}
        {tempUnit === "F"
          ? currData.temp_min
          : changeTempUnit(currData.temp_min)}{" "}
        °{tempUnit}
      </p>
      <button onClick={handleTempUnitChange}>
        Change to {tempUnit === "F" ? "°C" : "°F"}
      </button>
      <p>Humidity: {currData.humidity} %</p>
      <p>Wind Speed: {currData.speed} miles/hour</p>
      <p>Wind Direction: {direction(currData.deg)}</p>
      <p>Feels Like: {currData.description}</p>
      <img
        src={"http://openweathermap.org/img/w/" + currData.icon + ".png"}
        alt="Weather Icon"
      />
    </div>
  );
};

export default CurrentWeather;
