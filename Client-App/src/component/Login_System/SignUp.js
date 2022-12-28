import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Logo from "../Logo";
import ErrorMessageSignup from "./Error_Handeling_Message/ErrorMessageSignup";
import ErrorMessageForgotPassword from "./Error_Handeling_Message/ErrorMessageForgotPassword";
import { useUserAuth } from "../../ContextAPI/UserAuthContext";
import axios from "axios";
import bcrypt from "bcryptjs";
import SuccessMessageReset from "./Success_Message/successMessageReset";

const SignUp = () => {
  const { setUpRecaptha } = useUserAuth();
  const [open, setOpen] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [createpassword, setCreatePassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [number, setNumber] = useState("");
  const [otpcode, setOtpCode] = useState("");
  const [flag, setFlag] = useState(false);
  const [result, setResult] = useState("");
  const [success, setSuccess] = useState(null);

  const [errorfirstname, setErrorFirstName] = useState({});
  const [errorlastname, setErrorLastName] = useState({});
  const [errornumber, setErrorNumber] = useState({});
  const [errorcreatepassword, setErrorCreatePassword] = useState({});
  const [errorconfirmpassword, setErrorConfirmPassword] = useState({});
  const [errorotp, setErrorOtp] = useState({});
  const [errorMain, setErrorMain] = useState({});
  const salt = bcrypt.genSaltSync(10);

  const history = useNavigate();

  // handle toggle to show or hide password
  const toggle = () => {
    setOpen(!open);
  };

  const switchToVerify = () => {
    setFlag(true);
  };

  const cancel = () => {
    // reload current page
    window.location.reload("/");
  };

  const redirectToLogin = () => {
    history("/", { replace: true });
  };

  const Empty_Field_Validation = () => {
    let count = 0;
    if (firstname.length === 0) {
      setErrorFirstName({
        FirstName: true,
        Message: "First Name Cannot Be Empty !",
      });
      count += 1;
    }

    if (lastname.length === 0) {
      setErrorLastName({
        LastName: true,
        Message: "Last Name Cannot Be Empty !",
      });
      count += 1;
    }

    if (createpassword.length === 0) {
      setErrorCreatePassword({
        CreatePassword: true,
        Message: "Create Password Cannot Be Empty !",
      });
      count += 1;
    }

    if (confirmpassword.length === 0) {
      setErrorConfirmPassword({
        ConfirmPassword: true,
        Message: "Confirm Password Cannot Be Empty !",
      });
      count += 1;
    }

    if (number.length === 0 || number.length === 3) {
      setErrorNumber({
        PhoneNumber: true,
        Message: "Phone Number Cannot Be Empty !",
      });
      count += 1;
    }

    return count;
  };

  const Recheck_Validation = () => {
    let count = 5;

    if (firstname.length > 0) {
      setErrorFirstName({});
      count -= 1;
    }

    if (lastname.length > 0) {
      setErrorLastName({});
      count -= 1;
    }

    if (createpassword.length > 0) {
      setErrorCreatePassword({});
      count -= 1;
    }

    if (confirmpassword.length > 0) {
      setErrorConfirmPassword({});
      count -= 1;
    }

    if (number.length > 0) {
      setErrorNumber({});
      count -= 1;
    }

    return count;
  };
  const Check_Password = () => {
    let count = 0;
    if (createpassword === confirmpassword) {
      if (createpassword.length >= 8 && createpassword.length <= 16) {
        setErrorCreatePassword({});
      }

      if (confirmpassword.length >= 8 && confirmpassword.length <= 16) {
        setErrorConfirmPassword({});
      }
    }

    if (createpassword !== confirmpassword) {
      setErrorConfirmPassword({
        ConfirmPassword: true,
        Message: "Password Does Not Match !",
      });
      count += 1;
    }

    if (confirmpassword.length < 8) {
      setErrorConfirmPassword({
        ConfirmPassword: true,
        Message: "Password Must Be 8 Character Long !",
      });
      count += 1;
    }

    if (createpassword.length < 8) {
      setErrorCreatePassword({
        CreatePassword: true,
        Message: "Password Must Be 8 Character Long !",
      });
      count += 1;
    }

    if (confirmpassword.length > 16) {
      setErrorConfirmPassword({
        ConfirmPassword: true,
        Message: "Password Cannnot Be More Than 16 Character Long !",
      });
      count += 1;
    }

    if (createpassword.length > 16) {
      setErrorCreatePassword({
        CreatePassword: true,
        Message: "Password Cannnot Be More Than 16 Character Long !",
      });
      count += 1;
    }

    return count;
  };

  const checkNumberField = () => {
    let count = 0;
    if (number.length < 10) {
      setErrorNumber({
        PhoneNumber: true,
        Message: "Number cannot be less than 10 digits !",
      });
      count += 1;
    }

    return count;
  };

  const Check_Name = () => {
    let count = 0;

    if (firstname.length <= 2 && firstname.length !== 0) {
      setErrorFirstName({
        FirstName: true,
        Message: "First Name Should Be More Than 2 Character Long !",
      });
      count += 1;
    }

    if (lastname.length <= 2 && lastname.length !== 0) {
      setErrorLastName({
        LastName: true,
        Message: "Last Name Should Be More Than 2 Character Long !",
      });
      count += 1;
    }

    // "/^[a-zA-Z]+$/" regular expression. This regular expression will match any string that contains only letters from the alphabet, without any other characters or whitespace.

    if (!/^[a-zA-Z]+$/.test(firstname) && firstname.length !== 0) {
      setErrorFirstName({
        FirstName: true,
        Message: "Please Enter Valid First Name !",
      });
      count += 1;
    }

    if (!/^[a-zA-Z]+$/.test(lastname) && lastname.length !== 0) {
      setErrorLastName({
        LastName: true,
        Message: "Please Enter Valid Last Name !",
      });
      count += 1;
    }

    // console.log(/^[a-zA-Z]+$/.test(firstname));
    return count;
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

  const checkPhoneNumber = async () => {
    let errorstatus = false;
    const statuserror = CallBackendToFindPhoneNumber();
    // console.log(statuserror);
    // check number in database
    // send request to backend for phonenumber if no error shown
    if (statuserror === false) {
      try {
        // popup recaptha box
        const response = await setUpRecaptha("+" + number);
        setResult(response);
      } catch (error) {
        setErrorNumber({
          PhoneNumber: true,
          Message: "Invalid PhoneNumber !",
        });
        errorstatus = true;
        // wait timer of 3.5 sec and refresh page
        setTimeout(cancel, 4000);
      }
      if (!errorstatus) {
        switchToVerify();
      }
    }
  };

  const createAccount = (e) => {
    e.preventDefault(); // prevent page from refresh
    const reCheck = Recheck_Validation();
    const checkPass = Check_Password();
    const isnumber = checkNumberField();
    const isEmpty = Empty_Field_Validation();
    const isName = Check_Name();

    // run only if all fields are correct
    const sumTotal = reCheck + checkPass + isEmpty + isName + isnumber;
    // console.log(sumTotal);
    if (sumTotal === 0) {
      checkPhoneNumber();
    }
  };

  const verify = async (e) => {
    e.preventDefault(); // prevent page from refresh
    setErrorOtp({});
    // delay for few second
    setTimeout(isValidCode, 200);
    let errorstatus = false;
    if (otpcode.length > 5 && errorotp.OtpError === undefined) {
      try {
        await result.confirm(otpcode);
      } catch (error) {
        setErrorOtp({
          OtpError: true,
          Message: "Invalid Verification Code !",
        });
        errorstatus = true;
      }
      if (!errorstatus) {
        //call backend to create user account
        CallBackendToRegisterNumber();
      }
    }
  };

  const CallBackendToRegisterNumber = () => {
    const hashed_Password = bcrypt.hashSync(createpassword, salt);
    const create_Date = new Date().toString();
    //  console.log(create_Date);
    axios
      .post("http://localhost:5000/SignUp", {
        PhoneNumber: number,
        encPass: hashed_Password,
        FirstName: firstname,
        LastName: lastname,
        Created: create_Date,
      })
      .then(function (respond) {
        if (respond.data.Message === true) {
          // redirect to Login Page
           setSuccess();
          //display account created Succefully!
          setTimeout(redirectToLogin, 4000);
        } else {
          setErrorMain({
            PhoneNumber: true,
            Message: respond.data.Error,
          });
        }
      })
      .catch(function (error) {
        // console.log(error.message);
        // throw error message and refresh page in 3 sec
        setErrorMain({
          PhoneNumber: true,
          Message: "Cannot access to the internet !",
        });
        setTimeout(cancel, 3000);
      });
  };

  const CallBackendToFindPhoneNumber = () => {
    let status = false;
    axios
      .post("http://localhost:5000/ForgetPassword", {
        PhoneNumber: number,
      })
      .then(function (respond) {
        // console.log(respond);
        // console.log(respond.data.Message);
        // Number found send to verify OTP else throw message
        if (respond.data.Message === true) {
          setErrorMain({
            PhoneNumber: true,
            Message: `${number.slice(3)} is already registered !`,
          });
          status = true;
        }
        if (respond.data.Error !== "PhoneNumber Not Found !") {
          setErrorMain({
            PhoneNumber: true,
            Message: `${number.slice(3)} is already registered !`,
          });
          status = true;
        }
      })
      .catch(function (error) {
        // console.log(error.message);
        // throw error message and refresh page in 3 sec
        setErrorMain({
          PhoneNumber: true,
          Message: "Cannot access to the internet !",
        });
        setTimeout(cancel, 3000);
        status = true;
      });

    return status;
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 mb-auto ml-auto mr-auto mt-2 bg-white rounded-md lg:max-w-lg">
        {/* logo */}

        <Logo />

        {!flag && (
          <h1 className="text-3xl font-semibold text-center text-black">
            SignUp
          </h1>
        )}

        {flag && (
          <h1 className="text-3xl font-semibold text-center text-black">
            Validate OTP
          </h1>
        )}

        {flag && (
          <p className="text-lg font-semibold text-center text-black mt-3">
            Code has been send to {number?.slice(3)}
          </p>
        )}

        {!flag && (
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
              {/* Error Message */}
              {errorfirstname.FirstName && (
                <ErrorMessageSignup props={errorfirstname.Message} />
              )}
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

            {/* Error Message */}
            {errorlastname.LastName && (
              <ErrorMessageSignup props={errorlastname.Message} />
            )}

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

            {/* Error Message */}
            {errornumber.PhoneNumber && (
              <ErrorMessageSignup props={errornumber.Message} />
            )}

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
            {errorconfirmpassword.ConfirmPassword && (
              <ErrorMessageSignup props={errorconfirmpassword.Message} />
            )}

            {errorMain.PhoneNumber && (
              <ErrorMessageForgotPassword
                props={errorMain.Message}
                status={true}
              />
            )}

            {/* recaptcha */}
            <div className="w-full flex justify-center mt-6">
              <div id="recaptcha-container" />
            </div>
            <div className="mt-5">
              <button
                className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg text-s text-center mr-3 mb-2
            "
                onClick={createAccount}
              >
                Create Account
              </button>
            </div>
            <div className="mt-4">
              <div className="mt-3">
                <button
                  className="w-full px-5 py-2.5 text-white bg-neutral-700 font-medium rounded-lg text-s mr-3 mb-2"
                  onClick={redirectToLogin}
                >
                  <KeyboardBackspaceIcon className="svg-icons " />
                  {/* {""} Go Back ?  mr-4*/}
                </button>
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

            {/* Success Message */}
            {success && <SuccessMessageReset props={success} status={true} />}
            <div className="w-full mt-6">
              {/* Verify */}
              <div className="min-w-max mt-4">
                <button
                  className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg text-s text-center mr-3 mb-2
            "
                  onClick={verify}
                >
                  Submit PIN
                </button>
              </div>
              {/* cancel */}
              <div className="min-w-max mt-4">
                <button
                  className="w-full px-5 py-2.5 text-white bg-neutral-700 font-medium rounded-lg text-s mr-3 mb-2"
                  onClick={redirectToLogin}
                >
                  <KeyboardBackspaceIcon className="svg-icons " />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
