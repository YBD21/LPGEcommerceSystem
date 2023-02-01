import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";

// let keys = Object.keys(data); 
// date as key

export const Menu = () => {
 const [productData,setProductData] = useState ({});

 const getProductList = () => {
  axios
  .get("http://localhost:5000/getProductList")
  .then ((respond) => {
    // console.log(respond.data);
    setProductData(respond.data);
  }).catch((error) => {
    console.log(error.meassage);
  });
 };

  useEffect( () => {
  getProductList();
  },[]);


  return (
    <div className="flex flex-col w-full place-items-center">
      {/* Main max-lg: */}
      <main className="grid grid-cols-3 gap-4 my-5 max-lg:flex max-lg:flex-col">
       
        {/* Sagar Gas */}
       <Product/>
 
      </main>
      
    </div>
  );
};

export default Menu;
