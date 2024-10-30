import React, { useEffect, useState } from "react";
import { useIsMobileScreen } from "../../../hooks/useIsMobileScreen";
import MyOrders from "./MyOrders";
import MyOrdersMobile from "./MyOrdersMobile";
import { Loader } from "../../../components/Loader/Loader";

function MyOrdersScreenDecider() {
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
  return <>{isMobile ? <MyOrdersMobile /> : <MyOrders />}</>;
}

export default MyOrdersScreenDecider;
