import React, { useState } from "react";
import "./DocProfileMainSec.css";
import { ProfileSideBar } from "../../Customer/doctor/DocComponents/ProfileSideBar/ProfileSideBar";
import { DocProfileTopbar } from "../../Customer/doctor/DocComponents/DocProfileTopbar/DocProfileTopbar";
import useFetchViewsAndContacts from "../../../hooks/useFetchViewsAndContacts";
import Feedbacks from "../feedbacks/Index";
import useAuth from "../../../hooks/useAuth";
import { Labadminprofile } from "../LabAdminprofile/Labadminprofile";
import { LabAdminViews } from "../LabAdminViews/LabAdminViews";
// import { LabAdminViews } from "../Doctoradmin/DoctorAdminViews/LabAdminViews";
export const LabProfileMainSec = () => {
  const [ChangeDashboards, setChangeDashboards] = useState({
    profile: true,
  });  
 const {auth}=useAuth()
  const consultAndViewData = useFetchViewsAndContacts(auth.userId, "Lab");
console.log(consultAndViewData)

  const SentData = (data) => {
    setChangeDashboards({ [data]: true });
  };
  return (
    <>
      <div className="mainadminsection">
        <DocProfileTopbar />
        <div className="mainadmindoctorsection flex">
          <ProfileSideBar
            data={{ SentData: SentData, selected: ChangeDashboards }}
          />
          <div className="mainadmindoctordetails mainadmincontainer">
            <div className="scroll">
              {ChangeDashboards?.profile && (
                <>
                  <Labadminprofile />
                </>
              )}
              {ChangeDashboards?.views && (
                <>
                  <LabAdminViews consultAndViewData={consultAndViewData} />
                </>
              )}
              {ChangeDashboards?.feedback && (
                <Feedbacks labId={auth?.userId}>feedback</Feedbacks>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
