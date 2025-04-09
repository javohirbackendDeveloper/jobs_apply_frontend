import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import "./LoginUser.css";
import UserStore from "../../stores/UserStore";
import { Link, useNavigate } from "react-router-dom";

function LoginUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { loginUser } = UserStore();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    loginUser(data, navigate);
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
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

        <div className="form-field password-field">
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Enter your password"
            />
            <span
              className="eye-icon"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {!passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          <Link to={"/forgotPassword"}>Forgot password</Link>
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>

        <div className="form-field">
          <button type="submit" className="submit-btn">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginUser;
