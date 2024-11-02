import React from "react";
import styles from "./styles.module.css";
import { IconButton } from "@mui/material";

function ClickToSearchBox({placeholder}) {
  const searchIcon = `ri-search-line ${styles.searchIcon}`;
  return (
    <div className={styles.container}>
      <IconButton
        //   onClick={() => navigate(activePlaceholderAndIcon.pageToWhereNavigate)}
        sx={{ padding: ".9rem" }}
      >
        <i className={searchIcon} />
      </IconButton>
      <div
        className={styles.search}
        // onClick={() => navigate(activePlaceholderAndIcon.pageToWhereNavigate)}
      >
        <input
          type="text"
          disabled
          style={{ backgroundColor: "transparent" }}
          placeholder={placeholder || "Search"}
        />
      </div>
    </div>
  );
}

export default ClickToSearchBox;
