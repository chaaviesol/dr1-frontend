import React, { useEffect, useState } from 'react'
import { useIsMobileScreen } from '../../hooks/useIsMobileScreen';
import { Loader } from '../../components/Loader/Loader';
import Doctor from '../Customer/doctor/Doctor';
import PageWrapper from '../Customer/Mobile/components/PageWrapper/PageWrapper';
import { useTabBarContext } from '../../contexts/MobileScreen/TabBarProvider';

function DoctorPage() {
    const [isLoading, setIsLoading] = useState(true);
    const { activeTab, setActiveTab } = useTabBarContext();

    const isMobile = useIsMobileScreen();
    useEffect(() => {
      if (isMobile !== undefined) {
        setActiveTab("doctor")
        setIsLoading(false);
      }
    }, [isMobile]);
  
    if (isLoading) {
      return <Loader/>; 
    }
  
    return <>{isMobile ? <PageWrapper /> : <Doctor />}</>;
}

export default DoctorPage