import React, { useState, useEffect } from "react";
import OrderBasket from "./OrderBasket";
import openSocket from "socket.io-client";
import { url } from "../../../instance";
import { useStateValue } from "../../../ContextAPI/StateProvider";
import Loading from "../../Loading";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ViewOrder = () => {
  const [{ userData }] = useStateValue();

  const [orders, setOrders] = useState({});
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // to testing set false
  const [sortBy, setSortBy] = useState("Latest Date");
  const [filterBy, setFilterBy] = useState("None");
  const [dateTime, setDateTime] = useState(0);

  const sortByOptions = ["Latest Date", "Oldest Date"];

  const filterByOptions = ["None", "Processing", "Delivered", "Cancel"];

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const selectLogSortBy = (e) => {
    setSortBy(e.target.value);
  };

  const selectLogFilterBy = (e) => {
    setFilterBy(e.target.value);
  };

  const showStatus = (OrderState) => {
    switch (OrderState) {
      case "Delivered":
        return "Delivered";

      case "Cancel":
        return "Cancel";

      case "None":
        return "None";

      default:
        return "Not Delivered";
    }
  };

  useEffect(() => {
    //call to backend for connection
    const socket = openSocket(url, {
      query: {
        userId: userData?.id,
        orderBy: sortBy,
        dateTime: +dateTime,
      },
    });

    socket.on("updateViewOrder", (data) => {
      console.log("activated");
      setOrders(data);
      setIsLoading(false); // set loading to false when data is fetched
    });

    // emit the event to listen for updates
    socket.emit("updateViewOrderdata");

    return () => {
      socket.disconnect();
    };
  }, [sortBy, dateTime]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const filteredOrders = (orders, filterBy) => {
    // If `filterBy` is "None", all orders are returned.
    // Otherwise, only the orders with a status that matches `filterBy` are returned.
    const status = showStatus(filterBy);
    return status === "None"
      ? Object.values(orders).map((data, index) => ({
          key: Object.keys(orders)[index],
          data,
        })) // Show all orders
      : Object.entries(orders)
          .filter(([key, order]) => order.status === status)
          .map(([key, data]) => ({ key, data }));
  };

  if (isLoading) {
    return <Loading />; // render loading component when isLoading is true
  }

  return (
    <div className="flex-1 p-6 bg-white overflow-scroll relative">
      {/* Title */}
      <div className="w-full text-center">
        <h2 className="text-3xl font-bold mt-4 mb-2 inline-block">
          Your Orders
        </h2>
      </div>
      {/* Sort Operation */}
      <div className="w-full flex justify-start">
        <span className="mx-3 my-auto text-lg font-semibold">Sort By : </span>
        {/* Select Dropdown Sort By */}
        <div className="relative w-1/4">
          <select
            className={`w-full px-5 py-1.5 text-black bg-white rounded-lg text-lg font-semibold text-center appearance-none cursor-pointer border-2 
              focus:outline-none focus:ring focus:ring-opacity-40 border-black focus:border-black focus:ring-black
              `}
            onChange={selectLogSortBy}
            value={sortBy}
          >
            {sortByOptions.map((element, index) => {
              return (
                <option key={index} value={element}>
                  {element}
                </option>
              );
            })}
          </select>
          <ExpandMoreIcon
            className={`absolute top-2.5 right-3.5 svg-icons
              cursor-pointer pointer-events-none text-black
            `}
          />
        </div>
        <span className="mx-3 my-auto text-lg font-semibold">Filter By : </span>
        {/* Select Dropdown Filter By */}
        <div className="relative w-1/4">
          <select
            className={`w-full px-5 py-1.5 text-black bg-white rounded-lg text-lg font-semibold text-center appearance-none cursor-pointer border-2 
              focus:outline-none focus:ring focus:ring-opacity-40 border-black focus:border-black focus:ring-black
              `}
            onChange={selectLogFilterBy}
            value={filterBy}
          >
            {filterByOptions.map((element, index) => {
              return (
                <option key={index} value={element}>
                  {element}
                </option>
              );
            })}
          </select>
          <ExpandMoreIcon
            className={`absolute top-2.5 right-3.5 svg-icons
              cursor-pointer pointer-events-none text-black
            `}
          />
        </div>
      </div>

      {/* Order Basket */}

      {filteredOrders(orders, filterBy).map(({ key, data }) => (
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
