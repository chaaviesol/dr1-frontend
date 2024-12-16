import React, { useEffect, useState } from "react";
import "./ProfileView.css";
import { IconButton, Modal } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { BASE_URL, PHARMACY_URL } from "../../../config";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
export const ProfileView = ({
  handleCloseProfileModal,
  openProfile,
  setOpenProfile,
}) => {
  const { auth, authLogout } = useAuth();
  const { userId } = auth;
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const closeProfile = () => {
    setOpenProfile(false);
    handleCloseProfileModal();
  };

  const fetchUserProfileDetails = async (userId) => {
    const response = await axiosPrivate.post(
      `${PHARMACY_URL}/user/getprofile`,
    );
    return response.data;
  };

  const { data: userProfile } = useQuery({
    queryKey: ["fetchUserProfileDetails", userId],
    queryFn: async () => {
      const data = await fetchUserProfileDetails(userId);
      return data.userDetails;
    },
    enabled: !!userId,
  });

  return (
    // <>
    //   <Modal
    //     open={openProfile}
    //     onClose={closeProfile}
    //     className="ProfileViewAlign"
    //   >
    //     <div className="ProfileViewAlignCard">
    //       <div className="ProfileViewAlignCardEditBtnAlign">
    //         <button
    //           type="button"
    //           title="Edit your profile"
    //           onClick={() => navigate("/userprofile")}
    //         >
    //           <EditIcon id="ProfileViewAlignCardEditBtnAlignEditIcon" />
    //           Edit
    //         </button>
    //       </div>
    //       <div className="ProfileAlignCardImg">
    //       <img alt="" src={userProfile?.image || "/images/avatarmale.png"} />
    //         <p>{userProfile?.name}</p>
    //         {/* <div className="ProfileViewAlignCard-activity">Your Activity</div> */}
    //         <div className="ProfileAlignCardDetailSec">
    //           <div className="ProfileAlignCardDetGender">
    //             {userProfile?.gender === "male" ? (
    //               <MaleIcon id="ProfileAlignCardDetGenderIcon" />
    //             ) : userProfile?.gender === "female" ? (
    //               <FemaleIcon id="ProfileAlignCardDetGenderIcon" />
    //             ) : (
    //               <TransgenderIcon id="ProfileAlignCardDetGenderIcon" />
    //             )}
    //             <p> {userProfile?.gender}</p>
    //           </div>
    //           <div className="ProfileAlignCardAge">
    //             <img className="" src="/images/Group 153.png" alt="" />
    //             <p>{userProfile?.ageGroup} years</p>
    //           </div>
    //         </div>
    //         <div className="ProfileAlignCardDetailSec">
    //           <div className="ProfileAlignCardAge">
    //             <LocalPhoneIcon id="ProfileAlignCardDetPhoneIcon" />
    //             <p> +91 {userProfile?.phone_no}</p>
    //           </div>
    //         </div>
    //         <div className="ProfileAlignCardDetailSec">
    //           <div className="ProfileAlignCardAge">
    //             <EmailIcon id="ProfileAlignCardDetPhoneIcon" />
    //             <p> {userProfile?.email}</p>
    //           </div>
    //         </div>
    //         {userProfile?.pincode && (
    //           <div className="ProfileAlignCardDetailSec">
    //             <div className="ProfileAlignCardPInCode">
    //               <p>{userProfile?.pincode}</p>
    //             </div>
    //           </div>
    //         )}

    //         <div className="ProfileAlignCardDetailSec">
    //           <div
    //             onClick={() => {
    //               authLogout();
    //               setOpenProfile(false);
    //               navigate("/", { replace: true });
    //             }}
    //             className="ProfileAlignLogoutSec"
    //           >
    //             <PowerSettingsNewIcon id="ProfileAlignCardDetLogoutIcon" />
    //             <p className="ProfileAlignCardDetLogoutFont">Logout</p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </Modal>
    // </>
    <>
      <Modal
        className="customerprofilecardmodal "
        open={openProfile}
        onClose={closeProfile}
      >
        <div className="customerprofilecard">
          <div className="customerprofilenamecard flex">
            <div className="customerprofilenamecardleft flex">
              <img
                src={userProfile?.image || "/images/avatarmale.png"}
                alt=""
              />
              <div style={{ marginLeft: "20px" }}>
                <h4>{userProfile?.name}</h4>
               {userProfile?.ageGroup ? <h4 className="cpadmintype" >{userProfile?.ageGroup}</h4> : null} 
              </div>
            </div>

            <div className="customerprofilenamecardright flex">
              <div
                onClick={() => navigate("/userprofile")}
                className="cpeditadminprofile flex"
              >
                <IconButton>

                <i class="ri-pencil-line"></i>
                </IconButton>
              </div>
            </div>
          </div>

          <div className="customerprofilecontactcard">
            <div className="flex texticonset">
              <i class="ri-phone-fill"></i>
              <h4 style={{ marginLeft: "10px" }}>
                {" "}
                +91
                {userProfile?.phone_no}
              </h4>
            </div>

            <div className="flex texticonset">
              <i class="ri-mail-fill"></i>
              <h4 style={{ marginLeft: "10px" }}>{userProfile?.email}</h4>
            </div>
            {userProfile?.pincode ? (
              <div className="flex texticonset">
                <i class="ri-map-pin-fill"></i>
                <h4 style={{ marginLeft: "10px" }}>{userProfile?.pincode}</h4>
              </div>
            ) : null}
            {userProfile?.gender ? (
              <div className="flex texticonset">
                <i class="ri-men-fill"></i>
                <h4 style={{ marginLeft: "10px" }}>{userProfile?.gender}</h4>
              </div>
            ) : null}
          </div>

          <div className="cpadminmenuprofile flex">
            <i class="ri-eye-2-line"></i>
            <h4 style={{ marginLeft: "10px" }}>Activity</h4>
          </div>

          <div className="cpadminmenuprofile flex" onClick={()=>navigate("/mysecondopinions")}>
            <i class="ri-settings-line"></i>
            <h4 style={{ marginLeft: "10px" }}>Second opinion</h4>
          </div>
          <div
            className="cpadminmenuprofile flex"
            onClick={() => navigate("/myqueries")}
          >
            {/* <i class="ri-settings-line"></i> */}
            <i class="ri-chat-quote-line"></i>
            <h4 style={{ marginLeft: "10px" }}>My queries</h4>
          </div>

          <div
            className="cpadminmenuprofile flex"
            onClick={() => navigate("/myorders")}
          >
            <i class="ri-shopping-cart-2-line"></i>
            <h4 style={{ marginLeft: "10px" }}>My orders</h4>
          </div>

          <div
            style={{ color: "#C45050" }}
            className="cpadminmenuprofile flex"
            onClick={() => {
              authLogout();
              setOpenProfile(false);
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
