import React from "react";
import GasProduct from "./GasProduct";
import { useStateValue } from "../../../../ContextAPI/StateProvider";

const ViewLPGasProduct = () => {
  const [{ productList }] = useStateValue();
  return (
    <div className="flex-1 p-6 bg-white">
      <h2 className="text-3xl font-bold mt-4 ml-2 mb-8"> Gas Product</h2>
      <div className="w-full flex flex-col">
      {!productList
          ? false
          : Object.entries(productList).map(([key, data]) => (
              <GasProduct
                key={data.Key}
                id={data.Id}
                name={data.ProductName}
                image={data.imageUrl}
                stock={data.Stock}
              />
            ))}
      </div>
    </div>
  );
};

export default ViewLPGasProduct;
