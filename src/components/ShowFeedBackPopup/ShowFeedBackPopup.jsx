import { Modal } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PopupContext } from "./ShowFeedBackPopupContext";
import { port } from "../../config";
import "./ShowFeedBackPopup.css";
import { useAuth } from "../../contexts/Auth/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Loader } from "../../components/Loader/Loader";
export const ShowFeedBackPopup = () => {
  const { isPopupVisible, hidePopup, ContactData } = useContext(PopupContext);
  const [ConstantData, setConstantData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [FinalData, setFinalData] = useState({
    rating: 0,
    message: "",
    status: "",
  });
  const { auth } = useAuth();
  const axiosPrivate=useAxiosPrivate()
  const gettingValues = (e) => {
    const { value, name } = e.target;
    setFinalData((prevData) => ({ ...prevData, [name]: value }));
  };
  const addRating = (rating) => {
    if (FinalData?.rating < rating) {
      setFinalData({ ...FinalData, rating: rating });
    } else {
      setFinalData({ ...FinalData, rating: rating - 1 });
    }
  };
  const getFeedback = (e) => {
    const { value, name } = e.target;
    setFinalData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitData = () => {
    setLoader(true)
    if (ConstantData?.type === "Doctor") {
      const sentData = {
        ...FinalData,
        user_id: auth.userId,
        doctor_id: ConstantData?.doctor_id,
        interactedid: ConstantData?.lastInteractionId,
      };
      const checkFields = !sentData.rating || !sentData?.message;
      // console.log("sentData>>>>", sentData);
      if (!checkFields) {
        axiosPrivate.post(`${port}/doctor/doctor_feedback`, sentData).then((res) => {
          // console.log(res);
          if (res?.data) {
            setLoader(false)
            toast.success(res?.data?.message);
            setFinalData((prevData) => ({ ...prevData, status: "success" }));
          }
        });
      } else {
        if (!sentData.rating) {
          toast.info("Please provide a rating.");
        } else {
          toast.info("Please provide a feedback.");
        }
      }
    } else if (ConstantData.type === "Hospital") {
      const sentData = {
        ...FinalData,
        user_id: auth.userId,
        hospital_id: ConstantData?.hospital_id,
        interactedid: ConstantData?.lastInteractionId,
      };
      const checkFields = !sentData.rating || !sentData?.message;
      // console.log("sentData>>>>", sentData);
      if (!checkFields) {
        axiosPrivate
          .post(`${port}/hospital/hospital_feedback`, sentData)
          .then((res) => {
            // console.log(res);
            if (res?.data) {
              toast.success(res?.data?.message);
              setFinalData((prevData) => ({ ...prevData, status: "success" }));
            }
          });
      } else {
        if (!sentData.rating) {
          toast.info("Please provide a rating.");
        } else {
          toast.info("Please provide a feedback.");
        }
      }
    } else if (ConstantData?.type === "Lab") {
      const sentData = {
        ...FinalData,
        user_id: auth.userId,
        lab_id: ConstantData?.lab_id,
        interactedid: ConstantData?.lastInteractionId,
      };
      const checkFields = !sentData.rating || !sentData?.message;
      // console.log("sentData>>>>", sentData);
      if (!checkFields) {
        axiosPrivate.post(`${port}/lab/lab_feedback`, sentData).then((res) => {
          // console.log(res);
          if (res?.data) {
            toast.success(res?.data?.message);
            setFinalData((prevData) => ({ ...prevData, status: "success" }));
          }
        });
      } else {
        if (!sentData.rating) {
          toast.info("Please provide a rating.");
        } else {
          toast.info("Please provide a feedback.");
        }
      }
    }
  };

  const closePopup = () => {
    hidePopup();
  };

  useEffect(() => {
    if (
      FinalData.status === "N" ||
      FinalData.status === "L" ||
      FinalData.status === "NR"
    ) {
      hidePopup();
    }
  }, [FinalData, hidePopup]);

  useEffect(() => {
    if (Array.isArray(ContactData) && ContactData.length > 0) {
      setConstantData(ContactData[0]);
    } else {
      setConstantData(null);
    }
  }, [ContactData]);

  const updateStatus = (e) => {
    const value = e?.target?.value;
    // console.log("value>>>>", value);
    const sentData = {
      status: value,
      user_id: auth.userId,
      type: ConstantData?.type,
      interactedid: ConstantData?.lastInteractionId,
    };
    // console.log("sentData>>>>", sentData);
    if (sentData?.status) {
        axiosPrivate
        .post(`${port}/user/afterconsultupdate`, sentData)
        .then((res) => {
          // console.log(res);
          if (res?.data) {
            if (sentData?.status !== "L") {
              toast.success(res?.data?.message);
            }
            closePopup();
            // setFinalData(prevData => ({ ...prevData, status: "success" }));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // console.log("ContactData>>>", ContactData);
  return (
    <>
    {loader ? <Loader /> : ""}
      <Modal
        open={isPopupVisible}
        aria-labelledby="feedback-popup"
        aria-describedby="feedback-popup-description"
        className="ShowFeedBackPopup"
      >
        <div className="ShowFeedBackPopupIn">
          {FinalData.status === "Y" ? (
            <>
              <div className="ShowFeedBackPopupReviewMainText">
                <p>Leave a review</p>
              </div>
              <div className="ShowFeedBackPopupReview">
                <img src="./images/TempDocImg.webp" alt="" />
                <div className="ShowFeedBackPopupRevieName">
                  <h5>
                    {ConstantData?.doctor_name ||
                      ConstantData?.hospital_name ||
                      ConstantData?.lab_name}
                  </h5>
                  <p>How would you rate your experience</p>
                </div>
              </div>
              <div className="ShowFeedBackPopupReviewMainTextRating">
                <p>Rating</p>
                <div className="ShowFeedBackPopupReviewMainText">
                  <div className="ShowFeedBackPopupRatingIcons">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <i
                        key={num}
                        style={{
                          color:
                            FinalData.rating >= num ? "#FA8D0D" : undefined,
                        }}
                        onClick={() => addRating(num)}
                        className="ri-star-fill"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="ShowFeedBackPopupReviewMainTextRating">
                <p>Review</p>
                <div className="ShowFeedBackPopupReviewMainText">
                  <div className="ShowFeedBackPopupRatingIcons">
                    <textarea
                      value={FinalData?.message}
                      name="message"
                      onChange={getFeedback}
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="ShowFeedBackPopupReviewMainTextRating">
                <button onClick={submitData}>Submit</button>
              </div>
            </>
          ) : FinalData.status === "success" ? (
            <>
              <div className="ShowFeedBackPopupReviewMainText">
                <img src="./images/thankyouImage.jpg" alt="" />
              </div>
              <div className="ShowFeedBackPopupReviewMainText">
                <p>Your review is under verification</p>
              </div>
              <div className="ShowFeedBackPopupReviewMainTextRating">
                <button onClick={closePopup}>Close</button>
              </div>
            </>
          ) : (
            <>
              <div className="ShowFeedBackPopupInImg">
                <img src="./images/TempDocImg.webp" alt="" />
              </div>
              <div className="ShowFeedBackPopupText">
                <p>
                  {ConstantData?.type === "Doctor"
                    ? ` Have you consulted ${ConstantData?.doctor_name} ?`
                    : ConstantData?.type === "Hospital"
                    ? ` Have you visited ${ConstantData?.hospital_name} ?`
                    : `Have you visited ${ConstantData?.lab_name} ?`}
                </p>
                <p>Are you happy to share a review?</p>
              </div>
              <div className="ShowFeedBackPopupInButtinsGap">
                <div className="ShowFeedBackPopupText">
                  <button onClick={gettingValues} name="status" value={"Y"}>
                    Yes, Sure
                  </button>
                </div>
                <div className="ShowFeedBackPopupButtons">
                  <button
                    onClick={(e) => {
                      updateStatus(e);
                    }}
                    name="status"
                    value={"NR"}
                    className="ShowFeedBackPopupButton1"
                  >
                    Not Responding
                  </button>
                  <button
                    onClick={(e) => {
                      updateStatus(e);
                    }}
                    name="status"
                    value={"N"}
                    className="ShowFeedBackPopupButton2"
                  >
                    Not Consulted
                  </button>
                </div>
                <div className="ShowFeedBackPopupTextLater">
                  <button
                    onClick={(e) => {
                      updateStatus(e);
                    }}
                    name="status"
                    value={"L"}
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};
