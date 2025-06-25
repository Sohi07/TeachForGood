import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import useScrollToTop from "./useScrollToTop";

const Login = () => {
  useScrollToTop();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password || !userType) {
      alert("Please select user type and enter email and password!");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      localStorage.setItem("user", user.email);
      localStorage.setItem("userType", userType);

      if (userType === "Volunteer") {
        navigate("/volunteer-dashboard");
      } else if (userType === "NGO") {
        navigate("/ngo-dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 w-100"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/LoginImg.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: "'Segoe UI', sans-serif",
        position: "relative",
      }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundColor: "rgba(14, 38, 42, 0.27)",
        }}
      ></div>

      <div
        className="position-relative p-5 w-100"
        style={{
          maxWidth: "400px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#2c3e50" }}>
          Welcome Back!
        </h2>

        <div className="d-flex gap-3 mb-4">
          <button
            className={`btn flex-grow-1 ${userType === "Volunteer" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setUserType("Volunteer")}
          >
            Volunteer
          </button>
          <button
            className={`btn flex-grow-1 ${userType === "NGO" ? "btn-success" : "btn-outline-success"}`}
            onClick={() => setUserType("NGO")}
          >
            NGO
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="emailInput"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="emailInput">Email</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="passwordInput">Password</label>
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
