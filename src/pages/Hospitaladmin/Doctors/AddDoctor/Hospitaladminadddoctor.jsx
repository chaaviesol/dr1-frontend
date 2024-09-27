import React, { useContext, useState } from "react";
import "./hospitaladminadddoctor.css";
import { types } from "../../../Customer/doctor/constants/filter";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { port } from "../../../../config";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Loader } from "../../../../components/Loader/Loader";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { MyContext } from "../../../../contexts/Contexts";
export default function Hospitaladminadddoctor() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("No file selected");
  const [data, setData] = useState({
    image: "",
    docImage: "",
    experience: 0,
    selectedYear: 0,
  });
  const { Categories, setCategories } = useContext(MyContext);
  const axiosPrivate = useAxiosPrivate();

  const speacializationNames = Categories?.allopathySpecs;
  const homeoDept = Categories?.homeopathySpecs;
  const ayurSpec = Categories?.ayurvedicSpecs;
  const { auth } = useAuth();
  const schema = yup.object({
    name: yup.string().trim().max(25, "Name cannot exceed 25 characters"),
    email: yup.string().email("Invalid email format"),
    phone_no: yup
      .string()
      .required("Mobile number is required")
      .matches(/^\d{10}$/, "Mobile number must be 10 digits"),
    about: yup.string().required("about field is required"),
    qualification: yup
      .string()
      .required("required")
      .trim()
      .max(20, "cannot exceed 20 characters"),
    gender: yup.string(),
    type: yup.string(),
    registration_no: yup.string(),
    specialization: yup.string(),
  });
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = async (dataForm) => {
    console.log({ dataForm });
    try {
      dataForm.hospital_id = auth.userId;
      dataForm.experience = data.experience;
      const formData = new FormData();
      formData.append("image", data.docImage);
      formData.append("data", JSON.stringify(dataForm));
      setIsLoading(true);
      const response = await axiosPrivate.post(
        `${port}/hospital/add_doctor`,
        formData
      );
      // console.log({ response });
      if (response.status === 200) {
        reset();
        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target?.files[0];

    if (selectedFile) {
      const isImage = selectedFile.type.startsWith("image/");
      if (isImage) {
        setFileName(selectedFile);
        setData({ ...data, image: selectedFile.name, docImage: selectedFile });
      } else {
        alert("Please select a valid image file.");
        event.target.value = null;
      }
    }
  };

  const handleYearChange = (e) => {
    console.log(e);
    setData({
      ...data,
      selectedYear: e.$d,
      experience: e.$y,
    });
  };

  // return specializations based on the selected type//
  const getSpecializationOptions = () => {
    const selectedType = watch("type");
    if (!selectedType) return null;
    let mappingArray = [];
    switch (selectedType) {
      case "Allopathy":
        mappingArray = speacializationNames;
        break;
      case "Ayurvedic":
        mappingArray = ayurSpec;
        break;
      case "Homeopathy":
        mappingArray = homeoDept;
        break;
      default:
        return null;
    }
    return mappingArray.map((value, index) => (
      <option
        key={index}
        value={value}
        className="doctoradminregistration_gender_font"
      >
        {value}
      </option>
    ));
  };

  return (
    <>
      {isLoading && <Loader />}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="adddoctor">
          <div>
            <h1>Add Doctor</h1>
          </div>

          <div className="adddoctor_inputsection">
            <div className="adddoctor_inputsection1">
              <h2>
                Name <span style={{ color: "red" }}>*</span>
              </h2>
              <div style={{ position: "relative" }}>
                <input
                  className="adddoctor_inputsection1_inputs"
                  name="name"
                  type="text"
                  maxLength={25}
                  {...register("name")}
                  required={true}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && (
                  <p className="error-message error-p">{errors.name.message}</p>
                )}
              </div>

              <h2>
                Photo <span style={{ color: "red" }}></span>
              </h2>

              <div className="hos_add_doc_upload-images">
                <label for="inputTag">
                  <h4 className="hos-add-doc-select-file">Upload Photo</h4>
                  <input
                    onChange={handleFileChange}
                    id="inputTag"
                    type="file"
                    accept="image/*"
                  />
                </label>
                <input
                  value={data?.image}
                  className="adddoctor_inputsection1_inputs"
                />
              </div>

              <h2>
                Qualification <span style={{ color: "red" }}>*</span>
              </h2>
              <div style={{ position: "relative" }}>
                <input
                  className="adddoctor_inputsection1_inputs"
                  {...register("qualification")}
                  name="qualification"
                  required={true}
                  maxLength={20}
                  type="text"
                />
                {errors.qualification && (
                  <p className="error-message error-p">
                    {errors.qualification.message}
                  </p>
                )}
              </div>

              <h2>
                Year of graduation <span style={{ color: "red" }}>*</span>
              </h2>
              <div style={{ position: "relative" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disableFuture
                    slotProps={{
                      field: {
                        readOnly: true,
                      },
                    }}
                    name="experience"
                    onChange={handleYearChange}
                    value={data.selectedYear ? dayjs(data.selectedYear) : null}
                    views={["year"]}
                    className="add_doctor_date-picker"
                  />
                </LocalizationProvider>
              </div>
            </div>

            <div className="adddoctor_inputsection1 flex">
              <h2>
                Email <span style={{ color: "red" }}>*</span>
              </h2>
              <div style={{ position: "relative" }}>
                <input
                  className="adddoctor_inputsection1_inputs"
                  {...register("email")}
                  name="email"
                  type="text"
                  required={true}
                  maxLength={30}
                />
                {errors.email && (
                  <p className="error-message error-p">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <h2>
                Phone Number <span style={{ color: "red" }}>*</span>
              </h2>
              <div style={{ position: "relative" }}>
                <input
                  className="adddoctor_inputsection1_inputs"
                  {...register("phone_no")}
                  name="phone_no"
                  required={true}
                  type="number"
                />
                {errors.phone_no && (
                  <p className="error-message error-p">
                    {errors.phone_no.message}
                  </p>
                )}
              </div>

              <h2>
                Gender <span style={{ color: "red" }}>*</span>
              </h2>
              <div style={{ position: "relative" }}>
                <select
                  required={true}
                  {...register("gender")}
                  type="text"
                  name="gender"
                  className="hospital-admin-add-doctor-select"
                >
                  <option
                    value=""
                    className="doctoradminregistration_gender_font"
                  ></option>

                  <option
                    value="Male"
                    className="doctoradminregistration_gender_font"
                  >
                    Male
                  </option>
                  <option
                    value="Female"
                    className="doctoradminregistration_gender_font"
                  >
                    Female
                  </option>
                  <option
                    value="Others"
                    className="doctoradminregistration_gender_font"
                  >
                    Others
                  </option>
                </select>

                {errors.gender && (
                  <p className="error-message error-p">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              <h2>
                Registration Number <span style={{ color: "red" }}>*</span>
              </h2>
              <div style={{ position: "relative" }}>
                <input
                  className="adddoctor_inputsection1_inputs"
                  {...register("registration_no")}
                  name="registration_no"
                  type="text"
                  required={true}
                  maxLength={25}
                />
                {errors.registration_no && (
                  <p className="error-message error-p">
                    {errors.registration_no.message}
                  </p>
                )}
              </div>
            </div>

            <div className="adddoctor_inputsection1 flex">
              <h2>
                About <span style={{ color: "red" }}>*</span>
              </h2>
              <div style={{ position: "relative" }}>
                <textarea
                  required={true}
                  {...register("about")}
                  name="about"
                  id=""
                  cols="30"
                  rows="10"
                  maxLength={600}
                ></textarea>
                {errors.about && (
                  <p className="error-message error-p">
                    {errors.about.message}
                  </p>
                )}
              </div>

              <h2>
                Type <span style={{ color: "red" }}>*</span>
              </h2>
              <div style={{ position: "relative" }}>
                <select
                  {...register("type")}
                  type="text"
                  required={true}
                  name="type"
                  className="hospital-admin-add-doctor-select"
                >
                  <option
                    value=""
                    className="doctoradminregistration_gender_font"
                  ></option>
                  {types.map((type, index) => (
                    <option
                      key={index}
                      value={type}
                      className="doctoradminregistration_gender_font"
                    >
                      {type}
                    </option>
                  ))}
                </select>

                {errors.type && (
                  <p className="error-message error-p">{errors.type.message}</p>
                )}
              </div>

              <h2>
                Department <span style={{ color: "red" }}>*</span>
              </h2>
              <div style={{ position: "relative" }}>
                <select
                  {...register("specialization")}
                  type="text"
                  name="specialization"
                  className="hospital-admin-add-doctor-select"
                >
                  <option
                    value=""
                    className="doctoradminregistration_gender_font"
                  ></option>
                  {getSpecializationOptions()}
                </select>
                {errors.specialization && (
                  <p className="error-message error-p">
                    {errors.specialization.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="adddoctor_button">
            <button
              className="adddoctor_button_cancel"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button className="adddoctor_button_submit" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>

      <ToastContainer />
    </>
  );
}
