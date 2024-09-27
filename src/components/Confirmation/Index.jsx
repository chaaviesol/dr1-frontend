import React from "react";
import styles from "./styles.module.css";
import { Modal } from "@mui/material";
import PropTypes from "prop-types";
function Index({ confirmation, setConfirmation, message, handleYes }) {
  const handleConfirm = () => {
    handleYes();
    setConfirmation(false);
  };
  const handleReject = () => {
    setConfirmation(false);
  };
  return (
    <Modal open={confirmation} close={() => setConfirmation(false)}>
      <div className={styles.container}>
        <div style={{ textAlign: "center" }}>
          <span>{message}</span>
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", gap: "1.5rem" }}
        >
          <button
            onClick={() => {
              handleConfirm();
            }}
          >
            Yes
          </button>
          <button onClick={() => handleReject()}>No</button>
        </div>
      </div>
    </Modal>
  );
}
Index.prototype = {
  confirmation: PropTypes.bool,
  message: PropTypes.string,
  handleYes: PropTypes.func,
};
Index.defaultProps = {
  confirmation: false,
  message: "Are you sure?",
  handleYes: () => {},
};

export default Index;
