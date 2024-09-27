import React, { useState, useRef } from "react";
import "../Services/services.css";
import Navbar from "../../components/Navbar";
import Headroom from "react-headroom";
import Footer from "../../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import Secopmodal from "../../components/SecOpAndQuery/Secopmodal";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
            <h2 className="services_main_title1">Opinion From</h2>
            <h2 className="services_main_title" style={{ color: "#15803D" }}>
              Experts
            </h2>
            <p className="priscriptionpara">
              The beauty of nature lies in its simplicity, offering tranquility
              to those who take the time to appreciate it. Whether it's a calm
              sunset or the gentle rustle of leaves, nature has a way of
              soothing the soul. In a world filled with noise, these quiet
              moments remind us of the peace that still exists around us
            </p>

            <div className="doctor-top-list flex">
            <h2>10+ </h2>
            {/* <div className="doctor-top-doc1-data ">
                <h2>10+ </h2>
              
              </div> */}
              <h4>Expert Doctors</h4>
              {/* <div className="doctor-top-doc1 flex">
                <img src="../images/serdo1.jpg" alt="" />
                <img src="../images/serdo2.jpg" alt="" />
                <img src="../images/dr20.jpg" alt="" />
                <img src="../images/dr20.png" alt="" />
                <img src="../images/serdo1.jpg" alt="" />
              </div> */}
           
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
              Get Now <i class="ri-arrow-right-up-line"></i>
            </button>
          </div>

          {/* Second Column */}
          <div className="services_image services_image1 flex">
            <div className="custom-image-grid">
              <div className="custom-grid-item">
                <img src="../images/serdo1.jpg" alt="Image 1" />
              </div>
              <div className="custom-grid-item">
                <img src="../images/serdo2.jpg" alt="Image 2" />
              </div>
              <div className="custom-grid-item">
                <img src="../images/dr (3).jpg" alt="Image 3" />
                <div className="backdesign"></div>
              </div>
              <div className="custom-grid-item">
                <img src="../images/dr20.png" alt="Image 4" />
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
                    <i class="ri-upload-line"></i>
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
                    <i class="ri-file-list-line"></i>
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
                    <i class="ri-hand-coin-line"></i>
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
            <h2 className="services_main_title1">Get Your</h2>
            <h2 className="services_main_title" style={{ color: "#F59E0B" }}>
              Medicine At Home
            </h2>
            <p className="priscriptionpara">
              The beauty of nature lies in its simplicity, offering tranquility
              to those who take the time to appreciate it. Whether it's a calm
              sunset or the gentle rustle of leaves, nature has a way of
              soothing the soul. In a world filled with noise, these quiet
              moments remind us of the peace that still exists around us
            </p>
            <button
              className="drone_red services_button"
              style={{ backgroundColor: "#F59E0B" }}
              onClick={()=>navigate("/pharmacy")}
            >
              Learn More <i class="ri-arrow-right-up-line"></i>
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
            <h2 className="services_main_title1">Top Level</h2>
            <h2 className="services_main_title" style={{ color: "#8B5CF6" }}>
              Home Services
            </h2>
            <p className="priscriptionpara">
              The beauty of nature lies in its simplicity, offering tranquility
              to those who take the time to appreciate it. Whether it's a calm
              sunset or the gentle rustle of leaves, nature has a way of
              soothing the soul. In a world filled with noise, these quiet
              moments remind us of the peace that still exists around us
            </p>
            <div className="serviceslist flex">
              <h4>Home Nurse</h4> <h4>Technician</h4> <h4>Physiotherapist</h4>{" "}
              <h4>&More</h4>
            </div>
            <button
              className="drone_red services_button"
              style={{ backgroundColor: "#8B5CF6" }}
            >
              Request Now <i class="ri-arrow-right-up-line"></i>
            </button>
          </div>

          {/* Second Column */}
          <div className="services_image services_image_top flex">
            <div className="toplevel-sr-img">
              <img src="../images/homeser.jpg" alt="Service" />
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
            <h2 className="services_main_title1">Find Your</h2>
            <h2 className="services_main_title">Dream Job </h2>
            <p className="priscriptionpara">
              The beauty of nature lies in its simplicity, offering tranquility
              to those who take the time to appreciate it. Whether it's a calm
              sunset or the gentle rustle of leaves, nature has a way of
              soothing the soul. In a world filled with noise, these quiet
              moments remind us of the peace that still exists around us
            </p>
            <div className="serviceslist flex">
              <h4>Home Nurse</h4> <h4>Technician</h4> <h4>Physiotherapist</h4>{" "}
              <h4>&More</h4>
            </div>
            <button className="drone_red services_button">
              Apply Now <i class="ri-arrow-right-up-line"></i>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
