import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "../mainadmindoctordetails.css";
import { MyContext } from "../../../../contexts/Contexts";
const MainAdminDoctorEditBasic = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const [fileName, setFileName] = useState("No file selected");
    const { editDoc, seteditDoc } = useContext(MyContext);
    const [validationErrors, setValidationErrors] = useState({});

    // console.log("validationErrors", validationErrors);
    const handleFileChange = (event) => {
        const selectedFile = event.target?.files[0];

        if (selectedFile) {
            const isImage = selectedFile.type.startsWith("image/");
            if (isImage) {
                setFileName(selectedFile);
                seteditDoc({ ...editDoc, image: selectedFile.name, docImage: selectedFile });
                // Process the image file or perform additional actions if needed
            } else {
                alert("Please select a valid image file.");
                // Optionally, you can clear the file input
                event.target.value = null;
            }
        }
    };


    console.log("ValidationErrors>>>", validationErrors)
    const handleChange = (e) => {
        const { name, value } = e?.target;
        if ((name === "phone_no") & (value.toString().length > 10)) {
            seteditDoc({
                ...editDoc,
                [name]: editDoc.phone_no,
            });
            return;
        } else if (name === "second_name" || name === "name") {
            seteditDoc({
                ...editDoc,
                [name]: value,
            });
            const filteredValue = value.replace(/[0-9]/g, '');
            seteditDoc({ ...editDoc, [name]: filteredValue });
        } else {
            seteditDoc({ ...editDoc, [name]: value });
        }



        setValidationErrors({ ...validationErrors, [e.target.name]: "" });



        if (name === "email") {
            if (!validateEmail(value)) {
                setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "Please enter a valid email address.",
                }));
            } else {
                setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "",
                }));
            }
        }

        if (name === "phone_no") {
            if (/^\d{10}$/.test(value) === false) {
                setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "Please enter a valid 10 digit number",
                }));
            } else {
                setValidationErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "",
                }));
            }
        }
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    console.log(editDoc, editDoc)
    const handleClick = () => {
        const isInValid =
            (!editDoc.name) ||
            (!editDoc.second_name) ||
            (!editDoc.phone_no) ||
            (!editDoc.email)

        const isValidationError =
            validationErrors.confirmPassword ||
            validationErrors.email ||
            validationErrors.password ||
            validationErrors.phone_no;

        if (isInValid) {
            toast.info("All fields required");
        } else if (isValidationError) {
            if (validationErrors.password) {
                toast.info("Please check password");
            } else {
                toast.info(isValidationError);
            }
        } else {
            navigate("/mainadmindoctorEditFinal", { state: editDoc });
        }
        // navigate("/mainadmindoctorEditFinal", { state: editDoc });

    };
    const handleKeyPress = (event) => {
        // Check if the pressed key is '.' or '-'
        if (event?.key === '.' || event?.key === '-' || event?.key === 'e' || event?.key === '+' || event?.key === 'E') {
            // Prevent the default behavior for these keys
            event.preventDefault();
        }
    };

    useEffect(() => {
        seteditDoc(location?.state?.data)
    }, [])



    return (
        <>
            <div>
                <div>


                    <div className="main-register flex">
                        <div className="register-png-div">
                            <img src="images/Group 72.png" alt="" />
                        </div>

                        <div className="registration-form">
                            <div className="do-title">
                                <h1 style={{ color: "white" }}>Doctor Edit</h1>
                            </div>

                            <div className="register-input-section">
                                <div className="register-left-section flex">
                                    <div>
                                        <h4>First Name</h4>
                                        <input
                                            type="text"
                                            name="name"
                                            autoComplete="off"
                                            value={editDoc?.name}
                                            maxLength={100}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <h4>Second Name</h4>
                                        <input
                                            type="text"
                                            name="second_name"
                                            autoComplete="off"
                                            value={editDoc?.second_name}
                                            maxLength={50}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="register-right-section flex">
                                    <div>
                                        <h4> Phone Number</h4>
                                        <input
                                            type="number"
                                            maxLength={10}
                                            name="phone_no"
                                            autoComplete="off"
                                            onKeyPress={handleKeyPress}
                                            value={editDoc?.phone_no}
                                            onChange={handleChange}
                                            style={{
                                                border: validationErrors?.phone ? "2px solid red" : ''
                                            }}
                                        />
                                        <div className="main-waring-section  main-waring-section4 ">
                                            {/* {validationErrors.phone && (
                      <p className="register-number-warning">
                        {validationErrors.phone}
                      </p>
                    )} */}
                                        </div>{" "}
                                    </div>

                                    <div style={{ position: "relative" }}>
                                        <h4>Email</h4>
                                        <input
                                            type="email"
                                            name="email"
                                            maxLength={50}
                                            value={editDoc?.email}
                                            autoComplete="off"
                                            onChange={handleChange}
                                            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                                            style={{
                                                border: validationErrors?.email ? "2px solid red" : ''
                                            }}
                                        />
                                        {validationErrors.email && (
                                            <p className="register-number-warning">
                                                {validationErrors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                            </div>

                            <div className="register-button-section flex">
                                <button
                                    tabIndex={0}
                                    className="flex"
                                    onClick={handleClick}
                                    style={{ cursor: "pointer" }}
                                >
                                    Next
                                </button>
                            </div>
                        </div>

                        <div className="register-png-div2 register-png-div flex">
                            <img src="images/Group 73.png" alt="" />
                        </div>
                    </div>

                </div>
                <ToastContainer />
            </div>

        </>
    )
}

export default MainAdminDoctorEditBasic