import React from "react";
import userProfileDefaultImage from "../../../dist/image/user-profile-icon.webp";
import { useStateValue } from "../../../ContextAPI/StateProvider";
const UserProfile = () => {
    // import userData from contexProvider or dataLayer
  const [{ userData }] = useStateValue();
  const name = userData?.firstName + " " + userData?.lastName;
  return (
    <div className="flex items-center pb-2">
      <img
        src={userProfileDefaultImage}
        alt="Profile"
        className="w-12 h-12 rounded-full border-2 border-black"
      />
      <p className="ml-5 font-bold text-2xl">{name}</p>
    </div>
  );
};

export default UserProfile;
