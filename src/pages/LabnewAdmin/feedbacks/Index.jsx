import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { port } from "../../../config";
import moment from "moment";
import { Loader } from "../../../components/Loader/Loader";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Feedback from "../../../components/Feedback/Feedback";

function Index({ labId }) {
  const [feedbacks, setFeedbacks] = useState({
    averageRating: "",
    feedbacks: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchDoctorFeedbacks();
  }, []);
  const axiosPrivate = useAxiosPrivate();
  const fetchDoctorFeedbacks = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${port}/lab/getalabfeedback`, {
        lab_id: labId,
      });
      console.log({ response });
      setFeedbacks({
        averageRating: response.data.averageRating,
        feedbacks: response.data.data,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

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
      <div className="doc_profileSecFeedBack" style={{ marginTop: "20px" }}>
        {isLoading && (
          <>
            <Loader />
          </>
        )}
        {feedbacks &&
          feedbacks.feedbacks &&
          feedbacks.feedbacks.map((ele, index) => (
            <Feedback feedbackData={ele} key={ele.id} />
          ))}
      </div>
    </>
  );
}

export default Index;
