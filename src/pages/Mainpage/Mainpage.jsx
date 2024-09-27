import React, { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Headroom from "react-headroom";
import "../Labs/labdetails.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress, FormControlLabel, Modal } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import ChatBot from "../../components/ChatBot/ChatBot";
import { services } from "../Labs/LabFIltering/constatnts/Filter";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import axios from "axios";
import { SearchDocContext } from "../../contexts/Doctor/SearchDoctorProvider";
import ChatBotAfterLogin from "../../components/ChatBotAfterLogin/ChatBotAfterLogin";
import { MyContext } from "../../contexts/Contexts";
import { InnerLoader } from "../../components/Loader/InnerLoader";
import useAuth from "../../hooks/useAuth";
import { Loader } from "../../components/Loader/Loader";
import { BASE_URL, port } from "../../config";

import { axiosPrivate } from "../../api/PrivateAxios/axios";
import SecondopinionBanner from "./SecondopinionBanner/SecondopinionBanner";
export default function Mainpage() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const { Categories } = useContext(MyContext);

  const navigate = useNavigate();
  const location = useLocation();
  const [selectTypes, setselectTypes] = useState({});
  const [SpecialisationBatch, setSpecialisationBatch] = useState([]);
  const {
    setFilters,
    setFilteredDoctors,
    setDocsBySearch,
    setAllDocsBySearch,
  } = useContext(SearchDocContext);

  const [loader, setLoader] = useState(false);

  const { auth } = useAuth();
  const speacializationNames = Categories?.allopathySpecs;
  const homeoDept = Categories?.homeopathySpecs;
  const ayurSpec = Categories?.ayurvedicSpecs;
  const types = Categories?.types;
  const missingImg="./images/mainImgForLandingpage.jpg"
  // const Features = Categories?.hospitalFeatures

  useEffect(() => {
    AOS.init({
      once: false,
    });
    AOS.refresh();
  }, [location?.pathname]);
  const navigateElements = (value) => {
    navigate("/labfiltering", { state: { services: value } });
  };

  const clickChangeTypes = (data) => {
    setselectTypes({
      [data]: true,
    });
  };

  useEffect(() => {
    if (Categories) {
      setselectTypes({ [types?.[0]]: true });
    }
  }, [Categories]);

  useEffect(() => {
    if (Categories) {
      if (selectTypes?.Allopathy && Categories) {
        let settingAllopathy = 0;
        let AllopathyUpdatingBatch = [];
        speacializationNames.forEach((ele, index) => {
          if (
            !AllopathyUpdatingBatch[settingAllopathy] ||
            AllopathyUpdatingBatch[settingAllopathy].length < 12
          ) {
            AllopathyUpdatingBatch[settingAllopathy] = [
              ...(AllopathyUpdatingBatch[settingAllopathy] || []),
              ele,
            ];
          } else {
            settingAllopathy += 1;
            AllopathyUpdatingBatch[settingAllopathy] = [ele];
          }
          setSpecialisationBatch(AllopathyUpdatingBatch);
        });
      } else if (selectTypes.Ayurvedic) {
        let settingAllopathy = 0;
        let AllopathyUpdatingBatch = [];
        ayurSpec.forEach((ele, index) => {
          if (
            !AllopathyUpdatingBatch[settingAllopathy] ||
            AllopathyUpdatingBatch[settingAllopathy].length < 12
          ) {
            AllopathyUpdatingBatch[settingAllopathy] = [
              ...(AllopathyUpdatingBatch[settingAllopathy] || []),
              ele,
            ];
          } else {
            settingAllopathy += 1;
            AllopathyUpdatingBatch[settingAllopathy] = [ele];
          }
          setSpecialisationBatch(AllopathyUpdatingBatch);
        });
      } else if (selectTypes.Homeopathy) {
        let settingAllopathy = 0;
        let AllopathyUpdatingBatch = [];
        homeoDept.forEach((ele, index) => {
          if (
            !AllopathyUpdatingBatch[settingAllopathy] ||
            AllopathyUpdatingBatch[settingAllopathy].length < 12
          ) {
            AllopathyUpdatingBatch[settingAllopathy] = [
              ...(AllopathyUpdatingBatch[settingAllopathy] || []),
              ele,
            ];
          } else {
            settingAllopathy += 1;
            AllopathyUpdatingBatch[settingAllopathy] = [ele];
          }
          setSpecialisationBatch(AllopathyUpdatingBatch);
        });
      } else {
        setSpecialisationBatch();
      }
    }
  }, [selectTypes]);
  const renderHosFilteringBYSpeciality = (Value) => {
    if (speacializationNames.includes(Value?.speciality)) {
      navigate("/hospitalfilter", {
        state: { speciality: Value?.speciality, type: "Allopathy" },
      });
    } else if (ayurSpec.includes(Value?.speciality)) {
      navigate("/hospitalfilter", {
        state: { speciality: Value?.speciality, type: "Ayurvedic" },
      });
    } else if (homeoDept.includes(Value?.speciality)) {
      navigate("/hospitalfilter", {
        state: { speciality: Value?.speciality, type: "Homeopathy" },
      });
    }
  };
  console.log("SpecialisationBatch>>>>>", SpecialisationBatch);

  // Measure page render time
  useEffect(() => {
    const t0 = performance.now();

    const handleLoad = () => {
      const t1 = performance.now();
      console.log(`Page rendered in ${t1 - t0} milliseconds`);
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  // Get geolocation
  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setLatitude(position.coords.latitude);
  //         setLongitude(position.coords.longitude);
  //         setError(null);
  //       },
  //       (err) => {
  //         setError(err.message);
  //       }
  //     );
  //   } else {
  //     setError("Geolocation is not supported by this browser.");
  //   }
  // }, []);

  // Fetch address from coordinates
  // useEffect(() => {
  //   if (latitude !== null && longitude !== null) {
  //     axios
  //       .get(
  //         `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
  //       )
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching address:", error);
  //       });
  //   }
  // }, [latitude, longitude]);

  useEffect(() => {
    setFilters({
      type: "",
      specializations: [],
      gender: "",
      experience: 0,
      name: "",
    });
    setAllDocsBySearch([]);
    setDocsBySearch([]);
  }, []);
  const handleSelectSpecialization = (specialization) => {
    setFilteredDoctors([]);
    const lowerCasedSpecialization = specialization.toLowerCase();
    let type = "Allopathy";
    if (
      ayurSpec.includes(lowerCasedSpecialization) ||
      ayurSpec.includes(specialization)
    ) {
      type = "Ayurvedic";
    } else if (
      homeoDept.includes(lowerCasedSpecialization) ||
      homeoDept.includes(specialization)
    ) {
      type = "Homeopathy";
    }

    setFilters({
      type: type,
      specializations: [lowerCasedSpecialization],
      gender: "",
      experience: 0,
      name: "",
    });
    navigate("/searchdoctor", { state: "hi" });
  };

  return (
    <div>
      <Headroom>
        <Navbar />
      </Headroom>

      <div>
        <div className="desktop">
          {/* Navbar */}
          {auth.userId && auth.userType === "customer" ? (
            <ChatBotAfterLogin />
          ) : (
            <ChatBot />
          )}
          {/*End Navbar */}

          <SecondopinionBanner />
          {/* Hero section */}
          <div className="container-second hero-main2 flex">
            <div className="hero2left flex">
              <div>
                <h1>
                  Wellness Wise: <span>Your</span> Path to
                </h1>
                <h1>
                  Better <span>Health</span>
                </h1>
              </div>
              <div>
                <p style={{ marginTop: "0px" }} className="priscriptionpara">
                  A doctor is a medical professional who diagnoses, treats, and
                  prevents illnesses, injuries, and various medical conditions
                  in individuals. Doctors play a crucial role in maintaining and
                  improving the health and well-being of their patients.{" "}
                </p>
              </div>

              <div className="main_bts flex">
                <a href="/doctor" className="main_btns flex">
                  <h4>Find Doctor</h4>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
                  </svg>
                </a>
                <a href="/hospital" className="main_btns flex">
                  <h4>Find Hospital</h4>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
                  </svg>
                </a>
                <a href="/labs" className="main_btns flex">
                  <h4>Find Labs</h4>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
                  </svg>
                </a>
                <a href="/pharmacy" className="main_btns flex">
                  <h4>Find Medicines</h4>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div className="hero2right flex">
              <img src={missingImg} alt="" />
            </div>
          </div>

{/* Service Section */}


<div className="container-second grid-container-service">

  <div>
    <h2>Explore</h2>
    <h2>Our Services</h2>
  </div>
<div className="mainservicecard">

<h2>200 + </h2>
<h2> Openings  For</h2>

<div className="mainservicecardlist">
<h3>Nurse</h3>
<h3>Doctor</h3>
<h3>Doctor</h3>
<h3>Doctor</h3>
<h3>&More</h3>
</div>


<img src="../images/job.png" alt="" />
<h4 className="servicecardtitle">
Careers
</h4>
</div>

<div className="mainservicecard mainservicecard2">

<h2>Clear Your</h2>
<h2>Medical Doubts</h2>

<div className="mainservicecardlist">
<h3>Ask a Question</h3>
<h3>Second Opinion</h3>
</div>


<img src="../images/ex.png" alt="" />
<h4 className="servicecardtitle servicecardtitle2">
Second Opinion
</h4>
</div>

<div className="mainservicecard mainservicecard3">

<h2>Home
</h2>
<h2>Services</h2>

<div className="mainservicecardlist">
<h3>Nurse</h3>
<h3>Doctor</h3>
<h3>Doctor</h3>
<h3>Doctor</h3>
<h3>&More</h3>
</div>


<img src="../images/ser.png" alt="" />
<h4 className="servicecardtitle servicecardtitle3">
Services
</h4>
</div>

<div className="mainservicecard mainservicecard4">

<h2>Medicine  </h2>
<h2>
At Home </h2>

<div className="mainservicecardlist">
<h3 style={{width:"80%"}}>Medicine
Through Prescription</h3>
<h3>Medical Products
Through Market</h3>

</div>


<img src="../images/medmain.png" alt="" />
<h4 className="servicecardtitle4 servicecardtitle">
Medicine
</h4>
</div>

      
</div>
     










          {/* <div className="hero_images wrapper">
            <div class="track">
              <div className="logo">
                <img src="images/main (1).jpg" alt="" />
              </div>
              <div className="logo">
                <img src="images/main (2).jpg" alt="" />
              </div>
              <div className="logo">
                <img src="images/main (4).jpg" alt="" />
              </div>
              <div className="logo">
                <img src="images/main (3).jpg" alt="" />
              </div>
              <div className="logo">
                <img src="images/main (5).jpg" alt="" />
              </div>
              <div className="logo">
                <img src="images/main (6).jpg" alt="" />
              </div>
              <div className="logo">
                <img src="images/ph1 (1).jpg" alt="" />
              </div>
            </div>
          </div> */}

          <div className=" container-second Specialties">
            <div className="second-main-head second-main-head2 flex">
              <h1>
                Our <span>Specialities</span>
              </h1>

              <div className="explore-more">
                <a href="/searchdoctor">
                  <h4>Explore More</h4>
                </a>
              </div>
            </div>

            <div className="home-specialties-cards flex">
              <div className="home-specialties-card  flex">
                <div className="home-specialties-image" data-aos="zoom-out">
                  <img src="/images/banner-web-01.png" alt="" />
                </div>
                <div className="home-specialties-titile">
                  <h4>Cold, Cough or</h4>
                  <h4>Fever</h4>
                </div>
                <div className="home-specialties-button">
                  <div>
                    <h4
                      onClick={() =>
                        handleSelectSpecialization("general medicine")
                      }
                    >
                      Find doctor
                    </h4>
                  </div>
                </div>
              </div>

              <div className="home-specialties-card flex">
                <div className="home-specialties-image" data-aos="zoom-out">
                  <img src="/images/1 (2).jpg" alt="" />
                </div>
                <div className="home-specialties-titile">
                  <h4>Period doubts or</h4>
                  <h4>Pregnancy</h4>
                </div>
                <div className="home-specialties-button">
                  <h4 onClick={() => handleSelectSpecialization("gynecology")}>
                    Find doctor
                  </h4>
                </div>
              </div>

              <div className="home-specialties-card flex">
                <div className="home-specialties-image" data-aos="zoom-out">
                  <img src="/images/1 (6).jpg" alt="" />
                </div>
                <div className="home-specialties-titile">
                  <h4>Acne, pimple or</h4>
                  <h4>skin issues</h4>
                </div>
                <div className="home-specialties-button" href="">
                  <h4 onClick={() => handleSelectSpecialization("dermatology")}>
                    Find doctor
                  </h4>
                </div>
              </div>

              <div className="home-specialties-card  flex">
                <div className="home-specialties-image" data-aos="zoom-out">
                  <img src="/images/banner-web-01.png" alt="" />
                </div>
                <div className="home-specialties-titile">
                  <h4>Cold, Cough or</h4>
                  <h4>Fever</h4>
                </div>
                <div className="home-specialties-button" href="">
                  <h4
                    onClick={() =>
                      handleSelectSpecialization("general medicine")
                    }
                  >
                    Find doctor
                  </h4>
                </div>
              </div>
            </div>

            <div
              className="home-specialties-cards flex"
              style={{ marginTop: "5vh" }}
            >
              <div className="home-specialties-card flex">
                <div className="home-specialties-image" data-aos="zoom-out">
                  <img src="/images/1 (1).jpg" alt="" />
                </div>
                <div className="home-specialties-titile">
                  <h4>Cold, Cough or</h4>
                  <h4>Fever</h4>
                </div>
                <div className="home-specialties-button" href="">
                  <h4
                    onClick={() =>
                      handleSelectSpecialization("general medicine")
                    }
                  >
                    Find doctor
                  </h4>
                </div>
              </div>

              <div className="home-specialties-card flex">
                <div className="home-specialties-image" data-aos="zoom-out">
                  <img src="/images/1 (4).jpg" alt="" />
                </div>
                <div className="home-specialties-titile">
                  <h4>Depression or</h4>
                  <h4>Anxiety</h4>
                </div>
                <div className="home-specialties-button">
                  <h4 onClick={() => handleSelectSpecialization("psychiatry")}>
                    Find doctor
                  </h4>
                </div>
              </div>

              <div className="home-specialties-card flex">
                <div className="home-specialties-image" data-aos="zoom-out">
                  <img src="/images/banner-web-01.png" alt="" />
                </div>
                <div className="home-specialties-titile">
                  <h4>Cold, Cough or</h4>
                  <h4>Fever</h4>
                </div>
                <div className="home-specialties-button">
                  <h4
                    onClick={() =>
                      handleSelectSpecialization("general medicine")
                    }
                  >
                    Find doctor
                  </h4>
                </div>
              </div>

              <div className="home-specialties-card flex">
                <div className="home-specialties-image" data-aos="zoom-out">
                  <img src="/images/1 (5).jpg" alt="" />
                </div>
                <div className="home-specialties-titile">
                  <h4>Child not feeling</h4>
                  <h4>well</h4>
                </div>
                <div className="home-specialties-button">
                  <h4 onClick={() => handleSelectSpecialization("paediatrics")}>
                    Find doctor
                  </h4>
                </div>
              </div>
            </div>
          </div>
          {/*End Specialties */}
          {/* Lab Tests */}

          <div className="MainPageTypeAndSpeciality">
            <div className="MainPageTypeAndSpecialityImgSec">
              <div className="second-main-head second-main-head2 flex">
                <h1>
                  Select our <span>Types</span> and <span>Specialities</span>
                </h1>
              </div>

              <div className="MainPageTypeAndSpecialityImgSecAlign">
                <img
                  src="/images/backgroundSpeciality.png"
                  className="MainPageTypeAndSpecialityImg"
                  alt=""
                />
                <div className="MainPageTypeAndSpecialityContentSec">
                  <div className="MainPageTypeAndSpecialityContentType">
                    {types?.map(
                      (ele, index) => (
                        // ele !== "Others" ?
                        <div
                          key={index}
                          onClick={() => {
                            clickChangeTypes(ele);
                          }}
                          className={
                            selectTypes[ele]
                              ? "MainPageTypeAndSpeTypeFlex MainPageTypeAndSpeTypeFlexselected "
                              : "MainPageTypeAndSpeTypeFlex"
                          }
                        >
                          <p>{ele}</p>
                          <ArrowCircleRightOutlinedIcon id="MainPageTypeAndSpeTypeIcon" />
                        </div>
                      )
                      // : ''
                    )}
                  </div>
                  <div className="MainPageTypeAndSpecialityContentServices">
                    {SpecialisationBatch?.map((ele, index) =>
                      SpecialisationBatch?.length > 0 ? (
                        <div key={index} className="spec_main_cards_align flex">
                          {ele?.map((speciality, index) => (
                            <div
                              key={index}
                              onClick={() =>
                                handleSelectSpecialization(speciality)
                              }
                              className="spec_main_card flex"
                            >
                              <h4>{speciality}</h4>
                              <div className="spec_main_card_button flex">
                                <i class="ri-arrow-right-line"></i>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <InnerLoader />
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-second home-lab">
            <div className="second-main-head">
              <h1>
                Popular <span>lab tests</span> &amp; profiles
              </h1>
            </div>

            <div
              onClick={() => {
                navigate("/labfiltering");
              }}
              className="lab-content flex"
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="3000"
            >
              <div className="lab-left">
                <div className="home-lab-title">
                  <h2>HEALTH TEST AT YOUR HOME</h2>
                </div>
                <div className="lab-datas flex">
                  <div className="lab-data-left flex">
                    <div>
                      <i className="ri-arrow-right-circle-line" />
                    </div>
                    <a href></a>
                    <h4>
                      <a href>CBC(Complete Blood Count)</a>
                    </h4>
                  </div>
                  <div className="lab-data-right flex">
                    <div>
                      <i className="ri-arrow-right-circle-line" />
                    </div>
                    <a href></a>
                    <h4>
                      <a href>Thyroid Profile Total(T3, T4 &amp; TSH)</a>
                    </h4>
                  </div>
                </div>
                <div className="lab-datas flex">
                  <div className="lab-data-left flex">
                    <div>
                      <i className="ri-arrow-right-circle-line" />
                    </div>
                    <a href></a>
                    <h4>
                      <a href>LFT (Liver Function Test)</a>
                    </h4>
                  </div>
                  <div className="lab-data-right flex">
                    <div>
                      <i className="ri-arrow-right-circle-line" />
                    </div>
                    <a href></a>
                    <h4>
                      <a href>Diabetes Screening (HbA1C &amp; Fasting Sugar)</a>
                    </h4>
                  </div>
                </div>
                <div className="lab-datas flex">
                  <div className="lab-data-left flex">
                    <div>
                      <i className="ri-arrow-right-circle-line" />
                    </div>
                    <a href></a>
                    <h4>
                      <a href>Lipid Profile</a>
                    </h4>
                  </div>
                  <div className="lab-data-right flex">
                    <div>
                      <i className="ri-arrow-right-circle-line" />
                    </div>
                    <a href></a>
                    <h4>
                      <a href>COVID-RTPCR</a>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="lab-right">
                <div className="home-lab-title">
                  <h2>VISIT A LAB NEAR YOU</h2>
                </div>
                <div className="lab-datas flex">
                  <div className="lab-data-left flex">
                    <div>
                      <i className="ri-arrow-right-circle-line" />
                    </div>
                    <a href></a>
                    <h4>
                      <a href>Ultrasound Whole Abdomen</a>
                    </h4>
                  </div>
                  <div className="lab-data-right flex">
                    <div>
                      <i className="ri-arrow-right-circle-line" />
                    </div>
                    <a href></a>
                    <h4>
                      <a href>Electrocardiography</a>
                    </h4>
                  </div>
                </div>
                <div className="lab-datas flex">
                  <div className="lab-data-left flex">
                    <div>
                      <i className="ri-arrow-right-circle-line" />
                    </div>
                    <a href></a>
                    <h4>
                      <a href>X-Ray Chest PA View</a>
                    </h4>
                  </div>
                  <div className="lab-data-right flex">
                    <div>
                      <i className="ri-arrow-right-circle-line" />
                    </div>
                    <a href></a>
                    <h4>
                      <a href>MRI Brain</a>
                    </h4>
                  </div>
                </div>
                <div className="lab-datas flex">
                  <div className="lab-data-left flex">
                    <div>
                      <i className="ri-arrow-right-circle-line" />
                    </div>
                    <a href></a>
                    <h4>
                      <a href>NCCT Scan Brain</a>
                    </h4>
                  </div>
                  <div className="lab-data-right flex">
                    <div>
                      <i className="ri-arrow-right-circle-line" />
                    </div>
                    <a href></a>
                    <h4>
                      <a href>MRI Cervical Spine</a>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*End Lab tests */}

          {/* Diagnostic */}
          <div className="container-second diagnostic">
            <div className="second-main-head second-main-head2 flex">
              <h1>
                Top Booked <span> Diagnostic</span> Tests
              </h1>
              <div className="explore-more">
                <a href="/labfiltering">
                  <h4>Explore More</h4>
                </a>
              </div>
            </div>

            <div className="diagnostic-cards flex">
              {services.map((ele, index) =>
                index < 4 ? (
                  <div
                    key={index}
                    onClick={() => {
                      navigateElements(ele);
                    }}
                    className="diagnostic-card"
                  >
                    <h2>{ele}</h2>
                    <div className="diagnostic-paragraph">
                      <h4>
                        Generate Lorem Ipsum favorite writing, design and
                        blogging tools. Explore the origins, history and meaning
                        of the famous pa
                      </h4>
                    </div>
                    <div className="flex price-section">
                      <h2>₹ 456</h2>
                      {/* <a href>
                    <h4 className="diagnostic-button">Add</h4>
                  </a> */}
                    </div>
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
          {/*End Diagnostic */}
          {/* Footer */}

          {/*End Footer */}
      <Footer />
        </div>

        {/* Mobile Screen */}

       
      </div>

    </div>
  );
}
