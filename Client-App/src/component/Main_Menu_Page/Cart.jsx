import React, { useState, useEffect } from "react";
import { useStateValue } from "../../ContextAPI/StateProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckOutProduct from "./CheckOutProduct";
import OrderSummary from "./OrderSummary";

const Cart = () => {
  const [{ basket }, dispatch] = useStateValue();

  return (
    <main className="flex flex-col max-lg:place-items-center">
      <div className="w-full mt-2 text-center text-3xl text-black font-semibold">
        Your Cart
      </div>
      <button className="w-[20%] max-lg:w-1/2 max-lg:mt-5 ml-2 px-5 py-2.5 tracking-wide bg-red-900 rounded-lg text-center text-lg text-white">
        <strong className="mr-4">Remove All</strong>
        <DeleteIcon className="svg-icons" />
      </button>
      <div className="flex flex-row max-lg:flex-col">
        <div className="w-1/2 max-lg:w-full">
          {basket
            ?.sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((item) => (
              <CheckOutProduct
                key={item.id}
                id={item.id}
                name={item.ProductName}
                image={item.Image}
                price={item.Price}
                type={item.ProductType}
                Qty={item.Qty}
              />
            ))}
        </div>
        {/* Order Details here */}
        <OrderSummary />
      </div>
    </main>
  );
};

export default Cart;
