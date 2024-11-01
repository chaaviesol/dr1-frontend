import React from "react";
import styles from "./styles.module.css";
import Typography from "../../components/Typography/Typography";
import Collash from "./MedicalFieldCollash/Collash";
import TopHospitals from "./TopHospitals/TopHospitals";

function HospitalMob() {
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
