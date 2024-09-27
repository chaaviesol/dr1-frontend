import axios from "axios";
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
  const { userId,userType } = auth;
  const axiosPrivate = useAxiosPrivate();

  const showPopup = () => {};
  const fetchCustomerDoctorConsultData = async (userId) => {
    const payload = {
      user_id: userId,
    };
    const response = await axiosPrivate.post(
      `${port}/user/doctorafterconsult`,
      payload
    );
    return response.data;
  };

  const { data: docData } = useQuery({
    queryKey: ["fetchCustomerDoctorConsultData", userId],
    queryFn: async () => {
      const data = await fetchCustomerDoctorConsultData(userId);
      return data.interactions;
    },

    enabled: !!userId && userType==="customer",
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
