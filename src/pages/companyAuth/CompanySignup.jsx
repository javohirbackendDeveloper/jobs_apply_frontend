import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { useForm, Controller } from "react-hook-form";
import "react-phone-number-input/style.css";
import "./CompanySignup.css";
import { companyStore } from "../../stores/CompanyStore";
import { useNavigate } from "react-router-dom";

function CompanySignup() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const { signupCompany } = companyStore();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signupCompany(data, navigate);
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Company Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
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

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password should be at least 6 characters",
              },
            })}
            placeholder="Enter your password"
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="company_name">Company name</label>
          <input
            type="text"
            id="company_name"
            {...register("company_name", {
              required: "Company name is required",
              minLength: {
                value: 6,
                message: "Company name should be at least 6 characters",
              },
            })}
            placeholder="Enter your Company name"
          />
          {errors.company_name && (
            <span className="error">{errors.company_name.message}</span>
          )}
        </div>

        {/* Phone Number field using Controller */}
        <div className="form-field">
          <label htmlFor="phone_number">Phone Number</label>
          <Controller
            name="phone_number"
            control={control}
            rules={{ required: "Phone number is required" }}
            render={({ field }) => (
              <PhoneInput
                {...field}
                defaultCountry="US"
                value={phone}
                onChange={(value) => {
                  setPhone(value);
                  field.onChange(value); // react-hook-formga qiymatni yuborish
                }}
              />
            )}
          />
          {errors.phone_number && (
            <span className="error">{errors.phone_number.message}</span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            {...register("location", { required: "Location is required" })}
            placeholder="Enter your location"
          />
          {errors.location && (
            <span className="error">{errors.location.message}</span>
          )}
        </div>

        <div className="form-field">
          <button type="submit" className="submit-btn">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default CompanySignup;
