import React from "react";
import { Link } from "react-router-dom";
import "./WhichAuth.css";

function WhichAuth() {
  return (
    <div className="auth-choice-container">
      <h2 className="auth-title">Sign up as a company or worker</h2>
      <div className="auth-options">
        <Link to="/signupCompany" className="auth-option">
          Sign up as a Company
        </Link>
        <Link to="/signupUser" className="auth-option">
          Sign up as a Worker
        </Link>
      </div>
    </div>
  );
}

export default WhichAuth;
