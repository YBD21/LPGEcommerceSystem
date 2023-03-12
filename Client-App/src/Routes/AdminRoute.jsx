import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CreateLPGasProduct from "../component/Main_Menu_Page/Admin/Manage_Products/CreateLPGasProduct";
import Menu from "../component/Main_Menu_Page/Menu";
import NavBar from "../component/Main_Menu_Page/NavBar";
import EditGasPrice from "../component/Main_Menu_Page/Admin/Manage_Prices/EditGasPrice";
import EditDeiveryPrice from "../component/Main_Menu_Page/Admin/Manage_Prices/EditDeiveryPrice";
import Cart from "../component/Main_Menu_Page/Cart";
import Checkout from "../component/Main_Menu_Page/Checkout";
import PageNotFound from "../component/PageNotFound";
import AdminMenu from "../component/Main_Menu_Page/Admin/AdminMenu";
import ViewOrders from "../component/Main_Menu_Page/Admin/Manage_Orders/ViewOrders";
import Dashbord from "../component/Main_Menu_Page/Admin/Dashbord";
import ThankYouPage from "../component/ThankYouPage";

const AdminRoute = () => {
  return (
    <Routes>
      {/* Redirect from "/" to "/Admin/Dashboard" */}
      <Route path="/" element={<Navigate to="/Admin/Dashboard" />} />

      <Route
        path="/Admin/Dashboard"
        element={
          <>
            <NavBar />
            <AdminMenu>
              <Dashbord />
            </AdminMenu>
          </>
        }
      />
      {/* Manage Orders */}
      <Route
        path="/Admin/Manage-Orders/ViewOrders"
        element={
          <>
            <NavBar />
            <AdminMenu>
              <ViewOrders />
            </AdminMenu>
          </>
        }
      />
      {/* Manage Product */}

      <Route
        path="/Admin/Manage-Product/Create-Gas-Product"
        element={
          <>
            <NavBar />
            <AdminMenu>
              <CreateLPGasProduct />
            </AdminMenu>
          </>
        }
      />

      {/* Manage Gas Price */}
      <Route
        path="/Admin/Manage-Gas-Price/Edit-Gas-Price"
        element={
          <>
            <NavBar />
            <AdminMenu>
              <EditGasPrice />
            </AdminMenu>
          </>
        }
      />

      <Route
        path="/Admin/Manage-Gas-Price/Edit-Deivery-Price"
        element={
          <>
            <NavBar />
            <AdminMenu>
              <EditDeiveryPrice />
            </AdminMenu>
          </>
        }
      />

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

      {/* Demo testing here  */}
      <Route
        path="/ThankYou"
        element={
          <>
            <NavBar />
            <ThankYouPage />
          </>
        }
      />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AdminRoute;
