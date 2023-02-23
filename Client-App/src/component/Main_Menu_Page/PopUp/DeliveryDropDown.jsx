import React from "react";

const DeliveryDropDown = ({ isOpen }) => {
  
  return (
    <div
      className={`${
        isOpen ? "flex flex-col translate-y-0" : "hidden translate-y-10"
      } border-2 border-black rounded-lg mt-4`}
    >
      <span className="text-lg font-semibold text-black text-center m-5">
        Pay with cash upon delivery
      </span>

      <div className="flex flex-row justify-between">

      <button
      className="w-full px-5 py-2.5 tracking-wide text-white bg-black font-medium rounded-lg text-lg text-center m-3 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden"
    >
      <span className="z-10 relative">Confirm Order</span>
    </button>


    
      </div>
    </div>
  );
};

export default DeliveryDropDown;
