import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const ManageUserTab = () => {
  const location = useLocation();
  const [isManageUsersOpen, setIsManageUsersOpen] = useState(false);
  const [isViewUsers, setIsViewUsers] = useState(false);

  const toggleManageProduct = () => {
    setIsManageUsersOpen(!isManageUsersOpen);
  };

  useEffect(() => {
    const manageUsersPath = "/Admin/Manage-Users/";
    setIsManageUsersOpen(location.pathname.startsWith(manageUsersPath));
    setIsViewUsers(location.pathname === "/Admin/Manage-Users/ViewUsers");
  }, [location]);
  return (
    <li className="relative">
      <button
        className={`flex justify-between  w-full p-3 rounded-lg hover:bg-gray-200 active:outline-none active:ring-2 active:ring-offset-2
                 active:ring-gray-500 ${
                   isManageUsersOpen ? "bg-gray-300" : ""
                 }`}
        onClick={toggleManageProduct}
      >
        <span className="text-gray-900 font-bold"> Manage Users </span>
        <svg
          className={`h-5 w-5 ml-1 ${
            isManageUsersOpen ? "transform rotate-180" : ""
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
      {isManageUsersOpen && (
        <div className="flex flex-col w-full py-2 mt-2 bg-white rounded-lg">
          <Link
            to={"#"}
            className={`block px-4 py-3
           text-gray-800 hover:bg-gray-100
           ${isViewUsers ? "bg-gray-200" : ""}`}
          >
            {isViewUsers && <ArrowRightIcon className="svg-icons mr-6" />}
            <span className="mr-auto"> View Users</span>
          </Link>
          <div className="shadow-lg relative">
            <div className="absolute inset-0 bottom-auto w-full h-1 bg-gradient-to-t from-gray-300 via-gray-200 to-transparent" />
          </div>
        </div>
      )}
    </li>
  );
};

export default ManageUserTab;
