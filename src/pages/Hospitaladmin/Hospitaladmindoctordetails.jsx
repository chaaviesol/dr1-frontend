import React from "react";
import Hospitaladminnotification from "../../components/Hospitaladminnotification";
import "../Hospitaladmin/hospitaladmindoctordetails.css";
import { useLocation } from "react-router-dom";
import HospitalSidebar from "./HospitalSidebar";

export default function Hospitaladmindoctordetails() {
  const location = useLocation();
  const doctor = location?.state;
  return (
    <div>
      <div className="hospitaladmin-main flex">
        <HospitalSidebar />
        <div className="hospitaladmin_right">
          <Hospitaladminnotification />

          <div className="hospital_admin_details_sectionmain flex">
            <div className="hospital_admin_details_section2 flex">
              <div className="hospital_admin_details_image2">
                <img src={doctor?.image} alt="" />
              </div>

              <div className="hospital-right-admin2 flex">
                <div className="hospital_admin_details_data2">
                  <h2>{doctor?.name}</h2>
                  <h4>
                    {doctor?.name} says "I am a hard working and have good
                    clinical experience and work in prestigious institute AIIMS
                    and Safdarjung Hospital".
                  </h4>
                </div>

                <div className="hospital_admin_details_contact2 flex">
                  <h4>
                    <i class="ri-phone-fill"></i> +91{" "}
                    {doctor?.phone_no || +919494949496}
                  </h4>

                  <h4>
                    <i class="ri-mail-fill"></i>{" "}
                    {doctor?.email || `doctor@gmail.com`}
                  </h4>
                </div>
              </div>
            </div>

            <div className="hospital_admin_time_section"></div>

            <div className="hospital_admin_data_section flex">
              <div className="hospital_admin_data_section2">
                <h4>{doctor?.education_qualification || `Qualification`}</h4>

                <div style={{ fontWeight: 300, fontSize: 18 }}>
                  {new Date().getFullYear() -
                    (doctor?.experience || new Date().getFullYear())}
                  <span
                    style={{ fontWeight: 300, fontSize: 18, paddingLeft: 4 }}
                  >
                    Year Experience
                  </span>
                </div>
              </div>

              <div className="hospital_admin_data_section2">
                <h4>{doctor?.gender || `gender`}</h4>
                <h4>{doctor?.registration_no || `Registraion number`}</h4>
              </div>

              <div className="hospital_admin_data_section2">
                <h4>{doctor?.type || `Allopathy`}</h4>
                <h4>{doctor?.specialization || `Specialization`}</h4>
              </div>
            </div>

            <div className="hospital_admin_data_section_button flex">
              <a href="">
                <h4>Edit</h4>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
