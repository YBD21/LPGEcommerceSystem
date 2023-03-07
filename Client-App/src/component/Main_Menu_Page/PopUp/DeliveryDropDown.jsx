import React from "react";

const DeliveryDropDown = ({ isOpen }) => {
  // on Confirm Order send data to backend
  return (
    <div className="relative inline-block text-left z-20">
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute w-96 top-16 right-0 bg-white border-2 border-black rounded-lg `}
      >
        {/* peak of triangle */}
        <div className="absolute top-[-14%] right-[45%] w-12 h-12 bg-white transform rotate-45 border-t-2 border-l-2 border-black " />

        <div className="flex flex-col">
          <span className="text-lg font-semibold text-black text-center m-8 z-10">
            Pay with cash upon delivery.
          </span>

          <div className="flex flex-row justify-between">
            <button className="w-full px-5 py-2.5 tracking-wide text-white bg-black font-medium rounded-lg text-lg text-center my-5 mx-8 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50">
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDropDown;
