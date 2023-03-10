import React, { useState } from "react";
import { Link } from "react-router-dom";

const ManageOrdersTab = () => {
  const [isManageOrderOpen, setIsManageOrderOpen] = useState(false);

  const toggleManageProduct = () => {
    setIsManageOrderOpen(!isManageOrderOpen);
  };

  return (
    <li className="relative">
      <button
        className={`flex justify-between  w-full p-3 rounded-lg hover:bg-gray-200 active:outline-none active:ring-2 active:ring-offset-2
                   active:ring-gray-500 ${
                     isManageOrderOpen ? "bg-gray-300" : ""
                   }`}
        onClick={toggleManageProduct}
      >
        <span className="text-gray-900 font-bold">Manage Orders</span>
        <svg
          className={`h-5 w-5 ml-1 ${
            isManageOrderOpen ? "transform rotate-180" : ""
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
      {isManageOrderOpen && (
        <div className="flex flex-col w-full py-2 mt-2 bg-white rounded-lg">
          <Link
            href="#"
            className="block px-4 py-3 text-gray-800 hover:bg-gray-100"
          >
            View Orders
          </Link>
          <Link
            href="#"
            className="block px-4 py-3 text-gray-800 hover:bg-gray-100"
          >
            Create Orders
          </Link>
          <Link
            href="#"
            className="block px-4 py-3 text-gray-800 hover:bg-gray-100"
          >
            Edit Orders
          </Link>
          <div className="shadow-lg relative">
            <div className="absolute inset-0 bottom-auto w-full h-1 bg-gradient-to-t from-gray-300 via-gray-200 to-transparent" />
          </div>
        </div>
      )}
    </li>
  );
};

export default ManageOrdersTab;
