import React from "react";
import styles from "./styles.module.css";

function Typography({ text }) {
  return <span className={styles.text}>{text}</span>;
}

export default Typography;
