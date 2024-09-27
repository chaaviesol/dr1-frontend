import React, { useContext, useEffect, useState } from "react";

import MobileView from "./MobileView/Index";
import DesktopView from "./DesktopView/SearchDoc";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchDocContext } from "../../../../contexts/Doctor/SearchDoctorProvider";
import { useIsMobileScreen } from "../../../../hooks/useIsMobileScreen";
import { Loader } from "../../../../components/Loader/Loader";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const { setFilters } = useContext(SearchDocContext);
  const { state } = location || {}; //coming from  main pages..by clicking btns
  const isMobile = useIsMobileScreen();
  useEffect(() => {
    if (isMobile !== undefined) {
      setIsLoading(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (state) {
      navigate(location.pathname, { replace: true, state: null });
    } else {
      setFilters({
        type: "",
        specializations: [],
        gender: "",
        experience: 0,
        name: "",
      });
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return <>{isMobile ? <MobileView /> : <DesktopView />}</>;
};

export default Index;
