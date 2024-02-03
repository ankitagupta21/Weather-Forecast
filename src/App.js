import React, { useState, useEffect } from "react";
import "./App.css";

import weather from "./img/weather.png";
import loader from "./img/loader.gif";
import SearchBar from "./components/SearchBar/SearchBar";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import Forecast from "./components/Forecast/Forecast";
import { fetchWeatherData, fetchForecastData } from "./services/WeatherService";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [nosearch, setNosearch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (city === "") {
      setNosearch(true);
    } else {
      setNosearch(false);
    }
  }, [city]);

  const fetchData = async (city) => {
    try {
      setLoading(true);
      console.log("Fetching data for", city);
      const currentWeather = await fetchWeatherData(city);
      const forecast = await fetchForecastData(city);
      if (currentWeather.cod === "404" || forecast.cod === "404") {
        throw new Error("CityNotFound");
      }
      setWeatherData(currentWeather);
      setForecastData(forecast);
      setCity(city);
      setError("");
    } catch (error) {
      if (error.message === "CityNotFound") {
        setError("City not found. Please enter a valid city name.");
      } else {
        setError("Error fetching data. Check your network connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  const convertToC = (temp) => {
    var tempVal = temp;
    var cTempVal = (tempVal - 32) * (5 / 9);
    var celcius = Math.round(cTempVal * 10) / 10;
    return celcius;
  };

  return (
    <div className="App">
      <p className="heading">Weather Forecast</p>
      <SearchBar onSearch={fetchData} />

      {nosearch ? (
        <div className="message">
          <p>Enter a city to get the weather forecast</p>
          <img src={weather} className="weatherImg" />
        </div>
      ) : loading ? (
        <div className="message">
          <img src={loader} className="loader" />
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="message">
          <FontAwesomeIcon
            icon={faExclamationCircle}
            color="rgb(255, 0, 0,0.8)"
            className="icon"
          />
          <p>{error}</p>
        </div>
      ) : (
        <div className="content">
          {weatherData && forecastData && (
            <div>
              <div className="cityHead">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  color="#335b99"
                  className="icon"
                />
                <p className="city">
                  {city[0].toUpperCase() + city.slice(1).toLowerCase()}
                </p>
              </div>
              <CurrentWeather data={weatherData} changeTempUnit={convertToC} />
              <Forecast data={forecastData} changeTempUnit={convertToC} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
