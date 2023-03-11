import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Menu from "../component/Main_Menu_Page/Menu";
import NavBar from "../component/Main_Menu_Page/NavBar";
import Cart from "../component/Main_Menu_Page/Cart";
import Checkout from "../component/Main_Menu_Page/Checkout";
import PageNotFound from "../component/PageNotFound";

const ClientRoute = () => {
  return (
    <Routes>
      {/* Client Access */}
      {/* Redirect from "/" to "/Store" */}
      <Route path="/" element={<Navigate to="/Store" />} />
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

export default ClientRoute;
