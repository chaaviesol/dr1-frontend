import React from "react";
import styles from "./styles.module.css";
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
