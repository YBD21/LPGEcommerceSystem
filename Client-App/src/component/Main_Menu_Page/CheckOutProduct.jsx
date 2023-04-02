import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CancelIcon from "@mui/icons-material/Cancel";
import { useStateValue } from "../../ContextAPI/StateProvider";

const CheckOutProduct = ({ id, itemId, name, image, type, Qty }) => {
  const [{ gasRateData, productList, basket }, dispatch] = useStateValue();
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [totalQty, setTotalQty] = useState(0);

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      itemId: itemId,
    });
  };

  const increaseQty = () => {
    if (stock - totalQty > 0) {
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

  const sumQty = () => {
    // find item equal to id and sum Qty
    const result = basket?.reduce((acc, cur) => {
      if (cur.id === id) {
        return acc + cur.Qty;
      }
      return acc;
    }, 0);
    // console.log(result);
    setTotalQty(result);
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

  useEffect(() => {
    sumQty();
  }, [basket]);

  return (
    <div className="flex max-lg:flex-col flex-row px-4 mx-4 mt-5 mb-10 place-items-center bg-gray-200 rounded-2xl max-lg:my-[10%] relative">
      <div className="flex flex-col w-1/2 max-lg:w-full mb-5 mx-5 items-center">
        <img
          className="w-1/2 m-6 max-lg:mt-7 max-lg:w-1/6"
          src={image}
          alt={name}
          loading="eager"
        />

        <p className="text-2xl font-bold mb-2.5">{name}</p>
      </div>
      {/* add and subtract */}
      <div className="w-full flex flex-col place-items-center">
        <p className="text-2xl font-bold mt-2.5"> Qty </p>

        <div className="w-full flex flex-row my-6 justify-between place-items-center">
          <button
            className="px-4 py-2.5 tracking-wide
          text-white bg-black font-medium rounded-lg mx-auto
          focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative 
          overflow-hidden
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

      {/* Show Per Stock */}
      <div className="w-1/2 max-lg:w-full mb-5 mx-5 text-center">
        <p className="text-2xl font-bold mb-2.5"> In Stock</p>
        <div
          className="px-5 py-3  text-white bg-black rounded-lg text-lg 
        font-semibold"
        >
          {stock - totalQty}
        </div>
      </div>

      {/* Show Type */}
      <div className="w-1/2 max-lg:w-full mb-5 mx-5 text-center">
        <p className="text-2xl font-bold mb-2.5"> Type </p>
        <div
          className=" w-full px-5 py-3 text-white bg-black rounded-lg 
        text-lg font-semibold"
        >
          {type}
        </div>
      </div>

      {/* Show Per Price */}
      <div className="w-1/2 max-lg:w-full mb-5 mx-5 text-center">
        <p className="text-2xl font-bold mb-2.5">Price</p>
        <div
          className="px-5 py-3  text-white bg-black rounded-lg text-lg 
        font-semibold"
        >
          Rs.
          {Qty === 0
            ? price
            : (price * Qty).toLocaleString("en-IN", {
                maximumFractionDigits: 2,
              })}
        </div>
      </div>

      <button className="absolute top-4 right-6" onClick={removeFromBasket}>
        <CancelIcon className="svg-icons text-red-800" />
      </button>
    </div>
  );
};

export default CheckOutProduct;
