import React, { useEffect, useState } from "react";
import "./Profile.css";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import NavItem from "./Navitem";
import { BASE_URL, PHARMACY_URL } from "../../../../config";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";
import { LoginModal } from "../../../../components/LoginModal/LoginModal";
import { useTabBarContext } from "../../../../contexts/MobileScreen/TabBarProvider";

const Profile = () => {
  const navigate = useNavigate();
  const { handleUpdateActiveTab } = useTabBarContext();

  const navItems = [
    {
      id: 1,
      title: "My Queries",
      subtitle: "Queries, Answers",
      iconClass: "ri-phone-fill",
      arrowClass: "ri-arrow-right-line",
      link: "/myqueries",
    },
    {
      id: 2,
      title: "Change Password",
      subtitle: "Reset your password",
      iconClass: "ri-calendar-check-line",
      arrowClass: "ri-arrow-right-line",
      link: "/forgotpwd",
    },
    {
      id: 3,
      title: "Help",
      subtitle: "Doctor one helpline",
      iconClass: "ri-user-fill",
      arrowClass: "ri-arrow-right-line",
      link: "/profile",
    },
  ];

  const handleClick = (link) => {
    navigate(link);
  };

  //////////////////////old belowww/////////////////////

  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const { setActiveTab } = useTabBarContext();
  const axiosPrivate = useAxiosPrivate();

  const { auth, authLogout } = useAuth();
  const { userId, userType } = auth;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
  const toggleSignInModal = () => {
    setSignInModalOpen(true);
  };
  const handleLogout = () => {
    authLogout();
    navigate("/");
  };

  const goToEditProfile = () => {
    setActiveTab("profile");
    navigate("/edit-profile");
  };

  const handleNavigate = (link) => {
    navigate(link);
  };

  if (!userId || !userType || userType !== "customer") {
    return (
      <div className="container unloginpage flex">
        {signInModalOpen && (
          <LoginModal show={signInModalOpen} setShow={setSignInModalOpen} />
        )}
        <img src="/images/nolog.jpg" alt="" />
        {/* <h4 style={{ color: "green" }}>Profile</h4> */}
        <h1>Login for full potential</h1>
        <h4>
          Your health journey starts here, Log in for quick access to your
          healthcare services and records.
        </h4>
        <button
          style={{
            backgroundColor: "#3A65FD",
          }}
          // onClick={toggleSignInModal}
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button  onClick={() => navigate("/signup")}
          style={{
            color: "#3A65FD",
            backgroundColor: "#F2F5FF",
            marginTop: "10px",
          }}
        >
          Create new account
        </button>
        <h4 style={{ marginTop: "40px" }}>
          Explore with out account ?{" "}
          <span
            style={{
              color: "#3A65FD",
            }}
            onClick={() => handleUpdateActiveTab("home")}
          >
            Back to Home
          </span>
        </h4>
      </div>
    );
  }
  return (
    <div>
      <div
        style={{
          textAlign: "center",
        }}
        className="container"
      ></div>

      <div className="container mob_profile_section">
        <div className="mob_top_section flex">
          <div className="mob_top_section_left">
            <img
              src={userProfile?.image || "/images/avatarmale.png"}
              alt="User profile"
            />
          </div>
          <div className="mob_top_section_right">
            <h2>{userProfile?.name}</h2>
            <div>
              <span>{userProfile?.ageGroup}</span>{" "}
              <span>/ {userProfile?.gender}</span>
            </div>
          </div>
        </div>

        <div
          className="mob-profile-details"
          style={{
            marginBottom: "20px",
            marginLeft: "20px",
          }}
        >
          <h4>
            <i className="ri-phone-fill"></i> +91 {userProfile?.phone_no}
          </h4>
          <h4>
            <i class="ri-mail-fill"></i> {userProfile?.email}
          </h4>
          <h4>
            <i class="ri-map-pin-fill"></i> {userProfile?.pincode}
          </h4>
        </div>

        <button onClick={goToEditProfile}>Edit Profile</button>

        <div className="flex mob_profile_section_btns">
          <button
            onClick={() => handleNavigate("/myorders")}
            style={{ color: "#7E83FF", backgroundColor: "#D6D8FF" }}
          >
            <i className="ri-phone-fill"></i> My Orders
          </button>
          <button
            onClick={() => handleNavigate("/mysecondopinions")}
            style={{ color: "#0D9554", backgroundColor: "#C4E3C5" }}
          >
            <i className="ri-phone-fill"></i> Second Opinion
          </button>
        </div>

        <div className="flex mob-profile-navs">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              iconClass={item.iconClass}
              arrowClass={item.arrowClass}
              onClick={() => handleClick(item.link)}
            />
          ))}
        </div>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "white",
            color: "#E63333",
            border: "1px solid #E63333",
          }}
        >
          Logout
        </button>
        <div style={{ height: "100px" }}></div>
      </div>
    </div>
  );
};

export default Profile;
