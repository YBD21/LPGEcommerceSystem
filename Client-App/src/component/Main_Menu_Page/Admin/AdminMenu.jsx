import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ManageOrdersTab from "./Manage_Orders/ManageOrdersTab";
import ManageGasPriceTab from "./Manage_Prices/ManageGasPriceTab";
import ManageGasProductsTab from "./Manage_Products/ManageGasProductsTab";
import ManageUserTab from "./Manage_Users/ManageUserTab";

function AdminMenu({ children }) {
  const location = useLocation();
  const [isDashboard, setIsDashboard] = useState(false);

  useEffect(() => {
    setIsDashboard(location.pathname === "/Admin/Dashboard");
  }, [location]);

  return (
    <main className="flex-1 flex bg-gray-100 h-screen">
      {/* Navigation menu */}
      {/* BreadCrum Place Here */}

      {/* Content section */}

      {/* Sidebar */}
      <nav className="bg-gray-50 shadow w-64">
        <div className="p-4 mt-5">
          <ul className="space-y-2">
            <li>
              <Link
                to="/Admin/Dashboard"
                className={`flex justify-around p-3 rounded-lg hover:bg-gray-200 
                  ${isDashboard ? "bg-gray-300" : ""}`}
              >
                {isDashboard && <ArrowRightIcon className="svg-icons mr-6" />}
                <span className="text-gray-900 font-bold mr-auto">
                  {" "}
                  Dashboard
                </span>
              </Link>
            </li>
            <ManageOrdersTab />

            <ManageGasProductsTab />

            <ManageGasPriceTab />

            <ManageUserTab />
          </ul>
        </div>
      </nav>

      {/* Main content */}
      {children}
    </main>
  );
}

export default AdminMenu;
