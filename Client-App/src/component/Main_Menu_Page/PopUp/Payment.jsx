import React from "react";
import { useStateValue } from "../../../ContextAPI/StateProvider";
import CancelIcon from "@mui/icons-material/Cancel";
const Payment = () => {
  const [{ basket, gasRateData, gasDeliveryRateData, payStatus }, dispatch] =
    useStateValue();

  const close = () => {
    dispatch({
      type: "SET_PAY_STATUS",
      payStatus: false,
    });
  };
  return (
    <div className="fixed inset-0 overflow-y-auto z-10">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        />
        <div className="inline-block w-full p-6 mx-auto mt-10 bg-white rounded-lg shadow-xl transform sm:max-w-md sm:w-full sm:p-8">
          <h2 className="text-xl font-bold mb-5">Hello World!
          </h2>
          
          <button className="absolute top-0 right-0 m-5" onClick={close}>
            <CancelIcon className="svg-icons text-red-800" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
