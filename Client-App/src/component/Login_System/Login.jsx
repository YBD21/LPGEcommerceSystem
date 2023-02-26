import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Cookies from "js-cookie";
import axios from "axios";
import { hashKey } from "./hashKey";
import "./login.css";
import Logo from "../Logo";
import ErrorMessageLogin from "./Error_Handeling_Message/ErrorMessageLogin";

export default function Login() {
  const CryptoJS = require("crypto-js");
  const [open, setOpen] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [isChecked, setIsChecked] = useState(0);
  const [error, setError] = useState(null); // capture error with this state
  const history = useNavigate();

  useEffect(() => {
    //  console.log("Use Is on Effect X_X");

    // if cookies is empty dont run else run getCookies
    try {
      const outPutCookies = getCookies();
      const number = JSON.stringify(outPutCookies.decryptedUserName);

      const decryped_password = JSON.stringify(outPutCookies.decryptedPassword);

      // console.log("Pass",decryped_password)
      // console.log("user",number)

      setPassword(decryped_password);
      setNumber(number);
    } catch (error) {
      // console.log(error.message)
    }
  }, []);

  // handle toggle to show or hide password
  const toggle = () => {
    setOpen(!open);
    // console.log(open);
  };

  // Remember me function
  const setCookie = () => {
    // console.log("I am clicked X_X !");
    // will not run if field is empty and click is even
    if (number !== "" && password !== "" && isChecked % 2 === 0) {
      // Encrypt
      const cipherUserName = CryptoJS.AES.encrypt(
        number,
        hashKey.secretKey
      ).toString();
      //  console.log(cipherUserName);
      //encrypt password
      const cipherPassword = CryptoJS.AES.encrypt(
        password,
        hashKey.secretKey
      ).toString();
      //  console.log(cipherPassword);

      // set cookies expire date on 7th day.
      Cookies.set(hashKey.userName, cipherUserName, { expires: 7 });
      Cookies.set(hashKey.Password, cipherPassword, { expires: 7 });
    }
    // activate remember only if isChecked === even number
    setIsChecked(isChecked + 1);
    // console.log(isChecked)
  };

  // load saved(Phonenumber and password) data from
  const getCookies = () => {
    // when load password and phonenumber  from cookies set them

    const cipherUserName = Cookies.get(hashKey.userName);
    const cipherPassword = Cookies.get(hashKey.Password);

    // Decrypt

    const bytesOfUserName = CryptoJS.AES.decrypt(
      cipherUserName,
      hashKey.secretKey
    );

    // parse into meaningful information
    const decryptedUserName = JSON.parse(
      bytesOfUserName.toString(CryptoJS.enc.Utf8)
    );

    // console.log("This is from getCookies",decryptedUserName);

    const bytesOfPassword = CryptoJS.AES.decrypt(
      cipherPassword,
      hashKey.secretKey
    );

    const decryptedPassword = JSON.parse(
      bytesOfPassword.toString(CryptoJS.enc.Utf8)
    );

    // console.log("This is from getCookies",decryptedPassword);

    return { decryptedPassword, decryptedUserName };
  };

  const CallBackendForSignIn = () => {
    // console.log("I am working X_X !");
    const encryptPassword = CryptoJS.AES.encrypt(password, number).toString();

    setLoggingIn(true); // disable button

    axios
      .post(
        "http://localhost:5000/login",
        {
          phoneNumber: number,
          encPass: encryptPassword,
        },
        {
          withCredentials: true, // enable sending and receiving cookies
        }
      )
      .then(function (respond) {
        // console.log(respond.data.Message);

        // reset disable button
        setLoggingIn(false);

        if (respond.data.Message === false) {
          return (
            // console.log(false),
            setError("Incorrect Data")
          );
        }

        if (respond.data.Message === true) {
          //set session cookies
          Cookies.set(hashKey.userData, respond.data.accessToken);
          // redirect to Main_Page
          return history("/Store", { replace: true });
        }

        if (respond.data.Error !== undefined) {
          return (
            // console.log(respond.data),
            setError(respond.data.Error)
          );
        }
      })
      .catch(function (error) {
        // throw error message
        
          // reset disable button
          setLoggingIn(false);
        // console.log(error.response.statusText);
        if (error.response && error.response.statusText) {
          setError(error.response.statusText);
        } else {
          setError(error.message);
        }
      });
  };

  const signIn = (e) => {
    e.preventDefault(); // prevent page from refresh
    setError(null); // reset previous error_message

    // delay for few second
    setTimeout(CallBackendForSignIn, 300);
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 mb-auto ml-auto mr-auto mt-2 bg-white rounded-md lg:max-w-lg">
        {/* logo */}

        <Logo />

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
              className="Phone required"
              country={"np"}
              value={number}
              onChange={setNumber}
              countryCodeEditable={false}
              placeholder="Enter Phone Number"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-800">
              Password
            </label>

            <div className="flex flex-row cursor-pointer">
              <input
                type={open === false ? "password" : "text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                onClick={setCookie}
                id="remember"
                className="relative h-5 w-5 shrink-0 appearance-none rounded-md border-2 border-gray-600 outline-none after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url('data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==')] after:bg-[length:40px] after:bg-center after:bg-no-repeat after:content-[''] checked:bg-gray-900 hover:ring hover:ring-gray-300"
              />

              <label className="text-sm font-semibold">Remember me</label>
            </div>

            <div>
              <Link
                to="/ForgetPassword"
                className="text-sm text-[#300] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Error Message */}

          {error && <ErrorMessageLogin Error_message={error} status={true} />}
          <div className="mt-5">
            <button
              onClick={signIn}
              disabled={loggingIn}
              className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg text-s text-center mr-2 mb-2
            focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden
            "
            >
              Login
            </button>
          </div>
        </form>

        <div className="flex justify-center my-3 before:flex-1 before:border-t before:border-black before:mt-4 after:flex-1 after:border-t after:border-black after:mt-4">
          <strong className="text-2xl mx-3">Or</strong>
        </div>

        <div className="mt-5">
          <Link to="/SignUp">
            <button
              className="w-full px-5 py-2.5 tracking-wide transition
            text-white bg-neutral-700 font-medium rounded-lg text-s text-center mr-2 mb-2
            focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden
           "
            >
              Create Account{" "}
              <ArrowRightAltIcon className="svg-icons ml-6 pb-0.5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
