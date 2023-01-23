import React, { useState } from 'react';

const EditGasPrice = () => {
  const [prices, setPrices] = useState({ current: 4600, old: 4000, refillCurrent: 1800, refillOld: 1600 });
  return (
    <div className="flex flex-col mx-2 overflow-hidden">
      <strong className="w-full text-center text-2xl p-3">
        Update Gas Price
      </strong>
      {/* Display Old Price Here */}
      <table className="w-3/4 max-lg:w-full text-left table-collapse border-2 border-black mx-auto">
        <thead>
          <tr className=''>
            <th className="px-4 py-2 text-lg font-medium text-center text-gray-800 bg-gray-300">Gas Prices</th>
            <th className="px-4 py-2 border-2 border-black text-center text-gray-800 bg-orange-300">Old Price</th>
            <th className="px-4 py-2 border-2 border-black text-center text-gray-800 bg-green-300">Current Price</th>
            <th className="px-4 py-2 border-2 border-black text-center text-gray-800 bg-yellow-200">Purposed Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="px-4 py-2 border-2 border-black text-center text-gray-800 bg-gray-100">Refill</th>
            <td className="px-4 py-2 border-2 border-black text-center bg-orange-100">Rs. {prices.refillOld}</td>
            <td className="px-4 py-2 border-2 border-black text-center bg-green-200">Rs. {prices.refillCurrent}</td>
            <td className="px-4 py-2 border-2 border-black text-center bg-yellow-100">Rs.1900</td>
          </tr>
          <tr>
            <th className="px-4 py-2 border-2 border-black text-center text-gray-800 bg-gray-200">New</th>
            <td className="px-4 py-2 border-2 border-black text-center bg-orange-200">Rs. {prices.old}</td>
            <td className="px-4 py-2 border-2 border-black text-center bg-green-100">Rs. {prices.current}</td>
            <td className="px-4 py-2 border-2 border-black text-center bg-yellow-200">Rs.5000</td>
          </tr>
        
        </tbody>
      </table>
    
      {/* New Refill Price Here */}
      <div className="flex flex-col my-5">
        <strong className="w-full text-center text-lg p-3">
          Refill Gas
        </strong>
        <label className="block text-sm font-semibold text-gray-800">
          Refill Price
        </label>
        <div className="relative flex flex-row cursor-pointer">
          <input
            type="number"
            placeholder="Enter Refill Price"
            className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md 
            focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 text-center"
          />
        </div>
      </div>

      {/* New Price  */}
      <div className="flex flex-col my-5">
        <strong className="w-full text-center text-lg p-3">
          New Gas
        </strong>
        <label className="block text-sm font-semibold text-gray-800">
          New Price
        </label>
        <div className="relative flex flex-row cursor-pointer">
          <input
            type="number"
            placeholder="Enter Refill Price"
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
          Update Price
        </button>
      </div>
    </div>
  );
};

export default EditGasPrice;
