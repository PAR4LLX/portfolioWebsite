"use client";

import { useState, useEffect } from "react";
import WeatherWidget from "@/app/components/weatherWidget";
import Navbar from "@/app/components/navbar";

export default function Home() {
  const [showWeather, setShowWeather] = useState(false);
  const [currentTemp, setCurrentTemp] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleWeather = () => setShowWeather((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY < 10) {
        setShowNavbar(true);
      } else if (currentY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="flex">
      <Navbar
        toggleWeather={toggleWeather}
        currentTemp={currentTemp}
        showNavbar={showNavbar}
      />
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
                Portfolio Home Page
              </h1>
            </div>
          </div>
        </div>
        {showWeather && (
          <WeatherWidget
            setCurrentTemp={setCurrentTemp}
            navbarVisible={showNavbar}
          />
        )}
      </main>
    </div>
  );
}

