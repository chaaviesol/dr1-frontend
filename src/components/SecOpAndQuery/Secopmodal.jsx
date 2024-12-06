import React, { useState, useEffect, useContext } from "react";
import "../../pages/Services/services.css";
import { toast } from "react-toastify";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Loader } from "../../components/Loader/Loader";
import { BASE_URL, PHARMACY_URL } from "../../config";
import { axiosPrivate } from "../../api/PrivateAxios/axios";
import { MyContext } from "../../contexts/Contexts";
import {
  CircularProgress,
  FormControlLabel,
  IconButton,
  Modal,
} from "@mui/material";
import { Close } from "@mui/icons-material";
export default function Secopmodal({ isModalOpen, setIsModalOpen }) {
  const [isModalall, setIsModalAll] = useState({
    all: false,
    options: false,
    query: false,
    secop: false,
    secop2: false,
  });
  const { Categories } = useContext(MyContext);
  const { auth } = useAuth();
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [formData, setFormData] = useState({
    patient_name: "",
    doctor_name: "",
    contact_no: "",
    image: [],
    remarks: "",
    department: selectedDepartment,
  });
  const [querydata, Setquerydata] = useState({
    department: "",
    query: "",
  });
  const [errors, setErrors] = useState({});
  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);

  ///////for second opinion modal////////
  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
  };

  const handleNext = () => {
    if (!selectedDepartment || selectedDepartment === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        department: "Select a department!",
      }));
    
      return;
    }
    if (selectedDepartment) {
      setIsModalAll({ ...isModalall, secop2: true, secop: false });
    }

    fetchContactNumber();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    const updateFormData = (newValue) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: newValue,
      }));
    };

    if (name === "contact_no") {
      const sanitizedValue = value.replace(/[.-]/g, "");
      const truncatedValue = sanitizedValue.slice(0, 10);
      updateFormData(truncatedValue);
    } else {
      updateFormData(value);
    }
  };
  const handlequerychange = (e) => {
    const { name, value } = e.target;
    Setquerydata((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const maxSizeInMB = 10;
    const maxFiles = 5;
    const validFiles = [];
    const newErrors = {};
    // Check if the total number of files exceeds the limit
    if (formData.image.length + newFiles.length > maxFiles) {
      newErrors.image = `You can upload a maximum of ${maxFiles} files.`;
    }

    newFiles.forEach((file) => {
      if (file.size > maxSizeInMB * 1024 * 1024) {
        newErrors.image = `Max file size is 10Mb`;
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

    setFormData((prevFormData) => ({
      ...prevFormData,
      image: [...prevFormData.image, ...validFiles],
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
      submissionData.append("remarks", formData.remarks);
      submissionData.append("department", selectedDepartment);

      formData.image.forEach((image, index) => {
        submissionData.append("images", image);
      });

      for (let pair of submissionData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const response = await axiosPrivate.post(
        `${BASE_URL}/secondop/addreport`,
        submissionData
      );
      if (response.status === 200) {
        setLoader(false);
        toast.success("Details submitted successfully!", {
          autoClose: 3000,
        });
        setChecked(false);
        setIsModalOpen(false);
        setFormData({
          patient_name: "",
          doctor_name: "",
          contact_no: "",
          image: [],
          department: "",
          remarks: "",
        });

        setIsModalAll({
          all: false,
          options: false,
          query: false,
          secop: false,
          secop2: false,
        });
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

  const handleClose = () => {
    setIsModalOpen(false);
    setIsModalAll({
      secop: false,
      secop2: false,
      all: false,
      options: false,
      query: false,
    });
    setFormData({
      patient_name: "",
      doctor_name: "",
      contact_no: "",
      image: [],
      department: "",
      remarks: "",
    });
    setSelectedDepartment("");
  };

  useEffect(() => {
    setIsModalAll({ ...isModalall, all: isModalOpen, options: true });
  }, [isModalOpen]);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const fetchContactNumber = async () => {
    try {
      const response = await axiosPrivate.post(`${PHARMACY_URL}/user/getprofile`);
      console.log("resp", response.data);
      const contact_no = parseInt(response?.data?.userDetails?.phone_no);
      setFormData({
        contact_no: contact_no,
        patient_name: "",
        doctor_name: "",
        image: [],
        department: selectedDepartment,
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (auth.userId && auth.userType === "customer") {
      fetchContactNumber();
    }
  }, []);

  const handlequerySubmit = async () => {
    const newErrors = {};
    if (!querydata.department || querydata.department === "") {
      newErrors.department = "Discipline is missing";
      // toast.info("Discipline is missing");
      // return;
    }
    if (!querydata.query) {
      newErrors.query = "Please enter your queries.";
      // toast.error("Please enter your queries.");
      // return;
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoader(true);

      const response = await axiosPrivate.post(
        `${BASE_URL}/secondop/addquery`,
        querydata
      );
      if (response.status === 200) {
        setLoader(false);
        toast.success("Details submitted successfully!", {
          autoClose: 3000,
        });
        setChecked(false);
        Setquerydata({
          query: "",
          department: "",
        });
        setIsModalOpen(false);

        setIsModalAll({
          all: false,
          options: false,
          query: false,
          secop: false,
          secop2: false,
        });
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
    <div>
      <Modal open={isModalall.all} onClose={handleClose}>
        <>
          {isModalall.options && (
            <div className="expertopinionfirstmodal">
              <button
                onClick={handleClose}
                className="flex closeexpertopinionfirstmodal"
              >
                <i className="ri-close-line"></i>
              </button>

              <div className="secoptitle2">
                <h2>We help you clear your medical doubts</h2>
                <h4>Select an option based on your purpose</h4>
              </div>

              <div
                className="askaquestion flex"
                onClick={() => {
                  setIsModalAll({
                    ...isModalall,
                    query: true,
                    options: false,
                    secop: false,
                  });
                  setErrors("");
                }}
              >
                <div className="askaquestionlogosection flex">
                  <div className="askaquestionlogo flex">
                    <i className="ri-chat-smile-line"></i>
                  </div>
                </div>
                <div className="askaquestiondata">
                  <h3>Ask a question</h3>

                  <p className="modalpara">
                    You can ask any medical-related questions and receive expert
                    answers from experienced doctors on our site. We also post
                    these questions and answers in our community section
                  </p>
                </div>
              </div>

              <div className="askaquestion asksecondopinion flex">
                <div className="askaquestionlogosection flex">
                  <div
                    className="askaquestionlogo flex"
                    style={{ backgroundColor: "#28992D" }}
                  >
                    <i className="ri-nurse-line"></i>
                  </div>
                </div>
                <div
                  className="askaquestiondata"
                  onClick={() => {
                    setIsModalAll({
                      ...isModalall,
                      secop: true,
                      options: false,
                      query: false,
                    });
                    setErrors("");
                  }}
                >
                  <h3 style={{ color: "white" }}>Get a Second Opinion</h3>

                  <p className="modalpara">
                    Not satisfied with your current doctor's report? We will
                    help you get a second opinion. You can upload your report
                    and get the best opinion from our experts
                  </p>
                </div>
              </div>
            </div>
          )}
          {isModalall.secop && (
            <div className="modalContainer3">
              <div className="secoptitle2">
                <div className="flex querytopsec">
                  <button
                    onClick={() => {
                      setIsModalAll({
                        ...isModalall,
                        query: false,
                        options: true,
                        secop: false,
                      });
                    }}
                  >
                    <i className="ri-arrow-left-line"></i>
                  </button>
                  <h3>We help you to get a second opinion</h3>
                </div>
                {/* <h4>Select Discipline</h4> */}
              </div>
              <div className="closeButtonmodal2" onClick={handleClose}>
                <IconButton className="closeButtonmodal2">
                  <Close />
                </IconButton>
              </div>

              <div
                style={{ justifyContent: "space-between", marginTop: "2vw" }}
                className="flex"
              >
                <div className="secopimg2 flex">
                  <img src="/images/mobile/secop.png" alt="" />
                </div>

                <div className="secopdipartment2">
                  <h3>Select Discipline</h3>
                  <div
                    className={`secopdipartmentoption flex ${
                      selectedDepartment === "Cardiology"
                        ? "secopdipartmentoptionselected"
                        : ""
                    }`}
                    onClick={() => handleDepartmentSelect("Cardiology")}
                  >
                    <h4>Cardiology</h4>
                  </div>

                  <div
                    className={`secopdipartmentoption flex ${
                      selectedDepartment === "Oncology"
                        ? "secopdipartmentoptionselected"
                        : ""
                    }`}
                    onClick={() => handleDepartmentSelect("Oncology")}
                  >
                    <h4>Oncology</h4>
                  </div>

                  <div
                    className={`secopdipartmentoption flex ${
                      selectedDepartment === "Orthopedician"
                        ? "secopdipartmentoptionselected"
                        : ""
                    }`}
                    onClick={() => handleDepartmentSelect("Orthopedician")}
                  >
                    <h4>Orthopedician</h4>
                  </div>

                  <div
                    className={`secopdipartmentoption flex ${
                      selectedDepartment === "Pediatrician"
                        ? "secopdipartmentoptionselected"
                        : ""
                    }`}
                    onClick={() => handleDepartmentSelect("Pediatrician")}
                  >
                    <h4>Pediatrician</h4>
                  </div>

                  {errors.department && (
                    <p
                      style={{ color: "red", fontSize: "0.9rem" }}
                      className="error-message"
                    >
                      {errors.department}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex secopdipartmentbuttonsec">
                <button
                  className="secopdipartmentbutton flex"
                  onClick={handleNext}
                >
                  <i className="ri-arrow-right-s-line"></i>
                </button>
              </div>
            </div>
          )}
          {isModalall.secop2 && (
            <div className="modalContainer4">
              {loader ? <Loader /> : ""}
              <div className="secoptitle2">
                <h2>Add your details</h2>
                <h4>Complete required field</h4>
              </div>
              <div className="closeButtonmodal2" onClick={handleClose}>
                <IconButton className="closeButtonmodal2">
                  <Close />
                </IconButton>
              </div>

              <div className="secopform">
                <div className="secopform1 flex">
                  <div className="secopforminpt">
                    <h4>Upload Report</h4>
                    <div className=" secopforminptupload">
                      <input
                        type="text"
                        value={formData.image
                          .map((file) => file.name)
                          .join(", ")}
                        readOnly
                        style={{ overflow: "auto" }}
                      />
                      <label
                        htmlFor="fileInput"
                        className="secondopinionreport-uploadbtn"
                      >
                        Upload
                      </label>
                      <input
                        type="file"
                        id="fileInput"
                        onChange={handleFileChange}
                        multiple
                        style={{ display: "none" }}
                      />

                      {/* // <button>Upload</button> */}
                    </div>
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
                  </div>

                  <div className="secopforminpt">
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
                </div>

                <div className="secopform1 flex">
                  <div className="secopforminpt">
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

                  <div className="secopforminpt">
                    <h4>Contact Number</h4>
                    <input
                      onKeyDown={handleKeyPress}
                      type="number"
                      name="contact_no"
                      value={formData.contact_no}
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
                </div>
                <div className="secopform1">
                  <div className="secopinput">
                    <textarea
                      name="remarks"
                      placeholder="Enter your queries"
                      value={formData?.remarks}
                      id=""
                      style={{ maxHeight: "200px" }}
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
                </div>
              </div>
              <div
                className="consentSectionmodal"
                style={{ display: "flex", alignItems: "center" }}
              >
                <FormControlLabel
                  checked={checked}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "16px",
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

              <div className="flex secopdipartmentbuttonsec">
                <button className="secopformbutton flex" onClick={handleSubmit}>
                  <i className="ri-send-plane-fill"></i>
                  <h4>Submit</h4>
                </button>
              </div>
            </div>
          )}
          {isModalall.query && (
            <div className="queryform">
              <div className="flex querytopsec">
                <button
                  onClick={() => {
                    setIsModalAll({
                      ...isModalall,
                      query: false,
                      options: true,
                      secop: false,
                    });
                  }}
                >
                  <i className="ri-arrow-left-line"></i>
                </button>
                <h3>Get Your Answer Now</h3>
              </div>

              <h4>Select Your Discipline</h4>
              <select
                className="department-select"
                value={querydata.department}
                onChange={handlequerychange}
                name="department"
              >
                <option value="" disabled selected>
                  Select Your Discipline
                </option>
                {Categories.allopathySpecs.map((department, index) => (
                  <option key={index} value={department}>
                    {department}
                  </option>
                ))}
                <option value="Not Sure">Not Sure</option>
              </select>
              {errors.department && (
                <p
                  style={{ color: "red", fontSize: "0.9rem" }}
                  className="error-message"
                >
                  {errors.department}
                </p>
              )}
              <h4 style={{ marginTop: "1vw" }}>What is Your Query</h4>
              <textarea
                className="pharmacypara"
                name="query"
                value={querydata.query}
                maxLength={5000}
                onChange={handlequerychange}
                placeholder="Type your query here"
              ></textarea>
              {errors.query && (
                <p
                  style={{ color: "red", fontSize: "0.9rem" }}
                  className="error-message"
                >
                  {errors.query}
                </p>
              )}
              <button onClick={handlequerySubmit} className="queryformbutton">
                {loader ? (
                  <CircularProgress sx={{ color: "white" }} size="1.5rem" />
                ) : (
                  <h4>Submit</h4>
                )}
              </button>
              <button
                onClick={handleClose}
                className="flex closeexpertopinionfirstmodal"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
          )}
        </>
      </Modal>
    </div>
  );
}
