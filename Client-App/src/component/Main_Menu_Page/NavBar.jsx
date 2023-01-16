import React from 'react'
import Logo_img from "../../dist/image/Logo.png";

import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const NavBar = () => {
  return (
     <header className="sticky top-0 z-30 bg-white opacity-95 flex flex-row w-full drop-shadow-lg">
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
  )
}

export default NavBar