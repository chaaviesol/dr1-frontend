import React, { useState } from "react";
import './doctormob.css'

function Doctors() {
  const specialties = [
    "Allergy and Immunology",
    "Anesthesiology",
    "Cardiology",
    "Critical Care Medicine",
    "Dermatology",
    "Emergency Medicine",
    "Endocrinology",
    "Family Medicine",
    "Gastroenterology",
    "Geriatrics",
    "Hematology",
    "Infectious Disease",
    "Internal Medicine",
    "Medical Genetics",
    "Nephrology",
    "Neurology",
    "Obstetrics and Gynecology",
    "Oncology",
    "Ophthalmology",
    "Orthopedics",
    "Otolaryngology (ENT)",
    "Pathology",
    "Pediatrics",
    "Physical Medicine and Rehabilitation",
    "Psychiatry",
    "Pulmonology",
    "Radiology",
    "Rheumatology",
    "Sports Medicine",
    "Surgery",
    "Thoracic Surgery",
    "Urology",
    "Vascular Surgery"
  ];

  const [visibleCount, setVisibleCount] = useState(12);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount+6);
};
  return (
    <>
      <div style={{padding:".5rem"}} className="avoidbottombar">
        {/* Health concerns Section */}

        <div className="">
          <h3
            className="mobsechead"
            style={{
              margin: "12px 0px 0px 0px",
            }}
          >
            Search doctor by
          </h3>
          <h3
            className="mobsechead"
            style={{
              margin: "0px 0px 8px 0px",
            }}
          >
            Health concerns
          </h3>
        </div>

        <section className="">
          <div className="healthconcerns flex">
            <div className="healthconcernscard flex">
              <img src="./images/man.jpg" alt="" />
              <h4>Period doubts or Pregnancy</h4>
            </div>

            <div className="healthconcernscard flex">
              <img src="./images/man.jpg" alt="" />
              <h4>Period doubts or Pregnancy</h4>
            </div>

            <div className="healthconcernscard flex">
              <img src="./images/man.jpg" alt="" />
              <h4>Period doubts or Pregnancy</h4>
            </div>

            <div className="healthconcernscard flex">
              <img src="./images/man.jpg" alt="" />
              <h4>Period doubts or Pregnancy</h4>
            </div>
          </div>
        </section>

        {/*End Health concerns Section */}

        {/*  Searched Specialty Section */}

        <div className="">
          <h3
            className="mobsechead"
            style={{
              margin: "12px 0px 8px 0px",
            }}
          >
            Top Searched Specialty
          </h3>

          <section className="Specialtyitemslistsec">
            <div className="Specialtyitemslist flex">
              {specialties.slice(0, visibleCount).map((specialty, index) => (
                <button key={index}>
                  {specialty} <i className="ri-arrow-right-s-line"></i>
                </button>
              ))}
            </div>

            {visibleCount < specialties.length && (
              <div className="Specialtyitemslistbtn flex">
                <button onClick={handleLoadMore} className="btnwithclickableeffect">Load more</button>
              </div>
            )}
          </section>
        </div>

        {/*End  Searched Specialty Section */}

        {/*  Expert opinion Section */}

        <section className="">
          <div className="expertopiondoctor flex">
            <div>
              <h2>Get an expert</h2>
              <h2>opinion</h2>
              <h2>from our experts</h2>
            </div>
            <button>Get now</button>
            <img src="../images/ex.png" alt="" />
          </div>
        </section>

        {/*End  Expert opinion Section */}

        {/*  Expert opinion Section */}

        <section className=""></section>

        {/*End  Expert opinion Section */}

        <div className="">
          <h3
            className="mobsechead"
            style={{
              margin: "12px 0px 8px 0px",
            }}
          >
            Best doctor’s near you
          </h3>
        </div>
      </div>
    </>
  );
}

export default Doctors;
