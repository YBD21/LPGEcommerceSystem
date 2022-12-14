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

        <h1 className="text-3xl font-semibold text-center text-black">
          Find Your Account
        </h1>

        <p className="text-lg font-semibold text-center text-black mt-3">
          Please enter mobile number to search for your account.
        </p>

        {/* Mobile Number Input Box */}
        <form className="mt-6">
          
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

          <div className="flex justify-between mt-2">
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
            onClick={search}
            >
              <SearchIcon className="svg-icons mr-4" />
              Search
            </button>
          </div>
        </div>
        
        </form>

     
      </div>
    </div>
  );
};

export default ForgetPassword;
