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
      <main className="flex-1">
        <div className="flex flex-col min-h-screen">
          {/* Hero Section */}
          <div className="relative w-full h-[500px]">
            <img
              src="/images/1276391.jpg"
              alt="Hero"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <h1 className="text-white text-4xl font-bold">
                Porfolio Home Page
              </h1>
            </div>
          </div>
        </div>
        {showWeather && <WeatherWidget setCurrentTemp={setCurrentTemp} />}
      </main>
    </div>
  );
}
