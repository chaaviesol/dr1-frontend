import React, { useState } from "react";
import "./secondopinion.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function SecondOpinion() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const navigate = useNavigate();

  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
  };

  const handleNext = () => {
    if (!selectedDepartment || selectedDepartment ==="") {
      toast.error("Select a department!");
      return;
    }
    if (selectedDepartment) {
      navigate("/secondopinion2", { state: { department: selectedDepartment } });
    }
  };
  const handleClose = () => {
    setSelectedDepartment("");
    navigate(-1);
  };
  console.log({selectedDepartment})
  return (
    <div className="secop">
      <ToastContainer />
      <div className="secopmobcontainer">
        <div className="backbuttonsecondopinion" onClick={handleClose}>
        <i class="ri-arrow-left-line" ></i>
        </div>
        <div className="secoptitle">
          <h2>We help you to get a second opinion</h2>
          {/* <h4>Select Department</h4> */}
        </div>
       
        <div className="secopimg flex">
          <img src="/images/mobile/secop.png" alt="" />
        </div>

        <div className="secopdipartment">
          <h3>Select Department</h3>

          <div className={`secopdipartmentoption flex ${selectedDepartment === "Cardiology" ? "secopdipartmentoptionselected" : ""}`}
            onClick={() => handleDepartmentSelect("Cardiology")}>
            <h4>Cardiology</h4>
          </div>
          <div  className={`secopdipartmentoption flex ${selectedDepartment === "Oncology" ? "secopdipartmentoptionselected" : ""}`}
            onClick={() => handleDepartmentSelect("Oncology")}>
            <h4>Oncology</h4>
          </div>

          <div   className={`secopdipartmentoption flex ${selectedDepartment === "Orthopedician" ? "secopdipartmentoptionselected" : ""}`}
            onClick={() => handleDepartmentSelect("Orthopedician")}>
            <h4>Orthopedician</h4>
          </div>

          <div className={`secopdipartmentoption flex ${selectedDepartment === "Pediatrician" ? "secopdipartmentoptionselected" : ""}`}
            onClick={() => handleDepartmentSelect("Pediatrician")}>
            <h4>Pediatrician</h4>
          </div>

         

          <div className="flex secopdipartmentbuttonsec">
            <button onClick={handleNext} className="secopdipartmentbutton flex">
              <i class="ri-arrow-right-s-line"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}