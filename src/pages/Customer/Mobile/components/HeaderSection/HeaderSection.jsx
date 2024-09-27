import React from "react";
import AvatarWithLocation from "../AvatarWithLocation/AvatarWithLocation";
import TabSlider from "../TabSlider/TabSlider";
import SearchBox from "../SearchBox/SearchBox";
import styles from './styles.module.css'

function HeaderSection() {
  return (
    <>
      <AvatarWithLocation />
      <div className={styles.margin}>
        <TabSlider />
      </div>
      <div className={styles.margin}>
        <SearchBox />
      </div>
    </>
  );
}

export default HeaderSection;
