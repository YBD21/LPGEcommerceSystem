import React, { useState } from "react";
import { Link } from "react-router-dom";
import ManageOrdersTab from "./Manage_Orders/ManageOrdersTab";
import ManageGasPriceTab from "./Manage_Prices/ManageGasPriceTab";
import ManageGasProductsTab from "./Manage_Products/ManageGasProductsTab";

function AdminMenu({ children }) {
  return (
    <div className="flex flex-col h-screen">
      {/* Navigation menu */}
      {/* BreadCrum Place Here */}
      <div className=" shadow-lg h-16 flex bg-gray-300 justify-center">
        <div className="m-4 text-black font-bold text-lg text-center">
          Admin Dashboard
        </div>
      </div>

      {/* Content section */}
      <main className="flex-1 flex bg-gray-100">
        {/* Sidebar */}
        <nav className="bg-white shadow w-64">
          <div className="p-4">
            <div className="mb-4">
              <h2 className="text-lg font-bold">Menu</h2>
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/Admin/Dashboard"
                  className="block p-3 rounded-lg hover:bg-gray-200"
                >
                  <span className="text-gray-900 font-bold"> Dashboard</span>
                </Link>
              </li>
              <ManageOrdersTab />

              <ManageGasProductsTab />

              <ManageGasPriceTab />
            </ul>
          </div>
        </nav>

        {/* Main content */}
        {children}
      </main>
    </div>
  );
}

export default AdminMenu;
