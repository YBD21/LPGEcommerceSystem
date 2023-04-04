import React from "react";
import instance from "../../../instance";
import { useStateValue } from "../../../ContextAPI/StateProvider";

const DeliveryDropDown = ({ isOpen, onData }) => {
  const [
    { userData, basket, gasRateData, gasDeliveryRateData, totalCharge },
    dispatch,
  ] = useStateValue();

  const processing = () => {
    onData(true);
  };

  const onConfirmOrder = (respondData) => {
    // close Payment Option
    dispatch({
      type: "SET_SHOW_POPUP",
      showPopup: false,
    });

    dispatch({
      type: "SET_PAY_STATUS",
      payStatus: false,
    });

    // show Thankyou Page
    displayThankYouPage(true, respondData);
  };

  const displayThankYouPage = (status, respondData) => {
    dispatch({
      type: "SET_SHOW_POPUP",
      showPopup: {
        show: "ThankYouPage",
        isCashOnDelivery: status,
        respondData: respondData,
      },
    });
  };
  // on Confirm Order send data to backend
  const confirmOrder = async () => {
    processing();
    await sendOrderToBackend();
  };

  const sendOrderToBackend = async () => {
    const orderData = {
      phoneNumber: userData?.id,
      items: basket,
      gasRate: gasRateData,
      deliveryRate: gasDeliveryRateData,
      totalAmount: totalCharge,
      deliveryInfo: userData?.DeliveryInfo,
    };
    try {
      const response = await instance.post(
        "/payment-system/delivery-order",
        orderData
      );
      // closePaymentOption();
      onConfirmOrder(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="relative inline-block text-left z-20">
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute w-96 top-16 right-0 bg-white border-2 border-black rounded-lg `}
      >
        {/* peak of triangle */}
        <div className="absolute top-[-14%] right-[45%] w-12 h-12 bg-white transform rotate-45 border-t-2 border-l-2 border-black " />

        <div className="flex flex-col">
          <span className="text-lg font-semibold text-black text-center m-8 z-10">
            Pay with cash upon delivery.
          </span>

          <div className="flex flex-row justify-between">
            <button
              className="w-full px-5 py-2.5 tracking-wide text-white bg-black font-medium rounded-lg text-lg text-center my-5 mx-8 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50"
              onClick={confirmOrder}
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDropDown;
