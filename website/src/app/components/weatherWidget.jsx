"use client";
import useWeather from "../hooks/useWeather"; 

export default function WeatherWidget() {
  const { weather, loading, error } = useWeather();

  if (loading) return <div>Loading weather data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!weather) return null;

  return (
    <div className="w-80 h-80 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg text-white flex flex-col justify-center p-4">
      <h3 className="text-xl font-semibold text-center mb-2">
        {weather.location.name}, {weather.location.country}
      </h3>

      <h1 className="text-center text-4xl font-bold mb-4">
        {`${weather.current.temp_c}°C`}
      </h1>

      <div className="grid grid-cols-5 text-sm mb-4">
        <div className="col-span-1" />
        <div className="col-span-3 space-y-2">
          <WeatherInfo
            label="Feels Like"
            value={`${weather.current.feelslike_c}°C`}
          />
          <div className="flex justify-between">
            <WeatherInfo
              label="Low"
              value={`${weather.forecast.forecastday[0].day.mintemp_c}°C`}
            />
            <WeatherInfo
              label="High"
              value={`${weather.forecast.forecastday[0].day.maxtemp_c}°C`}
            />
          </div>
        </div>
        <div className="col-span-1" />
      </div>

      <WeatherInfo
        label="Precipitation"
        value={`${weather.current.precip_mm}mm`}
      />
      <WeatherInfo label="Humidity" value={`${weather.current.humidity}%`} />
      <WeatherInfo label="Wind" value={`${weather.current.wind_kph} km/h`} />
      <WeatherInfo label="UV Index" value={weather.current.uv} />
    </div>
  );
}

function WeatherInfo({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="font-medium mr-2">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

