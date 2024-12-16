import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { BASE_URL, PHARMACY_URL } from "../../config";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Checkbox, FormControlLabel, Modal } from "@mui/material";
import BackButtonWithTitle from "../../components/BackButtonWithTitle";
import { Loader } from "../../components/Loader/Loader";
import UseCurrentLocationButton from "../../components/UseCurrentLocationButton";
import Location from "../Customer/Mobile/components/Location/Location";

function UploadPresMobile() {
  // const [isShowLocationModal, setShowLocationModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    remarks: "",
    contact_no: "",
    delivery_address: "",
    pincode: "",
    image: [],
    district:"",
    location:""
  });
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [checked, setChecked] = useState(false);
  const [location, setLocation] = useState(null); // State to hold the location data
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  // Callback function to receive the location data
  const handleLocationFetched = (location) => {
    console.log(location)
    setLocation(location); // Store the fetched location in the state;
    setFormData({
      ...formData,
      delivery_address: location.formattedAddress,
      location:location.location,
      district:location.district
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "contact_no") {
      //making mobile num limited to 10
      const sanitizedValue = value.replace(/[.-]/g, "");
      const truncatedValue = sanitizedValue.slice(0, 10);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: truncatedValue,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const maxSizeInMB = 10;
    const maxFiles = 5;
    const validFileTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
      "application/pdf",
    ];
    const validFiles = [];
    const newErrors = {};

    // Check if the total number of files exceeds the limit
    if (formData.image.length + newFiles.length > maxFiles) {
      newErrors.image = `You can upload a maximum of ${maxFiles} files.`;
    }

    newFiles.forEach((file) => {
      const maxFileNameLength = 10;
      const trimmedFileName =
        file.name.length > maxFileNameLength
          ? file.name.substring(0, 10) +
            "..." +
            file.name.substring(file.name.length - 10)
          : file.name;
      // Check for invalid file types
      if (!validFileTypes.includes(file.type)) {
        newErrors.image =
          (newErrors.image || "") +
          `Invalid file type: ${trimmedFileName}. Only images (JPEG, PNG,JPG,WEBP) or PDFs are allowed. `;
      }
      // Check if file size exceeds the limit
      if (file.size > maxSizeInMB * 1024 * 1024) {
        newErrors.image =
          (newErrors.image || "") +
          `Max file size is 10MB for file ${trimmedFileName}. `;
      } else {
        validFiles.push(file);
      }
    });

    // If there are any errors, set them and prevent further processing
    if (Object.keys(newErrors).length > 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...newErrors,
      }));
      return;
    }

    // If there are valid files, update the form data
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: [...prevFormData.image, ...validFiles],
    }));
  };

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    const fetchContactNumber = async () => {
      try {
        const response = await axiosPrivate.post(
          `${PHARMACY_URL}/user/getprofile`
        );
        console.log(response)
        const contact_no = parseInt(response?.data?.userDetails?.phone_no);
        const pincode = parseInt(response?.data?.userDetails?.pincode);
        const name = response?.data?.userDetails?.name

        setFormData({
          contact_no: contact_no,
          pincode: pincode,
          remarks: "",
          doctor_name: "",
          image: [],
          name,
        });
      } catch (err) {
        console.error("Error fetching contact number:", err);
      }
    };

    fetchContactNumber();
  }, []);

  console.log(location);

  const handleSubmit = async () => {
    const newErrors = {};
    if (!formData.name || formData.name === "") {
      newErrors.name = "Name is missing";
    }
    if (formData.image.length === 0) {
      newErrors.imagelength = "Please attach at least one report";
    }
    if (!formData.delivery_address || formData.delivery_address === "") {
      newErrors.delivery_address = "Delivery details is missing";
    }
    if (!formData.contact_no || formData.contact_no === "") {
      newErrors.contact_no = "Contact Number is missing";
    }

    if (!formData.pincode || formData.pincode === "") {
      newErrors.pincode = "Pincode is missing";
    }
    const pincodeLength = formData.pincode.toString().length;
    if (pincodeLength !== 6) {
      newErrors.pincode = "Invalid Pincode";
    }

    if (!/^[6-9]\d{9}$/.test(formData.contact_no)) {
      newErrors.contact_no = "Invalid Contact Number";
    }
    if (!formData.remarks || formData.remarks === "") {
      newErrors.remarks = "Remarks is missing";
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
      const orderType = "prescription";
      const so_status = "placed";
      submissionData.append("name", formData.name);
      submissionData.append("remarks", formData.remarks);
      submissionData.append("contact_no", formData.contact_no);
      submissionData.append("order_type", orderType);
      submissionData.append("pincode", formData.pincode);
      submissionData.append("so_status", so_status);
      submissionData.append("delivery_address", formData.delivery_address);
      submissionData.append("delivery_location", formData.location);
      submissionData.append("district", formData.district);

      formData.image.forEach((image, index) => {
        submissionData.append("images", image);
      });
      // submissionData.append("data", JSON.stringify(formData));
      console.log("FormData entries:");
      for (let pair of submissionData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
console.log(submissionData)
      const response = await axiosPrivate.post(
        `${PHARMACY_URL}/pharmacy/salesorder`,
        submissionData
      );

      if (response.status === 200) {
        setErrors("");
        setLoader(false);
        toast.success("Details submitted successfully!", {
          autoClose: 3000,
        });
        setTimeout(() => {
          setFormData({
            name: "",
            remarks: "",
            contact_no: "",
            delivery_address: "",
            pincode: "",
            image: [],
          });

          setIsModalOpen(false);
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

  const handleBackButton = () => {
    setFormData({
      name: "",
      remarks: "",
      contact_no: "",
      pincode: "",
      delivery_address: "",
      image: [],
    });
    setIsModalOpen(false);
  };

  return (
    <>
      {loader && <Loader />}
      <div className="modalContainer">
        <div onClick={handleBackButton} style={{ marginBottom: "10px" }}>
          <BackButtonWithTitle title="Upload Prescription" />
        </div>

        <div className="secopinputprescription">
          <input
            name="name"
            placeholder="Name"
            value={formData?.name}
            type="text"
            onChange={handleChange}
            maxLength={40}
          />
          {errors.name && (
            <p
              style={{ color: "red", fontSize: "0.9rem" }}
              className="error-message"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div className="secopinputprescription">
          <input
            type="number"
            name="contact_no"
            placeholder="Contact Number"
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

        <div className="secopinputprescription">
          <label htmlFor="fileInput" className="upload-buttonsecond">
            <h4>Upload Prescription(Max 5 Files)</h4>
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            multiple
            accept=".jpg, .jpeg, .png,webp, application/pdf"
            style={{ display: "none" }}
          />
          <div className="file-names">
            {/* {formData?.image?.length > 0 ? (
              formData.image.map((report, index) => (
                <h4 key={index}>{report?.name}</h4>
              ))
            ) : (
              <h4 className="AttachAnyFile">Please Attach Any File</h4>
            )} */}
            {formData?.image?.length > 0
              ? formData.image.map((report, index) => (
                  <h4 key={index}>{report?.name}</h4>
                ))
              : errors.imagelength && (
                  <p
                    style={{ color: "red", fontSize: "0.9rem" }}
                    className="error-message"
                  >
                    {errors.imagelength}
                  </p>
                )}
            {errors.image && (
              <p
                style={{ color: "red", fontSize: "0.9rem" }}
                className="error-message"
              >
                {errors.image}
              </p>
            )}
          </div>
        </div>
        <div className="locationGetContainer">
          <UseCurrentLocationButton onLocationFetched={handleLocationFetched} />
        </div>

        <div className="secopinputprescription">
          <textarea
            name="delivery_address"
            placeholder="Delivery address"
            value={formData?.delivery_address || ""}
            id=""
            onChange={handleChange}
          ></textarea>
          {errors.delivery_address && (
            <p
              style={{ color: "red", fontSize: "0.9rem" }}
              className="error-message"
            >
              {errors.delivery_address}
            </p>
          )}
        </div>
        {/* <div>
            <Location
              isShowLocationModal={isShowLocationModal}
              setShowLocationModal={setShowLocationModal}
            />
          </div>

        <div className="secopinputprescription">
          <input
            type="text"
            name="city"
            placeholder="locality"
            value={formData.locality ?? ""}
            onChange={handleChange}
          />
          {errors.pincode && (
            <p
              style={{ color: "red", fontSize: "0.9rem" }}
              className="error-message"
            >
              {errors.pincode}
            </p>
          )}
        </div> */}
        <div className="secopinputprescription">
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            maxLength={6}
          />
          {errors.pincode && (
            <p
              style={{ color: "red", fontSize: "0.9rem" }}
              className="error-message"
            >
              {errors.pincode}
            </p>
          )}
        </div>
        <div className="secopinputprescription">
          <textarea
            name="remarks"
            placeholder="Remarks"
            value={formData?.remarks}
            id=""
            onChange={handleChange}
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
    </>
  );
}

export default UploadPresMobile;
