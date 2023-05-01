import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useStateValue } from "../../../ContextAPI/StateProvider";
import openSocket from "socket.io-client";
import { url } from "../../../instance";
import Loading from "../../Loading";
const Dashboard = () => {
  const [{ userData, productList }] = useStateValue();
  const [isLoading, setIsLoading] = useState(true); // to testing set false
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    if (productList) {
      setProductCount(Object.keys(productList).length);
    }
  }, [productList]);

  useEffect(() => {
    //call to backend for connection
    const socket = openSocket(url, {
      query: {
        userId: userData?.id,
        userRole: userData?.role,
      },
    });

    socket.on("updateAdminDashBoard", (data) => {
      const { orderTotalCount, userTotalCount } = data;
      setOrderCount(orderTotalCount);
      setUserCount(userTotalCount);
      setIsLoading(false); // set loading to false when data is fetched
      // console.log(data);
    });

    // emit the event to listen for updates
    socket.emit("AdminDashBoard");

    return () => {
      socket.disconnect();
    };
  }, []);

  if (isLoading) {
    return <Loading />; // render loading component when isLoading is true
  }

  return (
    <div className="flex-1 p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mt-2 ml-2 mb-8">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Total Product */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-center">
            {" "}
            Total Product
          </h3>
          <p className="text-black text-2xl font-semibold text-center px-4 py-8">
            {productCount}
          </p>
          <Link
            to="/Admin/Manage-Product/View-Gas-Product"
            className="w-full flex justify-center py-2 bg-gray-100 hover:bg-gray-200 transition duration-300 rounded-lg"
          >
            <p className="text-gray-600 font-semibold">More Info</p>
            <ArrowRightAltIcon className="svg-icons ml-8 text-gray-600" />
          </Link>
        </div>
        {/* Total Orders */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Total Orders
          </h3>
          <p className="text-black text-2xl font-semibold text-center px-4 py-8">
            {orderCount}
          </p>
          <Link
            to="/Admin/Manage-Orders/ViewOrders"
            className="w-full flex justify-center py-2 bg-gray-100 hover:bg-gray-200 transition duration-300 rounded-lg"
          >
            <p className="text-gray-600 font-semibold">More Info</p>
            <ArrowRightAltIcon className="svg-icons ml-8 text-gray-600" />
          </Link>
        </div>
        {/* Total Users */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Total Users
          </h3>
          <p className="text-black text-2xl font-semibold text-center px-4 py-8">
            {userCount}
          </p>
          <Link
            to="/Admin/Manage-Users/View-User"
            className="w-full flex justify-center py-2 bg-gray-100 hover:bg-gray-200 transition duration-300 rounded-lg"
          >
            <p className="text-gray-600 font-semibold">More Info</p>
            <ArrowRightAltIcon className="svg-icons ml-8 text-gray-600" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
