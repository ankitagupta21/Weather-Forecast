// services/WeatherService.js
const apiKey = "08452e311bdb4624b43b23d7fddb4683";

const fetchWeatherData = async (city) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};

const fetchForecastData = async (city) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.list;
};

export { fetchWeatherData, fetchForecastData };
