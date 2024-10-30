import React from "react";
import styles from "./styles.module.css";
import Hospital from "../Hospital/Hospital";

function TopHospitals() {
  return (
    <>
      <div className={styles.slider}>
        <Hospital />
        <Hospital />
        <Hospital />
      </div>
    </>
  );
}

export default TopHospitals;
