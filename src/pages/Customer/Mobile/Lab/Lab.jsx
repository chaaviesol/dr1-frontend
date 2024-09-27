import React from "react";
import styles from "./styles.module.css";
import HeaderSection from "../components/HeaderSection/HeaderSection";
import MainContainer from "../components/MainContainer/MainContainer";
import FindLab from "./FindLab/FindLab";

function Lab() {
  return (
    <>
      <div className={styles.margin}>
        <FindLab />
      </div>
    </>
  );
}

export default Lab;
