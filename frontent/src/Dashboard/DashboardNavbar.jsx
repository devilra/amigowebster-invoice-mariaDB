import React from "react";
import { FiBell, FiUser, FiSettings, FiLogOut } from "react-icons/fi";

const DashboardNavbar = () => {
  return (
    <div className="bg-neutral-800 p-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <div className="text-white font-bold text-2xl">MyDashboard</div>

        {/* Search */}
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Icons / Profile */}
        <div className="flex items-center gap-4 text-white">
          {/* Notifications */}
          <button className="relative">
            <FiBell size={24} />
            <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3"></span>
          </button>

          {/* Settings */}
          <button>
            <FiSettings size={24} />
          </button>

          {/* Profile / Dropdown */}
          <div className="relative">
            <button className="flex items-center gap-2">
              <FiUser size={24} />
              <span>Admin</span>
            </button>
            {/* Dropdown menu (hidden by default, toggle with state if needed) */}
            {/* <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">Profile</button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">Logout</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
