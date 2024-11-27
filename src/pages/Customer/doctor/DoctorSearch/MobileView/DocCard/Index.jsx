import React from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

export default function DocCard({ data }) {
  const details = data?.details;
  const navigate = useNavigate();
  const tempImg = "./images/TempDocImg.webp";

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
    <>
      <div
        className={styles.cardContainer}
        onClick={() => navigate("/mobiledoctorprofile", { state: details })}
      >
        <div>
          <img
            className={styles.docImage}
            src={details?.image || tempImg}
            alt=""
          />
        </div>
        <div>
          <div>
            <span style={{ fontWeight: 400, fontSize: 18 }}>
              {details?.name}
            </span>
          </div>
          <div style={{ fontWeight: 300, fontSize: 16 }}>
            {" "}
            <StarRating rating={details?.rating} />
          </div>
          <div>
            {" "}
            <span
              style={{
                fontWeight: 300,
                fontSize: 16,
                color: "#3A65FD",
                textTransform: "capitalize",
              }}
            >
              {details?.specialization}
            </span>
          </div>
          <div style={{ fontWeight: 300, fontSize: 16 }}>
            {new Date().getFullYear() -
              (details?.experience || new Date().getFullYear())}
            <span style={{ fontWeight: 300, fontSize: 16, paddingLeft: 4 }}>
              Year Experience
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
