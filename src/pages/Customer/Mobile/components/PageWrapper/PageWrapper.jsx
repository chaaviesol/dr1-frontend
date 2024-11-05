import React, { useContext, useState } from "react";
import MainContainer from "../MainContainer/MainContainer";
import Home from "../../Home/Home";
import Pharmacy from "../../Pharmacy/Pharmacy";
import { useNavigate } from "react-router-dom";
import BottomBar from "../BottomBar/BottomBar";
import Community from "../../Community/Community";
import Profile from "../../Profile/Profile";
import { useTabBarContext } from "../../../../../contexts/MobileScreen/TabBarProvider";

function PageWrapper() {

const {activeTab}=useTabBarContext()
  // useEffect(() => {
  //   // Push a new state into the history stack when the tab changes
  //   if (activeTab !== "home") {
  //     window.history.pushState(null, "");
  //   }

  //   const handlePopState = (event) => {
  //     if (activeTab === "home") {
  //       // Close the app or go to the previous page when the Home tab is active
  //       window.history.back(); // This will take the user to the previous page
  //     } else {
  //       // For other tabs, simply set the active tab to home
  //       setActiveTab("home");
  //       // navigate("/")
  //     }
  //   };

  //   // Add event listener for the popstate event
  //   window.addEventListener("popstate", handlePopState);

  //   return () => {
  //     // Clean up the event listener on component unmount
  //     window.removeEventListener("popstate", handlePopState);
  //   };
  // }, [activeTab]);
  const tabComponents = {
    home: <Home />,
    community: <Community />,
    medicine: <Pharmacy />,
    profile: <Profile />,
  };
  return (
    <>
      <MainContainer>{tabComponents[activeTab]}</MainContainer>
      <BottomBar />
    </>
  );
}

export default PageWrapper;
