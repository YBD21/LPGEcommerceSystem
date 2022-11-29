import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Logo from "../../dist/image/Logo.png"
import "./login.css";

export default function Login() {
  const [open, setOpen] = useState(false);
  const [backendTest,setBackendTest] = useState();
  // handle toggle
  const toggle = () => {
    setOpen(!open);
  };

 const setCookie = () => {
  console.log("I am clicked X_X !");
 };

//  const setCookie = () => {
//   fetch("/Test_login").then(
//     respond => respond.json()
//     ).then(
//      data =>{
//        setBackendTest(data)
//      }
//     )
//     console.log(backendTest["Test"]);
//  }
 
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 mb-auto ml-auto mr-auto mt-2 bg-white rounded-md lg:max-w-lg">
        {/* logo */}
        
        <div className="flex justify-center">
        <img
          className="w-[7rem]"
          src={Logo} alt= "Melamchi Online Store Logo"
          />
        </div>
         
    
        <h1 className="text-3xl font-semibold text-center text-black">Login</h1>
        {/* <p className="text-lg font-semibold text-center text-black mt-3">
          Login and place your order !
        </p> */}
        <form className="mt-3">
          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800 py-2">
              Mobile Number
            </label>

            <PhoneInput
              className="Phone"
              country={"np"}
              placeholder="Enter Phone Number"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Password
            </label>

            <div className="flex flex-row">
              <input
                type={open === false ? "password" : "text"}
                className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
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

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                onClick={setCookie}
                id="remember"
                className="relative h-5 w-5 shrink-0 appearance-none rounded-md border-2 border-gray-600 outline-none after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url('data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==')] after:bg-[length:40px] after:bg-center after:bg-no-repeat after:content-[''] checked:bg-gray-900 hover:ring hover:ring-gray-300"
              />

              <label  className="text-sm font-semibold">
                Remember me
              </label>
            </div>

            <div>
              <a href="#" className="text-sm text-[#300] hover:underline">
                Forget Password?
              </a>
            </div>
          </div>

          <div className="mt-6">
            <button
              className="w-full px-5 py-2.5 tracking-wide transition
            text-white bg-black font-medium rounded-lg text-s text-center mr-2 mb-2
            "
            >
              Login
            </button>
          </div>
        </form>

        <div className="flex justify-center my-4 before:flex-1 before:border-t before:border-black before:mt-4 after:flex-1 after:border-t after:border-black after:mt-4">
          <strong className="text-2xl mx-3">Or</strong>
        </div>

        <div className="mt-4">
          <button
            className="w-full px-5 py-2.5 tracking-wide transition
            text-white bg-neutral-700 font-medium rounded-lg text-s text-center mr-2 mb-2
           "
          >
            Create account{" "}
            <ArrowRightAltIcon className="svg-icons ml-6 pb-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}