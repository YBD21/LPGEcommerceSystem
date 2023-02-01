import React, { useState, useEffect } from "react";
import axios from "axios";
import openSocket from "socket.io-client";
import Product from "./Product";

// let keys = Object.keys(data);
// date as key

export const Menu = () => {
  const [productData, setProductData] = useState({});
  const [gasRateData, setGasRateData] = useState(null);
  const [loader, setLoader] = useState(true);

  const getProductList = async () => {
    axios
      .get("http://localhost:5000/getProductList")
      .then((respond) => {
        // console.log(respond.data);
        setProductData(respond.data.ProductList);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error.meassage);
      });
  };

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

    socket.emit("getGasRate");
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div className="flex flex-col w-full place-items-center">
      {/* Main max-lg: */}
      <main className="grid grid-cols-3 gap-4 my-5 max-lg:flex max-lg:flex-col">
        {loader === false &&
          Object.entries(productData).map(([key, data], index) => (
            <Product
              key={key}
              id={index}
              productName={data.ProductName}
              stock={data.InStock}
              imageUrl={data.ImageInfo.Link}
              gasRate={gasRateData}
            />
          ))}
      </main>
    </div>
  );
};

export default Menu;
