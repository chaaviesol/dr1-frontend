import React from "react";
import { useNavigate } from "react-router-dom";

export default function HospitalSidebar() {
  const navigate = useNavigate();
  return (
    <div className="hospitaladmin_left flex">
      <div className="hospitaladmin_image_title flex">
        <img src="images/doc.jpg" alt="" />
        <h2>Hospital Name</h2>
      </div>

      <div
        className=""
        style={{ display: "flex", gap: "10px", flexDirection: "column" }}
      >
        <h4 className="pointer" onClick={() => navigate("/hospitaladmin")}>
          Dashboard
        </h4>
        <h4 className="pointer">Hospital</h4>
        <h4
          className="pointer"
          onClick={() => navigate("/hospitaladmindoctorlist")}
        >
          Doctors
        </h4>
        <h4 className="pointer">Settings</h4>
      </div>

      <div className="hospitaladmin_logout pointer">
        <h2 onClick={() => navigate("/hospitaladmindoctorlist")}>Logout</h2>
      </div>
    </div>
  );
}
