import React, { useEffect, useState } from "react";
import "../components/Navbar.css";
import { CircularProgress, Modal } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { CusSigninAndSignUp } from "../pages/Customer/CusSigninAndSignUp/CusSigninAndSignUp";
import { ProfileView } from "../pages/Customer/ProfileView/ProfileView";
import useAuth from "../hooks/useAuth";
import { useTabBarContext } from "../contexts/MobileScreen/TabBarProvider";
import { BASE_URL } from "../config";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default function Navbar() {
  const [open, setopen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const { auth, isLoading } = useAuth();
  const { userId, userType } = auth;
  const axiosPrivate = useAxiosPrivate();
  const { handleUpdateActiveTab } = useTabBarContext();

  const SelectOpen = () => {
    if (open) {
      setopen(false);
    } else {
      setopen(true);
    }
  };
  const location = useLocation();
  const navigate = useNavigate();
  const path = location?.pathname;

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
    enabled: !!userId && userType === "customer",
  });

  const toggleSignInModal = () => {
    setSignInModalOpen(!signInModalOpen);
  };
  const handleCloseProfileModal = () => {
    setOpenProfile(false);
  };
  const openProfileView = () => {
    setOpenProfile(!openProfile);
  };
  const handleRoute = (route) => {
    navigate(`/${route}`);
  };
  const handleMobileVavigation = (page) => {
    handleUpdateActiveTab(page);
    navigate("/");
  };
  return (
    <>
      <div className="nav-background">
        <nav className="nav-bar container flex ">
          <div className="nav-logo">
            <a
              href="/"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <img
                src="/images/doconelogo.jpg"
                className="dr_one_logo"
                alt=""
              />
              <h2>Dr ONE</h2>
            </a>
          </div>
          <div className="nav-links flex">
            <a href="/">
              <h3 style={{ color: path === "/" ? "#3a65fd" : "" }}>Home</h3>
            </a>
            <a onClick={() => handleRoute("doctor")}>
              <h3
                style={{
                  color:
                    path === "/doctor" ||
                    path === "/searchdoctor" ||
                    path === "/doctorprofile"
                      ? "#3a65fd"
                      : "",
                }}
              >
                Doctor
              </h3>
            </a>
            <a onClick={() => handleRoute("labs")}>
              <h3
                style={{
                  color:
                    path === "/labs" ||
                    path === "/labfiltering" ||
                    path === "/labdetails"
                      ? "#3a65fd"
                      : "",
                }}
              >
                Labs
              </h3>
            </a>
            <a onClick={() => handleRoute("hospital")}>
              <h3
                style={{
                  color:
                    path === "/hospital" ||
                    path === "/hospitalfilter" ||
                    path === "/hospitaldetailed"
                      ? "#3a65fd"
                      : "",
                }}
              >
                Hospital
              </h3>
            </a>
            <a onClick={() => handleRoute("pharmacy")}>
              <h3
                style={{
                  color:
                    path === "/pharmacy" ||
                    path === "/productdetails" ||
                    path === "/cart" ||
                    path==="/pharmacyproducts"
                      ? "#3a65fd"
                      : "",
                }}
              >
                Pharmacy
              </h3>
            </a>
            <a onClick={() => handleRoute("services")}>
              <h3
                style={{
                  color:
                    path === "/services" 
                   
                      ? "#3a65fd"
                      : "",
                }}
              >
                Services
              </h3>
            </a>
            <a onClick={() => handleRoute("community")}>
              <h3
                style={{
                  color:
                    path === "/community" 
                   
                      ? "#3a65fd"
                      : "",
                }}
              >
                Community
              </h3>
            </a>
          </div>

          <div className="nav-buttons flex">
            <div className="nav-button">
              {isLoading ? (
                <CircularProgress size="1.5rem" />
              ) : auth.userId && auth.userType === "customer" ? (
                <div onClick={openProfileView} className="NavbarProfileDiv">
                  <img
                    alt=""
                    src={userProfile?.image || "/images/avatarmale.png"}
                  />
                </div>
              ) : (
                <button onClick={toggleSignInModal}>
                  <h3 className="nav-button1">Login</h3>
                </button>
              )}
            </div>

            <div onClick={SelectOpen} className="menubutton flex">
              <i class="ri-menu-2-fill"></i>
            </div>
          </div>
          <CusSigninAndSignUp
            Caller={{
              toggleSignInModal: toggleSignInModal,
              OpenModal: signInModalOpen,
            }}
          />
          <ProfileView
            handleCloseProfileModal={handleCloseProfileModal}
            openProfile={openProfile}
            setOpenProfile={setOpenProfile}
          />
          <Modal
            className="menubuttonNavModal container"
            open={open}
            onClose={SelectOpen}
          >
            <>
              <div className="menubuttonNavModalSec flex ">
                <a onClick={() => handleMobileVavigation("home")}>
                  <h3>Home</h3>
                </a>
                <a onClick={() => handleMobileVavigation("doctor")}>
                  <h3>Doctor</h3>
                </a>
                <a onClick={() => handleMobileVavigation("laboratory")}>
                  <h3>Lab</h3>
                </a>
                <a onClick={() => handleMobileVavigation("hospital")}>
                  <h3>Hospital</h3>
                </a>
                <a onClick={() => handleMobileVavigation("pharmacy")}>
                  <h3>Pharmacy</h3>
                </a>
              </div>
            </>
          </Modal>
        </nav>
      </div>
    </>
  );
}
