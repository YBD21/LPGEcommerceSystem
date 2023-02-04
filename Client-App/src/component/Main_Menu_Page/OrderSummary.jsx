import React from "react";

const OrderSummary = () => {
  return (
    <div className="flex flex-col w-[40%] ml-16 max-lg:w-full">
      <div className=" border-4 border-black rounded-lg">
        <p className="w-full text-center font-semibold text-2xl">
          Order Summary
        </p>
        <hr className="border border-black" />
        <div className="w-full flex flex-row justify-between my-2">
          <p className="text-lg font-semibold ml-16">SubTotal (4 Items) :</p>
          <p className="text-lg font-semibold mr-16">Rs.7200</p>
        </div>
        <div className="w-full flex flex-row justify-between my-2">
          <p className="text-lg font-semibold ml-16">
            Delivery Charge (Rs.100 Per Items) :
          </p>
          <p className="text-lg font-semibold mr-16">Rs.400</p>
        </div>
        <hr className=" border border-black" />
        <div className="w-full flex flex-row justify-between my-2">
          <p className="text-lg font-semibold ml-16">Total :</p>
          <p className="text-lg font-semibold mr-16">Rs.7600</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
