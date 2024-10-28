import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useTabBarContext } from "../../../../../contexts/MobileScreen/TabBarProvider";
function Tabs({ iconName, pageName }) {
  const { activeTab, handleUpdateActiveTab } = useTabBarContext();
  const isTabActive = activeTab.toLowerCase() === pageName.toLowerCase();
  const tabClass = `${styles.container} ${
    isTabActive ? styles.active : styles.inactive
  }`;
  const page = isTabActive ? styles.whitecolor : styles.graycolor;
  const iconColor = isTabActive ? "white" : "#999999";

  const updateTab = () => {
    handleUpdateActiveTab(pageName);
  };

  return (
    <>
      <button
        style={{ WebkitTapHighlightColor: "transparent" }}
        onClick={updateTab}
        className={tabClass}
        type="button"
      >
        <span className={page}>{pageName}</span>
      </button>
    </>
  );
}
Tabs.prototype = {
  pageName: PropTypes.string,
};

export default Tabs;
