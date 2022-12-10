import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Logo from "../Logo";

const SignUp = () => {
  const [open, setOpen] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [createpassword, setCreatePassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [number, setNumber] = useState("");

  // handle toggle to show or hide password
  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 mb-auto ml-auto mr-auto mt-2 bg-white rounded-md lg:max-w-lg">
        {/* logo */}

        <Logo />

        <h1 className="text-3xl font-semibold text-center text-black">
          SignUp
        </h1>
        {/* <p className="text-lg font-semibold text-center text-black mt-3">
          Login and place your order !
        </p> */}
        <form className="mt-3">
          {/* First Name Input Box */}
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              First Name
            </label>

            <div className="flex flex-row cursor-pointer">
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 "
              />
            </div>
          </div>
          {/* Last Name Input Box */}
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Last Name
            </label>

            <div className="flex flex-row cursor-pointer">
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 "
              />
            </div>
          </div>
          {/* Mobile Number Input Box */}
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800 py-2">
              Mobile Number
            </label>

            <PhoneInput
              className="Phone"
              country={"np"}
              value={number}
              onChange={setNumber}
              countryCodeEditable={false}
              placeholder="Enter Phone Number"
            />
          </div>
          {/* Password Input Box */}
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Create Password
            </label>

            <div className="flex flex-row cursor-pointer">
              <input
                type={open === false ? "password" : "text"}
                value={createpassword}
                onChange={(e) => setCreatePassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 "
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
          {/* Confirm Password Input Box */}
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Confirm Password
            </label>

            <div className="flex flex-row cursor-pointer">
              <input
                type={open === false ? "password" : "text"}
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 "
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
        </form>

        <div className="mt-12">
          <div className="mt-5">
            <button
              className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg text-s text-center mr-3 mb-2
            "
            >
              Create Account
            </button>
          </div>

          <div className="mt-5">
            <Link to="/">
              <button
                className="w-full px-5 py-2.5 text-white bg-neutral-700 font-medium rounded-lg text-s mr-3 mb-2
           ">
                <KeyboardBackspaceIcon className="svg-icons " />
                {/* {""} Go Back ?  mr-4*/}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
