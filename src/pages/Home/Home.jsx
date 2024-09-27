import React, { useEffect, useState } from "react";
import { useIsMobileScreen } from "../../hooks/useIsMobileScreen";
import PageWrapper from "../Customer/Mobile/components/PageWrapper/PageWrapper";
import Mainpage from "../Mainpage/Mainpage";
import { Loader } from "../../components/Loader/Loader";
import { useTabBarContext } from "../../contexts/MobileScreen/TabBarProvider";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { activeTab, setActiveTab } = useTabBarContext();

  const isMobile = useIsMobileScreen();
  useEffect(() => {
    if (isMobile !== undefined) {
      setActiveTab("home");
      setIsLoading(false);
    }
  }, [isMobile]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{isMobile ? <PageWrapper /> : <Mainpage />}</>;
}

export default Home;
