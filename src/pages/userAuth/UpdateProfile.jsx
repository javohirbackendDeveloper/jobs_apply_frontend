import React, { useState } from "react";
import {
  MapPin,
  Briefcase,
  BookOpen,
  User,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import UserStore from "../../stores/UserStore";
import "./UpdateProfile.css";
import { Link } from "react-router-dom";
function UpdateProfile() {
  const { user } = UserStore();
  const { updateProfile } = UserStore();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    position: user?.position || "",
    level: user?.level || "",
    about: user?.about || "",
    location: user?.location || "",
    experience: user?.experience || 0,
  });

  const [expandedSection, setExpandedSection] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, position, about, location, experience } = formData;
    const data = { fullName, position, about, location, experience };
    updateProfile(data);
  };

  return (
    <div className="update-profile-container">
      <h1 className="update-profile-title">Update Your Profile</h1>

      <form onSubmit={handleSubmit} className="update-profile-form">
        <div className="form-section">
          <div
            className="section-header"
            onClick={() => toggleSection("picture")}
          >
            <User className="section-icon" size={18} />
            <h2>Profile Picture</h2>
            {expandedSection === "picture" ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </div>
          {expandedSection === "picture" && (
            <div className="section-content">
              <div className="profile-picture-preview">
                <img
                  src={user?.profile_img || "./avatar.jpg"}
                  alt="Profile"
                  className="profile-img"
                />
              </div>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                className="file-input"
              />
              <label htmlFor="profileImage" className="file-input-label">
                Change Photo
              </label>
            </div>
          )}
        </div>

        <div className="form-section">
          <div
            className="section-header"
            onClick={() => toggleSection("basic")}
          >
            <User className="section-icon" size={18} />
            <h2>Basic Information</h2>
            {expandedSection === "basic" ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </div>
          {expandedSection === "basic" && (
            <div className="section-content">
              <div className="input-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="input-group">
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Your job title or position"
                />
              </div>

              <div className="input-group">
                <label htmlFor="level">Level</label>
                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="level-select"
                >
                  <option value="">Select your level</option>
                  <option value="Junior">Junior</option>
                  <option value="Middle">Middle</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="form-section">
          <div
            className="section-header"
            onClick={() => toggleSection("about")}
          >
            <BookOpen className="section-icon" size={18} />
            <h2>About</h2>
            {expandedSection === "about" ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </div>
          {expandedSection === "about" && (
            <div className="section-content">
              <div className="input-group">
                <label htmlFor="about">About You</label>
                <textarea
                  id="about"
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="Tell others about yourself"
                  rows="4"
                />
              </div>
            </div>
          )}
        </div>

        <div className="form-section">
          <div
            className="section-header"
            onClick={() => toggleSection("location")}
          >
            <MapPin className="section-icon" size={18} />
            <h2>Location</h2>
            {expandedSection === "location" ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </div>
          {expandedSection === "location" && (
            <div className="section-content">
              <div className="input-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Where are you based?"
                />
              </div>
            </div>
          )}
        </div>

        <div className="form-section">
          <div
            className="section-header"
            onClick={() => toggleSection("experience")}
          >
            <Briefcase className="section-icon" size={18} />
            <h2>Experience</h2>
            {expandedSection === "experience" ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </div>
          {expandedSection === "experience" && (
            <div className="section-content">
              <div className="input-group">
                <label htmlFor="experience">Your Experience</label>
                <input
                  id="experience"
                  name="experience"
                  type="number"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="How many years of experience do you have?"
                />
              </div>
            </div>
          )}
        </div>

        <div className="form-actions">
          <Link to={"/userProfile"} className="cancel-button">
            Cancel
          </Link>
          <button type="submit" className="save-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfile;
