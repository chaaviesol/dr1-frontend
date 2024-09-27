import React from "react";
import Speciality from "../Speciality/Speciality";
import styles from "./styles.module.css";

function SpecialityPicker() {
  return (
    <div
      style={{
        // height: "243px",
        background: "#4535C1",
        borderRadius: "5px",
        padding: "2rem",
      }}
    >
      {/* ,border:"1px solid red"  */}
      <div
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
        className={styles.inputContainer}
      >
        <input type="text" />
      </div>
      <div className={styles.specialityContainer}>
        <Speciality text="Orthology" />
        <Speciality text="ENT" />
        <Speciality text="General Medicine " />
        <Speciality text="Dermatology" />
        <Speciality text="Psycology" />
        <Speciality text="Oncology" />
      </div>
    </div>
  );
}

export default SpecialityPicker;
