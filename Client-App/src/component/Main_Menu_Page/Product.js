import React from "react";
import Logo_img from "../../dist/image/Logo.png";
import EverstGas from "../../dist/image/Everest-Gas.png";
import SagarGas from "../../dist/image/Sagar-Gas.png";
import ShreeGas from "../../dist/image/Shree-Gas.png";

import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const Product = () => {
  return (
    <div className="flex flex-col w-full place-items-center">
      <header className="flex flex-row w-full">
        {/* Logo */}
        <div className="w-full m-auto">
          <img
            className="w-16"
            src={Logo_img}
            alt="Melamchi Online Store Logo"
          />
        </div>

        <div className="w-1/2 max-lg:w-full flex justify-between flex-row m-auto">
          <NotificationsIcon className="svg-icons m-auto" />
          <AccountCircleIcon className="svg-icons m-auto" />
          <ShoppingCartIcon className="svg-icons m-auto" />
        </div>
      </header>
      {/* Main max-lg: */}
      <main className="w-3/4 flex justify-between flex-row mt-5  max-lg:flex-col">
       
        {/* Sagar Gas */}

        <div className="flex flex-col mx-4 my-5 place-items-center bg-[rgba(250,250,210,.2)] rounded-2xl max-lg:my-[35%]">
          {/* Stock Status */}

          <div className="w-full text-end max-lg:text-center">
          <strong className="outline-3 outline-green-500 outline p-2 rounded-lg text-green-600"> In stock : 
          <strong className="px-2 text-green-700">10</strong>
          </strong> 
          </div>

          {/* <div className="w-full text-end">
          <strong className="bg-red-700 p-2 rounded-lg text-white "> 
           Out Stock !
          </strong> 
          </div> */}
         
          <img className="w-32 max-lg:mt-5" src={SagarGas} alt="Sagar Gas" />
          {/* add and subtract */}
          <div className="flex flex-row my-6 justify-between place-items-center">
            <button
              className="px-4 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg mx-auto
            "
            >
              <RemoveIcon className="svg-icons" />
            </button>

            <input
              className=" w-1/4 h-16 bg-black text-white text-3xl text-center rounded-2xl"
              value={0}
              disabled
            />

            <button
              className="px-4 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg mx-auto
            "
            >
              <AddIcon className="svg-icons" />
            </button>
          </div>
          {/* Show Per Price */}
          <div className="w-full px-5 py-3 mb-5 text-white bg-black rounded-lg text-lg font-semibold text-center">
           Rs.1800
          </div>
          {/* Select Dropdown */}
          <div className="relative w-full mb-5">
            <select className=" w-full px-5 py-3 text-white bg-black rounded-lg text-lg font-semibold text-center  appearance-none cursor-pointer">
            <option > Refill </option>
            <option > New </option>
           </select> 
           <ExpandMoreIcon className=" absolute top-3.5 right-5 svg-icons text-white"/>
          </div> 
           

          <button
            className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg 
            text-lg text-center"
          >
            {" "}
            Add To Cart{" "}
          </button>
        </div>
 
        <div className="flex flex-col mx-4 my-5 place-items-center bg-[rgba(250,250,210,.2)] rounded-2xl max-lg:my-[35%]">
          {/* Stock Status */}

          <div className="w-full text-end max-lg:text-center">
          <strong className="outline-3 outline-green-500 outline p-2 rounded-lg text-green-600"> In stock : 
          <strong className="px-2 text-green-700">10</strong>
          </strong> 
          </div>

          {/* <div className="w-full text-end">
          <strong className="bg-red-700 p-2 rounded-lg text-white "> 
           Out Stock !
          </strong> 
          </div> */}
         
          <img className="w-32 max-lg:mt-5" src={SagarGas} alt="Sagar Gas" />
          {/* add and subtract */}
          <div className="flex flex-row my-6 justify-between place-items-center">
            <button
              className="px-4 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg mx-auto
            "
            >
              <RemoveIcon className="svg-icons" />
            </button>

            <input
              className=" w-1/4 h-16 bg-black text-white text-3xl text-center rounded-2xl"
              value={0}
              disabled
            />

            <button
              className="px-4 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg mx-auto
            "
            >
              <AddIcon className="svg-icons" />
            </button>
          </div>
          {/* Show Per Price */}
          <div className="w-full px-5 py-3 mb-5 text-white bg-black rounded-lg text-lg font-semibold text-center">
           Rs.1800
          </div>
          {/* Select Dropdown */}
          <div className="relative w-full mb-5">
            <select className=" w-full px-5 py-3 text-white bg-black rounded-lg text-lg font-semibold text-center  appearance-none cursor-pointer">
            <option > Refill </option>
            <option > New </option>
           </select> 
           <ExpandMoreIcon className=" absolute top-3.5 right-5 svg-icons text-white"/>
          </div> 
           

          <button
            className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg 
            text-lg text-center"
          >
            {" "}
            Add To Cart{" "}
          </button>
        </div>

        <div className="flex flex-col mx-4 my-5 place-items-center bg-[rgba(250,250,210,.2)] rounded-2xl max-lg:my-[35%]">
          {/* Stock Status */}

          <div className="w-full text-end max-lg:text-center">
          <strong className="outline-3 outline-green-500 outline p-2 rounded-lg text-green-600"> In stock : 
          <strong className="px-2 text-green-700">10</strong>
          </strong> 
          </div>

          {/* <div className="w-full text-end">
          <strong className="bg-red-700 p-2 rounded-lg text-white "> 
           Out Stock !
          </strong> 
          </div> */}
         
          <img className="w-32 max-lg:mt-5" src={SagarGas} alt="Sagar Gas" />
          {/* add and subtract */}
          <div className="flex flex-row my-6 justify-between place-items-center">
            <button
              className="px-4 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg mx-auto
            "
            >
              <RemoveIcon className="svg-icons" />
            </button>

            <input
              className=" w-1/4 h-16 bg-black text-white text-3xl text-center rounded-2xl"
              value={0}
              disabled
            />

            <button
              className="px-4 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg mx-auto
            "
            >
              <AddIcon className="svg-icons" />
            </button>
          </div>
          {/* Show Per Price */}
          <div className="w-full px-5 py-3 mb-5 text-white bg-black rounded-lg text-lg font-semibold text-center">
           Rs.1800
          </div>
          {/* Select Dropdown */}
          <div className="relative w-full mb-5">
            <select className=" w-full px-5 py-3 text-white bg-black rounded-lg text-lg font-semibold text-center  appearance-none cursor-pointer">
            <option > Refill </option>
            <option > New </option>
           </select> 
           <ExpandMoreIcon className=" absolute top-3.5 right-5 svg-icons text-white"/>
          </div> 
           

          <button
            className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg 
            text-lg text-center"
          >
            {" "}
            Add To Cart{" "}
          </button>
        </div>
        <div className="flex flex-col mx-4 my-5 place-items-center bg-[rgba(250,250,210,.2)] rounded-2xl max-lg:my-[35%]">
          {/* Stock Status */}

          <div className="w-full text-end max-lg:text-center">
          <strong className="outline-3 outline-green-500 outline p-2 rounded-lg text-green-600"> In stock : 
          <strong className="px-2 text-green-700">10</strong>
          </strong> 
          </div>

          {/* <div className="w-full text-end">
          <strong className="bg-red-700 p-2 rounded-lg text-white "> 
           Out Stock !
          </strong> 
          </div> */}
         
          <img className="w-32 max-lg:mt-5" src={SagarGas} alt="Sagar Gas" />
          {/* add and subtract */}
          <div className="flex flex-row my-6 justify-between place-items-center">
            <button
              className="px-4 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg mx-auto
            "
            >
              <RemoveIcon className="svg-icons" />
            </button>

            <input
              className=" w-1/4 h-16 bg-black text-white text-3xl text-center rounded-2xl"
              value={0}
              disabled
            />

            <button
              className="px-4 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg mx-auto
            "
            >
              <AddIcon className="svg-icons" />
            </button>
          </div>
          {/* Show Per Price */}
          <div className="w-full px-5 py-3 mb-5 text-white bg-black rounded-lg text-lg font-semibold text-center">
           Rs.1800
          </div>
          {/* Select Dropdown */}
          <div className="relative w-full mb-5">
            <select className=" w-full px-5 py-3 text-white bg-black rounded-lg text-lg font-semibold text-center  appearance-none cursor-pointer">
            <option > Refill </option>
            <option > New </option>
           </select> 
           <ExpandMoreIcon className=" absolute top-3.5 right-5 svg-icons text-white"/>
          </div> 
           

          <button
            className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg 
            text-lg text-center"
          >
            {" "}
            Add To Cart{" "}
          </button>
        </div>

        <div className="flex flex-col mx-4 my-5 place-items-center bg-[rgba(250,250,210,.2)] rounded-2xl max-lg:my-[35%]">
          {/* Stock Status */}

          <div className="w-full text-end max-lg:text-center">
          <strong className="outline-3 outline-green-500 outline p-2 rounded-lg text-green-600"> In stock : 
          <strong className="px-2 text-green-700">10</strong>
          </strong> 
          </div>

          {/* <div className="w-full text-end">
          <strong className="bg-red-700 p-2 rounded-lg text-white "> 
           Out Stock !
          </strong> 
          </div> */}
         
          <img className="w-32 max-lg:mt-5" src={SagarGas} alt="Sagar Gas" />
          {/* add and subtract */}
          <div className="flex flex-row my-6 justify-between place-items-center">
            <button
              className="px-4 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg mx-auto
            "
            >
              <RemoveIcon className="svg-icons" />
            </button>

            <input
              className=" w-1/4 h-16 bg-black text-white text-3xl text-center rounded-2xl"
              value={0}
              disabled
            />

            <button
              className="px-4 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg mx-auto
            "
            >
              <AddIcon className="svg-icons" />
            </button>
          </div>
          {/* Show Per Price */}
          <div className="w-full px-5 py-3 mb-5 text-white bg-black rounded-lg text-lg font-semibold text-center">
           Rs.1800
          </div>
          {/* Select Dropdown */}
          <div className="relative w-full mb-5">
            <select className=" w-full px-5 py-3 text-white bg-black rounded-lg text-lg font-semibold text-center  appearance-none cursor-pointer">
            <option > Refill </option>
            <option > New </option>
           </select> 
           <ExpandMoreIcon className=" absolute top-3.5 right-5 svg-icons text-white"/>
          </div> 
           

          <button
            className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg 
            text-lg text-center"
          >
            {" "}
            Add To Cart{" "}
          </button>
        </div>

        <div className="flex flex-col mx-4 my-5 place-items-center bg-[rgba(250,250,210,.2)] rounded-2xl max-lg:my-[35%]">
          {/* Stock Status */}

          <div className="w-full text-end max-lg:text-center">
          <strong className="outline-3 outline-green-500 outline p-2 rounded-lg text-green-600"> In stock : 
          <strong className="px-2 text-green-700">10</strong>
          </strong> 
          </div>

          {/* <div className="w-full text-end">
          <strong className="bg-red-700 p-2 rounded-lg text-white "> 
           Out Stock !
          </strong> 
          </div> */}
         
          <img className="w-32 max-lg:mt-5" src={SagarGas} alt="Sagar Gas" />
          {/* add and subtract */}
          <div className="flex flex-row my-6 justify-between place-items-center">
            <button
              className="px-4 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg mx-auto
            "
            >
              <RemoveIcon className="svg-icons" />
            </button>

            <input
              className=" w-1/4 h-16 bg-black text-white text-3xl text-center rounded-2xl"
              value={0}
              disabled
            />

            <button
              className="px-4 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg mx-auto
            "
            >
              <AddIcon className="svg-icons" />
            </button>
          </div>
          {/* Show Per Price */}
          <div className="w-full px-5 py-3 mb-5 text-white bg-black rounded-lg text-lg font-semibold text-center">
           Rs.1800
          </div>
          {/* Select Dropdown */}
          <div className="relative w-full mb-5">
            <select className=" w-full px-5 py-3 text-white bg-black rounded-lg text-lg font-semibold text-center  appearance-none cursor-pointer">
            <option > Refill </option>
            <option > New </option>
           </select> 
           <ExpandMoreIcon className=" absolute top-3.5 right-5 svg-icons text-white"/>
          </div> 
           

          <button
            className="w-full px-5 py-2.5 tracking-wide
            text-white bg-black font-medium rounded-lg 
            text-lg text-center"
          >
            {" "}
            Add To Cart{" "}
          </button>
        </div>
        
      </main>
      
    </div>
  );
};

export default Product;
