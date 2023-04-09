import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const ChangePassword = ({ onChild }) => {
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // handle toggle to show or hide password
  const toggle = () => {
    setOpen(!open);
  };

  const saveChanges = () => {
    // add here
  };

  const close = () => {
    onChild(false);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
      <div className="relative z-10 inline-block w-full p-6 mx-auto mt-10 bg-white rounded-lg transform sm:max-w-2xl sm:h-[55vh] sm:p-8">
        {/* Start Change Password */}
        <div className="w-full flex flex-col px-12 py-3 rounded-lg items-center">
          <h3 className="text-2xl font-bold mb-4 text-center">
            Change Password
          </h3>

          {/* Current Password Input Box */}
          <div className="py-3 w-full">
            <label className="block text-sm font-semibold text-gray-800">
              Current Password
            </label>

            <div className="flex flex-row cursor-pointer">
              <input
                type={open === false ? "password" : "text"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="true"
                required={true}
                className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black 
                focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <div className="text-2xl ml-[-2.5rem] mt-2.5">
                {open === false ? (
                  <VisibilityIcon onClick={toggle} />
                ) : (
                  <VisibilityOffIcon onClick={toggle} />
                )}
              </div>
            </div>
          </div>

          {/*New Password Input Box */}
          <div className="py-3 w-full">
            <label className="block text-sm font-semibold text-gray-800">
              New Password
            </label>

            <div className="flex flex-row cursor-pointer">
              <input
                type={open === false ? "password" : "text"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="true"
                required={true}
                className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black 
                focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <div className="text-2xl ml-[-2.5rem] mt-2.5">
                {open === false ? (
                  <VisibilityIcon onClick={toggle} />
                ) : (
                  <VisibilityOffIcon onClick={toggle} />
                )}
              </div>
            </div>
          </div>
          {/*Confirm New Password Input Box */}
          <div className="py-3 w-full">
            <label className="block text-sm font-semibold text-gray-800">
              Confirm New Password
            </label>

            <div className="flex flex-row cursor-pointer">
              <input
                type={open === false ? "password" : "text"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="true"
                required={true}
                className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black 
                focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
              />
              <div className="text-2xl ml-[-2.5rem] mt-2.5">
                {open === false ? (
                  <VisibilityIcon onClick={toggle} />
                ) : (
                  <VisibilityOffIcon onClick={toggle} />
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between pt-5">
            <button
              className="w-1/3 px-5 py-2.5 tracking-wide
           text-white bg-black font-medium rounded-lg text-center mr-2 mb-2
           focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 overflow-hidden"
              onClick={saveChanges}
            >
              <span className="text-white font-semibold">Save Changes</span>
            </button>
            <button
              className="w-1/3 px-5 py-2.5 tracking-wide
             text-white bg-neutral-700 font-medium rounded-lg text-center mr-2 mb-2
             focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 overflow-hidden"
              onClick={close}
            >
              <span className="text-white font-semibold">Cancel</span>
            </button>
          </div>
        </div>
        {/*End Change Password */}
        <button className="absolute top-0 right-0 m-5" onClick={close}>
          <CancelIcon className="svg-icons text-neutral-700" />
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
