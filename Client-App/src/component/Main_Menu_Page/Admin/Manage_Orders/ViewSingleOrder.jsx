import React, { useState, useEffect } from "react";
import ViewOrderBasketFromAdmin from "./ViewOrderBasketFromAdmin";

const ViewSingleOrder = ({
  countryCode,
  phoneNumber,
  orderId,
  fullName,
  orderList,
}) => {
  const [basketFromOrderList, setBasketFromOrderList] = useState([]);

  useEffect(() => {
    setBasketFromOrderList(
      orderList[countryCode][phoneNumber][orderId]["basket"]
    );
  }, []);

  const showStatus = (OrderState) => {
    switch (OrderState) {
      case "Delivered":
        textColor = "text-green-500";
        return "Delivered";

      case "Cancel":
        textColor = "text-red-800";
        return "Cancel";

      default:
        textColor = "text-orange-600";
        return "Not Delivered";
    }
  };

  let DataAndTime = new Date().toString();

  let textColor = "text-red-700";

  let status = showStatus(
    orderList[countryCode][phoneNumber][orderId]["status"]
  );

  let stateName =
    orderList[countryCode][phoneNumber][orderId]["deliveryInfo"]["State"];

  let districtName =
    orderList[countryCode][phoneNumber][orderId]["deliveryInfo"]["District"];

  let cityName =
    orderList[countryCode][phoneNumber][orderId]["deliveryInfo"]["City"];

  let addressName =
    orderList[countryCode][phoneNumber][orderId]["deliveryInfo"]["Address"];

  let paymentMethod =
    orderList[countryCode][phoneNumber][orderId]["PaymentType"];

  let totalprice = orderList[countryCode][phoneNumber][orderId]["amount"];

  return (
    <div className="flex flex-col justify-between px-8 py-8 my-5 bg-white rounded-2xl shadow shadow-gray-500 border-2 border-gray-300">
      {/* Order Summary */}
      <div className="flex justify-between mb-2">
        <strong className="text-2xl font-semibold px-4">{fullName}</strong>

        <p className="text-lg font-semibold px-4">{orderId}</p>
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
      <div className="flex justify-start py-0.5">
        <strong className="text-lg font-semibold px-4">Contact Number :</strong>

        <p className="text-lg font-medium px-1">{phoneNumber}</p>
      </div>

      {/* Show Items From OrderBasket */}
      <div className="border border-gray-300 my-5">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-gray-800 border-2 border-gray-200">
                S.N
              </th>
              <th className="px-4 py-3 text-gray-800 border-2 border-gray-200">
                Gas Name
              </th>
              <th className="px-4 py-3 text-gray-800 border-2 border-gray-200">
                Qty
              </th>
              <th className="px-4 py-3 text-gray-800 border-2 border-gray-200">
                Type
              </th>
              <th className="px-4 py-3 text-gray-800 border-2 border-gray-200">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {basketFromOrderList
              .sort((a, b) => (a.itemId > b.itemId ? 1 : -1))
              .map((item, index) => (
                <ViewOrderBasketFromAdmin
                  key={item.itemId}
                  name={item.ProductName}
                  type={item.ProductType}
                  Qty={item.Qty}
                  gasRateData={
                    orderList[countryCode][phoneNumber][orderId]["gasRate"]
                  }
                  index={index}
                />
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between">
        {/* Payment Type */}
        <p className="w-full text-2xl font-semibold my-2 px-4">
          {paymentMethod}
        </p>
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
