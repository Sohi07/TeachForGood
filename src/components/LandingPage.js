import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import useScrollToTop from "./useScrollToTop";
import SuccessStories from "./SuccessStories";
import "../App.css"; // Custom styles

const LandingPage = () => {
  useScrollToTop();

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section position-relative text-white text-center d-flex flex-column justify-content-center align-items-center">
        {/* Background Image */}
        <div
          className="hero-bg position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/volunteers.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.38)", // dark overlay
              zIndex: 1,
            }}
          ></div>
        </div>

        {/* Hero Text */}
        <div className="container position-relative z-2">
          <h5
            className="text-uppercase"
            style={{
              color: "#fff",
              textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
            }}
          >
            Empower Change with{" "}
            <span style={{ color: "rgb(115, 188, 240)" }}>Teach for Good</span>
          </h5>
          <h1
            className="display-4 fw-bold"
            style={{
              color: "#fff",
              textShadow: "2px 2px 6px rgba(0,0,0,0.6)",
            }}
          >
            Join Hands to <br /> Transform Education
          </h1>
          <p
            className="lead mx-auto w-75"
            style={{
              color: "#fff",
              textShadow: "1px 1px 4px rgba(0,0,0,0.6)",
            }}
          >
            Teach for Good connects passionate volunteers with NGOs dedicated
            to enhancing educational opportunities.
          </p>
          <Link to="/join-us" className="btn btn-primary btn-lg mt-3">
            Join Us
          </Link>
        </div>
      </div>

        {/* About Section */}
   <div
  className="container py-5 text-dark"
  style={{
    background: "rgba(224, 247, 250, 0.82)", 
    zIndex: 2,
    position: "relative",
    
  }}
>
  <div className="row justify-content-center">
    <div className="col-md-10 text-center">
      <h2 className="fw-bold mb-4">About Teach for Good</h2>
      <p className="lead">
        At <strong>Teach for Good</strong>, we believe that quality education is a right, not a privilege. Our mission is to bridge the gap between passionate educators and the communities that need them most.
      </p>
      <p>
        We empower volunteers by connecting them with NGOs where they can make a lasting impact—by teaching, mentoring, and inspiring students beyond the classroom.
      </p>
    </div>
  </div>
</div>

      {/* Features Section */}
<div className="container-fluid py-5 text-dark bg-white">
  <div className="container">
    <div className="text-center mb-5">
      <h2 className="fw-bold">How It Works</h2>
      <p className="text-muted">A simple process to make a real difference</p>
    </div>
    <div className="row g-4">
      {[
        {
          title: "Sign Up & Customize",
          text: "Volunteers register and specify their location, availability, and teaching preferences.",
          icon: "📝",
        },
        {
          title: "Get Matched with NGOs",
          text: "Our platform intelligently matches volunteers with NGOs based on mutual preferences.",
          icon: "🔗",
        },
        {
          title: "Start Teaching & Inspiring",
          text: "Begin your journey of impact by teaching and empowering students in need.",
          icon: "📚",
        },
      ].map((feature, index) => (
        <div className="col-md-4" key={index}>
          <div className="card feature-card h-100 border-0">
            <div className="card-body text-center">
              <div className="display-4 mb-3">{feature.icon}</div>
              <h5 className="card-title fw-bold">{feature.title}</h5>
              <p className="card-text">{feature.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

      {/* Success Stories Section */}
      <div id ="success-stories"className="bg-light py-5 text-dark">
        <SuccessStories />
      </div>
    </div>
  );
};

export default LandingPage;
