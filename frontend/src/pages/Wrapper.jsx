import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

//Import pages
import SignIn from "./Login/SignIn";
import Page404 from "./404/Page404";

//Import Layout for React Router Outlet
import Layout from "../components/Layout";
import RequireAuth from "./RequireAuth";
import DashboardWrapper from "./DashboardWrapper";

export default function Wrapper() {
    const location = useLocation();

  return (
    <Routes key={location.pathname} location={location}>
      {/* Public Routes */}
      <Route path="/signin" element={<Layout />}>
        <Route index element={<SignIn />} />
      </Route>
      {/* Protected routes */}
      <Route element={<RequireAuth />}>
        <Route path="/*" element={<DashboardWrapper />} />
      </Route>
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
}
