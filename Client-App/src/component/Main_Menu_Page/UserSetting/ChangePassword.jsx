import React, { useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ErrorMessageSignup from "../../Login_System/Error_Handeling_Message/ErrorMessageSignup";
import bcrypt from "bcryptjs";
import instance from "../../../instance";
import ErrorMessageLogin from "../../Login_System/Error_Handeling_Message/ErrorMessageLogin";

const ChangePassword = ({ onChild }) => {
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorCurrentPassword, setErrorCurrentPassword] = useState({});
  const [errorNewPassword, setErrorNewPassword] = useState({});
  const [errorConfirmPassword, setErrorConfirmPassword] = useState({});
  const [error, setError] = useState(null); // capture error with this state

  const salt = bcrypt.genSaltSync(10);
  // handle toggle to show or hide password
  const toggle = () => {
    setOpen(!open);
  };

  const saveChanges = (e) => {
    e.preventDefault(); // prevent from page to refresh
    setError(null);
    const sumTotal = Check_Password();
    if (sumTotal === 0) {
      const newHashedPassword = bcrypt.hashSync(newPassword, salt);
      callBackendToChangePassword(newHashedPassword);
      // console.log("Call Backend !");
    }
  };

  const callBackendToChangePassword = (newHashedPassword) => {
    instance
      .patch(
        "/login-system/change-password",
        {
          currentPassword,
          newHashedPassword,
        },
        {
          withCredentials: true,
        }
      )
      .then((respond) => {
        // console.log(respond.data);
        if (respond.data === false) {
          return (
            // console.log(false),
            setError("Incorrect Data")
          );
        } else {
          close();
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const close = () => {
    onChild(false);
  };

  const Check_Password = () => {
    let count = 0;
    if (newPassword === confirmPassword) {
      if (newPassword.length >= 8 && newPassword.length <= 16) {
        if (newPassword === currentPassword) {
          setErrorNewPassword({
            newPassword: true,
            Message: "New password cannot be the same as the current password",
          });
          count += 1;
        } else {
          setErrorNewPassword({});
        }
      }

      if (confirmPassword.length >= 8 && confirmPassword.length <= 16) {
        setErrorConfirmPassword({});
      }
    } else {
      setErrorConfirmPassword({
        ConfirmPassword: true,
        Message: "Password Does Not Match !",
      });
      count += 1;
    }

    if (newPassword.length < 8 || newPassword.length > 16) {
      setErrorNewPassword({
        newPassword: true,
        Message: "Password must be between 8 and 16 characters long!",
      });
      count += 1;
    }

    if (currentPassword.length < 8 || currentPassword.length > 16) {
      setErrorCurrentPassword({
        CurrentPassword: true,
        Message: "Password must be between 8 and 16 characters long!",
      });
      count += 1;
    }

    if (confirmPassword.length > 16) {
      setErrorConfirmPassword({
        ConfirmPassword: true,
        Message: "Password cannot be more than 16 characters long!",
      });
      count += 1;
    }

    return count;
  };

  useEffect(() => {
    setErrorCurrentPassword({});
  }, [currentPassword]);

  useEffect(() => {
    setErrorNewPassword({});
  }, [newPassword]);

  useEffect(() => {
    setErrorConfirmPassword({});
  }, [confirmPassword]);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
      <div className="relative z-10 inline-block w-full p-6 mx-auto mt-10 bg-white rounded-lg transform sm:max-w-2xl sm:p-8">
        <form className="w-full">
          {/* Start Change Password */}
          <div className="w-full flex flex-col px-12 py-3 rounded-lg items-center">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Change Password
            </h3>

            {/* Current Password Input Box */}
            <div className="py-3 w-full">
              <label className="block text-sm font-semibold text-gray-800">
                Current Password
              </label>

              <div className="flex flex-row cursor-pointer">
                <input
                  type={open === false ? "password" : "text"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  autoComplete="true"
                  required={true}
                  className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black 
                focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
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
            {errorCurrentPassword.CurrentPassword && (
              <ErrorMessageSignup props={errorCurrentPassword.Message} />
            )}

            {/*New Password Input Box */}
            <div className="py-3 w-full">
              <label className="block text-sm font-semibold text-gray-800">
                New Password
              </label>

              <div className="flex flex-row cursor-pointer">
                <input
                  type={open === false ? "password" : "text"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="true"
                  required={true}
                  className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black 
                focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
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
            {errorNewPassword.newPassword && (
              <ErrorMessageSignup props={errorNewPassword.Message} />
            )}

            {/*Confirm New Password Input Box */}
            <div className="py-3 w-full">
              <label className="block text-sm font-semibold text-gray-800">
                Confirm New Password
              </label>

              <div className="flex flex-row cursor-pointer">
                <input
                  type={open === false ? "password" : "text"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="true"
                  required={true}
                  className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md focus:border-black 
                focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
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
            {errorConfirmPassword.ConfirmPassword && (
              <ErrorMessageSignup props={errorConfirmPassword.Message} />
            )}
          </div>
        </form>

        {/* Error Message */}
        {error && <ErrorMessageLogin Error_message={error} status={true} />}

        <div className="w-full flex justify-between mt-5">
          <button
            className="w-1/3 px-5 py-2.5 tracking-wide
           text-white bg-black font-medium rounded-lg text-center mr-2 mb-2
           focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 overflow-hidden"
            onClick={saveChanges}
          >
            <span className="text-white font-semibold">Save Changes</span>
          </button>
          <button
            className="w-1/3 px-5 py-2.5 tracking-wide
             text-white bg-neutral-700 font-medium rounded-lg text-center mr-2 mb-2
             focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 overflow-hidden"
            onClick={close}
          >
            <span className="text-white font-semibold">Cancel</span>
          </button>
        </div>

        {/*End Change Password */}
        <button className="absolute top-0 right-0 m-5" onClick={close}>
          <CancelIcon className="svg-icons text-neutral-700" />
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
