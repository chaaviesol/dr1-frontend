import React from "react";
import styles from "./styles.module.css";

function HealthConcern({ concern,image,onClick }) {
  const tempImg = "./images/mobile/healthconcern1.png";
  return (
    <>
      <div className={styles.container} onClick={onClick}>
        <img src={image || tempImg} alt="" />
        <div className={styles.glassEffect}>
          <span>
            {concern}
          </span>
        </div>
      </div>
    </>
  );
}

export default HealthConcern;
