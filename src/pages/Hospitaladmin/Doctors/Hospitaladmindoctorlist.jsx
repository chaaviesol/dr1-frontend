import React, { useState, useEffect } from "react";
import Hospitaladminnotification from "../../../components/Hospitaladminnotification";
import Rightnavbar from "../../../components/Rightnavbar";
import "./hospitaladmindoctorlist.css";
import Hospitaladmin_doctor_card from "../../../components/Hospitaladmin_doctor_card";
import axios from "axios";
import { DoctorCard } from "./DoctorCard/DoctorCard";
import HospitalSidebar from "../HospitalSidebar";
import { useNavigate } from "react-router-dom";
import { port } from "../../../config";
import { Loader } from "../../../components/Loader/Loader";
import useAuth from "../../../hooks/useAuth";

export default function Hospitaladmindoctorlist({ setChangeDashboards }) {
  const navigate = useNavigate();
  const [doctorsData, setDoctorsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {auth}=useAuth()

  useEffect(() => {
    getDoctorsData();
  }, []);

  const getDoctorsData = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`${port}/hospital/getdoctorlist`, {
        id: auth.userId,
      });
      console.log(response.data.data);
      setDoctorsData(response.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className="hospitaladmin-main flex ">
        <div className="hospitaladmin_right" style={{ width: "100%" }}>
          <div className="manage_doctor ">
            <div className="flex-center">
              <h1>Manage Doctors</h1>
            </div>
            <div className="flex-center">
              <div className="hospitaladmin_doctor_list_button ">
                <a
                  className="pointer"
                  href=""
                  onClick={() => navigate("/hospitaladminadddoctor")}
                >
                  <h4>Add Doctor</h4>
                </a>
              </div>
            </div>
          </div>
          <div className="hospitaladmin-doclist">
            <div className="hospitaladmin-doclist-cardcontainer">
              {doctorsData.map((value, index) => (
                <div className="hospital-admin-card" key={index}>
                  <DoctorCard
                    setChangeDashboards={setChangeDashboards}
                    data={value}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
