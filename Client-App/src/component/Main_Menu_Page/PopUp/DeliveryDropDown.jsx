import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
const DeliveryDropDown = ({ status }) => {
  return (
    <div className="flex flex-col border-2 border-black">
      <span className="text-lg font-semibold text-black m-5">
        {" "}
        You can pay in cash to our staff when you recive the goods at your
        doorstep
      </span>
      <div className=" flex flex-row justify-between">
        <button
          className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg text-lg 
            text-center mr-3 mb-2"
        >
          Confirm Order
        </button>

        <button
          className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg text-lg 
            text-center mr-3 mb-2"
        >
          <KeyboardBackspaceIcon lassName="svg-icons"/>
        </button>
      </div>
    </div>
  );
};

export default DeliveryDropDown;
