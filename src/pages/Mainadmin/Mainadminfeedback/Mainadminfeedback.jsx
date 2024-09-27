import axios from "axios";
import React, { useState } from "react";
import { port } from "../../../config";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { toast } from "react-toastify";

export default function Mainadminfeedback() {
  const fetchFeedbacks = async () => {
    const response = await axios.get(`${port}/admin/alltypefeedback`);
    return response.data.data;
  };
  const { data: allFeedbacks } = useQuery({
    queryKey: ["fetchFeedbacks"],
    queryFn: fetchFeedbacks,
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

  console.log({ allFeedbacks });
  const sendStatusUpdate = async (id, status, type) => {
    console.log({ id, status, type });
    try {
      const response = await axios.post(`${port}/admin/feedbackapproval`, {
        id,
        status,
        type,
      });
      if (response.status === 200) {
        toast.success(response?.data?.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(response?.data?.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div style={{ marginTop: "1.3vw" }} className="flex admin_view_more">
        <h3>Feedbacks</h3>
        <h4>
          Filter
          <i style={{ marginLeft: "0.5vw" }} class="ri-equalizer-3-line"></i>
        </h4>
      </div>

      <div className="feedbacksection flex">
        {allFeedbacks?.length > 0 &&
          allFeedbacks.map((ele) => (
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
                    type="button"
                    onClick={() =>
                      sendStatusUpdate(ele.id, "rejected", ele.type)
                    }
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      sendStatusUpdate(ele.id, "accepted", ele.type)
                    }
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
