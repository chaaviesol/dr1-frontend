import React, { useState, useEffect, useRef, useContext } from "react";
import "../../pages/Services/services.css";
import { toast } from "react-toastify";
import Checkbox from "@mui/material/Checkbox";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Loader } from "../../components/Loader/Loader";
import { BASE_URL, port } from "../../config";
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
  const { Categories, setCategories } = useContext(MyContext);
  console.log("allopathySpecs", Categories.allopathySpecs);
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [formData, setFormData] = useState({
    patient_name: "",
    doctor_name: "",
    contact_no: "",
    image: [],
    remarks:"",
    department: selectedDepartment,
  });
  const [querydata, Setquerydata] = useState({
    department: "",
    query: "",
  });
  console.log("querydataquerydata", querydata);
  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);

  ///////for second opinion modal////////
  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
  };

  const handleNext = () => {
    if (!selectedDepartment || selectedDepartment === "") {
      toast.error("Select a department!");
      return;
    }
    if (selectedDepartment) {
      setIsModalAll({ ...isModalall, secop2: true, secop: false });
    }

    fetchContactNumber();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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

    // Check if the total number of files exceeds the limit
    if (formData.image.length + newFiles.length > maxFiles) {
      toast.error(`You can upload a maximum of ${maxFiles} files.`);
      return;
    }

    newFiles.forEach((file) => {
      if (file.size > maxSizeInMB * 1024 * 1024) {
        toast.error("Max file size is 10Mb");
      } else {
        validFiles.push(file);
      }
    });

    setFormData((prevFormData) => ({
      ...prevFormData,
      image: [...prevFormData.image, ...validFiles],
    }));
  };

  const handleSubmit = async () => {
    if (!formData.patient_name || formData.patient_name === "") {
      toast.info("Patient Name is missing");
      return;
    }
    if (!formData.doctor_name) {
      toast.error("Doctor Name is missing");
      return;
    }
    if (!formData.contact_no) {
      toast.error("Contact Number is missing");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(formData.contact_no)) {
      toast.error(
        "Invalid Contact Number. It should be a valid 10-digit Indian mobile number."
      );
      return;
    }
    if (formData.image.length === 0) {
      toast.error("Please attach at least one report");
      return;
    }
    if (!formData.remarks) {
      toast.error("Please enter your query");
      return;
    }
    if (!checked) {
      toast.error("Please provide your consent to be contacted.");
      return;
    }

    try {
      setLoader(true);
      const submissionData = new FormData();
      submissionData.append("patient_name", formData.patient_name);
      submissionData.append("doctor_name", formData.doctor_name);
      submissionData.append("contact_no", formData.contact_no);
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
        setTimeout(() => {
          setFormData({
            patient_name: "",
            doctor_name: "",
            contact_no: "",
            image: [],
            department: "",
            remarks:""
          });

          setIsModalAll({ ...isModalall, secop2: false, all: false });
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
      remarks:""
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
      const response = await axiosPrivate.post(`${BASE_URL}/user/getprofile`);
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
    if (!querydata.department || querydata.department === "") {
      toast.info("Department is missing");
      return;
    }
    if (!querydata.query) {
      toast.error("Please enter your queries.");
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
        setTimeout(() => {
          Setquerydata({
            query: "",
            department: "",
          });

          setIsModalAll({
            ...isModalall,
            query: false,
            options: false,
            all: false,
          });
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

  return (
    <div>
      <Modal open={isModalall.all} onClose={() => setIsModalAll(false)}>
        <>
          {isModalall.options && (
            <div className="expertopinionfirstmodal">
              <button
                onClick={handleClose}
                className="flex closeexpertopinionfirstmodal"
              >
                <i class="ri-close-line"></i>
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
                }}
              >
                <div className="askaquestionlogosection flex">
                  <div className="askaquestionlogo flex">
                    <i class="ri-chat-smile-line"></i>
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
                    <i class="ri-nurse-line"></i>
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
                    <i class="ri-arrow-left-line"></i>
                  </button>
                  <h3>We help you to get a second opinion</h3>
                </div>
                {/* <h4>Select Department</h4> */}
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
                  <h3>Select Department</h3>
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
                </div>
              </div>

              <div className="flex secopdipartmentbuttonsec">
                <button
                  className="secopdipartmentbutton flex"
                  onClick={handleNext}
                >
                  <i class="ri-arrow-right-s-line"></i>
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
                  </div>

                  <div className="secopforminpt">
                    <h4>Contact Number</h4>
                    <input
                      type="number"
                      name="contact_no"
                      value={formData.contact_no}
                      onChange={handleChange}
                      maxLength={10}
                    />
                  </div>
                </div>
                <div className="secopform1">
                  <div className="secopinput">
                    <textarea
                      name="remarks"
                      placeholder="Enter your queries"
                      value={formData?.remarks}
                      id=""
                      onChange={handleChange}
                      maxLength={1000}
                    ></textarea>
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
                  <i class="ri-arrow-left-line"></i>
                </button>
                <h3>Get Your Answer Now</h3>
              </div>

              <h4>Select Your Department</h4>
              <select
                className="department-select"
                value={querydata.department}
                onChange={handlequerychange}
                name="department"
              >
                <option value="" disabled selected>
                  Select Your Department
                </option>
                {Categories.allopathySpecs.map((department, index) => (
                  <option key={index} value={department}>
                    {department}
                  </option>
                ))}
                <option value="Not Sure">Not Sure</option>
              </select>
              <h4 style={{ marginTop: "1vw" }}>What is Your Query</h4>
              <textarea
                className="pharmacypara"
                name="query"
                value={querydata.query}
                onChange={handlequerychange}
                id=""
                placeholder="Type your query here"
              ></textarea>
              <button onClick={handlequerySubmit} className="queryformbutton">
                Submit
              </button>
              <button
                onClick={handleClose}
                className="flex closeexpertopinionfirstmodal"
              >
                <i class="ri-close-line"></i>
              </button>
            </div>
          )}
        </>
      </Modal>
    </div>
  );
}
