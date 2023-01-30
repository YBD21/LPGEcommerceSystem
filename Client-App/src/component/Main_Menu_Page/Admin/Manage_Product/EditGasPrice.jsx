import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import openSocket from "socket.io-client";
import SuccessMessageAdmin from "../Success_Message/SuccessMessageBox";
import ErrorTextMessageAdmin from "../Error_Handeling_Message/ErrorTextMessageAdmin";
import ErrorMessageBoxAdmin from "../Error_Handeling_Message/ErrorMessageBoxAdmin";

const EditGasPrice = () => {
  const socketRef = useRef(null);
  const [newGasRate, setNewGasRate] = useState(0);
  const [refillGasRate, setRefillGasRate] = useState(0);
  const [gasRateData, setGasRateData] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(null);

  const [errorOnRefill, setErrorOnRefill] = useState({});
  const [errorOnNewRate, setErrorOnNewRate] = useState({});
   const [errorMessageBox, setErrorMessageBox] = useState(null);

  const handleConnect = () => {
    socketRef.current = openSocket("http://localhost:5000");

    //  socketRef.current.on('connect', () => {
    //   console.log('Connected to socket.io server');
    // });

    // socketRef.current.on('disconnect', () => {
    //   console.log('Disconnected from socket.io server');
    // });

    socketRef.current.on("gasRate", (data) => {
      setGasRateData(data);
    });

    socketRef.current.emit("getGasRate");
  };

  const handleDisconnect = () => {
    socketRef.current.disconnect();
  };

  useEffect(() => {
    //call to backend for connection
    handleConnect();
    return () => {
      handleDisconnect();
    };
  }, []);
  
  // handel error here for refill and new
  const checkRates = () => {
    let count = 0;
    if (newGasRate < 0) {
      setErrorOnNewRate({
        status: true,
        Message: "Please enter a valid Rate, it should be greater than zero.",
      });
      count++;
    }

    if (refillGasRate < 0) {
      setErrorOnRefill({
        status: true,
        Message: "Please enter a valid Rate, it should be greater than zero.",
      });
      count++;
    }
    return count;
  };

  const updateGasRate = () => {
    axios
      .post("http://localhost:5000/updateGasRate", {
        RefillRate: refillGasRate,
        NewGasRate: newGasRate,
      })
      .then((respond) => {
        if (respond.data.Message === true) {
          // send a success message
          setUpdateStatus("getGasRate");
        }
      })
      .catch((error) => {
        // console.log(error.message);
         setErrorMessageBox(error.message);
      });
  };

  const sendUpdateGasRate = () => {
    setUpdateStatus(null);
    setErrorMessageBox(null); // reset box
    let status = checkRates();
    if (status === 0) {
      updateGasRate();
    }
  };

  useEffect(() => {
    // erase error message at the begining
    setErrorOnRefill({});
    setErrorOnNewRate({});

  }, [newGasRate,refillGasRate]);

  return (
    <div className="flex flex-col mx-2 overflow-hidden">
      <strong className="w-full text-center text-2xl p-3">
        Update Gas Rate
      </strong>
      {/* Display Old Rate Here */}
      <table className="w-3/4 max-lg:w-full text-left table-collapse border-2 border-black mx-auto">
        <thead>
          <tr className="">
            <th className="px-4 py-2 text-lg text-center text-gray-800 bg-gray-300">
              Gas Prices
            </th>
            <th className="px-4 py-2 border-2 border-black text-center text-gray-800 bg-orange-300">
              Old Rate
            </th>
            <th className="px-4 py-2 border-2 border-black text-center text-gray-800 bg-green-300">
              Current Rate
            </th>
            <th className="px-4 py-2 border-2 border-black text-center text-gray-800 bg-yellow-200">
              Purposed Rate
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="px-4 py-2 border-2 border-black text-center text-gray-800 bg-gray-100">
              Refill
            </th>
            <td className="px-4 py-2 border-2 border-black text-center bg-orange-100">
              Rs. {gasRateData?.oldData.Refill_Rate}
            </td>
            <td className="px-4 py-2 border-2 border-black text-center bg-green-200">
              Rs. {gasRateData?.currentData.Refill_Rate}
            </td>
            <td className="px-4 py-2 border-2 border-black text-center bg-yellow-100">
              Rs.{refillGasRate === null ? 0 : refillGasRate}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 border-2 border-black text-center text-gray-800 bg-gray-200">
              New
            </th>
            <td className="px-4 py-2 border-2 border-black text-center bg-orange-200">
              Rs. {gasRateData?.oldData.New_Cylinder_Rate}
            </td>
            <td className="px-4 py-2 border-2 border-black text-center bg-green-100">
              Rs. {gasRateData?.currentData.New_Cylinder_Rate}
            </td>
            <td className="px-4 py-2 border-2 border-black text-center bg-yellow-200">
              Rs.{newGasRate === null ? 0 : newGasRate}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-10">
        {/* Success Message */}
        {updateStatus && (
          <SuccessMessageAdmin props={updateStatus} status={true} />
        )}
      </div>

      {/* New Refill Rate Here */}
      <div className="flex flex-col my-5">
        <strong className="w-full text-center text-lg p-3">Refill Gas</strong>
        <label className="block text-sm font-semibold text-gray-800">
          Set New Refill Rate
        </label>
        <div className="relative flex flex-row cursor-pointer">
          <input
            type="number"
            placeholder="Enter Refill Rate"
            className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md 
            focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 text-center"
            value={refillGasRate}
            onChange={(e) => setRefillGasRate(e.target.value)}
          />
        </div>
             {/* Error Message For New Refill Rate */}
            {errorOnRefill.status && (
          <ErrorTextMessageAdmin props={errorOnRefill.Message} />
        )}
      </div>

      {/* New Rate  */}
      <div className="flex flex-col my-5">
        <strong className="w-full text-center text-lg p-3">New Gas</strong>
        <label className="block text-sm font-semibold text-gray-800">
          Set New Rate
        </label>
        <div className="relative flex flex-row cursor-pointer">
          <input
            type="number"
            placeholder="Enter New Gas Rate"
            className="block w-full px-4 py-2 mt-2 text-black-700 border-2 border-black bg-white rounded-md 
            focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 text-center"
            value={newGasRate}
            onChange={(e) => setNewGasRate(e.target.value)}
          />
        </div>
                  {/* Error Message For New Refill Rate */}
            {errorOnNewRate.status && (
          <ErrorTextMessageAdmin props={errorOnNewRate.Message} />
        )}
      </div>
         {errorMessageBox && (
        <ErrorMessageBoxAdmin Error_message={errorMessageBox} status={true} />
      )}
      {/* Update Button */}
      <div className="my-5">
        <button
          className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg text-s 
            text-center mr-3"
          onClick={sendUpdateGasRate}
        >
          Update Rate
        </button>
      </div>
    </div>
  );
};

export default EditGasPrice;
