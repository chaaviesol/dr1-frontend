import React from "react";
import "./LabCard.css";
import styles from "../../../Customer/doctor/DoctorSearch/DesktopView/searchdoc.module.css";
import { useNavigate } from "react-router-dom";
export const LabCard = ({ data,screen }) => {
  const navigate = useNavigate();
  const details = data?.details;
  const TemPImg = "./images/TempLabImg.jpg";
  return (
    <div
      onClick={() => navigate(screen, { state: { data: details } })}
      className={styles.cardContainer}
    >
      <div>
        <img
          className={styles.docImage}
          src={details.photo?.image1 || TemPImg}
          alt=""
        />
      </div>
      <div>
        <div>
          <span className="LabCardSpanHeader">{details?.name}</span>
        </div>
        <div>
          {" "}
          <span className="LabCardSpan">
            Timing : {details?.timing?.opening_time} to{" "}
            {details?.timing?.closing_time}
          </span>
        </div>
        <div> </div>
        {/* <div style={{ fontWeight: 300, fontSize: 18 }}>
                    {new Date().getFullYear() - (details?.experience || new Date().getFullYear())}
                    <span style={{ fontWeight: 300, fontSize: 18, paddingLeft: 4 }}>
                        Year Experience
                    </span>
                </div> */}
      </div>
    </div>
  );
};
