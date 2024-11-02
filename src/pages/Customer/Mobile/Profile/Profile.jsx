import React, { useState } from "react";
import "./Profile.css";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../config";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { LoginModal } from "../../../../components/LoginModal/LoginModal";
import { useTabBarContext } from "../../../../contexts/MobileScreen/TabBarProvider";

const Profile = () => {
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const {setActiveTab}=useTabBarContext()

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const { auth, authLogout } = useAuth();
  const { userId, userType } = auth;

  const fetchUserProfileDetails = async (userId) => {
    const payload = { id: userId };
    const response = await axiosPrivate.post(
      `${BASE_URL}/user/getprofile`,
      payload
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
  const toggleSignInModal = () => {
    setSignInModalOpen(true);
  };
  const handleLogout = () => {
    authLogout();
    navigate("/");
  };

  const goToEditProfile = () => {
    setActiveTab("profile"); // Ensure activeTab stays as "profile"
    navigate('/edit-profile');
  };

  if (!userId || !userType || userType !== "customer") {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {signInModalOpen && (
          <LoginModal show={signInModalOpen} setShow={setSignInModalOpen} />
        )}
        <button
          onClick={toggleSignInModal}
          style={{
            background: "#3a65fd",
            borderRadius: "18px",
            color: "white",
            padding: "1rem 3rem",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          Login
        </button>
      </div>
    );
  }
  return (
    <div style={{ backgroundColor: "#f3f3f8" }} className="avoidbottombar">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50px",
        }}
      >
        User Profile
      </div>
      <div className="profile-container">
        <div className="profile-card">
          <img
            className="profile-img"
            src={userProfile?.image || "/images/avatarmale.png"}
            alt="Profile"
          />
          <h2>{userProfile?.name}</h2>
          <div className="info">
            <div className="info-row">
              <div className="info-item male-icon-wrap">
                <img
                  src="/images/mobile/musthu/Icons/man-head 1.png"
                  alt="man head"
                  className="male-icon"
                />
                <span>{userProfile?.gender}</span>
              </div>
              <div className="info-item age-icon-wrap">
                <img
                  src="/images/mobile/musthu/Icons/age.png"
                  alt="age icon"
                  className="age-icon"
                />
                <span className="info-text">{userProfile?.ageGroup} Years</span>
              </div>
            </div>
            <div className="info-item">
              <img
                src="/images/mobile/musthu/Icons/phone-fill.png"
                alt="phone icon"
                className="phone-icon"
              />
              <span className="info-text">+91 {userProfile?.phone_no}</span>
            </div>
            <div className="info-item">
              <img
                src="/images/mobile/musthu/Icons/mail-fill 1.png"
                alt="email icon"
                className="email-icon"
              />
              <span className="info-text">{userProfile?.email}</span>
            </div>
            <div className="info-row">
              <div className="info-item id-icon">
                <span>PIN CODE</span>
              </div>
              <div className="profile-pincode info-item">
                <span>{userProfile?.pincode}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="actions">
          <div className="action-item">
            <div className="action-icon-wrap">
              <img
                src="/images/mobile/musthu/Icons/user-pen.png"
                alt="user icon"
                className="action-icon edit-icon"
              />
            </div>
            <div className="action-text-wrap" onClick={goToEditProfile}>
              <span className="action-text">Edit Profile</span>
              <img
                src="/images/mobile/musthu/Icons/arrow right.png"
                alt="arrow icon"
                className="arrow-icon"
              />
            </div>
          </div>
          <div className="action-item">
            <div className="action-icon-wrap">
              <img
                src="/images/mobile/musthu/Icons/productivity.png"
                alt="settings icon"
                className="action-icon settings-icon"
              />
            </div>
            <div className="action-text-wrap">
              <span className="action-text">Settings</span>
              <img
                src="/images/mobile/musthu/Icons/arrow right.png"
                alt="arrow icon"
                className="arrow-icon"
              />
            </div>
          </div>
          <div className="action-item">
            <div className="action-icon-wrap">
              <i className="ri-chat-quote-line"></i>
            </div>
            <div className="action-text-wrap">
              <span className="action-text">My queries</span>
              <img
                src="/images/mobile/musthu/Icons/arrow right.png"
                alt="arrow icon"
                className="arrow-icon"
              />
            </div>
          </div>
          <div className="action-item">
            <div className="action-icon-wrap">
              <i class="ri-shut-down-line" style={{ color: "red" }}></i>
              {/* <img src="/images/mobile/musthu/Icons/power.png" alt="power icon" className='action-icon logout-icon' /> */}
            </div>
            <div className="action-text-wrap">
              <span
                onClick={handleLogout}
                className="action-text"
                style={{ color: "red" }}
              >
                Log out
              </span>
              <img
                src="/images/mobile/musthu/Icons/arrow right.png"
                alt="arrow icon"
                className="arrow-icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
