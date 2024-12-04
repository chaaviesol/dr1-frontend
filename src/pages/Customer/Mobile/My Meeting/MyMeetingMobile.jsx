import React from "react";
import styles from "./mymeetingmobilestyles.module.css";

function MyMeetingMobile() {
  const StarRating = ({ rating }) => {
    const maxRating = 5;
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        i <= rating ? (
          <i
            className="ri-star-fill"
            style={{ marginRight: "5px", fontSize: "16px", color: "#FF8D4F" }}
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
    <div className="mobcontainer">
      <div
        className={styles.container}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <span className={styles.heading}>My Meeting</span>

        <div className={styles.appointmentInfo}>
          <img
            className={styles.personimg}
            src="/images/newavatar.jpg"
            alt=""
          />
          <div className={styles.personinfo}>
            <div className={styles.name}>Darrel</div>
            <div className={styles.name}>Orthopedist</div>
            <div className="doctorprofilestar flex">
              <StarRating rating={5} />
            </div>
          </div>
        </div>

        <div className={styles.timebox}>
          <div className={styles.time}>
            <span>10.00 am</span>
            <span>July 12 2024</span>
          </div>
          <div className={styles.buttons}>
            <button>Reschedule</button>
          </div>
        </div>

        <div className={styles.texts}>
          A doctor is a medical professional who diagnoses, treats, and prevents
          illnesses and injuries. They work in various settings like hospitals,
          clinics, and private practices.
          A doctor is a medical professional who diagnoses, treats, and prevents
          illnesses and injuries. They work in various settings like hospitals,
          clinics, and private practices.
          A doctor is a medical professional who diagnoses, treats, and prevents
          illnesses and injuries. They work in various settings like hospitals,
          clinics, and private practices.
          A doctor is a medical professional who diagnoses, treats, and prevents
          illnesses and injuries. They work in various settings like hospitals,
          clinics, and private practices.
          A doctor is a medical professional who diagnoses, treats, and prevents
          illnesses and injuries. They work in various settings like hospitals,
          clinics, and private practices.
        </div>

        <div className={styles.bottombuttons}>
          <div className={styles.joinbtn}>Join Now</div>
          <div className={styles.cancelbtn}>Cancel Meeting</div>
        </div>
      </div>
    </div>
  );
}

export default MyMeetingMobile;
