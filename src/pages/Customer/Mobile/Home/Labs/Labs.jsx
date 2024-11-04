import React from "react";
import './labs.css'

function Labs() {
  // LabCard Component to display lab details
  const LabCard = ({ image, name, location, services, rating }) => {
    return (
      <div className="bestlabmobcard flex">
        <img src={image} alt={name} className="lab-image" />
        <div className="bestlabmobcardright flex">
          <h2>{name}</h2>
          <div className="bestlabmobcardrightstar flex">
            {[...Array(5)].map((_, index) => (
              <i
                key={index}
                className={index < rating ? "ri-star-s-fill" : "ri-star-s-line"}
              ></i>
            ))}
          </div>
          <h4>{location}</h4>
          <h3>{services}</h3>
        </div>
      </div>
    );
  };

  // Sample data for labs
  const labData = [
    {
      image:
        "https://plus.unsplash.com/premium_photo-1663011406193-7beb9d225d31?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Micro Health Laboratories Micro Health Laboratories",
      location: "Ernakulam, Kerala",
      services: "ECG - USG - CT - Kidney Tests",
      rating: 5,
    },
    {
      image:
        "https://images.unsplash.com/photo-1618053238059-cc7761222f2a?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Alpha Labs llllllllllllllllllllllll uuu kpoijikjiouuuouuiuuuui",
      location: "Cochin, Kerala",
      services: "Blood Test - MRI - Ultrasound",
      rating: 4,
    },
    {
      image:
        "https://images.unsplash.com/photo-1583912086201-b6db267b43ff?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Alpha Labs",
      location: "Cochin, Kerala",
      services: "Blood Test - MRI - Ultrasound",
      rating: 4,
    },
  ];

  return (
    <div className="avoidbottombar">
      <div className="">
        <div className="labtopcardmob">
          <h2>Explore and Find</h2>
          <h2>Trusted Labs</h2>
          <h2>Near You</h2>

          <img src="images/lat.png" alt="" />
        </div>
      </div>

      <div className="">
        <h3 className="mobsechead" style={{ margin: "12px 0px 0px 0px" }}>
          Top Booked Diagnostic
        </h3>
        <h3 className="mobsechead" style={{ margin: "0px 0px 8px 0px" }}>
          Tests
        </h3>
      </div>
      <div className="toptestcardsec">
        <div className="toptestcard">
          <h2>Blood Count Test</h2>
          <p>
            A doctor is a medical professional who diagnoses, treats, and
            prevents illnesses and injuries. They work in various{" "}
          </p>
          <button>
            Find Lab <i className="ri-arrow-right-up-line"></i>
          </button>
        </div>

        <div className="toptestcard">
          <h2>Blood Count Test</h2>
          <p>
            A doctor is a medical professional who diagnoses, treats, and
            prevents illnesses and injuries. They work in various{" "}
          </p>
          <button>
            Find Lab <i className="ri-arrow-right-up-line"></i>
          </button>
        </div>

        <div className="toptestcard">
          <h2>Blood Count Test</h2>
          <p>
            A doctor is a medical professional who diagnoses, treats, and
            prevents illnesses and injuries. They work in various{" "}
          </p>
          <button>
            Find Lab <i className="ri-arrow-right-up-line"></i>
          </button>
        </div>
        <div className="toptestcard">
          <h2>Blood Count Test</h2>
          <p>
            A doctor is a medical professional who diagnoses, treats, and
            prevents illnesses and injuries. They work in various{" "}
          </p>
          <button>
            Find Lab <i className="ri-arrow-right-up-line"></i>
          </button>
        </div>
      </div>

      <div className="">
        <h3 className="mobsechead" style={{ margin: "12px 0px 12px 0px" }}>
          Best labs near you
        </h3>

        {/* Render LabCard for each lab in labData */}
        {labData.map((lab, index) => (
          <LabCard
            key={index}
            image={lab.image}
            name={lab.name}
            location={lab.location}
            services={lab.services}
            rating={lab.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default Labs;
