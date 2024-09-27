import React, { useEffect, useState } from "react";
import { useIsMobileScreen } from "../../hooks/useIsMobileScreen";
import { Loader } from "../../components/Loader/Loader";
import PageWrapper from "../Customer/Mobile/components/PageWrapper/PageWrapper";
import { useTabBarContext } from "../../contexts/MobileScreen/TabBarProvider";
import Labs from "../Labs/Labs";

function LabPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { activeTab, setActiveTab } = useTabBarContext();

  const isMobile = useIsMobileScreen();
  useEffect(() => {
    if (isMobile !== undefined) {
      setActiveTab("laboratory");
      setIsLoading(false);
    }
  }, [isMobile]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{isMobile ? <PageWrapper /> : <Labs />}</>;
}

export default LabPage;
