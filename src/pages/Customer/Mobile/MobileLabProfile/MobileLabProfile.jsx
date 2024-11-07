import React, { Fragment, useEffect, useState } from "react";
import Headroom from "react-headroom";
import { useLocation, useNavigate } from "react-router-dom";
import CallIcon from "@mui/icons-material/Call";
import axios from "axios";
import { BASE_URL, port } from "../../../../config";
import useFetchFeedbacksAndRating from "../../../../hooks/useFetchFeedbacksAndRating";
import moment from "moment";
import useAuth from "../../../../hooks/useAuth";
import UserProfileCompleteModal from "../../../Customer/HaveUComProfile/UserProfileCompleteModal";
import { useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "react-toastify";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

export default function MobileLabProfile() {
  const [isShowCompleteUsrProfileModal, setIsShowCompleteUsrProfileModal] =
    useState(false);

  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const labDetails = location?.state?.data;

  const TemPImg = labDetails?.photo?.image1 || "images/LabtempImg.jpg";
  const TemPImg2 = labDetails?.photo?.image2 || "./images/hos.jpeg";
  const TemPImg3 = labDetails?.photo?.image3 || "./images/hospital.jpg";
  const { auth } = useAuth();
  const feedbacks = useFetchFeedbacksAndRating({
    type: "lab",
    id: labDetails?.id,
  });
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const updateViewCount = async (payload) => {
    const response = await axiosPrivate.post(
      `${BASE_URL}/user/viewcount`,
      payload
    );

    return response.data;
  };
  const updateViewCountMutation = useMutation({
    mutationKey: ["updateViewCountMutation", auth?.userId, labDetails?.id],
    mutationFn: (payload) => updateViewCount(payload),
  });
  useEffect(() => {
    if (labDetails?.id && auth.userId) {
      const payload = {
        userid: auth.userId,
        id: labDetails?.id,
        type: "Lab",
      };
      updateViewCountMutation.mutateAsync(payload);
    }
  }, []);

  const fetchCustomerProfileStatus = async (customerId) => {
    const response = await axiosPrivate.post(
      `${BASE_URL}/user/profilecompleted`,
      {
        id: customerId,
      }
    );
    return response.data.profilecompleted;
  };
  const {
    data: status,
    refetch: refetchCustomerProfileCompletionStatus,
    isError,
    isLoading: isCustomerProfileCheckLoading,
  } = useQuery({
    queryKey: ["fetchCustomerProfileStatus", auth.userId],
    queryFn: () => fetchCustomerProfileStatus(auth.userId),
    enabled: false,
  });

  const consultNow = async () => {
    if (!auth.userId) {
      toast.info("please login to view contact number");
      return;
    }
    const completionStatus = await refetchCustomerProfileCompletionStatus();
    const newCustomerProfileCompletionStatus = completionStatus.data;

    if (newCustomerProfileCompletionStatus === false) {
      setIsShowCompleteUsrProfileModal(true); //for enterting user remaining profile details
    } else if (newCustomerProfileCompletionStatus === true) {
      const payload = {
        userid: auth.userId,
        id: labDetails.id,
        type: "Lab",
        status: "P",
      };
      markConsultMutation(payload);
    }
  };
  const markConsult = async (data) => {
    const response = await axiosPrivate.post(`${port}/user/consultcount`, data);

    return response;
  };
  const { mutateAsync: markConsultMutation } = useMutation({
    mutationKey: ["markConsult", auth?.userId, labDetails?.id],
    mutationFn: markConsult,
    onSuccess: () => {
      window.location.href = `tel:91${labDetails?.phone_no}`;
    },
    onError: (error) => {
      console.log(error.response.data.message);
      // alert(error.response.data.message);
    },
  });

  const StarRating = ({ rating }) => {
    const maxRating = 5;
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        i <= rating ? (
          <i
            className="ri-star-fill"
            style={{ marginRight: "5px", fontSize: "20px", color: "#f59e0b" }}
          />
        ) : (
          <i
            className="ri-star-fill"
            style={{ color: "gray", marginRight: "5px", fontSize: "20px" }}
          />
        )
      );
    }

    return <div>{stars}</div>;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this amazing site!",
          url: window.location.href,
        });
      } catch (error) {}
    } else {
      console.warn("Web Share API is not supported in this browser.");
    }
  };

  return (
    <div>
      <div className="mobcontainer mobilehospitaldiv">
        <div className="mobilehospitalprofiletop flex">
          <div
            className="mobilehospitalprofileback flex"
            onClick={() => navigate(-1)}
          >
            <i className="ri-arrow-left-line"></i>
          </div>
          <div className="mobilehospitalprofiletitle flex">
            <h3> Laboratory Profile </h3>
          </div>
          <div
            className="mobilehospitalprofileshare flex"
            onClick={handleShare}
          >
            <i className="ri-share-fill"></i>
          </div>
        </div>

        <div
          className="mobilehospitalprofilehero flex"
          style={{
            backgroundImage: `url(${TemPImg2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mobilehospitalprofileherologo">
            <img src={labDetails?.image1 || TemPImg} alt="" />
          </div>

          <div className="mobilehospitalprofileherodetails flex">
            <div>
              <div className="mobilehospitalprofileheroname">
                <h3>{labDetails?.name}</h3>
              </div>
              <div className="mobilehospitalprofileheroloca flex">
                <i className="ri-map-pin-fill"></i>
                <h4>{labDetails?.pincode}</h4>
              </div>
            </div>

            <button
              className="flex"
              onClick={consultNow}
              disable={isCustomerProfileCheckLoading}
            >
              <i className="ri-phone-fill"></i>
            </button>
          </div>
        </div>

        <div className="mobilebiosection">
          <div className="mobiledoctorprofiletitle">
            <h3>Address</h3>
          </div>

          <h4>{labDetails?.address}</h4>
        </div>
        <div className="mobilebiosection">
          <div className="mobiledoctorprofiletitle">
            <h3>About Laboratory</h3>
          </div>

          <h4>
            {labDetails?.about ||
              "A doctor is a medical professional who diagnoses, treats, and prevents illnesses and injuries. They work in various settings like hospitals, clinics, and private practices. Doctors perform exams, order tests, prescribe medications, and create treatment plans. Key qualities include strong communication, empathy, attention to detail, and a commitment to patient care."}
          </h4>
        </div>

        <div className="mobiledoctorprofiletitle">
          <h3>Services</h3>
        </div>

        <div className="mobilehospitalprofilespec flex">
          {labDetails?.services?.map((ele) => (
            <div className="mobilehospitalprofilespec1 flex">
              <i className="ri-arrow-right-line"></i>
              <h4> {ele}</h4>
            </div>
          ))}
        </div>

        <div className="mobiledoctorprofiletitle">
          <h3>Features</h3>
        </div>

        <div className="mobilehospitalprofilespec flex">
          {labDetails?.features?.map((ele) => (
            <div className="mobilehospitalprofilespec1 flex">
              <i className="ri-arrow-right-line"></i>
              <h4>{ele}</h4>
            </div>
          ))}
        </div>

        <div className="mobiledoctorprofiletitle">
          <h3>Rating & Reviews</h3>
        </div>

        <div className="mobiledoctorprofilereview flex">
          <div>
            {" "}
            <h3 style={{ background: "#FF8440" }}>
              {" "}
              <i className="ri-star-fill"></i>
              {feedbacks?.averageRating || 0} +
            </h3>
          </div>

          <div>
            {" "}
            <h3 style={{ background: "#0A6252" }}>
              {feedbacks?.data?.length || "0"} Reviews
            </h3>
          </div>
        </div>

        <div style={{ marginTop: "20px" }}></div>
        {feedbacks &&
          feedbacks.data &&
          feedbacks.data.map((ele, index) => (
            <div className="mobiledoctorprofilefeedback">
              <Fragment key={index}>
                <div className="mobiledoctorprofilefeedbacktop flex">
                  <img src="images/man.jpg" alt="" />

                  <div>
                    <div className="mobiledoctorprofilefeedbackname flex">
                      <h3>{ele?.userid?.name}</h3>
                    </div>
                    <div className="mobilestartsection2 flex">
                      <StarRating rating={feedbacks?.averageRating} />
                    </div>

                    <h4 style={{ marginTop: "2px" }}>
                      {moment(ele?.created_date).format("DD/MM/YYYY")}
                    </h4>
                  </div>
                </div>

                <div>
                  <h4 style={{ marginTop: "10px", marginBottom: "10px" }}>
                    {ele?.message}
                  </h4>
                </div>
              </Fragment>
            </div>
          ))}
      </div>
      <UserProfileCompleteModal
        open={isShowCompleteUsrProfileModal}
        onClose={setIsShowCompleteUsrProfileModal}
      />
    </div>
  );
}
