import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const EditOrderListPopUp = ({ onChild, currentData, orderList }) => {
  // console.log(currentData);
  // console.log(orderList);
  const [deliveryStatus, setDeliveryStatus] = useState(
    currentData.deliveryStatus
  );
  const [deliveryBy, setDeliveryBy] = useState(currentData.deliveredBy);

  const deliveryStatusOption = ["Not Delivered", "Delivered", "Cancel"];

  const countryCode = currentData.countryCode;
  const phoneNumber = currentData.phoneNumber;
  const orderId = currentData.orderId;
  const userName = orderList[countryCode][phoneNumber]["FullName"];

  const selectLogDeliveryStatus = (e) => {
    setDeliveryStatus(e.target.value);
  };

  const close = () => {
    onChild(false);
  };

  const save = () => {
    // if Delivery Status === prev_deliveryStatus
    // if Delivered By === prev_Delivered By
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
      <div
        className="relative z-10 inline-block w-full p-6 mx-auto 
  bg-white rounded-lg sm:max-w-2xl sm:p-5"
      >
        {/* Start Delete Account */}
        <div className="w-full flex flex-col px-8 py-3 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-center text-black">
            Edit Order
          </h3>

          <p className="text-lg font-bold mb-4 text-justify text-black tracking-wider">
            {/* {currentData.orderId} */}
            Name : {userName}
          </p>

          <p className="text-lg font-bold mb-4 text-justify text-black tracking-wider">
            {/* {currentData.orderId} */}
            PhoneNumber : +{countryCode}-{phoneNumber}
          </p>

          <p className="text-lg font-bold mb-4 text-justify text-black tracking-wider">
            {/* {currentData.orderId} */}
            Order Id : {orderId}
          </p>
          <div className="w-full flex flex-start">
            <p className="text-lg font-bold my-auto text-center text-black tracking-wider pr-2">
              {/* dropdown for Not Delivered Part with color change : text-orange-700 */}
              Delivery Status :
            </p>
            {/* Select Dropdown Filter By */}
            <div className="relative flex-grow ml-2">
              <select
                className={`w-full px-5 py-1.5 text-black bg-white rounded-lg text-lg font-semibold text-center appearance-none cursor-pointer border-2 
        focus:outline-none focus:ring focus:ring-opacity-40 border-black focus:border-black focus:ring-black
      `}
                onChange={selectLogDeliveryStatus}
                value={deliveryStatus}
              >
                {deliveryStatusOption.map((element, index) => {
                  return (
                    <option key={index} value={element}>
                      {element}
                    </option>
                  );
                })}
              </select>
              <ExpandMoreIcon
                className={`absolute top-2.5 right-3.5 svg-icons
        cursor-pointer pointer-events-none text-black
      `}
              />
            </div>
          </div>
          <div className="w-full flex flex-start mt-3">
            <p className="text-lg font-bold my-auto text-start text-black tracking-wider pr-8">
              {/* Input field here */}
              Delivered By :
            </p>
            <div className="flex-grow flex flex-row cursor-pointer ml-2">
              <input
                type="text"
                value={deliveryBy}
                onChange={(e) => setDeliveryBy(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-center font-bold text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 "
              />
            </div>
          </div>

          <div className="w-full flex flex-col mt-2 justify-center text-center">
            <div className="w-full flex justify-between pt-8">
              <button
                className="w-1/2 px-5 py-2.5 tracking-wide
         bg-black  rounded-lg text-center mr-2 mb-2
   focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 overflow-hidden"
              >
                <span className="text-white font-semibold text-lg ">Save</span>
              </button>
              <button
                className="w-1/2 px-5 py-2.5 tracking-wide
     text-white bg-neutral-700 font-medium rounded-lg text-center mr-2 mb-2
     focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 overflow-hidden"
                onClick={close}
              >
                <span className="text-white font-semibold text-lg">Cancel</span>
              </button>
            </div>
          </div>

          {/*End Delete Account */}
          <button className="absolute top-0 right-0 m-5" onClick={close}>
            <CancelIcon className="svg-icons text-neutral-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOrderListPopUp;
