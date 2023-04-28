import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useStateValue } from "../../../ContextAPI/StateProvider";
const UserInfo = () => {
  const [{ userData }] = useStateValue();
  const [isEdit, setIsEdit] = useState(false);

  const [number, setNumber] = useState(userData?.id);
  const [firstName, setFirstName] = useState(userData?.firstName);
  const [lastName, setLastName] = useState(userData?.lastName);

  const edit = () => {
    setIsEdit(true);
  };

  const saveChanges = () => {
    setIsEdit(false);
    // add here
  };

  const cancel = () => {
    setIsEdit(false);
  };

  return (
    <div className=" basis-1/2 justify-between w-full max-md:w-full max-lg:mb-5">
      <div className="w-full flex max-lg:flex-col">
        {/* First Name */}
        <div className="w-1/2 my-4 ml-3 mr-10 max-lg:w-3/4">
          <label className="block text-sm font-semibold text-gray-800">
            First Name
          </label>

          <div className="flex flex-row">
            <input
              type="text"
              value={!isEdit ? userData?.firstName : firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`block w-full px-4 py-2 mt-4 text-black-700 border-2 ${
                !isEdit
                  ? "cursor-not-allowed border-gray-600 bg-gray-200 rounded-md"
                  : "border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
              }`}
              disabled={!isEdit}
            />
          </div>
        </div>
        {/* Last Name */}
        <div className="w-1/2 my-4 ml-3 mr-10 max-lg:w-3/4">
          <label className="block text-sm font-semibold text-gray-800">
            Last Name
          </label>

          <div className="flex flex-row cursor-pointer">
            <input
              type="text"
              value={!isEdit ? userData?.lastName : lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`block w-full px-4 py-2 mt-4 text-black-700 border-2
              focus:ring-opacity-40 ${
                !isEdit
                  ? "cursor-not-allowed border-gray-600 bg-gray-200 rounded-md"
                  : "border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
              }`}
              disabled={!isEdit}
            />
          </div>
        </div>
      </div>
      {/*  Mobile Number */}
      <div className="w-full flex flex-row max-lg:flex-col">
        <div className="w-[45%] my-4 ml-3 mr-10 max-lg:w-3/4">
          <label className="block text-sm font-semibold text-gray-800 py-2">
            Mobile Number
          </label>

          <PhoneInput
            className="Phone cursor-not-allowed"
            country={"np"}
            value={number}
            onChange={setNumber}
            countryCodeEditable={false}
            placeholder="Enter Phone Number"
            disabled
          />
        </div>
      </div>

      {/*  Action  */}

      <div className="w-full flex flex-row justify-center mt-5">
        <div className="w-full ml-3">
          {!isEdit ? (
            <button
              className="w-1/3 max-lg:w-1/2 px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg text-center mr-2 mb-2
            focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 overflow-hidden"
              onClick={edit}
            >
              <span className="text-white font-semibold">Edit</span>
            </button>
          ) : (
            <div className="flex justify-between">
              <button
                className="w-1/3 max-lg:w-1/2 px-5 py-2.5 tracking-wide
           text-white bg-black font-medium rounded-lg text-center mr-2 mb-2
           focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 overflow-hidden"
                onClick={saveChanges}
              >
                <span className="text-white font-semibold">Save Changes</span>
              </button>
              <button
                className="w-1/3 max-lg:w-1/2 px-5 py-2.5 tracking-wide
             text-white bg-neutral-700 font-medium rounded-lg text-center mr-2 mb-2
             focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 overflow-hidden"
                onClick={cancel}
              >
                <span className="text-white font-semibold">Cancel</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
