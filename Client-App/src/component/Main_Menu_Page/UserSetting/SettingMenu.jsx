import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const SettingMenu = ({ children }) => {
  const location = useLocation();
  const [isSettingDashboard, setIsSettingDashboard] = useState(false);

  useEffect(() => {
    setIsSettingDashboard(location.pathname === "/Setting" || "/Demo");
  }, [location]);

  return (
    <main className="flex-1 flex h-screen">
      {/* Navigation menu */}
      {/* BreadCrum Place Here */}

      {/* Sidebar */}
      <nav className="bg-white w-64">
        <div className="p-4 mt-5">
          <ul className="space-y-2">
            <li>
              <Link
                to="#"
                className={`flex justify-around p-3 rounded-lg hover:bg-gray-200 
              ${isSettingDashboard ? "bg-gray-300" : ""}`}
              >
                {isSettingDashboard && (
                  <ArrowRightIcon className="svg-icons mr-6" />
                )}
                <span className="text-gray-900 font-bold mr-auto">
                  {" "}
                  My Profile
                </span>
              </Link>
            </li>
            {/* Tab Here */}
          </ul>
        </div>
      </nav>

      {/* Main content */}
      {children}
    </main>
  );
};

export default SettingMenu;
