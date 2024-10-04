import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MyContext } from "../../../contexts/Contexts";
import { IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "../../Login&register/register.css";
export default function Doctoradminregistration1() {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("No file selected");
  const [showPassword, setShowPassword] = useState(false);
  const [ShowRePassword, setShowRePassword] = useState(false);
  const { Data, setData } = useContext(MyContext);
  console.log("Data===", Data);
  const [validationErrors, setValidationErrors] = useState({});

  console.log("validationErrors", validationErrors);
  const handleFileChange = (event) => {
    const selectedFile = event.target?.files[0];

    if (selectedFile) {
      const isImage = selectedFile.type.startsWith("image/");
      if (isImage) {
        setFileName(selectedFile);
        setData({ ...Data, image: selectedFile.name, docImage: selectedFile });
        // Process the image file or perform additional actions if needed
      } else {
        alert("Please select a valid image file.");
        // Optionally, you can clear the file input
        event.target.value = null;
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e?.target;  
    if ((name === "phone") & (value.toString().length > 10)) {
      setData({
        ...Data,
        [name]: Data.phone,
      });
      return;
    } else if (name === "secondname" || name === "name") {
      setData({
        ...Data,
        [name]: value,
      });
      const filteredValue = value.replace(/[0-9]/g, '');
      setData({ ...Data, [name]: filteredValue });
    } else {
      setData({ ...Data, [name]: value });
    }



    setValidationErrors({ ...validationErrors, [e.target.name]: "" });

    if (name === "password") {
      if (!validPassword(value)) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          [name]:
            "Password must be 6+ characters with an uppercase letter, digit, and special character.",
        }));
      } else if (Data.confirmPassword) {
        if (value !== Data.confirmPassword) {
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            confirmPassword: "Passwords do not match",
          }));
        } else {
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            confirmPassword: "",
          }));
        }
      } else {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }

    // Validate confirm password
    if (name === "confirmPassword" && value !== Data.password) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Passwords do not match",
      }));
    }

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

    if (name === "phone") {
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
  const validPassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&]).{6,}$/;
    return regex.test(password);
  };

  const handleClick = () => {
    const isInValid =
      !Data.name ||
      !Data.secondname ||
      !Data.phone ||
      !Data.email ||
      !Data.password ||
      !Data.confirmPassword
    // !Data.docImage;

    const isValidationError =
      validationErrors.confirmPassword ||
      validationErrors.email ||
      validationErrors.password ||
      validationErrors.phone;

    if (isInValid) {
      toast.info("All fields required");
    } else if (isValidationError) {
      if (validationErrors.password) {
        toast.info("Please check password");
      } else {
        toast.info(isValidationError);
      }
    } else {
      navigate("/doctoradminregistration2", { state: Data });
    }
  };
  const handleKeyPress = (event) => {
    // Check if the pressed key is '.' or '-'
    if (event?.key === '.' || event?.key === '-' || event?.key === 'e' || event?.key === '+' || event?.key === 'E') {
      // Prevent the default behavior for these keys
      event.preventDefault();
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRePassword = () => setShowRePassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownRePassword = (event) => {
    event.preventDefault();
  };

  console.log(Data);

  return (
    <div>
      <div>


        <div className="main-register flex">
          <div className="register-png-div">
            <img src="images/Group 72.png" alt="" />
          </div>

          <div className="registration-form">
            <div className="do-title">
              <h1 style={{ color: "white" }}>Doctor Registration</h1>
            </div>

            <div className="upload-image flex">
              <label for="inputTag">
                <h4 className="select-file flex">Upload Photo</h4>
                <input
                  onChange={handleFileChange}
                  id="inputTag"
                  type="file"
                  accept="image/*"
                />
              </label>

              <div className="fileNameDisplay-div">
                <h4 id="fileNameDisplay"> {Data?.image} </h4>
              </div>
            </div>

            {/* <label className="photo-upload">
               <h4>Upload Photo</h4>
                  <input type="file" />
               </div> */}

            <div className="register-input-section">
              <div className="register-left-section flex">
                <div>
                  <h4>First Name</h4>
                  <input
                    type="text"
                    name="name"
                    autoComplete="off"
                    value={Data?.name}
                    maxLength={100}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <h4>Second Name</h4>
                  <input
                    type="text"
                    name="secondname"
                    autoComplete="off"
                    value={Data?.secondname}
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
                    name="phone"
                    autoComplete="off"
                    onKeyPress={handleKeyPress}
                    value={Data?.phone}
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
                    <p className="register-number-warning">
                      This number will be kept confidential and shall be used for OTP verifications
                    </p>
                  </div>{" "}
                </div>

                <div style={{ position: "relative" }}>
                  <h4>Email</h4>
                  <input
                    type="email"
                    name="email"
                    maxLength={50}
                    value={Data?.email}
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

              <div className="register-right-section flex">
                <div style={{ position: "relative" }}>
                  <h4>Password</h4>
                  <div
                    style={{
                      position: "relative",
                    }}
                    className="pass-con-Inp"
                  >
                    <input
                      maxLength={50}
                      value={Data.password}
                      name="password"
                      onChange={handleChange}
                      style={{
                        margin: 0,
                        position: "absolute",
                        top: "0",
                        left: "0",
                        height: "100%",
                        width: "calc(100% - 2px)",
                        padding: "0 10px",
                        appearance: "none",
                        WebkitAppearance: "none",
                        border: validationErrors?.password ? "2px solid red" : ''
                      }}
                      type={showPassword ? "text" : "password"}
                    />

                    <IconButton
                      tabIndex={-1}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        color: "#fafaf9",
                      }}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff titleAccess="Hide password"  /> : <Visibility titleAccess="Show password"  />}
                    </IconButton>
                  </div>
                  {validationErrors.password && (
                    <div className="main-waring-section main-waring-section-pass">
                      <p className="register-number-warning">
                        {validationErrors?.password}
                      </p>
                    </div>
                  )}
                </div>
                <div style={{ position: "relative" }}>
                  <h4>Confirm Password</h4>
                  <div
                    style={{
                      position: "relative",
                    }}
                    className="pass-con-Inp"
                  >
                    <input
                      maxLength={50}
                      value={Data?.confirmPassword}
                      name="confirmPassword"
                      onChange={handleChange}
                      style={{
                        margin: 0,
                        position: "absolute",
                        top: "0",
                        left: "0",
                        height: "100%",
                        width: "calc(100% - 2px)",
                        padding: "0 10px",
                        appearance: "none",
                        WebkitAppearance: "none",
                        border: validationErrors?.confirmPassword ? "2px solid red" : ''
                      }}
                      type={ShowRePassword ? "text" : "password"}
                    />

                    <IconButton
                      tabIndex={-1}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        color: "#fafaf9",
                      }}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowRePassword}
                      onMouseDown={handleMouseDownRePassword}
                    >
                      {ShowRePassword ? <VisibilityOff titleAccess="Hide password"  /> : <Visibility titleAccess="Show password"  />}
                    </IconButton>
                  </div>
                  <div className="main-waring-section">
                    {validationErrors.confirmPassword && (
                      <p className="register-number-warning">
                        {validationErrors.confirmPassword}
                      </p>
                    )}
                  </div>
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
  );
}
