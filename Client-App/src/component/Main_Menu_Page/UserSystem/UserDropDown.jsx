import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useStateValue } from "../../../ContextAPI/StateProvider";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import UserProfile from "./UserProfile";

const UserDropDown = ({ status }) => {
  const [isOpen, setIsOpen] = useState(status);
  const [{ userData }, dispatch] = useStateValue();
  const dropdownRef = useRef(null);
  // Loading Screen for LoginOut

  // Clear userData in ContexAPI
  const clearUserData = () => {
    dispatch({
      type: "SET_USER",
      userData: null,
    });
  };

  // request Backend to delete httpOnly Cookies
  const callBackendToLogOut = () => {
    axios
      .delete("http://localhost:5000/user-data", {
        withCredentials: true, // enable sending and receiving cookies
      })
      .then(function (respond) {
        // console.log(respond);
      })
      .catch(function (error) {
        // console.log(error.message);
      });
  };

  const logOut = () => {
    // if userData has data then clear
    if (userData?.role) {
      clearUserData();

      callBackendToLogOut();
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div
      className="relative inline-block text-left z-20 cursor-pointer"
      ref={dropdownRef}
    >
      <div
        className={`absolute top-[100%] right-36 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-3 border-b border-gray-600">
          <UserProfile />
        </div>
        <ul className="divide-y divide-gray-600">
          <li className="flex items-center px-4 py-5 text-gray-700 hover:bg-gray-100 hover:text-black">
            <AssignmentIcon className="svg-icons ml-3 mr-10" />
            <Link
              to="/"
              className="w-full font-medium text-lg hover:text-[#d42109]"
            >
              Order
            </Link>
          </li>
          <li className="flex items-center px-4 py-5  text-gray-700  hover:bg-gray-100 hover:text-black">
            <SettingsIcon className="svg-icons ml-3 mr-10" />
            <Link
              to="/"
              className=" w-full font-medium text-lg hover:text-[#d42109]"
            >
              Setting
            </Link>
          </li>
          <li
            className="flex items-center px-4 py-5 text-gray-700  hover:bg-gray-100 hover:text-black
           "
            onClick={logOut}
          >
            <ExitToAppIcon className="svg-icons ml-3 mr-10" />
            <span className="w-full font-medium text-lg  hover:text-[#d42109]">
              Logout
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDropDown;
