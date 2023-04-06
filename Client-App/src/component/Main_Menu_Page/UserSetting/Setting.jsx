import React, { useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import EditProfile from "./EditProfile";

const Setting = () => {
  return (
    <>
      <h3 className="text-2xl py-5 text-center font-semibold max-lg:m-5">
        {" "}
        Setting
      </h3>

      <div className="w-full flex flex-row justify-between max-md:flex-col-reverse">
        <UserInfo />

        <EditProfile />
      </div>
    </>
  );
};

export default Setting;
