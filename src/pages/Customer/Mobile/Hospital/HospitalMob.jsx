import React from "react";
import styles from "./styles.module.css";
import HeaderSection from "../components/HeaderSection/HeaderSection";
import MainContainer from "../components/MainContainer/MainContainer";
import Typography from "../components/Typography/Typography";
import Collash from "./MedicalFieldCollash/Collash";
import SpecialityPicker from "../components/SpecialityPicker/SpecialityPicker";
import TopHospitals from "./TopHospitals/TopHospitals";

function HospitalMob() {
  return (
    <>
      <div className={styles.margin}>
        <Typography text="Medical Field" />
      </div>
      <div className={styles.margin}>
        <Collash />
      </div>
      <div className={styles.margin}>
        <Typography text="Specialities" />
      </div>
      <div className={styles.margin}>
        <SpecialityPicker />
      </div>
      <div className={styles.margin}>
        <Typography text="Top Hospitals" />
      </div>
      <TopHospitals />
    </>
  );
}

export default HospitalMob;
