import React, { useState, useContext, useEffect } from "react";
import Footer from "../../../components/Footer";
import "../doctor/doctor.css";
import { Swiper, SwiperSlide } from "swiper/react";
import Headroom from "react-headroom";
import SearchIcon from "@mui/icons-material/Search";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";

import $ from "jquery"; // Import jQuery
import Navbar from "../../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../../contexts/Contexts";
import { SearchDocContext } from "../../../contexts/Doctor/SearchDoctorProvider";
import axios from "axios";
import { port } from "../../../config";
import useAuth from "../../../hooks/useAuth";
export default function Doctor() {
  const [visibleContent, setVisibleContent] = useState(2);
  const [SpecialisationBatch, setSpecialisationBatch] = useState([]);
  const [FullSpecialisation, setFullSpecialisation] = useState([]);
  const { Categories } = useContext(MyContext);
  const {
    setFilters,
    setFilteredDoctors,
    setDocsBySearch,
    setAllDocsBySearch,
  } = useContext(SearchDocContext);
  const navigate = useNavigate();
  const { auth } = useAuth();
  const content = [
    $(document).ready(function () {
      $(".content").slice(0, 2).show();
      $("#loadMore").on("click", function (e) {
        e.preventDefault();
        $(".content:hidden").slice(0, 2).slideDown();
        if ($(".content:hidden").length == 0) {
          $("#loadMore").text("No Content").addClass("noContent");
        }
      });
    }),
  ];
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

  const showMoreContent = () => {
    console.log("first");
    setVisibleContent((prev) => prev + 1); // Increase visible content count by 4 on click
  };

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
    handleSearchData(type, lowerCasedSpecialization);
    setFilters({
      type: type,
      specializations: [lowerCasedSpecialization],
      gender: "",
      experience: 0,
      name: "",
    });
    navigate("/searchdoctor", { state: "hi" });
  };

  const handleSearchData = async (type, speciality) => {
    try {
      const data = {
        user_id: auth?.userId || "",
        speciality: speciality || "",
        type: type || "",
      };
      const response = await axios.post(
        `${port}/doctor/doctor_searchdata`,
        data
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

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

  const speacializationNames = Categories?.allopathySpecs;
  const homeoDept = Categories?.homeopathySpecs;
  const ayurSpec = Categories?.ayurvedicSpecs;
  // const type = Categories?.types

  useEffect(() => {
    const Data = [
      ...(speacializationNames || []),
      ...(homeoDept || []),
      ...(ayurSpec || []),
    ];
    let settingAllopathy = 0;
    let AllopathyUpdatingBatch = [];
    Data.forEach((ele, index) => {
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
    setFullSpecialisation(Data);
  }, [Categories]);

  const SearchSpeciality = (e) => {
    const query = e?.target?.value.toLowerCase();
    let settingAllopathy = 0;
    let AllopathyUpdatingBatch = [];
    const queryLowerCase = query.toLowerCase();

    const filteredData = FullSpecialisation.filter((data) =>
      data.toLowerCase().startsWith(queryLowerCase)
    );

    const remainingData = FullSpecialisation.filter(
      (data) => !data.toLowerCase().startsWith(queryLowerCase)
    );
    const finalFilter = [...filteredData, ...remainingData];
    finalFilter.forEach((ele, index) => {
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
    // console.log("SearchData>>>>", SearchData);
  };

  return (
    <div>
      <Headroom>
        <Navbar />
      </Headroom>

      <div className="desktop container">
        <div className="doctor-banner">
          <div className="second-main-head doctor-head">
            <h1>
              Find <span> Doctors</span> From
            </h1>
            <h1> Your Location </h1>
          </div>
          <div className="doctor-details flex">
            <div className="just flex" style={{ gap: "40px" }}>
              <div>
                <div>
                  <h1 style={{ color: "white" }}>30 +</h1>
                </div>
                <div>
                  <h3>Consultations</h3>
                </div>
              </div>
              <div>
                <div>
                  <h1 style={{ color: "white" }}>34 +</h1>
                </div>
                <div>
                  <h3>Specialities</h3>
                </div>
              </div>
            </div>
            <div className="hello">
              <img
                className="doctor-top-img"
                src="images/doc-main.png"
                alt=""
              />
            </div>
          </div>
        </div>

        <div
          className="Doctor-search-box flex"
          onClick={() => navigate("/searchdoctor")}
        >
          <div className="Doctor-container-search flex">
            <div className="Doctor-Search-box flex">
              <div className="Doctor-location-section flex">
                <i className="ri-map-pin-2-line" />
                <input
                  className="Doctor-Location-input"
                  type="text"
                  placeholder="Select location"
                />
              </div>
              <div className="Doctor-search-input flex">
                <input type="text" placeholder="Search Doctor" />
              </div>
              <div className="Doctor-search-section flex">
                <i className="ri-search-2-line" />
              </div>
            </div>
          </div>
        </div>

        <div className="our-specialities">
          <div className="second-main-head">
            <h1>
              Find Doctor by <span className="color-blue">Health Concern</span>
            </h1>
          </div>

          <Swiper
            navigation={{
              nextEl: ".nextButton",
              prevEl: ".prevButton",
            }}
            modules={[Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="home-specialties-cards2" id="style-2">
                <div className="home-specialties-card home-specialties-card2 flex">
                  <div className="home-specialties-image">
                    <img src="/images/1 (2).jpg" alt="" />
                  </div>
                  <div className="home-specialties-titile">
                    <h4>Periods doubts or</h4>
                    <h4>Pregnancy</h4>
                  </div>
                  <div
                    onClick={() => handleSelectSpecialization("gynecology")}
                    className="home-specialties-button"
                  >
                    <h4>Consult Now</h4>
                  </div>
                </div>

                <div className="home-specialties-card home-specialties-card2 flex">
                  <div className="home-specialties-image">
                    <img src="/images/1 (6).jpg" alt="" />
                  </div>
                  <div className="home-specialties-titile">
                    <h4>Acne, pimple or</h4>
                    <h4>skin issues</h4>
                  </div>
                  <div
                    onClick={() => handleSelectSpecialization("dermatology")}
                    className="home-specialties-button"
                  >
                    <h4>Consult Now</h4>
                  </div>
                </div>

                <div className="home-specialties-card home-specialties-card2 flex">
                  <div className="home-specialties-image">
                    <img src="/images/1 (1).jpg" alt="" />
                  </div>
                  <div className="home-specialties-titile">
                    <h4>Cold, cough or</h4>
                    <h4>Fever</h4>
                  </div>
                  <div
                    onClick={() =>
                      handleSelectSpecialization("general medicine")
                    }
                    className="home-specialties-button"
                  >
                    <h4>Consult Now</h4>
                  </div>
                </div>

                <div className="home-specialties-card home-specialties-card2 flex">
                  <div className="home-specialties-image">
                    <img src="/images/1 (4).jpg" alt="" />
                  </div>
                  <div className="home-specialties-titile">
                    <h4>Depression or</h4>
                    <h4>Anxiety</h4>
                  </div>
                  <div
                    onClick={() => handleSelectSpecialization("mental health")}
                    className="home-specialties-button"
                  >
                    <h4>Consult Now</h4>
                  </div>
                </div>

                <div className="home-specialties-card home-specialties-card2 flex">
                  <div className="home-specialties-image">
                    <img src="/images/1 (5).jpg" alt="" />
                  </div>
                  <div className="home-specialties-titile">
                    <h4>Child not feeling</h4>
                    <h4>well</h4>
                  </div>
                  <div
                    onClick={() => handleSelectSpecialization("pediatrics")}
                    className="home-specialties-button"
                  >
                    <h4>Consult Now</h4>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="home-specialties-cards2" id="style-2">
                <div className="home-specialties-card home-specialties-card2 flex">
                  <div className="home-specialties-image">
                    <img src="/images/cardio.jpg" alt="" />
                  </div>
                  <div className="home-specialties-titile">
                    <h4>Heart Failure or</h4>
                    <h4>Attack</h4>
                  </div>
                  <div className="home-specialties-button">
                    <h4>Consult Now</h4>
                  </div>
                </div>

                <div className="home-specialties-card home-specialties-card2 flex">
                  <div className="home-specialties-image">
                    <img src="/images/ortho.jpg" alt="" />
                  </div>
                  <div className="home-specialties-titile">
                    <h4>Back Pain,Ligament </h4>
                    <h4>Fracture</h4>
                  </div>
                  <div className="home-specialties-button">
                    <h4>Consult Now</h4>
                  </div>
                </div>

                <div className="home-specialties-card home-specialties-card2 flex">
                  <div className="home-specialties-image">
                    <img src="/images/neu.jpg" alt="" />
                  </div>
                  <div className="home-specialties-titile">
                    <h4>Alzheimer's,</h4>
                    <h4>Epilepsy</h4>
                  </div>
                  <div className="home-specialties-button">
                    <h4>Consult Now</h4>
                  </div>
                </div>

                <div className="home-specialties-card home-specialties-card2 flex">
                  <div className="home-specialties-image">
                    <img src="/images/pul.jpg" alt="" />
                  </div>
                  <div className="home-specialties-titile">
                    <h4>Asthma</h4>
                    <h4>Pneumonia</h4>
                  </div>
                  <div className="home-specialties-button">
                    <h4>Consult Now</h4>
                  </div>
                </div>

                <div className="home-specialties-card home-specialties-card2 flex">
                  <div className="home-specialties-image">
                    <img src="/images/gastro.jpg" alt="" />
                  </div>
                  <div className="home-specialties-titile">
                    <h4>Constipation,</h4>
                    <h4>Acidity</h4>
                  </div>
                  <div className="home-specialties-button">
                    <h4>Consult Now</h4>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="home-specialties-cards2" id="style-2">
                <div className="home-specialties-card home-specialties-card2 flex">
                  <div className="home-specialties-image">
                    <img src="/images/ophtha.jpg" alt="" />
                  </div>
                  <div className="home-specialties-titile">
                    <h4>Cataract,</h4>
                    <h4>Glaucoma</h4>
                  </div>
                  <div className="home-specialties-button">
                    <h4>Consult Now</h4>
                  </div>
                </div>

                <div className="home-specialties-card home-specialties-card2 flex">
                  <div className="home-specialties-image">
                    <img src="/images/ENT.jpg" alt="" />
                  </div>
                  <div className="home-specialties-titile">
                    <h4>Hearing Loss,</h4>
                    <h4>Ear Infection</h4>
                  </div>
                  <div className="home-specialties-button">
                    <h4>Consult Now</h4>
                  </div>
                </div>

                <div className="home-specialties-card home-specialties-card2 flex">
                  <div className="home-specialties-image">
                    <img src="/images/det.jpg" alt="" />
                  </div>
                  <div className="home-specialties-titile">
                    <h4>Cavities,</h4>
                    <h4>Gum disease</h4>
                  </div>
                  <div className="home-specialties-button">
                    <h4>Consult Now</h4>
                  </div>
                </div>

                <div className="home-specialties-card home-specialties-card2 flex">
                  <div className="home-specialties-image">
                    <img src="/images/cos.jpg" alt="" />
                  </div>
                  <div className="home-specialties-titile">
                    <h4>Asthma</h4>
                    <h4>Pneumonia</h4>
                  </div>
                  <div className="home-specialties-button">
                    <h4>Consult Now</h4>
                  </div>
                </div>

                <div className="home-specialties-card home-specialties-card2 flex">
                  <div className="home-specialties-image">
                    <img src="/images/neph.jpg" alt="" />
                  </div>
                  <div className="home-specialties-titile">
                    <h4>Kidney failure,</h4>
                    <h4>Kidney stones</h4>
                  </div>
                  <div className="home-specialties-button">
                    <h4>Consult Now</h4>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="swiper-new-buttons flex">
          <button className="prevButton">
            <i className="ri-arrow-left-fill"></i>
          </button>
          <button className="nextButton">
            <i className="ri-arrow-right-fill"></i>
          </button>
        </div>

        <div className="second-main-head">
          <h1>
            Find Doctor by <span className="color-blue">Specialities </span>
          </h1>
        </div>

        <div className="doctor_spe"></div>

        <div className="doctor_spec flex">
          <div className="doctor_spec_card">
            <div className="spec_main_cards_SearchBox">
              <div className="spec_main_cards_SearchBox">
                <div className="search-input-wrapper">
                  <span className="search-icon">
                    <SearchIcon />
                  </span>
                  <input
                    onChange={SearchSpeciality}
                    type="text"
                    placeholder="Search your specialities"
                  />
                </div>
              </div>
            </div>
            <div className="doctor_spec_SectionSetting">
              {SpecialisationBatch?.map((ele) => (
                <div className="spec_main_cards_align flex">
                  {ele?.map((speciality) => (
                    <div
                      onClick={() => handleSelectSpecialization(speciality)}
                      className="spec_main_card flex"
                    >
                      <h4>{speciality}</h4>
                      <div className="spec_main_card_button flex">
                        <i class="ri-arrow-right-line"></i>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="Featured-partner">
          <div className="second-main-head">
            <h1>
              Our <span className="color-blue">Featured</span> Partners
            </h1>
          </div>

          <div className="featured-doctor flex">
            <div className="featured-doctor-card flex">
              <div className="featured-doctor-card-photo">
                <img src="images/dr (4).jpg" alt="" />
              </div>

              <div className="featured-doctor-card-datas flex">
                <h2>Dr.Rohith Raj</h2>
                <h4 style={{ color: "#3A65FD" }}>Dentist,Cosmetic</h4>
              </div>

              <div className="featured-doctor-card-button">
                <h4>View Profile</h4>
              </div>
            </div>

            <div className="featured-doctor-card flex">
              <div className="featured-doctor-card-photo">
                <img src="images/dr (3).jpg" alt="" />
              </div>

              <div className="featured-doctor-card-datas flex">
                <h2>Dr.Rohith Raj</h2>
                <h4 style={{ color: "#3A65FD" }}>Dentist,Cosmetic</h4>
              </div>

              <div className="featured-doctor-card-button">
                <h4>View Profile</h4>
              </div>
            </div>

            <div className="featured-doctor-card flex">
              <div className="featured-doctor-card-photo">
                <img src="images/dr (2).jpg" alt="" />
              </div>

              <div className="featured-doctor-card-datas flex">
                <h2>Dr.Rohith Raj</h2>
                <h4 style={{ color: "#3A65FD" }}>Dentist,Cosmetic</h4>
              </div>

              <div className="featured-doctor-card-button">
                <h4>View Profile</h4>
              </div>
            </div>

            <div className="featured-doctor-card flex">
              <div className="featured-doctor-card-photo">
                <img src="images/dr (1).jpg" alt="" />
              </div>

              <div className="featured-doctor-card-datas flex">
                <h2>Dr.Rohith Raj</h2>
                <h4 style={{ color: "#3A65FD" }}>Dentist,Cosmetic</h4>
              </div>

              <div className="featured-doctor-card-button">
                <h4>View Profile</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
