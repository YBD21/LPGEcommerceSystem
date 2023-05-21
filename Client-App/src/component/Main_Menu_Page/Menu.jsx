import React, { useEffect, useState } from "react";
import { useStateValue } from "../../ContextAPI/StateProvider";
import Product from "./Product";

export const Menu = () => {
  const [{ productList }] = useStateValue();
  const [productData, setProductData] = useState({});

  useEffect(() => {
    setProductData(productList);
  }, [productList]);

  return (
    <div className="flex flex-col w-full place-items-center">
      <main className="grid grid-cols-3 gap-4 my-5 max-lg:flex max-lg:flex-col">
        {!productData
          ? false
          : Object.entries(productData).map(([key, data]) => (
              <Product
                key={data.Key}
                id={data.Id}
                productName={data.ProductName}
                imageUrl={data.imageUrl}
                stock={data.Stock}
              />
            ))}
      </main>
    </div>
  );
};

export default Menu;
