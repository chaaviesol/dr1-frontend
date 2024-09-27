import React, { useEffect, useState } from "react";
import "./LabAdminProfile.css";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import { port } from "../../../config";
import { Loader } from "../../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useFetchViewsAndContacts from "../../../hooks/useFetchViewsAndContacts";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
export const LabAdminProfile = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const consultAndViewData=useFetchViewsAndContacts(auth.userId,"Lab");
console.log(consultAndViewData)
  // const axiosPrivate=useAxiosPrivate();
  

  const data = {
    id: auth.userId,
  };

  const fetchLab = async () => {
    const response = await axios.post(`${port}/lab/labdetails`, data);
    return response.data.data;
  };
  const { data: labDetails, isLoading } = useQuery({
    queryKey: ["fetchLabDetails", auth.userId],
    queryFn: () => fetchLab(auth.userId),
    enabled: !!auth.userId,
  });

  const FnNavigate = () => {
    navigate("/analyzelab");
  };

  return (
    <>
      <div className="LabAdminProfile">
        {isLoading && <Loader />}
        <div className="LabAdminProfileTop">
          <div
            onClick={() => navigate("/login")}
            className="LabAdminProfileLogoutSec"
          >
            <p>Logout</p>
            <LogoutIcon id="LabAdminProfileLogoutSecIcon" />
          </div>
          <div className="LabAdminProfileTopManage">
            <p className="LabAdminProfileTopPtag">
              Manage Your <br />
              <span>Lab</span>
            </p>
            <div className="LabAdminProfileTopSecondSec">
              <div
                onClick={() => {
                  FnNavigate();
                }}
                className="LabAdminProfileTopSecondSecCounter"
              >
                <div className="LabAdminProfileTopIconDiv">
                  <SavedSearchIcon id="LabAdminProfileTopIconDivIcon" />
                </div>
                <div className="LabAdminProfileTopSecondCounter">
                  <h4>{consultAndViewData?.viewCount || 0}</h4>
                  <p>Views</p>
                </div>
              </div>
              <div
                onClick={() => {
                  FnNavigate();
                }}
                className="LabAdminProfileTopSecondSecCounter"
              >
                <div className="LabAdminProfileTopIconDiv">
                  <CallOutlinedIcon id="LabAdminProfileTopIconDivIcon" />
                </div>
                <div className="LabAdminProfileTopSecondCounter">
                  <h4>{consultAndViewData?.consultCount || 0}</h4>
                  <p>Contacts</p>
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              FnNavigate();
            }}
            className="LabAdminProfileLogoutSec"
          >
            <p>View Analyze</p>
            <LogoutIcon id="LabAdminProfileLogoutSecIcon" />
          </div>
        </div>
        <div className="LabAdminProButtonSec">
          <button className="LabAdminProButton">Add Discount</button>
          <button className="LabAdminProButton">Add Price</button>
          <button
            onClick={() => {
              navigate("/editLaboratory", { state: { id: data?.id } });
            }}
            className="LabAdminProButton"
          >
            {" "}
            <EditIcon /> Edit
          </button>
        </div>
        <div className="LabAdminProMainSec">
          <div className="LabAdminProMainSecImgOther">
            <img
              src={labDetails?.photo?.image1 || "/images/lab2.jpg"}
              className="LabAdminProMainSecImg"
              alt=""
            />
            <div className="LabAdminProMainFontSec">
              <p className="LabAdminProMainFont">{labDetails?.name}</p>
              <div className="LabAdminProMainTimeSec">
                <p>
                  {labDetails?.timing?.opening_time} to{" "}
                  {labDetails?.timing?.closing_time}
                </p>
              </div>
              <div className="LabAdminProMainLocNDTime">
                <div className="LabAdminProMainLocNDTimeSet">
                  <CallOutlinedIcon id="LabAdminProMainLocIcon" />
                  <p>+91 {labDetails?.phone_no}</p>
                </div>
                <div className="LabAdminProMainLocNDTimeSet">
                  <EmailIcon id="LabAdminProMainLocIcon" />
                  <p>{labDetails?.email}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="LabAdminProMainImageSec">
            <img src={labDetails?.photo?.image2} alt="" />
            <img src={labDetails?.photo?.image3} alt="" />
            <img src={labDetails?.photo?.image4} alt="" />
          </div>
          <div className="LabAdminProMainAbout">
            <h3>About</h3>
            <p>{labDetails?.about}</p>
          </div>
          <div className="LabAdminProMainAbout">
            <h3>Address</h3>
            <div className="LabAdminProMainAboutIconNdFont">
              <div className="LabAdminProMainLoc">
                <div className="LabAdminProMainLocAlignLogondLoc">
                  <LocationOnIcon id="LabAdminProMainAboutIcon" />
                  <p>{labDetails?.address}</p>
                </div>
                <div className="LabAdminProMainAboutIconNdFont2divs">
                  <div className="LabAdminProMainDivPin">
                    <p>Pin: {labDetails?.pincode}</p>
                  </div>
                  {/* <div className='LabAdminProMainDivPin'> <p>{labDetails?.pincode}</p></div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="LabAdminProMainServicesAndFeatures">
            <div className="LabAdminProMainSerNDFeaInner">
              <h3>Services</h3>
              {labDetails?.services?.map((service,index) => (
                <div key={index} className="LabAdminProMainServiceCnts">
                  <CheckCircleIcon id="LabAdminProMainServiceCntsIcon" />
                  <p>{service}</p>
                </div>
              ))}
            </div>
            <div className="LabAdminProMainSerNDFeaInner">
              <h3>Features</h3>
              {labDetails?.features?.map((feature,index) => (
                <div key={index} className="LabAdminProMainServiceCnts">
                  <CheckCircleIcon id="LabAdminProMainServiceCntsIcon" />
                  <p>{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
