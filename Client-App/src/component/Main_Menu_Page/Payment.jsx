import React, { useState } from "react";
import axios from "axios";
import KhaltiCheckout from "khalti-checkout-web";
import { useStateValue } from "../../ContextAPI/StateProvider";
import khaltiIcon from "../../dist/image/Khalti.png";
import CancelIcon from "@mui/icons-material/Cancel";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DeliveryDropDown from "./PopUp/DeliveryDropDown";
const Payment = () => {
  const [
    { userData, basket, gasRateData, gasDeliveryRateData, totalCharge },
    dispatch,
  ] = useStateValue();

  const [status, setStatus] = useState(false);

  const close = () => {
    dispatch({
      type: "SET_SHOW_POPUP",
      showPopup: false,
    });

    dispatch({
      type: "SET_PAY_STATUS",
      payStatus: false,
    });
  };

  const displayThankYouPage = (status, respondData) => {
    dispatch({
      type: "SET_SHOW_POPUP",
      showPopup: {
        show: "ThankYouPage",
        isCashOnDelivery: status,
        respondData : respondData,
      },
    });
  };

  const onSucessfulKhaltiPayment = (respondData) => {
    // close Payment Option
    close();

    // show Thankyou Page
    displayThankYouPage(false, respondData);
  };

  const cashOnDelivery = () => {
    setStatus(!status);
  };

  const verifyTransaction = (token) => {
    let payloadData = {
      tokenId: token,
      phoneNumber: userData?.id,
      items: basket,
      gasRate: gasRateData,
      deliveryRate: gasDeliveryRateData,
      totalAmount: totalCharge,
    };
    axios
      .post("http://localhost:5000/payment-system/verify", payloadData, {
        withCredentials: true, // enable sending and receiving cookies
      })
      .then(function (respond) {
        // get order id from respond
        // close payment and show thankyou page
        onSucessfulKhaltiPayment(respond.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const config = {
    // replace this key with yours
    publicKey: "test_public_key_02b32d73fafb4e02a2efcb2a960c1fa9",
    productIdentity: basket[0]?.itemId.toString(),
    productName: basket[0]?.ProductName,
    productUrl: "http://localhost:3000/Checkout",
    eventHandler: {
      onSuccess(payload) {
        // hit merchant api for initiating verfication
        console.log(payload);
        // call backend to verify the payload
        verifyTransaction(payload?.token);
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };
  // change 200 into totalcharge -- for real payment
  const payment = () => {
    let checkout = new KhaltiCheckout(config);
    checkout.show({ amount: 200 * 100 });
  };

  return (
    <div className="fixed inset-0 overflow-y-auto z-10">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        />
        <div className="inline-block w-full p-6 mx-auto mt-10 bg-white rounded-lg shadow-xl transform sm:max-w-md sm:w-full sm:p-8">
          <h2 className="text-xl font-bold mb-5">Payment Option </h2>

          <button
            className="flex flex-col w-full px-5 py-2.5 tracking-wide justify-center items-center
             font-medium rounded-lg text-lg 
            text-center mb-5 border-2 border-black 
            
            "
            onClick={payment}
          >
            <img className="w-1/2 h-15" src={khaltiIcon} alt="Khalti logo" />
          </button>
          <div className="relative">
            <button
              className="w-full px-5 py-7 tracking-wide
            text-black font-semibold rounded-lg text-lg 
            text-center mb-2 border-2 border-black
            focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden
            "
              onClick={cashOnDelivery}
            >
              <DirectionsBikeIcon className="svg-icons mr-5" />
              Cash On Delivery
            </button>
            <DeliveryDropDown isOpen={status} />
            {status && (
              <button
                className="absolute bottom-[-85%] right-5 mb-5 z-20"
                onClick={cashOnDelivery}
              >
                <CancelIcon className="svg-icons text-red-800" />
              </button>
            )}
          </div>
          <button className="absolute top-0 right-0 m-5" onClick={close}>
            <CancelIcon className="svg-icons text-red-800" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
