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

function DetailedOpinion() {
  const location = useLocation();
  const id = location?.state?.id;
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { userId, userType } = auth;
  const navigate = useNavigate();

  const fetchSecondOpinionDetails = async (id) => {
    const response = await axiosPrivate.post(
      `${BASE_URL}/secondop/getareport`,
      {
        id: id,
      }
    );
    return response.data.data;
  };

  const { data: secondOpinionData, isLoading } = useQuery({
    queryKey: ["fetchSecondOpinionDetails", userId, id],
    queryFn: () => fetchSecondOpinionDetails(id),
    enabled: !!userId && userType === "customer" && !!id,
  });

  const handleDownload = () => {
    if (secondOpinionData?.report_image) {
      Object.values(secondOpinionData.report_image).forEach(
        (imageSrc, imgIndex) => {
          setTimeout(() => {
            const link = document.createElement("a");
            link.href = imageSrc;

            // Dynamically get the file extension from the URL (if available)
            const fileExtension =
              imageSrc.split(".").pop().split(/\#|\?/)[0] || "jpg";
            link.download = `report_image${imgIndex + 1}.${fileExtension}`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }, imgIndex * 500); // Delay increases with each image (500ms)
        }
      );
    } else {
      console.error("No prescription images available.");
    }
  };
  return (
    <>
      <Headroom>
        <Navbar />
      </Headroom>
      <div style={{ padding: "3rem" }}>
        {isLoading && <Loader />}
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
              {moment(secondOpinionData?.created_date).format("DD/MM/YY")}
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

          <div className="adpha-thirdcontainer-images flex" style={{overflow:"scroll"}}>
            {secondOpinionData?.report_image &&
              Object.values(secondOpinionData.report_image).map(
                (imageSrc, imgIndex) => (
                  <img key={imgIndex} src={imageSrc} alt="" />
                )
              )}
          </div>

          <button
            className="adpha-thirdcontainer-button"
            onClick={handleDownload}
            style={{ marginTop: "2rem" }}
          >
            Download
          </button>
        </div>
   
      </div>
    </>
  );
}

export default DetailedOpinion;
