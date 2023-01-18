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


function App() {
  return (
    <UserAuthContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        {/* protected route */}
        <Route path="/CreateLPGProduct" element={<CreateLPGasProduct/>} />
        
        <Route path="/Store" element={
          <>
        <NavBar/>
        <Menu/>
          </>
        } />
        <Route path="/Signup" element={<SignUp/>} />
        <Route path="/ForgetPassword" element = {<ForgetPassword/>}/>
        <Route path="/ResetPassword" element = {<ResetPassword/>}/>
      </Routes>
    </BrowserRouter>
    </UserAuthContextProvider>
  );
}

export default App;
