import React, { useState, useEffect } from "react";
const ShowItemsFromOrderBasket = ({ name, image, type, Qty, gasRateData }) => {
  const [price, setPrice] = useState(0);

  const getGasRate = () => {
    if (type === "Refill") {
      setPrice(gasRateData["Refill_Rate"]);
    }

    if (type === "New") {
      setPrice(gasRateData["New_Cylinder_Rate"]);
    }
  };

  useEffect(() => {
    getGasRate();
  }, [gasRateData]);

  return (
    <div
      className="flex flex-row px-4 mt-5 mb-10 place-items-center bg-gray-200 rounded-2xl shadow-md shadow-gray-400 border-2 border-gray-300
  max-sm:flex-col max-sm:w-1/2 max-sm:my-[10%] max-sm:mx-auto"
    >
      <div className="flex flex-col w-1/2 max-lg:w-full mb-5 mx-5 items-center">
        <img
          className="w-1/4 m-6 max-lg:mt-7 max-lg:w-1/2"
          src={image}
          alt={name}
          loading="eager"
        />

        <p className="text-2xl font-bold mb-2.5">{name}</p>
      </div>
      {/* Show Qty */}
      <div className="w-1/2 max-lg:w-full mb-5 mx-5 text-center">
        <p className="text-2xl font-bold mb-2.5"> Qty </p>
        <div
          className=" w-1/2 px-5 py-3 text-white bg-black 
      rounded-lg text-lg font-semibold mx-auto"
        >
          {Qty}
        </div>
      </div>

      {/* Show Type */}
      <div className="w-1/2 max-lg:w-full mb-5 mx-5 text-center">
        <p className="text-2xl font-bold mb-2.5"> Type </p>
        <div
          className=" w-1/2 px-5 py-3 text-white bg-black 
      rounded-lg text-lg font-semibold mx-auto"
        >
          {type}
        </div>
      </div>

      {/* Show Per Price */}
      <div className="w-1/2 mb-5 mx-5 text-center">
        <p className="text-2xl font-bold mb-2.5">Price</p>
        <div
          className="w-1/2 max-lg:w-full px-5 py-3 text-white bg-black 
      rounded-lg text-lg font-semibold mx-auto"
        >
          Rs.
          {Qty === 0
            ? price
            : (price * Qty).toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
        </div>
      </div>
    </div>
  );
};

export default ShowItemsFromOrderBasket;
