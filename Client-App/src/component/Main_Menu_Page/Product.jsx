import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useStateValue } from "../../ContextAPI/StateProvider";
const Product = ({ id, productName, stock, imageUrl }) => {
  const [
    { basket, gasRateData, gasDeliveryRateData, totalCount, itemAdded },
    dispatch,
  ] = useStateValue();

  const productType = ["Refill", "New"];
  const [selectedType, setSelectedType] = useState(productType[0]);

  const [displayRate, setDisplayRate] = useState(gasRateData?.Refill_Rate);

  const [itemCount, setItemCount] = useState(0);

  const [is_Item_Exist_With_Refill, SetIs_Item_Exist_With_Refill] =
    useState(false);

  const [is_Item_Exist_With_New, SetIs_Item_Exist_With_New] = useState(false);

  const selectLog = (e) => {
    setSelectedType(e.target.value);
  };

  const updateItemAdded = () => {
    dispatch({
      type: "SET_ITEM_ADDED",
      itemAdded: true,
    });
  };

  //  Basket Operation

  const addBasket = (itemId) => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        itemId: itemId,
        Image: imageUrl,
        ProductName: productName,
        ProductType: selectedType,
        Qty: itemCount,
      },
    });
  };

  const addToBasket = () => {
    if (itemCount === 0) {
      return;
    }

    const itemId = selectedType === productType[0] ? id + 100 : id;

    const itemExists =
      selectedType === productType[0]
        ? is_Item_Exist_With_Refill
        : is_Item_Exist_With_New;

    if (itemExists) {
      removeItemsFromBasket(itemId);
    } else {
      if (selectedType === productType[0]) {
        SetIs_Item_Exist_With_Refill(true);
      } else {
        SetIs_Item_Exist_With_New(true);
      }
    }
    addBasket(itemId);
    updateItemAdded();
    setItemCount(0);
  };

  const removeItemsFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  const findItemInBasket = () => {
    if (basket?.length > 0) {
      const foundItem = basket?.find(
        (item) =>
          selectedType === item.ProductType && productName === item.ProductName
      );

      if (foundItem) {
        if (selectedType === productType[0]) {
          SetIs_Item_Exist_With_Refill(true);
        }
        if (selectedType === productType[1]) {
          SetIs_Item_Exist_With_New(true);
        }
      }
    }
  };

  // Count Operation
  const addItemCount = () => {
    if (stock > itemCount) {
      return setItemCount(itemCount + 1);
    }
  };

  const subtractItemCount = () => {
    if (itemCount < 0) {
      return setItemCount(0);
    }
    if (stock >= itemCount && itemCount > 0) {
      return setItemCount(itemCount - 1);
    }
  };

  useEffect(() => {
    // Refill
    if (selectedType === productType[0]) {
      setDisplayRate(gasRateData?.Refill_Rate);
    }
    // New
    if (selectedType === productType[1]) {
      setDisplayRate(gasRateData?.New_Cylinder_Rate);
    }
  }, [gasRateData, gasDeliveryRateData, productType, selectedType]);

  useEffect(() => {
    findItemInBasket();
  }, [basket]);

  return (
    <div className="flex flex-col mx-4 my-5 place-items-center bg-[rgba(250,250,210,.2)] rounded-2xl max-lg:my-[15%]">
      {/* Stock Status */}

      <div className="w-full text-end  max-lg:mr-5">
        <strong
          className="border-4 border-green-500 p-2 rounded-lg 
        text-green-700"
        >
          In stock :<strong className="px-2 text-green-900">{stock}</strong>
        </strong>
      </div>

      {/* <div className="w-full text-end">
          <strong className="bg-red-700 p-2 rounded-lg text-white "> 
           Out Stock !
          </strong> 
          </div> */}

      <img className="w-32 max-lg:mt-7" src={imageUrl} alt={productName} />
      {/* add and subtract */}
      <div className="flex flex-row my-6 justify-between place-items-center">
        <button
          className="px-4 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg mx-auto
            focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden
            "
          onClick={subtractItemCount}
        >
          <RemoveIcon className="svg-icons" />
        </button>

        <input
          className=" w-1/4 h-16 bg-black text-white text-3xl text-center rounded-2xl 
          "
          value={itemCount}
          disabled
        />

        <button
          className="px-4 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg mx-auto
            focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden
            "
          onClick={addItemCount}
        >
          <AddIcon className="svg-icons" />
        </button>
      </div>

      {/* Show Per Price */}
      <div className="w-full px-5 py-3 mb-5 text-white bg-black rounded-lg text-lg font-semibold text-center">
        Rs.
        {itemCount === 0
          ? displayRate
          : (displayRate * itemCount).toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}
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
            text-lg text-center 
            focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 active:ring-4 active:ring-black active:ring-opacity-50 relative overflow-hidden
            "
        onClick={addToBasket}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default Product;
