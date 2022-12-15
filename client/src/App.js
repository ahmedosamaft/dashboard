import React from "react";

import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import Forget from "./components/SendCode/Forget";
import Pincode from "./components/SendCode/Pincode";
import ChangePass from "./components/ChangePassword/ChangePass";
import Dashboard from "./components/Dashboard/Dashboard";
import DashboardBody from "./components/Dashboard/DashboardBody";
import UserTable from "./components/Dashboard/UserTable";
import Profile from "./components/Dashboard/Profile/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard">
          <Route index element={<Dashboard childern={<DashboardBody />} />} />
          <Route
            path="/dashboard/customers"
            element={<Dashboard childern={<UserTable />} />}
          />
          <Route
            path="/dashboard/profile"
            element={<Dashboard childern={<Profile />} />}
          />
        </Route>
        <Route path="/ForgetPass" element={<Forget />} />
        <Route path="/PinCode" element={<Pincode />} />
        <Route path="/changePass" element={<ChangePass />} />
      </Routes>
    </div>
  );
}

export default App;
