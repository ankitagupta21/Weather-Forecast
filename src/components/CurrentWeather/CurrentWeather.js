import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTint,
  faWind,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import "./CurrentWeather.css";

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
    <div className="currentWeather">
      <div className="top">
        <div className="temp">
          <p className="tempLeft">
            {tempUnit === "F" ? currData.temp : changeTempUnit(currData.temp)} °
            {tempUnit}
          </p>
          <img
            src={"http://openweathermap.org/img/w/" + currData.icon + ".png"}
            alt="Weather Icon"
            className="tempRight"
          />
        </div>
        <p className="desc">{currData.description}</p>
      </div>
      <div className="bottom">
        <div className="bottomLeft">
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
          <div onClick={handleTempUnitChange} className="tempChange">
            Change to {tempUnit === "F" ? "°C" : "°F"}
          </div>
        </div>
        <div className="bottomRight">
          <p>
            Humidity: {currData.humidity} %{"  "}
            <FontAwesomeIcon icon={faTint} color="#335b99" />
          </p>

          <p>
            Wind Speed (mi/hr): {currData.speed}
            {"  "}
            <FontAwesomeIcon icon={faWind} color="#335b99" />
          </p>

          <p>
            Wind Direction: {direction(currData.deg)}
            {"  "}
            <FontAwesomeIcon icon={faArrowAltCircleRight} color="#335b99" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
