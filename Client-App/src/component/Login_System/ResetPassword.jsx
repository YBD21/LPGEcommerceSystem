import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../Logo";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ErrorMessageSignup from "./Error_Handeling_Message/ErrorMessageSignup";
import bcrypt from "bcryptjs";
import axios from "axios";
import ErrorMessageLogin from "./Error_Handeling_Message/ErrorMessageLogin";
import SuccessMessageReset from "./Success_Message/successMessageReset";
const ResetPassword = () => {
  const { state } = useLocation();
  const history = useNavigate();
  const [number, setNumber] = useState("");

  const [open, setOpen] = useState(false);
  const [createpassword, setCreatePassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  
  const [error, setError] = useState(null);
  const [errorcreatepassword, setErrorCreatePassword] = useState({});
  const [errorconfirmpassword, setErrorConfirmPassword] = useState({});

  const [success, setSuccess] = useState(null);

  const salt = bcrypt.genSaltSync(10);

  useEffect( () => {
    if (state === null || state === undefined){
      history("/ForgetPassword", { replace: true })
    } else {
      setNumber(state.phonenumber)
      // console.log(state.phonenumber)
    }
      },
      [state,history]
  )

  const emptyFieldValidation = () => {
    if (createpassword.length === 0) {
      setErrorCreatePassword({
        CreatePassword: true,
        Message: "Create Password Cannot Be Empty !",
      });
      return true;
    }

    if (confirmpassword.length === 0) {
      setErrorConfirmPassword({
        ConfirmPassword: true,
        Message: "Confirm Password Cannot Be Empty !",
      });
      return true;
    }
    return false;
  };

  const checkPassword = () => {
    if (createpassword === confirmpassword) {
      if (createpassword.length >= 8 && createpassword.length <= 16) {
        setErrorCreatePassword({});
      }

      if (confirmpassword.length >= 8 && confirmpassword.length <= 16) {
        setErrorConfirmPassword({});
      }
    }
    
    
    if (createpassword !== confirmpassword){
      setErrorConfirmPassword({
        ConfirmPassword: true,
        Message: "Password Does Not Match !",
      });
    }

    if (confirmpassword.length < 8 && createpassword.length < 8) {
      setErrorConfirmPassword({
        ConfirmPassword: true,
        Message: "Password Must Be 8 Character Long !",
      });
      setErrorCreatePassword({
        CreatePassword: true,
        Message: "Password Must Be 8 Character Long !",
      });
      return(
        true
      )
    }

    if (confirmpassword.length > 16 && createpassword.length > 16) {
      setErrorConfirmPassword({
        ConfirmPassword: true,
        Message: "Password Cannnot Be More Than 16 Character Long !",
      });
      setErrorCreatePassword({
        CreatePassword: true,
        Message: "Password Cannnot Be More Than 16 Character Long !",
      });
      return(
        true
      )
    }
    return(
      false
    )
  };

  const resetValidation = () => {
    if (createpassword.length > 0) {
      setErrorCreatePassword({});
      return false;
    }

    if (confirmpassword.length > 0) {
      setErrorConfirmPassword({});
      return false;
    }
    return true;
  };

  // handle toggle to show or hide password
  const toggle = () => {
    setOpen(!open);
  };

  // redircet to ForgetPassword with erase history
  const GoBack = () => {
    return history("/ForgetPassword", { replace: true });
  };

  const redirectToLogin = () => {
    return history("/", { replace: true });
  }

  const CallBackendToResetPassword = () => {
    // console.log("Sever  is Called Upon !");
    // genetate a hash_password here
    const newHashedPassword = bcrypt.hashSync(createpassword, salt);

    axios.patch("http://localhost:5000/ResetPassword",{
      PhoneNumber : number,
      EncPass : newHashedPassword 
    })
    .then (function (respond) {
    //  console.log(respond.data);
    // reset is successful redirect
     if (respond.data.Message === true){
       setSuccess("Success");
      // wait timer of 3 sec and redirect
       setTimeout(redirectToLogin,2000)
     }
    })
    .catch ( function (error) {
    //  console.log(error.message);
    setError(error.message);
    }
    )
  };

  const resetPassword = (e) => {
    e.preventDefault(); // prevent page from refresh
    setError(null); // reset previous error_message
    const revalidateStatus = resetValidation();
    const checkPasswordStatus = checkPassword();
    const emptyStatus = emptyFieldValidation();
    // console.log(revalidateStatus);
    // console.log(checkPasswordStatus);
    // console.log(emptyStatus);
    if (revalidateStatus === false && checkPasswordStatus === false && emptyStatus === false){
      CallBackendToResetPassword();
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 mb-auto ml-auto mr-auto mt-2 bg-white rounded-md lg:max-w-lg">
        <Logo />

        <h1 className="text-3xl font-bold text-center text-black">
          Reset Password For {number.slice(3)}
        </h1>
        {/* Create New Password with at least 8 characters. */}
        {/* Password must be at least 8 characters long */}
        <form className="mt-3">
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
          {/* Error Message */}
          {errorcreatepassword.CreatePassword && (
            <ErrorMessageSignup props={errorcreatepassword.Message} />
          )}

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
          {/* Error Message */}
          {errorconfirmpassword.ConfirmPassword && (
            <ErrorMessageSignup props={errorconfirmpassword.Message} />
          )}

          {/* Error Message */}

            { error &&
            <ErrorMessageLogin Error_message={error} status = {true} />           
                }

          {/* Success Message */}
           {success && <SuccessMessageReset props = {success} status = {true}/>
           }
          <div className="mt-5">
            <button
              className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg text-s text-center mr-3 mb-2
            "
              onClick={resetPassword}
            >
              Reset Password
            </button>
          </div>
        </form>
        <div className="mt-4">
          <div className="mt-3">
            <button
              className="w-full px-5 py-2.5 text-white bg-neutral-700 font-medium rounded-lg text-s mr-3 mb-2"
              onClick={GoBack}
            >
              <KeyboardBackspaceIcon className="svg-icons " />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;