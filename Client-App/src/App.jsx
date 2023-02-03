import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserAuthContextProvider } from "./ContextAPI/UserAuthContext";
import ForgetPassword from "./component/Login_System/ForgetPassword";
import Login from "./component/Login_System/Login";
import ResetPassword from "./component/Login_System/ResetPassword";
import SignUp from "./component/Login_System/SignUp";
import CreateLPGasProduct from "./component/Main_Menu_Page/Admin/Manage_Product/CreateLPGasProduct";
import Menu from "./component/Main_Menu_Page/Menu";
import NavBar from "./component/Main_Menu_Page/NavBar";
import EditGasPrice from "./component/Main_Menu_Page/Admin/Manage_Product/EditGasPrice";
import EditDeiveryPrice from "./component/Main_Menu_Page/Admin/Manage_Product/EditDeiveryPrice";
import Cart from "./component/Main_Menu_Page/Cart";

function App() {
  return (
    <UserAuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* protected route */}
          {/* Manage Product */}
          <Route path="/CreateLPGProduct" element={<CreateLPGasProduct />} />

          <Route path="/EditGasPrice" element={<EditGasPrice />} />

          <Route path="/EditDelivery" element={<EditDeiveryPrice />} />

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
                <Cart/>
              </>
            }
          />
          
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </UserAuthContextProvider>
  );
}

export default App;
