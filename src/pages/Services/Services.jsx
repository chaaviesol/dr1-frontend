import React, { useState } from "react";
import "../Services/services.css";
import Navbar from "../../components/Navbar";
import Headroom from "react-headroom";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import Secopmodal from "../../components/SecOpAndQuery/Secopmodal";
import useAuth from "../../hooks/useAuth";
import { LoginModal } from "../../components/LoginModal/LoginModal";
export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();

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
                  setIsShowLoginModal(true);
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
                <img src="../images/serdo1.webp" alt="" />
              </div>
              <div className="custom-grid-item">
                <img src="../images/serdo2.webp" alt="" />
                {/* <img src="../images/serdo1.webp" alt="" /> */}
              </div>
              <div className="custom-grid-item">
                <img src="../images/dr (3).webp" alt="" />
                <div className="backdesign"></div>
              </div>
              <div className="custom-grid-item">
                <img src="/images/dr20.webp" alt="gh" />
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
                navigate("/homeservice", {
                  state: {
                    web: true,
                  },
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

            <button onClick={()=>navigate("/careers")} className="drone_red services_button" type="button">
              Apply Now <i className="ri-arrow-right-up-line"></i>
            </button>
          </div>
        </div>
      </div>

      <Footer />
      {isShowLoginModal && (
        <LoginModal show={isShowLoginModal} setShow={setIsShowLoginModal} />
      )}
    </div>
  );
}
