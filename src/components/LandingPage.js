
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import useScrollToTop from "./useScrollToTop";
const LandingPage = () => {
  useScrollToTop();
  return (
    <div className="position-relative text-white text-center">
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/volunteers.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.7)",
          zIndex:-1
        }}
      ></div>
      {/* Hero Section */}
      <div className="container position-relative z-2 d-flex flex-column align-items-center justify-content-center vh-100">
        <h5 className="text-uppercase">
        <span>
  Empower Change with <span style={{ color: "rgb(115, 188, 240)", fontStyle: "" }}>Teach for Good</span>

</span>
        </h5>
        <h1 className="display-4 fw-bold">Join Hands to <br /> Transform Education</h1>
        <p className="lead mx-auto w-75">
          Teach for Good connects passionate volunteers with NGOs dedicated to enhancing educational opportunities.
        </p>
        <Link to="/join-us" className="btn btn-primary btn-lg mt-3">Join Us</Link>
      </div>

      {/* Success Stories Preview Section */}
     
    </div>
  );
};

export default LandingPage;