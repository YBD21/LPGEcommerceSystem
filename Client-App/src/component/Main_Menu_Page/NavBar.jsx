import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import { Link, useLocation } from "react-router-dom";
import Logo_img from "../../dist/image/Logo.png";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useStateValue } from "../../ContextAPI/StateProvider";
import UserDropDown from "./UserSystem/UserDropDown";

const NavBar = () => {
  const location = useLocation();
  const [{ basket }, dispatch] = useStateValue();
  const [productData, setProductData] = useState(null);
  const [gasRateData, setGasRateData] = useState(null);
  const [deliveryRateData, setDeliveryRateData] = useState(null);

  const [isUserclicked, setIsUserClicked] = useState(false);

  const [isHome, setIsHome] = useState(true);
  const [isCart, setIsCart] = useState(false);

  useEffect(() => {
    setIsCart(location.pathname === "/Cart");
    setIsHome(location.pathname === "/Store");
  }, [location]);

  const showUserMenu = () => {
    setIsUserClicked(!isUserclicked);
  };

  const filterProductData = (data) => {
    let productDetail = [];
    Object.entries(data).map(([key, value], index) => {
      productDetail.push({
        Key: key,
        Id: index,
        ProductName: value.ProductName,
        Stock: value.InStock,
        imageUrl: value.ImageInfo.Link,
      });
      // console.log(productDetail);
      setProductData(productDetail);
    });
  };

  const filterGasRateData = (data) => {
    let gasRateDetail = {};
    Object.keys(data).forEach((key) => {
      if (key !== "Created") {
        gasRateDetail[key] = data[key];
      }
    });
    // console.log(gasRateDetail);
    setGasRateData(gasRateDetail);
  };

  const filterDeliveryRateData = (data) => {
    let gasDeliveryRateDetail = {};
    Object.keys(data).forEach((key) => {
      if (key !== "Created") {
        gasDeliveryRateDetail[key] = data[key];
      }
    });
    // console.log(gasDeliveryRateDetail);
    setDeliveryRateData(gasDeliveryRateDetail);
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
    <header className="sticky top-0 z-30 bg-white opacity-95 flex flex-row w-full drop-shadow-lg">
      {/* Logo */}

      <div className="w-full m-auto max-lg:w-1/2">
        <Link to={"/Dashboard"}>
          <img
            className="w-16"
            src={Logo_img}
            alt="Melamchi Online Store Logo"
          />
        </Link>
      </div>

      <ul className="flex justify-between w-1/2 max-lg:w-full">
        <li
          className={`m-auto px-2 py-5 ${
            isHome ? `border-b-4 border-black` : false
          }`}
        >
          <Link to="/Store">
            <HomeIcon className="svg-icons transition duration-300 transform active:scale-95" />
          </Link>
        </li>
        <li className="svg-icons m-auto transition duration-300 transform active:scale-105 cursor-pointer">
          <NotificationsIcon />
        </li>
        <li className="m-auto">
          <button onClick={showUserMenu}>
            <AccountCircleIcon className="svg-icons transition duration-300 transform active:scale-105" />
          </button>
        </li>
        <li
          className={`m-auto px-2 py-5 ${
            isCart ? `border-b-4 border-black` : false
          }`}
        >
          <Link to="/Cart">
            <ShoppingCartIcon className="relative svg-icons transition duration-300 transform active:scale-105" />
            <strong className="absolute top-2 right-[2.5%] text-lg">
              {basket?.length}
            </strong>
          </Link>
        </li>
      </ul>

      {/* UserDropDown */}
      {isUserclicked && (
        <UserDropDown status={isUserclicked} className="translate-y-0" />
      )}
    </header>
  );
};

export default NavBar;
