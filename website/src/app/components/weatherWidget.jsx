"use client";
import { useEffect, useState } from "react";

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch("/api/weather");
        if (!res.ok) {
          throw new Error(`Failed to fetch weather data: ${res.status}`);
        }
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <div>Loading weather data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3>
        {weather.location.name}, {weather.location.country}
      </h3>
      
      <div>
        <WeatherInfo label="Temperature" value={`${weather.current.temp_c}°C`} />
        <WeatherInfo label="Feels Like" value={`${weather.current.feelslike_c}°C`} />
        <WeatherInfo label="Low" value={`${weather.forecast.forecastday[0].day.mintemp_c}°C`} />
        <WeatherInfo label="High" value={`${weather.forecast.forecastday[0].day.maxtemp_c}°C`} />
        <WeatherInfo label="Precipitation" value={`${weather.current.precip_mm}mm`} />
        <WeatherInfo label="Wind" value={`${weather.current.wind_kph} km/h`} />
        <WeatherInfo label="UV Index" value={weather.current.uv} />
      </div>
    </div>
  );
}

function WeatherInfo({ label, value }) {
  return (
    <div>
      <span>{label}: </span>
      <span>{value}</span>
    </div>
  );
}
