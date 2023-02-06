import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import Product from "./Product";

export const Menu = () => {
  const [productData, setProductData] = useState(null);
  const [gasRateData, setGasRateData] = useState(null);
  const [gasDeliveryRateData, setDeliveryRateData] = useState(null);

  useEffect(() => {
    //call to backend for connection
    const socket = openSocket("http://localhost:5000");

    // socket.on('connect', () => {
    //   console.log('Connected to socket.io server');
    // });

    //socket.on('disconnect', () => {
    //   console.log('Disconnected from socket.io server');
    // });
    socket.on("gasRate", (data) => {
      setGasRateData(data);
    });

    socket.on("deliveryRate", (data) => {
      setDeliveryRateData(data);
    });

    socket.on("productList", (data) => {
      setProductData(data.ProductList);
    });

    socket.emit("getGasRate");
    socket.emit("getDeliveryRate");
    socket.emit("getProductList");

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col w-full place-items-center">
      {/* Main max-lg: */}
      <main className="grid grid-cols-3 gap-4 my-5 max-lg:flex max-lg:flex-col">
        {productData !== null &&
          Object.entries(productData).map(([key, data], index) => (
            <Product
              key={key}
              id={index}
              productName={data.ProductName}
              stock={data.InStock}
              imageUrl={data.ImageInfo.Link}
              gasRate={gasRateData}
              gasDeliveryRate={gasDeliveryRateData}
            />
          ))}
      </main>
    </div>
  );
};

export default Menu;
