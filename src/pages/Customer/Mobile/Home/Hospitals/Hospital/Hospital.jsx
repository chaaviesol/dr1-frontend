import React from "react";
import styles from "./styles.module.css";

function Hospital({ image }) {
  const tempImg = "./images/mobile/hospital.jpg";
  return (
    <>
      <div className={styles.container}>
        <img src={image || tempImg} alt="" />
        <div className={styles.glassEffect}>
          <span>
            Baby Memorial <br /> Hospital
          </span>
          <span>
            Kozhikode
          </span>
        </div>
      </div>
    </>
  );
}

export default Hospital;
