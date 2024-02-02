// App.js
import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import { fetchWeatherData, fetchForecastData } from "./services/WeatherService";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async (city) => {
    try {
      setLoading(true);
      console.log("Fetching data for", city);
      const currentWeather = await fetchWeatherData(city);
      const forecast = await fetchForecastData(city);
      if (currentWeather.cod === "404" || forecast.cod === "404") {
        throw new Error("City not found. Please enter a valid city name.");
      }
      setWeatherData(currentWeather);
      setForecastData(forecast);
      setError("");
    } catch (error) {
      console.log("Error fetching data", error);
      setError("City not found. Please enter a valid city name.");
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
    <div>
      <p>Weather Forecast</p>
      <SearchBar onSearch={fetchData} />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {weatherData && (
            <CurrentWeather data={weatherData} changeTempUnit={convertToC} />
          )}
          {forecastData && (
            <Forecast data={forecastData} changeTempUnit={convertToC} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
