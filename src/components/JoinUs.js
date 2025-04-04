import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useScrollToTop from "./useScrollToTop";
const JoinUs = () => {
  useScrollToTop();
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center vh-100 position-relative"
      style={{
        backgroundImage: "url('volunteers.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark" style={{ opacity: 0.4 }}></div>

      {/* Content */}
      <div className="position-relative text-white p-4 rounded" style={{ maxWidth: "600px", backdropFilter: "blur(10px)" }}>
        <h1 className="mb-4 fw-bold">Join Us</h1>
        <p className="mb-4">
          Be a part of a movement that empowers education. Join as a volunteer or an NGO and make a difference today!
        </p>
        <div className="d-flex flex-column gap-3">
          <a href="/signup/volunteer" className="btn btn-primary btn-lg fw-semibold shadow">
            Join as Volunteer
          </a>
          <a href="/signup/ngo" className="btn btn-success btn-lg fw-semibold shadow">
            Join as NGO
          </a>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
