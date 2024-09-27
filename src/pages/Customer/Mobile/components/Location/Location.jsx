import { MyLocation } from "@mui/icons-material";
import React from "react";
import styles from "./styles.module.css";

function Location() {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.flexCenter}>
          <MyLocation className={styles.icon} sx={{ fontSize: 32,fontWeight:100 }} />
        </div>
        <div className={styles.location}>
          <span>Select Your Location</span>
          <span>Kozhikode</span>
        </div>
      </div>
    </>
  );
}

export default Location;
