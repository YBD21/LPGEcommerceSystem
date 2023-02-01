import React, { useState , useEffect } from "react";
import axios from "axios";
import openSocket from "socket.io-client";
import ErrorTextMessageAdmin from "../Error_Handeling_Message/ErrorTextMessageAdmin";
import SuccessMessageAdmin from "../Success_Message/SuccessMessageBox";
import ErrorMessageBoxAdmin from "../Error_Handeling_Message/ErrorMessageBoxAdmin";


const EditDeiveryPrice = () => {
  const [refillRate,setRefillRate] = useState(0);
  const [newRate,setNewRate] = useState(0);
  const [updateStatus, setUpdateStatus] = useState(null);
  const [deliveryRateData,setDeliveryRateData] = useState(null);

  const [errorOnRefill, setErrorOnRefill] = useState({});
  const [errorOnNewRate, setErrorOnNewRate] = useState({});
  const [errorMessageBox, setErrorMessageBox] = useState(null);
  

  
     useEffect(() => {
    //call to backend for connection
    const socket = openSocket("http://localhost:5000");
     //  socket.on('connect', () => {
    //   console.log('Connected to socket.io server');
    // });

    // socket.on('disconnect', () => {
    //   console.log('Disconnected from socket.io server');
    // });
  
    socket.emit("getDeliveryRate");

    socket.on("deliveryRate", (data) => {
     setDeliveryRateData(data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  // handel error here for refill and new
  const checkRates = () => {
    let count = 0;
    if (newRate < 0) {
      setErrorOnNewRate({
        status: true,
        Message: "Please enter a valid Rate, it should be greater than zero.",
      });
      count++;
    }

    if (refillRate < 0) {
      setErrorOnRefill({
        status: true,
        Message: "Please enter a valid Rate, it should be greater than zero.",
      });
      count++;
    }
    return count;
  };
  
  const updateDeiveryRate = () => {
    axios
    .post("http://localhost:5000/updateDeiveryRate", {
      RefillRate: refillRate,
      NewGasRate: newRate,
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

  const sendUpdateDeiveryRate = () =>{
    setUpdateStatus(null);
    setErrorMessageBox(null); // reset box
    let status = checkRates();
    if (status === 0) {
      updateDeiveryRate();
    }
  };

  useEffect(() => {
    // erase error message at the begining
    setErrorOnRefill({});
    setErrorOnNewRate({});

  }, [newRate,refillRate]);

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
             Rs. {deliveryRateData?.oldData.Refill_Delivery_Rate}
            </td>
            <td className="px-4 py-2 border-2 border-black text-center bg-green-200">
               Rs. {deliveryRateData?.currentData.Refill_Delivery_Rate}
            </td>
            <td className="px-4 py-2 border-2 border-black text-center bg-yellow-100">
              Rs.{refillRate === null ? 0 : refillRate}
            </td>
          </tr>
          <tr>
            <th className="px-4 py-2 border-2 border-black text-center text-gray-800 bg-gray-200">
              New
            </th>
            <td className="px-4 py-2 border-2 border-black text-center bg-orange-200">
              Rs. {deliveryRateData?.oldData.New_Delivery_Rate}
            </td>
            <td className="px-4 py-2 border-2 border-black text-center bg-green-100">
               Rs. {deliveryRateData?.currentData.New_Delivery_Rate}
            </td>
            <td className="px-4 py-2 border-2 border-black text-center bg-yellow-200">
              Rs.{newRate === null ? 0 : newRate}
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
            value = {refillRate}
            onChange={(e) => setRefillRate(e.target.value)}
          />
        </div>
             {/* Error Message For New Refill Rate */}
            {errorOnRefill.status && (
          <ErrorTextMessageAdmin props={errorOnRefill.Message} />
        )}
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
            value = {newRate}
            onChange={(e) => setNewRate(e.target.value)}
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
            onClick={sendUpdateDeiveryRate}
        >
          Update Rates
        </button>
      </div>
    </div>
  );
};

export default EditDeiveryPrice;
