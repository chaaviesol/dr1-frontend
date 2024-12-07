import React, { useContext, useState } from "react";
import MainContainer from "../MainContainer/MainContainer";
import Home from "../../Home/Home";
import Pharmacy from "../../Pharmacy/Pharmacy";
import BottomBar from "../BottomBar/BottomBar";
import Lab from "../../Lab/Lab";
import Profile from "../../Profile/Profile";
import { useTabBarContext } from "../../../../../contexts/MobileScreen/TabBarProvider";

function PageWrapper() {
  const { activeTab } = useTabBarContext();
  const tabComponents = {
    home: <Home />,
    lab: <Lab />,
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
