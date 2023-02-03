import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CancelIcon from "@mui/icons-material/Cancel";

const CheckOutProduct = ({ id, name, image, price, type, Qty }) => {
  return (
    <div className="flex max-lg:flex-col flex-row mx-4 mt-5 mb-10 place-items-center bg-[rgba(250,250,210,.2)] rounded-2xl max-lg:my-[15%]">
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
      <button className="mx-5 mb-auto max-lg:relative max-lg:bottom-[35.5rem] max-lg:left-[40%]">
        <CancelIcon className="svg-icons text-red-800" />
      </button>
    </div>
  );
};

export default CheckOutProduct;
