import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import Tabs from "../Tabs/Tabs";
import { useTabBarContext } from "../../../../../contexts/MobileScreen/TabBarProvider";

function TabSlider() {
  const tabRefs = useRef({});
  const { activeTab, handleUpdateActiveTab } = useTabBarContext();

  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      tabRefs.current[activeTab].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeTab]);

  return (
    <>
      <div className={styles.container}>
        <div ref={(el) => (tabRefs.current["home"] = el)}>
          <Tabs iconName="ri-home-fill" pageName="Home" />
        </div>
        <div ref={(el) => (tabRefs.current["doctor"] = el)}>
          <Tabs iconName="fi fi-ss-user-md" pageName="Doctor" />
        </div>
        <div ref={(el) => (tabRefs.current["hospital"] = el)}>
          <Tabs iconName="fi fi-ss-hospitals" pageName="Hospital" />
        </div>
        <div ref={(el) => (tabRefs.current["laboratory"] = el)}>
          <Tabs iconName="ri-flask-fill" pageName="Laboratory" />
        </div>
        <div ref={(el) => (tabRefs.current["pharmacy"] = el)}>
          <Tabs iconName="ri-home-fill" pageName="Pharmacy" />
        </div>
      </div>
    </>
  );
}

export default TabSlider;
