import React from "react";

const ItemAddedPopOver = ({ show }) => {
  return (
    <div
      className={`${show ? "block" : "hidden"} absolute 
      top-[105%] right-5
        transition-opacity duration-500 ease-in-out bg-green-100  rounded-lg border-2 border-green-200`}
    >
      <div className="w-full flex flex-row items-center justify-evenly px-3 py-2.5">
        <svg
          className="h-10 w-20 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>

        <p className="w-3/4 text-black font-semibold text-lg">Item added</p>
      </div>
    </div>
  );
};

export default ItemAddedPopOver;
