import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import useScrollToTop from "./useScrollToTop";

const VolunteerDashboard = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const userName = localStorage.getItem("user");
  const userType = localStorage.getItem("userType");
  const [profilePic, setProfilePic] = useState(localStorage.getItem("profilePic") || "profile-icon.jpg");

  const [volunteerData, setVolunteerData] = useState({
    fullName: "",
    email: "",
    skills: "",
    languages: [],
  });

  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchVolunteer = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        navigate("/login");
        return;
      }

      try {
        const docRef = doc(db, "volunteers", userId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setVolunteerData({
            fullName: data.fullName || localStorage.getItem("user"),
            email: data.email || localStorage.getItem("userEmail"),
            skills: data.skills || "",
            languages: Array.isArray(data.languages) 
              ? data.languages 
              : (typeof data.languages === 'string' ? [data.languages] : []),
          });
        }
      } catch (err) {
        console.error("Error fetching volunteer:", err);
      }
    };

    fetchVolunteer();

    // Dummy schedule for now
    setSchedule([
      {
        ngoName: "Vidya Kendra",
        date: "2025-08-10",
        time: "2:00 PM - 4:00 PM",
        activity: "Teaching Maths",
      },
    ]);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Simple validation
    if (!file.type.match("image.*")) {
      alert("Please select an image file (JPEG, PNG, etc.)");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      setProfilePic(result);
      localStorage.setItem("profilePic", result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow p-5 text-center">
            <div className="d-flex flex-column align-items-center">
              <div className="position-relative mb-3">
                <div style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  position: "relative",
                  border: "3px solid #f0f0f0"
                }}>
                  <img
                    src={profilePic}
                    alt="Profile"
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover" 
                    }}
                  />
                  <label htmlFor="profile-upload" style={{
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    background: "rgba(0,0,0,0.5)",
                    color: "white",
                    padding: "5px",
                    cursor: "pointer",
                    fontSize: "0.8rem"
                  }}>
                    Change Photo
                  </label>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    style={{
                      display: "none"
                    }}
                  />
                </div>
              </div>

              <button className="btn btn-primary mt-3" onClick={() => navigate("/volunteer-matching")}>
                Start Volunteering
              </button>
            </div>

            {/* Rest of your existing JSX remains the same */}
            <h2 className="mt-4">{volunteerData.fullName || userName}</h2>
            <p className="text-muted">{userType}</p>

            <div className="row mt-4">
              <div className="col-md-4 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Email</h5>
                    <p className="card-text">{volunteerData.email}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Skills</h5>
                    <p className="card-text">{volunteerData.skills}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Languages</h5>
                    <p className="card-text">{volunteerData.languages.join(", ")}</p>
                  </div>
                </div>
              </div>
            </div>

            {schedule.length > 0 ? (
              <div className="card mt-4">
                <div className="card-body">
                  <h4 className="card-title">My Volunteering Schedule</h4>
                  <ul className="list-unstyled">
                    {schedule.map((item, idx) => (
                      <li key={idx}>
                        <strong>{item.ngoName}</strong> - {item.date} - {item.time} ({item.activity})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
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
  );
};

export default VolunteerDashboard;