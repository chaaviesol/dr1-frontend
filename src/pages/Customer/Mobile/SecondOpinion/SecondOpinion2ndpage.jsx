import { FormControlLabel } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Loader } from "../../../../components/Loader/Loader";
import "react-toastify/dist/ReactToastify.css";
import "./secondopinion.css";
import { BASE_URL, PHARMACY_URL } from "../../../../config";

import Checkbox from "@mui/material/Checkbox";
import { axiosPrivate } from "../../../../api/PrivateAxios/axios";
export default function SecondOpinion2ndpage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { department } = location.state || {};
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    patient_name: "",
    doctor_name: "",
    contact_no: "",
    image: [],
    department: department,
    remarks: "",
  });
  const [errors, setErrors] = useState({});
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target?.files || []);
    const maxSizeInMB = 10;
    const maxFiles = 5;
    const validFiles = [];
    const invalidFiles = [];
    const newErrors = {};
  
    // Safely check existing files
    const existingFiles = formData?.image || [];
  
    // Check if the total number of files exceeds the limit
    if (existingFiles.length + newFiles.length > maxFiles) {
      newErrors.image = `You can upload a maximum of ${maxFiles} files.`;
    }
  
    newFiles.forEach((file) => {
      if (file.size > maxSizeInMB * 1024 * 1024) {

        invalidFiles.push(`${file.name} exceeds ${maxSizeInMB}MB.`);
      } else {
        validFiles.push(file);
      }
    });
 
    if (Object.keys(newErrors).length > 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...newErrors,
      }));
      return;
    }
  
    if (invalidFiles.length > 0) {
      toast.error(`Error: ${invalidFiles.join(" ")}`);
    }
  
    if (validFiles.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: [...existingFiles, ...validFiles],
      }));
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "contact_no" && value.length > 10) {
      return;
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!formData.patient_name || formData.patient_name === "") {
      newErrors.patient_name = "Patient Name is missing";
    }
    if (!formData.doctor_name) {
      newErrors.doctor_name = "Doctor Name is missing";
    }
    if (!formData.contact_no) {
      newErrors.contact_no = "Contact Number is missing";
    }
    if (!/^[6-9]\d{9}$/.test(formData.contact_no)) {
      newErrors.contact_no = "Invalid Contact Number.";
    }
    if (formData.image.length === 0) {
      newErrors.imagelength = "Please attach at least one report.";
    }
    if (!formData.remarks) {
      newErrors.remarks = "Please enter your query";
    }
    if (!checked) {
      newErrors.checked = "Please provide your consent to be contacted.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoader(true);
      const submissionData = new FormData();
      submissionData.append("patient_name", formData.patient_name);
      submissionData.append("doctor_name", formData.doctor_name);
      submissionData.append("contact_no", formData.contact_no);
      submissionData.append("department", formData.department);
      submissionData.append("remarks", formData.remarks);

      formData.image.forEach((image, index) => {
        submissionData.append("images", image);
      });

      console.log("FormData entries:");
      for (let pair of submissionData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const response = await axiosPrivate.post(
        `${BASE_URL}/secondop/addreport`,
        submissionData
      );
      if (response.status === 200) {
        toast.success("Details submitted successfully!", {
          autoClose: 3000,
        });
        setTimeout(() => {
          setFormData({
            patient_name: "",
            doctor_name: "",
            contact_no: "",
            image: [],
            department: "",
            remarks: "",
          });
          setLoader(false);
          navigate("/");
        }, 3000);
      } else if (response.status === 400) {
        toast.error(response.data.message);
        setLoader(false);
      } else {
        toast.error("Failed to submit details.");
        setLoader(false);
      }
    } catch (error) {
      toast.error("An error occurred while submitting the details.");
      setLoader(false);
    }
  };
  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };
  // useEffect(() => {
  //   const fetchContactNumber = async () => {
  //     try {
  //       const response = await axiosPrivate.post(`${PHARMACY_URL}/user/getprofile`);
  //       const contact_no = parseInt(response?.data?.userDetails?.phone_no);

  //       setFormData({
  //         contact_no: contact_no,
  //         patient_name: "",
  //         doctor_name: "",
  //         image: [],
  //         department: department,
         
  //       });
  //     } catch (err) {
  //       console.error("Error fetching contact number:", err);
  //     }
  //   };

  //   fetchContactNumber();
  // }, []);
  const handleClose = () => {
    setFormData({
      patient_name: "",
      doctor_name: "",
      contact_no: "",
      image: [],
      department: "",
    });
    navigate(-1);
  };
  const handleKeyPress = (event) => {
    if (
      event?.key === "." ||
      event?.key === "-" ||
      event?.key === "e" ||
      event?.key === "+" ||
      event?.key === "E"
    ) {
      event.preventDefault();
    }
  };
  return (
    <div className="secop2">
      {loader ? <Loader /> : ""}
      <ToastContainer />
      <div className="mobcontainer">
        <div className="backbuttonsecondopinion" onClick={handleClose}>
          <i class="ri-arrow-left-line"></i>
        </div>
        <div className="secoptitle">
          <h2>Add your details</h2>
          <h4>Complete required field</h4>
        </div>
        {/* <button className="closeButtoncross2" onClick={handleClose}>
          &times;
        </button> */}
        <div className="secopinput">
          <h4>Upload Report</h4>
          <label
            style={{ marginTop: "15px" }}
            htmlFor="fileInput"
            className="upload-buttonsecond"
          >
            <h4>Upload (Max 5 Files)</h4>
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            multiple
            style={{ display: "none" }}
          />
          {formData?.image?.length > 0
            ? errors.image && (
                <p
                  style={{ color: "red", fontSize: "0.9rem" }}
                  className="error-message"
                >
                  {errors.image}
                </p>
              )
            : errors.imagelength && (
                <p
                  style={{ color: "red", fontSize: "0.9rem" }}
                  className="error-message"
                >
                  {errors.imagelength}
                </p>
              )}
          <div className="file-names">
            {formData?.image?.map((report, index) => (
              <h4 key={index}>{report?.name}</h4>
            ))}
          </div>
        </div>
        <div className="secopinput">
          <h4>Patient Name</h4>
          <input
            type="text"
            name="patient_name"
            value={formData.patient_name}
            onChange={handleChange}
            maxLength={40}
          />
          {errors.patient_name && (
            <p
              style={{ color: "red", fontSize: "0.9rem" }}
              className="error-message"
            >
              {errors.patient_name}
            </p>
          )}
        </div>

        <div className="secopinput">
          <h4>Doctor Name</h4>
          <input
            type="text"
            name="doctor_name"
            value={formData.doctor_name}
            onChange={handleChange}
            maxLength={40}
          />
          {errors.doctor_name && (
            <p
              style={{ color: "red", fontSize: "0.9rem" }}
              className="error-message"
            >
              {errors.doctor_name}
            </p>
          )}
        </div>

        <div className="secopinput">
          <h4>Contact Number</h4>
          <input
            onKeyDown={handleKeyPress}
            type="number"
            name="contact_no"
            value={formData?.contact_no}
            onChange={handleChange}
            maxLength={10}
          />
          {errors.contact_no && (
            <p
              style={{ color: "red", fontSize: "0.9rem" }}
              className="error-message"
            >
              {errors.contact_no}
            </p>
          )}
        </div>
        <div className="secopinput">
          <textarea
            name="remarks"
            placeholder="Enter your queries"
            value={formData?.remarks}
            style={{ maxHeight: "200px", backgroundColor: "#F3f3f8" }}
            onChange={handleChange}
            maxLength={1000}
          ></textarea>
          {errors.remarks && (
            <p
              style={{ color: "red", fontSize: "0.9rem" }}
              className="error-message"
            >
              {errors.remarks}
            </p>
          )}
        </div>

        <div className="consentSectionmodal">
          <FormControlLabel
            checked={checked}
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: "13px",
              },
              "& .MuiSvgIcon-root": {
                width: "1.2em", // Set checkbox size
                height: "1.2em", // Set checkbox size
                display: "flex",
                alignItems: "center",
                padding: "0",
                margin: "0",
              },
            }}
            control={<Checkbox onChange={handleCheckboxChange} />}
            label="I consent to be contacted regarding my submission."
          />
        </div>
        {errors.checked && (
          <p
            style={{ color: "red", fontSize: "0.9rem" }}
            className="error-message"
          >
            {errors.checked}
          </p>
        )}

        <div className="secopsubbutton">
          <button onClick={handleSubmit}>
            <h3>Submit</h3>
          </button>
        </div>
      </div>
    </div>
  );
}
