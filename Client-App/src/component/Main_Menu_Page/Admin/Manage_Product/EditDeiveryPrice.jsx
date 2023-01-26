import React, { useState } from "react";

const EditDeiveryPrice = () => {
  const [prices, setPrices] = useState({
    current: 0,
    old: 0,
    refillCurrent: 100,
    refillOld: 75,
  });
  return (
    <div className="flex flex-col mx-2 overflow-hidden">
      <strong className="w-full text-center text-2xl p-3">
        Update Delivery Charge
      </strong>
      {/* Display Old Charge Here */}
      <table className="w-3/4 max-lg:w-full text-left table-collapse mx-auto">
        <thead>
          <tr className="">
            <th
              className="px-4 py-2 border-2 border-black text-center text-gray-800 
          bg-gray-200"
            >
              Delivery Type
            </th>
            <th className="px-4 py-2 border-2 border-black text-center text-gray-800 bg-orange-300">
              Old Delivery Charge
            </th>
            <th className="px-4 py-2 border-2 border-black text-center text-gray-800 bg-green-300">
              Current Delivery Charge
            </th>
            <th className="px-4 py-2 border-2 border-black text-center text-gray-800 bg-yellow-200">
              Purposed Delivery Charge
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="px-4 py-2 border-2 border-black text-center text-gray-800 bg-gray-100">
              Refill
            </th>
            <td className="px-4 py-2 border-2 border-black text-center bg-orange-100">
              Rs. {prices.refillOld}
            </td>
            <td className="px-4 py-2 border-2 border-black text-center bg-green-200">
              Rs. {prices.refillCurrent}
            </td>
            <td className="px-4 py-2 border-2 border-black text-center bg-yellow-100">
              Rs.{150}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 border-2 border-black text-center text-gray-800 bg-gray-200">
              New
            </th>
            <td className="px-4 py-2 border-2 border-black text-center bg-orange-200">
              Rs. {prices.old}
            </td>
            <td className="px-4 py-2 border-2 border-black text-center bg-green-100">
              Rs. {prices.current}
            </td>
            <td className="px-4 py-2 border-2 border-black text-center bg-yellow-200">
              Rs.{0}
            </td>
          </tr>
        </tbody>
      </table>

      {/* New Refill Charge Here */}
      <div className="flex flex-col my-5">
        <strong className="w-full text-center text-lg p-3">
          For Refill Gas Delivery
        </strong>
        <div className="relative flex flex-row cursor-pointer">
          <input
            type="number"
            placeholder="Enter Charge"
            className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md 
            focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 text-center"
          />
        </div>
      </div>
      {/* Update Button */}
      <div className="my-5">
        <button
          className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg text-s 
            text-center mr-3"
        >
          Update Refill Charge
        </button>
      </div>
      {/* New Charge  */}
      <div className="flex flex-col my-5">
        <strong className="w-full text-center text-lg p-3">
          For New Gas Delivery
        </strong>
        <div className="relative flex flex-row cursor-pointer">
          <input
            type="number"
            placeholder="Enter Charge"
            className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md 
            focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 text-center"
          />
        </div>
      </div>

      {/* Update Button */}
      <div className="my-5">
        <button
          className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg text-s 
            text-center mr-3"
        >
          Update New Charge
        </button>
      </div>
    </div>
  );
};

export default EditDeiveryPrice;
