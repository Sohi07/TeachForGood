import React, { useState } from "react";
import useScrollToTop from "./useScrollToTop";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const NgoSignUp = () => {
  useScrollToTop();

  const [formData, setFormData] = useState({
    ngoName: "",
    contactPerson: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    website: "",
    areaOfWork: "",
    volunteerReqs: "",
    schedule: "",
    description: "",
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
      alert("Please confirm the information is accurate.");
      return;
    }

    try {
      // 1. Create account in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // 2. Store details in Firestore
      await setDoc(doc(db, "ngos", user.uid), {
        uid: user.uid,
        ngoName: formData.ngoName,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        website: formData.website,
        areaOfWork: formData.areaOfWork,
        volunteerReqs: formData.volunteerReqs,
        schedule: formData.schedule,
        description: formData.description,
        createdAt: serverTimestamp(),
      });

      alert("NGO registered successfully!");

      // Reset form
      setFormData({
        ngoName: "",
        contactPerson: "",
        email: "",
        password: "",
        phone: "",
        location: "",
        website: "",
        areaOfWork: "",
        volunteerReqs: "",
        schedule: "",
        description: "",
        agree: false,
      });
    } catch (error) {
      console.error("Error registering NGO:", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="container text-center mt-5" style={{ paddingTop: "20px" }}>
      <h2>NGO Registration</h2>
      <p>Fill out the form below to register your NGO.</p>
      <form onSubmit={handleSubmit}>
        <input name="ngoName" value={formData.ngoName} onChange={handleChange} type="text" className="form-control mb-3" placeholder="NGO Name" required />
        <input name="contactPerson" value={formData.contactPerson} onChange={handleChange} type="text" className="form-control mb-3" placeholder="Contact Person Name" required />
        <input name="email" value={formData.email} onChange={handleChange} type="email" className="form-control mb-3" placeholder="Email Address" required />
        <input name="password" value={formData.password} onChange={handleChange} type="password" className="form-control mb-3" placeholder="Create Password" required />
        <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="form-control mb-3" placeholder="Phone Number" required />
        <select
  name="location"
  value={formData.location}
  onChange={handleChange}
  className="form-control mb-3"
  required
>
  <option value="">Select NGO Location</option>
  <option value="Delhi">Delhi</option>
  <option value="Mumbai">Mumbai</option>
  <option value="Bangalore">Bangalore</option>
  <option value="Hyderabad">Hyderabad</option>
  <option value="Ranchi">Ranchi</option>
  <option value="Kolkata">Kolkata</option>
  <option value="Chennai">Chennai</option>
  <option value="Pune">Pune</option>
  <option value="Ahmedabad">Ahmedabad</option>
  <option value="Jaipur">Jaipur</option>
</select>
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
          <input type="checkbox" className="form-check-input" name="agree" checked={formData.agree} onChange={handleChange} required />
          <label className="form-check-label">
            The information provided by me is true to the best of my knowledge.
          </label>
        </div>

        <button className="btn btn-success m-3" type="submit">
          Register NGO
        </button>
      </form>
    </div>
  );
};

export default NgoSignUp;
