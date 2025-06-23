import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useScrollToTop from "./useScrollToTop";
import { Link } from "react-router-dom"; 

const JoinUs = () => {
  useScrollToTop();

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center vh-100 position-relative"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/volunteers.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark" style={{ opacity: 0.4 }}></div>

      {/* Content */}
      <div
  className="position-relative text-white p-4 rounded-4"
  style={{
    maxWidth: "600px",
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
  }}
>
        <h1 className="mb-4 fw-bold">Join Us</h1>
        <p className="mb-4">
          Be a part of a movement that empowers education. Join as a volunteer or an NGO and make a difference today!
        </p>
        <div className="d-flex flex-column gap-3">
          <Link to="/signup/volunteer" className="btn btn-primary btn-lg fw-semibold shadow">
            Join as Volunteer
          </Link>
          <Link to="/signup/ngo" className="btn btn-success btn-lg fw-semibold shadow">
            Join as NGO
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
