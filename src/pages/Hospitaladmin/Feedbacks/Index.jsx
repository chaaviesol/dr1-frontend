import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { port } from "../../../config";
import moment from "moment";
import { Loader } from "../../../components/Loader/Loader";
import Feedback from "../../../components/Feedback/Feedback";

function Index({ hospitalId }) {
  const [feedbacks, setFeedbacks] = useState({
    averageRating: "",
    feedbacks: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchHospitalFeedbacks();
  }, []);
  const fetchHospitalFeedbacks = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${port}/hospital/getahospitalfeedback`, {
        hospital_id: hospitalId,
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



  return (
    <>
      <div className="doc_profileSecFeedBack">
        {isLoading && (
          <>
            <Loader />
          </>
        )}
        {feedbacks &&
          feedbacks.feedbacks &&
          feedbacks.feedbacks.map((ele, index) => (

            <Feedback key={ele.id} feedbackData={ele}/>
          ))}
      </div>
    </>
  );
}

export default Index;
