"use client";

import { useState } from "react";
import WeatherWidget from "@/app/components/weatherWidget";
import Sidebar from "@/app/components/sidebar";

export default function Home() {
  const [showWeather, setShowWeather] = useState(false);
  const [currentTemp, setCurrentTemp] = useState(null);
  const toggleWeather = () => setShowWeather((prev) => !prev);

  return (
    <div className="flex">
      <Sidebar toggleWeather={toggleWeather} currentTemp={currentTemp} />
      <main className="flex-1 p-8">
        {showWeather && <WeatherWidget setCurrentTemp={setCurrentTemp} />}
      </main>
    </div>
  );
}
