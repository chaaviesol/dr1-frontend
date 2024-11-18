import React, { useState } from "react";
import { Modal } from "@mui/material";
import "../../pages/Services/services.css";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
export default function Homeservices() {
  const [isShowHomeserviceModal, setIsShowHomeserviceModal] = useState(true);
  const location = useLocation();
  const passedState = location.state || {};
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    selectedService: "",
    name: "",
    phone_no: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone_no" && value.length > 10) {
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleServiceSelect = (service) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedService: prevData.selectedService === service ? "" : service,
    }));
  };
  const handleServiceSubmit = async () => {
    const newErrors = {};
    if (!formData.name || formData.type === "") {
      newErrors.name = "Enter your name!";
      // toast.error("Enter your name!");
      // return;
    }
    if (!formData.selectedService || formData.selectedService === "") {
      newErrors.selectedService = "Select your service!";
      // toast.error("Select your role!");
      // return;
    }
    if (!formData.phone_no || formData.phone_no.trim() === "") {
      newErrors.phone_no = "Enter your phone number!";
      // toast.error("Enter your phone number!");
      // return;
    }
    const phoneRegex = /^[789]\d{9}$/;
    if (!phoneRegex.test(formData.phone_no)) {
      newErrors.phone_no = "Enter a valid phone number!";
      // toast.error("Enter a valid phone number!");
      // return;
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      setLoader(true);
      const response = await axios.post(
        ` ${BASE_URL}/career/homeserviceupload`,
        {
          type: formData.selectedService,
          name: formData.name,
          phone_no: formData.phone_no,
          status: "submitted",
        }
      );
      if (response.status === 200) {
        setLoader(false);
        setErrors("");
        toast.success("Details submitted successfully!", {
          autoClose: 3000,
        });
        if (passedState.web === true) {
          navigate("/services");
        } else {
          navigate("/");
        }
        setTimeout(() => {
          setFormData({
            selectedService: "",
            name: "",
            phone_no: "",
          });
        }, 3000);
      } else if (response.status === 400) {
        setLoader(false);
        toast.error(response.data.message);
      } else {
        setLoader(false);
        toast.error("Failed to submit details.");
      }
      setIsShowHomeserviceModal(false);
    } catch (error) {
      setLoader(false);
      console.error("Error submitting the form:", error);
    }
  };

  const handleclose = () => {
    setIsShowHomeserviceModal(false);
    setFormData({
      selectedService: "",
      name: "",
      phone_no: "",
    });
    if (passedState.web === true) {
      navigate("/services");
    } else {
      navigate("/");
    }
  };
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
  return (
    <div>
      {loader ? <Loader /> : ""}
      <Modal
        open={isShowHomeserviceModal}
        onClose={() => setIsShowHomeserviceModal(false)}
      >
        <div className="modalhomeservices">
          <div className="modalhomeservicesclose flex" onClick={handleclose}>
            <i class="ri-close-line"></i>
          </div>

          <div className="servicesheadsection">
            <span style={{ fontWeight: "400" }}>Enquiry For</span>{" "}
            <span style={{ color: "rgb(139, 92, 246)" }}> Services</span>
            <h4>
              Enter your details carefully. Dr1 team contact you for
              verification
            </h4>
          </div>

          <div className="homeserviceform">
            <h4 className="typehomeservices">What is you looking for</h4>
            <div className="homeserviceformtype flex">
              <div
                className={`homeserviceformtypecard flex ${
                  formData.selectedService === "Ambulance"
                    ? "homeserviceformtypecardselect"
                    : ""
                }`}
                onClick={() => handleServiceSelect("Ambulance")}
              >
                <img src="../images/ambulance.png" alt="" />
                <h4>Ambulance</h4>
              </div>
              <div
                className={`homeserviceformtypecard flex ${
                  formData.selectedService === "Nurse"
                    ? "homeserviceformtypecardselect"
                    : ""
                }`}
                onClick={() => handleServiceSelect("Nurse")}
              >
                <img src="../images/nurse.png" alt="" />
                <h4>Nurse</h4>
              </div>
              <div
                className={`homeserviceformtypecard flex ${
                  formData.selectedService === "Physiotherapist"
                    ? "homeserviceformtypecardselect"
                    : ""
                }`}
                onClick={() => handleServiceSelect("Physiotherapist")}
              >
                <img src="../images/physiotherapy.png" alt="" />
                <h4>Physiotherapist</h4>
              </div>

              <div
                className={`homeserviceformtypecard flex ${
                  formData.selectedService === "Other"
                    ? "homeserviceformtypecardselect"
                    : ""
                }`}
                onClick={() => handleServiceSelect("Other")}
              >
                <img src="../images/medical-team.png" alt="" />
                <h4>Other</h4>
              </div>
            </div>
            {errors.selectedService && (
              <p
                style={{ color: "red", fontSize: "0.9rem" }}
                className="error-message"
              >
                {errors.selectedService}
              </p>
            )}
            <div className="careersforminputs flex">
              <div className="careersforminput">
                <h4>Name</h4>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  maxLength={40}
                />
                {errors.name && (
                  <p
                    style={{ color: "red", fontSize: "0.9rem" }}
                    className="error-message"
                  >
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="careersforminput">
                <h4>Phone Number</h4>
                <input
                  type="number"
                  name="phone_no"
                  maxLength={10}
                  onKeyDown={handleKeyPress}
                  placeholder="Enter Your Phone Number"
                  value={formData.phone_no}
                  onChange={handleInputChange}
                />
                {errors.phone_no && (
                  <p
                    style={{ color: "red", fontSize: "0.9rem" }}
                    className="error-message"
                  >
                    {errors.phone_no}
                  </p>
                )}
              </div>
            </div>

            <div className="servicesformsectionbutton flex">
              <button disabled={loader} onClick={handleServiceSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
