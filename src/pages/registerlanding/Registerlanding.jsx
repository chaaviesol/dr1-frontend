import React from "react";
import "../registerlanding/registerlanding.css";
import { useNavigate } from "react-router-dom";
export default function Registerlanding() {
  const navigate = useNavigate()
  return (
    <div className="registerlanding">
      <div className="container10 maintitle flex">
        <h1>Register As</h1>
      </div>

      <div className="container10 registerlanding_main flex">
        <div onClick={() => navigate("/doctoradminregistration1")} className="registerlanding_left">
          <div className="registerlanding_image flex">
            <img src="images/RegLanDoc.png" alt="" />
          </div>

          <div className="registerlanding_button flex">
            <h2>Doctor</h2>
          </div>
        </div>

        <div onClick={() => navigate("/hospitaladminregistration1")} className="registerlanding_left">
          <div className="registerlanding_image flex">
            <img src="/images/hospital10.jpg" alt="" />
          </div>

          <div className="registerlanding_button flex">
            <h2>Hospital</h2>
          </div>
        </div>
        <div onClick={() => navigate("/labadminregistration1")} className="registerlanding_left">
          <div className="registerlanding_image flex">
            <img src="/images/labReg.jpg" alt="" />
          </div>
          <div className="registerlanding_button flex">
            <h2>Laboratory</h2>
          </div>
        </div>
        {/* <div onClick={() => navigate("/doctoradmin")} className="registerlanding_left">
          <div className="registerlanding_image flex">
            <img src="/images/DrProfile.jpg" alt="" />
          </div>
          <div className="registerlanding_button flex">
            <h2>Doctor Profile</h2>
          </div>
        </div> */}
      </div>
    </div>
  );
}
