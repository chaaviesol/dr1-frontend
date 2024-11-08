import React, { useContext, useState } from "react";
import styles from "./styles.module.css";
import Typography from "../../components/Typography/Typography";
import Collash from "./MedicalFieldCollash/Collash";
import TopHospitals from "./TopHospitals/TopHospitals";
import { MyContext } from "../../../../../contexts/Contexts";
import { useNavigate } from "react-router-dom";

function HospitalMob() {
  const [visibleCount, setVisibleCount] = useState(12);
  const navigate = useNavigate();

  const { Categories } = useContext(MyContext);
  const specialities = Categories?.allopathySpecs;

  const HospitalCard = ({
    image,
    name,
    location,
    services,
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
        onClick={() => navigate(screen, { state: { data: data?.details } })}
      >
        <img src={image} alt={name} className="lab-image" />
        <div className="bestlabmobcardright flex">
          <h2>{name}</h2>
          <div className="bestlabmobcardrightstar flex">
            <StarRating />
          </div>
          <h4>{location}</h4>
          <h3>{services}</h3>
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
      <div className={styles.margin}>
        <HospitalCard
          screen="/hospitalfilter"
          key={0}
          // data={{ details: lab, lab: true }}
          image="https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          name="Abate eye hospital"
          location="kozhikode"
          services={"Casuality, Op"}
          rating={2}
        />
      </div>
    </div>
  );
}

export default HospitalMob;
