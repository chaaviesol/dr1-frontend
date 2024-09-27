import React, { useEffect, useState } from "react";
import { useIsMobileScreen } from "../../hooks/useIsMobileScreen";
import { Loader } from "../../components/Loader/Loader";
import PageWrapper from "../Customer/Mobile/components/PageWrapper/PageWrapper";
import { useTabBarContext } from "../../contexts/MobileScreen/TabBarProvider";
import Labs from "../Labs/Labs";
import Pharmacy from "../Pharmacy/Pharmacy";

function PharmacyPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { activeTab, setActiveTab } = useTabBarContext();

  const isMobile = useIsMobileScreen();
  useEffect(() => {
    if (isMobile !== undefined) {
      setActiveTab("pharmacy");
      setIsLoading(false);
    }
  }, [isMobile]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{isMobile ? <PageWrapper /> : <Pharmacy />}</>;
}

export default PharmacyPage;
