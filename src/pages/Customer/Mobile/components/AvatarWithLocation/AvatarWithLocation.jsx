import React, { useState } from "react";
import Location from "../Location/Location";
import styles from "./styles.module.css";
import useAuth from "../../../../../hooks/useAuth";

function AvatarWithLocation() {
  const [signInModalOpen, setSignInModalOpen] = useState(false);

  const { auth } = useAuth();
  const toggleSignInModal = () => {
    setSignInModalOpen(!signInModalOpen);
  };
  return (
    <>
      <div className={styles.mainContainer}>
        <Location />

      </div>
    </>
  );
}

export default AvatarWithLocation;
