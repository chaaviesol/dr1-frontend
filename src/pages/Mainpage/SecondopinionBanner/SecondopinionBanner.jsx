import React, { useState } from "react";
import "./SecondopinionBanner.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import Secopmodal from "../../../components/SecOpAndQuery/Secopmodal";
import { LoginModal } from "../../../components/LoginModal/LoginModal";
export default function SecondopinionBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();
  const closeBox = () => {
    document.getElementById("expert-box").style.display = "none";
  };
  const openBox = () => {
    document.getElementById("expert-box").style.display = "";
  };

  return (
    <div>
      {isModalOpen && (
        <>
          <Secopmodal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </>
      )}
      <div className="expert-container" id="expert-box">
        <div className="expert-column">
          <div className="expert-title">Do You Want a Expert Opinion?</div>
          <div className="expert-paragraph">
            A doctor's expert opinion is a critical assessment based on
            extensive medical{" "}
          </div>

          <button
            className="expert-button"
            onClick={() => {
              if (auth.userId && auth.userType === "customer") {
                setIsModalOpen(true);
              } else {
                setIsShowLoginModal(true);
              }
            }}
          >
            YES
          </button>
        </div>
        <div className="expert-column2">
          <img
            className="expert-image"
            src="/images/secondopbannerimage.png"
            alt=""
          />
        </div>
        <div className="opinionminimize flex" onClick={closeBox}>
          <i className="ri-fullscreen-exit-line"></i>
        </div>
      </div>

      <div className="expert-container-button" onClick={openBox}>
        <span>Expert Opinion</span>
        <i className="ri-arrow-right-up-line"></i>
      </div>

      {isShowLoginModal && (
        <LoginModal show={isShowLoginModal} setShow={setIsShowLoginModal} />
      )}
    </div>
  );
}
