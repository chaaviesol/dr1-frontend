import React, { Fragment, useEffect, useState } from "react";
import "./doctorProfile.css";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { CircularProgress, Modal } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CallIcon from "@mui/icons-material/Call";
import axios from "axios";
import { BASE_URL, PHARMACY_URL, port } from "../../../config";
import moment from "moment/moment";
import UserProfileCompleteModal from "../HaveUComProfile/UserProfileCompleteModal";
import useFetchFeedbacksAndRating from "../../../hooks/useFetchFeedbacksAndRating";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchDoctorAvailability } from "../../../api/hospitalApi";
import { Loader } from "../../../components/Loader/Loader";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import Feedback from "../../../components/Feedback/Feedback";
import { LoginModal } from "../../../components/LoginModal/LoginModal";
export default function DoctorProfile() {
  const [ViewAvailabilityData, setViewAvailabilityData] = useState();
  const [open, setopen] = useState(false);
  const [isShowContact, setIsShowContact] = useState(false);
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);
  const [isShowCompleteUsrProfileModal, setIsShowCompleteUsrProfileModal] =
    useState(false);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = location?.state;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const feedbacks = useFetchFeedbacksAndRating({
    type: "doctor",
    id: doctor?.id,
  });
  const viewDetailedData = (id) => {
    const HosData = currentAvailability?.find((ele) => ele?.id === id);
    setViewAvailabilityData(HosData);
    handleModal();
  };

  const { data: doctorAvailability, isLoading: isDoctorAvailabilityPending } =
    useQuery({
      queryKey: ["fetchDocAvailability", doctor.id],
      queryFn: () => fetchDoctorAvailability(doctor.id),
      enabled: !!doctor?.id,
    });
  const currentAvailability = doctorAvailability?.data;
  const updateViewCount = async (payload) => {
    const response = await axiosPrivate.post(
      `${BASE_URL}/user/viewcount`,
      payload
    );

    return response.data;
  };
  const updateViewCountMutation = useMutation({
    mutationKey: ["updateViewCountMutation", auth.userId, doctor.id],
    mutationFn: (payload) => updateViewCount(payload),
  });
  useEffect(() => {
    if (doctor?.id && auth.userId) {
      const payload = {
        userid: auth.userId,
        id: doctor?.id,
        type: "Doctor",
      };
      updateViewCountMutation.mutateAsync(payload);
    }
  }, []);

  const handleModal = () => {
    setopen(!open);
  };
  const fetchCustomerProfileStatus = async (customerId) => {
    const response = await axiosPrivate.post(
      `${PHARMACY_URL}/user/profilecompleted`,
      {
        id: customerId,
      }
    );
    return response.data.profilecompleted;
  };
  const {
    data: customerProfileCompletionStatus,
    refetch: refetchCustomerProfileCompletionStatus,
    isError,
    isLoading: isCustomerProfileCheckLoading,
  } = useQuery({
    queryKey: ["fetchCustomerProfileStatus", auth.userId],
    queryFn: () => fetchCustomerProfileStatus(auth.userId),
    enabled: false,
  });
  console.log(
    "customerProfileCompletionStatus",
    customerProfileCompletionStatus
  );
  const consultNow = async () => {
    if (!auth.userId) {
      setIsShowLoginModal(true);
      return;
    }
    const completionStatus = await refetchCustomerProfileCompletionStatus();
    console.log(completionStatus);
    const newCustomerProfileCompletionStatus = completionStatus.data;
    if (newCustomerProfileCompletionStatus === false) {
      setopen(false); //close opened modals,if any
      setIsShowCompleteUsrProfileModal(true); //for enterting user remaining profile details
    } else if (newCustomerProfileCompletionStatus === true) {
      setIsShowContact(true);
      const data = {
        userid: auth.userId,
        id: doctor?.id,
        type: "Doctor",
        status: "P",
      };
      markConsultMutation(data);
    }
  };
  const markConsult = async (data) => {
    console.log(data);
    const response = await axiosPrivate.post(`${port}/user/consultcount`, data);
    console.log(response);
    return response;
  };
  const { mutateAsync: markConsultMutation } = useMutation({
    mutationKey: ["markConsult"],
    mutationFn: markConsult,
    onSuccess: () => {
      setIsShowContact(true);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data);
    },
  });

  const isLoading =
     isDoctorAvailabilityPending;

  console.log("ViewAvailabilityData>>>>", ViewAvailabilityData);
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
  return (
    <div>
      <Navbar />
      <div className="Doctor_profileAlign">
        {isLoading && <Loader />}
        <div className="container Doctor_profileAlignCenter">
          <div className="doctor-profile-section">
            <div className="doctor-profile-photo">
              <img src={doctor?.image || `images/dr (4).jpg`} alt="" />
            </div>
            <div className="doctor-profile-left-right flex">
              <div className="doctor-profile-left">
                <h2 style={{ color: "white" }}>{doctor?.name}</h2>
                <div className="doctorprofilestar flex">
                  <StarRating rating={doctor?.rating} />
                </div>

                <h4 style={{ marginTop: "1vw" }}>
                  {" "}
                  {doctor?.education_qualification ||
                    `BDS.MDS-Prosthodontist`}{" "}
                </h4>
                <h4>
                  {" "}
                  {new Date().getFullYear() -
                    (doctor?.experience || new Date().getFullYear())}
                  <span style={{ paddingLeft: 4 }}>Year Experience</span>
                </h4>
                <h4> {doctor?.specialization || `Dentist,Cosmetic`}</h4>
              </div>
              <div className="doctor-profile-right">
                <h5>About</h5>
                <p
                  className="priscriptionpara"
                  style={{ color: "white", letterSpacing: "1px" }}
                >
                  {doctor?.about}
                </p>
              </div>
            </div>
          </div>
          {currentAvailability?.length > 0 && (
            <div className="DoctorAvailableSec">
              <div className="DoctorAvailableAvailableTag">
                <p>Available</p>
              </div>
              <div className="DoctorAvailableAvailableSec">
                {currentAvailability?.length > 0 &&
                  currentAvailability?.map((ele, index) => (
                    <div key={index} className="DoctorAvailableSecSettingSec">
                      <div className="DoctorAvailableTiming">
                        <p>{ele?.hospital_name}</p>
                        <div className="DoctorAvailableTimingDays">
                          {days.map((day, index) => (
                            <p
                              key={index}
                              style={{
                                color: ele?.days_timing?.find(
                                  (mapday) =>
                                    mapday?.day === day &&
                                    mapday?.availableTimes?.find(
                                      (data) =>
                                        data?.startTime !== "" &&
                                        data?.endTime !== ""
                                    )
                                )
                                  ? "blue"
                                  : "grey",
                              }}
                            >
                              {day.slice(0, 3)}
                              <span>
                                {index === days?.length - 1 ? "" : ","}
                              </span>
                            </p>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          viewDetailedData(ele?.id);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div className="doc_profileSecFeedBack">
            <h2 clas>Rating & Reviews</h2>
            <div className="doc_profileSecFeedBackAndRatingBox">
              <div className="doc_profileSecFeedBackAndRatingBoxFlex">
                <h1>{feedbacks?.data?.length || 0}</h1>
                <p>Total Reviews</p>
              </div>
              <div className="doc_profileSecFeedBackAndRatingBoxFlex">
                <h1>{feedbacks?.averageRating || 0}</h1>
                <p>Average Rating</p>
              </div>
            </div>

            {feedbacks &&
              feedbacks.data &&
              feedbacks.data.map((ele, index) => (
                <Feedback key={ele.id} feedbackData={ele} />
              ))}
          </div>
        </div>
        <UserProfileCompleteModal
          open={isShowCompleteUsrProfileModal}
          onClose={setIsShowCompleteUsrProfileModal}
        />

        <Modal open={open} onClose={handleModal} className="doc_profileModal">
          <>
            <div className="doc_profileSec">
              <div className="doc_profileFirstTag">
                <p>{ViewAvailabilityData?.hospital_name}</p>
              </div>
              <div className="doc_profileModalLocSec">
                <LocationOnOutlinedIcon id="doc_profileModalLocSecIcon" />
                <p>{ViewAvailabilityData?.hospitaladdrress}</p>
              </div>
              <div className="doc_profileModalLocTimingSec">
                {ViewAvailabilityData?.days_timing?.map(
                  (ele, days_timingIndex) =>
                    ele?.availableTimes?.find(
                      (CheckTime) => CheckTime?.startTime && CheckTime?.endTime
                    ) ? (
                      <div
                        key={days_timingIndex}
                        className="doc_profileModalLocTimging"
                      >
                        <button>{ele?.day.slice(0, 3)}</button>
                        <div className="doc_profileModalLocTimgingGap">
                          {ele?.availableTimes.map(
                            (timing, availableTimesIndex) => (
                              <p key={availableTimesIndex}>
                                {moment(timing?.startTime).format("LT")} to{" "}
                                {moment(timing?.endTime).format("LT")}
                              </p>
                            )
                          )}
                        </div>
                      </div>
                    ) : (
                      ""
                    )
                )}
              </div>
              <div className="doc_profileModalAlignCont">
                <button
                  type="button"
                  style={{width:"15rem"}}
                  onClick={() => {
                    consultNow();
                  }}
                  disabled={isCustomerProfileCheckLoading || isShowContact}
                >
                  <CallIcon id="doc_profileModalBtnIcon" />
                  {isCustomerProfileCheckLoading ? (
                    <CircularProgress size="1.5rem" sx={{ color: "white" }} />
                  ) : isShowContact &&
                    auth.userId &&
                    auth.userType === "customer" ? (
                    doctor?.phone_office
                  ) : (
                    "View Contact"
                  )}
                </button>
              </div>
            </div>
          </>
        </Modal>
      </div>

      {isShowLoginModal && (
        <LoginModal
          show={isShowLoginModal}
          setShow={setIsShowLoginModal}
        />
      )}
      <Footer />
    </div>
  );
}
