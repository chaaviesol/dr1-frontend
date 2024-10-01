import React, { useState } from "react";
import "./EmailInputPage.css";
import axios from "axios";
import { BASE_URL } from "../../../../../config";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../../../../components/Loader/Loader";
const EmailInputPage = () => {
  const [form, setform] = useState({
    email: "",
    otp: "",
  });
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlechange = (e) => {
    const { name, value } = e.target;
    setform((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);
    if (!form?.email) {
      setError("Email is required");
    } else {
      const emailid = form?.email;

      try {
        const response = await axios.post(`${BASE_URL}/user/userforgotpwd`, {
          emailid,
        });
        console.log("Response:==========================", response);

        if (response?.status === 200) {
          setLoader(false);
          toast.success(response?.data?.message);
          setform((prevForm) => ({
            ...prevForm,
            otp: response?.data?.otp,
          }));

          // Navigate to the OTP verification page with the updated form state
          navigate("/otpverification", {
            state: { form: { ...form, otp: response?.data?.otp } },
          });

          console.log("OTP sent to email:", response);
        } else {
          toast.error(response?.data?.message || "Something went wrong");
        }
      } catch (error) {
        console.error("Error occurred:", error);
        toast.error("An error occurred while sending OTP. Please try again.");
      }
    }
  };

  return (
    <div className="email-input-container">
      {loader ? <Loader /> : ""}
      <img
        src="/images/doconelogo.jpg"
        alt="Logo"
        className="email_page_logo"
      />
      <p className="email_page_instructions">
        Enter the email address associated with your account and we’ll send an
        OTP to reset your password
      </p>
      <form onSubmit={handleSubmit} className="email_page_form">
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={form?.email}
          onChange={handlechange}
          className="email_input-field"
        />
        {error && <div className="email_error-message">{error}</div>}
        <button type="submit" className="email_page_submit-button">
          Continue
        </button>
      </form>
      <div className="email_page_links">
        <span>
          Back to{" "}
          <Link to="/" className="email_page_link">
            Login page
          </Link>
        </span>
        <span style={{marginTop:".4rem"}}>
          Don't have an account?{" "}
          <Link to="/" className="email_page_link">
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
};

export default EmailInputPage;
