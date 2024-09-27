import React, { useEffect, useState } from 'react'
import Hospitaladminnotification from '../../components/Hospitaladminnotification'
import Rightnavbar from '../../components/Rightnavbar'
import "./doctoradmin.css";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TimePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import { port } from '../../config';
import { Loader } from '../../components/Loader/Loader';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
export default function Doctoradmin() {
  const [open, setOpen] = React.useState({});
  const [FormValues, setFormValues] = useState({})
  const [DoctorData, setDoctorData] = useState()
  const [EditValues, setEditValues] = useState({})
  const [deletePopup, setdeletePopUp] = useState(false)
  const [loading, setloading] = useState(false)
  const [Hospitals, setHospitals] = useState([])
  const [TimePickers, setTimePickers] = useState([
    { day: "Sunday", id: 1, availableTimes: [{ startTime: '', endTime: '' }] },
    { day: "Monday", id: 2, availableTimes: [{ startTime: '', endTime: '' }] },
    { day: "Tuesday", id: 3, availableTimes: [{ startTime: '', endTime: '' }] },
    { day: "Wednesday", id: 4, availableTimes: [{ startTime: '', endTime: '' }] },
    { day: "Thursday", id: 5, availableTimes: [{ startTime: '', endTime: '' }] },
    { day: "Friday", id: 6, availableTimes: [{ startTime: '', endTime: '' }] },
    { day: "Saturday", id: 7, availableTimes: [{ startTime: '', endTime: '' }] }
  ])
  const {auth}=useAuth()
  const axiosPrivate=useAxiosPrivate()
  const ResetTimePicker = () => {
    setTimePickers([
      { day: "Sunday", id: 1, availableTimes: [{ startTime: '', endTime: '' }] },
      { day: "Monday", id: 2, availableTimes: [{ startTime: '', endTime: '' }] },
      { day: "Tuesday", id: 3, availableTimes: [{ startTime: '', endTime: '' }] },
      { day: "Wednesday", id: 4, availableTimes: [{ startTime: '', endTime: '' }] },
      { day: "Thursday", id: 5, availableTimes: [{ startTime: '', endTime: '' }] },
      { day: "Friday", id: 6, availableTimes: [{ startTime: '', endTime: '' }] },
      { day: "Saturday", id: 7, availableTimes: [{ startTime: '', endTime: '' }] }
    ])

  }

  const [currentAvailability, setcurrentAvailability] = useState([])
 
  const handleOpen = (edit) => {
    if (edit?.edit) {
      setOpen({ edit: true });
      changeValues(edit?.id)
      setFormValues('')
    } else {
      setOpen({ another: true });
      setFormValues('')
    }
  }
  console.log("FormValues>>>>", FormValues)
  const changeValues = (id) => {
    const findData = currentAvailability.find(ele => ele?.hospital_id === id)
    setEditValues(findData)
  }
  const handleClose = () => {
    setOpen({ edit: false });
    setOpen({ another: false });
  }

  const PickTime = (e, day) => {
    const values = dayjs(e).$d; // Convert Day.js object to JavaScript Date object
    console.log(values)
    const name = day?.name;
    let mainind = day?.mainInd;
    let timingArray = [...TimePickers[mainind].availableTimes || []];
    timingArray[day?.index] = { ...timingArray[day?.index], [name]: values };
    let tempData = [...TimePickers || []];
    tempData[day?.mainInd] = { ...tempData[day?.mainInd], availableTimes: timingArray };
    setTimePickers(tempData);
  };
  const edittime = (e, day) => {
    const values = dayjs(e)?.$d; // Convert Day.js object to JavaScript Date object
    const name = day?.name;
    const mainind = day?.mainInd;
    const index = day?.index;
    let tempData = EditValues?.days_timing
    tempData[mainind].availableTimes[index] = { ...tempData[mainind].availableTimes[index], [name]: values }
    setEditValues({ ...EditValues, days_timing: tempData });
  };

  const NameOnchange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const hospital_id = parseInt(e.target.value);
    const hospital_name = selectedOption.getAttribute('data-name');

    console.log("Selected ID:", hospital_id);
    console.log("Selected Name:", hospital_name);

    setFormValues({
      ...FormValues,
      hospital_id: hospital_id,
      hospital_name: hospital_name,
    });
  };

  const toastify = (data) => {
    if (data?.success) {
      toast.success(data?.msg)
    } else {
      toast.info(data?.msg)
    }
  }
  const getitngAllhospitals = () => {
    const data = {
      id: auth.userId
    }
    if (data?.id) {
      axios.post(`${port}/hospital/consultationdata`, data).then((res) => {
        setcurrentAvailability(res.data.data)
        console.log(res)
      }).catch((err) => {
        console.log(err)
        toast.info(err?.response?.data?.message)
      })
    }

  }
  useEffect(() => {
    axios.get(`${port}/hospital/list`).then((res) => {
      setHospitals(res.data.data)
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
    const data = {
      id: auth.userId
    }
    axios.post(`${port}/doctor/doctordetails`, data).then((res) => {
      setDoctorData(res.data.data)
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
    getitngAllhospitals()
  }, [])


  const DecrementInput = (MainInd, SubInd) => {
    const tempPicker = [...TimePickers]
    tempPicker[MainInd].availableTimes.splice(SubInd, 1)
    setTimePickers(tempPicker)
  }
  const DecrementInputEdit = (MainInd, SubInd) => {
    const tempPicker = [...EditValues?.days_timing]
    tempPicker[MainInd].availableTimes.splice(SubInd, 1)
    setTimePickers(tempPicker)
  }

  console.log("EditValues>>>>", EditValues)
  const incrementBox = (id) => {
    const find = TimePickers?.filter(ele => ele.id === id)
    const index = TimePickers?.findIndex(ele => ele.id === id)
    if (find.length > 0 && TimePickers[index].availableTimes.length < 4) {
      let temp = [...TimePickers]
      temp[index] = { ...temp[index], availableTimes: [...temp[index]?.availableTimes, { startTime: '', endTime: '' }] }
      setTimePickers(temp)
    }
  }
  const EditIncrement = (id) => {
    const find = EditValues?.days_timing?.filter(ele => ele.id === id)
    const index = EditValues?.days_timing?.findIndex(ele => ele.id === id)
    if (find.length > 0) {
      let temp = [...EditValues?.days_timing]
      temp[index] = { ...temp[index], availableTimes: [...temp[index]?.availableTimes, { startTime: '', endTime: '' }] }
      console.log("temp>>>", temp)
      setEditValues({ ...EditValues, days_timing: temp })
    }
  }
  console.log("FormValues>>>", FormValues)

  const SaveData = () => {
    const data = {
      hospital_id: FormValues?.hospital_id,
      days: TimePickers,
      doctor_id: auth.userId
    }

    // const checkingValues = TimePickers?.filter(Values => {
    //   const CheckStartPoint = Values?.availableTimes?.filter(availableTimes =>
    //     availableTimes?.startTime
    //   );
    //   const checkEndPoint = Values?.availableTimes?.filter(ele => ele?.endTime);
    //   return checkEndPoint?.length === CheckStartPoint?.length
    // })
    // console.log("checkingValues>>>>", checkingValues)
    // if (!FormValues?.hospital_id && checkingValues?.length > 0) {
    //   toastify({ msg: "Hospital not default; residential auto-added." })
    // }

    let hasStartTime = [];
    let hasEndTime = [];
    let FindEndTime = [];
    let FindStartTime = [];
    let checkingValues = false;
    if (TimePickers && Array.isArray(TimePickers)) {
      TimePickers.forEach((Values) => {
        // Filter out undefined values while adding to hasStartTime and hasEndTime
        const startTime = Values?.availableTimes?.find(availableTime => availableTime?.startTime);
        const endTime = Values?.availableTimes?.find(availableTime => availableTime?.endTime);
        if (startTime) hasStartTime.push(startTime);
        if (endTime) hasEndTime.push(endTime);
        FindStartTime = hasStartTime.filter(ele => ele?.endTime);
        FindEndTime = hasEndTime.filter(ele => ele?.startTime);
        // console.log("FindStartEndTime>>>", FindStartEndTime);
      });
    }
    if (hasStartTime.length === FindStartTime.length && hasEndTime.length === FindEndTime.length) {
      checkingValues = true;
    }
    if (checkingValues && !FormValues?.hospital_id && !FormValues?.hospital_name) {
      toastify({ msg: "Hospital not default; residential auto-added." })
    }
    console.log("data>>>>", data)
    if (checkingValues) {
      setloading(true)
      axiosPrivate.post(`${port}/hospital/consultation_details`, data).then((res) => {
        if (res?.data?.success) {
          toastify({ msg: res?.data?.message, success: true })
          handleClose()
          ResetTimePicker()
          getitngAllhospitals()
          setloading(false)
        }
      }).catch((err) => {
        toastify({ msg: err?.response?.data?.message })
        setloading(false)
      })
    } else {
      toastify({ msg: "Please verify either the start time or the end time" })
      setloading(false)
    }

  }
  const EditData = () => {
    const checkingValues = EditValues.days_timing?.filter(Values => {
      const CheckStartPoint = Values?.availableTimes?.filter(availableTimes =>
        availableTimes?.startTime
      );
      const checkEndPoint = Values?.availableTimes?.filter(ele => ele?.endTime);
      return checkEndPoint?.length === CheckStartPoint?.length
    })
    console.log("checkingValues>>>", checkingValues)
    if (checkingValues.length === 7) {
      setloading(true)
      axiosPrivate.post(`${port}/hospital/edit_consultation`, EditValues).then((res) => {
        if (res?.data?.success) {
          toastify({ msg: res?.data?.message, success: true })
          handleClose()
          getitngAllhospitals()
          setloading(false)
        }
      }).catch((err) => {
        toastify({ msg: err?.response?.data?.message })
        setloading(false)
      })
    } else {
      toastify({ msg: "Please verify either the start time or the end time" })
      setloading(false)
    }

  }
  const DeleteTimeConfirm = (check) => {
    if (check.cls) {
      setdeletePopUp({ condition: false })
    } else {
      setdeletePopUp({ id: check.id, condition: true, index: check.index })
    }
  }
  const ConfirmDelete = () => {
    const data = {
      id: deletePopup?.id,
      doctor_id: auth.userId
    }
    setloading(true)
    axiosPrivate.post(`${port}/hospital/delete_availability`, data).then((res) => {
      console.log("res>>>", res)
      if (res?.data?.success) {
        let allAvailblity = [...currentAvailability]
        allAvailblity.splice(deletePopup.index, 1)
        setcurrentAvailability(allAvailblity)
        DeleteTimeConfirm({ cls: true })
        toastify({ success: true, msg: res?.data?.message })
        setloading(false)
      }
    }).catch((err) => {
      toast.info(err.response.data.message)
      setloading(false)
    })
  }
  return (
    <div>
      {
        loading ? <Loader /> : ""}
      <div className="hospitaladmin-main flex">
        <Rightnavbar data={DoctorData} />
        <Modal
          onClose={() => { DeleteTimeConfirm({ cls: true }) }}
          open={deletePopup.condition}
          className='dltPopupAlignModal'
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <div className='DltPopupAlign'>
            <div className='DltPopupAlignIconDiv'>
              <DeleteIcon id="DltPopupAlignIcon" />
            </div>
            <h3>Are you sure you want to proceed with the removal?</h3>
            <div className='DltPopupAlignButtons'>
              <button onClick={() => { DeleteTimeConfirm({ cls: true }) }} className='DltPopupAlignButton'>Close</button>
              <button onClick={ConfirmDelete} className='DltPopupAlignButton2'>Confirm</button>
            </div>
          </div>
        </Modal>
        <div className="hospitaladmin_right">
          <Hospitaladminnotification />
          <div className='manage flex'>
            <div className="hospitaladmin_title flex">
              <h1>Manage Your</h1>
              <h1 className='color-blue'>Account</h1>
            </div>
            <div className="hospitaladmin_cards flex">
              <a className="hospitaladmin_card hospitaladmin_card1 flex">
                <div>
                  <div className='hospitaladmin_number hospitaladmin_number1 flex' ><h2>24</h2></div>
                </div>
                <div>
                  <h4>Enquiries</h4>
                </div>
              </a>
              <a className="hospitaladmin_card hospitaladmin_card2 flex">
                <div>
                  <div className='hospitaladmin_number hospitaladmin_number2 flex' ><h2>24</h2></div>
                </div>
                <div>
                  <h4>Pending</h4>
                </div>
              </a>
              <a className="hospitaladmin_card hospitaladmin_card3 flex">
                <div>
                  <div className='hospitaladmin_number hospitaladmin_number3 flex' ><h2>24</h2></div>
                </div>
                <div>
                  <h4>Fulfilled</h4>
                </div>
              </a>
            </div>
          </div>
          <div className="availability">
            <h3>Availability</h3>
            <div className='availabilityFixedSize'>
              {currentAvailability.length > 0 ?
                currentAvailability?.map((ele, index) =>
                  <div className="available flex">
                    <div className='available_flexData'>
                      <div className="hospitalname">
                        <h4>
                          {ele?.hospital_name}
                        </h4>
                      </div>
                      <div className='availabilityDays'>
                        {ele?.days_timing.map((TimingByDay, index) =>
                          <>
                            <p className='availabilityDaysPtag' style={{ color: TimingByDay.availableTimes[0]?.startTime ? '' : 'rgb(128 128 128 / 91%)' }}>{TimingByDay?.day.slice(0, 3)} </p>
                            <p className='availabilityDaysPtag2'>{ele?.days_timing.length === index + 1 ? '' : ","}</p>
                            &nbsp;
                          </>
                        )}
                      </div>
                    </div>

                    <div className="hospitalname_button">
                      <button onClick={() => handleOpen({ edit: true, id: ele.hospital_id })}>
                        Edit
                      </button>
                      <button onClick={() => { DeleteTimeConfirm({ id: ele.id, index: index },) }}>
                        Delete
                      </button>
                    </div>
                  </div>
                ) :
                <h3>Data not found</h3>
              }
            </div>
            <div className='available_add_button_align'>
              <Button onClick={handleOpen} className="available_add_button flex">
                <h4> Add More </h4>
              </Button>
            </div>

          </div>
          <div>
            {/* add modal editing modal */}
            <Modal
              open={open.another}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div className='viewdetails'>
                <h2>Specify your hospital visit duration.</h2>
                <div className='modalInputdiv'>
                  <select onChange={NameOnchange} name="myBrowser"
                    className="modalInputOpenDiv">
                    <option selected disabled >Choose Hospitals or Residence</option>
                    <optgroup label="Select Residence or">
                      <option data-name="Residential" value=''>Residential</option>
                      <>
                        <p className='modalInputPtag'><span className='modalInputPtagSpan'>+</span> Add Hospital</p>
                      </>
                    </optgroup>
                    <optgroup label="Hospitals">
                      {Hospitals.map((ele, index) =>
                        <option data-name={ele.name} value={ele?.id}>{ele?.name}</option>
                      )}
                    </optgroup>
                  </select>
                </div>
                <label>Select your Time</label>
                <div className='viewdataTimePicker'>
                  <div className='viewdataTimePickerScroll' style={{ height: '50vh' }}>
                    {TimePickers?.map((ele, index) =>
                      <div className='viewdataTimeSec'>
                        <label htmlFor="">{ele?.day}</label>
                        <>
                          {ele?.availableTimes?.map((data, ind) =>
                            <div className='viewdataTimePickerDuelAlign' >
                              <TimePicker
                                label="Start Time"
                                name='startTime'
                                className='viewdataTimePickerCompo'
                                value={''}
                                onChange={(e) => { PickTime(e, { day: ele?.day, name: "startTime", index: ind, mainInd: index }) }}
                              />
                              <TimePicker
                                label="End Time"
                                className='viewdataTimePickerCompo'
                                value={''}
                                name='endTime'
                                onChange={(e) => { PickTime(e, { day: ele?.day, name: "endTime", index: ind, mainInd: index }) }}
                              />
                              {!ind > 0 ? <button onClick={() => { incrementBox(ele.id) }} className='viewdataTimeAddEx'>
                                <AddIcon id="viewdataTimeAddExIcon" />
                              </button> :
                                <button onClick={() => { DecrementInput(index, ind) }} className='viewdataTimeRemo'>
                                  <RemoveIcon id="viewdataTimeAddREmove" />
                                </button>
                              }
                            </div>
                          )}
                        </>
                      </div>
                    )}
                  </div>
                  <div className='viewdataFinalSaveButton'>
                    <button onClick={SaveData}>Save</button>
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
              <div className='viewdetails'>
                <h2>Specify your hospital visit duration.</h2>
                <div className='modalInputdiv'>
                  <select value={EditValues?.hospital_name} name="myBrowser"
                    className="modalInputOpenDiv">
                    <option selected disabled >Choose Hospitals or Residence</option>
                    <option value=''>{EditValues?.hospital_name}</option>
                  </select>
                </div>
                <label>Select your Time</label>
                <div className='viewdataTimePicker'>
                  <div className='viewdataTimePickerScroll'>
                    {EditValues?.days_timing?.map((ele, index) =>
                      <div className='viewdataTimeSec'>
                        <label htmlFor="">{ele?.day}</label>
                        <>
                          {ele?.availableTimes?.map((data, ind) =>
                            <div className='viewdataTimePickerDuelAlign' >
                              <TimePicker
                                label="Start Time"
                                name='startTime'
                                className='viewdataTimePickerCompo'
                                value={dayjs(data?.startTime)}
                                onChange={(e) => { edittime(e, { day: ele?.day, name: "startTime", index: ind, mainInd: index }) }}
                              />
                              <TimePicker
                                label="End Time"
                                className='viewdataTimePickerCompo'
                                value={dayjs(data?.endTime)}
                                onChange={(e) => { edittime(e, { day: ele?.day, name: "endTime", index: ind, mainInd: index }) }}
                              />
                              {!ind > 0 ? <button onClick={() => { EditIncrement(ele.id) }} className='viewdataTimeAddEx'>
                                <AddIcon id="viewdataTimeAddExIcon" />
                              </button> :
                                <button onClick={() => { DecrementInputEdit(index, ind) }} className='viewdataTimeRemo'>
                                  <RemoveIcon id="viewdataTimeAddREmove" />
                                </button>
                              }
                            </div>
                          )}</>
                      </div>
                    )}
                  </div>
                  <div className='viewdataFinalSaveButton'>
                    <button onClick={EditData}>Sjhbjhghjave</button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>


        </div>


      </div >
    </div >
  )
}
