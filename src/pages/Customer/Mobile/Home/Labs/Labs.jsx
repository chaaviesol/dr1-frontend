import React, { useEffect, useState } from "react";
import "./labs.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../../../config";

function Labs() {
  const [labdata, SetLabdata] = useState([]);
 
  // LabCard Component to display lab details
  const navigate = useNavigate();
  const LabCard = ({ image, name, location, services, rating,screen,data }) => {
    const StarRating = () => {
      const maxRating = 5;
      const stars = [];
  
      for (let i = 1; i <= maxRating; i++) {
        stars.push(
          i <= rating ? (
            <i
              className="ri-star-fill"
              style={{ marginRight: "5px", fontSize: "20px", color: "#FFDE4D" }}
            />
          ) : (
            <i
              className="ri-star-fill"
              style={{ color: "gray", marginRight: "5px", fontSize: "20px" }}
            />
          )
        );
      }
  
      return <div>{stars}</div>;
    };
    return (
      <div className="bestlabmobcard flex" 
        onClick={() => navigate(screen, { state: { data: data?.details } })}
      >      
        <img src={image} alt={name} className="lab-image" />
        <div className="bestlabmobcardright flex">
          <h2>{name}</h2>
          <div className="bestlabmobcardrightstar flex">
            {/* {[...Array(5)].map((_, index) => (
              <i
                key={index}
                className={index < rating ? "ri-star-s-fill" : "ri-star-s-line"}
              ></i>
            ))} */}
            <StarRating/>
          </div>
          <h4>{location}</h4>
          <h3>{services}</h3>
        </div>
      </div>
    );
  };

  const fetch = async () => {
    try {
      // const pincode=====??
      const response = await axios.post(`${BASE_URL}/lab/nearestlab`);
      SetLabdata(response.data.data);
    } catch (error) {
      console.error("Error fetching lab data:", error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

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
          <button onClick={() => navigate("/labfiltering")}>
            Find Lab <i className="ri-arrow-right-up-line"></i>
          </button>
        </div>

        <div className="toptestcard">
          <h2>Blood Count Test</h2>
          <p>
            A doctor is a medical professional who diagnoses, treats, and
            prevents illnesses and injuries. They work in various{" "}
          </p>
          <button onClick={() => navigate("/labfiltering")}>
            Find Lab <i className="ri-arrow-right-up-line"></i>
          </button>
        </div>

        <div className="toptestcard">
          <h2>Blood Count Test</h2>
          <p>
            A doctor is a medical professional who diagnoses, treats, and
            prevents illnesses and injuries. They work in various{" "}
          </p>
          <button onClick={() => navigate("/labfiltering")}>
            Find Lab <i className="ri-arrow-right-up-line"></i>
          </button>
        </div>
        <div className="toptestcard">
          <h2>Blood Count Test</h2>
          <p>
            A doctor is a medical professional who diagnoses, treats, and
            prevents illnesses and injuries. They work in various{" "}
          </p>
          <button onClick={() => navigate("/labfiltering")}>
            Find Lab <i className="ri-arrow-right-up-line"></i>
          </button>
        </div>
      </div>

      <div className="">
        <h3 className="mobsechead" style={{ margin: "12px 0px 12px 0px" }}>
          Best labs near you
        </h3>

        {/* Render LabCard for each lab in labData */}
        {labdata.map((lab, index) => (
          <LabCard
            screen="/mobilelabprofile"
            key={index}
            data={{ details: lab, lab: true }}
            image={lab?.photo?.image1}
            name={lab.name}
            location={lab?.address}
            services={
              lab.services.length > 0
                ? lab.services.join(", ")
                : "No services available"
            }
            rating={lab.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default Labs;
