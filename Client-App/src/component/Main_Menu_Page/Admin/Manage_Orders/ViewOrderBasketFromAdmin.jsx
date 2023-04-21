import React, { useState, useEffect } from "react";
const ViewOrderBasketFromAdmin = ({ name, type, Qty, gasRateData, index }) => {
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
  );
};

export default ViewOrderBasketFromAdmin;
