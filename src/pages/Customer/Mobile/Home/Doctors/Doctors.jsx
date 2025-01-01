import React, { useContext, useEffect, useState } from "react";
import "./doctormob.css";
import { SearchDocContext } from "../../../../../contexts/Doctor/SearchDoctorProvider";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../../../../contexts/Contexts";
import { toast } from "react-toastify";
import useAuth from "../../../../../hooks/useAuth";
import { LoginModal } from "../../../../../components/LoginModal/LoginModal";
import axios from "axios";
import { BASE_URL } from "../../../../../config";

function Doctors() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [doctordata, SetDoctordata] = useState([]);
  const { auth } = useAuth();
  const { Categories } = useContext(MyContext);
  const { setFilters, setDocsBySearch, setAllDocsBySearch } =
    useContext(SearchDocContext);
  const navigate = useNavigate();
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

  const handleSelectSpecialization = (type, speciality) => {
    const lowerCasedSpecialization = speciality.toLowerCase();
    setFilters({
      type: type,
      specializations: [lowerCasedSpecialization],
      gender: "",
      experience: 0,
      name: "",
    });
    navigate("/searchdoctor", { state: "hi" });
  };
  const specialities = Categories?.allopathySpecs;

  const [visibleCount, setVisibleCount] = useState(12);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const handleRoute = () => {
    if (auth.userId && auth.userType === "customer") {
      navigate("/secondopinion");
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const fetch = async () => {
    try {
      // const pincode=====??
      const response = await axios.post(`${BASE_URL}/doctor/nearestdoctor`);
      SetDoctordata(response.data.data);
    } catch (error) {
      console.error("Error fetching lab data:", error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <>
      <div
        style={{ padding: ".5rem", WebkitTapHighlightColor: "transparent" }}
        className="avoidbottombar"
      >
        {/* Health concerns Section */}

        <div className="">
          <h3
            className="mobsechead"
            style={{
              margin: "12px 0px 0px 0px",
            }}
          >
            Search doctor by
          </h3>
          <h3
            className="mobsechead"
            style={{
              margin: "0px 0px 8px 0px",
            }}
          >
            Health concerns
          </h3>
        </div>

        <section className="">
          <div className="healthconcerns flex">
            <div
              className="healthconcernscard flex"
              onClick={() =>
                handleSelectSpecialization("Allopathy", "gynecology")
              }
            >
              <img src="/images/1 (2).webp" alt="" />
              <h4>Period doubts or Pregnancy</h4>
            </div>

            <div
              className="healthconcernscard flex"
              onClick={() =>
                handleSelectSpecialization("Allopathy", "dermatology")
              }
            >
              <img src="/images/1 (6).jpg" alt="" />
              <h4>Acne, pimple or skin issues</h4>
            </div>

            <div
              className="healthconcernscard flex"
              onClick={() =>
                handleSelectSpecialization("Allopathy", "general medicine")
              }
            >
              <img src="/images/banner-web-01.png" alt="" />
              <h4>Cold, Cough or Fever</h4>
            </div>

            <div
              className="healthconcernscard flex"
              onClick={() =>
                handleSelectSpecialization("Allopathy", "psychiatry")
              }
            >
              <img src="/images/1 (4).jpg" alt="" />
              <h4>Depression or Anxiety</h4>
            </div>
          </div>
        </section>

        {/*End Health concerns Section */}

        {/*  Searched Specialty Section */}

        <div className="">
          <h3
            className="mobsechead"
            style={{
              margin: "12px 0px 8px 0px",
            }}
          >
            Top Searched Specialty
          </h3>

          <section className="Specialtyitemslistsec">
            <div className="Specialtyitemslist flex">
              {specialities &&
                specialities.length > 0 &&
                specialities.slice(0, visibleCount).map((speciality, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleSelectSpecialization("Allopathy", speciality)
                    }
                  >
                    {speciality} <i className="ri-arrow-right-s-line"></i>
                  </button>
                ))}
            </div>

            {visibleCount < specialities?.length && (
              <div className="Specialtyitemslistbtn flex">
                <button
                  onClick={handleLoadMore}
                  className="btnwithclickableeffect"
                >
                  Load more
                </button>
              </div>
            )}
          </section>
        </div>

        {/*End  Searched Specialty Section */}

        {/*  Expert opinion Section */}

        <section className="">
          <div className="expertopiondoctor flex">
            <div>
              <h2>Get an expert</h2>
              <h2>opinion</h2>
              <h2>from our experts</h2>
            </div>
            <button className="" onClick={handleRoute}>
              Get now
            </button>
            <img src="../images/ex.png" alt="" />
          </div>
        </section>

        {/*End  Expert opinion Section */}

        {/*  Expert opinion Section */}

        <section className=""></section>

        {/*End  Expert opinion Section */}

        <div className="">
          <h3
            className="mobsechead"
            style={{
              margin: "12px 0px 8px 0px",
            }}
          >
            Best doctor’s near you
          </h3>

          <div className="mobiletopdoctor">
            {doctordata.map((details, index) => (
              <div
                className="doctorcardfirst"
                key={index}
                onClick={() =>
                  navigate(`/mobiledoctorprofile`, {
                    state: details,
                  })
                }
              >
                <img
                  src={
                    details?.image || "/images/mobile/files/images/user.png"
                  }
                  alt="Dr. Brooklyn Simmons"
                  className="doctor-image"
                />
                <h3 className="doctor-name">
                  {details?.name}
                  {details?.second_name ? ` ${details?.second_name}` : ""}
                </h3>
                <p className="doctor-specialty">
                  {details?.specialization}{" "}
                  {details?.additional_speciality
                    ? `, ${details.additional_speciality}`
                    : ""}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isLoginModalOpen && (
        <LoginModal show={isLoginModalOpen} setShow={setIsLoginModalOpen} />
      )}
    </>
  );
}

export default Doctors;
