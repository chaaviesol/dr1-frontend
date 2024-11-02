import React from "react";
import styles from "./styles.module.css";
import ClickToSearchBox from "../components/ClickToSearchBox/ClickToSearchBox";
import CartIcon from "../../../../components/CartIcon";
import ClickableNavigationIcon from "../components/ClickableNavigationIcon";

function Community() {
  return (
    <>
      <div className={`${styles.maincontainer}avoidbottombar`} style={{WebkitTapHighlightColor:"transparent"}}>
        <div className={styles.top}>
          <div>
            <ClickToSearchBox placeholder="Search a query or blog" />
          </div>
          <div>
            <ClickableNavigationIcon icon="ri-questionnaire-line" />
          </div>
        </div>

        <div className={styles.blogsection}>
          <span>Blog section coming soon</span>
        </div>
        <div className={styles.addquery}>
          <button>Add query</button>
        </div>
      </div>
    </>
  );
}

export default Community;
