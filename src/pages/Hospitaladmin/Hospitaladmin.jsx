import { React, useState, useEffect } from "react";
import "../Hospitaladmin/hospitaladmin.css";
import Sidebar from "./Sidebar/HospitalSidebar";
import HospitalAdminDashBoard from "./Overview/OverView";
import HospitalTopbar from "./Topbar/HospitalTopbar";
import Hospitaladmindoctorlist from "./Doctors/Hospitaladmindoctorlist";
import Viewers from "./Viewers/Viewers";
import ManageDoc from "./Doctors/ManageDoctor/Index";
import axios from "axios";
import { port } from "../../config";
import { Loader } from "../../components/Loader/Loader";
import useFetchViewsAndContacts from "../../hooks/useFetchViewsAndContacts";
import Feedbacks from "./Feedbacks/Index";
import useAuth from "../../hooks/useAuth";

export default function Hospitaladmin() {
  const [isLoading, setIsLoading] = useState(false);

  const [ChangeDashboards, setChangeDashboards] = useState({
    overview: true,
  });
  const [hospital, setHospital] = useState({
    about: "",
    address: "",
    contact_no: "",
    datetime: "",
    email: "",
    feature: [],
    id: "",
    licence_no: "",
    name: "",
    onlinebooking: "",
    password: "",
    photo: "",
    pincode: "",
    rating: "",
    speciality: [],
    type: "",
    unique_id: "",
  });
  const { auth } = useAuth();
  const consultAndViewData = useFetchViewsAndContacts(hospital.id, "Hospital");

  const SentData = (data) => {
    setChangeDashboards({ [data]: true });
  };
  const fetchHospital = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${port}/hospital/hospitaldetails`, {
        id: auth.userId,
      });
      setHospital(response.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchHospital();
  }, []);
  console.log("Hospital data ", hospital);
  return (
    <>
      {isLoading && <Loader />}
      <div className="mainadminsection">
        <HospitalTopbar
          data={{ SentData: SentData, selected: ChangeDashboards, HospitalData:hospital }}
        />
        <div className="mainadmindoctorsection flex">
          <Sidebar data={{ SentData: SentData, selected: ChangeDashboards }} />
          <div className="mainadmindoctordetails mainadmincontainer">
            <div className="scroll">
              {ChangeDashboards?.overview && (
                <HospitalAdminDashBoard
                  hospital={hospital}
                  consultAndViewData={consultAndViewData}
                />
              )}
              {ChangeDashboards?.doctor && (
                <Hospitaladmindoctorlist
                  setChangeDashboards={setChangeDashboards}
                />
              )}
              {ChangeDashboards?.viewers && (
                <Viewers consultAndViewData={consultAndViewData} />
              )}
              {ChangeDashboards?.manageDoc && <ManageDoc />}
              {ChangeDashboards?.feedbacks && (
                <Feedbacks hospitalId={hospital?.id} />
              )}
            </div>
          </div>
        </div>
        {/* {isLoading &&
      <loader/>} */}
      </div>
    </>
  );
}
