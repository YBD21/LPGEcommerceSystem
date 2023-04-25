import React from "react";

const ErrorMessageEditOrder = ({ message }) => {
  return (
    <div className="flex flex-row my-1 ml-2 border-red-900 rounded justify-start text-center">
      <span className="text-red-600 text-l">
        {message}
        {/* {console.log(message)} */}
      </span>
    </div>
  );
};

export default ErrorMessageEditOrder;
