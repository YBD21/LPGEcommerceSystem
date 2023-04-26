import React, { useState, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const EditUserListPopUp = ({
  onChild,
  currentData,
  userList,
  isChange,
  prevIsChange,
}) => {
  const [accountType, setAccountType] = useState(currentData.accountType);
  const [disableStatus, setDisableStatus] = useState(currentData.status);

  const close = () => {
    onChild(false);
  };

  const selectLogAccountType = (e) => {
    setAccountType(e.target.value);
  };

  const selectLogDisableStatus = (e) => {
    setDisableStatus(e.target.value);
  };

  const saveChanges = () => {};

  const accountTypeOption = ["Admin", "Client"];

  const disableStatusOption = ["Yes", "-"];

  const firstName =
    userList[currentData.countryCode][currentData.phoneNumber]["FirstName"];

  const lastName =
    userList[currentData.countryCode][currentData.phoneNumber]["LastName"];

  const fullName = firstName + " " + lastName;

  const fullPhoneNumber =
    currentData.countryCode + "-" + currentData.phoneNumber;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
      <div
        className="relative z-10 inline-block w-full p-6 
        mx-auto bg-white rounded-lg sm:max-w-2xl sm:p-5"
      >
        <div className="w-full flex flex-col px-8 py-3 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-center text-black">
            Edit User
          </h3>

          <p className="text-lg font-bold mb-4 text-justify text-black tracking-wider">
            Name : {fullName}
          </p>

          <p className="text-lg font-bold mb-4 text-justify text-black tracking-wider">
            PhoneNumber : {fullPhoneNumber}
          </p>

          <div className="w-full flex flex-start py-2">
            <p className="text-lg font-bold my-auto text-center text-black tracking-wider px-4">
              Account Type :
            </p>
            {/* Select Dropdown Account Type */}
            <div className="relative flex-grow ml-2">
              <select
                className={`w-full px-5 py-1.5 text-black bg-white rounded-lg text-lg font-semibold text-center appearance-none cursor-pointer border-2 focus:outline-none focus:ring focus:ring-opacity-40 border-black focus:border-black focus:ring-black`}
                onChange={selectLogAccountType}
                value={accountType}
              >
                {accountTypeOption.map((element, index) => {
                  return (
                    <option key={index} value={element}>
                      {element}
                    </option>
                  );
                })}
              </select>
              <ExpandMoreIcon
                className={`absolute top-2.5 right-3.5 svg-icons 
                cursor-pointer pointer-events-none text-black`}
              />
            </div>
          </div>

          <div className="w-full flex flex-start pt-2">
            <p className="text-lg font-bold my-auto text-center text-black tracking-wider pr-2">
              Disable Account :
            </p>
            {/* Select Disable Account Type */}
            <div className="relative flex-grow ml-2">
              <select
                className={`w-full px-5 py-1.5 text-black bg-white rounded-lg text-lg font-semibold text-center appearance-none cursor-pointer border-2 focus:outline-none focus:ring focus:ring-opacity-40 border-black focus:border-black focus:ring-black`}
                onChange={selectLogDisableStatus}
                value={disableStatus}
              >
                {disableStatusOption.map((element, index) => {
                  return (
                    <option key={index} value={element}>
                      {element}
                    </option>
                  );
                })}
              </select>
              <ExpandMoreIcon
                className={`absolute top-2.5 right-3.5 svg-icons 
                cursor-pointer pointer-events-none text-black`}
              />
            </div>
          </div>

          <div className="w-full flex flex-col justify-center text-center">
            <div className="w-full flex justify-between pt-8">
              <button
                className="w-1/2 px-5 py-2.5 tracking-wide 
                bg-black rounded-lg text-center mr-2 mb-2 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 overflow-hidden"
                onClick={saveChanges}
              >
                <span className="text-white font-semibold text-lg ">
                  Save Changes
                </span>
              </button>
              <button
                className="w-1/2 px-5 py-2.5 tracking-wide text-white bg-neutral-700 font-medium rounded-lg text-center mr-2 mb-2 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 overflow-hidden"
                onClick={close}
              >
                <span className="text-white font-semibold text-lg">Cancel</span>
              </button>
            </div>
          </div>

          <button className="absolute top-0 right-0 m-5" onClick={close}>
            <CancelIcon className="svg-icons text-neutral-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserListPopUp;
