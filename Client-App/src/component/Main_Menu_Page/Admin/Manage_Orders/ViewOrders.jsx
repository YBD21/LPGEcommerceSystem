import React, { useState } from "react";
import instance from "../../../../instance";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import ViewSingleOrder from "./ViewSingleOrder";

const ViewOrders = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const handleClick = (event) => {
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
        console.log(respond);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const tableRows = [];

  for (let i = (page - 1) * itemsPerPage; i < page * itemsPerPage; i++) {
    tableRows.push(
      <tr key={i}>
        <td className="border px-4 py-2.5 font-bold">{i + 1}</td>
        <td className="border px-4 py-2.5 font-bold">
          20230407T0558159810054950bjs1w9
        </td>
        <td className="border px-4 py-2">Santosh Deuja</td>
        <td className="border px-4 py-2">9860694050</td>
        <td className="border px-4 py-2 text-red-700 font-bold">
          Not Delivered
        </td>
        <td className="border px-4 py-2 font-bold">Rs. {1800}</td>
        <td className="flex justify-between border px-8 py-2 font-bold">
          {/* Edit */}
          <EditIcon className="scale-125" />
          {/* View More */}
          <VisibilityIcon className="scale-125" />
        </td>
      </tr>
    );
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(45 / itemsPerPage); i++) {
    pageNumbers.push(
      <li key={i}>
        <button
          id={i}
          onClick={handleClick}
          className={`${
            i === page ? "bg-gray-400 text-white" : "bg-white text-black"
          } hover:bg-gray-500 hover:text-white py-2 px-4 border-2
           border-black rounded ml-2`}
        >
          {i}
        </button>
      </li>
    );
  }

  return (
    <div className="flex-1 bg-white p-2">
      <h2 className="text-3xl font-bold mt-4 ml-2 mb-8">Orders</h2>
      {/* View OrderItems */}
      <ViewSingleOrder />
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
              Action
            </th>
          </tr>
        </thead>

        <tbody className="text-center"> {tableRows}</tbody>
      </table>

      <ul className="flex pl-1 list-none my-5">
        {pageNumbers.map((number) => (
          <>{number}</>
        ))}
      </ul>
    </div>
  );
};

export default ViewOrders;
