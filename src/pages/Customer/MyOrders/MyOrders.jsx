import React, { useEffect, useState } from "react";
import { useIsMobileScreen } from "../../../hooks/useIsMobileScreen";
import MyOrdersMobile from "./MyOrdersMobile";
import MyOrdersDesktop from "./MyOrdersDesktop";
import { Loader } from "../../../components/Loader/Loader";

function MyOrders() {
  const [isLoading, setIsLoading] = useState(true);

  const isMobile = useIsMobileScreen();

  useEffect(() => {
    if (isMobile !== undefined) {
      setIsLoading(false);
    }
  }, [isMobile]);

  if (isLoading) {
    return <Loader />;
  }
  return <>{isMobile ? <MyOrdersMobile /> : <MyOrdersDesktop />}</>;
}

export default MyOrders;
