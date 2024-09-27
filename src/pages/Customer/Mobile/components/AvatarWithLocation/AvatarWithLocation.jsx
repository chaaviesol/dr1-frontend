import React, { useState } from "react";
import CustomerAvatar from "../Avatar/CustomerAvatar";
import Location from "../Location/Location";
import styles from "./styles.module.css";
import useAuth from "../../../../../hooks/useAuth";
import { CusSigninAndSignUp } from "../../../CusSigninAndSignUp/CusSigninAndSignUp";

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
        {!auth.userId || !auth.userType === "customer" ? (
          <button
            onClick={toggleSignInModal}
            style={{
              background: "#3a65fd",
              borderRadius: "18px",
              color: "white",
              padding: "8px 20px",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            Login
          </button>
        ) : (
          <CustomerAvatar />
        )}

        <CusSigninAndSignUp
          Caller={{
            toggleSignInModal: toggleSignInModal,
            OpenModal: signInModalOpen,
          }}
        />
      </div>
    </>
  );
}

export default AvatarWithLocation;
