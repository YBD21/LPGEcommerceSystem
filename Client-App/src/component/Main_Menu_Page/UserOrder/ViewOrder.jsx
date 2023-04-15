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
  const [filterBy, setFilterBy] = useState("All");
  const [dateTime, setDateTime] = useState(0);
  const [nextClickCount, setNextClickCount] = useState(-1);
  const [hideNextButton, setHideNextButton] = useState(false);
  const [comparisonOperator, setComparisonOperators] = useState("<");

  const sortByOptions = ["Latest Date", "Oldest Date"];

  const filterByOptions = ["All", "Processing", "Delivered", "Cancel"];

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const selectLogSortBy = (e) => {
    setSortBy(e.target.value);
    setNextClickCount(-1); // dont not popup prev btn
    setDateTime(0);
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

      case "All":
        return "All";

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
        operator: comparisonOperator,
      },
    });

    socket.on("updateViewOrder", (data) => {
      // console.log("activated");

      // Check if the data received is null or empty
      if (!data || Object.keys(data).length === 0) {
        // console.log("Data is empty");
        setHideNextButton(true); // hide nextbutton
        return;
      }
      setComparisonOperators("<");
      setNextClickCount(nextClickCount + 1); // increase count by 1
      setHideNextButton(false); // do not hide nextbutton
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
    // If `filterBy` is "All", all orders are returned.
    // Otherwise, only the orders with a status that matches `filterBy` are returned.
    const status = showStatus(filterBy);
    return status === "All"
      ? Object.values(orders).map((data, index) => ({
          key: Object.keys(orders)[index],
          data,
        })) // Show all orders
      : Object.entries(orders)
          .filter(([key, order]) => order.status === status)
          .map(([key, data]) => ({ key, data }));
  };

  const getlastItemDate = () => {
    const keys = Object.keys(orders);
    // console.log(keys.length);
    const lastKey = keys[keys.length - 1];
    const lastDateTime = orders[lastKey].created;
    setDateTime(lastDateTime);
    // console.log(lastDateTime);
  };

  const getfirstItemDate = () => {
    const keys = Object.keys(orders);
    const lastKey = keys[0];
    const lastDateTime = orders[lastKey].created;
    setDateTime(lastDateTime);
    // console.log(lastDateTime);
  };

  const next = () => {
    setComparisonOperators("<");
    // set lastdate of the list
    getlastItemDate();
  };

  const prev = () => {
    setComparisonOperators(">");
    // set firstdate of the list
    getfirstItemDate();

    setNextClickCount(nextClickCount - 2);
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
        <div className="flex w-1/5 mx-5 justify-between">
          {nextClickCount > 0 ? (
            <button
              className=" px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg  text-center mr-2 mb-2
            focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden"
              onClick={prev}
            >
              Prev
            </button>
          ) : (
            false
          )}
          {!hideNextButton ? (
            <button
              className="px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg  text-center mr-2 mb-2
            focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden"
              onClick={next}
            >
              Next
            </button>
          ) : (
            false
          )}
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
