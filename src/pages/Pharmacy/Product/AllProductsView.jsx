import React, { useEffect, useState } from "react";
import { useIsMobileScreen } from "../../../hooks/useIsMobileScreen";
import { Loader } from "../../../components/Loader/Loader";
import SelectCategory from "../../Customer/Mobile/Pharmacy/Category/SelectCategory";
import ProductView from "./ProductView";
import { useLocation } from "react-router-dom";

function AllProductsView() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { passedCategoryId } = location.state || {};
  const isMobile = useIsMobileScreen();
  useEffect(() => {
    if (isMobile !== undefined) {
      setIsLoading(false);
    }
  }, [isMobile]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {isMobile ? (
        <SelectCategory passedCategoryId={passedCategoryId} />
      ) : (
        <ProductView passedCategoryId={passedCategoryId} />
      )}
    </>
  );
}

export default AllProductsView;
