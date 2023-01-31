import React from "react";
import Product from "./Product";


export const Menu = () => {
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
