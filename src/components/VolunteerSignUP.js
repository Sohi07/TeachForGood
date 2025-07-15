import React, { useState, useRef, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth, db } from "../firebase"; // Make sure the path is correct
import { doc, setDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import useScrollToTop from "./useScrollToTop";

const VolunteerSignUp = () => {
  useScrollToTop();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    skills: "",
    availability: [],
    ageGroup: "",
    languages: [],
    bio: "",
    reason: "",
    password: "",
    agree: false,
  });

  const availabilityOptions = [
    "Monday (Morning)", "Monday (Evening)",
    "Tuesday (Morning)", "Tuesday (Evening)",
    "Wednesday (Morning)", "Wednesday (Evening)",
    "Thursday (Morning)", "Thursday (Evening)",
    "Friday (Morning)", "Friday (Evening)",
    "Saturday (Morning)", "Saturday (Evening)",
    "Sunday (Morning)", "Sunday (Evening)",
  ];

  const languagesOptions = [
    "Hindi",
    "English",
    "Bengali",
    "Marathi",
    "Tamil",
    "Telugu",
    "Kannada",
    "Malayalam",
    "Punjabi",
    "Gujarati",
  ];

  const [showAvailabilityDropdown, setShowAvailabilityDropdown] = useState(false);
  const [showLanguagesDropdown, setShowLanguagesDropdown] = useState(false);

  const availabilityDropdownRef = useRef();
  const languagesDropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        availabilityDropdownRef.current && !availabilityDropdownRef.current.contains(e.target)
      ) {
        setShowAvailabilityDropdown(false);
      }

      if (
        languagesDropdownRef.current && !languagesDropdownRef.current.contains(e.target)
      ) {
        setShowLanguagesDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "availability") {
      const updatedAvailability = formData.availability.includes(value)
        ? formData.availability.filter((slot) => slot !== value)
        : [...formData.availability, value];
      setFormData((prev) => ({ ...prev, availability: updatedAvailability }));
    } else if (name === "languages") {
      const updatedLanguages = formData.languages.includes(value)
        ? formData.languages.filter((lang) => lang !== value)
        : [...formData.languages, value];
      setFormData((prev) => ({ ...prev, languages: updatedLanguages }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("Please agree to the terms.");
      return;
    }

          const fullLanguages = formData.languages.includes("Other (Please specify)")
        ? [...formData.languages.filter((l) => l !== "Other (Please specify)"), formData.otherLanguage]
        : formData.languages;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

    await setDoc(doc(db, "volunteers", user.uid), {
  fullName: formData.fullName,
  email: formData.email,
  phone: formData.phone,
  location: formData.location,
  skills: formData.skills,
  availability: formData.availability,
  ageGroup: formData.ageGroup,
  languages: formData.languages,
  bio: formData.bio,
  reason: formData.reason,
  timestamp: serverTimestamp(),
});
      await addDoc(collection(db, "volunteers"), {
        uid: user.uid,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        skills: formData.skills,
        availability: formData.availability.join(", "),
        ageGroup: formData.ageGroup,
        languages: formData.languages.join(", "),
        bio: formData.bio,
        reason: formData.reason,
        timestamp: serverTimestamp(),
      });

      alert("Volunteer registered successfully!");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        skills: "",
        availability: [],
        ageGroup: "",
        languages: [],
        bio: "",
        reason: "",
        password: "",
        agree: false,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Signup failed: " + error.message);
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
       <select
  className="form-control mb-3"
  name="location"
  value={formData.location}
  onChange={handleChange}
  required
>
  <option value="">Select Your City</option>
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
        
        <input type="text" className="form-control mb-3" placeholder="City/Location" name="location" value={formData.location} onChange={handleChange} required />

        <select className="form-control mb-3" name="skills" value={formData.skills} onChange={handleChange} required>
          <option value="">Area of Expertise/Skills</option>
          <option value="Teaching">Teaching</option>
          <option value="Healthcare">Healthcare</option>
          <option value="IT">IT</option>
          <option value="Mentorship">Mentorship</option>
          <option value="Others">Others</option>
        </select>

        {/* Availability Dropdown */}
        <div className="mb-3 text-start" ref={availabilityDropdownRef}>
          <div
            className="form-control"
            style={{ cursor: "pointer" }}
            onClick={() => setShowAvailabilityDropdown(!showAvailabilityDropdown)}
          >
            {formData.availability.length > 0
              ? formData.availability.join(", ")
              : "Select availability"}
          </div>

          {showAvailabilityDropdown && (
            <div
              className="border rounded bg-white mt-1 p-2 shadow"
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                zIndex: 1000,
                position: "absolute",
                width: "100%",
              }}
            >
              {availabilityOptions.map((slot, index) => (
                <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="availability"
                    value={slot}
                    id={`slot-${index}`}
                    checked={formData.availability.includes(slot)}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor={`slot-${index}`}>
                    {slot}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <select className="form-control mb-3" name="ageGroup" value={formData.ageGroup} onChange={handleChange} required>
          <option value="">Preferred Age Group</option>
          <option value="Children">Children</option>
          <option value="Teens">Teens</option>
        </select>

        {/* Languages Spoken Dropdown */}
        <div className="mb-3 text-start" ref={languagesDropdownRef}>
          <div
            className="form-control"
            style={{ cursor: "pointer" }}
            onClick={() => setShowLanguagesDropdown(!showLanguagesDropdown)}
          >
            {formData.languages.length > 0
              ? formData.languages.join(", ")
              : "Select languages spoken"}
          </div>

          {showLanguagesDropdown && (
            <div
              className="border rounded bg-white mt-1 p-2 shadow"
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                zIndex: 1000,
                position: "absolute",
                width: "100%",
              }}
            >
              {languagesOptions.map((lang, index) => (
                <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="languages"
                    value={lang}
                    id={`lang-${index}`}
                    checked={formData.languages.includes(lang)}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor={`lang-${index}`}>
                    {lang}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

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
