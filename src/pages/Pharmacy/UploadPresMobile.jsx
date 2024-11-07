import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Checkbox, FormControlLabel, Modal } from "@mui/material";
import BackButtonWithTitle from "../../components/BackButtonWithTitle";

function UploadPresMobile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    remarks: "",
    contact_no: "",
    delivery_address: "",
    pincode: "",
    image: [],
  });

  const [loader, setLoader] = useState(false);
  const [checked, setChecked] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
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

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    const fetchContactNumber = async () => {
      try {
        const response = await axiosPrivate.post(`${BASE_URL}/user/getprofile`);
        const contact_no = parseInt(response?.data?.userDetails?.phone_no);
        const pincode = parseInt(response?.data?.userDetails?.pincode);

        setFormData({
          contact_no: contact_no,
          pincode: pincode,
          remarks: "",
          doctor_name: "",
          image: [],
        });
      } catch (err) {
        console.error("Error fetching contact number:", err);
      }
    };

    fetchContactNumber();
  }, []);

  const handleSubmit = async () => {
    if (!formData.name || formData.name === "") {
      toast.info(" Name is missing");
      return;
    }
    if (!formData.delivery_address || formData.delivery_address === "") {
      toast.info(" Delivery details is missing");
      return;
    }
    if (!formData.contact_no) {
      toast.error("Contact Number is missing");
      return;
    }
    if (!formData.pincode) {
      toast.error("Pincode is missing");
      return false;
    }

    // Example: Ensure the pincode is exactly 6 digits long
    const pincodeLength = formData.pincode.toString().length;
    if (!formData.pincode) {
      toast.error("Pincode is missing");
      return false;
    }
    if (pincodeLength !== 6) {
      toast.error("Pincode must be 6 digits long");
      return false;
    }

    // Example: Ensure the pincode contains only numbers
    if (!/^\d+$/.test(formData.pincode)) {
      toast.error("Pincode must contain only numbers");
      return false;
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
    if (!checked) {
      toast.error("Please provide your consent to be contacted.");
      return;
    }

    try {
      setLoader(true);
      const submissionData = new FormData();
      const orderType = "prescription";
      const so_status = "Placed";
      submissionData.append("name", formData.name);
      submissionData.append("remarks", formData.remarks);
      submissionData.append("contact_no", formData.contact_no);
      submissionData.append("order_type", orderType);
      submissionData.append("pincode", formData.pincode);
      submissionData.append("so_status", so_status);
      submissionData.append("delivery_address", formData.delivery_address);

      formData.image.forEach((image, index) => {
        submissionData.append("images", image);
      });
      // submissionData.append("data", JSON.stringify(formData));
      console.log("FormData entries:");
      for (let pair of submissionData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const response = await axiosPrivate.post(
        `${BASE_URL}/pharmacy/salesorder`,
        submissionData
      );
      console.log({ response });
      if (response.status === 200) {
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
        </div>

        <div className="secopinputprescription">
          <label htmlFor="fileInput" className="upload-buttonsecond">
            <h4>Upload Prescription (Max 5 Files)</h4>
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            multiple
            style={{ display: "none" }}
          />
          <div className="file-names">
            {formData?.image?.length > 0 ? (
              formData.image.map((report, index) => (
                <h4 key={index}>{report?.name}</h4>
              ))
            ) : (
              <h4 className="AttachAnyFile">Please Attach Any File</h4>
            )}
          </div>
        </div>

        <div className="secopinputprescription">
          <textarea
            name="delivery_address"
            placeholder="Delivery address"
            value={formData?.delivery_address}
            id=""
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="secopinputprescription">
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            maxLength={6}
          />
        </div>
        <div className="secopinputprescription">
          <textarea
            name="remarks"
            placeholder="Remarks"
            value={formData?.remarks}
            id=""
            onChange={handleChange}
          ></textarea>
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