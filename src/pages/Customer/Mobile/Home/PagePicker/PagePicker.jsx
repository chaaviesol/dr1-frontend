import React from "react";
import styles from "./styles.module.css";

function PagePicker({ activePage, setActivePage }) {
  const updateActivePage = (page) => {
    setActivePage(page);
  };
  return (
    <div className={styles.main}>
      <button
        style={{ WebkitTapHighlightColor: "transparent" }}
        onClick={() => updateActivePage("home")}
        className={`${styles.homebtn} ${
          activePage === "home" ? styles.active : styles.inactive
        }`}
        type="button"
      >
        <i className="ri-home-fill"></i>
      </button>
      <button
        style={{ WebkitTapHighlightColor: "transparent" }}
        onClick={() => updateActivePage("doctors")}
        className={`${styles.container} ${
          activePage === "doctors" ? styles.active : styles.inactive
        }`}
        type="button"
      >
        <span className={styles.white}>Doctors</span>
      </button>
      <button
        style={{ WebkitTapHighlightColor: "transparent" }}
        onClick={() => updateActivePage("hospitals")}
        className={`${styles.container} ${
          activePage === "hospitals" ? styles.active : styles.inactive
        }`}
        type="button"
      >
        <span className={styles.white}>Hospitals</span>
      </button>
      <button
        style={{ WebkitTapHighlightColor: "transparent" }}
        onClick={() => updateActivePage("labs")}
        className={`${styles.container} ${
          activePage === "labs" ? styles.active : styles.inactive
        }`}
        type="button"
      >
        <span className={styles.white}>Labs</span>
      </button>
    </div>
  );
}

export default PagePicker;
