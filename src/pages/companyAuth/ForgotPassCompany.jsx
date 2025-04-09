import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { companyStore } from "../../stores/CompanyStore";

function ForgotPassCompany() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { forgotPasswordCompany } = companyStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      forgotPasswordCompany(email);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="forgot-pass-container">
      <div className="forgot-pass-card">
        <div className="forgot-pass-header">
          <h2>Forgot Password?</h2>
        </div>

        <form onSubmit={handleSubmit} className="forgot-pass-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <button type="submit" className="submit-btn">
            Send
          </button>
        </form>

        <div className="forgot-pass-footer">
          <p>
            Remember your password?{" "}
            <Link to={"/loginCompany"}> Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassCompany;
