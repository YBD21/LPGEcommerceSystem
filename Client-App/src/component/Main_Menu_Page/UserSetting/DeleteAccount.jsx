import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import instance from "../../../instance";
import { useStateValue } from "../../../ContextAPI/StateProvider";

const DeleteAccount = ({ onChild }) => {
  const [{ userData }, dispatch] = useStateValue();
  // Clear userData in ContexAPI
  const clearUserData = () => {
    dispatch({
      type: "SET_USER",
      userData: null,
    });
  };
  const requestDeleteAccount = () => {
    instance
      .delete("/user-management/delete-account", {
        withCredentials: true,
      })
      .then((respond) => {
        // console.log(respond.data);
        if (respond.data === true) {
          clearUserData();
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const close = () => {
    onChild(false);
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
      <div className="relative z-10 inline-block w-full p-6 mx-auto bg-white rounded-lg sm:max-w-lg sm:p-5">
        {/* Start Delete Account */}
        <div className="w-full flex flex-col px-12 py-3 rounded-lg items-center">
          <h3 className="text-2xl font-bold mb-4 text-center text-black">
            Delete Account
          </h3>
          <div className="w-full flex flex-col mt-2 justify-center text-center">
            <div className="pt-6 pb-10">
              <DeleteForeverIcon className="scale-[3] text-red-800" />
            </div>
            <span className="text-black font-semibold text-lg">
              Are you sure you want to delete the Account ?
            </span>
            <p className="text-gray-600 mt-2">
              Note : Deleting your account will remove your login credentials, but your
              order history will remain intact.
            </p>
            <div className="w-full flex justify-between pt-8">
              <button
                className="w-1/2 px-5 py-2.5 tracking-wide
                 bg-red-800  rounded-lg text-center mr-2 mb-2
           focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-opacity-50 active:ring-4 active:ring-red-800 active:ring-opacity-50 overflow-hidden"
                onClick={requestDeleteAccount}
              >
                <span className="text-white font-semibold text-lg ">
                  Confirm
                </span>
                <DeleteForeverIcon className="svg-icons text-white ml-6 pb-0.5" />
              </button>
              <button
                className="w-1/2 px-5 py-2.5 tracking-wide
             text-white bg-neutral-700 font-medium rounded-lg text-center mr-2 mb-2
             focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 overflow-hidden"
                onClick={close}
              >
                <span className="text-white font-semibold text-lg">Cancel</span>
              </button>
            </div>
          </div>

          {/*End Delete Account */}
          <button className="absolute top-0 right-0 m-5" onClick={close}>
            <CancelIcon className="svg-icons text-neutral-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
