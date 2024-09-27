import { CallMade } from "@mui/icons-material";
import React from "react";
import styles from "./styles.module.css";

function Item({ img, text, onClick }) {
  return (
    <div onClick={onClick}>
      <img src={img} />
      <div className={styles.text}>
        <span>{text}</span>
        <CallMade sx={{ color: "white", fontSize: "20px" }} />
      </div>
    </div>
  );
}

export default Item;
