import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserAuthContextProvider } from "../src/ContextAPI/UserAuthContext";
import ForgetPassword from "./component/Login_System/ForgetPassword";
import Login from "./component/Login_System/Login";
import ResetPassword from "./component/Login_System/ResetPassword";
import SignUp from "./component/Login_System/SignUp";
import Product from "./component/Main_Menu_Page/Product";




function App() {
  return (
    <UserAuthContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* protected route */}
        <Route path="/Store" element={<Product />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/ForgetPassword" element = {<ForgetPassword/>}/>
        <Route path="/ResetPassword" element = {<ResetPassword/>}/>
      </Routes>
    </BrowserRouter>
    </UserAuthContextProvider>
  );
}

export default App;
