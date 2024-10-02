import React, { Fragment, useContext, useEffect, useState } from "react";
import "./hospital.css";
import Headroom from "react-headroom";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { Link, useNavigate } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import { port } from "../../../config";
import { MyContext } from "../../../contexts/Contexts";
import { useAuth } from "../../../contexts/Auth/AuthProvider";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import ImageScroll from "../../../components/ImageScroll";
import MyCarousel from "../../../components/MyCarousel";
import CountingEffect from "../../../components/CountingEffect";
export default function Hospital() {
  const navigate = useNavigate();
  const [SpecialisationBatch, setSpecialisationBatch] = useState([]);
  const [FullSpecialisation, setFullSpecialisation] = useState([]);
  const { Categories, setCategories } = useContext(MyContext);
  const { auth } = useAuth;
  const axiosPrivate = useAxiosPrivate();
  const SearchHostpital = () => {
    navigate("/hospitalfilter");
  };

  const handleFilterByType = (Value) => {
    navigate("/hospitalfilter", { state: { type: Value } });
  };
  const handleFilterBySpeciality = (Value) => {
    if (speacializationNames.includes(Value?.speciality)) {
      handleSearchData("Allopathy", Value?.speciality);
      navigate("/hospitalfilter", {
        state: { focusArea: Value?.speciality, type: "Allopathy" },
      });
    } else if (ayurSpec.includes(Value?.speciality)) {
      handleSearchData("Ayurvedic", Value?.speciality);
      navigate("/hospitalfilter", {
        state: { focusArea: Value?.speciality, type: "Ayurvedic" },
      });
    } else if (homeoDept.includes(Value?.speciality)) {
      handleSearchData("Homeopathy", Value?.speciality);
      navigate("/hospitalfilter", {
        state: { focusArea: Value?.speciality, type: "Homeopathy" },
      });
    }
  };
  const speacializationNames = Categories?.allopathySpecs;
  const homeoDept = Categories?.homeopathySpecs;
  const ayurSpec = Categories?.ayurvedicSpecs;
  const TemPImg = "./images/TempHosImg.jpg";
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

  useEffect(() => {
    const array = [1, 1];
    let Check = [];
    let finalRe = [];
    let FinishData = "";
    array?.map((ele) => {
      if (!Check?.includes(ele)) {
        Check.push(ele);
      } else if (Check?.includes(ele)) {
        finalRe.push(ele);
      }
      if (!finalRe.includes(ele)) {
        FinishData = ele;
      }
    });
    console.log(FinishData);
  }, []);
  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       (pos) => {
  //         setPosition({
  //           latitude: pos.coords.latitude,
  //           longitude: pos.coords.longitude,
  //         });
  //       },
  //       (error) => {
  //         console.error("Error getting geolocation: ", error);
  //       }
  //     );
  //   } else {
  //     console.log("Geolocation is not available in your browser.");
  //   }
  // }, []);

  const handleSearchData = async (type, speciality) => {
    try {
      const payload = {
        user_id: auth.userId,
        speciality: speciality,
        type: type,
      };
      const response = await axiosPrivate.post(
        `${port}/hospital/hospital_searchdata`,
        payload
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

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

  const handleNavigate = (type) => {
    handleFilterByType(type);
    handleSearchData(type);
  };
  return (
    <>
      <div className="hospital_web">
        <Headroom>
          <Navbar />
        </Headroom>

        <div className="hospital_web">
          <div className="container">
            {/* <div className="hospital-head-section flex">
            <div className="hospital-heading flex">
              <h1>
                Find <span className="color-blue">Hospitals </span>From
              </h1>
              <h1>Your Location</h1>
            </div>


            <div className="hospital-search-box flex">
              <div
                onClick={SearchHostpital}
                className="Hospital-container-search flex"
              >
                <div className="Hospital-Search-box flex">
                  <div className="Hospital-location-section flex">
                    <i className="ri-map-pin-2-line" />

                    <input
                      className="Hospital-Location-input"
                      type="text"
                      placeholder="Select location"
                    />
                  </div>
                  <input
                    className="Hospital-search-input"
                    type="text"
                    placeholder="Search Hospitals"
                  />
                  <div className="Hospital-search-section flex">
                    <i className="ri-search-2-line" />
                  </div>
                </div>
              </div>
            </div>
          </div> */}

            {/* <div className="hospital-banner-section">
            <img src="images/hos.jpeg" alt="" />
          </div> */}

            {/* Hospital Hero New */}

            <div class="hospital-hero-container">
              <div class="hospital-hero-containerfirst">
                <div>
                  <h1>
                    Find <span className="color-blue">Hospitals</span> From
                  </h1>
                  <h1>Your Location </h1>
                </div>
                <p className="priscriptionpara" style={{ width: "90%" }}>
                  To use local images in your React carousel, you'll need to
                  import them directly into your component. Here’s how you can
                  update the previous example to use local images
                </p>
                <div className="hospital-hero-containerfirst2">
                  <div className="flex hospital-hero-containerfirst21">
                    <div>
                      <CountingEffect
                        targetNumber={5000}
                        duration={3000}
                        prefix="+"
                        style={{ color: "green" }}
                      />
                      <h3>Hospitals</h3>
                    </div>
                    <div>
                      <CountingEffect
                        targetNumber={40}
                        duration={3000}
                        prefix="+"
                        style={{ color: "#f43f5e" }}
                      />
                      <h3>Specialities</h3>
                    </div>
                    <div>
                      <CountingEffect
                        targetNumber={3000}
                        duration={3000}
                        prefix="+"
                        style={{ color: "#7c3aed" }}
                      />
                      <h3>Hospitals</h3>
                    </div>
                  </div>
                  <button onClick={SearchHostpital}>
                    Search Hospitals <i class="ri-arrow-right-up-line"></i>
                  </button>
                </div>
              </div>
              <div class="hospital-hero-containersecond">
                <MyCarousel />
                {/* <img src="../images/hohero.jpg" alt="" /> */}
              </div>
            </div>
          </div>
          {/* Hospital Hero New*/}

          <div className="imageset">
            <ImageScroll />
          </div>

          <div className="container">
            {/* Medical field */}

            <div className="medical_field flex">
              <div className="medical_left flex">
                <div>
                  <h1>Find Hospital by</h1>
                  <h1>
                    <span className="color-blue">Medical Field</span>
                  </h1>
                </div>

                <div>
                  <div className="medical_images_1"></div>

                  <div
                    onClick={() => {
                      handleNavigate("Allopathy");
                    }}
                    className="medical_data_1 flex"
                  >
                    <div className="flex new">
                      <h4>Allopathy</h4>
                      <i class="ri-arrow-right-circle-line"></i>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="medical_images_1 medical_images_2"></div>
                  <div className="medical_data_1 flex">
                    <div
                      onClick={() => {
                        handleNavigate("Homeopathy");
                      }}
                      className="flex new"
                    >
                      <h4>Homeopathy</h4>
                      <i class="ri-arrow-right-circle-line"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="medical_image flex">
                <img src="images/do.jpg" alt="" />
              </div>

              <div className="medical_right flex">
                <div style={{ visibility: "hidden" }} className="new2">
                  <div className="medical_images_1 medical_images_3"></div>

                  <div
                    onClick={() => {
                      handleNavigate("Unani");
                    }}
                    className="medical_data_1 flex"
                  >
                    <div className="flex new">
                      <h4>Unani</h4>
                      <i class="ri-arrow-right-circle-line"></i>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="medical_images_1 medical_images_4"></div>

                  <div
                    onClick={() => {
                      handleNavigate("Ayurvedic");
                    }}
                    className="medical_data_1 flex"
                  >
                    <div className="flex new">
                      <h4>Ayurvedic</h4>
                      <i class="ri-arrow-right-circle-line"></i>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="medical_images_1 medical_images_5"></div>

                  <div
                    onClick={() => {
                      handleNavigate("Others");
                    }}
                    className="medical_data_1 flex"
                  >
                    <div className="flex new">
                      <h4>Other</h4>
                      <i class="ri-arrow-right-circle-line"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*End Medical field */}

            <div className="second-main-head">
              <h1>
                Find Hospital by{" "}
                <span className="color-blue">Specialities </span>
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
                          onClick={() => {
                            handleFilterBySpeciality({
                              speciality: speciality,
                            });
                          }}
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

            {/* Featured Partner */}

            <div className="Featured-partner">
              <div className="second-main-head">
                <h1>
                  Our <span className="color-blue">Featured</span> Partners
                </h1>
              </div>

              <div className="featured-doctor flex">
                <div className="featured-doctor-card flex">
                  <div className="featured-doctor-card-photo">
                    <img src={TemPImg} alt="" />
                  </div>

                  <div className="featured-doctor-card-datas flex">
                    <h2>Baby Memorial Hospital</h2>
                    <h4 style={{ color: "#3A65FD" }}>General medicine</h4>
                  </div>

                  <div className="featured-doctor-card-button">
                    <Link to="/hospitalfilter">
                      <h4>View Profile</h4>
                    </Link>
                  </div>
                </div>

                <div className="featured-doctor-card flex">
                  <div className="featured-doctor-card-photo">
                    <img src={TemPImg} alt="" />
                  </div>

                  <div className="featured-doctor-card-datas flex">
                    <h2>Ahalia Eye Hospital</h2>
                    <h4 style={{ color: "#3A65FD" }}>General medicine</h4>
                  </div>

                  <div className="featured-doctor-card-button">
                    <Link to="/hospitalfilter">
                      <h4>View Profile</h4>
                    </Link>
                  </div>
                </div>

                <div className="featured-doctor-card flex">
                  <div className="featured-doctor-card-photo">
                    <img src={TemPImg} alt="" />
                  </div>

                  <div className="featured-doctor-card-datas flex">
                    <h2>AKSAA EYE HOSPITAL</h2>
                    <h4 style={{ color: "#3A65FD" }}>General medicine</h4>
                  </div>

                  <div className="featured-doctor-card-button">
                    <Link to="/hospitalfilter">
                      <h4>View Profile</h4>
                    </Link>
                  </div>
                </div>

                <div className="featured-doctor-card flex">
                  <div className="featured-doctor-card-photo">
                    <img src={TemPImg} alt="" />
                  </div>

                  <div className="featured-doctor-card-datas flex">
                    <h2>Allen Homoeo Clinic</h2>
                    <h4 style={{ color: "#3A65FD" }}>General medicine</h4>
                  </div>

                  <div className="featured-doctor-card-button">
                    <Link to="/hospitalfilter">
                      <h4>View Profile</h4>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* End Featured Partner */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
