import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import UserStore from "../../stores/UserStore";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // react-spinners'dan ClipLoader import qilamiz
import "./SignupUser.css";

function SignupUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loading holatini boshqarish uchun state
  const { signupUser } = UserStore();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true); // Loadingni faollashtiramiz
    try {
      await signupUser({
        fullName: data.fullname,
        email: data.email,
        password: data.password,
        position: data.position,
        navigate,
      });
    } catch (err) {
      console.error("Error during registration:", err);
    } finally {
      setLoading(false); // Loadingni o'chirish
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">User Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        {/* Full Name Field */}
        <div className="form-field">
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            {...register("fullname", { required: "Full name is required" })}
            placeholder="Enter your full name"
          />
          {errors.fullname && (
            <span className="error">{errors.fullname.message}</span>
          )}
        </div>

        {/* Email Field */}
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
            placeholder="Enter your email"
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="form-field password-field">
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              placeholder="Enter your password"
            />
            <span
              className="eye-icon"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {!passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>

        {/* Position Field */}
        <div className="form-field">
          <label htmlFor="position">Position</label>
          <select
            id="position"
            {...register("position", { required: "Position is required" })}
          >
            <option value="">Select Position</option>
            <option value="backend-developer">Backend Developer</option>
            <option value="frontend-developer">Frontend Developer</option>
            <option value="mobile-developer">Mobile Developer</option>
          </select>
          {errors.position && (
            <span className="error">{errors.position.message}</span>
          )}
        </div>

        <div className="form-field">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <ClipLoader size={20} color={"#ffffff"} loading={loading} />
            ) : (
              "Sign Up"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupUser;
