import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import useAuth from "../../../../../hooks/useAuth";
import axios from "axios";
import { port } from "../../../../../config";

export const DocProfileTopbar = () => {
  const [DoctorData, setDoctorData] = useState();
  const [ProfilePopup, setProfilePopup] = useState(false);
  const navigate = useNavigate();
  const { authLogout } = useAuth();
  const { auth } = useAuth();
  const openPopups = () => {
    setProfilePopup(!ProfilePopup);
  };
  useEffect(() => {
    const data = {
      id: auth.userId,
    };
    axios
      .post(`${port}/doctor/doctordetails`, data)
      .then((res) => {
        setDoctorData(res.data.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
              src={DoctorData?.image}
              alt=""
            />
          </div>
        </div>
      </div>
      <Modal open={ProfilePopup} onClose={openPopups} className="">
        <div className="customerprofilecard">
          <div className="customerprofilenamecard flex">
            <div className="customerprofilenamecardleft flex">
              <img src={DoctorData?.image || "/images/avatarmale.png"} alt="" />
              <div style={{ marginLeft: "20px" }}>
                <h4>{DoctorData?.name}</h4>
              </div>
            </div>

            {/* <div className="customerprofilenamecardright flex">
                <div
                  onClick={() => navigate("/userprofile")}
                  className="cpeditadminprofile flex"
                >
                  <IconButton>
                    <i class="ri-pencil-line"></i>
                  </IconButton>
                </div>
              </div> */}
          </div>

          <div className="customerprofilecontactcard">
            <div className="flex texticonset">
              <i class="ri-phone-fill"></i>
              <h4 style={{ marginLeft: "10px" }}>
                {" "}
                +91
                {DoctorData?.phone_office}
              </h4>
            </div>

            <div className="flex texticonset">
              <i class="ri-mail-fill"></i>
              <h4 style={{ marginLeft: "10px" }}>{DoctorData?.email}</h4>
            </div>
            {DoctorData?.pincode ? (
              <div className="flex texticonset">
                <i class="ri-map-pin-fill"></i>
                <h4 style={{ marginLeft: "10px" }}>{DoctorData?.pincode}</h4>
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
};
