import React from "react";
import { useStateValue } from "../../ContextAPI/StateProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckOutProduct from "./CheckOutProduct";
import OrderSummary from "./OrderSummary";

const Cart = () => {
  const [{ basket }, dispatch] = useStateValue();

  const removeAllItemsFromBasket = () => {
    dispatch({
      type: "EMPTY_BASKET",
    });
  };

  return (
    <main className="flex flex-col max-lg:place-items-center">
      <div className="w-full mt-2 text-center text-3xl text-black font-semibold">
        Your Cart
      </div>
      <button
        className="w-[20%] max-lg:w-1/2 max-lg:mt-5 ml-2 px-5 py-2.5 tracking-wide bg-red-900 rounded-lg text-center text-lg text-white
        focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden
        "
        onClick={removeAllItemsFromBasket}
      >
        <strong className="mr-4">Remove All</strong>
        <DeleteIcon className="svg-icons" />
      </button>
      <div className="flex flex-row max-lg:flex-col">
        <div className="w-[60%] max-lg:w-full overflow-auto h-[70vh] max-lg:h-auto">
          {basket
            ?.sort((a, b) => (a.itemId > b.itemId ? 1 : -1))
            .map((item) => (
              <CheckOutProduct
                key={item.itemId}
                id={item.id}
                itemId = {item.itemId}
                name={item.ProductName}
                image={item.Image}
                type={item.ProductType}
                Qty={item.Qty}
              />
            ))}
        </div>
        {/* Order Details */}
        {basket?.length > 0 ? <OrderSummary status={true} /> : false}
      </div>
    </main>
  );
};

export default Cart;
