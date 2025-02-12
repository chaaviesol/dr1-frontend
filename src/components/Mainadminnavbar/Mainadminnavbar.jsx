import { Modal } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/AuthProvider";
import useAuth from "../../hooks/useAuth";

export default function Mainadminnavbar({ data: { SentData, selected } }) {
  const [ProfilePopup, setProfilePopup] = useState(false);
  const {authLogout}=useAuth()
  const FindButtonValue = (data) => {
    SentData(data);
  };

  const OpenPopup = () => {
    setProfilePopup(!ProfilePopup);
  };
  return (
    <div className="doctoradminnavbar">
      <div className="containeradmin doctoradminnavbar2 flex">
        <div className="adminlogodiv flex">
          <Link
            to="/"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <img src="/images/newlogo.jpg" className="dr_one_logo" alt="" />
            <h2>Dr ONE</h2>
          </Link>
        </div>

        <div className="adminlogodiv flex">
          {/* <div
            onClick={() => {
              FindButtonValue("onboarding");
            }}
            style={{ marginLeft: "18px" }}
            className={
              selected?.onboarding
                ? "adminonboarding adminonboardingSelected flex"
                : "adminonboarding flex"
            }
          >
            <i className="fi fi-sr-introduction-handshake"></i>
            <h4 style={{ marginLeft: "10px" }}>Onboarding</h4>
          </div> */}
          {/* <div
            style={{ marginLeft: "18px" }}
            className="adminnotification flex"
          >
            <i className="ri-notification-2-line"></i>
          </div> */}

          {/* <img
            onClick={OpenPopup}
            style={{ marginLeft: "18px" }}
            src="/images/doc.jpg"
            alt=""
          /> */}
        </div>

        <Modal
          className="mainadminprofilecardmodal"
          open={ProfilePopup}
          onClose={OpenPopup}
        >
          <div className="mainadminprofilecard">
            <div className="mainadminprofilenamecard flex">
              <div className="mainadminprofilenamecardleft flex">
                <img src="../images/man.jpg" alt="" />
                <div style={{ marginLeft: "20px" }}>
                  <h4>Amal lal</h4>
                  <h4 className="admintype">Super Admin</h4>
                </div>
              </div>

              <div className="mainadminprofilenamecardright flex">
                <div className="editadminprofile flex">
                  <i className="ri-pencil-line"></i>
                </div>
              </div>
            </div>

            <div className="mainadminprofilecontactcard">
              <div className="flex texticonset">
                <i className="fi fi-sr-call-outgoing"></i>
                <h4 style={{ marginLeft: "10px" }}>+91 9878898346</h4>
              </div>

              <div className="flex texticonset">
                <i className="fi fi-sr-envelope"></i>
                <h4 style={{ marginLeft: "10px" }}>anilyadhav@gmail.com</h4>
              </div>
            </div>

            <div
              className="adminmenuprofile flex"
              onClick={() => {
                SentData("manageadmin");
                setProfilePopup(false);
              }}
            >
              <i className="ri-vip-crown-line"></i>
              <h4 style={{ marginLeft: "10px" }}>Admins</h4>
            </div>

            <div className="adminmenuprofile flex">
              <i className="ri-settings-line"></i>
              <h4 style={{ marginLeft: "10px" }}>Settings</h4>
            </div>

       

            <div style={{ color: "#C45050" }} className="adminmenuprofile flex" onClick={authLogout}>
              <i className="ri-logout-box-line"></i>
              <h4 style={{ marginLeft: "10px" }}>Logout</h4>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
