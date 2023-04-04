import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SearchIcon from "@mui/icons-material/Search";
import ErrorMessageForgotPassword from "./Error_Handeling_Message/ErrorMessageForgotPassword";
import { useUserAuth } from "../../ContextAPI/UserAuthContext";
import axios from "axios";

const ForgetPassword = () => {
  const { setUpRecaptha } = useUserAuth();
  const [number, setNumber] = useState("");
  const [errornumber, setErrorNumber] = useState({});
  const [errorotp, setErrorOtp] = useState({});
  const [otpcode, setOtpCode] = useState("");
  const [flag, setFlag] = useState(false);
  const [result, setResult] = useState("");

  const history = useNavigate();

  const isEmptyPhone = () => {
    if (number === "" || number === undefined || number.length < 3) {
      return setErrorNumber({
        PhoneNumber: true,
        Message: "Phone Number Cannot Be Empty !",
      });
    }
  };

  const isValidCode = () => {
    if (otpcode.length === 0) {
      return setErrorOtp({
        OtpError: true,
        Message: "This Field Cannot Be Empty !",
      });
    }
    if (otpcode.length <= 5) {
      return setErrorOtp({
        OtpError: true,
        Message: "Code Must Be More Than 5 Digits !",
      });
    }
    if (otpcode.length >= 8) {
      return setErrorOtp({
        OtpError: true,
        Message: "Code Must Be Less Than 8 Digits !",
      });
    }
  };

  const switchToVerify = () => {
    setFlag(true);
  };

  const cancel = () => {
    // reload current page
    window.location.reload("/");
  };

  const CallBackendToFindPhoneNumber = () => {
    axios
      .post("/login-system/forget-password", {
        PhoneNumber: number,
      })
      .then(function (respond) {
        // console.log(respond);
        // console.log(respond.data.Message);
        // Number found send to verify OTP else throw message
        if (respond.data.Message === true) {
          switchToVerify();
        } else {
          setErrorNumber({
            PhoneNumber: true,
            Message: respond.data.Error,
          });
        }
      })
      .catch(function (error) {
        console.log(error.message);
        // throw error message and refresh page in 5 sec
        if (error.response.data) {
          // console.log(error.response.statusText);
          return (
            setErrorNumber({
              PhoneNumber: true,
              Message: error.response.data,
            }),
            setTimeout(cancel, 5000)
          );
        } else {
          return (
            setErrorNumber({
              PhoneNumber: true,
              Message: "Cannot access to the internet !",
            }),
            setTimeout(cancel, 5000)
          );
        }
      });
  };

  const findPhoneNumber = async () => {
    try {
      // popup recaptha box
      const response = await setUpRecaptha("+" + number);
      setResult(response);
    } catch (error) {
      setErrorNumber({
        PhoneNumber: true,
        Message: "Invalid PhoneNumber !",
      });
      // wait timer of 3.5 sec and refresh page
      return setTimeout(cancel, 4000);
    }

    // send request to backend for phonenumber if no error shown
    CallBackendToFindPhoneNumber();
  };

  const search = (e) => {
    e.preventDefault(); // prevent page from refresh
    setErrorNumber({});
    // delay for few second
    setTimeout(isEmptyPhone, 200);

    if (number.length > 3) {
      findPhoneNumber();
    }
  };

  const verify = async (e) => {
    e.preventDefault(); // prevent page from refresh
    setErrorOtp({});
    // delay for few second
    setTimeout(isValidCode, 200);

    if (otpcode.length > 5 && errorotp.OtpError === undefined) {
      try {
        await result.confirm(otpcode);

        // redirect to resetPassword with phonenumber
        history("/ResetPassword", {
          state: { phonenumber: number },
          replace: true,
        });
      } catch (error) {
        setErrorOtp({
          OtpError: true,
          Message: "Invalid Verification Code !",
        });
      }
    }
  };
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 mb-auto ml-auto mr-auto mt-2 bg-white rounded-md lg:max-w-lg">
        <Logo />

        {!flag && (
          <h1 className="text-3xl font-semibold text-center text-black">
            Find Your Account
          </h1>
        )}

        {flag && (
          <h1 className="text-3xl font-semibold text-center text-black">
            Validate OTP
          </h1>
        )}

        {!flag && (
          <p className="text-lg font-semibold text-center text-black mt-3">
            Please enter mobile number to search for your account.
          </p>
        )}

        {flag && (
          <p className="text-lg font-semibold text-center text-black mt-3">
            Code has been send to {number?.slice(3)}
          </p>
        )}

        {/* Mobile Number Input Box */}
        {!flag && (
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

            {/* recaptcha */}
            <div className="w-full flex justify-center mt-6">
              <div id="recaptcha-container" />
            </div>

            {/* Error Message */}

            {errornumber.PhoneNumber && (
              <ErrorMessageForgotPassword
                props={errornumber.Message}
                status={true}
              />
            )}

            <div className="w-full mt-6">
              {/* Search */}
              <div className="min-w-max mt-4">
                <button
                  className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg text-s text-center mr-3 mb-2
            focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden
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
                  focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden"
                  >
                    <KeyboardBackspaceIcon className="svg-icons " />
                    {/* {""} Go Back ?  mr-4*/}
                  </button>
                </Link>
              </div>
            </div>
          </form>
        )}

        {/* Verify form box */}

        {flag && (
          <form className="mt-6">
            {/* Code Box */}
            <div className="mb-2">
              <div className="flex flex-row cursor-pointer">
                <input
                  type="text"
                  placeholder="Enter Code"
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 text-center"
                />
              </div>
            </div>

            {/* Error Message */}

            {errorotp.OtpError && (
              <ErrorMessageForgotPassword
                props={errorotp.Message}
                status={true}
              />
            )}

            <div className="w-full mt-6">
              {/* Verify */}
              <div className="min-w-max mt-4">
                <button
                  className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg text-s text-center mr-3 mb-2
            focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden
            "
                  onClick={verify}
                >
                  Submit PIN
                </button>
              </div>
              {/* cancel */}
              <div className="min-w-max mt-4">
                <Link to="/">
                  <button
                    className="w-full px-5 py-2.5 text-white bg-neutral-700 font-medium rounded-lg text-s mr-3 mb-2  focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden
           "
                  >
                    <KeyboardBackspaceIcon className="svg-icons " />
                  </button>
                </Link>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
