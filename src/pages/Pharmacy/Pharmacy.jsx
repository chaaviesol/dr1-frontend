import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Headroom from "react-headroom";
import Navbar from "../../components/Navbar";
import "../Pharmacy/Pharmacynew.css";
import { FormControlLabel, IconButton, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Checkbox from "@mui/material/Checkbox";
import { axiosPrivate } from "../../api/PrivateAxios/axios";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { BASE_URL } from "../../config";
import { Close } from "@mui/icons-material";
import { Loader } from "../../components/Loader/Loader";
import { LoginModal } from "../../components/LoginModal/LoginModal";
export default function Pharmacy() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    remarks: "",
    contact_no: "",
    delivery_address: "",
    pincode: "",
    image: [],
  });
  const { auth } = useAuth();
  const [loader, setLoader] = useState(false);
  const [isCategoryFetching, setIsCategoryFetching] = useState(false);
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);

  const [marketplaceCategories, setMarketplaceCategories] = useState([]);
  console.log(loader);
  const fetchCategories = async () => {
    try {
      setIsCategoryFetching(true);
      const response = await axios.get(`${BASE_URL}/product/getcategory`);
      setMarketplaceCategories(response?.data?.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsCategoryFetching(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const openmodalbutton = () => {
    if (auth.userId && auth.userType === "customer") {
      setIsModalOpen(!isModalOpen);
    } else {
      setIsShowLoginModal(true);
    }
  };
  const navigate = useNavigate();
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchContactNumber = async () => {
      try {
        const response = await axiosPrivate.post(`${BASE_URL}/user/getprofile`);
        const contact_no = parseInt(response?.data?.userDetails?.phone_no);
        const pincode = parseInt(response?.data?.userDetails?.pincode);
        console.log(pincode?.length);
        // const data = {
        //   user_id: 7,
        // };

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
    // const fetchAddress = async () => {
    //   try {
    //     const deliveryAddressResponse = await axios.post(
    //       `${BASE_URL}/pharmacy/checkaddress`
    //     );
    //     const addressArray = deliveryAddressResponse?.data?.data || [];
    //     setAddressArray(addressArray);
    //   } catch (error) {
    //     console.error("Error fetching addresses", error);
    //   }
    // };

    fetchContactNumber();
    // fetchAddress();
  }, []);

  const handleCrossClose = () => {
    setFormData({
      name: "",
      remarks: "",
      contact_no: "",
      delivery_address: "",
      pincode: "",
      image: [],
    });
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    if (!formData.name || formData.name === "") {
      toast.info(" Name is missing");
      return;
    }
    if (formData.image.length === 0) {
      toast.error("Please attach at least one report");
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
    const pincodeLength = formData.pincode.toString().length;
    if (!formData.pincode) {
      toast.error("Pincode is missing");
      return false;
    }

    // Example: Ensure the pincode is exactly 6 digits long
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

    if (!checked) {
      toast.error("Please provide your consent to be contacted.");
      return;
    }

    try {
      setLoader(true);
      const submissionData = new FormData();
      const orderType = "prescription";
      // const user_id = 7;
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

          navigate("/pharmacy");
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
  return (
    <div>
      <Headroom>
        <Navbar />
      </Headroom>
      <div>
        {isCategoryFetching && <Loader />}
        <div className="container">
          <div className="pharmacy-hero flex">
            <div className="pharmacy-image flex">
              <img src="images/med2.jpg" alt="" />
            </div>
            <div className="pharmacy-upload-section flex">
              <h1>
                Upload <span className="color-blue">Prescription &amp;</span>
              </h1>
              <h1>
                Get<span className="color-blue"> Your Medicine</span>
              </h1>
              <span className="priscriptionpara">
                Pharmacy is a key healthcare field focused on preparing and
                dispensing medications. Pharmacists ensure the safe and
                effective use of drugs, offering guidance on proper usage and
                potential side effects. They work in various settings, including
                hospitals and community pharmacies, playing a crucial role in
                patient care. The field continually evolves with medical
                advancements, making it essential to modern healthcare.
              </span>
              <button
                // onClick={() => setIsModalOpen(!isModalOpen)}
                onClick={openmodalbutton}
                className="pharmacynewupload"
              >
                Upload now
              </button>
            </div>
          </div>

          <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="modalContainernew">
              <div style={{ display: "flex", alignItems: "center" }}>
                <h3>Upload Prescription</h3>
                <div className="closeButtoncross2" onClick={handleCrossClose}>
                  <IconButton className="closeButtonmodal2">
                    <Close />
                  </IconButton>
                </div>
              </div>

              <div className="flex UploadPrescriptiontop">
                <div className="secopinput">
                  {/* <h4>Name</h4> */}
                  <input
                    type="text"
                    onChange={handleChange}
                    value={formData?.name}
                    style={{ backgroundColor: "#EEF1FF" }}
                    name="name"
                    maxLength={40}
                    placeholder="Name"
                  />
                </div>

                <div className="secopinput">
                  {/* <h4>Contact Number</h4> */}
                  <input
                    type="number"
                    name="contact_no"
                    style={{ backgroundColor: "#EEF1FF" }}
                    placeholder="Contact Number"
                    value={formData.contact_no}
                    onChange={handleChange}
                    maxLength={10}
                  />
                </div>
              </div>
              <div className="secopinput">
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

                {/* <button>
                  <h4>Upload(Max 5 File)</h4>
                </button>
                <h4 className="AttachAnyFile">Please Attach Any File</h4> */}
              </div>

              <div className="secopinput">
                {/* <h4>Delivery address</h4> */}
                <textarea
                  name="delivery_address"
                  placeholder="Delivery address"
                  value={formData?.delivery_address}
                  id=""
                  onChange={handleChange}
                  maxLength={300}
                ></textarea>
              </div>
              <div className="secopinput">
                {/* <h4>Pincode</h4> */}
                <input
                  type="text"
                  name="pincode"
                  style={{ backgroundColor: "#EEF1FF" }}
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  maxLength={6}
                />
              </div>

              <div className="secopinput">
                {/* <h4>Remarks</h4> */}
                <textarea
                  name="remarks"
                  placeholder="Remarks"
                  value={formData?.remarks}
                  id=""
                  onChange={handleChange}
                  maxLength={1000}
                ></textarea>
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

              <div className="secopsubbutton">
                <button onClick={handleSubmit}>
                  <h3>Submit</h3>
                </button>
              </div>
            </div>
          </Modal>

          <div className="webshopsection">
            <h1>
              Explore Our <span className="color-blue">Marketplace</span>
            </h1>

            <div class="product-section">
              {marketplaceCategories.length > 0 &&
                marketplaceCategories.map((category, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      navigate("/pharmacyproducts", {
                        state: { passedCategoryId: category.id },
                      })
                    }
                    className="web-pharmacyshopproduct flex"
                  >
                    <div className="webpharmacyshopproductimg flex">
                      <img src={category?.image} alt="" />
                    </div>
                    <div className="webpharmacyshopproducttitle flex">
                      <h4>{category?.category}</h4>
                    </div>

                    <button class="iconboxnew">
                      <i class="ri-search-line"></i>
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {isShowLoginModal && (
        <LoginModal show={isShowLoginModal} setShow={setIsShowLoginModal} />
      )}
    </div>
  );
}
