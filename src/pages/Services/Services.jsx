import React, { useState } from "react";
import "../Services/services.css";
import Navbar from "../../components/Navbar";
import Headroom from "react-headroom";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import Secopmodal from "../../components/SecOpAndQuery/Secopmodal";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { Modal } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../config";
export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowHomeserviceModal, setIsShowHomeserviceModal] = useState(false);
  const [formData, setFormData] = useState({
    selectedService: "",
    name: "",
    phone_no: "",
  });
  console.log({ formData });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
  const { auth } = useAuth();
  const navigate = useNavigate();
  const handleServiceSubmit = async () => {
    try {
      if (!formData.name || formData.type === "") {
        toast.error("Enter your name!");
        return;
      }
      if (!formData.selectedService || formData.selectedService === "") {
        toast.error("Select your role!");
        return;
      }
      if (!formData.phone_no || formData.phone_no.trim() === "") {
        toast.error("Enter your phone number!");
        return;
      }
      const phoneRegex = /^[789]\d{9}$/;
      if (!phoneRegex.test(formData.phone_no)) {
        toast.error("Enter a valid phone number!");
        return;
      }
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
        toast.success("Details submitted successfully!", {
          autoClose: 3000,
        });
        setTimeout(() => {
          setFormData({
            selectedService: "",
            name: "",
            phone_no: "",
          });
          navigate("/services");
        }, 3000);
      } else if (response.status === 400) {
        toast.error(response.data.message);
      } else {
        toast.error("Failed to submit details.");
      }
      setIsShowHomeserviceModal(false);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div>
      <Headroom>
        <Navbar />
      </Headroom>
      <Secopmodal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div className="container_ser">
        <div className="services_one">
          {/* First Column */}
          <div className="services_content">
            <h4 className="services_subtitle" style={{ color: "#FF4D4D" }}>
              Expert Opinion
            </h4>
            <h2 className="services_main_title1" style={{ marginTop: "10px" }}>
              Expert Insight for
            </h2>
            <h2 className="services_main_title" style={{ color: "#15803D" }}>
              Your Health
            </h2>
            <p className="servicepara">
              Confused about your diagnosis and next steps? Get your queries
              answered by our expert panel consisting of eminent experts. We
              ensure your easy access to specialists, online or offline.
            </p>

            <div className="serviceslist flex">
              <div className="flex suboptions">
                <i class="ri-medal-line"></i>
                <h4>Best Doctors</h4>{" "}
              </div>
              <div className="flex suboptions">
                <i class="ri-customer-service-2-line"></i>
                <h4>Dedicated Support</h4>{" "}
              </div>
            </div>
            <div className="serviceslist flex">
              <div className="flex suboptions">
                <i class="ri-contract-line"></i>
                <h4>Thorough Assessment</h4>{" "}
              </div>
              <div className="flex suboptions">
                <i class="ri-shake-hands-line"></i>
                <h4>Convenient Consultation</h4>{" "}
              </div>
            </div>
            <button
              onClick={() => {
                if (auth.userId && auth.userType === "customer") {
                  setIsModalOpen(true);
                } else {
                  toast.info("Please login as a customer!");
                }
              }}
              className="services_button"
              style={{ backgroundColor: "#15803D" }}
            >
              Get Now <i className="ri-arrow-right-up-line"></i>
            </button>
          </div>

          {/* Second Column */}
          <div className="services_image services_image1 flex">
            <div className="custom-image-grid">
              <div className="custom-grid-item">
                <img src="../images/serdo1.jpg" alt="" />
              </div>
              <div className="custom-grid-item">
                <img src="../images/serdo2.jpg" alt="" />
              </div>
              <div className="custom-grid-item">
                <img src="../images/dr (3).jpg" alt="" />
                <div className="backdesign"></div>
              </div>
              <div className="custom-grid-item">
                <img src="../images/dr20.png" alt="" />
              </div>

              <div className="backdesign2"></div>
            </div>
          </div>
        </div>

        <div className="services_one services_one2">
          <div className="services_image">
            <div className="services_image_section4_img">
              <div className="services_image_section4_img_data">
                <div className="services_image_section4_img_data1 flex ">
                  <div
                    className="services_image_section4_img_data2 flex"
                    style={{ backgroundColor: "#B9D9C5", color: "#15803D" }}
                  >
                    <i className="ri-upload-line"></i>
                  </div>
                  <div className="services_image_section4_img_data3">
                    <h4>Upload</h4>
                    <h4>Prescription</h4>
                  </div>
                </div>

                <div
                  className="services_image_section4_img_data1 flex "
                  style={{ marginTop: "2vw" }}
                >
                  <div
                    className="services_image_section4_img_data2 flex"
                    style={{ backgroundColor: "#FDD5B9", color: "#F97316" }}
                  >
                    <i className="ri-file-list-line"></i>
                  </div>
                  <div className="services_image_section4_img_data3">
                    <h4>Enter</h4>
                    <h4>Your Details</h4>
                  </div>
                </div>

                <div
                  className="services_image_section4_img_data1 flex "
                  style={{ marginTop: "2vw" }}
                >
                  <div
                    className="services_image_section4_img_data2 flex"
                    style={{ backgroundColor: "#DCCEFC", color: "#8B5CF6" }}
                  >
                    <i className="ri-hand-coin-line"></i>
                  </div>
                  <div className="services_image_section4_img_data3">
                    <h4>Get</h4>
                    <h4>Your Medicine</h4>
                  </div>
                </div>
              </div>
            </div>
            {/* <img src="../images/man.jpg" alt="Service" /> */}
          </div>
          {/* First Column */}
          <div className="services_content services_content2 ">
            <h4 className="services_subtitle" style={{ color: "#FF4D4D" }}>
              Online Medicine
            </h4>
            <h2 className="services_main_title1" style={{ marginTop: "10px" }}>
              Medicine at
            </h2>
            <h2 className="services_main_title" style={{ color: "#F59E0B" }}>
              Your Doorstep
            </h2>
            <p className="servicepara">
              Whether it's from a pharmacy near you or far, all you have to do
              is upload the doctor's prescription, and the Medicine will reach
              your doorstep.
            </p>
            <div className="serviceslist flex">
              <div className="flex suboptions">
                <i class="ri-shield-check-line"></i>
                <h4>Secure</h4>{" "}
              </div>
              <div className="flex suboptions">
                <i class="ri-speed-up-line"></i> <h4>Fast Delivery</h4>{" "}
              </div>
            </div>
            <div className="serviceslist flex">
              <div className="flex suboptions">
                <i class="ri-medal-2-line"></i>
                <h4>Assured Quality</h4>{" "}
              </div>
              <div className="flex suboptions">
                <i class="ri-money-rupee-circle-line"></i>
                <h4>Flexible Payment</h4>{" "}
              </div>
            </div>
            <button
              className="drone_red services_button"
              style={{ backgroundColor: "#F59E0B" }}
              onClick={() => navigate("/pharmacy")}
            >
              Learn More <i className="ri-arrow-right-up-line"></i>
            </button>
          </div>

          {/* Second Column */}
        </div>

        <div className="services_one">
          {/* First Column */}
          <div className="services_content">
            <h4 className="services_subtitle" style={{ color: "#FF4D4D" }}>
              Services
            </h4>
            <h2 className="services_main_title1">Your Smile,</h2>
            <h2 className="services_main_title" style={{ color: "#8B5CF6" }}>
              Our Priority
            </h2>
            <p className="servicepara">
              When it comes to home care services, we provide you with the best
              and with utmost care. Whether it be nursing assistance or medical
              equipment assistance, we offer you the best.
            </p>
            <div className="serviceslist flex">
              <div className="flex suboptions">
                <i class="ri-check-line"></i> <h4> Home Nurse</h4>{" "}
              </div>
              <div className="flex suboptions">
                <i class="ri-check-line"></i> <h4>Technician</h4>{" "}
              </div>
            </div>
            <div className="serviceslist flex">
              <div className="flex suboptions">
                <i class="ri-check-line"></i> <h4>Physiotherapist</h4>{" "}
              </div>
              <div className="flex suboptions">
                <i class="ri-check-line"></i> <h4>Medical Equipments &More</h4>{" "}
              </div>
              <div className="flex suboptions">
                <i class="ri-hand-coin-line"></i>
                <h4>& Many More</h4>{" "}
              </div>
            </div>
            <button
              className="drone_red services_button"
              style={{ backgroundColor: "#8B5CF6" }}
              onClick={() => {
                setIsShowHomeserviceModal(true);
                setFormData({
                  selectedService: "",
                  name: "",
                  phone_no: "",
                });
              }}
            >
              Request Now <i className="ri-arrow-right-up-line"></i>
            </button>
          </div>

          {/* Second Column */}
          <div className="services_image services_image_top flex">
            <div className="toplevel-sr-img">
              <img src="../images/homeser.jpg" alt="" />
              <div className="toplevel-sr-img2"></div>
            </div>
          </div>
        </div>

        <div className="services_one services_one2">
          <div className="services_image services_image_careers flex">
            <img src="../images/sp4.jpg" alt="" />
            <img src="../images/dr20.png" alt="" />
            <img src="../images/car1.jpg" alt="" />
          </div>

          <div className="services_content services_content2 ">
            <h4 className="services_subtitle" style={{ color: "#FF4D4D" }}>
              Careers
            </h4>
            <h2 className="services_main_title1">Opportunities Towards</h2>
            <h2 className="services_main_title">Your Dream</h2>
            <p className="servicepara">
              Let us be your guide to finding the right place for you. We help
              you connect to the right recruiters in your specialization and
              help you realize that dream career.
            </p>
            <div className="serviceslist flex">
              <div className="flex suboptions">
                <i class="ri-check-line"></i> <h4>Doctors</h4>{" "}
              </div>
              <div className="flex suboptions">
                <i class="ri-check-line"></i> <h4> Home Nurse</h4>{" "}
              </div>
            </div>
            <div className="serviceslist flex">
              <div className="flex suboptions">
                <i class="ri-check-line"></i> <h4>Technician</h4>{" "}
              </div>
              <div className="flex suboptions">
                <i class="ri-check-line"></i> <h4>Physiotherapist</h4>{" "}
              </div>
              <div className="flex suboptions">
                <i class="ri-hand-coin-line"></i>
                <h4>& Many More</h4>{" "}
              </div>
            </div>
            <p className="priscriptionpara" style={{ marginLeft: "15px" }}>
              & Many More
            </p>
            <button className="drone_red services_button" type="button">
              Apply Now <i className="ri-arrow-right-up-line"></i>
            </button>
          </div>
        </div>
      </div>
      {
        <Modal
          open={isShowHomeserviceModal}
          onClose={() => setIsShowHomeserviceModal(false)}
        >
          <div className="modalhomeservices">
            <div
              className="modalhomeservicesclose flex"
              onClick={() => setIsShowHomeserviceModal(false)}
            >
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
                </div>
                <div className="careersforminput">
                  <h4>Phone Number</h4>
                  <input
                    type="text"
                    name="phone_no"
                    maxLength={10}
                    placeholder="Enter Your Phone Number"
                    value={formData.phone_no}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="servicesformsectionbutton flex">
                <button onClick={handleServiceSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </Modal>
      }
      <Footer />
         
    </div>
  );
}
