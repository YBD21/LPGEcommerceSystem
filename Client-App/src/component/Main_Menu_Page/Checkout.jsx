import React from "react";
import DeliveryInfo from "./DeliveryInfo";
import OrderSummary from "./OrderSummary";

const Checkout = () => {
  return (
    <div className="w-full flex flex-row py-10 px-5 
     justify-around max-lg:flex-col max-lg:p-0">
      <DeliveryInfo />
      <OrderSummary status={false} />
    </div>
  );
};

export default Checkout;
