import React, { useState } from "react";
import "./loginmobile.css";
import "../../../../../pages/Login&register/login.css";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL, PHARMACY_URL } from "../../../../../config";
import useAuth from "../../../../../hooks/useAuth";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoginMobile() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [emailError, setEmailError] = useState("");  // State for email error message
  const [isLoginPending, setIsLoginPending] = useState(false);
  const [errors, setErrors] = useState({});
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Check for empty email and password fields
    const isEmailEmpty = email === "";
    const isPasswordEmpty = password === "";

    setIsEmailEmpty(isEmailEmpty);
    setIsPasswordEmpty(isPasswordEmpty);

    // Check email format
    if (!isEmailEmpty && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email address.");
    } else {
      setEmailError("");
    }

    // Proceed with API call if both fields are valid
    if (!isEmailEmpty && !isPasswordEmpty && !emailError) {
      customerLogin({
        email,
        password,
      });
    }
  };

  const handleBlurEmail = () => {
    setIsEmailEmpty(email === "");
    // Check for invalid email format when the field loses focus
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email address.");
    }
  };

  const handleBlurPassword = () => {
    setIsPasswordEmpty(password === "");
  };

  // Call login api
  const customerLogin = async (payload) => {
    const newErrors = {};
    setIsLoginPending(true);
    try {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = `Invalid email address.`;
      }
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      const response = await axios.post(
        `${PHARMACY_URL}/user/userlogin`,
        payload
      );
      const data = response.data;
      const { message, userId, userType, accessToken, refreshToken } = data;
      toast.success(message);
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      setAuth({
        userId,
        userType,
      });
      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    } finally {
      setIsLoginPending(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="containerlog loginmobpage flex">
        <div onClick={() => navigate("/")}>
          <img
            className="loginmobpageimg"
            src="./images/doconelogo.jpg"
            alt=""
          />
        </div>
        <h2>Welcome Back</h2>
        <input
          type="text"
          maxLength={50}
          placeholder={isEmailEmpty ? "Email is required" : "Enter your Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleBlurEmail}  // Validate email on blur
          className={`password-input ${isEmailEmpty || emailError ? "input-error" : ""}`}
        />
      

        <div
          className="loginmobpageinputdiv"
          style={{
            position: "relative",
            display: "inline-block",
            width: "100%",
          }}
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder={
              isPasswordEmpty ? "Password is required" : "Enter your password"
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handleBlurPassword} // Validate password on blur
            className={`password-input ${isPasswordEmpty ? "input-error" : ""}`}
          />
          <button
            onClick={togglePasswordVisibility}
            type="button"
            style={{
              top: "50%",
              transform: "translateY(-50%)",
            }}
            className="createaccountbutton2"
          >
            <i className={showPassword ? "ri-eye-line" : "ri-eye-off-line"} />
          </button>
        </div>

        <div className="loginmobilerror">
            {/* Display email error if it exists */}
        {emailError && (
          <p
            style={{ color: "red", fontSize: "12px" }}
            className="error-message"
          >
            {emailError}
          </p>
        )}
        </div>

        <button
          type="submit"
          disabled={isLoginPending}
          className="login-buttonmob"
        >
          {isLoginPending ? (
            <CircularProgress sx={{ color: "white" }} size="1.5rem" />
          ) : (
            "Login"
          )}
        </button>

        <h4
          onClick={() => navigate("/forgotpwd")}
          style={{
            color: "#6688FE",
            marginTop: "10px",
          }}
        >
          Forgot Password?
        </h4>

        <h4
          onClick={() => navigate("/signup")}
          style={{
            color: "#6688FE",
            marginTop: "10px",
          }}
        >
          Don't have an account?
        </h4>

        <div>
          <div className="orline">
            <h4 className="orlinetext">OR</h4>
          </div>
        </div>

        <button className="googleregi">
          <img
            className="googleimg"
            src="./images/google.png" // Replace with your image path
            alt="Google icon"
            style={{ width: "auto", height: "20px" }} // Adjust size as needed
          />
          Continue with Google
        </button>
      </div>
    </form>
  );
}
