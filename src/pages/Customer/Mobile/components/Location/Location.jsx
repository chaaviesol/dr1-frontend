import { MyLocation } from "@mui/icons-material";
import React from "react";
import styles from "./styles.module.css";
import { useLocationContext } from "../../../../../contexts/LocationContext";

function Location() {
  const {location}=useLocationContext()
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.flexCenter}>
          <MyLocation className={styles.icon} sx={{ fontSize: 32,fontWeight:100 }} />
        </div>
        <div className={styles.location}>
          <span>Choose Your Location</span>
          <span>{location?.city || "Kozhikode"}</span>
        </div>
      </div>
    </>
  );
}

export default Location;
