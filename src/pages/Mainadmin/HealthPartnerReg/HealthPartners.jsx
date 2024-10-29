import React, { useEffect, useState } from "react";
import { port } from "../../../config";
import moment from "moment-timezone";
import "../OrderAndPrescription/listtablestyle.css";
import "./healthpartner.css";
import dayjs from "dayjs";
import { Loader } from "../../../components/Loader/Loader";
import axios from "axios";
import { Modal } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { toast } from "react-toastify";
export default function HealthPartners() {
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [scheduledata, setScheduleData] = useState();
  const [alldata, setAlldata] = useState();
  const [modalData, setModalData] = useState({
    id: null,
    scheduled: false,
    onboarded: false,
    notattended: false,
    notinterested: false,
    wrongnumber: false,
    remarks: "",
    scheduled_Date: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [datalist, setdatalist] = useState([]);
  const [initialData, setinitialData] = useState([]);

  const handleDateChange = (newDate) => {
    setModalData((prevData) => ({
      ...prevData,
      scheduled_Date: newDate,
      scheduled: !!newDate,
    }));
  };

  const handleRemarksChange = (event) => {
    setModalData((prevData) => ({
      ...prevData,
      remarks: event.target.value,
    }));
  };

  const openModal = (ele) => {
    setModalData({
      id: ele.id,
      scheduled:
        ele.status === "scheduled" || ele.scheduled_Date ? true : false,
      onboarded: ele.status === "onboarded" ? true : false,
      notattended: ele.status === "notattended" ? true : false,
      notinterested: ele.status === "notinterested" ? true : false,
      wrongnumber: ele.status === "wrongnumber" ? true : false,
      remarks: ele.remarks || "",
      scheduled_Date: ele.scheduled_Date ? dayjs(ele.scheduled_Date) : null,
    });
    setIsModalOpen2(true);
  };

  const onClose = () => {
    setModalData({
      id: null,
      scheduled: false,
      onboarded: false,
      notattended: false,
      notinterested: false,
      wrongnumber: false,
      remarks: "",
      scheduled_Date: null,
    });
    setIsModalOpen2(false);
    setIsModalOpen3(false);
  };
  const onClose2 = () => {
    setModalData({
      wrongnumber: false,
    });
    setIsModalOpen3(false);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${port}/admin/getchatdata`);

      if (response?.status === 200) {
        const data = response?.data?.data || [];

        setdatalist(data);
        setScheduleData(response?.data?.todayScheduled);
        setAlldata(response?.data?.allgetdata);
        setinitialData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleCheck = (field) => {
    if (field === "notinterested") {
      setModalData((prevData) => ({
        ...prevData,
        notinterested: true,
        onboarded: false,
        notattended: false,
        wrongnumber: false,
        [field]: !prevData[field],
      }));
    } else if (field === "onboarded") {
      setModalData((prevData) => ({
        ...prevData,
        notinterested: false,
        onboarded: true,
        notattended: false,
        wrongnumber: false,
        [field]: !prevData[field],
      }));
    } else if (field === "wrongnumber") {
      setModalData((prevData) => ({
        ...prevData,
        notinterested: false,
        onboarded: false,
        notattended: false,
        wrongnumber: true,
        [field]: !prevData[field],
      }));
    } else if (field === "notattended") {
      setModalData((prevData) => ({
        ...prevData,
        notinterested: false,
        onboarded: false,
        notattended: true,
        wrongnumber: false,
        [field]: !prevData[field],
      }));
    } else {
      setModalData((prevState) => ({
        ...prevState,
        [field]: !prevState[field],
      }));
    }
  };

  const SearchData = (e) => {
    const { name, value } = e?.target;
    let tempData = initialData;
    if (!value) {
      setdatalist(initialData);
      return;
    }

    tempData = tempData.filter((item) => {
      let itemValue = item?.[name];
      if (itemValue !== undefined && itemValue !== null) {
        itemValue = itemValue.toString().toLowerCase();
        return itemValue.includes(value.toLowerCase());
      }
      return false;
    });

    setdatalist(tempData);
  };

  const reformatDate = (dateString) => {
    return moment(dateString).format("DD-MM-YYYY");
  };
  const filterDate = (e) => {
    const { value } = e.target;

    const formattedDate = reformatDate(value);
    const filteredData = initialData.filter((item) => {
      const dateMatch = reformatDate(item.created_date) === formattedDate;
      return dateMatch;
    });
    setdatalist(filteredData);
  };

  const OnSave = async () => {
    try {
      const { id, scheduled_Date, remarks } = modalData;

      const formattedDate = scheduled_Date
        ? dayjs(scheduled_Date).format("YYYY-MM-DDTHH:mm:ssZ")
        : null;
      // const formattedDate = scheduled_Date ? dayjs(scheduled_Date).format("YYYY-MM-DD HH:mm:ss.SSS") : null;

      const data = {
        id: id,
        status: modalData.onboarded
          ? "onboarded"
          : modalData.notattended
          ? "notattended"
          : modalData.notinterested
          ? "notinterested"
          : modalData.wrongnumber
          ? "wrongnumber"
          : modalData.scheduled
          ? "scheduled"
          : null,
        scheduled_Date: formattedDate,
        remarks: remarks,
      };
      if (data.status === "scheduled" && scheduled_Date === null) {
        toast.error("Please select the schedule date");
        return;
      }

      if (data.status === null) {
        toast.error("Please select the status");
        return;
      }

      const response = await axios.post(`${port}/admin/updatechatstatus`, data);
      if (response.status === 200) {
        toast.success("Updated successfully!", {
          autoClose: 3000,
        });
        setTimeout(() => {
          setModalData({
            id: null,
            scheduled: false,
            onboarded: false,
            notattended: false,
            notinterested: false,
            wrongnumber: false,
            remarks: "",
            scheduled_Date: null,
          });
          setIsModalOpen2(false);
          setIsModalOpen3(false);
          fetchData();
        }, 3000);
      } else if (response.status === 400) {
        toast.error(response.data.message);
      } else {
        toast.error("Failed to submit details.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const statusConfig = {
    requested: { text: "Requested", color: "black" },
    scheduled: { text: "Scheduled", color: "#34d399" },
    notinterested: { text: "Not Interested", color: "#f43f5e" },
    wrongnumber: { text: "Wrong Number", color: "red" },
    notattended: { text: "Not Attended", color: "#f43f5e" },
  };
  const handleRemoveClick = () => {
    setIsModalOpen3(true);
    !modalData.onboarded && handleCheck("wrongnumber");
  };
  const showTodayScheduled = () => {
    document.getElementsByName("name")[0].value = "";
    document.getElementsByName("type")[0].value = "";
    document.getElementsByName("contact_no")[0].value = "";
    document.getElementsByName("created_date")[0].value = "";
    setdatalist(scheduledata);
    setinitialData(scheduledata);
  };

  return (
    <div>
      {isLoading && <Loader />}
      <div className="mainadmindoctordatas_chart mainadmindoctordatas_chart_doctor flex">
        <div className="mainadmindoctordatas_chart1 mainadmindoctordatas_chart10 flex">
          <div className="mainadmindoctordatas_chart_icon mainadmindoctordatas_chart_icon10 flex">
            <i class="ri-user-shared-line"></i>
          </div>
          <div style={{ marginLeft: "18px" }}>
            <h2>{alldata}</h2>
            <h4>All</h4>
          </div>
        </div>

        <div className="mainadmindoctordatas_chart1 mainadmindoctordatas_chart2 mainadmindoctordatas_chart11 mainadmindoctordatas_chartschedule flex">
          <div className="mainadmindoctordatas_chart_icon mainadmindoctordatas_chart_icon11 flex">
            <i class="ri-user-follow-line"></i>
          </div>

          <div style={{ marginLeft: "18px" }}>
            <h2>{scheduledata?.length}</h2>
            <h4>Scheduled today</h4>
            {scheduledata?.length > 0 && (
              <h4 className="scheduledbutton" onClick={showTodayScheduled}>
                Click to see{" "}
              </h4>
            )}
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: "1.3vw", marginTop: "1.3vw" }}>
        Health Partners
      </h3>
      <table className="querlistonboarding">
        <tr className="querlistonboardingTr">
          <th className="querlistonboardingTh">
            <h4>No</h4>
            <input type="text" style={{ visibility: "hidden" }} />
          </th>

          <th className="">
            {" "}
            <h4> Name</h4>
            <input
              type="text"
              onChange={SearchData}
              name="name"
              placeholder="Search name"
            />
          </th>

          <th className="">
            {" "}
            <h4>Type</h4>
            <input
              type="text"
              onChange={SearchData}
              name="type"
              placeholder="Search Type"
            />
          </th>
          <th>
            {" "}
            <h4>Contact no</h4>
            <input
              type="text"
              onChange={SearchData}
              name="contact_no"
              placeholder="Search contact_no"
            />
          </th>

          <th className="">
            <h4>Date</h4>
            <input
              type="date"
              max={new Date().toISOString().split("T")[0]}
              onChange={filterDate}
              name="created_date"
              placeholder="Search by date"
            />
          </th>

          <th className="">
            <h4>Status</h4>
            {/* <input
              type="text"
              onChange={SearchData}
              name="status"
              placeholder="Search by status"
            /> */}
            {/* <input type="text" /> */}
          </th>
        </tr>
        {datalist?.map((ele, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{ele?.name}</td>
            <td>{ele?.type}</td>
            <td>{ele?.contact_no}</td>
            <td>{moment(ele?.created_date).format("DD-MM-YYYY")}</td>

            <td style={{ color: statusConfig[ele?.status]?.color || "black" }}>
              {statusConfig[ele?.status]?.text || ele?.status}
            </td>
            <td>
              <button
                onClick={() => openModal(ele)}
                className="querlistonboardingbutton"
              >
                Update Status
              </button>
            </td>
          </tr>
        ))}
      </table>

      <Modal open={isModalOpen2} onClose={() => setIsModalOpen2(false)}>
        <div className="QueryListModal">
          <div className="QueryListModalhead flex">
            <h2>Update Status</h2>
            <div className="flex">
              <h4>Wrong Number?</h4>
              <h4
                className="removequeryupdate"
                checked={modalData?.wrongnumber || false}
                onClick={handleRemoveClick}
              >
                Remove
              </h4>
            </div>
          </div>

          <div className="updatestatus-section flex">
            <div className="updatestatus-section-left">
              <div className="updatestatus-section-data flex">
                <div
                  className="updatestatus-section-circle"
                  style={{
                    backgroundColor: "#34d399",
                    color: "#15803d",
                    cursor: modalData.onboarded ? "not-allowed" : "pointer",
                  }}
                  onClick={() =>
                    !modalData.onboarded && handleCheck("scheduled")
                  }
                >
                  {modalData?.scheduled && <i className="ri-check-line"></i>}
                  <div className="statusline"></div>
                </div>

                <div>
                  <div className="scheduledinputtext">
                    <h4>Sheduled</h4>
                    <div className="scheduledinput2">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DateTimePicker"]}>
                          <div style={{ width: "250px" }}>
                            {" "}
                            {/* Adjust the width as needed */}
                            <DateTimePicker
                              value={modalData.scheduled_Date}
                              onChange={handleDateChange}
                              fullWidth
                              minDateTime={dayjs()}
                              disabled={modalData.onboarded}
                            />
                          </div>
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="updatestatus-section-data updatestatus-section-data2 flex">
                  <div
                    className="updatestatus-section-circle"
                    style={{
                      backgroundColor: "#34d399",
                      color: "#15803d",
                      cursor: "pointer",
                    }}
                    onClick={() => handleCheck("onboarded")}
                  >
                    {" "}
                    {modalData?.onboarded && (
                      <i className="ri-check-line"></i>
                    )}{" "}
                  </div>
                  <h4>Onboarded</h4>
                </div>
              </div>
            </div>

            <div className="updatestatus-section-right">
              <div className="updatestatus-section-data flex">
                <div
                  className="updatestatus-section-circle"
                  style={{
                    backgroundColor: "#fca5a5",
                    color: "#dc2626",
                    cursor: modalData.onboarded ? "not-allowed" : "pointer",
                  }}
                  onClick={() =>
                    !modalData.onboarded && handleCheck("notattended")
                  }
                >
                  {modalData?.notattended && <i className="ri-check-line"></i>}
                </div>
                <h4>Not Attended</h4>
              </div>

              <div className="updatestatus-section-data updatestatus-section-data2 flex">
                <div
                  className="updatestatus-section-circle"
                  style={{
                    backgroundColor: "#fca5a5",
                    color: "#dc2626",
                    cursor: modalData?.onboarded ? "not-allowed" : "pointer",
                  }}
                  onClick={() =>
                    !modalData.onboarded && handleCheck("notinterested")
                  }
                >
                  {" "}
                  {modalData?.notinterested && (
                    <i className="ri-check-line"></i>
                  )}{" "}
                </div>
                <h4>Not Interested</h4>
              </div>
            </div>
          </div>

          <div className="updatestatusremarks-section">
            <div className="updatestatusremarks-top flex">
              <h3>Remarks</h3>
            </div>
            <textarea
              id="remarks"
              name="remarks"
              value={modalData.remarks}
              onChange={handleRemarksChange}
              placeholder="Enter your remarks here"
            ></textarea>
          </div>

          <div className="upadtestatusbotbtn flex">
            <button onClick={onClose}>Close</button>{" "}
            <button onClick={OnSave}>Save</button>
          </div>
        </div>
      </Modal>

      <Modal open={isModalOpen3} onClose={() => setIsModalOpen3(false)}>
        <div>
          <div className="QueryListModal2">
            <div className="QueryListModalhead">
              <h4>Are you sure you want to mark this as "Wrong Number"?</h4>
              <br />
              <div className="upadtestatusbotbtn2 flex">
                <button onClick={OnSave}>Yes</button>
                <button onClick={onClose2}>No</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
