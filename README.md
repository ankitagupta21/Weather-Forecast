# Weather Forecast App

## Overview:

This weather forecast app allows users to check the current weather and 5-day forecast for a selected city. It is implemented using React and integrates with the OpenWeatherMap API.

## Prerequisites:

Make sure you have Node.js and npm installed on your machine.

## Installation:

1. Clone the repository:
   `git clone https://github.com/your-username/weather-forecast-app.git`

2. Navigate to the project directory:
   `cd weather-forecast-app`

3. Install dependencies:
   `npm install`

## Usage:

To run the application locally:
`npm start`

This will start the development server, and you can view the app in your web browser at http://localhost:3000.

## Configuration:

Before running the app, replace the placeholder API key in src/services/WeatherService.js with your actual OpenWeatherMap API key.
// src/services/WeatherService.js
`const API_KEY = 'your_actual_api_key';`

## Features:

- Search for weather by city name
- Display current temperature, min and max temperature, humidity, wind speed, and weather description
- Show a 5-day forecast with date, average temperature, and weather description
- Toggle between Celsius and Fahrenheit units
