import React from "react";
import styles from "./styles.module.css";
import HealthConcernSlider from "../HealthConcerSlider/HealthConcernSlider";

function FindLab() {
  return (
    <>
      <div className={styles.container}>
        <span>
          Find labs by <br />
          Tests
        </span>
        <HealthConcernSlider />
      </div>
    </>
  );
}

export default FindLab;
