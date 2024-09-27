import React, { useContext, useEffect, useState } from "react";
import "../../../Hospitaladmin/hospitaladminregistration1.css";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer, toast } from "react-toastify";

import { MyContext } from "../../../../contexts/Contexts";

export default function LabEdit1() {
  const navigate = useNavigate();
  const { LabAdminRg, setLabAdminRg } = useContext(MyContext);
  const [Errors, setErrors] = useState({});
  const handleFileChange = (event) => {
    const selectedFile = event.target?.files[0];
    if (selectedFile) {
      const isImage = selectedFile.type.startsWith("image/");
      if (isImage) {
        setLabAdminRg({ ...LabAdminRg, image: [selectedFile] });
      } else {
        alert("Please select a valid image file.");
        event.target.value = null;
      }
    }
  };
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
  };

  // add data to state

  const inputOnchanges = (e) => {
    const { value, name } = e.target;
    if (name === "phone_no") {
      const sanitizedValue = value.replace(/[.-]/g, "");
      const truncatedValue = sanitizedValue.slice(0, 10);
      setLabAdminRg({ ...LabAdminRg, [name]: truncatedValue });
    } else if (name === "name") {
      const filteredValue = value.replace(/[0-9]/g, "");
      setLabAdminRg({ ...LabAdminRg, [name]: filteredValue });
    } else {
      setLabAdminRg({ ...LabAdminRg, [name]: value });
    }
  };

  useEffect(() => {
    checkErrors();
  }, [LabAdminRg]);
  console.log(LabAdminRg);
  const nextPage = () => {
    const validData =
      !LabAdminRg?.name || !LabAdminRg?.phone_no || !LabAdminRg?.email;

    const errorCheck = Errors.email || Errors.phone;
    if (!validData) {
      if (!errorCheck) {
        navigate("/mainadminlabeditlab2");
      }
    } else {
      toastifyFun("All fields are required");
    }
    return checkErrors();
  };
  const checkErrors = () => {
    const errors = {};
    const EmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PhonePattern = /^[6-9]\d{9}$/;

    if (LabAdminRg?.email && !EmailPattern.test(LabAdminRg.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (LabAdminRg?.phone_no && !PhonePattern.test(LabAdminRg.phone_no)) {
      errors.phone = "Please enter a valid phone number.";
    }

    setErrors(errors);
  };
  const handleKeyPress = (event) => {
    // Check if the pressed key is '.' or '-'
    if (
      event?.key === "." ||
      event?.key === "-" ||
      event?.key === "e" ||
      event?.key === "+" ||
      event?.key === "E"
    ) {
      // Prevent the default behavior for these keys
      event.preventDefault();
    }
  };
  return (
    <div>
      <ToastContainer />
      <div>
        <div className="main-register flex">
          <div className="register-png-div">
            <img src="images/Group 72.png" alt="" />
          </div>
          <div className="registration-form">
            <div>
              <h1 style={{ color: "white" }}>Laboratory Registration</h1>
            </div>
            {/* <label className="photo-upload">
             <h4>Upload Photo</h4>
                <input  autoComplete="off"type="file" />  
             </div> */}

            {/* <div id="hospitalname_inputId" className="hospitalname_input">
              <h4>Laboratory Name</h4>
              <input  autoComplete="off"value={LabAdminRg?.name} onChange={inputOnchanges} name="name" type="text" />
           
              <div className="main-waring-section">
              </div>
            </div> */}

            <div className="flex hospital-top">
           

              {/* <label className="photo-upload">
 <h4>Upload Photo</h4>
    <input  autoComplete="off"type="file" />
 </div> */}

              <div className="hospitalname_input" style={{width:"100%"}}>
                <h4 className="">Laboratory Name</h4>
                <input
                  autoComplete="off"
                  style={{width:"100%"}}
                  maxLength={100}
                  value={LabAdminRg?.name}
                  onChange={inputOnchanges}
                  name="name"
                  type="text"
                />
              </div>
            </div>

            <div className="main-waring-section" style={{ overflow: "Hidden" }}>
              <h4 className="register-number-warning" id="fileNameDisplay">
                {" "}
              </h4>
            </div>

            <div className="register-input-section">
              <div className=" register-left-section flex">
                <div style={{ position: "relative" }}>
                  <h4 className="">Phone Number</h4>
                  <input
                    autoComplete="off"
                    value={LabAdminRg?.phone_no}
                    onChange={inputOnchanges}
                    name="phone_no"
                    type="number"
                    style={{ border: Errors?.phone && "2px solid red" }}
                  />
                  <div className="main-waring-section">
                    {/* <p className="register-number-warning">{Errors?.phone}</p> */}
                  </div>
                </div>

                <div style={{ position: "relative" }}>
                  <h4 className="">Email</h4>
                  <input
                    autoComplete="off"
                    maxLength={50}
                    value={LabAdminRg?.email}
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    name="email"
                    onChange={inputOnchanges}
                    type="email"
                    style={{ border: Errors?.email && "2px solid red" }}
                  />
                  <div className="main-waring-section">
                    <p className="register-number-warning">{Errors?.email}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="register-button-section flex">
              <button
                type="button"
                onClick={() => {
                  nextPage();
                }}
                className="flex"
                style={{ cursor: "pointer" }}
              >
                <h4>Next</h4>
              </button>
            </div>
          </div>
          <div className="register-png-div2 register-png-div flex">
            <img src="images/Group 73.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
