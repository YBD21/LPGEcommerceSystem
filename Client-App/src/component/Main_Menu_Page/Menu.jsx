import React,{ useState, useEffect } from "react";
import { useStateValue } from "../../ContextAPI/StateProvider";
import ItemAddedPopOver from "./PopUp/ItemAddedPopOver";
import Product from "./Product";

export const Menu = () => {
  const [{ productList, itemAdded }, dispatch] = useStateValue();
  const [showPopOver, setShowPopOver] = useState(false);

  const setPopOver = () => {
    if (itemAdded) {
      setShowPopOver(true);
      // set itemAdded to false here
      setTimeout(() => {
        setShowPopOver(false);
        dispatch({
          type: "SET_ITEM_ADDED",
          itemAdded: false,
        });
      }, 2000);
    }
  };

  useEffect(() => {
    setPopOver();
  }, [itemAdded]);

  return (
    <div className="flex flex-col w-full place-items-center">
      {/* Main max-lg: */}
      <div className="w-full flex m-5 justify-end max-lg:hidden">
        <ItemAddedPopOver show={showPopOver} />
      </div>

      <main className="grid grid-cols-3 gap-4 my-5 max-lg:flex max-lg:flex-col">
        {!productList
          ? false
          : Object.entries(productList).map(([key, data]) => (
              <Product
                key={data.Key}
                id={data.Id}
                productName={data.ProductName}
                stock={data.Stock}
                imageUrl={data.imageUrl}
              />
            ))}
      </main>
    </div>
  );
};

export default Menu;
