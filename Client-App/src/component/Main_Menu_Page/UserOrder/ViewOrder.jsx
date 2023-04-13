import React, { useState, useEffect } from "react";
import OrderBasket from "./OrderBasket";
import instance from "../../../instance";

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await instance.get("/order-management/order-data", {
        withCredentials: true,
      });
      const data = await response.data.OrderData;

      setOrders(data);
      // console.log(response.data.OrderData);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="flex-1 p-6 bg-white overflow-scroll">
      <h2 className="text-3xl font-bold mt-4 ml-2 mb-8 text-center">
        {" "}
        Your Orders
      </h2>
      {/* Order Basket */}
      {Object.entries(orders).map(([key, data]) => (
        <OrderBasket key={key} id={key} items={data} />
      ))}
    </div>
  );
};

export default ViewOrder;
