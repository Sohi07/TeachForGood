import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useScrollToTop from "./useScrollToTop";
import { Link } from "react-router-dom";

const JoinUs = () => {
  useScrollToTop();

  return (
    <div
      className="d-flex align-items-center justify-content-center text-center vh-100 position-relative px-3"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/volunteers.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      ></div>

      {/* Card Content */}
      <div
        className="position-relative text-white p-5 rounded-4 shadow"
        style={{
          maxWidth: "600px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
        }}
      >
        <h1 className="mb-3 fw-bold" style={{ fontSize: "2.2rem" }}>
          Join the Movement
        </h1>
        <p className="mb-4" style={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
          Empower education and inspire lives. Become a volunteer or collaborate as an NGO to shape a better future.
        </p>
        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
          <Link
            to="/signup/volunteer"
            className="btn btn-primary btn-lg fw-semibold shadow px-4"
          >
            Join as Volunteer
          </Link>
          <Link
            to="/signup/ngo"
            className="btn btn-success btn-lg fw-semibold shadow px-4"
          >
            Join as NGO
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
