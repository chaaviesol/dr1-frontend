import React, { useState } from "react";
import "./resetpassword1.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../../../components/Loader/Loader";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const form = location?.state;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState({
    password: false,
    reEnterPassword: false,
  });
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const validPassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&]).{6,}$/;
    return regex.test(password);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

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
        setLoader(true);
        const response = await axios.post(
          `${BASE_URL}/user/userresetpassword`,
          data
        );

        if (response?.status === 200) {
          setLoader(false);
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
      } finally {
        setLoader(true);
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
        <div
          style={{
            position: "relative",
            marginTop: "10px",
            padding: "0px",
          }}
        >
          <input
            type={showPassword.password ? "text" : "password"}
            placeholder="Password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="password_input-field"
            maxLength={12}

          />

          <IconButton
            sx={{
              position: "absolute",
              top: "42%",
              right: "0",
              transform: "translateY(-50%)",
              color: "#3A65FD",
            }}
            aria-label="toggle password visibility"
            onClick={() =>
              setShowPassword({
                ...showPassword,
                password: !showPassword.password,
              })
            }
          >
            {showPassword.password ? (
              <VisibilityOff sx={{ fontSize: "20px" }} titleAccess="Hide password" />
            ) : (
              <Visibility sx={{ fontSize: "20px" }} titleAccess="Show password" />
            )}
          </IconButton>
        </div>
        <div
          style={{
            position: "relative",
            marginTop: "10px",
            padding: "0px",
          }}
        >
          <input
            type={showPassword.reEnterPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="password_input-field"
            maxLength={12}
          />

          <IconButton
            sx={{
              position: "absolute",
              top: "42%",
              right: "0",
              transform: "translateY(-50%)",
              color: "#3A65FD",
            }}
            aria-label="toggle password visibility"
            onClick={() =>
              setShowPassword({
                ...showPassword,
                reEnterPassword: !showPassword.reEnterPassword,
              })
            }
          >
            {showPassword.reEnterPassword ? (
              <VisibilityOff sx={{ fontSize: "20px" }} />
            ) : (
              <Visibility sx={{ fontSize: "20px" }} />
            )}
          </IconButton>
        </div>
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
          <Link to="/" className="password_page_link">
            Login page
          </Link>
        </span>
        <span>
          Don't have an account?{" "}
          <Link to="/" className="password_page_link">
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
};

export default ResetPassword;
