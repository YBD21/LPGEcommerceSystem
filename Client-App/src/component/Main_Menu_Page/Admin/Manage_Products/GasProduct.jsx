import React, { useState, useEffect } from "react";

const GasProduct = ({ id, name, image }) => {
  return (
    <div className="flex max-lg:flex-col flex-row px-4 mx-4 mt-5 mb-10 place-items-center bg-[rgba(250,250,210,.2)] rounded-2xl max-lg:my-[10%]">
      {/* Product Name */}
      <div className="w-1/2 max-lg:w-full mb-5 mx-5 text-center">
        <p className="text-2xl font-bold mb-2.5"> Gas Name </p>
        <div
          className=" w-full px-5 py-3 text-white bg-black rounded-lg 
      text-lg font-semibold"
        >
          {name}
        </div>
      </div>

      <img
        className="w-20 m-6 max-lg:mt-7"
        src={image}
        alt={name}
        loading="eager"
      />

      {/* Show Per Stock */}
      <div className="w-1/2 max-lg:w-full mb-5 mx-5 text-center">
        <p className="text-2xl font-bold mb-2.5"> In Stock</p>
        <div
          className="px-5 py-3  text-white bg-black 
        rounded-lg text-lg font-semibold"
        >
          {/* {stock} */}
          15
        </div>
      </div>

      {/*  Action  */}
      <div className="w-1/2 max-lg:w-full mb-5 mx-5 text-center">
        <p className="text-2xl font-bold mb-2.5">Action</p>
        <div
          className="px-5 py-3  text-white bg-black 
        rounded-lg text-lg font-semibold"
        >
          Edit
        </div>
        <div
          className="px-5 py-3  text-white bg-black 
        rounded-lg text-lg font-semibold"
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default GasProduct;
