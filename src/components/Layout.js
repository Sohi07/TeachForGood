// src/components/Layout.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css"; // Make sure your styles load

const Layout = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path) => pathname === path;

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 fixed-top">
        <Link className="navbar-brand text-primary fw-bold" to="/">
          Teach for Good
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item mx-4">
              <Link className={`nav-link ${isActive("/") ? "active-nav" : ""}`} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item mx-4">
              <Link className={`nav-link ${isActive("/ngoList") ? "active-nav" : ""}`} to="/ngoList">
                NGOs
              </Link>
            </li>
            <li className="nav-item mx-4">
              <Link
                className={`nav-link ${pathname === "/" && location.state?.scrollTo === "success" ? "active-nav" : ""}`}
                to="/"
                state={{ scrollTo: "success" }}
              >
                Success Stories
              </Link>
            </li>
            <li className="nav-item mx-4">
              <Link className={`nav-link ${isActive("/ContactUs") ? "active-nav" : ""}`} to="/ContactUs">
                Contact Us
              </Link>
            </li>
            <li className="nav-item mx-4">
              <Link className={`nav-link ${isActive("/Faq") ? "active-nav" : ""}`} to="/Faq">
                FAQs
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/login" className="btn btn-primary">Login</Link>
      </nav>

      {/* Page Content */}
      {children}

      <Footer />
    </div>
  );
};

export default Layout;





