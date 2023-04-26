import React, { useState } from "react";
import instance from "../../../../instance";

const ViewUserList = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 15;

  const handleClick = (event) => {
    setPage(Number(event.target.id));
  };

  const getData = () => {
    instance
      .get("user-management/get-all-user", {
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
        <td className="border px-4 py-2">Santosh Deuja</td>
        <td className="border px-4 py-2">977-9860694050</td>
        <td className="border px-4 py-2 text-orange-700 font-bold">Admin</td>
        <td className="border px-4 py-2 font-bold">
          {"Mon Apr 17 2023 09:20:35 GMT+0545 (Nepal Time)"}
        </td>
        <td className="border px-4 py-2 font-bold">
          {"Tue Apr 25 2023 13:25:16 GMT+0545 (Nepal Time)"}
        </td>
        <td className="border px-4 py-2 font-bold">{"-"}</td>
        <td className="border px-4 py-2 font-bold">View More</td>
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
      <h2 className="text-3xl font-bold mt-4 ml-2 mb-8">User Listing</h2>
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
              Customer Name
            </th>
            <th className="px-4 py-3 text-gray-800 border-2 border-gray-200">
              PhoneNumber
            </th>
            <th className="px-4 py-3 text-gray-800 border-2 border-gray-200">
              Account Type
            </th>
            <th className="px-4 py-3 text-gray-800 border-2 border-gray-200">
              Created
            </th>
            <th className="px-4 py-3 text-gray-800 border-2 border-gray-200">
              Last Seen
            </th>
            <th className="px-4 py-3 text-gray-800 border-2 border-gray-200">
              Status
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

export default ViewUserList;
