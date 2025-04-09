import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { companyStore } from "../../stores/CompanyStore";

function ResetCompanyPass() {
  const { resetPasswordCompany } = companyStore();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("verify");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    resetPasswordCompany(formData.password, token, navigate);
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <div className="reset-header">
          <h2>Reset Your Password</h2>
          <p>Create a new password for your account</p>
        </div>

        <form onSubmit={handleSubmit} className="reset-form">
          <div>
            <label htmlFor="password">New Password</label>
            <div className="password-input">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
              />
              <button
                type="button"
                className="visibility-toggle"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {!passwordVisible ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                className="visibility-toggle"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
              >
                {!confirmPasswordVisible ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <button type="submit" className="reset-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetCompanyPass;
