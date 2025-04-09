import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserStore from "../../stores/UserStore";
import "./VerifyUser.css";

function VerifyUser() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const { verifyUser } = UserStore();
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;
    const otpCopy = [...otp];
    otpCopy[index] = value;

    if (value && index < 3) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    setOtp(otpCopy);
  };

  const isDisabled = otp.some((digit) => digit === "");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const activationCode = otp.join("");

    setLoading(true);

    try {
      await verifyUser(activationCode, navigate);
    } catch (error) {
      console.error("Error during activation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-container">
      <h2 className="verify-title">Verify Your Email</h2>
      <div className="otp-container">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            id={`otp-input-${index}`}
            className="otp-input"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            autoFocus={index === 0}
          />
        ))}
      </div>

      <button
        className="verify-btn"
        onClick={handleSubmit}
        disabled={isDisabled || loading}
      >
        {loading ? "Verifying..." : "Verify"}
      </button>
    </div>
  );
}

export default VerifyUser;
