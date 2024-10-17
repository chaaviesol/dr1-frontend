import React from "react";
import styles from "./styles.module.css";
import HeaderSection from "../components/HeaderSection/HeaderSection";
import MainContainer from "../components/MainContainer/MainContainer";
import HealthConcernSlider from "../Lab/HealthConcerSlider/HealthConcernSlider";
import Typography from "../components/Typography/Typography";

function CusDoctor() {
  return (
    <>
      <div className={styles.margin}>
        <Typography text="Health Concerns" />
        <HealthConcernSlider />
      </div>

      <Typography text="Top Doctors" />

      <div className={styles.mobiletopdoctor}>

      <div className={styles.doctorcardfirst}>
        <img src="/images/mobile/musthu/images/user.png" alt="Dr. Brooklyn Simmons" className="doctor-image"/>
        <h3 className="doctor-name">Dr. Brooklyn Simmons</h3>
        <p className="doctor-specialty">Dentist, Cosmetic</p>
      </div>

      <div className={styles.doctorcardfirst}>
        <img src="/images/mobile/musthu/images/user.png" alt="Dr. Brooklyn Simmons" className="doctor-image"/>
        <h3 className="doctor-name">Dr. Brooklyn Simmons</h3>
        <p className="doctor-specialty">Dentist, Cosmetic</p>
      </div>
      <div className={styles.doctorcardfirst}>
        <img src="/images/mobile/musthu/images/user.png" alt="Dr. Brooklyn Simmons" className="doctor-image"/>
        <h3 className="doctor-name">Dr. Brooklyn Simmons</h3>
        <p className="doctor-specialty">Dentist, Cosmetic</p>
      </div>
      <div className={styles.doctorcardfirst}>
        <img src="/images/mobile/musthu/images/user.png" alt="Dr. Brooklyn Simmons" className="doctor-image"/>
        <h3 className="doctor-name">Dr. Brooklyn Simmons</h3>
        <p className="doctor-specialty">Dentist, Cosmetic</p>
      </div>
     

      </div>






    </>
  );
}

export default CusDoctor;
