import React, { createContext, useEffect, useState } from "react";
import { port } from "../../config";
import { useAuth } from "../../contexts/Auth/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

export const PopupContext = createContext();

export const ShowFeedBackPopupContext = ({ children }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [ContactData, setContactData] = useState([]);
  const [hospitalData, sethospitalData] = useState([]);
  const [LabData, setLabData] = useState([]);
  const { auth } = useAuth();
  const { userId, userType } = auth;
  const axiosPrivate = useAxiosPrivate();

  const showPopup = () => {};
  const fetchCustomerDoctorConsultData = async () => {
    const response = await axiosPrivate.post(`${port}/user/doctorafterconsult`);
    return response;
  };

  const { data: docData } = useQuery({
    queryKey: ["fetchCustomerDoctorConsultData", userId],
    queryFn: async () => {
      try {
        const response = await fetchCustomerDoctorConsultData();
        if (response.status === 204) {
          return []; // No content, return an empty array
        }
        return response.data.interactions;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return []; // Return an empty array when 404
        }
        throw error; // Rethrow any other errors
      }
    },

    // enabled: !!userId && userType === "customer",
    enabled: false,
  });
  useEffect(() => {
    if (docData?.length) {
      setIsPopupVisible(true);
    }
  }, [docData]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const data = {
      user_id: userId,
    };
    axiosPrivate
      .post(`${port}/user/hospitalafterconsult`, data)
      .then((res) => {
        // console.log("res>>>>", res)
        if (res?.data?.interactions.length > 0) {
          sethospitalData(res?.data?.interactions);
          setIsPopupVisible(true);
        }
      })
      .catch((err) => {
        // console.log(err)
      });
    axiosPrivate
      .post(`${port}/user/labafterconsult`, data)
      .then((res) => {
        // console.log("res>>>>", res)
        if (res?.data?.data?.length > 0) {
          setLabData(res?.data?.data);
          setIsPopupVisible(true);
        }
      })
      .catch((err) => {
        // console.log(err)
      });
  }, []);

  useEffect(() => {
    const combinedData = [];
    if (hospitalData?.length) combinedData.push(...hospitalData);
    if (docData?.length) combinedData.push(...docData);
    if (LabData?.length) combinedData.push(...LabData);
    setContactData(combinedData);
  }, [hospitalData, docData, LabData]);
  const hidePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <PopupContext.Provider
      value={{ isPopupVisible, showPopup, hidePopup, ContactData }}
    >
      {children}
    </PopupContext.Provider>
  );
};
