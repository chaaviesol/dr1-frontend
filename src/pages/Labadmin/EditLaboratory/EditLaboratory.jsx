import React, { useEffect, useState } from 'react'
import "./EditLaboratory.css"
import { NavBarAnalyze } from '../ComponentLab/NavbarAnalyze/NavBarAnalyze'
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { port } from '../../../config';
import { TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Modal } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { toast } from 'react-toastify';
import { Loader } from '../../../components/Loader/Loader';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
export const EditLaboratory = () => {
    const [loading, setLoading] = useState(false)
    const [DetailedData, setDetailedData] = useState({})
    const location = useLocation()
    const navigate = useNavigate()
    const id = location?.state?.id
    const [ModalOpen, setModalOpen] = useState({
        features: false,
        services: false
    })
    const axiosPrivate=useAxiosPrivate()
    const Services = [
        { name: "Blood Count Tests" },
        { name: "Genetic Testing" },
        { name: "Kidney Tests" },
        { name: "Laboratory Tests" },
        { name: "Prenatal Testing" },
        { name: "Thyroid Tests" },
        { name: "Bilirubin Test" },
        { name: "Cholesterol Level" },
        { name: "Electrocardiogram" },
    ]
    const Features = [
        { name: "Home collection" },
        { name: "Online report" },
        { name: "Cashless" },
        { name: "24 hours services" },
        { name: "Doctor available" },

    ]
    useEffect(() => {
        if (id) {
            const data = {
                id: id
            }
            axios.post(`${port}/lab/labdetails`, data).then((res) => {
                console.log("res>>>>>", res)
                setDetailedData(res?.data?.data)
            })
        }
    }, [])
    const TimeSetting = (e, name) => {
        const value = dayjs(e)?.format('hh:mm A')
        console.log(name, value);
        setDetailedData({ ...DetailedData, timing: { ...DetailedData.timing, [name]: value } });
    }
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
    const storeArray = (e, which) => {
        const value = e.target.value;
        const isChecked = e.target.checked;
        let Services = [...DetailedData?.services || []];
        let features = [...DetailedData?.features || []];

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

        setDetailedData({ ...DetailedData, features: features, services: Services });
    };
    const editData = (e) => {
        const { name, value } = e?.target
        setDetailedData({ ...DetailedData, [name]: value })
    }
    const SubmitData = () => {
        setLoading(true)
        axiosPrivate.post(`${port}/lab/editlab`, DetailedData).then((res) => {
            if (res?.data?.success) {
                setLoading(false)
                toast.success(res?.data?.message)
            }
        }).catch((err) => {
            toast.info(err?.response?.data?.message)
        })
    }
    const handleFileChange = (event, data) => {
        const selectedFile = event.target?.files[0];
        if (data?.which === "profile") {
            setDetailedData({ ...DetailedData, UpdatedProfile: selectedFile });
        } else {
            if (selectedFile) {
                const isImage = selectedFile.type.startsWith("image/");
                if (isImage) {
                    setDetailedData({ ...DetailedData, subImages: [...(DetailedData?.subImages || []), selectedFile] });
                } else {
                    alert("Please select a valid image file.");
                    event.target.value = null;
                }
            }
        }

    }

    console.log("DetailedData>>>>", DetailedData)
    if (DetailedData?.name && !loading) {
        return (
            <>
                <NavBarAnalyze />
                <div className='EditLaboratory'>
                    <h1 className='EditLaboratoryH1'>Edit Your <span>Lab</span> </h1>
                    <div className='EditLaboratoryImagesSec'>
                        <div className='EditLabProfileImg'>
                            <p>Profile Photo</p>
                            {DetailedData?.photo?.image1 && (
                                <div className='EditLabProfileImgRela'>

                                    <label htmlFor="profileImg1">
                                        <img src={DetailedData?.photo?.image1} alt="Profile" />
                                    </label>
                                    <input
                                        type="file"
                                        id="profileImg1"
                                        style={{ display: 'none' }}
                                        onChange={(e) => { handleFileChange(e, { which: "profile" }) }}
                                    />
                                </div>
                            )}
                        </div>
                        <div className='EditLabProfileImg'>
                            <p>More Photos</p>
                            <div className='EditLabSubImg'>
                                {DetailedData?.photo?.image2 && (
                                    <div className='EditLabProfileImgRela'>
                                        <label htmlFor="profileImg2">
                                            <img src={DetailedData?.photo?.image2} alt="More" />
                                        </label>
                                        <input
                                            type="file"
                                            id="profileImg2"
                                            style={{ display: 'none' }}
                                        // onChange={handleFileChange}
                                        />
                                    </div>
                                )}
                                {DetailedData?.photo?.image3 && (
                                    <div className='EditLabProfileImgRela'>
                                        <label htmlFor="profileImg3">
                                            <img src={DetailedData?.photo?.image3} alt="More" />
                                        </label>
                                        <input
                                            type="file"
                                            id="profileImg3"
                                            style={{ display: 'none' }}
                                        // onChange={handleFileChange}
                                        />
                                    </div>
                                )}
                                {DetailedData?.photo?.image4 && (
                                    <div className='EditLabProfileImgRela'>
                                        <label htmlFor="profileImg4">
                                            <img src={DetailedData?.photo?.image4} alt="More" />
                                        </label>
                                        <input
                                            type="file"
                                            id="profileImg4"
                                            style={{ display: 'none' }}
                                        // onChange={handleFileChange}
                                        />
                                    </div>
                                )}
                                {!DetailedData?.photo?.image4 || !DetailedData?.photo?.image3 || !DetailedData?.photo?.image2 ?
                                    <div className='EditLabProfileImgRela'>
                                        <div className='Edit_card_ho_ad_add_image flex'>
                                            <label for="inputTag">
                                                <i class="ri-add-line"></i>
                                            </label>
                                            <input
                                                type="file"
                                                id="profileImg4"
                                                style={{ display: 'none' }}
                                            // onChange={handleFileChange}
                                            />
                                        </div>
                                    </div>
                                    : ''
                                }
                            </div>
                        </div>
                    </div>
                    <div className='EditLabInputsSec2'>
                        <div className='EditLabInputAlignSections'>
                            <div className='EditLabInputsSec1InnerSec2'>
                                <p>Lab Name</p>
                                <input disabled className='EditLabInputsSec1InnerTime' value={DetailedData?.name} type="text" />
                            </div>
                            <div className='EditLabInputsSec1InnerSec2'>
                                <p>Phone Number</p>
                                <input disabled className='EditLabInputsSec1InnerTime' value={DetailedData.phone_no} type="text" />
                            </div>
                        </div>
                        <div className='EditLabInputAlignSections'>
                            <div className='EditLabInputsSec1InnerSec2'>
                                <div className='EditLabInputsSec1InnerSec2AddIcn'>
                                    <p>Services</p>
                                    <ModeEditIcon />
                                </div>
                                <div onClick={() => { openModal({ services: true }) }} className='EditLabInputsSec1InnerSec2Button'>
                                    {DetailedData?.services?.map((service, index) =>
                                        <>
                                            <div>
                                                <p>{service}{DetailedData?.services.length === index + 1 ? '' : ","} </p>
                                            </div>
                                        </>
                                    )
                                    }
                                </div>
                            </div>
                            <div className='EditLabInputsSec1InnerSec2'>
                                <div className='EditLabInputsSec1InnerSec2AddIcn'>
                                    <p>Features</p>
                                    <ModeEditIcon />
                                </div>
                                <div onClick={() => { openModal() }} className='EditLabInputsSec1InnerSec2Button'>
                                    {DetailedData?.features?.map((feature, index) =>
                                        <>
                                            <div>
                                                <p>{feature}{DetailedData?.features.length === index + 1 ? '' : ","} </p>
                                            </div>

                                        </>
                                    )
                                    }
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className='EditLabInputsSec2'>
                        <div className='EditLabInputAlignSections'>
                            <div className='EditLabInputsSec1InnerSec2'>
                                <p>Pin Code</p>
                                <input disabled className='EditLabInputsSec1InnerTime' value={DetailedData?.pincode} type="text" />
                            </div>
                            <div className='EditLabInputsSec1InnerSec2'>
                                <p>License Number</p>
                                <input disabled className='EditLabInputsSec1InnerTime' value={DetailedData?.license_no} type="text" />
                            </div>
                        </div>
                        <div className='EditLabInputAlignSections'>
                            <div className='EditLabInputsSec1InnerSec2'>
                                <div className='EditLabInputsSec1InnerSec2AddIcn'>
                                    <p>Opening Time</p>
                                    <ModeEditIcon />
                                </div>
                                <TimePicker
                                    className='EditLabInputsSec1InnerTime'
                                    value={DetailedData?.timing?.opening_time ? dayjs(DetailedData?.timing?.opening_time, 'hh:mm A') : null}
                                    onChange={(e) => { TimeSetting(e, "opening_time") }}
                                />
                            </div>
                            <div className='EditLabInputsSec1InnerSec2'>
                                <div className='EditLabInputsSec1InnerSec2AddIcn'>
                                    <p>Closing Time</p>
                                    <ModeEditIcon />
                                </div>
                                <TimePicker
                                    className='EditLabInputsSec1InnerTime'
                                    value={DetailedData?.timing?.closing_time ? dayjs(DetailedData?.timing?.closing_time, 'hh:mm A') : null}
                                    onChange={(e) => { TimeSetting(e, "opening_time") }}
                                />                        </div>
                        </div>

                    </div>
                    <div className='EditLabInputsSec2'>
                        <div className='EditLabInputAlignSections'>
                            <div className='EditLabInputsSec1InnerSec3'>
                                <div className='EditLabInputsSec1InnerSec2AddIcn'>
                                    <p>About</p>
                                    <ModeEditIcon />
                                </div>
                                <textarea onChange={editData} name='about' value={DetailedData?.about} type="text" />
                            </div>
                        </div>
                        <div className='EditLabInputAlignSections'>
                            <div className='EditLabInputsSec1InnerSec3'>
                                <div className='EditLabInputsSec1InnerSec2AddIcn'>
                                    <p>Address</p>
                                </div>
                                <textarea disabled value={DetailedData?.address} type="text" />
                            </div>

                        </div>

                    </div>
                    <div className='EditLabSubCan'>
                        <div className='EditLabSubCanSec'>
                            <button onClick={() => { navigate(-1) }} >Cancel</button>
                            <button onClick={SubmitData}>Submit</button>
                        </div>
                    </div>
                    <Modal className='Features_card_ho_Modal' open={ModalOpen?.features || ModalOpen?.services}
                        onClose={CloseModal}
                    >
                        <>
                            <div className='Features_card_ho_ad flex'>
                                <div className='Features_card_ho_ad_check '>
                                    {ModalOpen?.features ?
                                        Features.map((ele) =>
                                            <label class="form-control flex">
                                                <input autoComplete="off" value={ele?.name || ''}
                                                    checked={DetailedData?.features?.includes(ele.name)}
                                                    onChange={(e) => { storeArray(e, { features: true }) }} type="checkbox" name="checkbox" />
                                                <h4 className='select-new'>{ele.name}</h4>
                                            </label>
                                        )
                                        :
                                        Services.map((ele) =>
                                            <label class="form-control flex">
                                                <input autoComplete="off" value={ele?.name || ''}
                                                    checked={DetailedData?.services?.includes(ele.name)}
                                                    onChange={(e) => { storeArray(e, { Services: true }) }} type="checkbox" name="checkbox" />
                                                <h4 className='select-new'>{ele.name}</h4>
                                            </label>
                                        )
                                    }
                                </div>



                                <button onClick={CloseModal} className='Features_card_ho_ad_button'><h4>Submit</h4></button>
                            </div>
                        </>
                    </Modal>

                </div>
            </>
        )
    } else {
        return (<>
            <Loader />
        </>)
    }
}
