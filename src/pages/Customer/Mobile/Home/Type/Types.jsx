import React from "react";
import styles from "./styles.module.css";
import { useTabBarContext } from "../../../../../contexts/MobileScreen/TabBarProvider";
import { useNavigate } from "react-router-dom";

function Types({ image, type }) {
  const navigate = useNavigate();
  const handleSearchNavigations = (type) => {
    switch (type) {
      case "Doctor":
        navigate("/searchdoctor");
        break;
      case "Hospital":
        navigate("/hospitalfilter");
        break;
      case "Laboratory":
        navigate("/labfiltering");
        break;
      default:
        navigate("/");
    }
  };
  return (
    <>
      <div
        className={styles.container}
        onClick={() => handleSearchNavigations(type)}
      >
        <div className={styles.imgContainer}>
          <img src={image} alt="img" />
        </div>
        <span>{type}</span>
      </div>
    </>
  );
}

export default Types;
