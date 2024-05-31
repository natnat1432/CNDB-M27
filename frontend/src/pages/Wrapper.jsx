import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

//Import pages
import SignIn from "./Login/SignIn";
import Page404 from "./404/Page404";
import SignUp from "./Signup/SignUp";

//Import Layout for React Router Outlet
import Layout from "../components/Layout";
import RequireAuth from "./RequireAuth";
import DashboardWrapper from "./DashboardWrapper";

export default function Wrapper() {
    const location = useLocation();

  return (
    <Routes key={location.pathname} location={location}>
      {/* Public Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<SignIn />} />
      </Route>
      <Route path="/signup" element={<SignUp />}/>
      {/* Protected routes */}
      <Route element={<RequireAuth />}>
        <Route path="/admin/*" element={<DashboardWrapper />} />
      </Route>
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
}
