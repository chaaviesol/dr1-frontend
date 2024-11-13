import { MyLocation } from "@mui/icons-material";
import React from "react";
import styles from "./styles.module.css";
import { useLocationContext } from "../../../../../contexts/LocationContext";
import SearchLocationModal from "../SearchLocationModal/SearchLocationModal";

function Location({ isShowLocationModal, setShowLocationModal }) {
  const { location } = useLocationContext();
  // console.log("isShowLocationModal", isShowLocationModal);
  return (
    <>
      <div
        className={styles.mainContainer}
        onClick={() => setShowLocationModal(true)}
      >
        <div className={styles.flexCenter}>
          <MyLocation
            className={styles.icon}
            sx={{ fontSize: 32, fontWeight: 100 }}
          />
        </div>
        <div className={styles.location}>
          <span>Choose Your Location</span>
          <span>{location?.city || "Kozhikode"}</span>
        </div>
      </div>
      <SearchLocationModal
        isOpen={isShowLocationModal}
        setOpen={setShowLocationModal}
      />
    </>
  );
}

export default Location;
