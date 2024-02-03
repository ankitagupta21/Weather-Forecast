import React from "react";
import "./Forecast.css";

const Forecast = ({ data, changeTempUnit }) => {
  const getDay = (date) => {
    let day = new Date(date);
    let dayNumber = day.getDay();
    if (dayNumber === 0) return "Sunday";
    if (dayNumber === 1) return "Monday";
    if (dayNumber === 2) return "Tuesday";
    if (dayNumber === 3) return "Wednesday";
    if (dayNumber === 4) return "Thursday";
    if (dayNumber === 5) return "Friday";
    if (dayNumber === 6) return "Saturday";
  };
  const forecastData = data
    .filter((day) => day.dt_txt.split(" ")[1] === "12:00:00")
    .map((day) => ({
      key: day.dt_txt.split(" ")[0],
      date: day.dt_txt.split(" ")[0],
      temp: day.main.temp,
      description:
        day.weather[0].description.charAt(0).toUpperCase() +
        day.weather[0].description.slice(1),
      icon: day.weather[0].icon,
    }))
    .filter((day) => day.temp !== null);

  const [tempUnits, setTempUnits] = React.useState(
    forecastData.map((day) => {
      return {
        key: day.key,
        unit: "F",
      };
    })
  );

  const handleTempUnitChange = (key) => {
    let newTempUnits = tempUnits.map((unit) => {
      if (unit.key == key) {
        return {
          key: key,
          unit: unit.unit === "F" ? "C" : "F",
        };
      }
      return unit;
    });
    setTempUnits(newTempUnits);
  };

  return (
    <div className="forecast">
      {forecastData.map((day) => (
        <div key={day.date} className="forecastBox">
          <p className="day">{getDay(day.date)}</p>
          <div className="temp">
            <p className="tempLeft">
              {tempUnits.find((tempUnit) => tempUnit.key === day.key)?.unit ===
              "F"
                ? day.temp
                : changeTempUnit(day.temp)}{" "}
              °{tempUnits.find((tempUnit) => tempUnit.key === day.key)?.unit}
            </p>
            <img
              src={"http://openweathermap.org/img/w/" + day.icon + ".png"}
              alt="Weather Icon"
            />
          </div>
          <p className="desc">{day.description}</p>
          <div
            onClick={() => handleTempUnitChange(day.key)}
            className="tempChange"
          >
            Change to{" "}
            {tempUnits.find((unit) => unit.key === day.key)?.unit === "F"
              ? "°C"
              : "°F"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
