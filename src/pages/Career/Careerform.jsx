import React, { useState } from "react";
import "./careerform.css";
import Headroom from "react-headroom";
import CustomDropdown from "./CustomDropdown/CustomDropdown";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButtonWithTitle from "../../components/BackButtonWithTitle";
export default function Careersform() {
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    preferred_location: [],
    phone_no: "",
    experience: "",
    qualification: "",
    gender: "",
    year_of_passout: "",
    department: "",
    specialization: "",
  });
  console.log({ formData });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();

  const handleDropdownChange = (name, selectedValue) => {
    setFormData((prevData) => {
      if (name === "preferred_location") {
        const currentLocations = prevData[name] || [];
        const newLocations = currentLocations.includes(selectedValue)
          ? currentLocations.filter((loc) => loc !== selectedValue)
          : [...currentLocations, selectedValue];

        return {
          ...prevData,
          [name]: newLocations,
        };
      } else {
        return {
          ...prevData,
          [name]: selectedValue,
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.type || formData.type === "") {
        toast.error("Select your role!");
        return;
      }
      if (!formData.name || formData.name === "") {
        toast.error("Enter your name!");
        return;
      }
      if (
        !formData.preferred_location ||
        formData.preferred_location.length === 0
      ) {
        toast.error("Select your preferred location!");
        return;
      }
      if (!formData.phone_no || formData.phone_no.trim() === "") {
        toast.error("Enter your phone number!");
        return;
      }
      const phoneRegex = /^[789]\d{9}$/;
      if (!phoneRegex.test(formData.phone_no)) {
        toast.error("Enter a valid phone number!");
        return;
      }
      if (!formData.experience || formData.experience === "") {
        toast.error("Enter your experience!");
        return;
      }
      if (!formData.qualification || formData.qualification === "") {
        toast.error("Enter your qualification!");
        return;
      }
      if (!formData.gender || formData.gender === "") {
        toast.error("Select your gender!");
        return;
      }

      if (!formData.year_of_passout || formData.year_of_passout.trim() === "") {
        toast.error("Enter your pass out year!");
        return;
      }
      const currentYear = new Date().getFullYear();
      const yearRegex = /^(19|20)\d{2}$/;

      if (
        !yearRegex.test(formData.year_of_passout) ||
        formData.year_of_passout < 1900 ||
        formData.year_of_passout > currentYear
      ) {
        toast.error("Enter a valid year !");
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/career/careerupload`,
        formData
      );
      if (response.status === 200) {
        toast.success("Details submitted successfully!", {
          autoClose: 3000,
        });
        setTimeout(() => {
          setFormData({
            type: "",
            name: "",
            preferred_location: [],
            phone_no: "",
            experience: "",
            qualification: "",
            gender: "",
            year_of_passout: "",
            department: "",
            specialization: "",
          });
          navigate("/services");
        }, 3000);
      } else if (response.status === 400) {
        toast.error(response.data.message);
      } else {
        toast.error("Failed to submit details.");
      }
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const options = ["Doctor", "Nurse", "Pharmacist", "Technician"];
  const genderop = ["Female", "Male", "Prefer not to say"];
  const locations = [
    "Thiruvananthapuram",
    "Kollam",
    "Pathanamthitta",
    "Alappuzha",
    "Kottayam",
    "Idukki",
    "Ernakulam",
    "Thrissur",
    "Palakkad",
    "Malappuram",
    "Kozhikode",
    "Wayanad",
    "Kannur",
    "Kasargod",
  ];
  return (
    <>
      <div className="careerformnav">
        <Headroom>
          <Navbar />
        </Headroom>
      </div>

      <div className="careerformbackbtn mobilescreen-container">
        <BackButtonWithTitle title="" />
      </div>
      <div></div>

      <div className="containercareers">
        <div className="careersheadsection">
          <span style={{ color: "#F43F5E" }}>Register</span>{" "}
          <span style={{ fontWeight: "400" }}> Your Details </span>
          <h4>
            Enter your details carefully. Dr1 team contact you for verification
          </h4>
        </div>
        <div className="careersformsection">
          <div className="careersforminputs flex">
            <div className="careersforminput">
              <h4>Role</h4>
              <CustomDropdown
                options={options}
                placeholder="Select an option"
                name="type"
                onChange={(value) => handleDropdownChange("type", value)}
              />
              {/* <input type="text" placeholder='Select Your Role' /> */}
            </div>
            <div className="careersforminput">
              <h4>Name</h4>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                maxLength={30}
              />
            </div>
          </div>

          <div className="careersforminputs careersforminputs2 flex">
            <div className="careersforminput">
              <h4>Preferred location</h4>
              <CustomDropdown
                options={locations}
                placeholder="Select an option"
                name="type"
                onChange={(value) =>
                  handleDropdownChange("preferred_location", value)
                }
              />
            </div>
            <div className="careersforminput">
              <h4>Phone Number</h4>
              <input
                type="text"
                name="phone_no"
                placeholder="Enter Your Phone Number"
                onChange={handleChange}
                maxLength={10}
              />
            </div>
          </div>

          <div className="selectedlocation flex">
            {formData.preferred_location.map((location, index) => (
              <div key={index} className="careerslocation flex">
                <i className="ri-map-pin-line"></i>
                <h4>{location}</h4>
              </div>
            ))}
          </div>

          <div className="careersforminputs flex">
            <div className="careersforminput">
              <h4>Experience</h4>
              <input
                type="text"
                name="experience"
                placeholder="Enter Your Experience"
                onChange={handleChange}
              />
            </div>
            <div className="careersforminput">
              <h4>Qualification</h4>
              <input
                type="text"
                name="qualification"
                placeholder="Enter Your Qualification"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="careersforminputs flex">
            <div className="careersforminput">
              <h4>Gender</h4>
              <CustomDropdown
                options={genderop}
                placeholder="Select an option"
                name="gender"
                onChange={(value) => handleDropdownChange("gender", value)}
                selectedValues={formData.preferred_location}
              />
              {/* <input type="text" placeholder="Enter Your Name" /> */}
            </div>
            <div className="careersforminput">
              <h4>Year of passout</h4>
              <input
                type="number"
                name="year_of_passout"
                placeholder="Enter pass out year"
                maxLength={4}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="careersforminputs flex">
            <div className="careersforminput">
              <h4>Department</h4>
              <input
                name="department"
                type="text"
                placeholder="Enter Your department"
              />
            </div>
            <div className="careersforminput">
              <h4>Specialization</h4>
              <input
                name="specialization"
                type="text"
                placeholder="Enter Your specialization"
              />
            </div>
          </div>

          <div className="careersformsectionbutton flex">
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}
