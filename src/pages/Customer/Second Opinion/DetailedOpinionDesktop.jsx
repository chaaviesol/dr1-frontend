import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { BASE_URL } from "../../../config";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { Loader } from "../../../components/Loader/Loader";
import moment from "moment";
import Headroom from "react-headroom";
import Navbar from "../../../components/Navbar";

function DetailedOpinionDesktop({
  isApiLoading,
  handleDownload,
  secondOpinionData,
}) {
  const navigate = useNavigate();

  return (
    <>
      <Headroom>
        <Navbar />
      </Headroom>
      <div style={{ padding: "3rem" }}>
        {isApiLoading && <Loader />}
        <div className="adpha-topcontainer">
          <div className="adpha-left">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="adpha-back-button"
            >
              <i className="ri-arrow-left-line"></i>
            </button>
            <span className="adpha-title">Second Opinion Details</span>
          </div>
        </div>
        <div className="adpha-seccontainer flex">
          <div className="adpha-seccontainer-datas">
            <h4>Patient Name</h4>
            <h2>{secondOpinionData?.patient_name}</h2>
          </div>

          <div className="adpha-seccontainer-datas">
            <h4>Doctor Name</h4>
            <h2>Dr. {secondOpinionData?.doctor_name}</h2>
          </div>

          <div className="adpha-seccontainer-datas">
            <h4>Date</h4>
            <h2>
              {moment.utc(secondOpinionData?.created_date).format("DD/MM/YY")}
            </h2>
          </div>

          <div className="adpha-seccontainer-datas">
            <h4>Phone Number</h4>
            <h2>{secondOpinionData?.alternative_number}</h2>
          </div>

          <div className="adpha-seccontainer-datas">
            <h4>Status</h4>
            <h2>{secondOpinionData?.status}</h2>
          </div>
        </div>

        {secondOpinionData?.remarks && (
          <div className="adpha-remarks">
            <h4 style={{ fontWeight: "600" }}>Remarks</h4>

            <h4
              style={{ marginTop: "10px" }}
              className="adpha-remarks-para priscriptionpara"
            >
              {secondOpinionData?.remarks}
            </h4>
          </div>
        )}
        <div className="adpha-thirdcontainer">
          <h4>Report</h4>

          <div
            className="adpha-thirdcontainer-images flex"
            style={{ overflow: "scroll" }}
          >
            {secondOpinionData?.report_image &&
              Object.values(secondOpinionData.report_image).map(
                (imageSrc, imgIndex) => (
                  <img key={imgIndex} src={imageSrc} alt="" />
                )
              )}
          </div>
          {secondOpinionData?.report_image && (
            <button
              className="adpha-thirdcontainer-button"
              onClick={handleDownload}
              style={{ marginTop: "2rem" }}
            >
              Download
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default DetailedOpinionDesktop;
