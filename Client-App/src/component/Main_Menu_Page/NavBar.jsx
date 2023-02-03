import React from "react";
import { Link } from "react-router-dom";
import Logo_img from "../../dist/image/Logo.png";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useStateValue } from "../../ContextAPI/StateProvider";

const NavBar = () => {
  const [{ basket }] = useStateValue();
  return (
    <header className="sticky top-0 z-30 bg-white opacity-95 flex flex-row w-full drop-shadow-lg">
      {/* Logo */}

      <div className="w-full m-auto">
        <Link to={"/Store"}>
          <img
            className="w-16"
            src={Logo_img}
            alt="Melamchi Online Store Logo"
          />
        </Link>
      </div>

      <div className=" w-1/2 max-lg:w-full flex justify-between flex-row m-auto">
        <NotificationsIcon className="svg-icons m-auto" />
        <AccountCircleIcon className="svg-icons m-auto" />
        <Link className="m-auto" to="/Cart">
          <ShoppingCartIcon className="relative svg-icons" />
          <strong className="absolute top-2 right-[3.75%] text-lg">
            {" "}
            {basket?.length}{" "}
          </strong>
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
