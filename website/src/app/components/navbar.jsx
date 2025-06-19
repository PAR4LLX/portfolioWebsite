"use client";
import { useState, useEffect } from "react";
import useWeather from "../hooks/useWeather"; // adjust path if needed

const Navbar = ({ toggleWeather }) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { weather } = useWeather();
  const currentTemp = weather?.current?.temp_c ?? null;

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY < 10) {
        setShowNavbar(true); // show at top
      } else if (currentY > lastScrollY) {
        setShowNavbar(false); // scrolling down
      } else {
        setShowNavbar(true); // scrolling up
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-[999] transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="bg-zinc-900 text-white px-6 py-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">MySite</div>

          <nav className="space-x-6 text-sm flex items-center">
            <a href="#home" className="hover:text-teal-400 transition">Home</a>
            <a href="#projects" className="hover:text-teal-400 transition">Projects</a>
            <a href="#contact" className="hover:text-teal-400 transition">Contact</a>

            {/* Weather button */}
            <button
              onClick={toggleWeather}
              title="Weather"
              className="ml-4 px-3 py-1 rounded-lg bg-white text-zinc-900 font-semibold hover:bg-zinc-200 transition"
            >
              {currentTemp !== null ? `${currentTemp}°C` : "W"}
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
