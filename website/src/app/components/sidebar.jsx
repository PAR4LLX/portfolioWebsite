"use client";

import { useState } from "react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const navItems = ["Home", "Profile", "Settings"];

  return (
    <div
      className={`h-screen ${isCollapsed ? "w-20" : "w-64"} bg-gray-900 text-white flex flex-col transition-all duration-300`}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && <h2 className="text-xl font-bold">My App</h2>}
        <button
          onClick={toggleSidebar}
          className="text-white text-sm bg-gray-800 px-2 py-1 rounded hover:bg-gray-700"
        >
          {isCollapsed ? ">>" : "<<"}
        </button>
      </div>

      <nav className="flex flex-col space-y-2 p-2">
        {navItems.map((label, index) => (
          <a
            key={index}
            href="#"
            className="hover:bg-gray-700 px-2 py-2 rounded text-sm text-center"
          >
            {!isCollapsed && label}
            {isCollapsed && label[0]} {/* Show only first letter */}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
