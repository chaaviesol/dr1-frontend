import React, { useContext, useState, useEffect } from "react";
import styles from "./styles.module.css";
import Typography from "../../components/Typography/Typography";
import Collash from "./MedicalFieldCollash/Collash";
import TopHospitals from "./TopHospitals/TopHospitals";
import { MyContext } from "../../../../../contexts/Contexts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../../../config";

function HospitalMob() {
  const [visibleCount, setVisibleCount] = useState(12);
  const navigate = useNavigate();
  const [hospitaldata, SetHospitaldata] = useState([]);
  const { Categories } = useContext(MyContext);
  const specialities = Categories?.allopathySpecs;
  const fetch = async () => {
    try {
      // const pincode=====??
      const response = await axios.post(`${BASE_URL}/hospital/nearesthospital`);
      SetHospitaldata(response.data.data);
    } catch (error) {
      console.error("Error fetching lab data:", error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  const HospitalCard = ({
    image,
    name,
    location,
    features,
    rating,
    screen,
    data,
  }) => {
    const StarRating = () => {
      const maxRating = 5;
      const stars = [];

      for (let i = 1; i <= maxRating; i++) {
        stars.push(
          i <= rating ? (
            <i
              key={i}
              className="ri-star-fill"
              style={{ marginRight: "5px", fontSize: "20px", color: "#f59e0b" }}
            />
          ) : (
            <i
              key={i}
              className="ri-star-fill"
              style={{ color: "gray", marginRight: "5px", fontSize: "20px" }}
            />
          )
        );
      }

      return <div>{stars}</div>;
    };
    return (
      <div
        className="bestlabmobcard flex"
        onClick={() => navigate(screen, { state: { details: data?.details } })}
      
      >
        <img src={image} alt={name} className="lab-image" />
        <div className="bestlabmobcardright flex">
          <h2>{name}</h2>
          <div className="bestlabmobcardrightstar flex">
            <StarRating />
          </div>
          <h4>{location}</h4>
          <h3>{features}</h3>
        </div>
      </div>
    );
  };
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const handleSelectSpecialization = (type, speciality) => {
    navigate("/hospitalfilter", {
      state: { speciality: speciality, type: type },
    });
  };
  return (
    <div className={`${styles.main} avoidbottombar`}>
      <div className={styles.margin}>
        <Typography text="Medical Field" />
      </div>
      <div className={styles.margin}>
        <Collash />
      </div>
      <div className={styles.margin}>
        <Typography text="Specialities" />
        <div className={styles.margin}>
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
      </div>
      <div className={styles.margin}></div>
      <div className={styles.margin}>
        <Typography text="Top Hospitals" />
      </div>
      {hospitaldata.map((hospital, index) => (
        <div className={styles.margin}>
          <HospitalCard
            screen="/mobilehospitalprofile"
            key={index}
            data={{ details: hospital, hospitals: true }}
            image={
              hospital?.photo?.image1 ||
              "./images/hos.jpeg"
            }
            name={hospital?.name}
            location={hospital?.address}
            features={
              hospital?.feature?.length > 0
                ? hospital?.feature.join(", ")
                : "No features available"
            }
            rating={hospital.rating}
          />
        </div>
      ))}
    </div>
  );
}

export default HospitalMob;
