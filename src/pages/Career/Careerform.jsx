import React, { useState } from "react";
import "./careerform.css";
import Headroom from "react-headroom";
import CustomDropdown from "./CustomDropdown/CustomDropdown";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  const handleDropdownChange = (name, selectedValue) => {
    setFormData((prevData) => {
      const currentLocations = prevData[name] || []; 
      const newLocations = currentLocations.includes(selectedValue)
        ? currentLocations.filter((loc) => loc !== selectedValue) 
        : [...currentLocations, selectedValue];

      return {
        ...prevData,
        [name]: newLocations,
      };
    });
  };

  const handleSubmit = async (e) => {
    try {
      if (!formData.type || formData.type === "") {
        toast.error("Select your role!");
        return;
      }
      if (!formData.name || formData.name === "") {
        toast.error("Enter your name!");
        return;
      }
      const response = await axios.post(
        `${BASE_URL}/career/careerupload`,
        formData
      );
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
      <Headroom>
        <Navbar />
      </Headroom>

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
              />
            </div>
          </div>

          <div className="careersforminputs flex">
            <div className="careersforminput">
              <h4>Location</h4>
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
              />
            </div>
          </div>

          <div className="selectedlocation flex">
            {formData.preferred_location.map((location, index) => (
              <div key={index} className="careerslocation flex">
                <i class="ri-map-pin-line"></i>
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
                type="text"
                name="year_of_passout"
                placeholder="Enter Your Phone Number"
              />
            </div>
          </div>

          <div className="careersforminputs flex">
            <div className="careersforminput">
              <h4>Department</h4>
              <input
                name="department"
                type="text"
                placeholder="Enter Your Name"
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
            <button>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}
