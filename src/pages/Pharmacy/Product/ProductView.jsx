import React, { useEffect } from "react";
import Navbar from "../../../components/Navbar";
import SelectCategory from "../../Customer/Mobile/Pharmacy/Category/SelectCategory";
// import SearchBox from "./SearchBox";
// import styles from "./styles.module.css";
import { useIsMobileScreen } from "../../../hooks/useIsMobileScreen";
// import { useNavigate } from "react-router-dom";

function ProductView({passedCategoryId}) {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const isMobile=useIsMobileScreen()
  // const navigate=useNavigate()

  return (
    <div>
      <Navbar />

      <div style={{ margin: "1rem 6rem" }}>
        

        <SelectCategory isMobile={isMobile} passedCategoryId={passedCategoryId} />
      </div>
    </div>
  );
}

export default ProductView;
