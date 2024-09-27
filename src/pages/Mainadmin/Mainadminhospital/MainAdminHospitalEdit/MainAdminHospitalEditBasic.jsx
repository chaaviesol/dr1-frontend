import React, { useContext, useEffect, useState } from "react";
import "../../../Hospitaladmin/hospitaladminregistration1.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MyContext } from "../../../../contexts/Contexts";
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer, toast } from "react-toastify";
import { IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const MainAdminHospitalEditBasic = () => {
    const [fileName, setFileName] = useState("No file selected");
    const navigate = useNavigate()
    const { editHos, seteditHos } = useContext(MyContext)
    const [Errors, setErrors] = useState({
    })


    const location = useLocation()
    const currentData = location?.state?.data

    const [showPassword, setShowPassword] = useState(false);

    const [showRePassword, setShowRePassword] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target?.files[0];

        if (selectedFile) {
            const isImage = selectedFile.type.startsWith("image/");
            if (isImage) {
                setFileName(selectedFile.name);
                seteditHos({ ...editHos, image: [selectedFile] });
            } else {
                alert("Please select a valid image file.");
                // Optionally, you can clear the file input
                event.target.value = null;
            }
        } else {
            setFileName("No file selected");
            // setLabAdminRg("No file selected");
        }
    };

    // toast
    console.log("editHos>>>>", editHos)
    const toastifyFun = (value) => {
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
    }


    useEffect(() => {
        seteditHos(currentData)
    }, [])



    // add data to state
    const inputOnchanges = (e) => {
        const { value, name } = e.target;
        if (name === "contact_no") {
            const sanitizedValue = value.replace(/[.-]/g, '');
            const truncatedValue = sanitizedValue.slice(0, 10);
            seteditHos({ ...editHos, [name]: truncatedValue });
        } else if (name === "name") {
            const filteredValue = value.replace(/[0-9]/g, '');
            seteditHos({ ...editHos, [name]: filteredValue });
        } else {
            seteditHos({ ...editHos, [name]: value });
        }
    };

    useEffect(() => {
        checkErrors()
    }, [editHos])
    const nextPage = () => {
        const validData = !editHos?.name ||
            !editHos?.contact_no ||
            !editHos?.email
        const errorCheck =
            Errors.email ||
            Errors.phone
        if (!validData) {
            if (errorCheck) {
                if (Errors?.password) {
                    toast.info("Please check password")
                } else {
                    toast.info(errorCheck)
                }
            } else {
                if (!errorCheck) {
                    navigate("/mainadminhospitalFinaledit")
                }
            }
        } else {
            toastifyFun("All fields are required")
        }
        return checkErrors()
    }
    const checkErrors = () => {
        const errors = {};
        const EmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const PhonePattern = /^[6-9]\d{9}$/;
        if (editHos?.email && !EmailPattern.test(editHos.email)) {
            errors.email = "Please enter a valid email address.";
        }

        if (editHos?.contact_no && !PhonePattern.test(editHos.contact_no)) {
            errors.phone = "Please enter a valid phone number.";
        }

        setErrors(errors);
    };
    useEffect(() => {
        const CheckField = !editHos?.name || !editHos?.email || !editHos?.contact_no
        if (CheckField) {
            // navigate("/mainadmin")
        }
    }, [])

    //  end checking
    const handleKeyPress = (event) => {
        // Check if the pressed key is '.' or '-'
        if (event?.key === '.' || event?.key === '-' || event?.key === 'e' || event?.key === '+' || event?.key === 'E') {
            // Prevent the default behavior for these keys
            event.preventDefault();
        }
    };
    console.log("editHos>>>>>", editHos)
    return (
        <>
            <div>
                <ToastContainer />
                <div>
                    <div className="main-register flex">
                        <div className="register-png-div">
                            <img src="images/Group 72.png" alt="" />
                        </div>
                        <div className="registration-form-edit">
                            <div>
                                <h1 style={{ color: "white" }}>Hospital Registration</h1>
                            </div>
                            <div className="hospitalname_input_Hospital">
                                <h4 className="">Hospital Name</h4>
                                <input autoComplete="off" maxLength={100} value={editHos?.name} onChange={inputOnchanges} name="name" type="text" />
                            </div>

                            <div className="register-input-section">


                                <div className="register-left-section flex">



                                    <div>
                                        <h4 className="pass-con">Phone Number</h4>
                                        <input autoComplete="off"
                                            onKeyPress={handleKeyPress}
                                            value={editHos?.contact_no ? editHos?.contact_no : ''}
                                            onChange={inputOnchanges} name="contact_no"
                                            type="number"
                                            style={{
                                                border: Errors?.phone ? "2px solid red" : ''
                                            }}
                                        />
                                        <div className="main-waring-section">


                                            {/* <p className="register-number-warning">{Errors?.phone}</p> */}

                                        </div>

                                    </div>


                                    <div>
                                        <h4 className="pass-con">Email</h4>
                                        <input autoComplete="off"
                                            maxLength={50} value={editHos?.email}
                                            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" name="email"
                                            onChange={inputOnchanges}
                                            type="email"
                                            style={{
                                                border: Errors?.email ? "2px solid red" : ''
                                            }}
                                        />

                                        <div className="main-waring-section">
                                            <p className="register-number-warning">{Errors?.email}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div

                                className="register-button-section flex"
                            >
                                <button onClick={() => { nextPage() }} className="flex" style={{ cursor: "pointer" }}>
                                    Next
                                </button>
                            </div>
                        </div>
                        <div className="register-png-div2 register-png-div flex">
                            <img src="images/Group 73.png" alt="" />
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
