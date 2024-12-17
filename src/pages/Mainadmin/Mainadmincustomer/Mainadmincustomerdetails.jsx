import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { port } from "../../../config";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function Mainadmincustomerdetails({
  Details,
  setChangeDashboards,
}) {
  const [customerDetails, setcustomerDetails] = useState(Details);
  const [customerActivity, setCustomerActivity] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    axios
      .post(`${port}/user/auserinteract`, {
        id: customerDetails?.id,
      })
      .then((res) => {
        console.log(res);
        setCustomerActivity(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const UpdateStatus = () => {
    const Data = {
      id: customerDetails?.id,
      status: customerDetails?.status === "Y" ? "N" : "Y",
    };
    console.log("Data>>>>", Data);
    axiosPrivate
      .post(`${port}/hospital/approvehospital`, Data)
      .then((res) => {
        console.log("res>>>>>>>", res);
        if (res?.data?.message) {
          toast.success(res?.data?.message);
          ChangeStatus();
        }
      })
      .catch((err) => {
        toast.info(err.response.data.message);
      });
  };
  const ChangeStatus = () => {
    let temp = customerDetails;
    if (temp?.status === "Y") {
      temp = { ...temp, status: "N" };
    } else {
      temp = { ...temp, status: "Y" };
    }
    console.log(temp);
    setcustomerDetails(temp);
  };

  // const TimeAgo = ({ date }) => {
  const timeAgo = (date) => {
    return moment(date).fromNow();
  };
  // const timeAgo = ;
  // }

  const handleBack = () => {
    setChangeDashboards({ customer: true });
  };
  return (
    <div>
      <button
        onClick={handleBack}
        className="adpha-back-button"
        style={{ marginTop: "1rem" }}
      >
        <i className="ri-arrow-left-line"></i>
      </button>
      <div className="mainadmindoctordatas flex" style={{ paddingTop: 0 }}>
        <div className="mainadmindoctordatas_profile flex">
          <img
            className="mainadmindoctordatas_profile_photo"
            src={customerDetails?.image || "/images/avatarmale.png"}
            alt=""
          />

          <div className="mainadmindoctordatas_profile_data flex">
            <div className="flex">
              {" "}
              <h2>{customerDetails?.name}</h2>{" "}
              {customerDetails?.gender && (
                <h4
                  className="highlight_data"
                  style={{
                    background: "#2A9D8F",
                    color: "white",
                    marginLeft: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {customerDetails?.gender}
                </h4>
              )}
            </div>

            {customerDetails?.ageGroup && (
              <div className="flex texticonset">
                <i style={{ color: "#FB8500" }} class="fi fi-br-age"></i>

                <h4 style={{ marginLeft: "10px" }}>
                  {customerDetails?.ageGroup} Years
                </h4>
              </div>
            )}

            <div className="flex">
              <div className="flex texticonset">
                <i class="fi fi-sr-call-outgoing"></i>
                <h4 style={{ marginLeft: "10px" }}>
                  +91 {customerDetails?.phone_no}
                </h4>
              </div>
              <div className="flex texticonset" style={{ marginLeft: "20px" }}>
                <i style={{ color: "#F35454" }} class="fi fi-sr-envelope"></i>
                <h4 style={{ marginLeft: "10px" }}>{customerDetails?.email}</h4>
              </div>
            </div>
            {customerDetails?.pincode && (
              <div className="flex adimindoctorpin">
                <h4 style={{ background: "#3A65FD", color: "white" }}>
                  {customerDetails?.pincode}
                </h4>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="admin_disable_section flex">
        <div className="admin_disable_section_left flex">
          <i class="fi fi-sr-exclamation"></i>
          <div style={{ marginLeft: "1.3vw" }}>
            <h2>Date of join</h2>
            <h4>
              {moment.utc(customerDetails?.datetime)
                .subtract(10, "days")
                .calendar()}
            </h4>
          </div>

          <div style={{ marginLeft: "1.5vw" }}>
            <h2>Last Active</h2>
            <h4>
              {moment.utc(customerDetails?.last_active)
                .subtract(10, "days")
                .calendar()}
            </h4>
          </div>
        </div>

        <div
          className={
            customerDetails?.status === "N"
              ? "admin_disable_button2"
              : customerDetails?.status === "Y" ||
                customerDetails?.status === null
              ? "admin_disable_button"
              : ""
          }
        >
          <h4 onClick={UpdateStatus}>
            {customerDetails?.status === "N"
              ? "Disabled"
              : customerDetails?.status === "Y" ||
                customerDetails?.status === null
              ? "Active"
              : ""}
          </h4>
        </div>
      </div>

      <h3 style={{ marginBottom: "1.3vw" }}>Activity</h3>
      {customerActivity.length === 0 ? (
        <div>
          <h3>No activity found</h3>
        </div>
      ) : (
        customerActivity.map((ele, index) => (
          <div key={index} className="customer_view flex">
            <div className="flex">
              <h4 className="customer_view_type">{ele.type}</h4>
              <h4>{ele?.typename}</h4>
            </div>

            <div className="flex">
              <h4 className="customer_view_time">
                {" "}
                {timeAgo(ele.created_date)}
              </h4>
              <h4
                className={`customer_view_contact ${
                  ele?.consultcount ? "" : "customer_view_contact2"
                }`}
              >
                {ele?.consultcount ? "Consulted" : "View"}
              </h4>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
