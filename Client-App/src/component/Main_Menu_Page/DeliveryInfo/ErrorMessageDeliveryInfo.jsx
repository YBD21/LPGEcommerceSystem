import React from "react";

const ErrorMessageDeliveryInfo = ({ message }) => {
  console.log(message);
  return (
    <div className="flex flex-row my-1 ml-2 border-red-900 rounded justify-start text-center">
      <span className="text-red-600 text-l">{message}</span>
    </div>
  );
};

export default ErrorMessageDeliveryInfo;
