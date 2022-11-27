import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./phone.css";
//  className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"

export default function Login() {
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-black-700">
          Login
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              className="block text-sm font-semibold text-gray-800 py-2"
            >
              Mobile Number
            </label>

            <PhoneInput
              className="Phone"
              country={"np"}
              placeholder="Enter Phone Number"
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a href="#" className="text-sm text-[#300] hover:underline">
            Forget Password?
          </a>
          <div className="mt-6">
            <button className="w-full px-5 py-2.5 tracking-wide transition
            text-white bg-black font-medium rounded-lg text-s text-center mr-2 mb-2
            ">
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-sm font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <a href="#" className="font-medium text-purple-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
