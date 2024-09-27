/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { IconButton } from "@mui/material";
import { useTabBarContext } from "../../../../../contexts/MobileScreen/TabBarProvider";
import { Navigate, useNavigate } from "react-router-dom";
function SearchBox() {
  const [isModalOpen, setIsOpenModal] = useState(false);
  const [activePlaceholderAndIcon, setActivePlaceholderAndIcon] = useState({
    activePlaceholder: "Search Doctor",
    activeIcon: "fi fi-ss-user-md",
    pageToWhereNavigate: "/doctor",
  });
  const { activeTab } = useTabBarContext();
  const navigate = useNavigate();

  const searchIcon = `ri-search-line ${styles.searchIcon}`;

  useEffect(() => {
    handlePlaceholderAndIconChanges();
  }, [activeTab]);

  const handlePlaceholderAndIconChanges = (clickedCategory) => {
    let switchMain = activeTab;
    if (clickedCategory) {
      switchMain = clickedCategory;
    }
    let placeholder = "";
    let icon = "";
    let pageToWhereNavigate = "";
    switch (switchMain) {
      case "home":
        placeholder = "Search Doctor";
        icon = "fi fi-ss-user-md";
        pageToWhereNavigate = "/searchdoctor";
        break;
      case "doctor":
        placeholder = "Search Doctor";
        icon = "fi fi-ss-user-md";
        pageToWhereNavigate = "/searchdoctor";
        break;
      case "hospital":
        placeholder = "Search Hospital";
        icon = "fi fi-ss-hospitals";
        pageToWhereNavigate = "/hospitalfilter";
        break;
      case "laboratory":
        placeholder = "Search Laboratory";
        icon = "ri-flask-fill";
        pageToWhereNavigate = "/labfiltering";
        break;
      case "pharmacy":
        placeholder = "Search Pharmacy";
        icon = "fi fi-ss-hospitals";
        break;
    }
    setActivePlaceholderAndIcon({
      activePlaceholder: placeholder,
      activeIcon: icon,
      pageToWhereNavigate: pageToWhereNavigate,
    });
    setIsOpenModal(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.icons}>
          <i
            className={`${styles.icon} ${activePlaceholderAndIcon.activeIcon}`}
          />
          <IconButton
            onClick={() => setIsOpenModal(!isModalOpen)}
            sx={{ padding: ".9rem" }}
          >
            <i className={`${styles.icon} ri-arrow-down-s-line`}></i>
          </IconButton>
        </div>
        <div
          className={styles.search}
          onClick={() => navigate(activePlaceholderAndIcon.pageToWhereNavigate)}
        >
          <input
            type="text"
            disabled
            style={{ backgroundColor: "transparent" }}
            placeholder={activePlaceholderAndIcon.activePlaceholder}
          />
          <IconButton
            onClick={() =>
              navigate(activePlaceholderAndIcon.pageToWhereNavigate)
            }
            sx={{ padding: ".9rem" }}
          >
            <i className={searchIcon} />
          </IconButton>
        </div>
        {isModalOpen && (
          <div className={styles.modalContainer}>
            <div onClick={() => handlePlaceholderAndIconChanges("doctor")}>
              <i className="fi fi-ss-user-md"></i>
              <span>Doctor</span>
            </div>
            <div onClick={() => handlePlaceholderAndIconChanges("hospital")}>
              {" "}
              <i className="fi fi-ss-hospitals"></i> <span>Hospital</span>
            </div>
            <div onClick={() => handlePlaceholderAndIconChanges("laboratory")}>
              {" "}
              <i className="ri-flask-fill"></i> <span>Laboratory</span>
            </div>
            <div
              onClick={() => handlePlaceholderAndIconChanges("pharmacy")}
              style={{ border: "none" }}
            >
              {" "}
              <i className="fi fi-ss-hospitals"></i> <span>Pharmacy</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchBox;
