import { FormControlLabel, Modal } from "@mui/material";
import React, { useState, useEffect } from "react";
import HeaderSection from "../components/HeaderSection/HeaderSection";
import MainContainer from "../components/MainContainer/MainContainer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import { BASE_URL, port } from "../../../../config";
import { Loader } from "../../../../components/Loader/Loader";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { axiosPrivate } from "../../../../api/PrivateAxios/axios";
import Checkbox from "@mui/material/Checkbox";
function Pharmacy() {
  const [marketplaceProducts, setMarketplaceProducts] = useState([]);
  const [isCategoryFetching, setIsCategoryFetching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    remarks: "",
    contact_no: "",
    delivery_address: "",
    pincode: "",
    image: [],
  });
  // const [addressArray, setAddressArray] = useState([]);
  // const [filteredAddresses, setFilteredAddresses] = useState([]);
  // const [showDropdown, setShowDropdown] = useState(false);

  const { auth } = useAuth();
  const [loader, setLoader] = useState(false);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (categoryId) => {

      navigate("/pharmacyproducts", {
        state: { passedCategoryId: categoryId },
      })

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    // if (value) {
    //   console.log("heyy")
    //   const filtered = addressArray.filter((addressObj) =>
    //     addressObj.delivery_address.toLowerCase().includes(value.toLowerCase())
    //   );
    //   setFilteredAddresses(filtered);
    //   setShowDropdown(true);
    // } else {
    //   setShowDropdown(false);
    // }
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
        console.log({ contact_no });
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
      const user_id = 7;
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
  console.log({ formData });
  const handleOpen = () => {
    console.log({ auth });
    if (auth.userId && auth.userType === "customer") {
      setIsModalOpen(!isModalOpen);
    } else {
      toast.info("Please login as a customer!");
      setTimeout(() => {
        navigate("/");
      }, 4000);
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
  // const handleSelectAddress = (address) => {
  //   setFormData({ ...formData, delivery_address: address });
  //   setShowDropdown(false);
  // };
  const fetchCategories = async () => {
    try {
      setIsCategoryFetching(true);
      const response = await axios.get(`${BASE_URL}/product/getcategory`);
      setMarketplaceProducts(response?.data?.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsCategoryFetching(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      <div className="pharmacysection">
        {isCategoryFetching&& <Loader/>}
        <div className="uploadprescriptionsection flex">
          <div className="uploadprescriptionsecleft flex">
            <h3>
              Get Your Medicine
              <h3>At Home</h3>
            </h3>

            <div className="ploadprescriptionfesec">
              <div className="ploadprescriptionfe flex">
                <i class="ri-calendar-schedule-line"></i>
                <h4>Fast Delivery</h4>
              </div>
              <div className="ploadprescriptionfe flex">
                <i class="ri-cash-line"></i>
                <h4>Cash On Delivery</h4>
              </div>
            </div>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <div className="modalContainer">
                <div
                  className="backbuttonsecondopinion"
                  onClick={handleBackButton}
                  style={{ marginBottom: "10px" }}
                >
                  <i class="ri-arrow-left-line"></i>
                </div>
                <h3 >Upload Prescription</h3>

                <div className="secopinputprescription">
                  {/* <h4>Name</h4> */}
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
                  {/* <h4>Contact Number</h4> */}
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
                {/* <div className="secopinputprescription">
                  <input
                    type="text"
                    name="delivery_address"
                    placeholder="Delivery address"
                    value={formData.delivery_address}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {showDropdown && (
                    <ul className="dropdown-menu">
                      {filteredAddresses.map((addressObj, index) => (
                        <li
                          key={index}
                          onClick={() =>
                            handleSelectAddress(addressObj.delivery_address)
                          }
                        >
                          {addressObj.delivery_address}
                        </li>
                      ))}
                    </ul>
                  )}
                </div> */}
                <div className="secopinputprescription">
                  {/* <h4>Contact Number</h4> */}
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
                  {/* <h4>Remarks</h4> */}
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
            </Modal>

            <button
            style={{padding:"1rem 2rem"}}
              onClick={handleOpen}
              className="uploadprescriptionbutton flex"
            >
              <h4>Upload Prescription</h4>
            </button>
          </div>

          <div className="uploadprescriptionsecright flex">
            <img src="/images/mobile/pre.png" alt="" />
          </div>
        </div>

        <div className="mobiledoctorprofiletitle">
          <h3>Explore Our Shop</h3>
        </div>
        <div className="pharmacyshop">
          <div className="pharmacyshopcatemobile flex">
            {marketplaceProducts.length > 0 &&
              marketplaceProducts.map((product, index) => (
                <div
                  key={index}
                  onClick={() => handleNavigation(product.id)}
                  className="pharmacyshopproduct flex"
                >
                  <div className="pharmacyshopproductimg flex">
                  <img src={product?.image} alt="" />
                  </div>
                  <div className="pharmacyshopproducttitle flex">
                    <h4>{product?.category}</h4>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Pharmacy;
