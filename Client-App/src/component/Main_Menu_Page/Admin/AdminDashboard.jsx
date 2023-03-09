import React from "react";

function AdminDashboard() {
  return (
    <div className="flex flex-col h-screen">
      {/* Navigation menu */}
      <nav className="bg-gray-900 shadow-md h-16 flex items-center justify-between">
        <div className="ml-4 text-white font-bold text-lg">Admin Dashboard</div>
        <div className="mr-4">
          <button className="text-white hover:text-gray-400 focus:outline-none">
            Logout
          </button>
        </div>
      </nav>

      {/* Content section */}
      <main className="flex-1 flex bg-gray-100">
        {/* Sidebar */}
        <nav className="bg-white shadow w-64">
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Menu</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="block p-3 rounded-lg hover:bg-gray-200">
                  <span className="text-gray-900 font-bold">Orders</span>
                </a>
              </li>
              <li>
                <a href="#" className="block p-3 rounded-lg hover:bg-gray-200">
                  <span className="text-gray-900 font-bold">
                    Manage Products
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main content */}
        <div className="flex-1 p-6 bg-white">
          <h1 className="text-3xl font-bold mb-8">Orders</h1>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-gray-600">Order ID</th>
                <th className="px-4 py-2 text-gray-600">Customer Name</th>
                <th className="px-4 py-2 text-gray-600">Status</th>
                <th className="px-4 py-2 text-gray-600">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100">
                <td className="border px-4 py-2 font-bold">1</td>
                <td className="border px-4 py-2">John Doe</td>
                <td className="border px-4 py-2 text-green-500 font-bold">
                  Shipped
                </td>
                <td className="border px-4 py-2 font-bold">$100.00</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">2</td>
                <td className="border px-4 py-2">Jane Doe</td>
                <td className="border px-4 py-2 text-yellow-500 font-bold">
                  Pending
                </td>
                <td className="border px-4 py-2 font-bold">$50.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer section */}
      <footer className="bg-gray-900 text-white h-16 flex items-center justify-center">
        © 2023 Ecommerce Admin Dashboard
      </footer>
    </div>
  );
}

export default AdminDashboard;
