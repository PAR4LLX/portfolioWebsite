"use client";
import useWeather from "../hooks/useWeather";

export default function WeatherWidget() {
  const { weather, loading, error } = useWeather();

  if (loading) return <div>Loading weather data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!weather) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-80 h-80 rounded-2xl overflow-hidden shadow-lg border border-white/25">

  {/* Top-left glow corner */}
  <div className="absolute -top-2 -left-2 w-12 h-12 bg-white/30 rounded-full blur-xl opacity-60 pointer-events-none" />

  {/* Bottom-right glow corner */}
  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white/30 rounded-full blur-xl opacity-60 pointer-events-none" />

  {/* Base translucent background */}
  <div className="absolute inset-0 bg-white/5" />

  {/* Content layer with inner blur */}
  <div className="relative w-full h-full flex items-center justify-center p-1">
    <div className="w-full h-full rounded-xl backdrop-blur-md p-2 text-white">
        <div className="w-full h-full rounded-xl  backdrop-blur-md p-2">
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
          <WeatherInfo
            label="Humidity"
            value={`${weather.current.humidity}%`}
          />
          <WeatherInfo
            label="Wind"
            value={`${weather.current.wind_kph} km/h`}
          />
          <WeatherInfo label="UV Index" value={weather.current.uv} />
        </div>
      </div>
    </div>
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
