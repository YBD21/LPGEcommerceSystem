import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Logo from "../Logo";
import ErrorMessageSignup from "./Error_Handeling_Message/ErrorMessageSignup";

const SignUp = () => {
  const [open, setOpen] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [createpassword, setCreatePassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [number, setNumber] = useState("");

  const [errorfirstname,setErrorFirstName] = useState({});
  const [errorlastname,setErrorLastName] = useState({});
  const [errornumber,setErrorNumber] = useState({});
  const [errorcreatepassword,setErrorCreatePassword] = useState({});
  const [errorconfirmpassword,setErrorConfirmPassword] = useState({});

  // handle toggle to show or hide password
  const toggle = () => {
    setOpen(!open);
  };

  const Empty_Field_Validation = () => {
    if (firstname.length === 0){
      setErrorFirstName({FirstName : true , Message : "First Name Cannot Be Empty !"});
    }   
   
    if (lastname.length === 0){
      setErrorLastName({LastName : true , Message : "Last Name Cannot Be Empty !"});
    }  
    
    if (createpassword.length === 0){
      setErrorCreatePassword({CreatePassword : true , Message : "Create Password Cannot Be Empty !"});
    } 
    
    if (confirmpassword.length === 0){
      setErrorConfirmPassword({ConfirmPassword : true , Message : "Confirm Password Cannot Be Empty !"});
    } 

    if (number.length === 0){
      setErrorNumber({PhoneNumber : true , Message : "Phone Number Cannot Be Empty !"});
    } 

   }

   const Recheck_Validation =() => {
    if (firstname.length > 0){
      setErrorFirstName({});
    }   
   
    if (lastname.length > 0){
      setErrorLastName({});
    }  
    
    if (createpassword.length > 0){
      setErrorCreatePassword({});
    } 
    
    if (confirmpassword.length > 0){
      setErrorConfirmPassword({});
    } 

    if (number.length > 0){
      setErrorNumber({});
    }
   }

   const Check_Password = () => {
    
    if (createpassword === confirmpassword && createpassword.length >= 8){
      setErrorCreatePassword({});
    } else {
      setErrorConfirmPassword({ConfirmPassword : true , Message : "Password Does Not Match !"});
    } 
    
    if (confirmpassword.length <= 7 && createpassword.length <= 7){
      setErrorConfirmPassword({ConfirmPassword : true , Message : "Password Must Be 8 Character Long !"});
      setErrorCreatePassword({CreatePassword : true , Message : "Password Must Be 8 Character Long !"});
    }


   }

   const Check_Name = () => {
  
    if (firstname.length <= 2 && firstname.length !== 0){
      setErrorFirstName({FirstName : true , Message : "First Name Should Be More Than 2 Character Long !"});
    }   
   
    if (lastname.length <= 2 && lastname.length !== 0){
      setErrorLastName({LastName : true , Message : "Last Name Should Be More Than 2 Character Long !"});
    }
    
    // "/^[a-zA-Z]+$/" regular expression. This regular expression will match any string that contains only letters from the alphabet, without any other characters or whitespace.

    if (! (/^[a-zA-Z]+$/.test(firstname)) && firstname.length !== 0){
      setErrorFirstName({FirstName : true , Message : "Please Enter Valid First Name !"});
    } 

    if (! (/^[a-zA-Z]+$/.test(lastname)) && lastname.length !== 0){
      setErrorLastName({LastName : true , Message : "Please Enter Valid Last Name !"});
    }

    // console.log(/^[a-zA-Z]+$/.test(firstname));

  }

  const createAccount = (e) => {
    e.preventDefault(); // prevent page from refresh 
    Recheck_Validation();
    Check_Password();
    Empty_Field_Validation();
    Check_Name();
    
  }
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
            {/* Error Message */}
           {errorfirstname.FirstName && <ErrorMessageSignup props={errorfirstname.Message}/>}

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
           {errorlastname.LastName && <ErrorMessageSignup props={errorlastname.Message}/>}

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
           {errornumber.PhoneNumber && <ErrorMessageSignup props={errornumber.Message}/>}

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
           {errorcreatepassword.CreatePassword && <ErrorMessageSignup props={errorcreatepassword.Message}/>}
          
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
           {errorconfirmpassword.ConfirmPassword && <ErrorMessageSignup props={errorconfirmpassword.Message}/>}

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
        </form>

        <div className="mt-4">

          <div className="mt-3">
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
      </div>
    </div>
  );
};

export default SignUp;
