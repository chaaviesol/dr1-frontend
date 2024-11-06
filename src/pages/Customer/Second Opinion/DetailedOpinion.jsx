import React, { useEffect, useState } from "react";
import { useIsMobileScreen } from "../../../hooks/useIsMobileScreen";
import { Loader } from "../../../components/Loader/Loader";
import SecondOpinionMobileDetailed from "../Mobile/SecondOpinion/SecondOpinionMobileDetailed";
import DetailedOpinionDesktop from "./DetailedOpinionDesktop";
import { useLocation } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { BASE_URL } from "../../../config";
import { useQuery } from "@tanstack/react-query";

function DetailedOpinion() {
  const isMobile = useIsMobileScreen();
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const id = location?.state?.id;
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { userId, userType } = auth;

  const fetchSecondOpinionDetails = async (id) => {
    const response = await axiosPrivate.post(
      `${BASE_URL}/secondop/getareport`,
      {
        id: id,
      }
    );
    return response.data.data;
  };

  const { data: secondOpinionData, isApiLoading } = useQuery({
    queryKey: ["fetchSecondOpinionDetails", userId, id],
    queryFn: () => fetchSecondOpinionDetails(id),
    enabled: !!userId && userType === "customer" && !!id,
  });

  const handleDownload = () => {
    if (secondOpinionData?.report_image) {
      Object.values(secondOpinionData.report_image).forEach(
        (imageSrc, imgIndex) => {
          setTimeout(() => {
            const link = document.createElement("a");
            link.href = imageSrc;

            // Dynamically get the file extension from the URL (if available)
            const fileExtension =
              imageSrc.split(".").pop().split(/\#|\?/)[0] || "jpg";
            link.download = `report_image${imgIndex + 1}.${fileExtension}`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }, imgIndex * 500); // Delay increases with each image (500ms)
        }
      );
    } else {
      console.error("No prescription images available.");
    }
  };

  useEffect(() => {
    if (isMobile !== undefined) {
      setIsLoading(false);
    }
  }, [isMobile]);

  if (isLoading) {
    return <Loader />;
  }

  const props = {
    isApiLoading,
    handleDownload,
    secondOpinionData,
  };
  return (
    <>
      {isMobile ? (
        <SecondOpinionMobileDetailed {...props} />
      ) : (
        <DetailedOpinionDesktop {...props} />
      )}
    </>
  );
}

export default DetailedOpinion;
