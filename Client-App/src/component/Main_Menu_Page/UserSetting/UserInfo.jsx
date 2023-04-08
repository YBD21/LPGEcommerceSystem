import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useStateValue } from "../../../ContextAPI/StateProvider";
const UserInfo = () => {
  const [{ userData }] = useStateValue();

  const [number, setNumber] = useState(userData?.id);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  return (
    <div className="flex flex-col justify-between w-full max-md:w-full max-lg:mb-5">
      <div className="w-full flex max-lg:flex-col">
        {/* First Name */}
        <div className="w-1/2 my-4 ml-3 mr-10 max-lg:w-3/4">
          <label className="block text-sm font-semibold text-gray-800">
            First Name
          </label>

          <div className="flex flex-row cursor-pointer">
            <input
              type="text"
              value={userData?.firstName}
              className="block w-full px-4 py-2 mt-4 text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
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
              value={userData?.lastName}
              className="block w-full px-4 py-2 mt-4 text-black-700 border-2 border-black bg-white rounded-md focus:border-black
            focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
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

      <div className="w-full flex flex-row justify-between mt-5">
        <div className="w-full ml-3">
          <button
            className="w-1/3 max-lg:w-1/2 px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg text-center mr-2 mb-2
            focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
