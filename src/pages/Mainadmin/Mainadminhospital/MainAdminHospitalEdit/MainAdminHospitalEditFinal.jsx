import React, { useContext, useEffect, useState } from 'react'
import '../../../Hospitaladmin/hospitaladminregistration2.css'
import { MyContext } from '../../../../contexts/Contexts'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { port } from '../../../../config'
import { Modal } from '@mui/material'
import { Loader } from '../../../../components/Loader/Loader'
import { ayurSpec, homeoDept, speacializationNames, type } from '../../../Customer/HospitalFiltering/constants/Filter'
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate'

export const MainAdminHospitalEditFinal = () => {

    const { editHos, seteditHos } = useContext(MyContext)
    const [Errors, setErrors] = useState({})
    const [speciality, setspeciality] = useState([])
    const [ModalOpen, setModalOpen] = useState({
        feature: false,
        speciality: false
    })
    const axiosPrivate=useAxiosPrivate();
    const navigate = useNavigate()
    const [loader, setloader] = useState(false)


    const feature = [
        { name: "Casualty" },
        { name: "OP" },
        { name: "Palliative" },
        { name: "Care" },
        { name: "Other Services " },
    ]
    useEffect(() => {
        if (editHos?.type === "Allopathy") {
            setspeciality(speacializationNames)
        } else if (editHos?.type === "Ayurvedic") {
            setspeciality(ayurSpec)
        } else {
            setspeciality(homeoDept)
        }
    }, [editHos])
    useEffect(() => {
        if (!editHos?.name && !editHos?.contact_no && !editHos?.email) {
            navigate("/mainadminhospitalBasicedit")
        }
        window.scrollTo(0, 0); // Scrolls to the top of the page
    }, [])

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
        if (pinCode?.length === 6) {
            axios.get(`https://api.postalpincode.in/pincode/${pinCode}`)
                .then((res) => {
                    console.log("res.data[0]?.PostOffice", res?.data[0]?.PostOffice);
                    if (res.data[0]?.PostOffice?.length > 0) {
                        const location = res.data[0]?.PostOffice
                        seteditHos({ ...editHos, pincode: pinCode, location: location })
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
        seteditHos({ ...editHos, [name]: value })

    }
    useEffect(() => {
        const CheckField = !editHos?.name || !editHos?.email || !editHos?.contact_no
        if (CheckField) {
            // navigate("/")
        }
        CheckValidation()
    }, [editHos.pincode])

    const handlePostChange = (event) => {
        const { value } = event.target;
        if (value.toString().length <= 6) {
            seteditHos({ ...editHos, pincode: value });
            if (value.length === 6) {
                updatePosts(value);
            } else {
                seteditHos(prevState => {
                    const newState = { ...prevState };
                    delete newState.location;
                    return newState;
                });
            }
        }

    };
    const storeArray = (e, which) => {
        const value = e.target.value;
        const isChecked = e.target.checked;
        let speciality = [...editHos?.speciality || []];
        let feature = [...editHos?.feature || []];

        if (which.speciality) {
            if (isChecked) {
                speciality.push(value);
            } else {
                speciality = speciality.filter(spec => spec !== value);
            }
        } else {
            if (isChecked) {
                feature.push(value);
            } else {
                feature = feature.filter(feat => feat !== value);
            }
        }
        seteditHos({ ...editHos, feature: feature, speciality: speciality });
    };

    const Finish = () => {
        CheckValidation()
        if (editHos?.pincode &&
            editHos?.about &&
            editHos?.address &&
            editHos?.licence_no &&
            editHos?.type &&
            editHos.feature.length > 0 &&
            editHos.speciality.length > 0 && !
            Errors?.pincode) {
            setloader(true)
            // alert("successsssssssssssssssssssssssssssssssssss")
            axiosPrivate.post(`${port}/hospital/editbyadmin`, editHos).then((res) => {
                if (res?.data?.success) {
                    toastifyFun(res?.data?.message, { success: true })
                    seteditHos('')
                    setTimeout(() => {
                        // navigate("/mainadmin")
                    }, 2000);
                    setloader(false)
                }
            }).catch((err) => {
                console.log(err)
                toastifyFun(err?.response?.data?.message, { info: true })
                setloader(false)
            })
        } else {
            setloader(false)
            toastifyFun("All fields are mandatory", { info: true })
        }

    }
    const CheckValidation = () => {
        const Pincode = /^\d{6}$/;
        if (editHos?.pincode) {
            if (!Pincode.test(editHos?.pincode)) {
                setErrors({ ...Errors, pincode: "Not a valid 6-digit number" })
                seteditHos(prevState => {
                    const newState = { ...prevState };
                    delete newState.location;
                    return newState;
                });
            } else {
                setErrors({ ...Errors, pincode: "" })
            }
        }

    }

    const openModal = (data) => {
        if (data?.speciality) {
            if (editHos?.type) {
                setModalOpen({ speciality: true })
            } else {
                toast.info("Please select type")
            }
        } else {
            setModalOpen({ feature: true })
        }
    }
    const CloseModal = () => {
        setModalOpen({ speciality: false, feature: false })
        setModalOpen()
    }
    const PinCodeCheck = () => {
        if (!editHos?.pincode) {
            toast.info("Please input your pincode")
        }
    }
    const handleKeyPress = (event) => {
        // Check if the pressed key is '.' or '-'
        if (event?.key === '.' || event?.key === '-' || event?.key === 'e' || event?.key === '+' || event?.key === 'E') {
            // Prevent the default behavior for these keys
            event.preventDefault();
        }
    };
    console.log("editHos>>>>", editHos)
    // const handleFileChange = (event) => {
    //     const FilterImg = editHos?.subImages?.filter(ele => ele?.name === event?.target?.files[0]?.name)
    //     if (!FilterImg?.length > 0) {
    //         const selectedFile = event.target?.files[0];
    //         if (selectedFile) {
    //             const isImage = selectedFile.type.startsWith("image/");
    //             if (isImage) {
    //                 seteditHos({ ...editHos, subImages: [...(editHos?.subImages || []), selectedFile] });
    //             } else {
    //                 alert("Please select a valid image file.");
    //                 event.target.value = null;
    //             }
    //         } else {
    //         }
    //     } else {
    //         toast.info("Already image selected")
    //     }
    // };
    // const imageSplicerFn = (index) => {
    //     let images = editHos?.subImages
    //     images?.splice(index, 1)
    //     seteditHos({ ...editHos, subImages: images })

    // }
    console.log("speciality>>>", speciality, "speciality edithos>>>>", editHos?.speciality)
    return (
        <>
            <div>
                {loader ? <Loader /> : ""}
                <ToastContainer />

                <div className='hospitaladminregistration2 flex'>

                    <h1>Hospital Registration</h1>


                    <div className='hospital-second-section flex'>

                        <div>
                            <h4>Type</h4>
                            <select
                                type="text"
                                onChange={inputChanges}
                                value={editHos?.type ? editHos?.type : ''}
                                name="type"
                                className="hospitalRegTypeList"
                            >
                                <option
                                    disabled selected value=''
                                >
                                    Select Type
                                </option>
                                {type.map((types, index) => (
                                    <option style={{ color: "black" }}
                                        key={index}
                                        value={types}>
                                        {types}
                                    </option>
                                ))}
                            </select>


                        </div>



                        <div>
                            <div className='name-progrss flex'>
                                <h4>Specialities </h4>
                                <h4>{`${editHos?.speciality?.length ? editHos?.speciality?.length : 0}/${speciality?.length}`}</h4>
                            </div>
                            <button type='button' onClick={() => { openModal({ speciality: true }) }} className='hospital-second-section-Div flex'>{editHos?.speciality?.length > 0 ?
                                <div className='hospital-second-section-Div-Map'>
                                    {editHos?.speciality?.map((ele, index) =>
                                        <h4>{ele}{index + 1 === editHos?.speciality?.length ? '' : ","}&nbsp; </h4>
                                    )}
                                </div>
                                : <h4>Select Specialities</h4>}
                            </button>
                        </div>

                        <div> <div className='name-progrss flex'>
                            <h4>feature</h4>
                            <h4> {`${editHos?.feature?.length ? editHos?.feature?.length : 0}/${feature?.length}`}</h4>
                        </div>
                            <button type='button' onClick={() => { openModal() }} className='hospital-second-section-Div flex'> {editHos?.feature?.length > 0 ?
                                <div className='hospital-second-section-Div-Map'>
                                    {editHos?.feature?.map((ele, index) =>
                                        <h4>{ele}{index + 1 === editHos?.feature?.length ? '' : ","}&nbsp; </h4>
                                    )}
                                </div>
                                : <h4>Select features</h4>}</button>
                        </div>




                    </div>





                    <div className='hospitaladminregistration_second flex' >
                        <div className='License'>
                            <h4>License Number</h4>
                            <input autoComplete="off" value={editHos?.licence_no || ''} onChange={inputChanges} type="text" maxLength={30} name='lisence_no' />
                        </div>


                        <div className='flex pin-lo'>
                            <div className='pin-input' >
                                <h4>Pincode</h4>
                                <input autoComplete="off"
                                    onKeyDown={handleKeyPress}
                                    value={editHos?.pincode}
                                    onChange={handlePostChange}
                                    type="number" name="pincode"
                                    style={{ border: Errors?.pincode && '2px solid red' }}
                                />
                                <div className="main-waring-section main-waring-section4 flex ">
                                    <p className="register-number-warning">{Errors?.pincode}</p>
                                </div>
                            </div>
                            <div className='lo-input'>
                                <h4>Place</h4>
                                <select
                                    type="text"
                                    onChange={inputChanges}
                                    onClick={PinCodeCheck}
                                    value={editHos?.place ? editHos?.place : ''}
                                    name="place"
                                    className="hospitalRegTypeList"
                                    disabled={editHos?.location?.length > 0 ? false : true}
                                >
                                    <>
                                        <option
                                            disabled selected value=''
                                        >
                                            Select place
                                        </option>
                                        {editHos?.location?.map((types, index) => (
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










                    </div>
                    <div className='flex hospital-adress-about'>

                        <div className=''>
                            <h4>About</h4>
                            <textarea value={editHos?.about || ''} onChange={inputChanges} name="about" id="" cols="30" rows="10"></textarea>
                        </div>

                        <div>
                            <h4>Address</h4>
                            <textarea value={editHos?.address || ''} onChange={inputChanges} name="address" id="" cols="30" rows="5"></textarea>
                        </div>

                    </div>




                    <div className='ho_ad_re_button flex'>
                        <button onClick={(event) => {
                            event.preventDefault();
                            navigate(-1);
                        }} >Back</button>
                        <button type='button' onClick={Finish} >Finish</button>
                    </div>
                    <Modal className='Features_card_ho_Modal' open={ModalOpen?.feature || ModalOpen?.speciality}
                        onClose={CloseModal}
                    >
                        <>
                            <div className='Features_card_ho_ad flex'>



                                <div className='Features_card_ho_ad_check '>
                                    {ModalOpen?.feature ?
                                        feature.map((ele) =>
                                            <label class="form-control flex">
                                                <input autoComplete="off" value={ele?.name || ''}
                                                    checked={editHos?.feature?.includes(ele.name)}
                                                    onChange={(e) => { storeArray(e, { feature: true }) }} type="checkbox" name="checkbox" />
                                                <h4 className='select-new'>{ele.name}</h4>
                                            </label>
                                        )
                                        :
                                        speciality.map((ele) =>
                                            <label class="form-control flex">
                                                <input autoComplete="off" value={ele || ''}
                                                    checked={editHos?.speciality?.includes(ele)}
                                                    onChange={(e) => { storeArray(e, { speciality: true }) }} type="checkbox" name="checkbox" />
                                                <h4 className='select-new'>{ele}</h4>
                                            </label>
                                        )
                                    }
                                </div>



                                <button onClick={CloseModal} className='feature_card_ho_ad_button'><h4>Submit</h4></button>
                            </div>
                        </>
                    </Modal>
                </div>
            </div >
        </>
    )
}
