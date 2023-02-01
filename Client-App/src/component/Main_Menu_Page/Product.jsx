import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useStateValue } from "../../ContextAPI/StateProvider";
const Product = ({ id, productName, stock, imageUrl, gasRate }) => {
  const [{ basket, totalCount }, dispatch] = useStateValue();
  // {gasRateData?.currentData.Refill_Rate}
  const [productType, setProductType] = useState(["Refill", "New"]);
  const [selectedType, setSelectedType] = useState(productType[0]);

  const [displayRate, setDisplayRate] = useState(
    gasRate?.currentData.Refill_Rate
  );

  const [itemCount, setItemCount] = useState(0);

  const selectLog = (e) => {
    setSelectedType(e.target.value);
  };

  useEffect(() => {
    // Refill
    if (selectedType === productType[0]) {
      setDisplayRate(gasRate?.currentData.Refill_Rate);
    }
    // New
    if (selectedType === productType[1]) {
      setDisplayRate(gasRate?.currentData.New_Cylinder_Rate);
    }
  }, [gasRate, productType, selectedType]);

  return (
    <div className="flex flex-col mx-4 my-5 place-items-center bg-[rgba(250,250,210,.2)] rounded-2xl max-lg:my-[15%]">
      {/* Stock Status */}

      <div className="w-full text-end  max-lg:mr-5">
        <strong
          className="border-4 border-green-500 p-2 rounded-lg 
        text-green-700"
        >
          {" "}
          In stock :<strong className="px-2 text-green-900">{stock}</strong>
        </strong>
      </div>

      {/* <div className="w-full text-end">
          <strong className="bg-red-700 p-2 rounded-lg text-white "> 
           Out Stock !
          </strong> 
          </div> */}

      <img className="w-32 max-lg:mt-7" src={imageUrl} alt="Sagar Gas" />
      {/* add and subtract */}
      <div className="flex flex-row my-6 justify-between place-items-center">
        <button
          className="px-4 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg mx-auto
            "
        >
          <RemoveIcon className="svg-icons" />
        </button>

        <input
          className=" w-1/4 h-16 bg-black text-white text-3xl text-center rounded-2xl"
          value={itemCount}
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

      {/* Show Per Price */}
      <div className="w-full px-5 py-3 mb-5 text-white bg-black rounded-lg text-lg font-semibold text-center">
        Rs.{displayRate}
      </div>
      {/* Select Dropdown */}
      <div className="relative w-full mb-5">
        <select
          className=" w-full px-5 py-3 text-white bg-black rounded-lg text-lg font-semibold text-center  appearance-none cursor-pointer"
          onChange={selectLog}
        >
          <option value={productType[0]}>{productType[0]}</option>
          <option value={productType[1]}> {productType[1]}</option>
        </select>
        <ExpandMoreIcon className=" absolute top-3.5 right-5 svg-icons text-white" />
      </div>

      <button
        className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg 
            text-lg text-center"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default Product;
