
import React from "react";

import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import Forget from "./components/SendCode/Forget";
import Pincode from "./components/SendCode/Pincode";
import ChangePass from "./components/ChangePassword/ChangePass";
import Dashboard from "./components/Dashboard/Dashboard";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ForgetPass" element={<Forget />} />
        <Route path="/PinCode" element={<Pincode />} />
        <Route path="/changePass" element={<ChangePass />} />
      </Routes>
    </div>
  );
}

export default App;
