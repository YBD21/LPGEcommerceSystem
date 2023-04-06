import React from "react";
import userProfileDefaultImage from "../../../dist/image/user-profile-icon.webp";
import { useStateValue } from "../../../ContextAPI/StateProvider";

const EditProfile = () => {
  const [{ userData }] = useStateValue();
  const name = userData?.firstName + " " + userData?.lastName;
  return (
    <div
      className="w-full max-md:w-full 
      flex flex-col ml-2 justify-between border-l-4 border-black"
    >
      <div className="w-full flex justify-center pb-2">
        <img
          src={userProfileDefaultImage}
          alt="Profile"
          className="w-1/6 rounded-full border-2 border-black"
        />
      </div>
      <p className="py-2 font-bold text-2xl text-center">{name}</p>

      <div className="flex mt-3 justify-center">
        <button
          className="w-1/3 max-lg:w-1/2 px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg text-s text-center 
            mr-2 mb-2 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden"
        >
          Change Password
        </button>
      </div>

      <div className="flex mt-10 justify-center">
        <button
          className="w-1/3 max-lg:w-1/2 px-5 py-2.5 tracking-wide
            text-white bg-red-900 font-medium rounded-lg text-s text-center mr-2 mb-2
            focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-opacity-50 active:ring-4 active:ring-red-900 active:ring-opacity-50 relative overflow-hidden"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
