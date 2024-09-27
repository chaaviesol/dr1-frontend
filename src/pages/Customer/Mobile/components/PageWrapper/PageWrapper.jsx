import React, { useEffect } from "react";
import MainContainer from "../MainContainer/MainContainer";
import { useTabBarContext } from "../../../../../contexts/MobileScreen/TabBarProvider";
import Home from "../../Home/Home";
import HeaderSection from "../HeaderSection/HeaderSection";
import Pharmacy from "../../Pharmacy/Pharmacy";
import Lab from "../../Lab/Lab";
import HospitalMob from "../../Hospital/HospitalMob";
import CusDoctor from "../../Doctor/CusDoctor";
import { useNavigate } from "react-router-dom";

function PageWrapper() {
  const { activeTab, setActiveTab } = useTabBarContext();
  const navigate=useNavigate();

  useEffect(() => {
    // Push a new state into the history stack when the tab changes
    if (activeTab !== "home") {
      window.history.pushState(null, "");
    }

    const handlePopState = (event) => {
      if (activeTab === "home") {
        // Close the app or go to the previous page when the Home tab is active
        window.history.back(); // This will take the user to the previous page
      } else {
        // For other tabs, simply set the active tab to home
        setActiveTab("home");
        // navigate("/")
      }
    };

    // Add event listener for the popstate event
    window.addEventListener("popstate", handlePopState);

    return () => {
      // Clean up the event listener on component unmount
      window.removeEventListener("popstate", handlePopState);
    };
  }, [activeTab]);

  return (
    <>
      <MainContainer>
        <HeaderSection />
        {activeTab === "home" && <Home />}
        {activeTab === "doctor" && <CusDoctor />}
        {activeTab === "hospital" && <HospitalMob />}
        {activeTab === "laboratory" && <Lab />}
        {activeTab === "pharmacy" && <Pharmacy />}
      </MainContainer>
    </>
  );
}

export default PageWrapper;
