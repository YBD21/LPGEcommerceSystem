import React from "react";


const ViewSingleOrder = () => {
  let Name = "Santosh Deuja";

  let OrderId = "20230407T0558159810054950bjs1w9";

  let DataAndTime = new Date().toString();

  let textColor = "text-red-700";

  let status = "Not Delivered";

  let stateName = "Bagmati";

  let districtName = "Kathmandu";

  let cityName = districtName;

  let addressName = districtName;

  let paymentMethod = "Cash On Delivery";

  let totalprice = 18_00;

  return (
    <div className="flex flex-col justify-between px-8 py-8 my-5 bg-[whitesmoke] rounded-2xl shadow shadow-gray-500 border-2 border-gray-300">
      {/* Order Summary */}
      <div className="flex justify-between mb-2">
        <strong className="text-2xl font-semibold px-4">{Name}</strong>

        <p className="text-lg font-semibold px-4">{OrderId}</p>
      </div>
      {/* Order Date */}
      <div className="flex justify-between">
        <p className="text-lg font-medium px-4">{DataAndTime}</p>
        <p className={`text-3xl font-semibold px-5 ${textColor}`}>{status}</p>
      </div>

      <div className="flex justify-between my-2">
        <strong className="text-xl font-semibold px-4">Delivery Address</strong>
      </div>

      {/* Delivery Info */}
      <div className="flex justify-start py-0.5">
        <span className="flex text-lg font-semibold px-4">
          {" "}
          Province <p className="text-lg font-medium px-1"> : {stateName}</p>
        </span>
        <span className="flex text-lg font-semibold px-4">
          {" "}
          District <p className="text-lg font-medium px-1"> : {districtName}</p>
        </span>
      </div>
      <div className="flex flex-col justify-between py-0.5">
        <span className="flex text-lg font-semibold px-4 py-1">
          {" "}
          City <p className="text-lg font-medium px-1"> : {cityName}</p>
        </span>
        <span className="flex text-lg font-semibold px-4 py-1">
          {" "}
          Address <p className="text-lg font-medium px-1"> : {addressName}</p>
        </span>
      </div>

      {/* Show Items From OrderBasket */}

      <div className="flex justify-between">
        {/* Payment Type */}
        <p className="w-full text-2xl font-medium my-2 px-4">{paymentMethod}</p>
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

export default ViewSingleOrder;
