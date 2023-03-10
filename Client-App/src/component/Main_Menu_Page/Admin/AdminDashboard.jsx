import React, { useState } from "react";

function AdminDashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className="flex flex-col h-screen">
      {/* Navigation menu */}
      <div className="bg-gray-700 shadow-md h-16 flex  justify-center">
        <div className="m-4 text-white font-bold text-lg text-center">
          Admin Dashboard
        </div>
      </div>

      {/* Testing BreadCrumb */}
      <nav className="bg-gray-100 py-2 px-4 rounded-md">
        <ol className="list-none p-0 flex items-center">
          <li>
            <a href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </a>
          </li>
          <svg
            className="w-3 h-3 flex-shrink-0 fill-current text-gray-500 mx-2"
            viewBox="0 0 12 12"
          >
            <path
              d="M10.707,5.707c0.391,0.391,0.391,1.023,0,1.414l-4,4C6.512,11.902,6.256,12,6,12s-0.512-0.098-0.707-0.293l-4-4  C1.098,6.73,1,6.515,1,6.293s0.098-0.438,0.293-0.707l4-4C5.488,1.098,5.744,1,6,1s0.512,0.098,0.707,0.293l4,4  C11.098,5.73,11.098,5.969,10.707,5.707z"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
          <li>
            <a
              href={`/category/test`}
              className="text-gray-500 hover:text-gray-700"
            >
              Test One
            </a>
          </li>
        </ol>
      </nav>
      {/* ends testing BreadCrumb here */}

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
              <li className="relative">
                <button
                  className="flex justify-between  w-full p-3 rounded-lg hover:bg-gray-200 active:outline-none active:ring-2 active:ring-offset-2 active:ring-gray-500"
                  onClick={toggleDropdown}
                >
                  <span className="text-gray-900 font-bold">
                    Manage Products
                  </span>
                  <svg
                    className={`h-5 w-5 ml-1 ${
                      isDropdownOpen ? "transform rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 z-10 w-full py-2 mt-2 bg-white rounded-lg">
                    <a
                      href="#"
                      className="block px-4 py-3 text-gray-800 hover:bg-gray-100"
                    >
                      View Product
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-3 text-gray-800 hover:bg-gray-100"
                    >
                      Create Product
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-3 text-gray-800 hover:bg-gray-100"
                    >
                      Set Price
                    </a>
                    <div className="shadow-lg relative">
                      <div className="absolute inset-0 bottom-auto w-full h-1 bg-gradient-to-t from-gray-300 via-gray-200 to-transparent" />
                    </div>
                  </div>
                )}
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
    </div>
  );
}

export default AdminDashboard;
