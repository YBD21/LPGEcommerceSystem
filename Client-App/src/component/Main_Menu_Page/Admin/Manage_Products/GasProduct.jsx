import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const GasProduct = ({ name, image, stock }) => {
  return (
    <div className="flex max-lg:flex-col flex-row px-4 mx-4 mb-5 place-items-center justify-between bg-[rgba(250,250,210,.2)] rounded-2xl max-lg:my-[10%]">
      {/* Product Name */}
      <div className="flex flex-col w-1/4 max-lg:w-full mb-5 mx-5 items-center">
        <img
          className="w-1/4 m-6 max-lg:mt-7"
          src={image}
          alt={name}
          loading="eager"
        />

        <p className="text-2xl font-bold mb-2.5">{name}</p>
      </div>
      {/* Show Per Stock */}
      <div className="w-1/4 max-lg:w-full mb-5 mx-5 text-center">
        <p className="text-2xl font-bold mb-2.5"> In Stock</p>
        <div
          className="px-5 py-3  text-black bg-gray-300 
        border-2 border-black rounded-lg text-lg font-semibold"
        >
          {stock}
        </div>
      </div>

      {/*  Action  */}
      <div className="w-1/4 max-lg:w-full mb-5 mx-5 text-center flex flex-col ">
        <strong className="text-2xl font-bold mb-2.5">Action</strong>
        <div className="w-full flex flex-row justify-between">
          <button
            className="ml-10 px-6 py-3  text-white bg-black 
        rounded-lg text-lg font-semibold"
          >
            <EditIcon className="svg-icons" />
          </button>

          <button
            className=" mr-10 px-6 py-3  text-white bg-red-900 
        rounded-lg text-lg font-semibold"
          >
            <DeleteIcon className="svg-icons" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GasProduct;
