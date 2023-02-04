import React, { useState, useEffect } from "react";
import { useStateValue } from "../../ContextAPI/StateProvider";
const OrderSummary = () => {
  const [{ basket }, dispatch] = useStateValue();
  const [itemscount, setItemsCount] = useState(0);
  const [itemsPrice, setItemsPrice] = useState(0);
  const [delivery_charge, setDelivery_charge] = useState(0);
  const [totalprice, setTotalPrice] = useState(0);

  const countItemsInBasket = () => {
    if (basket.length > 0) {
      let updateCount = 0;
      let refillItemsCount = 0;
      let newItemsCount = 0;
      let refillPrice = 0;
      let newPrice = 0;

      basket?.forEach((element) => {
        updateCount += element.Qty;
        if (element.ProductType === "Refill") {
          refillItemsCount += element.Qty;
          refillPrice = element.Price;
        }
        if (element.ProductType === "New") {
          newItemsCount += element.Qty;
          newPrice = element.Price;
        }
      });
      // Note : call delivery rate from backend here
      const deliveryCharge = updateCount * 100;

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

  return (
    <div className="flex flex-col w-[40%] ml-16 px-2 max-lg:w-full max-lg:m-0 max-lg:mb-5">
      <div className=" border-4 border-black rounded-lg">
        <p className="w-full text-center font-semibold text-2xl">
          Order Summary
        </p>
        <hr className="border border-black" />
        <div className="w-full flex flex-row justify-between my-2">
          <p className="text-lg font-semibold ml-16">SubTotal ({itemscount} Items) :</p>
          <p className="text-lg font-semibold mr-16">Rs.{itemsPrice}</p>
        </div>
        <div className="w-full flex flex-row justify-between my-2">
          <p className="text-lg font-semibold ml-16">
            Delivery Charge (Rs.100 Per Items) :
          </p>
          <p className="text-lg font-semibold mr-16">Rs.{delivery_charge}</p>
        </div>
        <hr className=" border border-black" />
        <div className="w-full flex flex-row justify-between my-2">
          <p className="text-2xl font-bold ml-16">Total :</p>
          <p className="text-2xl font-bold mr-16">Rs.{totalprice}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
