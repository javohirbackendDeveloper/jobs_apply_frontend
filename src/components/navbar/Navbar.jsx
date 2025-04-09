import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import UserStore from "../../stores/UserStore";
import { companyStore } from "../../stores/CompanyStore";

function Navbar() {
  const { user, logout } = UserStore();
  const { company, logoutCompany } = companyStore();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    if (user) {
      logout();
    } else if (company) {
      logoutCompany();
    }
    navigate("/");
    setDropdownOpen(false);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to={"/"} className="brand-name">
          Codify
        </Link>
      </div>
      <div className="navbar-center">
        <input type="text" className="search-input" placeholder="Search..." />
      </div>
      {(user && (
        <div className="navbar-right" ref={dropdownRef}>
          <div className="profile-container" onClick={handleProfileClick}>
            <img
              className="profile-image"
              src={user?.profile_img ? user.profile_img : "./avatar.jpg"}
              alt="Profile"
            />
            <div className={`profile-dropdown ${dropdownOpen ? "show" : ""}`}>
              <Link
                to="/userProfile"
                className="dropdown-item"
                onClick={() => setDropdownOpen(false)}
              >
                My Profile
              </Link>
              <hr className="dropdown-divider" />
              <div className="dropdown-item" onClick={handleLogout}>
                <Link className="logoutLink" to={"/"}>
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      )) ||
        (company && (
          <div className="navbar-right" ref={dropdownRef}>
            <div className="profile-container" onClick={handleProfileClick}>
              <img
                className="profile-image"
                src={
                  (company?.company_logo.length > 0 &&
                    company?.company_logo[0]) ||
                  "./avatar.jpg"
                }
              />
              <div className={`profile-dropdown ${dropdownOpen ? "show" : ""}`}>
                <Link
                  to="/companyProfile"
                  className="dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                >
                  My Profile
                </Link>
                <hr className="dropdown-divider" />
                <Link
                  to="/companyVacansies"
                  className="dropdown-item"
                  onClick={() => setDropdownOpen(false)}
                >
                  My vacansies
                </Link>
                <hr className="dropdown-divider" />
                <div className="dropdown-item" onClick={handleLogout}>
                  <Link className="logoutLink" to={"/"}>
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )) || (
          <div className="navbar-right">
            <Link className="auth-link" to={"/whichLogin"}>
              Login
            </Link>
            <Link className="auth-link" to={"/whichAuth"}>
              Signup
            </Link>
          </div>
        )}
    </div>
  );
}

export default Navbar;
