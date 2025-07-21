import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import useScrollToTop from "./useScrollToTop";

const Login = () => {
  useScrollToTop();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !userType) {
      setError("Please select user type and enter email and password.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth,email,password);
      const user = userCredential.user;
      const uid = user.uid;

      const docRef = doc(db, userType === "Volunteer" ? "volunteers" : "ngos", uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setError("No profile found. Please enter correct credentials.");
        return;
      }

    localStorage.setItem("userId", uid);
    localStorage.setItem("userType", userType);
    localStorage.setItem("userEmail", email);

     const userData = docSnap.data();
    if (userType === "Volunteer") {
      localStorage.setItem("user", userData.fullName || "");
      localStorage.setItem("userSkills", userData.skills || "");
      localStorage.setItem("userLanguages", JSON.stringify(userData.languages || []));
      navigate("/volunteer-dashboard");
    } else if (userType === "NGO") {
      localStorage.setItem("user", userData.organizationName || "");
      navigate("/ngo-dashboard");
    }
    } catch (error) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-email" ||
        error.code === "auth/invalid-credential"
      ) {
        setError("Invalid email or password.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Check your inbox.");
    } catch (error) {
      console.error("Reset error:", error);
      setError("Error sending reset email. Make sure the email is correct.");
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
        style={{ backgroundColor: "rgba(14, 38, 42, 0.27)" }}
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
            className={`btn flex-grow-1 ${
              userType === "Volunteer" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setUserType("Volunteer")}
          >
            Volunteer
          </button>
          <button
            className={`btn flex-grow-1 ${
              userType === "NGO" ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setUserType("NGO")}
          >
            NGO
          </button>
        </div>

        {error && (
          <div className="alert alert-danger text-center py-0" role="alert">
            {error}
          </div>
        )}

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

          <div className="text-end mb-3">
            <button
              type="button"
              className="btn btn-link p-0 text-decoration-none"
              onClick={handleResetPassword}
              style={{ fontSize: "0.9rem", color: "#007bff" }}
            >
              Forgot Password?
            </button>
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
