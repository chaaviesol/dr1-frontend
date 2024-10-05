import React, { useEffect, useState } from "react";
import "./DocProfileMainSec.css";
import { ProfileSideBar } from "../../Customer/doctor/DocComponents/ProfileSideBar/ProfileSideBar";
import { DocProfileTopbar } from "../../Customer/doctor/DocComponents/DocProfileTopbar/DocProfileTopbar";
import useFetchViewsAndContacts from "../../../hooks/useFetchViewsAndContacts";
import Feedbacks from "../feedbacks/Index";
import useAuth from "../../../hooks/useAuth";
import { Labadminprofile } from "../LabAdminprofile/Labadminprofile";
import { LabAdminViews } from "../LabAdminViews/LabAdminViews";
import { BASE_URL } from "../../../config";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
// import { LabAdminViews } from "../Doctoradmin/DoctorAdminViews/LabAdminViews";
export const LabProfileMainSec = () => {
  const [ChangeDashboards, setChangeDashboards] = useState({
    profile: true,
  });
  const [LabData, setLabData] = useState();
  const { auth } = useAuth();
  const { userId, userType } = auth;
  const axiosPrivate = useAxiosPrivate();
  const consultAndViewData = useFetchViewsAndContacts(auth.userId, "Lab");

  const fetchLabAdminDetails = async (userId) => {
    const payload = { id: userId };
    const response = await axiosPrivate.post(
      `${BASE_URL}/lab/labdetails`,
      payload
    );
    return response.data.data;
  };

  const { data: userProfile, isLoading: isLabDataFetching } = useQuery({
    queryKey: ["fetchLabAdminDetails", userId],
    queryFn: () => fetchLabAdminDetails(userId),
    enabled: !!userId && userType === "lab",
    // enabled: !!userId && userType === "lab",
  });

  useEffect(() => {
    if (userProfile) {
      setLabData(userProfile);
    }
  }, [userProfile]);

  const SentData = (data) => {
    setChangeDashboards({ [data]: true });
  };
  return (
    <>
      <div className="mainadminsection">
        <DocProfileTopbar userProfile={LabData} />
        <div className="mainadmindoctorsection flex">
          <ProfileSideBar
            data={{ SentData: SentData, selected: ChangeDashboards }}
          />
          <div className="mainadmindoctordetails mainadmincontainer">
            <div className="scroll">
              {ChangeDashboards?.profile && (
                <>
                  <Labadminprofile
                    LabData={LabData}
                    consultAndViewData={consultAndViewData}
                    setLabData={setLabData}
                    isLabDataFetching={isLabDataFetching}
                  />
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
