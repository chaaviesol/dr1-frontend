import { React, useState } from "react";
import styles from "./searchbox.module.css";

const SearchBox = ({handleProductSearch}) => {
  return (
    <div className={styles.container}>
      {/* <div className={styles.left}>
        <i className="ri-map-pin-2-line" />
        <input placeholder="Search Products" />
      </div> */}
      <div className={styles.center}>
        <input placeholder="Search Products" type="text" onChange={handleProductSearch} />
      </div>
      <div className={styles.right}>
        <div style={{display:"flex",alignItems:"center"}}>
          <i className="ri-search-2-line" />
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
