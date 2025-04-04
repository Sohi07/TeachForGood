import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import JoinUs from "./components/JoinUs";
import VolunteerSignUp from "./components/VolunteerSignUP";
import NgoSignUp from "./components/NgoSignUP";
import Login from "./components/Login";
import NGOList from "./components/ngoList";
import ContactUs from "./components/ContactUs";
import SuccessStories from "./components/SuccessStories";
import Faq from "./components/Faq";
import VolunteerDashboard from "./components/VolunteerDashboard";
import NGODashboard from "./components/NGODashboard";
import VolunteerMatching from "./components/VolunteerMatching";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/join-us" element={<JoinUs />} />
              <Route path="/signup/volunteer" element={<VolunteerSignUp />} />
              <Route path="/signup/ngo" element={<NgoSignUp />} />
              <Route path="/ngoList" element={<NGOList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/ContactUs" element={<ContactUs />} />
              <Route path="/SuccessStories" element={<SuccessStories />} />
              <Route path="/Faq" element={<Faq />} />
              <Route
                path="/volunteer-dashboard"
                element={
                  localStorage.getItem("userType") === "Volunteer" ? (
                    <VolunteerDashboard />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route path="/volunteer-matching" element={<VolunteerMatching />} />
              <Route
                path="/ngo-dashboard"
                element={
                  localStorage.getItem("userType") === "NGO" ? (
                    <NGODashboard />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
            </Routes>
          </Layout>
        </main>
      </div>
    </Router>
  );
}

export default App;
