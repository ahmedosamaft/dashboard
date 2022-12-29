import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/BeforeLogin/LoginPage/LoginPage';
import Forget from './components/BeforeLogin/SendCode/Forget';
import Pincode from './components/BeforeLogin/SendCode/Pincode';
import ChangePass from './components/BeforeLogin/ChangePassword/ChangePass';
import Dashboard from './components/Dashboard/mainPage/Dashboard';
import DashboardBody from './components/Dashboard/mainPage/DashboardBody';
import UserTable from './components/Dashboard/UserTable';
import Profile from './components/Dashboard/Profile/Profile';
import Form from './components/BeforeLogin/LoginPage/Form';

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage/>} >
          <Route index element={ <Form />} />
          <Route
            path="/ForgetPassword"
            element={ <Forget /> }
          />
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardBody />} />
          <Route path="customers" element={<UserTable />} />
          <Route
            path="profile"
            element={<Profile />}
          />
        </Route>
        <Route path="/PinCode" element={<Pincode />} />
        <Route path="/changePass" element={<ChangePass />} />
      </Routes>
    </div>
  );
}

export default App;
