import React, { useState, useEffect } from "react";
import OrderBasket from "./OrderBasket";
import openSocket from "socket.io-client";
import { url } from "../../../instance";
import { useStateValue } from "../../../ContextAPI/StateProvider";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const ViewOrder = () => {
  const [{ userData }] = useStateValue();

  const [orders, setOrders] = useState({});
  const [showTopBtn, setShowTopBtn] = useState(false);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    //call to backend for connection
    const socket = openSocket(url, {
      query: {
        userId: userData?.id,
      },
    });

    socket.on("updateViewOrder", (data) => {
      // console.log(data);
      // console.log(typeof data);
      setOrders(data);
    });

    // emit the event to listen for updates
    socket.emit("updateViewOrderdata");

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  return (
    <div className="flex-1 p-6 bg-white overflow-scroll relative">
      <h2 className="text-3xl font-bold mt-4 ml-2 mb-8 text-center">
        {" "}
        Your Orders
      </h2>
      {/* Order Basket */}
      {Object.entries(orders).map(([key, data]) => (
        <OrderBasket key={key} id={key} items={data} />
      ))}

      {showTopBtn && (
        <button
          className="absolute bottom-2 right-1 z-20 py-2.5 px-2.5 bg-gray-400 shadow shadow-gray-700 rounded-full"
          onClick={goToTop}
        >
          <ArrowUpwardIcon className=" scale-150" />
        </button>
      )}
    </div>
  );
};

export default ViewOrder;
