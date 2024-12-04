import React from "react";
import styles from "./myappointmentsmobilestyles.module.css";

function MyAppointmentsMobile() {
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
        <span className={styles.heading}>My Appointments</span>
        <div className={styles.upcoming}>
          <span>Upcoming</span>
          <div className={styles.singleappointment}>
            <div className={styles.appointmentInfo}>
              <img
                className={styles.personimg}
                src="/images/newavatar.jpg"
                alt=""
              />
              <div className={styles.personinfo}>
                <div className={styles.name}>Darrel</div>
                <div className={styles.name}>Orthopedist</div>
                <div className={styles.name}>July 2024 - 10.00 am</div>
              </div>
            </div>
            <div className={styles.buttons}>
              <button>Cancel</button>
              <button>Reschedule</button>
            </div>
          </div>
        </div>

        <div className={styles.completed}>
          <span>Completed</span>
          <div className={styles.singleappointment}>
            <div className={styles.appointmentInfo}>
              <img
                className={styles.personimg}
                src="/images/newavatar.jpg"
                alt=""
              />
              <div className={styles.personinfo}>
                <div className={styles.name}>Darrel</div>
                <div className={styles.name}>Orthopedist</div>
                <div className={styles.name}>July 2024 - 10.00 am</div>
              </div>
            </div>
            <div className={styles.buttonscompleted}>
              <button>Add feedback</button>
              <button>Book again</button>
            </div>
          </div>
        </div>

        <div className={styles.old}>
          {[1, 2, 3].map((dta, index) => (
            <div className={styles.appointmentInfo}>
              <img
                className={styles.personimg}
                src="/images/newavatar.jpg"
                alt=""
              />
              <div key={index} className={styles.personinfo}>
                <div className={styles.name}>Darrel</div>
                <div className={styles.name}>Orthopedist</div>
                <div className="doctorprofilestar flex">
                  <StarRating rating={5} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyAppointmentsMobile;
