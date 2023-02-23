import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CancelIcon from "@mui/icons-material/Cancel";
import { useStateValue } from "../../ContextAPI/StateProvider";

const CheckOutProduct = ({ id, itemId, name, image, type, Qty }) => {
  const [{ gasRateData, productList }, dispatch] = useStateValue();
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      itemId: itemId,
    });
  };

  const increaseQty = () => {
    if (stock > Qty) {
      dispatch({
        type: "Update_Basket_Qty",
        item: {
          itemId: itemId,
          updateQty: Qty + 1,
        },
      });
    }
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

  const getGasRate = () => {
    if (type === "Refill") {
      setPrice(gasRateData["Refill_Rate"]);
    }

    if (type === "New") {
      setPrice(gasRateData["New_Cylinder_Rate"]);
    }
  };

  const getStocklimit = () => {
    // find object equal to id
    const result = Object.values(productList).find((item) => item.Id === id);

    setStock(result.Stock);
  };

  useEffect(() => {
    getStocklimit();
  }, [productList]);

  useEffect(() => {
    getGasRate();
  }, [gasRateData]);

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
          focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden
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
          focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden
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
        <div
          className=" w-full px-5 py-3 text-white bg-black rounded-lg 
        text-lg font-semibold"
        >
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
