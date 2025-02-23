import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useStateValue } from "../../../ContextAPI/StateProvider";
import instance from "../../../instance";

const CancelOrderPopUp = ({ onChild, id }) => {
  const [{ isCancelOrder }, dispatch] = useStateValue();

  const close = () => {
    onChild(false);
  };

  const refetchOrder = () => {
    // this will change useEffect on ViewOrder Page
    //  SET_CANCEL_ORDER
    dispatch({
      type: "SET_CANCEL_ORDER",
      isCancelOrder: !isCancelOrder,
    });
  };

  const cancelOrder = (orderID) => {
    instance
      .patch(
        "/order-management/cancel-order",
        { id: orderID },
        { withCredentials: true }
      )
      .then((response) => {
        refetchOrder();
        close();
      })
      .catch((error) => console.log(error.message));
  };

  const cancelButton = () => {
    // call backend here to modify data then call refetchOrder
    cancelOrder(id);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
      <div
        className="relative z-10 inline-block w-full p-6 mx-auto 
      bg-white rounded-lg sm:max-w-lg sm:p-5"
      >
        {/* Start Delete Account */}
        <div className="w-full flex flex-col px-12 py-3 rounded-lg items-center">
          <h3 className="text-2xl font-bold mb-4 text-center text-black">
            Cancel Order
          </h3>
          <p className="text-lg font-bold mb-4 text-center text-black">{id}</p>
          <div className="w-full flex flex-col mt-2 justify-center text-center">
            <div className="pt-6 pb-10">
              <DeleteForeverIcon className="scale-[3] text-red-800" />
            </div>
            <span className="text-black font-semibold text-lg">
              Are you sure you want to cancel order ?
            </span>

            <div className="w-full flex justify-between pt-8">
              <button
                className="w-1/2 px-5 py-2.5 tracking-wide
             bg-red-800  rounded-lg text-center mr-2 mb-2
       focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-opacity-50 active:ring-4 active:ring-red-800 active:ring-opacity-50 overflow-hidden"
                onClick={cancelButton}
              >
                <span className="text-white font-semibold text-lg ">Yes</span>
              </button>
              <button
                className="w-1/2 px-5 py-2.5 tracking-wide
         text-white bg-neutral-700 font-medium rounded-lg text-center mr-2 mb-2
         focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 overflow-hidden"
                onClick={close}
              >
                <span className="text-white font-semibold text-lg">No</span>
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

export default CancelOrderPopUp;
