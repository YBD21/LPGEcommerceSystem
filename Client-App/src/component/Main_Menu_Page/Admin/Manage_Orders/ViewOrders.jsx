import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import { url } from "../../../../instance";
import ViewSingleOrder from "./ViewSingleOrder";
import { useStateValue } from "../../../../ContextAPI/StateProvider";
import Loading from "../../../Loading";
import PopupPortal from "../../PopUp/PopupPortal";
import EditOrderListPopUp from "./EditOrderListPopUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ViewOrders = () => {
  const [{ userData }] = useStateValue();
  const [page, setPage] = useState(1);
  const [orderList, setOrderList] = useState({});
  const [orderCount, setOrderCount] = useState(1);
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(true); // to testing set false
  const [renderOnce, setRenderOnce] = useState(false);
  const [sortBy, setSortBy] = useState("Latest Date");
  const [filterBy, setFilterBy] = useState("None");
  const [currentEditData, setCurrentEditData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isSaveChanges, setIsSaveChanges] = useState(false);

  const sortByOptions = ["Latest Date", "Oldest Date"];
  const filterByOptions = ["None", "Not Delivered", "Delivered", "Cancel"];
  const itemsPerPage = 5;

  const handelViewIconClick = (countryCode, phoneNumber, orderId) => {
    setCountryCode(countryCode);
    setphoneNumber(phoneNumber);
    setOrderId(orderId);
  };

  const handelPageNumberClick = (event) => {
    setPage(Number(event.target.id));
  };

  const selectLogFilterBy = (e) => {
    setFilterBy(e.target.value);
    setRenderOnce(false);
  };

  const selectLogSortBy = (e) => {
    setSortBy(e.target.value);
    setRenderOnce(false);
  };

  const handelEdit = (orderData) => {
    setIsEdit(true);
    setCurrentEditData(orderData);
  };

  const handleChildEditOrderPopup = (data) => {
    setIsEdit(data);
  };

  const handleChildSaveChanges = (data) => {
    setIsSaveChanges(data);
  };

  useEffect(() => {
    //call to backend for connection
    const socket = openSocket(url, {
      query: {
        userId: userData?.id,
        userRole: userData?.role,
      },
    });

    socket.on("updateViewOrderListAdmin", (data) => {
      // console.log("activated");
      setOrderList(data);
      setIsLoading(false); // set loading to false when data is fetched
    });

    // emit the event to listen for updates
    socket.emit("ViewOrderListAdmin");

    return () => {
      socket.disconnect();
    };
  }, [isSaveChanges]);

  // count total number orders

  const getTotalOrderCount = () => {
    let totalOrderCount = 0;
    Object.keys(orderList).forEach((countryCode) => {
      Object.keys(orderList[countryCode]).forEach((phoneNumber) => {
        Object.keys(orderList[countryCode][phoneNumber]).forEach((orderId) => {
          if (orderId !== "FullName") {
            let deliveryStatus =
              orderList[countryCode][phoneNumber][orderId]["status"];

            (filterBy === "None" || deliveryStatus === filterBy) &&
              totalOrderCount++;
          }
        });
      });
    });
    return totalOrderCount;
  };

  const showStatusTextColor = (OrderState) => {
    switch (OrderState) {
      case "Delivered":
        return "text-green-500";

      case "Cancel":
        return "text-red-800";

      default:
        return "text-orange-600";
    }
  };

  const sortByDate = (a, b) => {
    // Latest Date
    // from latest to earliest
    let result = b.date - a.date;

    if (sortBy === sortByOptions[1]) {
      // Oldest Date
      // from earliest to latest
      result = a.date - b.date;
    }

    return result;
  };

  useEffect(() => {
    const totalCount = getTotalOrderCount();
    setOrderCount(totalCount);
    if (!isSaveChanges) {
      setPage(1);
    }
  }, [orderList, filterBy, sortBy, isSaveChanges]);

  const convertOrderIdToUnixTimeStamp = (OrderId) => {
    const filterDate = OrderId.substring(0, 15); // takes first 15 char

    const year = filterDate.substr(0, 4);
    const month = filterDate.substr(4, 2) - 1; // month is zero-based in Date object
    const day = filterDate.substr(6, 2);
    const hour = filterDate.substr(9, 2);
    const minute = filterDate.substr(11, 2);
    const second = filterDate.substr(13, 2);

    const dateObj = new Date(year, month, day, hour, minute, second);
    const unixTimestamp = dateObj.getTime();

    return unixTimestamp;
  };

  // Get all orders as an array
  const orders = Object.keys(orderList)
    .flatMap((countryCode) =>
      Object.keys(orderList[countryCode]).flatMap((phoneNumber) =>
        Object.keys(orderList[countryCode][phoneNumber])
          .filter((orderId) => orderId !== "FullName")
          .map((orderId) => {
            const order = orderList[countryCode][phoneNumber][orderId];
            return {
              countryCode,
              phoneNumber,
              orderId,
              date: convertOrderIdToUnixTimeStamp(orderId),
              deliveryStatus: order.status,
              totalAmount: order.amount,
              deliveredBy: order.delivered_By || "-",
              textColor: showStatusTextColor(order.status),
            };
          })
      )
    )
    // Sort orders by date
    .sort(sortByDate);

  // Render orders as table rows
  // console.log(orders);
  const tableRows = orders
    .filter((order) => filterBy === "None" || order.deliveryStatus === filterBy)
    .map((order, index) => {
      if (index === 0 && renderOnce === false) {
        setCountryCode(order.countryCode);
        setphoneNumber(order.phoneNumber);
        setOrderId(order.orderId);
        setRenderOnce(true);
      }
      const userName =
        orderList[order.countryCode][order.phoneNumber]["FullName"];
      return (
        <tr key={index}>
          <td className="border px-4 py-2.5 font-bold">{index + 1}</td>
          <td className="border px-4 py-2.5 font-bold">{order.orderId}</td>
          <td className="border px-4 py-2.5 font-bold">{userName}</td>
          <td className="border px-4 py-2.5 font-bold">{order.phoneNumber}</td>
          <td className={`border px-4 py-2 font-bold ${order.textColor}`}>
            {order.deliveryStatus}
          </td>
          <td className="border px-4 py-2 font-bold">
            Rs.{" "}
            {order.totalAmount.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </td>
          <td className="border px-4 py-2 font-bold">{order.deliveredBy}</td>
          <td className="flex justify-between border px-8 py-4 font-bold">
            <button
              className="py-2 px-3.5 bg-black mr-3 rounded-lg group relative"
              onClick={() => handelEdit(order)}
            >
              {/* Edit */}
              <EditIcon className="scale-125 text-white pointer-events-none" />
              <div className="absolute bottom-5 right-8 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 max-sm:group-hover:opacity-0 transition-opacity duration-300 bg-black py-1 px-2 rounded-md">
                <span className="text-white font-semibold"> Edit </span>
              </div>
            </button>

            <button
              className="py-2 px-3.5 bg-black ml-3 rounded-lg group relative"
              onClick={() =>
                handelViewIconClick(
                  order.countryCode,
                  order.phoneNumber,
                  order.orderId
                )
              }
            >
              {/* View More */}
              <VisibilityIcon className="scale-125 text-white" />
              <div className="absolute bottom-10 left-16 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 max-sm:group-hover:opacity-0 transition-opacity duration-300 bg-black py-1 px-2 rounded-md">
                <span className="text-white font-semibold">View</span>
              </div>
            </button>
          </td>
        </tr>
      );
    });

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTableRows = tableRows.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(orderCount / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li key={number}>
        <button
          id={number}
          onClick={handelPageNumberClick}
          className={`${
            number === page ? "bg-gray-400 text-white" : "bg-white text-black"
          } hover:bg-gray-500 hover:text-white py-2 px-4 border-2
             border-black rounded ml-2`}
        >
          {number}
        </button>
      </li>
    );
  });

  if (isLoading) {
    return <Loading />; // render loading component when isLoading is true
  }

  return (
    <div className="flex-1 bg-white p-2">
      <h2 className="text-3xl font-bold mt-4 ml-2 mb-8">Orders</h2>
      {/* View OrderItems */}
      {Object.keys(orderList).length > 0 ? (
        <ViewSingleOrder
          countryCode={countryCode}
          phoneNumber={phoneNumber}
          orderId={orderId}
          orderList={orderList}
        />
      ) : (
        false
      )}
      {/* Sorting Operation */}
      <div className="w-full flex justify-start py-3">
        {/* Sort By */}
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

        {/* Filter By */}
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

      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-3 text-gray-800 border-2 border-gray-200">
              S.N
            </th>
            <th className="px-4 py-3 text-gray-800 border-2 border-gray-200">
              Order ID
            </th>
            <th className="px-4 py-3 text-gray-800 border-2 border-gray-200">
              Customer Name
            </th>
            <th className="px-4 py-3 text-gray-800 border-2 border-gray-200">
              PhoneNumber
            </th>
            <th className="px-4 py-3 text-gray-800 border-2 border-gray-200">
              Status
            </th>
            <th className="px-4 py-3 text-gray-800 border-2 border-gray-200">
              Total Amount
            </th>
            <th className="px-4 py-3 text-gray-800 border-2 border-gray-200">
              Delivered By
            </th>
            <th className="px-4 py-3 text-gray-800 border-2 border-gray-200">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="text-center">{currentTableRows}</tbody>
      </table>

      <ul className="flex pl-1 list-none my-5">{renderPageNumbers}</ul>

      {isEdit ? (
        <PopupPortal>
          <EditOrderListPopUp
            onChild={handleChildEditOrderPopup}
            isChange={handleChildSaveChanges}
            currentData={currentEditData}
            orderList={orderList}
            prevIsChange={isSaveChanges}
          />
        </PopupPortal>
      ) : (
        false
      )}
    </div>
  );
};

export default ViewOrders;
