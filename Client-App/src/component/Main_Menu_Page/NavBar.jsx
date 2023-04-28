import React, { useState, useEffect, useCallback } from "react";
import {url} from "../../instance"
import openSocket from "socket.io-client";
import { Link, useLocation } from "react-router-dom";
import Logo_img from "../../dist/image/Logo.png";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useStateValue } from "../../ContextAPI/StateProvider";
import UserDropDown from "./UserProfile/UserDropDown";
import ItemAddedPopOver from "./PopUp/ItemAddedPopOver";

const NavBar = () => {
  const location = useLocation();
  const [{ basket, userData, itemAdded }, dispatch] = useStateValue();
  const [productData, setProductData] = useState([]);
  const [gasRateData, setGasRateData] = useState(null);
  const [deliveryRateData, setDeliveryRateData] = useState(null);

  const [isUserclicked, setIsUserClicked] = useState(false);
  const [showItemPopOver, setShowItemPopOver] = useState(false);

  const [isHome, setIsHome] = useState(true);
  const [isCart, setIsCart] = useState(false);

  const role = userData?.role;

  useEffect(() => {
    setIsCart(location.pathname === "/Cart");
    setIsHome(location.pathname === "/Store");
  }, [location]);

  const setPopOver = () => {
    if (itemAdded) {
      setShowItemPopOver(true);
      // set itemAdded to false here
      setTimeout(() => {
        setShowItemPopOver(false);
        dispatch({
          type: "SET_ITEM_ADDED",
          itemAdded: false,
        });
      }, 2000);
    }
  };

  useEffect(() => {
    setPopOver();
  }, [itemAdded]);

  const showUserMenu = () => {
    setIsUserClicked(!isUserclicked);
  };

  const filterProductData = useCallback((data) => {
    let productDetail = [];
    Object.entries(data).forEach(([key, value], index) => {
      productDetail.push({
        Key: key,
        Id: index,
        ProductName: value.ProductName,
        Stock: value.InStock,
        imageUrl: value.ImageInfo.Link,
      });
    });
    setProductData(productDetail);
  }, []);

  const filterGasRateData = useCallback((data) => {
    let gasRateDetail = {};
    Object.keys(data).forEach((key) => {
      if (key !== "Created") {
        gasRateDetail[key] = data[key];
      }
    });
    setGasRateData(gasRateDetail);
  }, []);

  const filterDeliveryRateData = useCallback((data) => {
    let gasDeliveryRateDetail = {};
    Object.keys(data).forEach((key) => {
      if (key !== "Created") {
        gasDeliveryRateDetail[key] = data[key];
      }
    });
    setDeliveryRateData(gasDeliveryRateDetail);
  }, []);

  useEffect(() => {
    //call to backend for connection
    const socket = openSocket(url, {
      withCredentials: true,
    });

    socket.on("gasRate", (data) => {
      filterGasRateData(data.currentData);
    });

    socket.on("deliveryRate", (data) => {
      filterDeliveryRateData(data.currentData);
    });

    socket.on("productList", (data) => {
      filterProductData(data.ProductList);
    });

    socket.emit("getGasRate");
    socket.emit("getDeliveryRate");
    socket.emit("getProductList");

    return () => {
      socket.disconnect();
    };
  }, []);

  const updateProductList = () => {
    dispatch({
      type: "SET_PRODUCT_LIST",
      productList: productData,
    });
  };

  const updateGasRate = () => {
    dispatch({
      type: "SET_GAS_RATE",
      gasRateData: gasRateData,
    });
  };

  const updateDeliveryRate = () => {
    dispatch({
      type: "SET_DELIVERY_RATE",
      gasDeliveryRateData: deliveryRateData,
    });
  };

  useEffect(() => {
    updateProductList();
  }, [productData]);

  useEffect(() => {
    updateGasRate();
  }, [gasRateData]);

  useEffect(() => {
    updateDeliveryRate();
  }, [deliveryRateData]);

  return (
    <header className="sticky top-0 z-30 bg-white opacity-95 flex flex-row w-full drop-shadow-lg h-16">
      {/* Logo */}

      <div className="flex w-1/4 mx-5 max-lg:hidden">
        <Link
          to={role === "Admin" ? "/Admin/Dashboard" : "/Store"}
          className="flex items-center"
        >
          <img
            className="h-16"
            src={Logo_img}
            alt="Melamchi Online Store Logo"
          />
          <strong className="mx-5">Melamchi Online Store</strong>
        </Link>
      </div>

      <ul className="flex justify-between w-full max-w-screen-lg mx-auto lg:max-w-full">
        <li
          className={`relative m-auto ${
            isHome ? `border-b-4 border-black` : false
          } group`}
        >
          <Link to="/Store" className="block px-2 py-4">
            <HomeIcon className="svg-icons cursor-pointer transition duration-300 transform active:scale-105" />
          </Link>
          <div className="absolute top-5 left-20 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 max-sm:group-hover:opacity-0 transition-opacity duration-300 bg-black py-1 px-2 rounded-md">
            <span className="text-white font-semibold"> Home </span>
          </div>
        </li>

        <li className="relative m-auto group">
          <button onClick={showUserMenu} className="block px-2 py-4">
            <AccountCircleIcon className="svg-icons cursor-pointer transition duration-300 transform active:scale-105" />
          </button>
          <div className="absolute top-0 left-20 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 max-sm:group-hover:opacity-0 transition-opacity duration-300 bg-black py-1 px-2 rounded-md">
            <span className="text-white font-semibold"> User Profile </span>
          </div>
          {/* UserDropDown */}
          {isUserclicked && (
            <UserDropDown status={isUserclicked} className="translate-y-0" />
          )}
        </li>

        <li
          className={`relative flex m-auto ${
            isCart ? "border-b-4 border-black" : ""
          } group `}
        >
          <Link to="/Cart" className="block px-2 py-4">
            <ShoppingCartIcon className="svg-icons cursor-pointer transition duration-300 transform active:scale-105" />
          </Link>

          <strong className="absolute top-2 left-full mr-2 text-lg rounded-full h-7 w-7 flex items-center justify-center">
            {basket?.length}
          </strong>

          <div className="absolute top-5 right-8 transform -translate-x-1/2 opacity-0 transition-opacity duration-300 bg-black py-1 px-2 rounded-md group-hover:opacity-100 max-sm:group-hover:opacity-0">
            <span className="text-white font-semibold"> Cart</span>
          </div>
        </li>

        <div className="relative inline-block z-20">
          <ItemAddedPopOver show={showItemPopOver} />
        </div>
      </ul>
    </header>
  );
};

export default NavBar;
