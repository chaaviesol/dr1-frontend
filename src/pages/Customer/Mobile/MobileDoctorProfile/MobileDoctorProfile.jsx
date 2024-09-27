import React, { Fragment, useEffect, useState } from "react";
import "../MobileDoctorProfile/MobileDoctorProfile.css";
import { useLocation } from "react-router-dom";
import moment from "moment/moment";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchDoctorAvailability } from "../../../../api/hospitalApi";
import { BASE_URL, port } from "../../../../config";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useFetchFeedbacksAndRating from "../../../../hooks/useFetchFeedbacksAndRating";
import { useNavigate } from "react-router-dom";
import UserProfileCompleteModal from "../../../Customer/HaveUComProfile/UserProfileCompleteModal";
import { CircularProgress, FormControlLabel, Modal } from "@mui/material";
export default function MobileDoctorProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactstate, setcontactstate] = useState(false);
  const { auth } = useAuth();
  const [isShowCompleteUsrProfileModal, setIsShowCompleteUsrProfileModal] =
    useState(false);
  const doctor = location?.state;
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const { data: doctorAvailability, isLoading: isDoctorAvailabilityPending } =
    useQuery({
      queryKey: ["fetchDocAvailability", doctor?.id],
      queryFn: () => fetchDoctorAvailability(doctor?.id),
      enabled: !!doctor?.id,
    });
  const feedbacks = useFetchFeedbacksAndRating({
    type: "doctor",
    id: doctor?.id,
  });
  const updateViewCount = async (payload) => {
    const response = await axiosPrivate.post(
      `${BASE_URL}/user/viewcount`,
      payload
    );

    return response.data;
  };
  const updateViewCountMutation = useMutation({
    mutationKey: ["updateViewCountMutation", auth.userId, doctor?.id],
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
  const currentAvailability = doctorAvailability?.data;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this amazing site!",
          text: "Take a look at this awesome content.",
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

  // const handleShare = () => {
  //   const shareUrl = encodeURIComponent(window.location.href);
  //   const shareTitle = encodeURIComponent("Check out this amazing site!");

  //   const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
  //   const twitterShare = `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`;
  //   const whatsappShare = `https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`;
  //   const emailShare = `mailto:?subject=${shareTitle}&body=${shareUrl}`;

  //   // You can display these as links or open them directly
  //   window.open(facebookShare, "_blank");
  // };
  const modalopen = () => {
    setIsModalOpen(!isModalOpen);
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
  const fetchCustomerProfileStatus = async (customerId) => {
    const response = await axiosPrivate.post(
      `${BASE_URL}/user/profilecompleted`,
      {
        id: customerId,
      }
    );

    return response.data.profilecompleted;
  };

  const contactnowbutton = async () => {
    if (!auth.userId || !auth.userType === "customer") {
      toast.info("please login to view contact number");
      setTimeout(() => {
        navigate("/");
      }, 4000);
      return;
    }

    const completionStatus = await refetchCustomerProfileCompletionStatus();
    const newCustomerProfileCompletionStatus = completionStatus.data;
    if (newCustomerProfileCompletionStatus === false) {
      // setIsShowCompleteUsrProfileModal(true); //for enterting user remaining profile details
    } else if (newCustomerProfileCompletionStatus === true) {
      const data = {
        userid: auth.userid,
        id: doctor?.id,
        type: "Doctor",
        status: "P",
      };
      markConsultMutation(data);
    }
  };
  const markConsult = async (data) => {
    const response = await axiosPrivate.post(`${port}/user/consultcount`, data);

    return response;
  };
  const { mutateAsync: markConsultMutation } = useMutation({
    mutationKey: ["markConsult"],
    mutationFn: markConsult,
    onSuccess: () => {
      setcontactstate(true);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const StarRating = ({ rating }) => {
    const maxRating = 5;
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        i <= rating ? (
          <i
            className="ri-star-fill"
            style={{ marginRight: "5px", fontSize: "20px", color: "#FA8D0D" }}
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
      <div className="mobiledoctordiv">
        <div className="mobcontainer">
          <div className="mobiledoctorprofiletop flex">
            <div
              className="mobiledoctorprofileback flex"
              onClick={() => {
                navigate(-1);
              }}
            >
              <i class="ri-arrow-left-line"></i>
            </div>
            <div className="mobiledoctorprofiletitle flex">
              <h3> Doctor Profile </h3>
            </div>
            <div
              className="mobiledoctorprofileshare flex"
              onClick={handleShare}
            >
              <i class="ri-share-fill"></i>
            </div>
          </div>
        </div>

        <div className="mobiledoctorprofiletopback">
          <div className="mobiledoctorprofiledata">
            <div className="mobcontainer">
              <div className="mobdoprodetails flex">
                <img src={doctor.image} alt="" />

                <div>
                  <h3>{doctor?.name}</h3>
                  <h4>{doctor?.specialization}</h4>
                </div>
              </div>

              <div className="mobilestartsection flex">
                <StarRating rating={feedbacks?.averageRating} />
              </div>

              <div className="mobiledetailssection flex">
                <div>
                  <h4> {doctor?.education_qualification}</h4>
                </div>
                <div>
                  <h4>
                    {" "}
                    {new Date().getFullYear() -
                      (doctor?.experience || new Date().getFullYear())}
                    <span style={{ paddingLeft: 4 }}>Year Experience</span>
                  </h4>
                </div>
              </div>

              <div className="mobilebiosection">
                <div className="mobiledoctorprofiletitle">
                  <h3>Short Bio</h3>
                </div>

                <h4>{doctor?.about}</h4>
              </div>
            </div>

            <div className="mobileavailabitysection">
              {currentAvailability?.length > 0 &&
                currentAvailability?.map((ele, index) => (
                  <>
                    <div className="mobcontainer">
                      {currentAvailability?.length - 1 !== index && (
                        <div className="mobiledoctorprofiletitle">
                          <h3>Available</h3>
                        </div>
                      )}

                      <div className="mobileavailabityhospital flex">
                        <div key={index}>
                          <h3>{ele?.hospital_name}</h3>
                          <div className="flex">
                            {days.map((day, index) => (
                              <h4
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
                              </h4>
                            ))}
                          </div>
                        </div>
                        <Modal
                          open={isModalOpen}
                          onClose={() => setIsModalOpen(false)}
                        >
                          <div className="modalContainer">
                            <h3>{ele?.hospital_name}</h3>
                            <div className="mobiletiminglocation">
                              <h4>{ele?.hospitaladdrress}</h4>
                            </div>
                            <button
                              className="closeButtonmodal2"
                              onClick={handleClose}
                            >
                              &times;
                            </button>
                            {ele?.days_timing.map(
                              (dayObj, index) =>
                                dayObj.availableTimes.some(
                                  (time) => time.startTime && time.endTime
                                ) && (
                                  <>
                                    <div
                                      className="mobiletiming flex"
                                      key={index}
                                    >
                                      <div>
                                        <h3>{dayObj.day}</h3>
                                      </div>

                                      <div className="mobiletimingtime">
                                        {dayObj.availableTimes.map(
                                          (time, timeIndex) =>
                                            time.startTime &&
                                            time.endTime && (
                                              <h4 key={timeIndex}>
                                                {moment(time.startTime).format(
                                                  "hh:mm A"
                                                )}{" "}
                                                -
                                                {moment(time.endTime).format(
                                                  "hh:mm A"
                                                )}
                                              </h4>
                                            )
                                        )}
                                      </div>
                                    </div>
                                  </>
                                )
                            )}
                            <button
                              className="mobilecontactbuttonnew"
                              onClick={contactnowbutton}
                            >
                              Contact Now
                            </button>
                            {contactstate && (
                              <div className="mobilecontactbuttonafter flex">
                                <h3> +91 {ele?.contactNumber}</h3>
                                <button
                                  onClick={() =>
                                    window.open(`tel:+91${ele?.contactNumber}`)
                                  }
                                >
                                  Call Now
                                </button>
                              </div>
                            )}
                          </div>
                        </Modal>
                        <div className="mobileavailabityhospitalmore flex">
                          <i
                            class="ri-arrow-right-up-line"
                            onClick={modalopen}
                          ></i>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>

            <div className="mobcontainer">
              <div className="mobiledoctorprofiletitle">
                <h3>Rating & Reviews</h3>
              </div>

              <div className="mobiledoctorprofilereview flex">
                <div>
                  {" "}
                  <h3 style={{ background: "#FF8440" }}>
                    {" "}
                    <i class="ri-star-fill"></i>
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

              {/* <div className="mobiledoctorprofilesummery"> */}
              {/* <div className="flex">
                  <i class="ri-bard-fill"></i> <h3>Review Summary</h3>
                </div>

                <h4 style={{ marginTop: "10px" }}>
                  A doctor is a medical professional who diagnoses, treats, and
                  prevents illnesses and injuries. They work in various settings
                  like hospitals, clinics, and private practices. Doctors
                  perform exams, order tests,
                </h4> */}
              {/* </div> */}

              {feedbacks &&
                feedbacks.data &&
                feedbacks.data.map((ele, index) => (
                  <div
                    key={index}
                    className="mobiledoctorprofilefeedback"
                    style={{ marginTop: "20px" }}
                  >
                    <Fragment>
                      <div className="mobiledoctorprofilefeedbacktop flex">
                        <img
                          src={ele?.userid?.image || "images/man.jpg"}
                          alt=""
                        />

                        <div>
                          <h3>{ele?.userid?.name}</h3>
                          <div className="mobilestartsection2 flex">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <i
                                key={num}
                                style={{
                                  color:
                                    ele?.rating >= num ? "#FA8D0D" : undefined,
                                }}
                                className="ri-star-fill"
                              />
                            ))}
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
                      {/* <div className="mobiledoctorprofilefeedbackname flex">
                        <i class="ri-arrow-right-circle-fill"></i>
                        <h3>{ele?.userid?.name}</h3>
                      </div> */}
                    </Fragment>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <UserProfileCompleteModal
        open={isShowCompleteUsrProfileModal}
        onClose={setIsShowCompleteUsrProfileModal}
      />
    </div>
  );
}
