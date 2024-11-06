import React from "react";
import styles from "./styles.module.css";
import BackButtonWithTitle from "../../../../components/BackButtonWithTitle";
import { Loader } from "../../../../components/Loader/Loader";

function SecondOpinionMobileDetailed({
  isApiLoading,
  handleDownload,
  secondOpinionData,
}) {
  return (
    <>
      <div className="mobilescreen-container">
        <BackButtonWithTitle title="Second opinion details" />
      </div>
      <div className={styles.divider}></div>
      <div className="mobilescreen-container">
        {isApiLoading && <Loader />}
        <div className={styles.top}>
          <div>
            <span>Name:</span>
            <span>{secondOpinionData?.patient_name}</span>
          </div>
          <div>
            <span>Doctor Name</span>
            <span>Dr. {secondOpinionData?.doctor_name}</span>
          </div>
          <div>
            <span>Contact Number:</span>
            <span>{secondOpinionData?.alternative_number}</span>
          </div>
        </div>
        <div className={styles.reportimagesection}>
          <span>Reports</span>
          <div className={styles.images}>
            {secondOpinionData?.report_image &&
              Object.values(secondOpinionData.report_image).map(
                (imageSrc, imgIndex) => (
                  <img key={imgIndex} src={imageSrc} alt="" />
                )
              )}
          </div>
        </div>
        <div className={styles.download}>
          <button disabled={isApiLoading} onClick={handleDownload}>
            Download all
          </button>
        </div>
        {secondOpinionData?.remarks && (
          <div className={styles.remarks}>
            <span className={styles.heading}>Remarks</span>
            <br />
            <span className={styles.remarkdata}>
              {secondOpinionData?.remarks}
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default SecondOpinionMobileDetailed;
