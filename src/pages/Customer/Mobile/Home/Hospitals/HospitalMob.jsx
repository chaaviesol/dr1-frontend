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
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  const handleSelectSpecialization = (type, speciality) => {
    navigate("/hospitalfilter", {
      state: { speciality: speciality, type:type },
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
        <TopHospitals />
      </div>
    </div>
  );
}

export default HospitalMob;
