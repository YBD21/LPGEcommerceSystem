import React, { useState, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CancelOrderPopUp from "./CancelOrderPopUp";
import PopupPortal from "../PopUp/PopupPortal";
import ShowItemsFromOrderBasket from "./ShowItemsFromOrderBasket";
const OrderBasket = ({ items, id }) => {
  const [isCancel, setIsCancel] = useState(false);
  const [disableCancel, setDisableCancel] = useState(false);

  const handleChildCancelOrderPopup = (data) => {
    setIsCancel(data);
  };

  const handelDisableCancel = (DeliveryType) => {
    if (DeliveryType !== "Not Delivered") {
      setDisableCancel(true);
    }
  };

  const cancel = () => {
    setIsCancel(true);
  };

  const showStatus = (OrderState) => {
    switch (OrderState) {
      case "Delivered":
        textColor = "text-green-500";
        return "Delivered";

      case "Cancel":
        textColor = "text-red-700";
        return "Cancel";

      default:
        return "Processing";
    }
  };

  const convertUnixTimeStamp = (timestamp) => {
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    const date = new Date(timestamp);
    const dateString = date.toLocaleDateString("en-US", options); // format date and time
    return dateString;
  };

  let totalprice = items?.amount;
  let OrderId = id;
  let DataAndTime = convertUnixTimeStamp(items?.created);
  let textColor = "text-orange-600";
  let status = showStatus(items?.status);
  let paymentMethod = items?.PaymentType;
  let deliveryInfo = items?.deliveryInfo;
  let cityName = deliveryInfo?.City;
  let addressName = deliveryInfo?.Address;

  useEffect(() => {
    handelDisableCancel(items?.status);
  }, []);

  // console.log(items);
  return (
    <div className="flex flex-col justify-between px-8 py-10 my-5 bg-[whitesmoke] rounded-2xl shadow shadow-gray-500 border-2 border-gray-300 relative">
      {/* Order Summary */}
      <div className="flex justify-between">
        <strong className="text-2xl font-semibold px-4"> Order</strong>

        <p className="text-lg font-semibold px-4">{OrderId}</p>
      </div>
      {/* Order Date */}
      <div className="flex justify-between">
        <p className="text-lg font-medium px-4">{DataAndTime}</p>
        <p className={`text-3xl font-semibold px-5 ${textColor}`}>{status}</p>
      </div>
      {/* Delivery Info */}
      <div className="flex flex-col justify-between">
        <p className="text-lg font-medium px-4">City : {cityName}</p>
        <p className="text-lg font-medium px-4">Address : {addressName}</p>
      </div>
      {/* Show Items From OrderBasket */}
      {items?.basket
        ?.sort((a, b) => (a.itemId > b.itemId ? 1 : -1))
        .map((item) => (
          <ShowItemsFromOrderBasket
            key={item.itemId}
            name={item.ProductName}
            image={item.Image}
            type={item.ProductType}
            Qty={item.Qty}
            gasRateData={items?.gasRate}
          />
        ))}

      <div className="flex justify-between">
        {/* Payment Type */}
        <p className="w-full text-2xl font-medium my-2 px-4">{paymentMethod}</p>
        {/* Total Amount */}
        <div className="w-full flex flex-row justify-end my-2">
          <p className="text-3xl font-bold mx-4">Total :</p>
          <p className="text-3xl font-bold px-8">
            Rs.
            {totalprice.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
      {/* Cancel Order */}
      {!disableCancel ? (
        <button className="absolute top-2 right-3" onClick={cancel}>
          <CancelIcon className="svg-icons text-red-800" />
        </button>
      ) : (
        false
      )}
      {/* Delete Account Popup*/}
      {isCancel ? (
        <PopupPortal>
          <CancelOrderPopUp
            onChild={handleChildCancelOrderPopup}
            id={OrderId}
          />
        </PopupPortal>
      ) : (
        false
      )}
    </div>
  );
};

export default OrderBasket;
