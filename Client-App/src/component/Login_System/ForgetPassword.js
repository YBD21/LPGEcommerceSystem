import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SearchIcon from "@mui/icons-material/Search";
import ErrorMessageForgotPassword from "./Error_Handeling_Message/ErrorMessageForgotPassword";

const ForgetPassword = () => {
  const [number, setNumber] = useState("");
  const [errornumber, setErrorNumber] = useState({});
  const [flag, setFlag] = useState(false);

  const isEmpty = () => {
    if (number.length === 0) {
      setErrorNumber({
        PhoneNumber: true,
        Message: "Phone Number Cannot Be Empty !",
      });
    }
  };

  const search = (e) => {
    e.preventDefault(); // prevent page from refresh
    setErrorNumber({});
     // delay for few second
     setTimeout(isEmpty,300);
  };
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 mb-auto ml-auto mr-auto mt-2 bg-white rounded-md lg:max-w-lg">
        <Logo />

        <h1 className="text-3xl font-semibold text-center text-black"
        style={{ display: !flag ? "" : "none" }}
        >
          Find Your Account
        </h1>

        <h1 className="text-3xl font-semibold text-center text-black"
        style={{ display: flag ? null : "none" }}
        >
         Validate OTP
        </h1>

        <p className="text-lg font-semibold text-center text-black mt-3"
         style={{ display: !flag ? "" : "none" }}
        >
          Please enter mobile number to search for your account.
        </p>

        <p className="text-lg font-semibold text-center text-black mt-3"
         style={{ display: flag ? "" : "none" }}
        >
           A Code has been send to {number.slice(3)}
        </p>

        {/* Mobile Number Input Box */}
        <form className="mt-6"
        style={{ display: !flag ? "" : "none" }}
        >
          
          <div className="mb-2">
            <PhoneInput
              className="Phone"
              country={"np"}
              value={number}
              onChange={setNumber}
              countryCodeEditable={false}
            />
          </div>

          {/* Error Message */}
           
          {errornumber.PhoneNumber && <ErrorMessageForgotPassword props={errornumber.Message} status = {true}/>}

          <div className="w-full mt-6">
         
          {/* Search */}
          <div className="min-w-max mt-4">
            <button
              className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg text-s text-center mr-3 mb-2
            "
            onClick={search}
            >
              <SearchIcon className="svg-icons mr-4" />
              Search
            </button>
           
          </div>
            {/* Go Back */}
            <div className="min-w-max mt-4">
            <Link to="/">
              <button
                className="w-full px-5 py-2.5 text-white bg-neutral-700 font-medium rounded-lg text-s mr-3 mb-2
           "
              >
                <KeyboardBackspaceIcon className="svg-icons " />
                {/* {""} Go Back ?  mr-4*/}
              </button>
            </Link>
          </div>
        </div>
        
        </form>

        {/* Verify form box */}

        <form className="mt-6"
        style={{ display: flag ? "" : "none" }}
        >
          {/* Code Box */}
          <div className="mb-2">
           
            <div className="flex flex-row cursor-pointer">
              <input
                type="text"
                placeholder="Enter Code"
                className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 text-center"
              />
               </div>
          </div>

          {/* Error Message */}
           
          {errornumber.PhoneNumber && <ErrorMessageForgotPassword props={errornumber.Message} status = {true}/>}

          <div className="w-full mt-6">
         
          {/* Verify */}
          <div className="min-w-max mt-4">
            <button
              className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg text-s text-center mr-3 mb-2
            "
            >
            Submit PIN
            </button>
           
          </div>
            {/* cancel */}
            <div className="min-w-max mt-4">
            <Link to="/">
              <button
                className="w-full px-5 py-2.5 text-white bg-neutral-700 font-medium rounded-lg text-s mr-3 mb-2
           "
              >
                <KeyboardBackspaceIcon className="svg-icons " />
    
              </button>
            </Link>
          </div>
        </div>
        
        </form>


     
      </div>
    </div>
  );
};

export default ForgetPassword;
