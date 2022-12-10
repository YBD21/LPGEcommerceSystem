import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SearchIcon from "@mui/icons-material/Search";

const ForgetPassword = () => {
  const [number, setNumber] = useState("");

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 mb-auto ml-auto mr-auto mt-2 bg-white rounded-md lg:max-w-lg">
        <Logo />

        <h1 className="text-3xl font-semibold text-center text-black">
          Find Your Account
        </h1>

        <p className="text-lg font-semibold text-center text-black mt-3">
          Please enter mobile number to search for your account.
        </p>

        {/* Mobile Number Input Box */}
        <div className="mt-6 mb-2">
          <PhoneInput
            className="Phone"
            country={"np"}
            value={number}
            onChange={setNumber}
            countryCodeEditable={false}
          />
        </div>

        <div className="flex justify-between mt-6">
          {/* Go Back */}
          <div className="mt-4">
            <Link to="/">
              <button
                className="w-48 px-5 py-2.5 text-white bg-neutral-700 font-medium rounded-lg text-s mr-3 mb-2
           "
              >
                <KeyboardBackspaceIcon className="svg-icons " />
                {/* {""} Go Back ?  mr-4*/}
              </button>
            </Link>
          </div>
          {/* Search */}
          <div className="mt-4">
            <button
              className="w-48 px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg text-s text-center mr-3 mb-2
            "
            >
              <SearchIcon className="svg-icons mr-4" />
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
