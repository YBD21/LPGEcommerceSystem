import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CreateLPGasProduct from "../component/Main_Menu_Page/Admin/Manage_Products/CreateLPGasProduct";
import Menu from "../component/Main_Menu_Page/Menu";
import NavBar from "../component/Main_Menu_Page/NavBar";
import EditGasPrice from "../component/Main_Menu_Page/Admin/Manage_Products/EditGasPrice";
import EditDeiveryPrice from "../component/Main_Menu_Page/Admin/Manage_Products/EditDeiveryPrice";
import Cart from "../component/Main_Menu_Page/Cart";
import Checkout from "../component/Main_Menu_Page/Checkout";
import PageNotFound from "../component/PageNotFound";
import AdminDashboard from "../component/Main_Menu_Page/Admin/AdminDashboard";

const AdminRoute = () => {
  return (
    <Routes>
      <Route
        path="/Dashboard"
        element={
          <>
            <NavBar />
            <AdminDashboard />
          </>
        }
      />
      {/* Manage Product */}
      <Route path="/CreateLPGProduct" element={<CreateLPGasProduct />} />

      <Route path="/EditGasPrice" element={<EditGasPrice />} />

      <Route path="/EditDelivery" element={<EditDeiveryPrice />} />

      {/* Redirect from "/" to "/Store" */}
      <Route path="/" element={<Navigate to="/Dashboard" />} />

      {/* Client Access */}
      <Route
        path="/Store"
        element={
          <>
            <NavBar />
            <Menu />
          </>
        }
      />

      <Route
        path="/Cart"
        element={
          <>
            <NavBar />
            <Cart />
          </>
        }
      />

      <Route
        path="/Checkout"
        element={
          <>
            <NavBar />
            <Checkout />
          </>
        }
      />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AdminRoute;
