import React, { useContext, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import "../../../Doctoradmin/DocAdminProfile/DocAdminProfile.css";
import styles from "./styles.module.css";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { IconButton, Modal } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import { port } from "../../../../config";
import { Loader } from "../../../../components/Loader/Loader";
import { HospitalAdminContext } from "../../../../contexts/Doctor/HospitalAdminProvider";
import ConfirmationModal from "../../../../components/Confirmation/Index";
import useFetchViewsAndContacts from "../../../../hooks/useFetchViewsAndContacts";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
const Index = () => {
  const [open, setOpen] = React.useState({});
  const [FormValues, setFormValues] = useState({});
  const [DoctorData, setDoctorData] = useState();
  const [EditValues, setEditValues] = useState({});
  const [deletePopup, setdeletePopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editAboutProfile, seteditAboutProfile] = useState(false);
  const [TimePickers, setTimePickers] = useState();
  const [editingId, setEditingId] = useState(); //db id which edits availability
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const { selectedDoc } = useContext(HospitalAdminContext);
  const axiosPrivate = useAxiosPrivate();
  const doctor_id = selectedDoc?.id;
  const tempImg = "./images/TempDocImg.jpg";

  const ResetTimePicker = () => {
    setTimePickers([
      {
        day: "Sunday",
        id: 1,
        availableTimes: [{ startTime: "", endTime: "" }],
      },
      {
        day: "Monday",
        id: 2,
        availableTimes: [{ startTime: "", endTime: "" }],
      },
      {
        day: "Tuesday",
        id: 3,
        availableTimes: [{ startTime: "", endTime: "" }],
      },
      {
        day: "Wednesday",
        id: 4,
        availableTimes: [{ startTime: "", endTime: "" }],
      },
      {
        day: "Thursday",
        id: 5,
        availableTimes: [{ startTime: "", endTime: "" }],
      },
      {
        day: "Friday",
        id: 6,
        availableTimes: [{ startTime: "", endTime: "" }],
      },
      {
        day: "Saturday",
        id: 7,
        availableTimes: [{ startTime: "", endTime: "" }],
      },
    ]);
  };

  const [currentAvailability, setcurrentAvailability] = useState([]);
  const { auth } = useAuth();
  const consultAndViewData = useFetchViewsAndContacts(doctor_id, "Doctor");

  const handleOpen = (edit) => {
    if (edit?.edit) {
      setOpen({ edit: true });
      changeValues(edit?.id);
      setFormValues("");
    } else {
      setOpen({ another: true });
      setFormValues("");
    }
  };
  console.log("FormValues>>>>", FormValues);
  const changeValues = (id) => {
    const findData = currentAvailability.find((ele) => ele?.hospital_id === id);
    setEditValues(findData);
  };
  const handleClose = () => {
    setOpen({ edit: false });
    setOpen({ another: false });
  };

  const PickTime = (e, day) => {
    const values = dayjs(e).$d; // Convert Day.js object to JavaScript Date object
    console.log(values);
    const name = day?.name;
    let mainind = day?.mainInd;
    console.log(name);
    console.log(mainind);
    let timingArray = [...(TimePickers[mainind].availableTimes || [])];
    console.log(timingArray);
    timingArray[day?.index] = { ...timingArray[day?.index], [name]: values };
    console.log(timingArray);
    let tempData = [...(TimePickers || [])];
    tempData[day?.mainInd] = {
      ...tempData[day?.mainInd],
      availableTimes: timingArray,
    };
    console.log(tempData);
    setTimePickers(tempData);
  };
  const edittime = (e, day) => {
    const values = dayjs(e)?.$d; // Convert Day.js object to JavaScript Date object
    const name = day?.name;
    const mainind = day?.mainInd;
    const index = day?.index;
    let tempData = EditValues?.days_timing;
    tempData[mainind].availableTimes[index] = {
      ...tempData[mainind].availableTimes[index],
      [name]: values,
    };
    setEditValues({ ...EditValues, days_timing: tempData });
  };

  const toastify = (data) => {
    if (data?.success) {
      toast.success(data?.msg);
    } else {
      toast.info(data?.msg);
    }
  };
  //fetch selected doctor details
  const fetchDoctor = async (hospital_id, doctor_id) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${port}/hospital/hospitaldoctordetails`,
        {
          hospital_id,
          doctor_id,
        }
      );
      const responseData = response.data.data;
      console.log(responseData);
      setDoctorData(responseData.doctorId);
      if (!responseData.days_timing) {
        ResetTimePicker();
      } else {
        setcurrentAvailability(responseData.days_timing);
        setTimePickers(responseData.days_timing);
      }
      setEditingId(responseData.id);

      console.log(responseData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDoc.id) {
      fetchDoctor(auth.userId, doctor_id);
    }
  }, []);

  const DecrementInput = (MainInd, SubInd) => {
    const tempPicker = [...TimePickers];
    tempPicker[MainInd].availableTimes.splice(SubInd, 1);
    setTimePickers(tempPicker);
  };
  const DecrementInputEdit = (MainInd, SubInd) => {
    const tempPicker = [...EditValues?.days_timing];
    tempPicker[MainInd].availableTimes.splice(SubInd, 1);
    setTimePickers(tempPicker);
  };

  console.log("EditValues>>>>", EditValues);
  const incrementBox = (id) => {
    const find = TimePickers?.filter((ele) => ele.id === id);
    const index = TimePickers?.findIndex((ele) => ele.id === id);
    if (find.length > 0 && TimePickers[index].availableTimes.length < 4) {
      let temp = [...TimePickers];
      temp[index] = {
        ...temp[index],
        availableTimes: [
          ...temp[index]?.availableTimes,
          { startTime: "", endTime: "" },
        ],
      };
      setTimePickers(temp);
    }
  };
  const EditIncrement = (id) => {
    alert("phhh");
    const find = EditValues?.days_timing?.filter((ele) => ele.id === id);
    const index = EditValues?.days_timing?.findIndex((ele) => ele.id === id);
    if (find.length > 0) {
      let temp = [...EditValues?.days_timing];
      temp[index] = {
        ...temp[index],
        availableTimes: [
          ...temp[index]?.availableTimes,
          { startTime: "", endTime: "" },
        ],
      };
      console.log("temp>>>", temp);
      setEditValues({ ...EditValues, days_timing: temp });
    }
  };
  console.log("FormValues>>>", FormValues);

  const SaveData = () => {
    const data = {
      id: editingId,
      days_timing: TimePickers,
    };

    let hasStartTime = [];
    let hasEndTime = [];
    let FindEndTime = [];
    let FindStartTime = [];
    let checkingValues = false;
    if (TimePickers && Array.isArray(TimePickers)) {
      TimePickers.forEach((Values) => {
        // Filter out undefined values while adding to hasStartTime and hasEndTime
        const startTime = Values?.availableTimes?.find(
          (availableTime) => availableTime?.startTime
        );
        const endTime = Values?.availableTimes?.find(
          (availableTime) => availableTime?.endTime
        );
        if (startTime) hasStartTime.push(startTime);
        if (endTime) hasEndTime.push(endTime);
        FindStartTime = hasStartTime.filter((ele) => ele?.endTime);
        FindEndTime = hasEndTime.filter((ele) => ele?.startTime);
      });
    }
    if (
      hasStartTime.length === FindStartTime.length &&
      hasEndTime.length === FindEndTime.length
    ) {
      checkingValues = true;
    }
    if (checkingValues) {
      //call the api
      callApi(data);
    } else {
      toastify({ msg: "Please verify either the start time or the end time" });
    }
  };
  //call to api
  const callApi = async (data) => {
    setIsLoading(true);
    try {
      const response = await axiosPrivate.post(
        `${port}/hospital/edit_consultation`,
        data
      );
      console.log(response);
      if (response?.data?.success) {
        toastify({ msg: "successfully updated availabilty", success: true });
        handleClose();
        fetchDoctor(auth.userId, doctor_id);
      }
    } catch (err) {
      console.error("error");
      toastify({
        msg: "Failed to update consultation. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const EditData = () => {
    const checkingValues = EditValues.days_timing?.filter((Values) => {
      const CheckStartPoint = Values?.availableTimes?.filter(
        (availableTimes) => availableTimes?.startTime
      );
      const checkEndPoint = Values?.availableTimes?.filter(
        (ele) => ele?.endTime
      );
      return checkEndPoint?.length === CheckStartPoint?.length;
    });
    console.log("checkingValues>>>", checkingValues);
    if (checkingValues.length === 7) {
      setIsLoading(true);
      axiosPrivate
        .post(`${port}/hospital/edit_consultation`, EditValues)
        .then((res) => {
          if (res?.data?.success) {
            toastify({ msg: res?.data?.message, success: true });
            handleClose();
            setIsLoading(false);
          }
        })
        .catch((err) => {
          toastify({ msg: err?.response?.data?.message });
          setIsLoading(false);
        });
    } else {
      toastify({ msg: "Please verify either the start time or the end time" });
      setIsLoading(false);
    }
  };
  const DeleteTimeConfirm = (check) => {
    if (check.cls) {
      setdeletePopUp({ condition: false });
    } else {
      setdeletePopUp({ id: check.id, condition: true, index: check.index });
    }
  };
  console.log("deletePopup>>>>", deletePopup);
  const ConfirmDelete = () => {
    const data = {
      id: deletePopup?.id,
      doctor_id: auth.userId,
    };
    setIsLoading(true);
    axiosPrivate
      .post(`${port}/hospital/delete_availability`, data)
      .then((res) => {
        console.log("res>>>", res);
        if (res?.data?.success) {
          let allAvailblity = [...currentAvailability];
          allAvailblity.splice(deletePopup.index, 1);
          setcurrentAvailability(allAvailblity);
          DeleteTimeConfirm({ cls: true });
          toastify({ success: true, msg: res?.data?.message });
          setIsLoading(false);
        }
      })
      .catch((err) => {
        toast.info(err.response.data.message);
        setIsLoading(false);
      });
  };
  // console.log("DoctorData>>>>", DoctorData)
  const editAbout = () => {
    seteditAboutProfile(!editAboutProfile);
  };
  const upadteAbout = () => {
    const data = {
      doctor_id: DoctorData?.id,
      about: DoctorData?.about,
    };
    axios.post(`${port}/doctor/edit`, data).then((res) => {
      console.log(res);
      toast.success(res?.data?.message);
      editAbout();
    });
  };

  const changeAbout = (e) => {
    const { name, value } = e?.target;
    setDoctorData({ ...DoctorData, [name]: value });
  };
  console.log(DoctorData);
  console.log(TimePickers);
  console.log(currentAvailability);

  const handleBack=()=>{

  }
  return (
    <>
      {isLoading && <Loader />}

      <button onClick={{handleBack}} className="adpha-back-button" style={{ marginTop: "1rem" }}>
        <i className="ri-arrow-left-line"></i>
      </button>
      <div className="mainadmindoctordatas flex">
        <div className="mainadmindoctordatas_profile flex">
          <img
            className="mainadmindoctordatas_profile_photo"
            src={DoctorData?.image || tempImg}
            alt=""
          />
          <div className="mainadmindoctordatas_profile_data flex">
            <div className="flex">
              {" "}
              <h2>{DoctorData?.name}</h2>{" "}
              <h4
                className="highlight_data"
                style={{
                  background: "#2A9D8F",
                  color: "white",
                  marginLeft: "10px",
                }}
              >
                {DoctorData?.sector?.slice(0, 3).toUpperCase()}
              </h4>
            </div>

            <h4
              className="highlight_data"
              style={{ background: "#3A65FD", color: "white" }}
            >
              {DoctorData?.education_qualification}
            </h4>

            <div className="flex">
              <div
                className="flex texticonset"
                style={{ alignItems: "center", display: "flex" }}
              >
                <i class="fi fi-sr-city"></i>{" "}
                <h4 style={{ marginLeft: "10px" }}>
                  {DoctorData?.phone_office}
                </h4>
              </div>
            </div>

            <div className="flex texticonset">
              <i class="fi fi-sr-envelope"></i>
              <h4 style={{ marginLeft: "10px" }}>{DoctorData?.email}</h4>
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
              <h4>Contacted</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="mainadmindoctoraboutavail flex">
        <div className="mainadmindoctorabout ">
          <div
            style={{
              marginBottom: "1.3vw",
              display: "flex",
              alignItems: "center",
            }}
            className="mainadmindoctoraboutDiv"
          >
            <h3>About</h3>
            <div onClick={editAbout}>
              <IconButton sx={{ padding: ".8rem" }}>
                <EditIcon
                  style={{ color: editAboutProfile ? "blue" : "black" }}
                  id="mainadmindoctoraboutDivIcon"
                />
              </IconButton>
            </div>
          </div>

          <div className="flex" style={{ marginBottom: "1vw" }}>
            <h4
              className="highlight_data"
              style={{ background: "#2A9D8F", color: "white" }}
            >
              {DoctorData?.type}
            </h4>{" "}
            <h4
              className="highlight_data"
              style={{
                marginLeft: "20px",
                background: "#FB8500",
                color: "white",
              }}
            >
              {DoctorData?.specialization}
            </h4>
          </div>

          {!editAboutProfile ? (
            <h4 onClick={editAbout} style={{ marginBottom: "1.3vw" }}>
              {DoctorData?.about}
            </h4>
          ) : (
            <textarea
              onChange={changeAbout}
              className="adimindoctorpinAbout"
              value={DoctorData?.about}
              name="about"
            ></textarea>
          )}
          {editAboutProfile && (
            <div className="mainadmindoctoraboutConfirmBtn">
              <button onClick={upadteAbout}>Update</button>
            </div>
          )}
          <h3 style={{ marginBottom: "1.3vw" }}>{DoctorData?.address}</h3>
          <div className="flex adimindoctorpin">
            <h4 style={{ background: "#3A65FD", color: "white" }}>
              {DoctorData?.pincode}
            </h4>
          </div>
        </div>

        <div className={styles.availabilitySection}>
          <div className="mainadmindoctoravilabilityHeight flex">
            <i style={{ color: "#6B8CFE" }} class="ri-time-fill"></i>
            <h3 style={{ marginBottom: "1.3vw", marginLeft: "0.6vw" }}>
              Availability
            </h3>
          </div>

          <div style={{ display: "flex", gap: ".5rem" }}>
            {currentAvailability?.length > 0 ? (
              currentAvailability?.map((ele, index) => (
                <div className="availabilityDays" style={{ width: "50px" }}>
                  <>
                    <p
                      className={styles.date}
                      style={{
                        color: ele.availableTimes[0]?.startTime
                          ? "blue"
                          : "rgb(128 128 128 / 91%)",
                      }}
                    >
                      {ele?.day.slice(0, 3)}{" "}
                    </p>
                    &nbsp;
                  </>
                </div>
              ))
            ) : (
             null
            )}
          </div>
          {currentAvailability?.length > 0 ? (
            <div className="mainadmindoctoravilabilityAdd">
              <button onClick={handleOpen}>Manage availability</button>
            </div>
          ) : (
            <div className="mainadmindoctoravilabilityAdd">
              <button onClick={handleOpen}>Add availability</button>
            </div>
          )}
        </div>
      </div>

      <Modal
        open={open.another}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="viewdetails">
          <label style={{ fontWeight: "500" }} className="modalInputdivlabel">
            Select Time
          </label>
          <div className="viewdataTimePicker">
            <div
              className="viewdataTimePickerScroll"
              style={{ height: "50vh" }}
            >
              {TimePickers?.map((ele, index) => (
                <div className="viewdataTimeSec">
                  <label htmlFor="">{ele?.day}</label>
                  <>
                    {ele?.availableTimes?.map((data, ind) => (
                      <div className="viewdataTimePickerDuelAlign">
                        <div className="viewdataTimePickerDuelStart">
                          <label htmlFor="">Start time</label>
                          <TimePicker
                            // label="Start Time"
                            name="startTime"
                            className="viewdataTimePickerCompo_hospital"
                            value={
                              data?.startTime ? dayjs(data?.startTime) : null
                            }
                            onChange={(e) => {
                              PickTime(e, {
                                day: ele?.day,
                                name: "startTime",
                                index: ind,
                                mainInd: index,
                              });
                            }}
                          />
                        </div>
                        <div className="viewdataTimePickerDuelStart">
                          <label htmlFor="">End time</label>
                          <TimePicker
                            // label="End Time"
                            className="viewdataTimePickerCompo_hospital"
                            value={data?.endTime ? dayjs(data?.endTime) : null}
                            name="endTime"
                            onChange={(e) => {
                              PickTime(e, {
                                day: ele?.day,
                                name: "endTime",
                                index: ind,
                                mainInd: index,
                              });
                            }}
                          />
                        </div>
                        {!ind > 0 ? (
                          <button
                            onClick={() => {
                              incrementBox(ele.id);
                            }}
                            className="viewdataTimeAddEx"
                          >
                            <AddIcon id="viewdataTimeAddExIcon" />
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              DecrementInput(index, ind);
                            }}
                            className="viewdataTimeRemo"
                          >
                            <RemoveIcon id="viewdataTimeAddREmove" />
                          </button>
                        )}
                      </div>
                    ))}
                  </>
                </div>
              ))}
            </div>
            <div className="viewdataFinalSaveButton" style={{ gap: "2rem" }}>
              <button onClick={SaveData}>Save</button>
              <button
                style={{ background: "#ff6347" }}
                onClick={() => setShowConfirmationModal(true)}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </Modal>
      {/* Edit modal */}
      <Modal
        open={open?.edit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="viewdetails">
          <label>Select your Time</label>
          <div className="viewdataTimePicker">
            <div className="viewdataTimePickerScroll">
              {TimePickers?.days_timing?.map((ele, index) => (
                <div className="viewdataTimeSec">
                  <label htmlFor="">{ele?.day}</label>
                  <>
                    {ele?.availableTimes?.map((data, ind) => (
                      <div className="viewdataTimePickerDuelAlign">
                        <div className="viewdataTimePickerDuelAlign">
                          <div className="viewdataTimePickerDuelStart">
                            <label htmlFor="">Start time</label>
                            <TimePicker
                              // label="Start Time"
                              name="startTime"
                              className="viewdataTimePickerCompo_hospital"
                              value={
                                data?.startTime ? dayjs(data?.startTime) : null
                              }
                              onChange={(e) => {
                                edittime(e, {
                                  day: ele?.day,
                                  name: "startTime",
                                  index: ind,
                                  mainInd: index,
                                });
                              }}
                            />
                          </div>
                          <div className="viewdataTimePickerDuelStart">
                            <label htmlFor="">End time</label>
                            <TimePicker
                              // label="End Time"
                              className="viewdataTimePickerCompo_hospital"
                              value={
                                data?.endTime ? dayjs(data?.endTime) : null
                              }
                              name="endTime"
                              onChange={(e) => {
                                edittime(e, {
                                  day: ele?.day,
                                  name: "endTime",
                                  index: ind,
                                  mainInd: index,
                                });
                              }}
                            />
                          </div>
                          {!ind > 0 ? (
                            <button
                              onClick={() => {
                                EditIncrement(ele.id);
                              }}
                              className="viewdataTimeAddEx"
                            >
                              <AddIcon id="viewdataTimeAddExIcon" />
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                DecrementInputEdit(index, ind);
                              }}
                              className="viewdataTimeRemo"
                            >
                              <RemoveIcon id="viewdataTimeAddREmove" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                </div>
              ))}
            </div>
            <div className="viewdataFinalSaveButton">
              <button onClick={EditData}>Save</button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        onClose={() => {
          DeleteTimeConfirm({ cls: true });
        }}
        open={deletePopup.condition}
        className="dltPopupAlignModal"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="DltPopupAlign">
          <div className="DltPopupAlignIconDiv">
            <DeleteIcon id="DltPopupAlignIcon" />
          </div>
          <h3>Are you sure you want to proceed with the removal?</h3>
          <div className="DltPopupAlignButtons">
            <button
              onClick={() => {
                DeleteTimeConfirm({ cls: true });
              }}
              className="DltPopupAlignButton"
            >
              Close
            </button>
            <button onClick={ConfirmDelete} className="DltPopupAlignButton2">
              Confirm
            </button>
          </div>
        </div>
      </Modal>
      <ConfirmationModal
        confirmation={showConfirmationModal}
        setConfirmation={setShowConfirmationModal}
        handleYes={ResetTimePicker}
      />
    </>
  );
};
export default Index;
