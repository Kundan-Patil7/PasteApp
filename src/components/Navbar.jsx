import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">PasteApp 📝</h1>

        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-white text-lg font-semibold px-3 py-2 rounded-md transition ${
                isActive ? "bg-blue-800" : "hover:bg-blue-500"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `text-white text-lg font-semibold px-3 py-2 rounded-md transition ${
                isActive ? "bg-blue-800" : "hover:bg-blue-500"
              }`
            }
          >
            Pastes
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
