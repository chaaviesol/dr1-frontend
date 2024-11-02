import React, { useState } from "react";
import "./editprofile.css";
import BackButtonWithTitle from "../../../../components/BackButtonWithTitle";

function EditProfile() {
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <div className="mobilescreen-container">
      <BackButtonWithTitle title="Edit profile" />

      <div className="editimagemob flex ">
        <div className="editimagemobdiv">
          <img src="./images/man.jpg" alt="" />
          <div className="editimagemobicon flex">
            {" "}
            <i class="ri-ball-pen-fill"></i>
          </div>
        </div>
      </div>

      <div className="editformmob">
        <div>
          <h4>Name</h4>
          <input type="text" placeholder="Name" />
        </div>

        <div>
          <h4>Gender</h4>
          <select>
            <option value="">Select an option</option>
            <option value="option1">Male</option>
            <option value="option2">Female</option>
            <option value="option3">Other</option>
          </select>
        </div>

        <div>
          <h4>Date of birth</h4>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div>
          <h4>Pincode</h4>
          <input type="text" name="" id="" />
        </div>

        <button>Save</button>
      </div>
    </div>
  );
}

export default EditProfile;
