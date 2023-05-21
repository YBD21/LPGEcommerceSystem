import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { useStateValue } from "../../../ContextAPI/StateProvider";

const ErrorPopup = () => {
  const [{ payStatus }, dispatch] = useStateValue();

  const close = async () => {
    dispatch({
      type: "SET_SHOW_POPUP",
      showPopup: false,
    });

    dispatch({
      type: "SET_PAY_STATUS",
      payStatus: false,
    });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-500 bg-opacity-75">
      <div className="inline-block w-full p-6 mx-auto mt-10 bg-white rounded-lg sm:max-w-2xl sm:p-8">
        <div className="flex flex-col p-3 rounded-lg text-center items-center">
          <h3 className="text-2xl font-bold my-4 text-red-700 flex items-center justify-center">
            Payment Request Failed
            <ErrorIcon className=" scale-125 ml-2" />
          </h3>
          <p className="text-lg text-gray-800">
            We apologize for the inconvenience, but the payment request cannot
            be processed at the moment. Please try again during our business
            hours, which are from 6 AM to 6 PM Nepal time.
          </p>

          <button
            className="flex items-center justify-center w-full lg:w-1/2 px-5 py-2.5 text-white bg-black font-medium rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 lg:mr-5 mt-6"
            onClick={close}
            aria-label="Close"
          >
            <span>Close</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopup;
