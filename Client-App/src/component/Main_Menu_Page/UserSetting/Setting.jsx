import React from "react";
import UserInfo from "./UserInfo";
import EditProfile from "./EditProfile";

const Setting = () => {
  return (
    <div className="flex max-md:flex-col justify-around pt-10">
      <EditProfile />
      <UserInfo />
    </div>
  );
};

export default Setting;
