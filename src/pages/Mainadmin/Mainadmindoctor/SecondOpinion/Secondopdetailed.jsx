import React, { useEffect, useState } from "react";
import "../../OrderAndPrescription/styles.css";
import axios from "axios";
import { BASE_URL } from "../../../../config";
import moment from "moment/moment";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../../../../components/Loader/Loader";

export default function Secondopdetailed({ Details,setChangeDashboards }) {
  const [datastate, Setdatastate] = useState(Details);
  const [isLoading, setIsLoading] = useState(false);

  console.log({ datastate });
  const navigate = useNavigate();

  const handleDownload = (imageSrc) => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = imageSrc.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    Setdatastate((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  const updatebutton = (status) => {
    if (!datastate.doctor_remarks || datastate.doctor_remarks === "") {
      return toast.error("Doctor's remarks are required to proceed.");
    }

    const fetchData = async () => {
      setIsLoading(true);
      const data = {
        id: datastate?.id,
        status: status,
        doctor_remarks: datastate?.doctor_remarks,
      };
      try {
        const response = await axios.post(
          `${BASE_URL}/secondop/statusupdate`,
          data
        );
        console.log("updaaaaaaaaaaaaaaaaaaaaaaaaa", response);
        if (response.status === 200) {
          toast.success(response?.data?.message);
          setIsLoading(false);
        } else {
          toast.error("error");
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
    <>
      {/* Get Prescription */}
      {isLoading && <Loader />}
      <div class="adpha-topcontainer">
        <div class="adpha-left">
          <button onClick={()=>{setChangeDashboards({secondopinion:true})}} class="adpha-back-button">
            <i class="ri-arrow-left-line"></i>
          </button>
          <span class="adpha-title">Second Opinion Details</span>
        </div>
      </div>
      <div class="adpha-seccontainer flex">
        <div className="adpha-seccontainer-datas">
          <h4>Patient Name</h4>
          <h2>{datastate?.patient_name}</h2>
        </div>

        <div className="adpha-seccontainer-datas">
          <h4>Doctor Name</h4>
          <h2>Dr. {datastate?.doctor_name}</h2>
        </div>

        <div className="adpha-seccontainer-datas">
          <h4>Date</h4>
          <h2>{moment(datastate?.created_date).format("DD/MM/YY")}</h2>
        </div>

        <div className="adpha-seccontainer-datas">
          <h4>Phone Number</h4>
          <h2>{datastate?.alternative_number}</h2>
        </div>

        <div className="adpha-seccontainer-datas">
          <h4>Status</h4>
          <h2>{datastate?.status}</h2>
        </div>
      </div>
      <div class="adpha-thirdcontainer">
        <h4>Report</h4>

        <div className="adpha-thirdcontainer-images flex">
          {datastate?.report_image &&
            JSON.parse(datastate.report_image) &&
            Object.values(JSON.parse(datastate.report_image)).map(
              (imageSrc, imgIndex) => (
                <img
                  key={imgIndex}
                  src={imageSrc}
                  alt={`Report Image ${imgIndex + 1}`}
                />
              )
            )}
        </div>

        <button
          className="adpha-thirdcontainer-button"
          onClick={() => {
            const images = JSON.parse(datastate?.report_image || "{}");
            Object.values(images).forEach((imageSrc) => {
              handleDownload(imageSrc);
            });
          }}
        >
          Download
        </button>
      </div>
      {datastate?.remarks && (
        <div class="adpha-remarks">
          <h4 style={{ fontWeight: "600" }}>Remarks</h4>

          <h4
            style={{ marginTop: "10px" }}
            className="adpha-remarks-para priscriptionpara"
          >
            {datastate?.remarks}
          </h4>
        </div>
      )}
      <div class="adpha-remarks">
        <h4 style={{ fontWeight: "600" }}>Doctor's Remarks</h4>

        <h4
          style={{ marginTop: "10px" }}
          className="second-opinion-discription-new"
        >
          <textarea
            value={datastate?.doctor_remarks}
            name="doctor_remarks"
            onChange={handlechange}
            type="text"
          />
        </h4>
      </div>

      {datastate?.status !== "completed"  && (
        <div class="sendbutton_secondop">
          <button
            onClick={() => updatebutton("completed")}
            class="second-opiniondt-save-button"
          >
            Send
          </button>

          {datastate?.status !== "forwarded to expert team" && (
            <button
              onClick={() => updatebutton("forwarded to expert team")}
              className="second-opiniondt-save-button"
              style={{ backgroundColor: "orange", marginLeft: "10px" }}
            >
              Forward to expert team
            </button>
          )}
        </div>
      )}
    </>
  );
}
