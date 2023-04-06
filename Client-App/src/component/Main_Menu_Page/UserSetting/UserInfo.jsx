import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";

const UserInfo = () => {
  const [number, setNumber] = useState("9779860694050");
  return (
    <div className="w-1/2 max-lg:w-1/2 max-md:w-full max-lg:mb-5">
      <div className="w-full flex flex-row max-lg:flex-col">
        {/* First Name */}
        <div className="w-1/2 my-4 ml-3 mr-10 max-lg:w-3/4">
          <label className="block text-sm font-semibold text-gray-800">
            First Name
          </label>

          <div className="flex flex-row cursor-pointer">
            <input
              type="text"
              value={"Santosh"}
              className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-gray-100 rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40
              cursor-not-allowed"
              disabled
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
              value={"Deuja"}
              className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-gray-100 rounded-md focus:border-black
            focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40
              cursor-not-allowed"
              disabled
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
      
    </div>
  );
};

export default UserInfo;
