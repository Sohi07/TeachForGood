import React, { useState } from "react";
import useScrollToTop from "./useScrollToTop";
import { db } from "../firebase"; // make sure firebase is set up
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const NgoSignUp = () => {
  useScrollToTop();

  const [formData, setFormData] = useState({
    ngoName: "",
    contactPerson: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    areaOfWork: "",
    volunteerReqs: "",
    schedule: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "ngos"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      alert("NGO registered successfully!");
      setFormData({ ngoName: "", contactPerson: "", email: "", phone: "", location: "", website: "", areaOfWork: "", volunteerReqs: "", schedule: "", description: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting form.");
    }
  };

  return (
    <div className="container text-center mt-5" style={{ paddingTop: '20px' }}>
      <h2>NGO Registration</h2>
      <p>Fill out the form below to register your NGO.</p>
      <form onSubmit={handleSubmit}>
        <input name="ngoName" value={formData.ngoName} onChange={handleChange} type="text" className="form-control mb-3" placeholder="NGO Name" required />
        <input name="contactPerson" value={formData.contactPerson} onChange={handleChange} type="text" className="form-control mb-3" placeholder="Contact Person Name" required />
        <input name="email" value={formData.email} onChange={handleChange} type="email" className="form-control mb-3" placeholder="Email Address" required />
        <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="form-control mb-3" placeholder="Phone Number" required />
        <input name="location" value={formData.location} onChange={handleChange} type="text" className="form-control mb-3" placeholder="NGO Location" required />
        <input name="website" value={formData.website} onChange={handleChange} type="url" className="form-control mb-3" placeholder="NGO Website (if any)" />
        <select name="areaOfWork" value={formData.areaOfWork} onChange={handleChange} className="form-control mb-3" required>
          <option value="">Areas of Work/Focus</option>
          <option value="Education">Education</option>
          <option value="Health">Health</option>
          <option value="Environment">Environment</option>
          <option value="Community Development">Community Development</option>
          <option value="Others">Others</option>
        </select>
        <textarea name="volunteerReqs" value={formData.volunteerReqs} onChange={handleChange} className="form-control mb-3" placeholder="Volunteer Requirements" rows="3" required />
        <input name="schedule" value={formData.schedule} onChange={handleChange} type="text" className="form-control mb-3" placeholder="Preferred Volunteer Schedule" required />
        <textarea name="description" value={formData.description} onChange={handleChange} className="form-control mb-3" placeholder="Brief Description of NGO" rows="3" required />

        <div className="form-check text-start mb-3">
          <input type="checkbox" className="form-check-input" required />
          <label className="form-check-label">
            The information provided by me is true to the best of my knowledge.
          </label>
        </div>

        <button className="btn btn-success m-3" type="submit">Register NGO</button>
      </form>
    </div>
  );
};

export default NgoSignUp;
