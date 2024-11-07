import React from "react";
import "./styles.css";
import moment from "moment";

function Feedback({ feedbackData }) {
  console.log(feedbackData);
  const StarRating = () => {
    const maxRating = 5;
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        i <= feedbackData.rating ? (
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
    <div className="feedbackcardnew flex">
      <img src={feedbackData?.userid?.image || "/images/man.jpg"} alt="" />
      <div className="feedbackcardnewright">
        <h3>{feedbackData?.userid?.name}</h3>
        <h4>{moment(feedbackData?.created_date).format("DD/MM/YYYY")}</h4>
        <StarRating />
        <p>{feedbackData?.message}</p>
      </div>
    </div>
  );
}

export default Feedback;
