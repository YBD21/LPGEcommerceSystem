import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ConfettiAnimation from "./ConfettiAnimation";
const ThankYouPage = ({ status, message }) => {
  //  need to pass deliveryAmount , estimated Time , OrderId
  // console.log(status);
  // console.log(message);
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-20">
        <ConfettiAnimation />
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
        <div className="relative z-10 inline-block w-full p-6 mx-auto mt-10 bg-white rounded-lg transform sm:max-w-md sm:p-8 ">
          <div className="flex flex-col p-12 rounded-lg text-center items-center">
            <h3 className="text-2xl font-bold mb-4">
              Thank you for your purchase!
            </h3>

            <div className="w-full flex justify-center items-center">
              <AccessTimeIcon className="transform scale-150 mr-5" />
              <p className="text-lg  my-2">
                Estimated Time :{" "}
                <span className="font-bold"> 1 hrs ~ 4hrs </span>
              </p>
            </div>
            {/* if delivery is clicked display text below */}
            {status && (
              <div className="w-full flex flex-col justify-center">
                <p className="text-lg mt-2 mb-4">
                  Please have Amount shown below ready when the item is
                  delivered.
                </p>
                <h2 className="text-3xl font-bold">Rs. 8,000</h2>
              </div>
            )}

            <div className="flex w-full justify-center items-center p-3 m-5 max-h-12">
              <p className="text-green-600 text-lg font-semibold">
                Order confirmation : #{message.orderId}
              </p>
            </div>
            <div className="w-full flex flex-col lg:flex-row justify-between">
              <button className="flex items-center justify-center w-full lg:w-1/2 px-5 py-2.5 text-white bg-black font-medium rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 mt-5 lg:mt-0 lg:mr-5">
                <AssignmentIcon className="svg-icons mr-5" />
                <span>View Order</span>
              </button>
              <button className="flex items-center justify-center w-full lg:w-1/2 px-5 py-2.5 text-white bg-black font-medium rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 mt-5 lg:mt-0 lg:ml-5">
                <ShoppingCartIcon className=" svg-icons mr-5" />
                <span>Shop More</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankYouPage;
