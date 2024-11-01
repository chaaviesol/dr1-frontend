import React from "react";
import styles from "./styles.module.css";
import BackButtonWithTitle from "../../../../components/BackButtonWithTitle";

function SecondOpinionMobileDetailed() {
  return (
    <>
      <div className="mobilescreen-container">
        <BackButtonWithTitle title="Second opinion details" />
      </div>
      <div className={styles.divider}></div>
      <div className="mobilescreen-container">
        <div className={styles.top}>
          <div>
            <span>Name:</span>
            <span>Name:</span>
          </div>
          <div>
            <span>Name:</span>
            <span>Name:</span>
          </div>
          <div>
            <span>Contact Number:</span>
            <span>989898989:</span>
          </div>
        </div>
        <div className={styles.reportimagesection}>
          <span>Reports</span>
          <div className={styles.images}></div>
        </div>
        <div className={styles.download}>
          <button>Download all</button>
        </div>
        <div className={styles.remarks}>
          <span className={styles.heading}>Remarks</span><br />
          <span className={styles.remarkdata}>
            A doctor is a medical professional who diagnoses, treats, and
            prevents illnesses, injuries, and various medical conditions in
            individuals. Doctors play a crucial role in maintaining and
            improving the health and well-being of their patients.
          </span>
        </div>
      </div>
    </>
  );
}

export default SecondOpinionMobileDetailed;
