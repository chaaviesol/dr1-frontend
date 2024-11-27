import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import useAuth from "../../../hooks/useAuth";

function HospitalTopbar({ data: { HospitalData } }) {
  const [ProfilePopup, setProfilePopup] = useState(false);
  const navigate = useNavigate();
  const { authLogout } = useAuth();
  const openPopups = () => {
    setProfilePopup(!ProfilePopup);
  };

  return (
    <>
      <div className="doctoradminnavbar">
        <div className="containeradmin doctoradminnavbar2 flex">
          <div className="nav-logo">
            <Link
              to="/"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <img
                src="/images/doconelogo.jpg"
                className="dr_one_logo"
                alt=""
              />
              <h2>Dr ONE</h2>
            </Link>
          </div>

          <div className="adminlogodiv flex">
            <div
              style={{ marginLeft: "18px" }}
              className="adminnotification flex"
            >
              <i class="ri-notification-2-line"></i>
            </div>
            <img
              onClick={openPopups}
              style={{ marginLeft: "18px" }}
              src={HospitalData?.image || "/images/TempHosImg.webp"}
              alt=""
            />
          </div>
        </div>
      </div>
      <Modal open={ProfilePopup} onClose={openPopups} className="">
        <div className="customerprofilecard">
          <div className="customerprofilenamecard flex">
            <div className="customerprofilenamecardleft flex">
              <img
                src={HospitalData?.photo?.image1 || "/images/TempHosImg.webp"}
                alt=""
              />
              <div style={{ marginLeft: "20px" }}>
                <h4>{HospitalData?.name}</h4>
              </div>
            </div>
          </div>

          <div className="customerprofilecontactcard">
            <div className="flex texticonset">
              <i class="ri-phone-fill"></i>
              <h4 style={{ marginLeft: "10px" }}>
                {" "}
                +91
                {HospitalData?.contact_no}
              </h4>
            </div>

            <div className="flex texticonset">
              <i class="ri-mail-fill"></i>
              <h4 style={{ marginLeft: "10px" }}>{HospitalData?.email}</h4>
            </div>
            {HospitalData?.pincode ? (
              <div className="flex texticonset">
                <i class="ri-map-pin-fill"></i>
                <h4 style={{ marginLeft: "10px" }}>{HospitalData?.pincode}</h4>
              </div>
            ) : null}
          </div>

          <div
            style={{ color: "#C45050" }}
            className="cpadminmenuprofile flex"
            onClick={() => {
              authLogout();
              openPopups();
              navigate("/", { replace: true });
            }}
          >
            <i class="ri-logout-box-line"></i>
            <h4 style={{ marginLeft: "10px" }}>Logout</h4>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default HospitalTopbar;
