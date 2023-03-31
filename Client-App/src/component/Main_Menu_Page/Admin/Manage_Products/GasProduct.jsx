import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
const GasProduct = ({ keyName, name, image, stock }) => {
  const [isShaking, setIsShaking] = useState(false);
  const [value, setValue] = useState(stock);

  const edit = () => {
    setIsShaking(true);
  };

  const done = () => {
    setIsShaking(false);
    // if value is equal to stock do nothing
    if (value === stock) {
      // console.log("No Change !");
      return;
    }

    updateProductStock();

    console.log("Change");
  };

  const deleteProduct = () => {
    // delete product
    console.log("Delete Product X_X !");
  };

  const updateProductStock = () => {
    // send KeyName and value to Update InStock
    axios
      .patch("http://localhost:5000/product-management/updateStock", {
        keyName,
        stock: value,
      })
      .then(function (respond) {
        //  console.log(respond.data);
        // reset is successful redirect
      })
      .catch(function (error) {
        // throw error message

        console.log(error.message);
      });
  };

  return (
    <div
      className={`flex max-lg:flex-col flex-row px-4 mx-4 mb-5 place-items-center justify-between bg-[rgba(250,250,210,.2)] rounded-2xl max-lg:my-[10%]
    hover:translate-x-2 hover:-translate-y-2 transform transition ease-in-out ${
      isShaking ? "animate-shake" : ""
    }`}
    >
      {/* Product Name */}
      <div className="flex flex-col w-1/4 max-lg:w-full mb-5 mx-5 items-center">
        <img
          className="w-1/4 m-6 max-lg:mt-7 max-lg:w-1/6"
          src={image}
          alt={name}
          loading="lazy"
        />

        <p className="text-2xl font-bold mb-2.5">{name}</p>
      </div>
      {/* Show Per Stock */}
      <div className="w-1/4 max-lg:w-full mb-5 mx-5 text-center">
        <p className="text-2xl font-bold py-10"> In Stock</p>

        <input
          className="px-5 py-3 text-black text-center bg-gray-300 
        border-2 border-black rounded-lg text-lg font-semibold
        focus:border-black focus:ring-black focus:outline-none focus:ring focus:ring-opacity-40"
          type="number"
          value={!isShaking ? stock : value}
          disabled={!isShaking}
          onChange={(e) => setValue(+e.target.value)}
        />
      </div>

      {/*  Action  */}
      <div className="w-1/4 max-lg:w-full mb-5 mx-5 text-center flex flex-col ">
        <strong className="text-2xl font-bold py-10">Action</strong>

        <div className="w-full flex flex-row justify-between">
          {!isShaking ? (
            <button
              className="m-auto px-6 py-3 text-white rounded-lg
             text-lg font-semibold group relative bg-black"
              onClick={edit}
            >
              <EditIcon className="svg-icons" />

              <div className="absolute top-0 right-14 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 max-sm:group-hover:opacity-0 transition-opacity duration-300 bg-black py-1 px-2 rounded-md">
                <span className="text-white font-semibold">Edit</span>
              </div>
            </button>
          ) : (
            <>
              <button
                className="ml-10 px-6 py-3 text-white rounded-lg
             text-lg font-semibold group relative bg-green-500"
                onClick={done}
              >
                <DoneIcon className="svg-icons" />

                <div className="absolute top-0 right-14 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 max-sm:group-hover:opacity-0 transition-opacity duration-300 bg-green-500 py-1 px-2 rounded-md">
                  <span className="text-white font-semibold">Done</span>
                </div>
              </button>

              <button
                className=" mr-10 px-6 py-3  text-white bg-red-900 
                rounded-lg text-lg font-semibold group relative"
                onClick={deleteProduct}
              >
                <DeleteIcon className="svg-icons" />
                <div className="absolute top-0 right-14 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 max-sm:group-hover:opacity-0 transition-opacity duration-300 bg-red-900 py-1 px-2 rounded-md">
                  <span className="text-white font-semibold"> Delete </span>
                </div>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GasProduct;
