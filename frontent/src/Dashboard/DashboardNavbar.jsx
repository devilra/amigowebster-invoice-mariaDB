import React from "react";
import { FiBell, FiUser, FiSettings } from "react-icons/fi";
import { useSelector } from "react-redux";

const DashboardNavbar = () => {
  const { user, loading } = useSelector((state) => state.auth);

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

          {/* Profile */}
          <div className="relative">
            <button className="flex items-center gap-2">
              <FiUser size={24} />

              {/* Skeleton while loading */}
              {loading ? (
                <span className="h-4 w-16 bg-gray-500 animate-pulse rounded"></span>
              ) : (
                <span className=" ">
                  {user?.name || "Guest"}{" "}
                  <span className="text-sm font-michroma text-neutral-100 tracking-[1px] font-extrabold">
                    ( {user?.role.toUpperCase() || "user"} )
                  </span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
