import React from "react";
import Gas from "../../../dist/image/Lpg.png";
const OrderBasket = () => {
  const image = Gas;
  const name = "Baba Gas";
  const Qty = 5;
  const type = "Refill";
  const price = 1800;
  const totalprice = Qty * price;
  return (
    <div className="flex flex-col justify-between px-4 py-4 bg-[whitesmoke] rounded-2xl shadow shadow-gray-300">
      {/* Order Summary */}
      <div className="flex justify-between">
        <strong className="text-2xl font-semibold px-4"> Order</strong>

        <p className="text-lg font-semibold px-4">
          20230408T0540119860694050et7dl8
        </p>
      </div>
      {/* Order Date */}
      <div className="flex justify-between">
        <p className="text-lg font-medium px-4">
          Sat, Apr 8, 2023, 11:25:11 AM
        </p>
        <p className="text-3xl font-semibold text-orange-600 px-5">
          Processing
        </p>
      </div>

      {/* Basket Details */}
      <div
        className="flex flex-row px-4 mt-5 mb-10 place-items-center bg-gray-200 rounded-2xl shadow shadow-gray-300 
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
      <div className="flex justify-between">
        {/* Payment Type */}
        <p className="w-full text-2xl font-medium my-2"> Cash On Delivery</p>
        {/* Total Amount */}
        <div className="w-full flex flex-row justify-end my-2">
          <p className="text-3xl font-bold mx-4">Total :</p>
          <p className="text-3xl font-bold px-8">
            Rs.
            {totalprice.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderBasket;
