import React from "react";
import styles from "./styles.module.css";
import ClickToSearchBox from "../components/ClickToSearchBox/ClickToSearchBox";
import CartIcon from "../../../../components/CartIcon";
import ClickableNavigationIcon from "../components/ClickableNavigationIcon";

function Community() {
  return (
    <>
      <div>
        <div className={styles.top}>
          <div>
            <ClickToSearchBox placeholder="Search a query or blog" />
          </div>
          <div>

            <ClickableNavigationIcon icon="ri-questionnaire-line" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Community;
