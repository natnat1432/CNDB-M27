import React, { useEffect } from "react";
import "../App.css";
import secureLocalStorage from "react-secure-storage";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useLocation, NavLink } from "react-router-dom";

// Auth
import { logOut, selectCurrentUser } from "../features/auth/AuthSlice";
import { showConfirmMessage, showSuccessToast } from "../utility/SwalAlert";

import Breadcrumb from "../components/Breadcrumb";
import Dashboard from "./Dashboard/Dashboard";
import Records from "./Records/Records";
import UploadRecord from "./UploadRecord/UploadRecord";
import Settings from "./Settings/Settings";
import Page404 from "./404/Page404";

import CIA from "../assets/img/cia_logo.png";

export default function DashboardWrapper() {
  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (currentUser == null) {
      dispatch(logOut());
    }
  }, [currentUser]);

  const confirmLogOut = async () => {
    const isLogOut = await showConfirmMessage(
      "Log out",
      "Are you sure you want to log out?",
      "Yes"
    );
    if (isLogOut) {
      function action() {
        dispatch(logOut());
      }
      showSuccessToast("Log out successful", action);
    }
  };

  return (
    // <!-- BEGIN #app -->
    <div id="app" className="app" >
      {/* <!-- BEGIN #header --> */}
      <div id="header" className="app-header">
        {/* <!-- BEGIN desktop-toggler --> */}

        {/* <!-- BEGIN desktop-toggler --> */}

        {/* <!-- BEGIN brand --> */}
        <div className="brand">
          <a href="index.html" className="brand-logo">
            {/* <!-- Change logo here --> */}
            <img
              src={CIA}
              alt=""
              style={{
                margin: "auto",
                width: "30px",
                marginRight: "10px",
              }}
            />

            <span className="brand-text">M27 CNDB</span>
          </a>
        </div>
        {/* <!-- END brand --> */}

        {/* <!-- BEGIN menu --> */}
        <div className="menu">
          <div className="menu-item dropdown dropdown-mobile-full">
            <a
              href="#"
              data-bs-toggle="dropdown"
              data-bs-display="static"
              className="menu-link"
            >
              <div className="menu-text d-sm-block d-none">
                {currentUser.username}
              </div>
            </a>
          </div>
        </div>
        {/* <!-- END menu --> */}
      </div>
      {/* <!-- END #header --> */}

      {/* <!-- BEGIN #sidebar --> */}
      <div id="sidebar" className="app-sidebar">
        {/* <!-- BEGIN scrollbar --> */}
        <div
          className="app-sidebar-content"
          data-scrollbar="true"
          data-height="100%"
        >
          {/* <!-- BEGIN menu --> */}
          <div className="menu">
            <div className="menu-header">Menu</div>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}   `
              }
            >
              <span className="menu-link">
                <span className="menu-icon">
                  <i className="bi bi-grid-3x3"></i>
                </span>
                <span className="menu-text">Dashboard</span>
              </span>
            </NavLink>

            <NavLink
              to="/records"
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}   `
              }
            >
              <span className="menu-link">
                <span className="menu-icon">
                  <i className="fas fa-database"></i>
                </span>
                <span className="menu-text">Records</span>
              </span>
            </NavLink>

            <NavLink
              to="/upload-record"
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}   `
              }
            >
              <span className="menu-link">
                <span className="menu-icon">
                  <i className="bi bi-upload"></i>
                </span>
                <span className="menu-text">Upload Record</span>
              </span>
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}   `
              }
            >
              <span className="menu-link">
                <span className="menu-icon">
                  <i className="fas fa-cogs"></i>
                </span>
                <span className="menu-text">Settings</span>
              </span>
            </NavLink>

            {/* <!-- END menu --> */}
            <div className="p-4 px-5 mt-auto">
              <button
                className="btn d-block btn-outline-theme"
                onClick={() => confirmLogOut()}
              >
                <i className="fas fa-sign-out-alt me-2 ms-n2 opacity-5"></i> Log
                out
              </button>
            </div>
            {/* <!-- END scrollbar --> */}
          </div>
          {/* <!-- END #sidebar --> */}

          {/* <!-- BEGIN mobile-sidebar-backdrop --> */}
          <button
            className="app-sidebar-mobile-backdrop"
            data-toggle-target=".app"
            data-toggle-classname="app-sidebar-mobile-toggled"
          ></button>
          {/* <!-- END mobile-sidebar-backdrop --> */}
        </div>
        {/* <!-- END #app --> */}
      </div>

      {/* <!-- BEGIN #content --> */}
      <div id="content" className="app-content">
        {/* <!-- BEGIN breadcrumbs --> */}
        <Breadcrumb />
        {/* <!-- END breadcrumbs --> */}

        {/* CONTENT HERE */}
        <Routes key={location.pathname} location={location}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/records" element={<Records />} />
          <Route path="/upload-record" element={<UploadRecord />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </div>
      {/* <!-- END #content --> */}
    </div>
  );
}
