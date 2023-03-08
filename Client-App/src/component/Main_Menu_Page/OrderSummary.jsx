import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../ContextAPI/StateProvider";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import PopupPotal from "./PopUp/PopupPotal";
const OrderSummary = ({ status }) => {
  const [{ basket, gasRateData, gasDeliveryRateData, payStatus,showPopup }, dispatch] =
    useStateValue();
  const [itemscount, setItemsCount] = useState(0);
  const [itemsPrice, setItemsPrice] = useState(0);
  const [delivery_charge, setDelivery_charge] = useState(0);
  const [totalprice, setTotalPrice] = useState(0);

  const history = useNavigate();

  const getpaymentPotal = () => {
    dispatch({
      type: "SET_PAY_STATUS",
      payStatus: true,
    });
  };

  const redirectToStore = () => {
    history("/Store");
  };

  const redirectToCheckout = () => {
    history("/Checkout");
  };

  const redirectToCart = () => {
    history("/Cart");
  };

  const countItemsInBasket = () => {
    if (basket.length > 0) {
      let updateCount = 0;
      let refillItemsCount = 0;
      let newItemsCount = 0;
      let refillPrice = 0;
      let newPrice = 0;
      let refillDeliveryPrice = 0;
      let newDeliveryPrice = 0;

      basket?.forEach((element) => {
        updateCount += element.Qty;
        if (element.ProductType === "Refill") {
          refillItemsCount += element.Qty;
        }

        if (element.ProductType === "New") {
          newItemsCount += element.Qty;
        }
      });
      refillPrice = gasRateData["Refill_Rate"];

      refillDeliveryPrice = gasDeliveryRateData["Refill_Delivery_Rate"];

      newPrice = gasRateData["New_Cylinder_Rate"];

      newDeliveryPrice = gasDeliveryRateData["New_Delivery_Rate"];

      const deliveryCharge =
        refillItemsCount * refillDeliveryPrice +
        newItemsCount * newDeliveryPrice;

      const itemPrice =
        refillItemsCount * refillPrice + newItemsCount * newPrice;

      const totalPrice = itemPrice + deliveryCharge;

      setItemsCount(updateCount);
      setDelivery_charge(deliveryCharge);
      setItemsPrice(itemPrice);
      setTotalPrice(totalPrice);
    }
  };

  useEffect(() => {
    countItemsInBasket();
  }, [basket]);

  useEffect(() => {
    dispatch({
      type: "SET_TOTAL_CHARGE",
      totalCharge: totalprice,
    });
  }, [totalprice]);

  return (
    <div className="flex flex-col w-[40%] ml-12 mr-4 px-2 max-lg:w-full max-lg:m-0 max-lg:mb-5 max-lg:p-auto">
      <div className=" border-4 border-black rounded-lg">
        <p className="w-full text-center font-semibold text-2xl">
          Order Summary
        </p>
        <hr className="border border-black" />
        <div className="w-full flex flex-row justify-between my-2">
          <p className="text-lg font-semibold ml-16">
            SubTotal ({itemscount} Qty) :
          </p>
          <p className="text-lg font-semibold mr-16">
            Rs.
            {itemsPrice.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="w-full flex flex-row justify-between my-2">
          <p className="text-lg font-semibold ml-16">
            Delivery Charge ({gasDeliveryRateData?.Refill_Delivery_Rate} Per
            Qty) :
          </p>
          <p className="text-lg font-semibold mr-16">Rs.{delivery_charge}</p>
        </div>
        <hr className=" border border-black" />
        <div className="w-full flex flex-row justify-between my-2">
          <p className="text-2xl font-bold ml-16">Total :</p>
          <p className="text-2xl font-bold mr-16">
            Rs.
            {totalprice.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
      {status && (
        <div className="flex flex-row max-lg:flex-col my-10">
          {/* Go Back ? */}
          <button
            className="w-full px-5 py-2.5 text-white bg-neutral-700 
        font-medium rounded-lg text-s mr-3 mb-2
        focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden
        "
            onClick={redirectToStore}
          >
            <KeyboardBackspaceIcon className="svg-icons " />
          </button>

          <button
            className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg text-lg 
            text-center mr-3 mb-2 
            focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden
            "
            onClick={redirectToCheckout}
          >
            Checkout
          </button>
        </div>
      )}

      {!status && (
        <div className="flex flex-row max-lg:flex-col my-10">
          {/* Go Back ? */}
          <button
            className="w-full px-5 py-2.5 text-white bg-neutral-700 
        font-medium rounded-lg text-s mr-3 mb-2 
        focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden
        "
            onClick={redirectToCart}
          >
            <KeyboardBackspaceIcon className="svg-icons " />
          </button>

          <button
            className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg text-lg 
            text-center mr-3 mb-2 max-lg:mt-5
            focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden
            "
            onClick={getpaymentPotal}
          >
            Pay
          </button>
        </div>
      )}

      {/* activate payment potal */}
      {showPopup && <PopupPotal />}
    </div>
  );
};

export default OrderSummary;
