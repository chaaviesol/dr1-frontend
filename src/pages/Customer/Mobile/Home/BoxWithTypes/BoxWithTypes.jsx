import React from "react";
import styles from "./styles.module.css";
import Types from "../../Home/Type/Types";

function BoxWithTypes() {
  return (
    <>
      <div className={styles.container}>
        <Types type="Doctor" image="./images/mobile/doctor1.png" />
        <Types type="Laboratory" image="./images/mobile/lab1.png" />
        <Types type="Hospital" image="./images/mobile/hospital1.png" />
        <Types type="Pharmacy" image="./images/mobile/pharmacy1.png" />
      </div>
    </>
  );
}

export default BoxWithTypes;
