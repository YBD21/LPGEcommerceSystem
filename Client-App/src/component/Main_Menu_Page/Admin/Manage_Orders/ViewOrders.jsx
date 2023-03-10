import React from "react";

const ViewOrders = () => {
  return (
    <div className="flex-1 p-6 bg-white">
      <h2 className="text-3xl font-bold mt-4 ml-2 mb-8">Orders</h2>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-gray-800">Order ID</th>
            <th className="px-4 py-2 text-gray-800">Customer Name</th>
            <th className="px-4 py-2 text-gray-800">Status</th>
            <th className="px-4 py-2 text-gray-800">Total</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr>
            <td className="border px-4 py-2 font-bold">1</td>
            <td className="border px-4 py-2">Santosh Deuja</td>
            <td className="border px-4 py-2 text-green-500 font-bold">
              Shipped
            </td>
            <td className="border px-4 py-2 font-bold">$100.00</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-bold">2</td>
            <td className="border px-4 py-2">Santosh Deuja </td>
            <td className="border px-4 py-2 text-yellow-500 font-bold">
              Pending
            </td>
            <td className="border px-4 py-2 font-bold">$50.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ViewOrders;
