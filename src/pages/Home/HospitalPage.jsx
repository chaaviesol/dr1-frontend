import React, { useEffect, useState } from 'react'
import { useIsMobileScreen } from '../../hooks/useIsMobileScreen';
import { Loader } from '../../components/Loader/Loader';
import PageWrapper from '../Customer/Mobile/components/PageWrapper/PageWrapper';
import { useTabBarContext } from '../../contexts/MobileScreen/TabBarProvider';
import Hospital from '../Customer/Hospital/Hospital';

function HospitalPage() {
    const [isLoading, setIsLoading] = useState(true);
    const { activeTab, setActiveTab } = useTabBarContext();

    const isMobile = useIsMobileScreen();
    useEffect(() => {
      if (isMobile !== undefined) {
        setActiveTab("hospital")
        setIsLoading(false);
      }
    }, [isMobile]);
  
    if (isLoading) {
      return <Loader/>; 
    }
  
    return <>{isMobile ? <PageWrapper /> : <Hospital />}</>;
}

export default HospitalPage