import React from "react";

const Forecast = ({ data, changeTempUnit }) => {
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
    <div>
      {forecastData.map((day) => (
        <div key={day.date}>
          <p>Date: {day.date}</p>
          <p>
            Average Temperature:{" "}
            {tempUnits.find((tempUnit) => tempUnit.key === day.key)?.unit ===
            "F"
              ? day.temp
              : changeTempUnit(day.temp)}{" "}
            °{tempUnits.find((tempUnit) => tempUnit.key === day.key)?.unit}
          </p>

          <button onClick={() => handleTempUnitChange(day.key)}>
            Change to{" "}
            {tempUnits.find((unit) => unit.key === day.key)?.unit === "F"
              ? "°C"
              : "°F"}
          </button>
          <p>Description: {day.description}</p>
          <img
            src={"http://openweathermap.org/img/w/" + day.icon + ".png"}
            alt="Weather Icon"
          />
        </div>
      ))}
    </div>
  );
};

export default Forecast;
