import React, { useState, useEffect } from "react";
const ViewOrderBasketFromAdmin = ({
  name,
  type,
  Qty,
  gasRateData,
  gasDeliveryRateData,
  index,
}) => {
  const [price, setPrice] = useState(0);
  const [deliveryRate, setDeliveryRate] = useState(0);

  const getGasRate = () => {
    if (type === "Refill") {
      setPrice(gasRateData["Refill_Rate"]);
    }

    if (type === "New") {
      setPrice(gasRateData["New_Cylinder_Rate"]);
    }
  };

  const getGasDeliveryRate = () => {
    if (type === "Refill") {
      setDeliveryRate(gasDeliveryRateData["Refill_Delivery_Rate"]);
    }

    if (type === "New") {
      setDeliveryRate(gasDeliveryRateData["New_Delivery_Rate"]);
    }
  };

  useEffect(() => {
    getGasRate();
  }, [gasRateData]);

  useEffect(() => {
    getGasDeliveryRate();
  }, [gasDeliveryRateData]);

  return (
    <>
      <tr>
        <td className="border px-4 py-2.5 font-bold">{index + 1}</td>
        <td className="border px-4 py-2.5 font-bold">{name}</td>
        <td className="border px-4 py-2.5 font-bold">{Qty}</td>
        <td className="border px-4 py-2.5 font-bold">{type}</td>
        <td className="border px-4 py-2 font-bold">
          Rs.
          {Qty === 0
            ? price
            : (price * Qty).toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
        </td>
      </tr>
      <tr>
        <td className="border px-4 py-2.5 font-bold">{"-"}</td>
        <td className="border px-4 py-2.5 font-bold">Delivery Charge</td>
        <td className="border px-4 py-2.5 font-bold">{Qty}</td>
        <td className="border px-4 py-2.5 font-bold">{"-"}</td>
        <td className="border px-4 py-2 font-bold">
          Rs.
          {Qty === 0
            ? deliveryRate
            : (deliveryRate * Qty).toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
        </td>
      </tr>
    </>
  );
};

export default ViewOrderBasketFromAdmin;
