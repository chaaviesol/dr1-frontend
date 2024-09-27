import React, { useContext, useEffect, useState } from 'react'
import '../Hospitaladmin/hospitaladminregistration2.css'
import { MyContext } from '../../contexts/Contexts'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { port } from '../../config'
import '../Labadmin/Labadminregistration2.css'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs'
import { Backdrop, CircularProgress, Modal } from '@mui/material'
import { useMediaQuery } from 'react-responsive';
import CloseIcon from '@mui/icons-material/Close';
import { Loader } from '../../components/Loader/Loader'
export default function Labadminregistration2() {
  const { LabAdminRg, setLabAdminRg } = useContext(MyContext)
  const { Categories, setCategories } = useContext(MyContext)
  const [Errors, setErrors] = useState({})
  const [loader, setloader] = useState(false)
  const [FileName, setFileName] = useState()
  const navigate = useNavigate()
  const [ModalOpen, setModalOpen] = useState({
    features: false,
    services: false
  })
  const isMobile = useMediaQuery({ maxWidth: 980 })
  const Services = Categories?.laboratoryServices
  console.log("Categories>>>>", Categories)
  const Features = Categories?.laboratoryFeatures

  // useEffect(() => {
  //   if (!LabAdminRg?.name && !LabAdminRg?.contact_no && !LabAdminRg?.password && !LabAdminRg?.email && !LabAdminRg?.repassword) {
  //     navigate("/labadminregistration1")
  //   } else {
  //     setLabAdminRg({ ...LabAdminRg, timing: { closing_time: '06:00 PM', opening_time: '10:00 AM' } })
  //   }
  //   window.scrollTo(0, 0); // Scrolls to the top of the page
  // }, [])
  const toastifyFun = (value, success) => {
    if (!success?.success) {
      toast.info(value, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.success(value, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

  }
  const updatePosts = (pinCode) => {
    if (pinCode.length === 6) {
      axios
        .get(`https://api.postalpincode.in/pincode/${pinCode}`)
        .then((res) => {
          console.log("res.data[0]?.PostOffice", res.data[0]?.PostOffice);
          if (res.data[0]?.PostOffice?.length > 0) {
            setLabAdminRg({ ...LabAdminRg, pincode: pinCode, location: res.data[0]?.PostOffice })
          } else {
            toast.info("Pincode not found")
          }
        });
    } else {
      console.log("pincode should be 6 digits");
    }
  };
  const inputChanges = (e) => {
    const { name, value } = e.target
    if (name === "pincode") {
      if (value.toString().length <= 6) {
        setLabAdminRg({ ...LabAdminRg, pincode: value });
        if (value.length === 6) {
          updatePosts(value);
        } else {
          setLabAdminRg(prevState => {
            const newState = { ...prevState };
            delete newState.location;
            return newState;
          });
        }
      }
    } else {
      setLabAdminRg({ ...LabAdminRg, [name]: value })
    }
  }
  const TimeSetting = (e, name) => {
    const value = dayjs(e)?.format('hh:mm A')
    console.log(name, value);
    setLabAdminRg({ ...LabAdminRg, timing: { ...LabAdminRg.timing, [name]: value } });
  }
  useEffect(() => {
    CheckValidation()
  }, [LabAdminRg.pincode])


  const storeArray = (e, which) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    let Services = [...LabAdminRg?.Services || []];
    let features = [...LabAdminRg?.features || []];

    if (which.Services) {
      if (isChecked) {
        Services.push(value);
      } else {
        Services = Services.filter(spec => spec !== value);
      }
    } else {
      if (isChecked) {
        features.push(value);
      } else {
        features = features.filter(feat => feat !== value);
      }
    }

    setLabAdminRg({ ...LabAdminRg, features: features, Services: Services });
  };
  const Finish = () => {
    if (LabAdminRg?.pincode &&
      LabAdminRg?.about &&
      LabAdminRg?.lisence_no &&
      LabAdminRg?.address &&
      LabAdminRg?.features?.length > 0 &&
      LabAdminRg?.Services?.length > 0 &&
      !Errors?.pincode &&
      LabAdminRg?.timing?.opening_time &&
      LabAdminRg?.timing?.closing_time &&
      LabAdminRg?.place) {
      setloader(true)
      CheckValidation()
      let temp = []
      // Check for LabAdminRg existence and its properties
      if (LabAdminRg && LabAdminRg?.image) {
        // Check if subImages is not empty
        if (LabAdminRg?.subImages?.length > 0) {
          for (let i = 0; i < LabAdminRg?.subImages?.length; i++) {
            const imageIndex = LabAdminRg?.image?.length > 0 ? 1 : 0;
            temp[i + imageIndex] = LabAdminRg?.subImages[i];
          }
          if (LabAdminRg.image.length > 0) {
            temp[0] = LabAdminRg.image[0];
          }
        } else {
          // Handle empty subImages (optional: log a message or take other actions)
          setloader(false)
          toast.info("Please include at least one image as a minimum requirement.")
        }

      } else {
        // Handle invalid LabAdminRg data (optional: log a message or take other actions)
        console.error("LabAdminRg object or its properties (image, subImages) are missing.");
      }

      // Now the temp array contains the main image at index 0 followed by sub-images
      console.log(temp); // You can uncomment this line to see the contents of temp
      console.log("temp>>>>", temp)
      if (temp?.[0]) {
        const formData = new FormData()
        temp.forEach((image, index) => {
          formData.append("image", image);
        });
        formData.append("data", JSON.stringify(LabAdminRg));
        axios.post(`${port}/lab/addlab`, formData).then((res) => {
          console.log(res)
          if (res?.data?.success) {
            toastifyFun(res?.data?.message, { success: true })
            setLabAdminRg('')
            setTimeout(() => {
              navigate("/")
            }, 1000);
            setloader(false)
          }
        }).catch((err) => {
          console.log(err)
          setloader(false)
          toastifyFun(err?.response?.data?.message, { info: true })
        })
      }
    } else {
      setloader(false)
      toastifyFun("All fields are mandatory", { info: true })
    }
  }

  const CheckValidation = () => {
    const Pincode = /^\d{6}$/;
    if (LabAdminRg?.pincode) {
      if (!Pincode.test(LabAdminRg?.pincode)) {
        setErrors({ ...Errors, pincode: "Not a valid 6-digit number" })
        setLabAdminRg(prevState => {
          const newState = { ...prevState };
          delete newState.location;
          return newState;
        });
      } else {
        setErrors({ ...Errors, pincode: "" })
      }
    }

  }
  console.log("LabAdminRg>>>>", LabAdminRg)
  const openModal = (data) => {
    if (data?.services) {
      setModalOpen({ services: true })
    } else {
      setModalOpen({ features: true })
    }
  }
  const CloseModal = () => {
    setModalOpen({ services: false, features: false })
  }
  const handleClose = () => {
    setloader(false)
  }
  const PinCodeCheck = () => {
    if (!LabAdminRg?.pincode) {
      toast.info("Please input your pincode")
    }
  }
  const handleKeyPress = (event) => {
    if (event?.key === '.' || event?.key === '-' || event?.key === 'e' || event?.key === '+' || event?.key === 'E') {
      event.preventDefault();
    }
  };
  const handleFileChange = (event) => {
    const FilterImg = LabAdminRg?.subImages?.filter(ele => ele?.name === event?.target?.files[0]?.name)
    if (!FilterImg?.length > 0) {
      const selectedFile = event.target?.files[0];
      if (selectedFile) {
        const isImage = selectedFile.type.startsWith("image/");
        if (isImage) {
          setLabAdminRg({ ...LabAdminRg, subImages: [...(LabAdminRg?.subImages || []), selectedFile] });
        } else {
          alert("Please select a valid image file.");
          event.target.value = null;
        }
      }
    } else {
      toast.info("Already image selected")
    }
  };
  const imageSplicerFn = (index) => {
    let images = LabAdminRg?.subImages
    images?.splice(index, 1)
    setLabAdminRg({ ...LabAdminRg, subImages: images })
  }

  return (

    <div>
      <ToastContainer />
      {loader ? <Loader /> : ""}
      <div className='hospitaladminregistration2 flex'>
        <h1>Laboratory Registration</h1>

        <div className='image_card_ho_ad flex'>
          <h4>{!LabAdminRg?.subImages || LabAdminRg?.subImages?.length < 3 ? "Add" : ""} Photos</h4>
          <div className='image_card_ho_ad2 flex' >
            <div className='image_card_ho_ad_section flex'>
              {LabAdminRg?.subImages?.map((image, index) =>
                <div className='LabImageAb'>
                  <img key={index} // Ensure each image has a unique key
                    src={URL.createObjectURL(image)} // Use createObjectURL to generate a URL for the image
                    alt={`Image ${index}`} />
                  <div onClick={() => { imageSplicerFn(index) }} className='LabImageAbRemIcon'>
                    <CloseIcon />
                  </div>
                </div>
              )}
              {!LabAdminRg?.subImages || LabAdminRg?.subImages?.length < 3 ?
                <div className='image_card_ho_ad_add_image flex'>
                  <label for="inputTag">
                    <i class="ri-add-line"></i>
                    <input onChange={handleFileChange} autoComplete="off" id="inputTag" type="file" />
                  </label>
                </div>
                : ''
              }

            </div>
          </div>
        </div>


        <div className='hospital-second-section flex'>





          <div>
            <h4>License Number</h4>
            <input autoComplete="off" value={LabAdminRg?.lisence_no || ''} maxLength={50} onChange={inputChanges} type="text" name='lisence_no' />
          </div>


          <div>

            <div className='name-progrss flex'>
              <h4>Features </h4>
              <h4>{`${LabAdminRg?.features?.length ? LabAdminRg?.features?.length : 0}/${Features?.length}`}</h4>
            </div>
            <button type='button' onClick={() => { openModal() }} className='hospital-second-section-Div flex'> {LabAdminRg?.features?.length > 0 ?
              <div className='hospital-second-section-Div-Map'>
                {LabAdminRg?.features?.map((ele, index) =>
                  <h4>{ele}{index + 1 === LabAdminRg?.features?.length ? '' : ","}&nbsp; </h4>
                )}
              </div>
              : <h4>Select Features</h4>}</button>
          </div>

          <div>

            <div className='name-progrss flex'>
              <h4>Services</h4>
              <h4> {`${LabAdminRg?.Services?.length ? LabAdminRg?.Services?.length : 0}/${Services?.length}`}</h4>
            </div>

            <button type='button' onClick={() => { openModal({ services: true }) }} className='hospital-second-section-Div flex'>{LabAdminRg?.Services?.length > 0 ?
              <div className='hospital-second-section-Div-Map'>
                {LabAdminRg?.Services?.map((ele, index) =>
                  <h4>{ele}{index + 1 === LabAdminRg?.Services?.length ? '' : ","}&nbsp; </h4>
                )}
              </div>
              : <h4>Select Specialities</h4>}
            </button>
          </div>

        </div>
        <div className='hospitaladminregistration_second flex' >


          <div className='flex pin-lo'>

            <div className='pin-input' >
              <h4>Pincode</h4>
              <input autoComplete="off"
                onKeyDown={handleKeyPress}
                className='hospitalAdminInput'
                value={LabAdminRg?.pincode || ''}
                onChange={inputChanges} type="number"
                maxLength={6} name="pincode"
                style={{ border: Errors?.pincode && '2px solid red' }}
              />
              <div className="main-waring-section main-waring-section4 flex ">
                <p className="register-number-warning">{Errors?.pincode}</p>
              </div>
            </div>
            <div className='lo-input'>
              <h4>Location</h4>
              <select
                type="text"
                onChange={inputChanges}
                onClick={PinCodeCheck}
                value={LabAdminRg?.place ? LabAdminRg?.place : ''}
                name="place"
                className="hospitalRegTypeList"
                disabled={LabAdminRg?.location?.length > 0 ? false : true}
              >
                <>
                  <option
                    disabled selected value=''
                  >
                    Select place
                  </option>
                  {LabAdminRg?.location?.map((types, index) => (
                    <option style={{ color: "black" }}
                      key={index}
                      value={types?.Name}>
                      {types?.Name}
                    </option>
                  ))}
                </>

              </select>
            </div>
          </div>
          <div className='LabAdminPin flex'>
            <div className='LabAdminPinTimePic'>
              <h4 className="pass-con">Opening Time</h4>
              <TimePicker
                className='hospitalAdminPinTimePic'
                value={LabAdminRg?.timing?.opening_time ? dayjs(LabAdminRg?.timing?.opening_time, 'hh:mm A') : null}
                onChange={(e) => { TimeSetting(e, "opening_time") }}
              />
            </div>
            <div className='LabAdminPinTimePic'>
              <h4 className="pass-con">Closing Time</h4>
              <TimePicker className="hospitalAdminPinTimePic"
                value={LabAdminRg?.timing?.closing_time ? dayjs(LabAdminRg?.timing?.closing_time, 'hh:mm A') : null}
                onChange={(e) => { TimeSetting(e, "closing_time") }}
              />
            </div>
          </div>

        </div>




        <div className='flex hospital-adress-about'>

          <div className=''>
            <h4 className=" margin-about">About</h4>

            <textarea maxLength={500} value={LabAdminRg?.about || ''} onChange={inputChanges} name="about" id="" cols="30" rows="10"></textarea>
          </div>
          <div>
            <h4>Address</h4>
            <textarea maxLength={500} value={LabAdminRg?.address || ''} onChange={inputChanges} name="address" id="" cols="30" rows="5"></textarea>
          </div>
        </div>

        <div className='ho_ad_re_button flex'>
          <button type='button' onClick={(event) => {
            event.preventDefault();
            navigate(-1);
          }} >Back</button>
          <button type='button' onClick={Finish} >Finish</button>
        </div>

      </div>

      <Modal className='Features_card_ho_Modal' open={ModalOpen?.features || ModalOpen?.services}
        onClose={CloseModal}
      >
        <>
          <div className='Features_card_ho_ad flex'>
            <div className='Features_card_ho_ad_check '>
              {ModalOpen?.features ?
                Features?.map((ele) =>
                  <label class="form-control flex">
                    <input autoComplete="off" value={ele || ''}
                      checked={LabAdminRg?.features?.includes(ele)}
                      onChange={(e) => { storeArray(e, { features: true }) }} type="checkbox" name="checkbox" />
                    <h4 className='select-new'>{ele}</h4>
                  </label>
                )
                :
                Services?.map((ele) =>
                  <label class="form-control flex">
                    <input autoComplete="off" value={ele || ''}
                      checked={LabAdminRg?.Services?.includes(ele)}
                      onChange={(e) => { storeArray(e, { Services: true }) }} type="checkbox" name="checkbox" />
                    <h4 className='select-new'>{ele}</h4>
                  </label>
                )
              }
            </div>



            <button onClick={CloseModal} className='Features_card_ho_ad_button'><h4>Submit</h4></button>
          </div>
        </>
      </Modal>


    </div >



  )
}
