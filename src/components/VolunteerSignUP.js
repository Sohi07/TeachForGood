import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase"; // adjust path if needed
import useScrollToTop from "./useScrollToTop";

const VolunteerSignUp = () => {
  useScrollToTop();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    skills: "",
    availability: "",
    ageGroup: "",
    languages: "",
    bio: "",
    reason: "",
    password: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("Please agree to the terms.");
      return;
    }

    try {
      await addDoc(collection(db, "volunteers"), {
        ...formData,
        timestamp: serverTimestamp(),
      });
      alert("Volunteer registered successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        skills: "",
        availability: "",
        ageGroup: "",
        languages: "",
        bio: "",
        reason: "",
        password: "",
        agree: false,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Try again later.");
    }
  };

  return (
    <div className="container text-center mt-5" style={{ paddingTop: "20px" }}>
      <h2>Volunteer Registration</h2>
      <p>Fill out the form below to become a volunteer.</p>
      <form onSubmit={handleSubmit}>
        <input type="text" className="form-control mb-3" placeholder="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
        <input type="email" className="form-control mb-3" placeholder="Email Address" name="email" value={formData.email} onChange={handleChange} required />
        <input type="tel" className="form-control mb-3" placeholder="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required />
        <input type="text" className="form-control mb-3" placeholder="City/Location" name="location" value={formData.location} onChange={handleChange} required />
        
        <select className="form-control mb-3" name="skills" value={formData.skills} onChange={handleChange} required>
          <option value="">Area of Expertise/Skills</option>
          <option value="Teaching">Teaching</option>
          <option value="Healthcare">Healthcare</option>
          <option value="IT">IT</option>
          <option value="Mentorship">Mentorship</option>
          <option value="Others">Others</option>
        </select>

        <input type="text" className="form-control mb-3" placeholder="Availability (Days and Time)" name="availability" value={formData.availability} onChange={handleChange} required />

        <select className="form-control mb-3" name="ageGroup" value={formData.ageGroup} onChange={handleChange} required>
          <option value="">Preferred Age Group</option>
          <option value="Children">Children</option>
          <option value="Teens">Teens</option>
        </select>

        <input type="text" className="form-control mb-3" placeholder="Languages Spoken" name="languages" value={formData.languages} onChange={handleChange} required />
        <textarea className="form-control mb-3" placeholder="Brief Bio/About You (Optional)" name="bio" rows="3" value={formData.bio} onChange={handleChange}></textarea>
        <textarea className="form-control mb-3" placeholder="Why do you want to volunteer?" name="reason" rows="3" value={formData.reason} onChange={handleChange} required></textarea>
        <input type="password" className="form-control mb-3" placeholder="Create Password" name="password" value={formData.password} onChange={handleChange} required />

        <div className="d-flex justify-content-start mb-3">
          <div className="form-check">
            <input type="checkbox" className="form-check-input me-2" name="agree" checked={formData.agree} onChange={handleChange} required />
            <label className="form-check-label text-start">
              The information provided by me is true to the best of my knowledge.
            </label>
          </div>
        </div>

        <button className="btn btn-primary m-3" type="submit">
          Join as Volunteer
        </button>
      </form>
    </div>
  );
};

export default VolunteerSignUp;
