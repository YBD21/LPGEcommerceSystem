import React from "react";

const ErrorMessageDeliveryInfo = ({ message }) => {
  // console.log(message);
  return (
    <div className="flex flex-row my-1 ml-2">
      <span className="text-red-600 text-md">{message}</span>
    </div>
  );
};

export default ErrorMessageDeliveryInfo;
