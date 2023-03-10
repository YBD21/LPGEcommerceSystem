import React, { useState } from "react";
import { Link } from "react-router-dom";
import ManageOrders from "./Manage_Orders/ManageOrdersTab";
import ManageGasPrice from "./Manage_Prices/ManageGasPriceTab";
import ManageGasProducts from "./Manage_Products/ManageGasProductsTab";

function AdminDashboard() {
  const [isManageProductOpen, setIsManageProductOpen] = useState(false);

  const toggleManageProduct = () => {
    setIsManageProductOpen(!isManageProductOpen);
  };

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
                  to="/Dashboard"
                  className="block p-3 rounded-lg hover:bg-gray-200"
                >
                  <span className="text-gray-900 font-bold"> Dashboard</span>
                </Link>
              </li>
              <ManageOrders />

              <ManageGasProducts />

              <ManageGasPrice />
            </ul>
          </div>
        </nav>

        {/* Main content */}
        <div className="flex-1 p-6 bg-white">
          <h2 className="text-3xl font-bold mt-4 ml-2 mb-8">Orders</h2>
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-gray-800">Order ID</th>
                <th className="px-4 py-2 text-gray-800">Customer Name</th>
                <th className="px-4 py-2 text-gray-800">Status</th>
                <th className="px-4 py-2 text-gray-800">Total</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td className="border px-4 py-2 font-bold">1</td>
                <td className="border px-4 py-2">Santosh Deuja</td>
                <td className="border px-4 py-2 text-green-500 font-bold">
                  Shipped
                </td>
                <td className="border px-4 py-2 font-bold">$100.00</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">2</td>
                <td className="border px-4 py-2">Santosh Deuja </td>
                <td className="border px-4 py-2 text-yellow-500 font-bold">
                  Pending
                </td>
                <td className="border px-4 py-2 font-bold">$50.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
