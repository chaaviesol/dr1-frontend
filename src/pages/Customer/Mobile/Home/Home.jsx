import React, { useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import PagePicker from "./PagePicker/PagePicker";
import HomePage from "./HomePage/HomePage";
import Doctors from "./Doctors/Doctors";
import Hospitals from "./Hospitals/HospitalMob";
import Labs from "./Labs/Labs";
import CartIcon from "../../../../components/CartIcon";
import { LoginModal } from "../../../../components/LoginModal/LoginModal";
import Location from "../components/Location/Location";

function Home() {
  const [activePage, setActivePage] = useState("home");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isShowLocationModal, setShowLocationModal] = useState(false);

  const { auth } = useAuth();
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (auth.userId && auth.userType === "customer") {
      navigate("/cart");
    } else {
      setIsLoginModalOpen(true);
    }
  };
  // console.log(isShowLocationModal)
  return (
    <>
      <div className={styles.margin}>
        <div className={`${styles.margin} ${styles.top}`}>
          <div>
            <Location isShowLocationModal={isShowLocationModal} setShowLocationModal={setShowLocationModal}  />
          </div>
          <div
            style={{ height: "50px", width: "50px" }}
            onClick={handleNavigate}
          >
            <CartIcon dontNavigate={true} />{" "}
          </div>
        </div>
        <PagePicker activePage={activePage} setActivePage={setActivePage} />
        <div className={styles.page}>
          {activePage === "home" && <HomePage />}
          {activePage === "doctors" && <Doctors />}
          {activePage === "hospitals" && <Hospitals />}
          {activePage === "labs" && <Labs />}
        </div>
      </div>
      {isLoginModalOpen && (
        <LoginModal show={isLoginModalOpen} setShow={setIsLoginModalOpen} />
      )}
    </>
  );
}

export default Home;
