import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgetPassword from "./component/Login_System/ForgetPassword";
import Login from "./component/Login_System/Login";
import SignUp from "./component/Login_System/SignUp";
import { Main } from "./component/Main_Page/Main";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* protected route */}
        <Route path="/Main" element={<Main />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/ForgetPassword" element = {<ForgetPassword/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
