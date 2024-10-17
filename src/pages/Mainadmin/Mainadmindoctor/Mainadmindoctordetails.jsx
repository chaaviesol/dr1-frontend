import React, { useEffect, useState } from "react";
import "../Mainadmindoctor/mainadmindoctordetails.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { port } from "../../../config";
import { Modal } from "@mui/material";
import moment from "moment";
import { toast } from "react-toastify";
import { Loader } from "../../../components/Loader/Loader";
import useFetchViewsAndContacts from "../../../hooks/useFetchViewsAndContacts";

export default function Mainadmindoctordetails({ Data: { DetailData },setChangeDashboards }) {
  const [open, setOpen] = React.useState({});
  const [EditValues, setEditValues] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [DoctorDetails, setDoctorDetails] = useState(DetailData);
  const [currentAvailability, setcurrentAvailability] = useState([]);

  const [FeedbackCustomers, setFeedbackCustomers] = useState([]);
  // const [Viewers, setViewers] = useState([]);

  const navigate = useNavigate();
  const consultAndViewData = useFetchViewsAndContacts(
    DoctorDetails?.id,
    "Doctor"
  );
  console.log(consultAndViewData);
  const getitngAllhospitals = () => {
    LoadingFn(true);
    const data = {
      id: DoctorDetails?.id,
    };
    if (data?.id) {
      axios
        .post(`${port}/hospital/consultationdata`, data)
        .then((res) => {
          setcurrentAvailability(res.data.data);
          LoadingFn(false);
          console.log(res);
        })
        .catch((err) => {
          LoadingFn(false);

          console.log(err);
        });
    }
    const FeedbackSentingBody = {
      doctor_id: DoctorDetails?.id,
    };
    if (data?.id) {
      axios
        .post(`${port}/doctor/getadoctorfeedback`, FeedbackSentingBody)
        .then((res) => {
          setFeedbackCustomers(res.data.data);
          console.log(res);
          LoadingFn(false);
        })
        .catch((err) => {
          console.log(err);
          LoadingFn(false);
        });
    }
    const CountSentingBody = {
      id: DoctorDetails?.id,
      type: "Doctor",
    };
    if (data?.id) {
      axios
        .post(`${port}/user/allcount`, CountSentingBody)
        .then((res) => {
          // setViewers(res.data.data);
          LoadingFn(false);
          console.log(res);
        })
        .catch((err) => {
          LoadingFn(false);
          console.log(err);
        });
    }
  };
  useEffect(() => {
    getitngAllhospitals();
  }, []);
  const handleOpen = (edit) => {
    if (edit?.edit) {
      setOpen({ edit: true });
      changeValues(edit?.id);
    } else {
      setOpen({ another: true });
    }
  };
  const changeValues = (id) => {
    const findData = currentAvailability.find((ele) => ele?.hospital_id === id);
    setEditValues(findData);
  };
  const handleClose = () => {
    setOpen({ edit: false });
    setOpen({ another: false });
  };

  const LoadingFn = (condition) => {
    setisLoading(condition);
  };

  const UpdateStatus = () => {
    const Data = {
      id: DoctorDetails?.id,
      status: DoctorDetails.status === "Y" ? "N" : "Y",
    };
    console.log("Data>>>>", Data);
    axios
      .post(`${port}/doctor/doctor_disable`, Data)
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
    let temp = DoctorDetails;
    if (temp?.status === "Y") {
      temp = { ...temp, status: "N" };
    } else {
      temp = { ...temp, status: "Y" };
    }
    console.log(temp);
    setDoctorDetails(temp);
  };
  console.log("DoctorDetails>>>>", DoctorDetails);

  const EditDetailsCondition = () => {
    navigate("/mainadmindoctorEditbasic", { state: { data: DoctorDetails } });
  };

  const handleBack = () => {
    setChangeDashboards({ doctor: true });
  };

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <>
        <button
        onClick={handleBack}
        className="adpha-back-button"
        style={{ marginTop: "1rem" }}
      >
        <i className="ri-arrow-left-line"></i>
      </button>
        <div style={{ padding: "20px",paddingTop:"0" }}>
          <div className="mainadmindoctordatas flex">
            <div className="mainadmindoctordatas_profile flex">
              <img
                className="mainadmindoctordatas_profile_photo"
                src="/images/doc.jpg"
                alt=""
              />

              <div className="mainadmindoctordatas_profile_data flex">
                <div className="flex">
                  {" "}
                  <h2>{DoctorDetails?.name}</h2>{" "}
                  <h4
                    className="highlight_data"
                    style={{
                      background: "#2A9D8F",
                      color: "white",
                      marginLeft: "10px",
                    }}
                  >
                 {DoctorDetails?.sector}
                  </h4>
                </div>

                <h4
                  className="highlight_data"
                  style={{ background: "#3A65FD", color: "white" }}
                >
                  {DoctorDetails?.education_qualification}({DoctorDetails?.type}
                  )
                </h4>

                <div className="flex">
                  <div className="flex texticonset">
                    <i class="fi fi-sr-call-outgoing"></i>
                    <h4 style={{ marginLeft: "10px" }}>
                      +91 {DoctorDetails?.phone_no}
                    </h4>
                  </div>
                  <div
                    className="flex texticonset"
                    style={{ marginLeft: "20px" }}
                  >
                    <i class="fi fi-sr-city"></i>{" "}
                    <h4 style={{ marginLeft: "10px" }}>
                      +91 {DoctorDetails?.phone_office}
                    </h4>
                  </div>
                </div>

                <div className="flex texticonset">
                  <i class="fi fi-sr-envelope"></i>
                  <h4 style={{ marginLeft: "10px" }}>{DoctorDetails?.email}</h4>
                </div>
              </div>
            </div>

            <div className="mainadmindoctordatas_chart flex">
              <div className="mainadmindoctordatas_chart1 flex">
                <div className="mainadmindoctordatas_chart_icon flex">
                  <i class="fi fi-sr-overview"></i>
                </div>

                <div style={{ marginLeft: "18px" }}>
                  <h2>{consultAndViewData?.viewCount}</h2>
                  <h4>Views</h4>
                </div>
              </div>

              <div className="mainadmindoctordatas_chart1 mainadmindoctordatas_chart2 flex">
                <div className="mainadmindoctordatas_chart_icon flex">
                  <i class="fi fi-sr-call-outgoing"></i>
                </div>

                <div style={{ marginLeft: "18px" }}>
                  <h2>{consultAndViewData?.consultCount}</h2>
                  <h4>Contact</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="mainadmindoctoraboutavail flex">
            <div className="mainadmindoctorabout ">
              <div className="flex" style={{ marginBottom: "1vw" }}>
                <h4
                  className="highlight_data"
                  style={{ background: "#2A9D8F", color: "white" }}
                >
                  {DoctorDetails?.type}
                </h4>{" "}
                <h4
                  className="highlight_data"
                  style={{
                    marginLeft: "20px",
                    background: "#FB8500",
                    color: "white",
                  }}
                >
                  {DoctorDetails?.specialization}
                </h4>
              </div>
              <h3 style={{ marginBottom: "1.3vw" }}>About</h3>
              
              <h4 style={{ marginBottom: "1.3vw" }}>{DoctorDetails?.about}</h4>

              <h3 style={{ marginBottom: "1.3vw" }}>Address</h3>

              <h4 style={{ marginBottom: "1vw" }}>{DoctorDetails?.address}</h4>
              <div className="flex adimindoctorpin">
                <h4 style={{ background: "#3A65FD", color: "white" }}>
                  {DoctorDetails?.pincode}
                </h4>
              </div>
            </div>

            <div className="mainadmindoctoravilability">
              <div className="flex">
                <i style={{ color: "#6B8CFE" }} class="ri-time-fill"></i>
                <h3 style={{ marginBottom: "1.3vw", marginLeft: "0.6vw" }}>
                  Availability
                </h3>
              </div>
              {currentAvailability.map((ele) => (
                <div className="hospitaltime flex">
                  <div className="hospitaltime_name">
                    <h3>{ele?.hospital_name}</h3>
                    <div className="availabilityDays">
                      {ele?.days_timing.map((TimingByDay, index) => (
                        <>
                          <p
                            className="availabilityDaysPtag"
                            style={{
                              color: TimingByDay.availableTimes[0]?.startTime
                                ? ""
                                : "rgb(128 128 128 / 91%)",
                            }}
                          >
                            {TimingByDay?.day.slice(0, 3)}{" "}
                          </p>
                          <p className="availabilityDaysPtag2">
                            {ele?.days_timing.length === index + 1 ? "" : ","}
                          </p>
                          &nbsp;
                        </>
                      ))}
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      handleOpen({ edit: true, id: ele.hospital_id })
                    }
                    className="hospitaltimebutton"
                  >
                    <h4>View Details</h4>
                  </div>
                </div>
              ))}

              <Modal
                open={open?.edit}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <div className="viewdetails">
                  <h2>Available Hospital or Residence</h2>
                  <div className="modalInputdiv">
                    <select
                      value={EditValues?.hospital_name}
                      name="myBrowser"
                      className="modalInputOpenDiv"
                    >
                      <option selected disabled>
                        Choose Hospitals or Residence
                      </option>
                      <option value="">{EditValues?.hospital_name}</option>
                    </select>
                  </div>
                  <label>Available times</label>
                  <div className="viewdataTimePicker">
                    <div className="viewdataTimePickerScroll">
                      {EditValues?.days_timing?.map(
                        (ele, index) =>
                          ele.availableTimes.find((ele) => ele.startTime) && (
                            <div className="viewdataTimeSec">
                              <label htmlFor="">{ele?.day}</label>
                              <>
                                {ele?.availableTimes?.map((data, ind) => (
                                  <div className="viewdataTimePickerDuelAlign">
                                    <div className="viewdataTimePickerDuelAlignStartTIme">
                                      <label htmlFor="">Start time</label>
                                      <input
                                        className="viewdataTimePickerCompo"
                                        type="text"
                                        value={moment(data?.endTIme).format(
                                          "LT"
                                        )}
                                      />
                                    </div>
                                    <div className="viewdataTimePickerDuelAlignStartTIme">
                                      <label htmlFor="">End time</label>
                                      <input
                                        className="viewdataTimePickerCompo"
                                        type="text"
                                        value={moment(data?.endTIme).format(
                                          "LT"
                                        )}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          </div>

          <div className="mainadmindoctoraboutFlexEnd"></div>

          {FeedbackCustomers.length > 0 && (
            <>
              <div
                style={{ marginTop: "1.3vw" }}
                className="flex admin_view_more"
              >
                <h3>Latest Feedbacks</h3>
                <h4
                  onClick={() => {
                    navigate("/doctorfeedbacklist", {
                      state: FeedbackCustomers,
                    });
                  }}
                >
                  View More
                  <i
                    style={{ marginLeft: "0.5vw" }}
                    class="ri-arrow-right-up-line"
                  ></i>
                </h4>
              </div>

              <div className="feedbacksectiondoctor">
                {FeedbackCustomers?.map(
                  (ele, index) =>
                    index < 3 && (
                      <div className="feedbacksectiondoctorcard flex">
                        <div>
                          <img src="/images/man.jpg" alt="" />
                        </div>
                        <div className="flex feedbacksectiondoctorcarddata">
                          <div className="flex feedbacksectiondoctorcardstar">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <i
                                key={num}
                                style={{
                                  color:
                                    ele?.rating >= num ? "#FA8D0D" : undefined,
                                }}
                                className="ri-star-fill"
                              />
                            ))}
                          </div>
                          <h4>{ele?.message}</h4>
                          <div className="flex feedbacksectiondoctorcardname">
                            <i class="fi fi-ss-octagon-check"></i>
                            <h3 style={{ marginLeft: "10px" }}>
                              {ele?.userid?.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </>
          )}
          {/* {Viewers?.cunsultData?.length > 0 && */}
          <>
            <div className="flex admin_view_more">
              <h3>Views</h3>
              <h4>
                View More
                <i
                  style={{ marginLeft: "0.5vw" }}
                  class="ri-arrow-right-up-line"
                ></i>
              </h4>
            </div>
            <table className="doctortable">
              <tr>
                <th>No</th>
                <th>Customer Name</th>
                <th>Mobile Number</th>
                <th>Date & Time</th>
                <th>Pin & Location</th>
                <th>Status</th>
              </tr>
              {consultAndViewData?.allData.length > 0 &&
                consultAndViewData.allData.map((ele, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{ele?.userid?.name}</td>
                    <td>+49 30 123456</td>
                    <td>{moment(ele?.created_date).format("DD/MM/YYYY")}</td>
                    <td>{ele?.userid?.pincode || 673001} , Kozhikode</td>
                    <td>{ele.consultcount === 1 ? "Consulted" : "Viewed"}</td>
                  </tr>
                ))}
            </table>
          </>

          {/* } */}

          <div className="admin_disable_section flex">
            <div className="admin_disable_section_left flex">
              <i class="fi fi-sr-exclamation"></i>
              <div style={{ marginLeft: "1.3vw" }}>
                <h2>Date of join</h2>
                <h4>
                  {moment(DoctorDetails?.datetime)
                    .subtract(10, "days")
                    .calendar()}
                </h4>
              </div>

              <div style={{ marginLeft: "1.5vw" }}>
                <h2>Last Active</h2>
                <h4>
                  {moment(DoctorDetails?.last_active)
                    .subtract(10, "days")
                    .calendar()}
                </h4>
              </div>
            </div>

            <div
              className={
                DoctorDetails?.status === "N"
                  ? "admin_disable_button2"
                  : DoctorDetails?.status === "Y" ||
                    DoctorDetails?.status === null
                  ? "admin_disable_button"
                  : ""
              }
            >
              <button style={{backgroundColor:"#3A65FD"}} onClick={EditDetailsCondition}>Edit Profile</button>
              <h4
                onClick={UpdateStatus}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {DoctorDetails?.status === "N"
                  ? "Disabled"
                  : DoctorDetails?.status === "Y" ||
                    DoctorDetails?.status === null
                  ? "Active"
                  : ""}
              </h4>
            </div>
          </div>
        </div>
      </>
    );
  }
}
