import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";

// let keys = Object.keys(data);
// date as key

export const Menu = () => {
  const [productData, setProductData] = useState({});
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
    getProductList();
  }, []);

  const test = () => {
    let data = productData;
    let itemCount = Object.keys(productData);
    // console.log("Count", itemCount);
    console.log(data);
    // console.log(typeof(data));
    
    Object.entries(data).map(([key ,value], index) => {
      console.log("Key :",key);
      console.log("ItemCount",index);
      console.log("Product Name :", value.ProductName);
      console.log("Product Qty :", value.InStock);
      console.log("Product Image", value.ImageInfo.Link);
    });
  };

  return (
    <div className="flex flex-col w-full place-items-center">
      {/* Main max-lg: */}
      <main className="grid grid-cols-3 gap-4 my-5 max-lg:flex max-lg:flex-col">
    
        {loader === false && Object.entries(productData).map(([key,data], index) =>
          <Product key={key} id = {index}
          productName = {data.ProductName} 
           stock = {data.InStock}
           imageUrl = {data.ImageInfo.Link}
          />
        )
        }

        {/* {test()} */}
      </main>
    </div>
  );
};

export default Menu;
