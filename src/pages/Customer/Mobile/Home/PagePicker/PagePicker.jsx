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
        <i className="fi fi-sr-house-blank"></i>
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
    </div>
  );
}

export default PagePicker;
