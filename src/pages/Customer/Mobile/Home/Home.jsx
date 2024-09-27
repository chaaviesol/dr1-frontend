import React from "react";
import styles from "./styles.module.css";
import HeaderSection from "../components/HeaderSection/HeaderSection";
import MainContainer from "../components/MainContainer/MainContainer";
import BoxWithTypes from "./BoxWithTypes/BoxWithTypes";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useTabBarContext } from "../../../../contexts/MobileScreen/TabBarProvider";
import ChatBotAfterLogin from "../../../../components/ChatBotAfterLogin/ChatBotAfterLogin";
import ChatBot from "../../../../components/ChatBot/ChatBot";

function Home() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (auth.userId && auth.userType === "customer") {
      navigate("/secondopinion");
    } else {
      toast.info("Please login as a customer!");
      setTimeout(() => {
        navigate("/");
      }, 4000);
    }
  };
  return (
    <>
      {auth.userId && auth.userType === "customer" ? (
        <ChatBotAfterLogin />
      ) : (
        <ChatBot />
      )}

      <div className={styles.margin}>
        <img
          className={styles.ad1}
          src="/images/mobile/homelogo1hd.png"
          alt=""
        />
      </div>
      <div className={styles.margin2}>
        <BoxWithTypes />
      </div>
      <div className={styles.margin}>
        <div className={styles.expertOpinion} onClick={handleNavigate}>
          <span>
            Do You Want <br />
            A Expert <br />
            Opinion?
          </span>
          <button>Yes</button>
          <img className={styles.img1} src="/images/mobile/c.png" alt="" />

          <img className={styles.img2} src="/images/mobile/ad2.png" alt="" />
        </div>
      </div>
    </>
  );
}

export default Home;
