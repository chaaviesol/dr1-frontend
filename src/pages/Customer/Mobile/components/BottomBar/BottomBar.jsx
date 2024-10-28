import React from "react";
import styles from "./bottombar.module.css";

function BottomBar() {
  return (
    <div className={styles.main}>
      <div className={styles.tab}>
        <div className={styles.roundtab}>
          <i className="ri-home-fill" />
        </div>
        <div className={styles.tabtext}>Home</div>
      </div>
      <div className={styles.tab}>
        <div className={styles.roundtab}>
          <i className="ri-home-fill" />
        </div>
        <div className={styles.tabtext}>Home</div>
      </div>
      <div className={styles.tab}>
        <div className={styles.roundtab}>
          <i className="ri-home-fill" />
        </div>
        <div className={styles.tabtext}>Home</div>
      </div>
      <div className={styles.tab}>
        <div className={styles.roundtab}>
          <i className="ri-home-fill" />
        </div>
        <div className={styles.tabtext}>Home</div>
      </div>
    </div>
  );
}

export default BottomBar;
