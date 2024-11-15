import React, { useState } from "react";
import './loginmobile.css'

export default function LoginMobile() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    // Check for empty email and password fields
    if (email === "") {
      setIsEmailEmpty(true);
    } else {
      setIsEmailEmpty(false);
    }
    if (password === "") {
      setIsPasswordEmpty(true);
    } else {
      setIsPasswordEmpty(false);
    }
  };

  const handleFocusEmail = () => {
    setIsEmailEmpty(false);
  };

  const handleFocusPassword = () => {
    setIsPasswordEmpty(false);
  };

  return (
    <>
      <div className="containerlog loginmobpage flex">
        <div>
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
          onFocus={handleFocusEmail}
          className={`password-input ${isEmailEmpty ? "input-error" : ""}`}
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
            onFocus={handleFocusPassword}
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

        <button onClick={handleLogin} className="login-buttonmob">
          Login
        </button>

        <h4
          style={{
            color: "#6688FE",
            marginTop: "10px",
          }}
        >
          Forgot Password?
        </h4>

        <h4
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
    </>
  );
}
