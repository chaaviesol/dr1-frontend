import React, { Fragment, useState } from "react";
import "./HospitalDetailed.css";
import { useEffect } from "react";
import { BASE_URL, port } from "../../../../config";
import { useLocation, useNavigate } from "react-router-dom";
import CallIcon from "@mui/icons-material/Call";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import moment from "moment";
import useFetchFeedbacks from "../../../../hooks/useFetchFeedbacksAndRating";
import UserProfileCompleteModal from "../../../Customer/HaveUComProfile/UserProfileCompleteModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useAuth from "../../../../hooks/useAuth";
import { toast } from "react-toastify";
const HospitalDetailed = () => {
  const [isShowCompleteUsrProfileModal, setIsShowCompleteUsrProfileModal] =
    useState(false);
  const [contactNumber, setContactNumber] = useState("");
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();
  const HospitalData = location?.state?.details;

  const feedbacks = useFetchFeedbacks({
    type: "hospital",
    id: HospitalData.id,
  });
  const TemPImg = "./images/TempHosImg.jpg";
  const TemPImg2 = "./images/hos.jpeg";
  const TemPImg3 = "./images/hos3.jpg";
  const updateViewCount = async (payload) => {
    const response = await axiosPrivate.post(
      `${BASE_URL}/user/viewcount`,
      payload
    );

    return response.data;
  };
  const fetchDcotorList = async (hospitalId) => {
    const response = await axiosPrivate.post(
      `${BASE_URL}/hospital/hospital_doctors`,
      {
        id: hospitalId,
      }
    );

    return response.data.data;
  };
  const { data: doctorsList } = useQuery({
    queryKey: ["doctorsList", HospitalData.id],
    queryFn: () => fetchDcotorList(HospitalData.id),
    enabled: !!HospitalData.id,
  });
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
      // window.location.href = `tel:91${HospitalData?.contact_no}`;
      setContactNumber(HospitalData?.contact_no);
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

  return (
    <>
      <Navbar />
      <div className="HospitalDetailedPadding">
        <div className="mainadmindoctordatas flex">
          <div className="mainadmindoctordatas_profile flex">
            <img
              className="mainadmindoctordatas_profile_photo"
              src={HospitalData?.image1 || TemPImg}
              alt=""
            />
            <div className="mainadmindoctordatas_profile_data flex">
              <div className="flex">
                {" "}
                <h2>{HospitalData?.name}</h2>{" "}
              </div>

              <h4
                className="highlight_data"
                style={{ background: "#3A65FD", color: "white" }}
              >
                {HospitalData?.type}
              </h4>
              <StarRating rating={HospitalData?.rating} />
              <div className="flex"></div>
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

        <div className="photosdivadmin">
          <h3 style={{ marginBottom: "1.3vw" }}>Photos</h3>
          <div className="photosdivadminsection flex">
            <img src={HospitalData?.image2 || TemPImg} alt="" />
            <img src={HospitalData?.image3 || TemPImg2} alt="" />
            <img src={HospitalData?.image4 || TemPImg3} alt="" />
          </div>
        </div>

        <div className="mainadmindoctoraboutavail flex">
          <div className="mainadmindoctorabout ">
            <h3 style={{ marginBottom: "1.3vw" }}>About</h3>
            <h4 style={{ marginBottom: "1.3vw" }}>{HospitalData?.about}</h4>
            <h3 style={{ marginBottom: "1.3vw" }}>{HospitalData?.address}</h3>
            <div className="flex adimindoctorpin">
              <h4 style={{ background: "#3A65FD", color: "white" }}>
                {`${HospitalData?.pincode}`}
              </h4>
            </div>
          </div>

          <div className="mainadmindoctoravilability mainadmindoctoravilability2">
            <div className="admin_fea_avai flex">
              <div className="admin_fea_avai_left">
                <h3 style={{ marginBottom: "1.3vw" }}>Features</h3>
                {HospitalData?.feature?.map((ele) => (
                  <>
                    <h4 style={{ marginBottom: "1.3vw" }}>
                      <i class="ri-arrow-right-circle-fill"></i>
                      {ele}
                    </h4>
                  </>
                ))}
              </div>

              <div className="admin_fea_avai_right">
                <h3 style={{ marginBottom: "1.3vw" }}>Specialities</h3>
                {HospitalData?.speciality?.map((ele) => (
                  <>
                    <h4 style={{ marginBottom: "1.3vw" }}>
                      <i class="ri-arrow-right-circle-fill"></i>
                      {ele}
                    </h4>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="Featured-partner" style={{ marginBottom: "60px" }}>
          <div className="second-main-head">
            <h1>
              Our <span className="color-blue">Doctors</span>
            </h1>
          </div>

          <div className="hospital-doctor-list">
            {doctorsList?.length > 0 &&
              doctorsList?.map((ele) => (
                <div
                  key={ele.doctorId.id}
                  className="featured-doctor-card flex"
                >
                  <div className="featured-doctor-card-photo">
                    <img
                      src={ele?.doctorId?.image || "images/dr (4).jpg"}
                      alt=""
                    />
                  </div>

                  <div className="featured-doctor-card-datas flex">
                    <h2>{ele?.doctorId?.name}</h2>
                    <h4 style={{ color: "#3A65FD" }}>
                      {ele?.doctorId?.specialization}
                    </h4>
                  </div>

                  <div className="featured-doctor-card-button">
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate("/doctorprofile", { state: ele.doctorId })
                      }
                    >
                      <h4>View Profile</h4>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

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
              <div className="doc_profileSecFeedBackStart">
                <div className="doc_profileSecFeedBItem">
                  <Fragment key={index}>
                    <div className="doc_profileSecFeedBItemImgSec">
                      <img src="./images/TempDocImg.jpg" alt="" />
                    </div>
                    <div className="doc_profileSecFeedBItemImgSec">
                      <div className="doc_profileSecFeedBItemImgSecFlex">
                        <StarRating rating={feedbacks?.averageRating} />
                      </div>
                      <p> {moment(ele?.created_date).format("DD/MM/YYYY")}</p>
                      <p>{ele?.message}</p>
                      <div className="doc_profileSecFeedBIFlexName">
                        <i class="ri-checkbox-circle-line"></i>
                        <h4>{ele?.userid?.name}</h4>
                      </div>
                    </div>
                  </Fragment>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
      <UserProfileCompleteModal
        open={isShowCompleteUsrProfileModal}
        onClose={setIsShowCompleteUsrProfileModal}
      />
    </>
  );
};

export default HospitalDetailed;
