import React from "react";
import styles from "../../doctor/DoctorSearch/DesktopView/searchdoc.module.css";
import { useNavigate } from "react-router-dom";
export const HospitalCard = ({ data, screen }) => {
  const navigate = useNavigate();
  const details = data?.details;
  const TemPImg = "./images/TempHosImg.jpg";
  return (
    <>
      <div
        onClick={() => navigate(screen, { state: { details: details } })}
        className={styles.cardContainer}
      >
        <div>
          <img
            className={styles.docImage}
            src={details.photo?.image1 || TemPImg}
            alt=""
          />
        </div>
        <div className="labCardDiv">
          <div>
            <span className="LabCardSpanHeader">{details?.name}</span>
          </div>

          <div className="LabCardSpan">
            Address : {details?.address?.address || details?.address}
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};
