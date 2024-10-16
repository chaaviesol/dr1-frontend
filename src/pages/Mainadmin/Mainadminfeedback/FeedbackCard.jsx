import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../config";
import moment from "moment";
import { CircularProgress } from "@mui/material";

function FeedbackCard({ refetchFeedbacks, ele }) {
  const [isLoadingReject, setIsLoadingReject] = useState(false);
  const [isLoadingAccept, setIsLoadingAccept] = useState(false);
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

  const sendStatusUpdate = async (id, status, type) => {
    console.log({ id, status, type });

    const response = await axios.post(`${BASE_URL}/admin/feedbackapproval`, {
      id,
      status,
      type,
    });
    return response.data;
  };
  const statusUpdateMutation = useMutation({
    mutationFn: ({ id, status, type }) => sendStatusUpdate(id, status, type),
    mutationKey: ["sendStatusUpdate"],
    onSuccess: (data) => {
      console.log("success", data);
      toast.success(data.message);
      refetchFeedbacks();
    },
    onError: (error) => {
      console.error("Error", error); // Error handling
    },
  });

  const handleReject = async (id, status, type) => {
    setIsLoadingReject(true);
    try {
      await statusUpdateMutation.mutateAsync({
        id,
        status,
        type,
      });
    } finally {
      setIsLoadingReject(false);
    }
  };

  const handleAccept = async (id, status, type) => {
    setIsLoadingAccept(true);
    try {
      await statusUpdateMutation.mutateAsync({
        id,
        status,
        type,
      });
    } finally {
      setIsLoadingAccept(false);
    }
  };

  return (
    <div key={ele.id} className="feedbacksectioncard">
      <div className="feedbacksectioncardtop flex">
        <img src="/images/doc.jpg" alt="" />
        <div style={{ marginLeft: "10px" }}>
          <h3>{ele?.username}</h3>
          <h4>{moment(ele?.created_date).format("DD/MM/YYYY")}</h4>
        </div>
      </div>

      <div className="feedbacksectioncardrewiew">
        <div className="feedbacksectioncardrewiewstar flex">
          <StarRating rating={ele?.rating} />
        </div>
        <div className="feedbacksectioncardrewiewpara">
          <div className="feedbacksectioncardrewiewpara2">
            <h4>{ele?.message}</h4>
          </div>
        </div>
      </div>

      <div className="feedbacksectioncardbutton flex">
        <div className="photoandtitle flex">
          <img src="/images/doc.jpg" alt="" />
          <h3 style={{ marginLeft: "10px" }}>{ele?.typename}</h3>
        </div>

        <div className="photoandtitle admin-feedback-buttons-container  flex">
          <button
            disabled={isLoadingReject || isLoadingAccept}
            type="button"
            onClick={() => handleReject(ele.id, "rejected", ele.type)}
          >
            {isLoadingReject ? (
              <CircularProgress size="1rem" sx={{ color: "white" }} />
            ) : (
              "Reject"
            )}
          </button>
          <button
            type="button"
            disabled={isLoadingAccept || isLoadingReject}
            onClick={() => handleAccept(ele.id, "accepted", ele.type)}
          >
            {isLoadingAccept ? (
              <CircularProgress size="1rem" sx={{ color: "white" }} />
            ) : (
              "Approve"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedbackCard;
