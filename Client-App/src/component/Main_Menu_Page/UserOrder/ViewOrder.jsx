import React from "react";
import OrderBasket from "./OrderBasket";
const ViewOrder = () => {
  return (
    <div className="flex-1 p-6 bg-white overflow-scroll">
      <h2 className="text-3xl font-bold mt-4 ml-2 mb-8 text-center">
        {" "}
        Your Orders
      </h2>
      {/* Order Basket */}
      <OrderBasket />
    </div>
  );
};

export default ViewOrder;
