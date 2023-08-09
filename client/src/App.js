import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Global/Headers/Index.js";
import ProtectedRoutes from "./ProtectedRoutes/UserCheck";
import ErrorPage from "./components/Global/Error";
import AdminCheck from "./ProtectedRoutes/AdminCheck";
import AllUsers from "./components/Admin/AllUsers";
import AdminDashboard from "./components/Admin/Dashboard.js";
import User from "./components/pages/User";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import TestSignup from "./components/pages/Register/TestSignup.jsx";
import UpdateProfile from "./components/pages/User/UpdateProfile";
import AdminHome from "./components/pages/Home/AdminHome.js";
import NewPost from "./components/pages/User/NewPost.js";
import AllPost from "./components/pages/User/AllPost.js";




function App() {
  return (
    <Router>
      <Header />
      

      <Routes>
        {/* Protected routes for user */}
        <Route path="/user" element={<ProtectedRoutes />}>
          <Route path="" element={<User />} />
          <Route path="/user/updateProfile/:id" element={<UpdateProfile />} />
          <Route path="/user/newpost" element={<NewPost />} />
          <Route path="/user/mypost" element={<AllPost />} />
          


        </Route>
        



        {/* Protected routes for admin */}
        <Route path="/admin" element={<AdminCheck />}>
        <Route path="" element={<AdminHome />} />
          <Route path="/admin/allusers" element={<AllUsers />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />


        </Route>


        

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signup" element={<TestSignup />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
