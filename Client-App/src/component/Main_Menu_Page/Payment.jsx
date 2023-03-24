import React, { useState, useEffect } from "react";
import axios from "axios";
import KhaltiCheckout from "khalti-checkout-web";
import { useStateValue } from "../../ContextAPI/StateProvider";
import khaltiIcon from "../../dist/image/Khalti.png";
import CancelIcon from "@mui/icons-material/Cancel";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import TimerIcon from "@mui/icons-material/Timer";
import DeliveryDropDown from "./PopUp/DeliveryDropDown";
import Processing from "./Processing";
const Payment = ({ timer }) => {
  const [
    { userData, basket, gasRateData, gasDeliveryRateData, totalCharge },
    dispatch,
  ] = useStateValue();

  const [status, setStatus] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEpay, setIsEpay] = useState(false);
  const [remainingTime, setRemainingTime] = useState(timer); // 10 minutes in seconds

  const minutes = String(Math.floor(remainingTime / 60)).padStart(2, "0");
  const seconds = String(remainingTime % 60).padStart(2, "0");
  useEffect(() => {
    let interval;

    interval = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    if (remainingTime === 0 && isEpay === false) {
      close();
    }

    if (remainingTime === 0 && isEpay === true) {
      window.location.reload(false);
      // reload current page
    }

    return () => clearInterval(interval);
  }, [remainingTime, isEpay]);

  const close = async () => {
    await releaseStock();

    dispatch({
      type: "SET_SHOW_POPUP",
      showPopup: false,
    });

    dispatch({
      type: "SET_PAY_STATUS",
      payStatus: false,
    });

    // console.log("I am Closed  X_X ")
  };

  const releaseStock = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:5000/payment-system/release-stock",
        {
          UserInfo: userData,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeAllItemsFromBasket = () => {
    dispatch({
      type: "EMPTY_BASKET",
    });
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

  const onSucessfulKhaltiPayment = (respondData) => {
    // close Payment Option
    close();

    // clear items from basket
    removeAllItemsFromBasket();

    // show Thankyou Page
    displayThankYouPage(false, respondData);
  };

  const cashOnDelivery = () => {
    setStatus(!status);
  };

  const verifyTransaction = async (token) => {
    let payloadData = {
      tokenId: token,
      phoneNumber: userData?.id,
      items: basket,
      gasRate: gasRateData,
      deliveryRate: gasDeliveryRateData,
      totalAmount: totalCharge,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/payment-system/verify",
        payloadData,
        {
          withCredentials: true, // enable sending and receiving cookies
        }
      );
      onSucessfulKhaltiPayment(response.data);
    } catch (error) {
      console.log(error.message);
    }
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

        // console.log(payload);

        // call backend to verify the payload
        verifyTransaction(payload?.token).then(() => {
          setIsEpay(false);
          setIsProcessing(false);
        });
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error);
      },
      onClose() {
        // console.log("widget is closing");
        setIsProcessing(false);
        setIsEpay(false);
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
  const requestPayment = () => {
    setIsProcessing(true);
    setIsEpay(true);
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
          {isProcessing && <Processing />}

          {!isProcessing && (
            <>
              <div className=" flex justify-center pb-5 z-50">
                <TimerIcon className="svg-icons mr-6" />
                <p className="font-semibold">
                  {minutes} : {seconds}{" "}
                </p>
              </div>
              <h2 className="text-xl font-bold mb-5">Payment Option </h2>

              <button
                className="flex flex-col w-full px-5 py-2 max-md:py-3 tracking-wide 
                justify-center items-center font-medium 
                rounded-lg text-lg text-center mb-5 border-2 border-black"
                onClick={requestPayment}
              >
                <img className="w-1/2" src={khaltiIcon} alt="Khalti logo" />
              </button>
              <div className="relative">
                <button
                  className="w-full px-5 py-7  max-lg:py-6 tracking-wide
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
