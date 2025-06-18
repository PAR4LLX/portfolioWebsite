"use client";
import { useState } from "react";
import useWeather from "../hooks/useWeather";

const Sidebar = ({ toggleWeather }) => {
  const [active, setActive] = useState("Home");
  const { weather } = useWeather();
  const currentTemp = weather?.current?.temp_c ?? null;

  const navItems = [
    {
      key: "Weather",
      label: currentTemp !== null ? `${currentTemp}°C` : "W",
      title: "Weather",
      action: toggleWeather,
    },
    {
      key: "Home",
      label: "H",
      title: "Home",
      action: () => setActive("Home"),
    },
    {
      key: "Projects",
      label: "P",
      title: "Projects",
      action: () => setActive("Projects"),
    },
  ];

  return (
    <div className="h-screen w-20 bg-zinc-900 text-white flex flex-col items-center py-4 space-y-4">
      <nav className="flex flex-col items-center space-y-4 mt-2">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={item.action}
            title={item.title}
            className={`w-14 h-14 flex items-center justify-center rounded-xl transition-all duration-200 ${
              active === item.key
                ? "bg-zinc-800 text-white font-bold shadow-lg"
                : "hover:bg-teal-900 text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
