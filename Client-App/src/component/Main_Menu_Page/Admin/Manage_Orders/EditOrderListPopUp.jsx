import React, { useState, useEffect } from "react";
import instance from "../../../../instance";
import CancelIcon from "@mui/icons-material/Cancel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ErrorMessageEditOrder from "./ErrorMessageEditOrder";

const EditOrderListPopUp = ({
  onChild,
  currentData,
  orderList,
  isChange,
  prevIsChange,
}) => {
  // console.log(currentData);
  // console.log(orderList);
  const [deliveryStatus, setDeliveryStatus] = useState(
    currentData.deliveryStatus
  );
  const [deliveryBy, setDeliveryBy] = useState(currentData.deliveredBy);
  const [isDisable, setIsDisable] = useState(true);

  const [errorInputField, setErrorInputField] = useState({});

  const deliveryStatusOption = ["Not Delivered", "Delivered", "Cancel"];

  const countryCode = currentData.countryCode;
  const phoneNumber = currentData.phoneNumber;
  const orderId = currentData.orderId;
  const userName = orderList[countryCode][phoneNumber]["FullName"];
  const paymentType =
    orderList[countryCode][phoneNumber][orderId]["PaymentType"];

  const totalAmount = orderList[countryCode][phoneNumber][orderId]["amount"];

  const selectLogDeliveryStatus = (e) => {
    setDeliveryStatus(e.target.value);
  };

  const close = () => {
    onChild(false);
  };

  const isSaveChanges = () => {
    // Do not save :
    // if Delivery Status === prev_deliveryStatus
    if (deliveryStatus === currentData.deliveryStatus) {
      return false;
    }
    return true;
  };

  const saveChanges = () => {
    setErrorInputField({});
    const status = isSaveChanges();
    // console.log(status);
    const inputFieldStatus = checkInputField();
    // console.log(inputFieldStatus);

    if (status === true && inputFieldStatus === false) {
      // console.log("Backend Is Called Upon !");
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;
      // console.log(fullPhoneNumber);
      instance
        .patch(
          "/order-management/edit-order",
          {
            orderId: orderId,
            deliveryStatus: deliveryStatus,
            deliveredBy: deliveryBy,
            id: fullPhoneNumber,
          },
          { withCredentials: true }
        )
        .then((respond) => {
          isChange(!prevIsChange);
          close();
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    // Delivered By cannot be empty > 0
  };

  const checkInputField = () => {
    let isError = false;

    if (
      deliveryBy.length <= 2 &&
      deliveryBy.length !== 0 &&
      isDisable === false
    ) {
      setErrorInputField({
        status: true,
        Message: "Name Should Be More Than 2 Character Long !",
      });
      isError = true;
    }

    // "/^[a-zA-Z]+$/" regular expression. This regular expression will match any string that contains only letters from the alphabet, without any other characters or whitespace.

    if (
      !/^[a-zA-Z]+$/.test(deliveryBy) &&
      deliveryBy !== 0 &&
      isDisable !== true
    ) {
      setErrorInputField({
        status: true,
        Message: "Please Enter Valid Name !",
      });
      isError = true;
    }

    // console.log(/^[a-zA-Z]+$/.test(deliveryBy));
    return isError;
  };

  useEffect(() => {
    if (
      deliveryStatus !== currentData.deliveryStatus &&
      deliveryStatus === "Delivered"
    ) {
      setDeliveryBy("");
      setIsDisable(false);
    } else if (
      deliveryStatus === "Not Delivered" ||
      deliveryStatus === "Cancel"
    ) {
      setDeliveryBy("-");
      setIsDisable(true);
    } else {
      setDeliveryBy(currentData.deliveredBy);
      setIsDisable(true);
    }
  }, [deliveryStatus]);

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
            Name : {userName}
          </p>

          <p className="text-lg font-bold mb-4 text-justify text-black tracking-wider">
            PhoneNumber : +{countryCode}-{phoneNumber}
          </p>

          <p className="text-lg font-bold mb-4 text-justify text-black tracking-wider">
            Order Id : {orderId}
          </p>
          <p className="text-lg font-bold mb-4 text-justify text-black tracking-wider">
            Payment Type : {paymentType}
          </p>
          <p className="text-lg font-bold mb-4 text-justify text-black tracking-wider">
            Total Amount : Rs.
            {totalAmount.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
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
            <div className="flex-grow flex flex-row ml-2">
              <input
                type="text"
                value={deliveryBy}
                onChange={(e) => setDeliveryBy(e.target.value)}
                className={`block w-full px-4 py-2 mt-2 text-center font-bold text-black-700 border-2 border-black bg-white rounded-md focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40 ${
                  isDisable ? "cursor-not-allowed" : "cursor-auto"
                }`}
                disabled={isDisable}
              />
            </div>
          </div>

          {/* Error Message */}
          <div className="flex justify-center mt-2">
            {errorInputField.status && (
              <ErrorMessageEditOrder message={errorInputField.Message} />
            )}
          </div>

          <div className="w-full flex flex-col mt-2 justify-center text-center">
            <div className="w-full flex justify-between pt-8">
              <button
                className="w-1/2 px-5 py-2.5 tracking-wide
         bg-black  rounded-lg text-center mr-2 mb-2
   focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 overflow-hidden"
                onClick={saveChanges}
              >
                <span className="text-white font-semibold text-lg ">
                  Save Changes
                </span>
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
          
          <button className="absolute top-0 right-0 m-5" onClick={close}>
            <CancelIcon className="svg-icons text-neutral-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOrderListPopUp;
