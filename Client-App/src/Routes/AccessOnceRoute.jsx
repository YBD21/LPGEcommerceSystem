import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ForgetPassword from "../component/Login_System/ForgetPassword";
import Login from "../component/Login_System/Login";
import ResetPassword from "../component/Login_System/ResetPassword";
import SignUp from "../component/Login_System/SignUp";
const AccessOnceRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Signup" element={<SignUp />} />
      <Route path="/ForgetPassword" element={<ForgetPassword />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />
      
       {/* Redirect from "/" to "/Store" */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AccessOnceRoute;
