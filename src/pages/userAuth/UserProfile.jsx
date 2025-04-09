import React from "react";
import "./UserProfile.css";
import UserStore from "../../stores/UserStore";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const { user } = UserStore();
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const handleUpdateProfile = () => {
    navigate("/updateProfile");
  };
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-img-container">
          <img
            src={user?.profile_img ? user.profile_img : "./avatar.jpg"}
            alt="Profile"
            className="profile-img"
          />
        </div>
        <div className="profile-info">
          <h2 className="full-name">{user?.fullName}</h2>
          <div className="location-info">
            {user?.location && (
              <>
                <span className="location-icon">📍</span>
                <span>{user?.location}</span>
              </>
            )}
          </div>
          <p className="created-at">Joined on: {formatDate(user?.createdAt)}</p>
        </div>
        <div className="update-profile-link">
          <button onClick={handleUpdateProfile} className="update-profile-btn">
            Update Profile
          </button>
        </div>
      </div>

      <div className="profile-details">
        <h3>Profile Details</h3>
        <div className="detail">
          <strong>Position:</strong> {user?.position}
        </div>
        <div className="detail">
          <strong>Email:</strong> {user?.email}
        </div>
        <div className="detail">
          {user?.phone_number ? (
            <>
              <strong>Phone:</strong> {user?.phone_number}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
