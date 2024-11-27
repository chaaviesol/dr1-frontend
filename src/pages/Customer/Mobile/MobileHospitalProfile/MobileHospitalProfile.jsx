import React, { Fragment, useEffect, useState } from "react";
import "../MobileHospitalProfile/mobilehospitalprofile.css";
import { useLocation, useNavigate } from "react-router-dom";
import useFetchFeedbacks from "../../../../hooks/useFetchFeedbacksAndRating";
import { BASE_URL, port } from "../../../../config";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import UserProfileCompleteModal from "../../../Customer/HaveUComProfile/UserProfileCompleteModal";
import moment from "moment";
import { toast } from "react-toastify";
export default function MobileHospitalProfile() {
  const [isShowCompleteUsrProfileModal, setIsShowCompleteUsrProfileModal] =
    useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const HospitalData = location?.state?.details;
  const TemPImg = HospitalData?.photo?.image1 || "./images/TempHosImg.webp";
  const TemPImg2 = HospitalData?.photo?.image2 || "./images/hos.jpeg";
  const TemPImg3 = HospitalData?.photo?.image3 || "./images/hospital.jpg";
  console.log(".....>>>>>>>>>>", HospitalData);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const feedbacks = useFetchFeedbacks({
    type: "hospital",
    id: HospitalData.id,
  });
  const updateViewCount = async (payload) => {
    const response = await axiosPrivate.post(
      `${BASE_URL}/user/viewcount`,
      payload
    );
    console.log("objectobjectobjectobjectobject", response);
    return response.data;
  };
  const updateViewCountMutation = useMutation({
    mutationKey: ["updateViewCountMutation", auth.userId, HospitalData.id],
    mutationFn: (payload) => updateViewCount(payload),
  });

  useEffect(() => {
    if (HospitalData?.id && auth.userId) {
      const payload = {
        userid: auth.id,
        id: HospitalData?.id,
        type: "Hospital",
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
    data: customerProfileCompletionStatus,
    refetch: refetchCustomerProfileCompletionStatus,
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
      setIsShowCompleteUsrProfileModal(true); //for enterting user remaining details
    } else if (newCustomerProfileCompletionStatus === true) {
      const payload = {
        userid: auth.userId,
        id: HospitalData?.id,
        type: "Hospital",
        status: "P",
      };
      markConsultMutation.mutateAsync(payload);
    }
  };

  const markConsult = async (data) => {
    console.log(data);
    const response = await axiosPrivate.post(`${port}/user/consultcount`, data);
    console.log(response);
    return response;
  };
  const markConsultMutation = useMutation({
    mutationKey: ["markConsult", auth.userId, HospitalData.id],
    mutationFn: markConsult,
    onSuccess: () => {
      window.location.href = `tel:91${HospitalData?.contact_no}`;
    },
    onError: (error) => {
      console.log(error.response.data.message);
      // alert(error.response.data.message);
    },
  });

  // const handleClick = () => {
  //   if (!auth.userId) {
  //     toast.info("please login to view contact number");
  //     setTimeout(() => {
  //       navigate("/");
  //     }, 4000);
  //     return;
  //   }
  //   const phoneNumber =  `+91${HospitalData?.contact_no.replace(/\s+/g, '')}`;
  //   window.location.href = `tel:${phoneNumber}`;
  // };

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
        console.log("Share was successful.");
      } catch (error) {
        console.error("Share failed:", error);
      }
    } else {
      console.warn("Web Share API is not supported in this browser.");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
            <h3> Hospital Profile </h3>
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
            <img src={HospitalData?.image1 || TemPImg} alt="" />
          </div>

          <div className="mobilehospitalprofileherodetails flex">
            <div>
              <div className="mobilehospitalprofileheroname">
                <h3>{HospitalData?.name}</h3>
              </div>
              <div className="mobilehospitalprofileheroloca flex">
                <i className="ri-map-pin-fill"></i>
                <h4>{HospitalData?.pincode}</h4>
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

          <h4>{HospitalData?.address}</h4>
        </div>

        <div className="mobilebiosection">
          <div className="mobiledoctorprofiletitle">
            <h3>About Hospital</h3>
          </div>

          <h4>
            {HospitalData?.about ||
              "A doctor is a medical professional who diagnoses, treats, and prevents illnesses and injuries. They work in various settings like hospitals, clinics, and private practices. Doctors perform exams, order tests, prescribe medications, and create treatment plans. Key qualities include strong communication, empathy, attention to detail, and a commitment to patient care."}
          </h4>
        </div>

        <div className="mobiledoctorprofiletitle">
          <h3>Specialties</h3>
        </div>

        <div className="mobilehospitalprofilespec flex">
          {HospitalData?.speciality?.map((ele) => (
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
          {HospitalData?.feature?.map((ele) => (
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

        <div style={{ marginTop: "20px" }}>
          {/* <div className="flex">
            <i className="ri-bard-fill"></i> <h3>Review Summary</h3>
          </div>

          <h4 style={{ marginTop: "10px" }}>
            A doctor is a medical professional who diagnoses, treats, and
            prevents illnesses and injuries. They work in various settings like
            hospitals, clinics, and private practices. Doctors perform exams,
            order tests,
          </h4> */}
        </div>
        {feedbacks &&
          feedbacks.data &&
          feedbacks.data.map((ele, index) => (
            <div className="mobiledoctorprofilefeedback">
              <Fragment key={index}>
                <div className="mobiledoctorprofilefeedbacktop flex">
                  <img src="images/man.jpg" alt="" />

                  <div>
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
                <div className="mobiledoctorprofilefeedbackname flex">
                  <i className="ri-arrow-right-circle-fill"></i>
                  <h3>{ele?.userid?.name}</h3>
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
