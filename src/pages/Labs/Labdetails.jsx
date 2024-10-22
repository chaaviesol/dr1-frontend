import React, { useEffect, useState } from "react";
import Headroom from "react-headroom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import CallIcon from "@mui/icons-material/Call";
// import axios from "axios";
import { BASE_URL, port } from "../../config";
import useFetchFeedbacksAndRating from "../../hooks/useFetchFeedbacksAndRating";
// import moment from "moment";
import useAuth from "../../hooks/useAuth";
import UserProfileCompleteModal from "../Customer/HaveUComProfile/UserProfileCompleteModal";
import { useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Feedback from "../../components/Feedback/Feedback";
import { LoginModal } from "../../components/LoginModal/LoginModal";

export default function Labdetails() {
  const [isShowCompleteUsrProfileModal, setIsShowCompleteUsrProfileModal] =
    useState(false);
  const [contactNumber, setContactNumber] = useState("");
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);
  const tempImg = "images/LabTempimg.jpg";
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const labDetails = location?.state?.data;
  const { auth } = useAuth();
  const feedbacks = useFetchFeedbacksAndRating({
    type: "lab",
    id: labDetails?.id,
  });
  console.log("labDetails>>>>", labDetails);

  const updateViewCount = async (payload) => {
    const response = await axiosPrivate.post(
      `${BASE_URL}/user/viewcount`,
      payload
    );

    return response.data;
  };
  const updateViewCountMutation = useMutation({
    mutationKey: ["updateViewCountMutation", auth.userId, labDetails.id],
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
    refetch: refetchCustomerProfileCompletionStatus,
    isLoading: isCustomerProfileCheckLoading,
  } = useQuery({
    queryKey: ["fetchCustomerProfileStatus", auth.userId],
    queryFn: () => fetchCustomerProfileStatus(auth.userId),
    enabled: false,
  });

  const consultNow = async () => {
    if (!auth.userId) {
      setIsShowLoginModal(true)
      return;
    }
    const completionStatus = await refetchCustomerProfileCompletionStatus();
    const newCustomerProfileCompletionStatus = completionStatus.data;
    // alert(newCustomerProfileCompletionStatus);
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
    console.log(data);
    const response = await axiosPrivate.post(`${port}/user/consultcount`, data);
    console.log(response);
    return response;
  };
  const { mutateAsync: markConsultMutation } = useMutation({
    mutationKey: ["markConsult", auth.userId, labDetails.id],
    mutationFn: markConsult,
    onSuccess: () => {
      // window.location.href = `tel:91${labDetails?.phone_no}`;
      setContactNumber(labDetails?.phone_no);
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
            style={{ marginRight: "5px", fontSize: "20px", color: "#FFDE4D" }}
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

  if (labDetails) {
    return (
      <div>
        <div className="Lab_details_Laptop">
          <Headroom>
            <Navbar />
          </Headroom>

          <div className="container-third">
            <div className="lab-details-about flex">
              <div className="lab-deatials-left">
                <img src={labDetails?.photo?.image1 || tempImg} alt="" />
              </div>
              <div className="lab-deatials-right flex">
                <h2>{labDetails?.name}</h2>
                <div className="lab-deatails-star flex">
                  <StarRating rating={labDetails?.rating} />
                </div>
                <div className="lab-details-location flex">
                  <i className="ri-map-pin-fill" />
                  <h4>{labDetails?.address}</h4>
                </div>
                <div className="lab-details-buttons flex">
                  <div className="flex lab-details-buttons1">
                    <h4>
                      {labDetails?.timing.opening_time} to{" "}
                      {labDetails?.timing.closing_time}
                    </h4>
                  </div>

                  <div className="doc_profileModalAlignCont">
                    <button
                      type="button"
                      onClick={consultNow}
                      disable={isCustomerProfileCheckLoading}
                    >
                      <CallIcon id="doc_profileModalBtnIcon" />
                      {contactNumber ? `${contactNumber}` : "Contact Now"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="lab-deatails-photos">
              <div className="lab-details-heading">
                <h2>Photos</h2>
              </div>
              <div className="lab-details-imges wrapper">
                <div class="track">
                  <div>
                    <img src="images/la (1).jpg" alt="" />
                  </div>
                  <div>
                    <img src="images/la (2).jpg" alt="" />
                  </div>
                  <div>
                    <img src="images/la (3).jpg" alt="" />
                  </div>
                  <div>
                    <img src="images/la (4).jpg" alt="" />
                  </div>
                  <div>
                    <img src="images/la (1).jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="lab-deatails-photos">
              <div className="lab-details-heading">
                <h2>About</h2>
              </div>
              <h4 style={{ marginBottom: "1.3vw" }}>{labDetails?.about}</h4>
            </div>

            <div style={{ display: "flex", gap: "80px" }}>
              <div className="lab-deatails-Services">
                <div className="lab-details-heading">
                  <h2>Services</h2>
                </div>
                <div>
                  {labDetails.services.map((services) => (
                    <div className="sevice-list flex">
                      <i className="ri-arrow-right-circle-fill" />
                      <h4>{services}</h4>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lab-deatails-Services">
                <div className="lab-details-heading">
                  <h2>Features</h2>
                </div>
                <div>
                  {labDetails.features.map((feature) => (
                    <div className="sevice-list flex">
                      <i className="ri-arrow-right-circle-fill" />
                      <h4>{feature}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <h2 style={{ marginBottom: "1rem" }}>Rating & Reviews</h2>
            <div className="doc_profileSecFeedBackAndRatingBox">
              <div className="doc_profileSecFeedBackAndRatingBoxFlex">
                <h1>{feedbacks?.data?.length || "0"}</h1>
                <p>Total Reviews</p>
              </div>
              <div className="doc_profileSecFeedBackAndRatingBoxFlex">
                <h1>{feedbacks?.averageRating || 0}</h1>
                <p>Average Rating</p>
              </div>
            </div>
            <div style={{ marginTop: "2rem" }}>
              {feedbacks &&
                feedbacks.data &&
                feedbacks.data.map((ele, index) => (
                  <Feedback key={ele.index} feedbackData={ele} />
                ))}
            </div>
          </div>
        </div>

        {/*End Lab Mobile Screen */}

        <div className="container Lab_details_mobile">
          {/* search box */}

          {/*End search box */}

          {/* Hero */}
          <div className="lab_Pha_Mob_img">
            <img src={labDetails?.photo?.image1 || tempImg} alt="" />
          </div>

          {/*End Hero */}

          {/* Datas */}

          <h1>{labDetails?.name}</h1>

          {/* <div className='lab_type'><h4>Allopathy</h4></div> */}

          <div className="lab_about">
            <h4>{labDetails?.about}</h4>
          </div>

          <div className="lab_location_mobile">
            <i className="ri-map-pin-fill" />
            <h4>{labDetails?.address}</h4>
          </div>

          <h4 className="lab_time_button_mobile flex">
            {labDetails?.timing?.opening_time} to{" "}
            {labDetails?.timing?.closing_time}
          </h4>

          <a href={`tel:${labDetails?.phone_no}`}>
            <h4 className="lab_time_button_mobile2 flex">Contact now</h4>
          </a>

          {/*End Datas */}

          {/* Photos */}

          {labDetails?.photo?.image2 ? (
            <div className="lab_Pha_Mob_img">
              <img src={labDetails?.photo?.image2} alt="" />
            </div>
          ) : (
            ""
          )}

          {labDetails?.photo?.image3 ? (
            <div className="lab_Pha_Mob_img">
              <img src={labDetails?.photo?.image3} alt="" />
            </div>
          ) : (
            ""
          )}
          {labDetails?.photo?.image4 ? (
            <div className="lab_Pha_Mob_img">
              <img src={labDetails?.photo?.image4} alt="" />
            </div>
          ) : (
            ""
          )}

          {/*End Photos */}

          {/*End Lab Mobile Screen */}
        </div>
        <UserProfileCompleteModal
          open={isShowCompleteUsrProfileModal}
          onClose={setIsShowCompleteUsrProfileModal}
        />
        <Footer />
        {isShowLoginModal && <LoginModal show={isShowLoginModal} setShow={setIsShowLoginModal} />}

      </div>
    );
  } else {
    return (
      <div>
        <p>No datas found</p>
      </div>
    );
  }
}
