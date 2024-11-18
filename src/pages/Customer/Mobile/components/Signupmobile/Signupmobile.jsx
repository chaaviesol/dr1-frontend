import React, { useState } from "react";
import { toast } from "react-toastify";
import { port } from "../../../../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../../../components/Loader/Loader";

export default function Signupmobile() {
  const [showPassword, setShowPassword] = useState({
    password:false,
    confirmPassword:false
  });
  const [formValues, setFormValues] = useState({
    email: "",
    name: "",
    phone_no: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]:!showPassword[field]
    });
  };
  const [loader, setLoader] = useState(false);
  const handleKeyPress = (event) => {
    if (
      event?.key === "." ||
      event?.key === "-" ||
      event?.key === "e" ||
      event?.key === "+" ||
      event?.key === "E"
    ) {
      event.preventDefault();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    if (name === "name") {
      updatedValue = value.replace(/[0-9]/g, "");
    } else if (name === "phone_no") {
      const sanitizedValue = value.replace(/[.-]/g, "");
      updatedValue = sanitizedValue.slice(0, 10);
    } else if (name === "password") {
      updatedValue = value.trim();
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: updatedValue,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const handleLogin = () => {
    const newErrors = {};
    // Required field validation
    Object.keys(formValues).forEach((field) => {
      if (!formValues[field]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    });
    const Passwordpattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&]).{6,}$/;
    const EmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PhonePattern = /^[6-9]\d{9}$/;
    // Confirm password validation
    if (formValues.password !== formValues.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!EmailPattern.test(formValues.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!PhonePattern.test(formValues.phone_no)) {
      newErrors.phone_no = "Invalid contact number";
    }
    if (!Passwordpattern.test(formValues.password)) {
      newErrors.password =
        "Password must be 6+ characters with an uppercase letter, digit, and special character.";
    }

    setFormErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoader(true);
      axios
        .post(`${port}/user/addusers`, formValues)
        .then((res) => {
          console.log("res>>>", res);
          if (res?.data?.success) {
            setLoader(false);
            toast.success(res?.data?.message);
            setFormValues("");
            setFormValues("");
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
          toast.info(err?.response?.data?.message);
        });
    }
  };

  return (
    <div>
      {loader ? <Loader /> : ""}
      <div className="containerlog createaccountmobsec flex">
        <div onClick={() => navigate("/")}>
          <img
            className="loginmobpageimg2"
            src="./images/doconelogo.jpg"
            alt=""
          />
        </div>
        <h2>Create Account</h2>

        {["name", "phone_no", "email"].map((field,index) => (
          <div>
            <input
              key={index}
              type={field === "phone_no" ? "number" : "text"}
              name={field}
              placeholder={formErrors[field] || `Enter your ${field}`}
              value={formValues[field]}
              onKeyDown={
                field === "phone_no" ? (e) => handleKeyPress(e) : undefined
              }
              onChange={handleInputChange}
              className={`input-fieldsmob ${
                formErrors[field] ? "input-error2" : ""
              }`}
              style={{ marginTop: "20px" }}
            />
            {/* {formErrors[field] && (
              <p
                style={{ color: "red", fontSize: "0.9rem" }}
                className="error-message"
              >
                {formErrors[field]}
              </p>
            )} */}
          </div>
        ))}

        <div className="loginmobpageinputdiv">
          <input
            type={showPassword.password ? "text" : "password"}
            name="password"
            placeholder={formErrors.password || "Enter your password"}
            value={formValues.password}
            onChange={handleInputChange}
            className={`input-fieldsmob ${
              formErrors.password ? "input-error2" : ""
            }`}
          />
          <button
            onClick={()=>togglePasswordVisibility("password")}
            type="button"
            style={{
              top: "50%",
              transform: "translateY(-50%)",
            }}
            className="createaccountbutton2"
          >
            <i className={showPassword.password  ? "ri-eye-line" : "ri-eye-off-line"} />
          </button>
          {/* {formErrors.password && (
            <p
              style={{ color: "red", fontSize: "0.9rem" }}
              className="error-message"
            >
              {formErrors.password}
            </p>
          )} */}
        </div>

        <div className="loginmobpageinputdiv">
          <input
            type={showPassword.confirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder={formErrors.confirmPassword || "Confirm password"}
            value={formValues.confirmPassword}
            onChange={handleInputChange}
            className={`input-fieldsmob ${
              formErrors.confirmPassword ? "input-error2" : ""
            }`}
          />
          <button
               onClick={()=>togglePasswordVisibility("confirmPassword")}
            type="button"
            className="createaccountbutton2"
            style={{
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <i className={showPassword.confirmPassword ? "ri-eye-line" : "ri-eye-off-line"} />
          </button>
          {/* {formErrors.confirmPassword && (
            <p
              style={{ color: "red", fontSize: "0.9rem" }}
              className="error-message"
            >
              {formErrors.confirmPassword}
            </p>
          )} */}
        </div>

        <button onClick={handleLogin} className="login-buttonmob">
          Create Account
        </button>

        <h4
          onClick={() => navigate("/login")}
          style={{
            color: "#6688FE",
            marginTop: "10px",
          }}
        >
          Already have an account? Login
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
    </div>
  );
}
