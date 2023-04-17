import React, { useEffect, useState } from "react";
import GasProduct from "./GasProduct";
import { useStateValue } from "../../../../ContextAPI/StateProvider";

const ViewLPGasProduct = () => {
  const [{ productList }] = useStateValue();
  const [productData, setProductData] = useState({});

  useEffect(() => {
    setProductData(productList);
  }, [productList]);
  return (
    <div className="flex-1 p-6 bg-white">
      <h2 className="text-3xl font-bold mt-4 ml-2 mb-8"> Gas Product</h2>
      <div className="w-full flex flex-col">
        {!productData
          ? false
          : Object.entries(productData).map(([key, data]) => (
              <GasProduct
                key={data.Key}
                keyName={data.Key}
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
