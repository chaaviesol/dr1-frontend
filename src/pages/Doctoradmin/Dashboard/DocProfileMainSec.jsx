import React, { useState } from "react";
import "./DocProfileMainSec.css";
import { ProfileSideBar } from "../../Customer/doctor/DocComponents/ProfileSideBar/ProfileSideBar";
import { DocProfileTopbar } from "../../Customer/doctor/DocComponents/DocProfileTopbar/DocProfileTopbar";
import { DocAdminProfile } from "../DocAdminProfile/DocAdminProfile";
import { DoctorAdminViews } from "../DoctorAdminViews/DoctorAdminViews";
import useFetchViewsAndContacts from "../../../hooks/useFetchViewsAndContacts";
import Feedbacks from "../feedbacks/Index";
import useAuth from "../../../hooks/useAuth";
import QueryList from "../Query/QueryList";
export const DocProfileMainSec = () => {
  const [ChangeDashboards, setChangeDashboards] = useState({
    profile: true,
  });
  const { auth } = useAuth();
  const consultAndViewData = useFetchViewsAndContacts(auth.userId, "Doctor");
  console.log(consultAndViewData);

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
                  <DocAdminProfile />
                </>
              )}
              {ChangeDashboards?.views && (
                <>
                  <DoctorAdminViews consultAndViewData={consultAndViewData} />
                </>
              )}
              {ChangeDashboards?.feedback && (
                <Feedbacks docId={auth?.userId}>feedback</Feedbacks>
              )}
              {ChangeDashboards?.querylist && (
                <QueryList docId={auth?.userId} userType={auth.userType}>
                  feedback
                </QueryList>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
