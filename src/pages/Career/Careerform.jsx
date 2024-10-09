import React from "react";
import "./careerform.css";
import Headroom from "react-headroom";
import CustomDropdown from "./CustomDropdown/CustomDropdown";
import Navbar from "../../components/Navbar";

export default function Careersform() {
  const options = ["Doctor", "Nurse", "Pharmacist", "Technician"];
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
              />
              {/* <input type="text" placeholder='Select Your Role' /> */}
            </div>
            <div className="careersforminput">
              <h4>Name</h4>
              <input type="text" placeholder="Select Your Role" />
            </div>
          </div>

          <div className="careersforminputs flex">
            <div className="careersforminput">
              <h4>Location</h4>
              <input type="text" placeholder="Enter Your Name" />
            </div>
            <div className="careersforminput">
              <h4>Phone Number</h4>
              <input type="text" placeholder="Enter Your Phone Number" />
            </div>
          </div>

          <div className="selectedlocation flex">
            <div className="careerslocation flex">
              <i class="ri-map-pin-line"></i>
              <h4>Kozhikode</h4>
            </div>
            <div className="careerslocation flex">
              <i class="ri-map-pin-line"></i>
              <h4>Malapuram</h4>
            </div>
            <div className="careerslocation flex">
              <i class="ri-map-pin-line"></i>
              <h4>Kozhikode</h4>
            </div>
            <div className="careerslocation flex">
              <i class="ri-map-pin-line"></i>
              <h4>Malapuram</h4>
            </div>
            <div className="careerslocation flex">
              <i class="ri-map-pin-line"></i>
              <h4>Malapuram</h4>
            </div>
          </div>

          <div className="careersforminputs flex">
            <div className="careersforminput">
              <h4>Experience</h4>
              <input type="text" placeholder="Enter Your Name" />
            </div>
            <div className="careersforminput">
              <h4>Qualification</h4>
              <input type="text" placeholder="Enter Your Phone Number" />
            </div>
          </div>

          <div className="careersforminputs flex">
            <div className="careersforminput">
              <h4>Gender</h4>
              <input type="text" placeholder="Enter Your Name" />
            </div>
            <div className="careersforminput">
              <h4>Year of passout</h4>
              <input type="text" placeholder="Enter Your Phone Number" />
            </div>
          </div>

          <div className="careersforminputs flex">
            <div className="careersforminput">
              <h4>Department</h4>
              <input type="text" placeholder="Enter Your Name" />
            </div>
            <div className="careersforminput">
              <h4>Specialization</h4>
              <input type="text" placeholder="Enter Your Phone Number" />
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
