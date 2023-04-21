import React, { useState, useEffect } from "react";
import instance from "../../../../instance";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import ViewSingleOrder from "./ViewSingleOrder";

const ViewOrders = () => {
  const [page, setPage] = useState(1);
  const [orderList, setOrderList] = useState({});
  const [orderCount, setOrderCount] = useState(1);
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [orderId, setOrderId] = useState("");
  const [fullName, setFullName] = useState("");
  const [renderOnce, setRenderOnce] = useState(false);

  const itemsPerPage = 5;

  const handelViewIconClick = (countryCode, phoneNumber, orderId, userName) => {
    setCountryCode(countryCode);
    setphoneNumber(phoneNumber);
    setOrderId(orderId);
    setFullName(userName);
  };

  const handelPageNumberClick = (event) => {
    setPage(Number(event.target.id));
  };

  const getData = () => {
    // call axios here
    //path : order-management/get-all-order
    instance
      .get("order-management/get-all-order", {
        withCredentials: true, // enable sending and receiving cookies
      })
      .then((respond) => {
        setOrderList(respond.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // count total number orders
  const getTotalOrderCount = () => {
    let totalOrderCount = 0;
    Object.keys(orderList).forEach((countryCode) => {
      Object.keys(orderList[countryCode]).forEach((phoneNumber) => {
        Object.keys(orderList[countryCode][phoneNumber]).forEach((orderId) => {
          if (orderId !== "FullName") {
            totalOrderCount++;
          }
        });
      });
    });
    return totalOrderCount;
  };

  const showStatus = (OrderState) => {
    switch (OrderState) {
      case "Delivered":
        textColor = "text-green-500";
        return "Delivered";

      case "Cancel":
        textColor = "text-red-800";
        return "Cancel";

      default:
        textColor = "text-orange-600";
        return "Not Delivered";
    }
  };

  useEffect(() => {
    const totalCount = getTotalOrderCount();
    setOrderCount(totalCount);
  }, [orderList]);

  const tableRows = [];
  let index = 0;
  let textColor = "text-orange-600";
  let userName = "";
  let deliveryStatus = "";
  let deliveredBy = "";
  let totalAmount = 0;

  Object.keys(orderList).forEach((countryCode) => {
    Object.keys(orderList[countryCode]).forEach((phoneNumber) => {
      Object.keys(orderList[countryCode][phoneNumber]).forEach((orderId) => {
        if (orderId !== "FullName") {
          userName = orderList[countryCode][phoneNumber]["FullName"];
          deliveryStatus = showStatus(
            orderList[countryCode][phoneNumber][orderId]["status"]
          );
          totalAmount = orderList[countryCode][phoneNumber][orderId]["amount"];
          deliveredBy =
            orderList[countryCode][phoneNumber][orderId]["deliveredBy"] || "-";
          // if index = 0 and once if not render = false
          if (index === 0 && renderOnce === false) {
            setCountryCode(countryCode);
            setphoneNumber(phoneNumber);
            setOrderId(orderId);
            setFullName(userName);
            setRenderOnce(true);
          }

          tableRows.push(
            <tr key={index}>
              <td className="border px-4 py-2.5 font-bold">{index + 1}</td>
              <td className="border px-4 py-2.5 font-bold">{orderId}</td>
              <td className="border px-4 py-2.5 font-bold">{userName}</td>
              <td className="border px-4 py-2.5 font-bold">{phoneNumber}</td>
              <td className={`border px-4 py-2 font-bold ${textColor}`}>
                {deliveryStatus}
              </td>
              <td className="border px-4 py-2 font-bold">
                Rs.{" "}
                {totalAmount.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className="border px-4 py-2 font-bold">{deliveredBy}</td>
              <td className="flex justify-between border px-8 py-4 font-bold">
                <button className="py-2 px-3.5 bg-black mr-3 rounded-lg group relative">
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
                      countryCode,
                      phoneNumber,
                      orderId,
                      userName
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
          index++; // increase by 1
        }
      });
    });
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

  return (
    <div className="flex-1 bg-white p-2">
      <h2 className="text-3xl font-bold mt-4 ml-2 mb-8">Orders</h2>
      {/* View OrderItems */}
      {Object.keys(orderList).length > 0 ? (
        <ViewSingleOrder
          countryCode={countryCode}
          phoneNumber={phoneNumber}
          orderId={orderId}
          fullName={fullName}
          orderList={orderList}
        />
      ) : (
        false
      )}
      <button
        className="px-5 py-2.5 bg-gray-200 rounded-2xl m-2"
        onClick={getData}
      >
        get data{" "}
      </button>
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
    </div>
  );
};

export default ViewOrders;
