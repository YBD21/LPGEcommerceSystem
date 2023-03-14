import React from "react";
import { useStateValue } from "../../ContextAPI/StateProvider";
import Product from "./Product";

export const Menu = () => {
  const [{ productList }] = useStateValue();

  return (
    <div className="flex flex-col w-full place-items-center pt-10">
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
