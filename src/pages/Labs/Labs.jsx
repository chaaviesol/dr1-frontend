import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import "../Labs/labs.css";
import { Swiper, SwiperSlide } from "swiper/react";
import Headroom from "react-headroom";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { services } from "./LabFIltering/constatnts/Filter";
import axios from "axios";
import { port } from "../../config";
import useAuth from "../../hooks/useAuth";

export default function Labs() {
  const navigate = useNavigate();
  const [LabServicesData, setLabServicesData] = useState([]);
  const { auth } = useAuth();
  useEffect(() => {
    let labServicesInd = 0;
    let AllopathyUpdatingBatch = [];
    services.forEach((ele, index) => {
      if (
        !AllopathyUpdatingBatch[labServicesInd] ||
        AllopathyUpdatingBatch[labServicesInd].length < 4
      ) {
        AllopathyUpdatingBatch[labServicesInd] = [
          ...(AllopathyUpdatingBatch[labServicesInd] || []),
          ele,
        ];
      } else {
        labServicesInd += 1;
        AllopathyUpdatingBatch[labServicesInd] = [ele];
      }
      setLabServicesData(AllopathyUpdatingBatch);
    });
  }, []);
  console.log(LabServicesData);
  const navigateElements = (value) => {
    console.log("value>>>>>", value);
    navigate("/labfiltering", { state: { services: value } });
  };

  const handleNavigation = (categoryId) => {

    navigate("/pharmacyproducts", {
      state: { passedCategoryId: categoryId },
    })

};


  const handleSearchData = async (type, speciality) => {
    try {
      const data = {
        user_id: auth.userId,
        speciality: speciality,
        type: type,
      };
      const response = await axios.post(`${port}/lab/lab_searchdata`, data);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };
  const [marketplaceProducts, setMarketplaceProducts] = useState([]);

  useEffect(() => {
    axios.get(`${port}/product/getcategory`).then((res) => {
      console.log(res?.data);
      if (res?.status === 200) {
        // setIsLoading(false);
        setMarketplaceProducts(res?.data?.data);
      }
    });
  }, [marketplaceProducts]);

  return (
    <div>
      <Headroom>
        <Navbar />
      </Headroom>

      <div className="desktoplab">
        <div className="container labs-banner flex">
          <div>
            <h1 style={{ color: "white" }}>
              Find Your <span className="color-blue"> Labs From</span>{" "}
            </h1>
            <h1 style={{ color: "white" }}> Your Location </h1>
          </div>

          {/* Search Box */}

          <div className="Lab-search-box flex">
            <div className="Lab-container-search flex">
              <div
                onClick={() => {
                  navigate("/labfiltering");
                }}
                className="Lab-Search-box flex"
              >
                <div className="Lab-location-section flex">
                  <i className="ri-map-pin-2-line" />
                  <input
                    className="Lab-Location-input"
                    type="text"
                    placeholder="Select location"
                  />
                </div>
                <div className="Lab-search-input flex">
                  <input type="text" placeholder="Search Labs " />
                </div>
                <div className="Lab-search-section flex">
                  <i className="ri-search-2-line" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*End Search box */}

        <div className="container health-concern">
          <div className="second-main-head">
            <h1>
              Find Test by <span className="color-blue">Health Concern</span>
            </h1>
          </div>
          <div className="health-concern flex">
            <div
              onClick={() => {
                handleSearchData("Fever", "Fever");
                navigate("/labfiltering");
              }}
              className="home-specialties-card flex"
            >
              <div className="home-specialties-image">
                <img src="/images/1 (2).jpg" alt="" />
              </div>
              <div className="home-specialties-titile">
                <h4>Fever</h4>
              </div>
            </div>
            <div
              onClick={() => {
                handleSearchData("Allopathy", "General medicine");
                navigate("/labfiltering");
              }}
              className="home-specialties-card flex"
            >
              <div className="home-specialties-image">
                <img src="/images/1 (6).jpg" alt="" />
              </div>
              <div className="home-specialties-titile">
                <h4>Diabetes</h4>
              </div>
            </div>
            <div
              onClick={() => {
                handleSearchData("Allopathy", "General medicine");
                navigate("/labfiltering");
              }}
              className="home-specialties-card flex"
            >
              <div className="home-specialties-image">
                <img src="/images/1 (4).jpg" alt="" />
              </div>
              <div className="home-specialties-titile">
                <h4>Skin</h4>
              </div>
            </div>
            <div
              onClick={() => {
                handleSearchData("Allopathy", "General medicine");
                navigate("/labfiltering");
              }}
              className="home-specialties-card flex"
            >
              <div className="home-specialties-image">
                <img src="/images/1 (5).jpg" alt="" />
              </div>
              <div className="home-specialties-titile">
                <h4>Kidney</h4>
              </div>
            </div>
            <div
              onClick={() => {
                handleSearchData("Allopathy", "General medicine");
                navigate("/labfiltering");
              }}
              className="home-specialties-card flex"
            >
              <div className="home-specialties-image">
                <img src="/images/1 (2).jpg" alt="" />
              </div>
              <div className="home-specialties-titile">
                <h4>Digestion</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="diagnostic container">
          <div className="second-main-head">
            <h1>
              Top Booked <span className="color-blue">Diagnostic Test</span>
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
            {LabServicesData.map((ServiceEle) => (
              <SwiperSlide>
                <div className="lab-diagnostic-cards-Map">
                  {ServiceEle.map((ele) => (
                    <div
                      onClick={() => {
                        navigateElements(ele);
                        handleSearchData(ele);
                      }}
                      className="lab-diagnostic-cards flex"
                    >
                      <div className="lab-diagnostic-card">
                        <h2>{ele}</h2>
                        <div className="lab-diagnostic-paragraph">
                          <h4>
                            Generate Lorem Ipsum favorite writing, design and
                            blogging tools. Explore the origins, history and
                            meaning of the famous pa
                          </h4>
                        </div>
                        <div className="flex lab-price-section">
                          {/* <h2>₹ 456</h2> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-new-buttons flex">
            <button className="prevButton">
              <i class="ri-arrow-left-fill"></i>
            </button>
            <button className="nextButton">
              <i class="ri-arrow-right-fill"></i>
            </button>
          </div>
        </div>

        <div className=" container Featured-partner">
          <div className="second-main-head">
            <h1>
              Our <span className="color-blue">Featured</span> Partners
            </h1>
          </div>

          <div className="featured-doctor flex">
            <div className="featured-doctor-card flex">
              <div className="featured-doctor-card-photo">
                <img src="images/la (3).jpg" alt="" />
              </div>

              <div className="featured-doctor-card-datas flex">
                <h2>Dr Lal PathLabs</h2>
                <h4 style={{ color: "#3A65FD" }}>Medical Microbiology</h4>
              </div>

              <div className="featured-doctor-card-button">
                <Link to="/labfiltering">
                  <h4>View Profile</h4>
                </Link>
              </div>
            </div>

            <div className="featured-doctor-card flex">
              <div className="featured-doctor-card-photo">
                <img src="images/la (3).jpg" alt="" />
              </div>

              <div className="featured-doctor-card-datas flex">
                <h2>V Care Laboratory</h2>
                <h4 style={{ color: "#3A65FD" }}>Hematology</h4>
              </div>

              <div className="featured-doctor-card-button">
                <Link to="/labfiltering">
                  <h4>View Profile</h4>
                </Link>
              </div>
            </div>

            <div className="featured-doctor-card flex">
              <div className="featured-doctor-card-photo">
                <img src="images/la (3).jpg" alt="" />
              </div>

              <div className="featured-doctor-card-datas flex">
                <h2>Malabar Diagnostic</h2>
                <h4 style={{ color: "#3A65FD" }}>, Clinical Biochemistry</h4>
              </div>

              <div className="featured-doctor-card-button">
                <Link to="/labfiltering">
                  <h4>View Profile</h4>
                </Link>
              </div>
            </div>

            <div className="featured-doctor-card flex">
              <div className="featured-doctor-card-photo">
                <img src="images/la (3).jpg" alt="" />
              </div>

              <div className="featured-doctor-card-datas flex">
                <h2>Neethi Lab</h2>
                <h4 style={{ color: "#3A65FD" }}>CT,USG</h4>
              </div>

              <div className="featured-doctor-card-button">
                <Link to="/labfiltering">
                  <h4>View Profile</h4>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container webshopsection" style={{ marginTop: "3vw" }}>
          <h1>
            Explore Our <span className="color-blue">Marketplace</span>
          </h1>

          <div class="product-section">
            {marketplaceProducts.length > 0 &&
              marketplaceProducts.map((product, index) => (
                <div
                  key={index}
                  onClick={() => handleNavigation(product.id)}
                  className="web-pharmacyshopproduct flex"
                >
                  <div className="webpharmacyshopproductimg flex">
                    <img src={product?.image} alt="" />
                  </div>
                  <div className="webpharmacyshopproducttitle flex">
                    <h4>{product?.category}</h4>
                  </div>

                  <button class="iconboxnew">
                    <i class="ri-search-line"></i>
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

  
      <Footer />

    </div>
  );
}
