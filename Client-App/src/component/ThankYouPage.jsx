import React from "react";
import CheckIcon from "@mui/icons-material/Check";

const ThankYouPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">
          Thank you for your purchase!
        </h1>
        <p className="text-lg mb-4">
          Your order has been confirmed and will be shipped to you soon.
        </p>
        <div className="flex justify-center">
          <CheckIcon fontSize="large" className="text-green-600 mr-2" />
          <p className="text-green-600 font-semibold">
            Order confirmation #12345
          </p>
        </div>
        <button
          className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg text-s text-center mr-2 mb-2
            focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
