import React, { useState } from "react";
import "./styles.css";
import axios from "axios";
import { BASE_URL } from "../../../config";
import moment from "moment/moment";
import { toast } from "react-toastify";
// import {  useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
function Prescriptions({ Details, setChangeDashboards }) {
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  console.log(Details);
  // const navigate = useNavigate();

  const handleDownload = () => {
    if (Details?.prescription_image) {
      Object.values(Details.prescription_image).forEach((imageSrc, imgIndex) => {
        setTimeout(() => {
          const link = document.createElement("a");
          link.href = imageSrc;
  
          // Dynamically get the file extension from the URL (if available)
          const fileExtension = imageSrc.split('.').pop().split(/\#|\?/)[0] || 'jpg';
          link.download = `Prescription_Image_${imgIndex + 1}.${fileExtension}`;
  
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, imgIndex * 500); // Delay increases with each image (500ms)
      });
    } else {
      console.error("No prescription images available.");
    }
  };
  

  const updatebutton = (status) => {
    setIsLoading(true);
    const fetchData = async () => {
      const data = {
        sales_id: Details?.sales_id,
        status: status,
      };
      try {
        const response = await axios.post(
          `${BASE_URL}/pharmacy/updatesalesorder`,
          data
        );
        console.log("updaaaaaaaaaaaaaaaaaaaaaaaaa", response);
        if (response.status === 200) {
          toast.success(response?.data?.message);
          setIsLoading(false);
          setChangeDashboards({ prescriptions: true });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  };
  return (
    <div
      style={{
        position: "relative",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      {/* Get Prescription */}

      <div class="adpha-topcontainer">
        <div class="adpha-left">
          <button
            onClick={() => {
              setChangeDashboards({ prescriptions: true });
            }}
            class="adpha-back-button"
          >
            <i class="ri-arrow-left-line"></i>
          </button>
          <span class="adpha-title">Prescription Details</span>
        </div>
      </div>
      <div class="adpha-seccontainer flex">
        <div className="adpha-seccontainer-datas">
          <h4>Patient Name</h4>
          <h2>{Details?.patient_name}</h2>
        </div>

        <div className="adpha-seccontainer-datas">
          <h4>Date</h4>
          <h2>{moment(Details?.created_date).format("DD/MM/YY")}</h2>
        </div>

        <div className="adpha-seccontainer-datas">
          <h4>Phone Number</h4>
          <h2>{Details?.contact_no}</h2>
        </div>

        <div className="adpha-seccontainer-datas">
          <h4>Status</h4>
          <h2>{Details?.so_status}</h2>
        </div>
      </div>

      <div class="adpha-thirdcontainer">
        <h4>Prescription</h4>

        <div className="adpha-thirdcontainer-images flex">
          {Object.values(Details.prescription_image).map(
            (imageSrc, imgIndex) => (
              <img key={imgIndex} src={imageSrc} alt={""} />
            )
          )}
        </div>

        <button
          style={{ marginTop: "1rem" }}
          className="adpha-thirdcontainer-button"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>

      <div class="adpha-remarks">
        <h4 style={{ fontWeight: "600" }}>Remarks</h4>

        <h4
          style={{ marginTop: "10px" }}
          className="adpha-remarks-para priscriptionpara"
        >
          {Details?.remarks}
        </h4>
      </div>

      <div class="adpha-remarks">
        <h4 style={{ fontWeight: "600" }}>Delivery Address</h4>

        <h4
          style={{ marginTop: "10px" }}
          className="adpha-remarks-para priscriptionpara"
        >
          {Details?.delivery_address},{Details?.pincode}
        </h4>
      </div>

      <div
        class="adpha-right flex"
        style={{
          marginTop: "2rem",
          position: "sticky",
          top: "0px",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* <h5>Update status</h5> */}
        <button
          style={{ width: "12rem" }}
          onClick={() => {
            const status =
              Details?.so_status === "Placed"
                ? "Out for delivery"
                : Details?.so_status === "Out for delivery"
                ? "Delivered"
                : "Out for delivery";

            updatebutton(status);
          }}
          class="adpha-save-button"
          disabled={Details?.so_status === "Delivered"}
        >
          {isLoading ? (
            <CircularProgress size="1.5rem" />
          ) : Details?.so_status === "Placed" ? (
            "Out for delivery"
          ) : Details?.so_status === "Out for delivery" ? (
            "Delivered"
          ) : (
            "Completed"
          )}
        </button>
      </div>
    </div>
  );
}

export default Prescriptions;
