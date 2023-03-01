import React from "react";

const ItemAddedPopOver = ({show}) => {

  return (
    <div
      className={`${
        show ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500 ease-in-out flex bg-green-100 justify-end items-center 
        px-5 py-2.5 rounded-lg mt-5 mr-10 border-2 border-green-200`}
    >
      <svg
        className="h-10 w-10 text-green-500"
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

      <span className="mr-5 text-black font-semibold text-lg">Item added </span>
    </div>
  );
};

export default ItemAddedPopOver;
