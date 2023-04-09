import React, { useState } from "react";
import userProfileDefaultImage from "../../../dist/image/user-profile-icon.webp";
import { useStateValue } from "../../../ContextAPI/StateProvider";
import ChangePassword from "./ChangePassword";
import PopupPortal from "../PopUp/PopupPortal";

const EditProfile = () => {
  const [{ userData }] = useStateValue();
  const name = userData?.firstName + " " + userData?.lastName;
  const [isChange, setIsChange] = useState(false);
  const [isDelete, setDelete] = useState(false);

  const changePassword = () => {
    setIsChange(true);
  };

  const handleChildData = (data) => {
    setIsChange(data);
  };

  return (
    <div className="basis-1/3 ml-2 py-5 justify-between">
      <div className="w-full flex justify-center py-3">
        <img
          src={userProfileDefaultImage}
          alt="Profile"
          className=" w-1/4 rounded-full border-2 border-black"
        />
      </div>
      <p className="py-2 font-bold text-2xl text-center">{name}</p>

      <div className="flex mt-3 justify-center">
        <button
          className="w-1/3 max-lg:w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg text-s text-center 
            mr-2 mb-2 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden"
          onClick={changePassword}
        >
          Change Password
        </button>
      </div>
      {/* ChangePassword Popup*/}
      {/* activate Change Password portal */}
      {isChange ? (
        <PopupPortal>
          <ChangePassword onChild={handleChildData} />
        </PopupPortal>
      ) : (
        false
      )}

      <div className="flex mt-10 justify-center">
        <button
          className="w-1/3 max-lg:w-full px-5 py-2.5 tracking-wide
            text-white bg-red-900 font-medium rounded-lg text-s text-center mr-2 mb-2
            focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-opacity-50 active:ring-4 active:ring-red-900 active:ring-opacity-50 relative overflow-hidden"
        >
          Delete Account
        </button>
      </div>
      {/* Delete Account Popup*/}
      {/* Are you Sure ? */}
    </div>
  );
};

export default EditProfile;
