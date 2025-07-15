import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import useScrollToTop from "./useScrollToTop";

const VolunteerDashboard = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const userName = localStorage.getItem("user");
  const userType = localStorage.getItem("userType");
  const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePic") || "profile-icon.jpg");
  const [schedule, setSchedule] = useState([]);

  const volunteerData = {
    skills: ["Web Development", "Graphic Design", "Teaching"],
    availability: "Weekends",
    experience: "2 years",
  };

  useEffect(() => {
    // Replace with your actual data fetching logic
    const dummySchedule = [
      {
        ngoName: "Vidya Kendra",
        date: "2024-03-10",
        time: "2:00 PM - 4:00 PM",
        activity: "Teaching Maths",
      },
      // Add more dummy schedule data or fetch from your API
    ];
    setSchedule(dummySchedule);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    localStorage.removeItem("profilePic");
    navigate("/");
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem("profilePic", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow p-5">
            <div className="text-center">
              <div className="d-flex flex-column align-items-center">
                <div
                  className="position-relative d-inline-block mb-3"
                  style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                >
                  <img
                    src={profilePic || "placeholder-volunteer.png"}
                    alt="Profile"
                    className="rounded-circle"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    className="position-absolute"
                    style={{
                      opacity: 0,
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                    }}
                  />
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", opacity: 0, borderRadius: "50%" }}
                    onMouseEnter={(e) => (e.target.style.opacity = 1)}
                    onMouseLeave={(e) => (e.target.style.opacity = 0)}
                  >
                    <span className="text-white">Upload</span>
                  </div>
                </div>
                <button className="btn btn-primary mt-3" onClick={() => navigate("/volunteer-matching")}>
                  Start Volunteering
                </button>
              </div>

              <h2 className="mt-4">{userName}</h2>
              <p className="text-muted mb-4">{userType}</p>

              <div className="row">
                <div className="col-md-4 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">Skills</h5>
                      <p className="card-text">{volunteerData.skills.join(", ")}</p>
                    </div>
                  </div>
                </div>


                <div className="col-md-4 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">Availability</h5>
                      <p className="card-text">{volunteerData.availability}</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">Experience</h5>
                      <p className="card-text">{volunteerData.experience}</p>
                    </div>
                  </div>
                </div>
              </div>

              {schedule.length > 0 && (
                <div className="card mt-4">
                  <div className="card-body">
                    <h4 className="card-title">My Volunteering Schedule</h4>
                    <ul>
                      {schedule.map((item, index) => (
                        <li key={index}>
                          <strong>{item.ngoName}</strong> - {item.date} - {item.time} ({item.activity})
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {schedule.length === 0 && (
                <div className="card mt-4">
                  <div className="card-body">
                    <p className="card-text">You currently have no volunteering activities scheduled.</p>
                  </div>
                </div>
              )}

              <button className="btn btn-danger mt-4 px-4 py-2" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;