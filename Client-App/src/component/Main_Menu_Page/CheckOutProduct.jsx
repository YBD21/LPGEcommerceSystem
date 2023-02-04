import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CancelIcon from "@mui/icons-material/Cancel";
import { useStateValue } from "../../ContextAPI/StateProvider";

const CheckOutProduct = ({ id, itemId, name, image, price, type, Qty }) => {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      itemId: itemId,
    });
  };

  const increaseQty = () => {
    dispatch({
      type: "Update_Basket_Qty",
      item: {
        itemId: itemId,
        updateQty: Qty + 1,
      },
    });
  };

  const decreaseQty = () => {
    if (Qty > 1) {
      dispatch({
        type: "Update_Basket_Qty",
        item: {
          itemId: itemId,
          updateQty: Qty - 1,
        },
      });
    }
  };

  return (
    <div className="flex max-lg:flex-col flex-row mx-4 mt-5 mb-10 place-items-center bg-[rgba(250,250,210,.2)] rounded-2xl max-lg:my-[10%]">
      {/* Stock Status */}

      <img className="w-20 m-6 max-lg:mt-7" src={image} alt="Sagar Gas" />
      {/* add and subtract */}
      <div className="w-full flex flex-col place-items-center">
        <p className="text-2xl font-bold mt-2.5"> Qty </p>

        <div className="w-full flex flex-row my-6 justify-between place-items-center">
          <button
            className="px-4 py-2.5 tracking-wide
          text-white bg-black font-medium rounded-lg mx-auto
          "
            onClick={decreaseQty}
          >
            <RemoveIcon className="svg-icons" />
          </button>

          <input
            className=" w-1/4 h-16 bg-black text-white text-3xl text-center rounded-2xl"
            value={Qty}
            disabled
          />

          <button
            className="px-4 py-2.5 tracking-wide
          text-white bg-black font-medium rounded-lg mx-auto
          "
            onClick={increaseQty}
          >
            <AddIcon className="svg-icons" />
          </button>
        </div>
      </div>

      {/* Show Type */}
      <div className="w-full mb-5 mx-5 text-center">
        <p className="text-2xl font-bold mb-2.5"> Type </p>
        <div className=" w-full px-5 py-3 text-white bg-black rounded-lg text-lg font-semibold">
          {type}
        </div>
      </div>

      {/* Show Per Price */}
      <div className="w-full mb-5 mx-5 text-center">
        <p className="text-2xl font-bold mb-2.5">Price</p>
        <div className="px-5 py-3  text-white bg-black rounded-lg text-lg font-semibold">
          Rs.{Qty === 0 ? price : price * Qty}
        </div>
      </div>
      {/* bottom: 24.5rem
          left: 45%;
          position: relative; */}
      {/* cross Icon*/}
      <button
        className="mx-5 mb-auto max-lg:relative max-lg:bottom-[35.5rem] max-lg:left-[40%]"
        onClick={removeFromBasket}
      >
        <CancelIcon className="svg-icons text-red-800" />
      </button>
    </div>
  );
};

export default CheckOutProduct;
