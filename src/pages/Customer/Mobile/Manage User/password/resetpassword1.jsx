import React, { useState } from "react";
import "./resetpassword1.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../../../components/Loader/Loader";

const ResetPassword_1 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const form = location?.state;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const validPassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&]).{6,}$/;
    return regex.test(password);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (!password || !confirmPassword) {
      setError("All fields are required");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else if (!validPassword(password)) {
      setError(
        "Password must be at least 6 characters long, include at least one uppercase letter, one digit, and one special character."
      );
    } else {
      setError("");

      const data = {
        email: form?.email,
        password: password,
      };
      console.log({ data });
      try {
        const response = await axios.post(
          `${BASE_URL}/user/userresetpassword`,
          data
        );

        if (response?.status === 200) {
          setLoader(false)
          toast.success(response?.data?.message);
          navigate("/");
        } else {
          setLoader(false);
          toast.error(response?.data?.message || "Something went wrong");
        }
      } catch (error) {
        console.error("Error occurred:", error);
        toast.error(
          "An error occurred while resetting the password. Please try again."
        );
      }
    }
  };

  return (
    <div className="reset-password-container">
         {loader ? <Loader /> : ""}
      <img
        src="/images/doconelogo.jpg"
        alt="Logo"
        className="password_page_logo"
      />
      <p className="password_page_instructions">
        Please enter your password ( at least 6 characters long, including at
        least one uppercase letter, one digit, and one special character.)
      </p>
      <form onSubmit={handleSubmit} className="password_page_form">
        <input
          type="password"
          placeholder="Password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          className="password_input-field"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="password_input-field"
        />
        {error && (
          <div className="password_error-message">
            <i class="ri-error-warning-fill"></i>
            {error}
          </div>
        )}
        <button type="submit" className="password_page_submit-button">
          Continue
        </button>
      </form>
      <div className="password_page_links">
        <span>
          Back to{" "}
          <a href="/" className="password_page_link">
            Login page
          </a>
        </span>
        <span>
          Don't have an account?{" "}
          <a href="/" className="password_page_link">
            Sign up
          </a>
        </span>
      </div>
    </div>
  );
};

export default ResetPassword_1;
