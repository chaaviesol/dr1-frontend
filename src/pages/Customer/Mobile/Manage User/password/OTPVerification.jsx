import React, { useState } from "react";
import "./OTPVerification.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../../../components/Loader/Loader";
const OTPVerification = () => {
  const location = useLocation();
  const form = location?.state?.form;
  console.log({ form });
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const handleChange = (element, index) => {
    if (/[^0-9]/.test(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allFieldsFilled = otp.every((digit) => digit !== "");

    if (!allFieldsFilled) {
      setError("All fields are required");
    } else {
      const enteredOtp = otp.join("");

      if (enteredOtp !== form?.otp) {
        setError("");
        toast.error("The OTP you entered is incorrect.");
        setLoader(false);
      } else {
        setError("");
        setLoader(false);
        toast.success(
          "OTP verified successfully. Proceed to reset your password."
        );

        navigate("/resetpassword", {
          state: { email: form?.email },
        });
      }
    }
  };

  const resentOtp = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`${BASE_URL}/user/userforgotpwd`, {
        emailid: form.email,
      });
      console.log("Response:==========================", response);

      if (response?.status === 200) {
        toast.success(response?.data?.message);

        console.log("OTP sent to email:", response);
      } else {
        toast.error(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("An error occurred while sending OTP. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="otp-verification-container">
      {loader ? <Loader /> : ""}
      <img src="/images/doconelogo.jpg" alt="Logo" className="otp_page_logo" />
      <p className="otp_page_instructions">
        Enter the OTP that we will send to your email ID
        <h3 className="otp_email">
          {form?.email}
        </h3>
      </p>
      <form onSubmit={handleSubmit} className="otp_page_form">
        <div className="otp_inputs">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              className="otp_input-field"
            />
          ))}
        </div>
        {error && <div className="otp_error-message">{error}</div>}
        <button type="submit" className="otp_page_submit-button">
          Continue
        </button>
      </form>
      <div className="otp_page_links">
        <span>
          Wrong email ID?{" "}
          <Link to="/forgotpwd" className="otp_page_link">
            Edit
          </Link>
        </span>
        <span>
          Didn't get the OTP?{" "}
          <span
            onClick={resentOtp}
            className="otp_page_link"
            style={{ cursor: "pointer" }}
          >
            Resent
          </span>
        </span>
      </div>
    </div>
  );
};

export default OTPVerification;
