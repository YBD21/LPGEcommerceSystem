import React, { useState } from "react";

const ViewOrders = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 15;

  const handleClick = (event) => {
    setPage(Number(event.target.id));
  };

  const tableRows = [];

  for (let i = (page - 1) * itemsPerPage; i < page * itemsPerPage; i++) {
    tableRows.push(
      <tr key={i}>
        <td className="border px-4 py-2.5 font-bold">{i + 1}</td>
        <td className="border px-4 py-2">Santosh Deuja</td>
        <td className="border px-4 py-2 text-green-500 font-bold">Shipped</td>
        <td className="border px-4 py-2 font-bold">$100.00</td>
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
    <div className="flex-1 p-6 bg-white">
      <h2 className="text-3xl font-bold mt-4 ml-2 mb-8">Orders</h2>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-3 text-gray-800">Order ID</th>
            <th className="px-4 py-3 text-gray-800">Customer Name</th>
            <th className="px-4 py-3 text-gray-800">Status</th>
            <th className="px-4 py-3 text-gray-800">Total</th>
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
