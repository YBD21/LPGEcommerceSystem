import React from "react";
import DeliveryInfo from "./DeliveryInfo";
import OrderSummary from "./OrderSummary";

const Checkout = () => {
  return (
    <div className="w-full flex flex-row m-10 max-lg:flex-col max-lg:m-0">
      <DeliveryInfo />
      <OrderSummary status={false} />
    </div>
  );
};

export default Checkout;
