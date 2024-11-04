import React from "react";
import styles from "./bottombar.module.css";
import CustomerAvatar from "../Avatar/CustomerAvatar";

function BottomBar({ activeTab, setActiveTab }) {
  const updateActiveTab = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className={styles.main}>
      <div
        onClick={() => updateActiveTab("home")}
        className={`${styles.tab} ${
          activeTab === "home" ? styles.active : styles.inactive
        }`}
      >
        <div className={styles.roundtab}>
          <i
       
            className={activeTab === "home" ? "fi fi-sr-house-blank" : "fi fi-rr-house-blank"}
          />
        </div>
        <div className={styles.tabtext}>Home</div>
      </div>
      <div
        onClick={() => updateActiveTab("community")}
        className={`${styles.tab} ${
          activeTab === "community" ? styles.active : styles.inactive
        }`}
      >
        <div className={styles.roundtab}>
          <i
            className={
              activeTab === "community" ? "fi fi-sr-users-medical" : "fi fi-rr-users-medical"
            }
          ></i>
        </div>
        <div className={styles.tabtext}>Community</div>
      </div>
      <div
        onClick={() => updateActiveTab("medicine")}
        className={`${styles.tab} ${
          activeTab === "medicine" ? styles.active : styles.inactive
        }`}
      >
        <div className={styles.roundtab}>
        <i className={activeTab==="medicine" ? "fi fi-sr-shop"  : "fi fi-rr-shop"}>
        </i>
        </div>
        <div className={styles.tabtext}>Medicine</div>
      </div>
      <div
        onClick={() => updateActiveTab("profile")}
        className={`${styles.tab} ${
          activeTab === "profile" ? styles.active : styles.inactive
        }`}
      >
        <div
        // className={activeTab === "profile" ? styles.activeprofile : styles.inactiveprofile}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              border: activeTab === "profile" ? "2px solid #3a65fd" : "",
              boxSizing: "border-box",
              borderRadius: "50%",
            }}
          >
            <CustomerAvatar />
          </div>
        </div>
        <div className={styles.tabtext}>Profile</div>
      </div>
    </div>
  );
}

export default BottomBar;
