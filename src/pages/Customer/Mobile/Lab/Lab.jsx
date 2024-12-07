import React, { useEffect, useState } from "react";
import "./labs.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../../config";
import Location from "../components/Location/Location";
import CartIcon from "../../../../components/CartIcon";
import ClickToSearchBox from "../components/ClickToSearchBox/ClickToSearchBox";

function Labs() {
  const [labdata, SetLabdata] = useState([]);
  const [isShowLocationModal, setShowLocationModal] = useState(false);

  // LabCard Component to display lab details
  const navigate = useNavigate();
  const LabCard = ({
    image,
    name,
    location,
    services,
    rating,
    screen,
    data,
  }) => {
    const StarRating = () => {
      const maxRating = 5;
      const stars = [];

      for (let i = 1; i <= maxRating; i++) {
        stars.push(
          i <= rating ? (
            <i
              key={i}
              className="ri-star-fill"
              style={{ marginRight: "8px", fontSize: "16px", color: "#f59e0b" }}
            />
          ) : (
            <i
              key={i}
              className="ri-star-fill"
              style={{ color: "gray", marginRight: "5px", fontSize: "16px" }}
            />
          )
        );
      }

      return <div>{stars}</div>;
    };
    return (
      <div
        className="bestlabmobcard flex"
        onClick={() => navigate(screen, { state: { data: data?.details } })}
      >
        <img src={image} alt={name} className="lab-image" />
        <div className="bestlabmobcardright flex">
          <h2>{name}</h2>
          <div className="bestlabmobcardrightstar flex">
            <StarRating />
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
      <div className="lablocationtop">
        <Location
          isShowLocationModal={isShowLocationModal}
          setShowLocationModal={setShowLocationModal}
        />
        <div style={{ height: "50px", width: "50px" }}>
          <CartIcon dontNavigate={true} />{" "}
        </div>
      </div>

      <div style={{ width: "100%", height: "50px",marginTop:"10px" }}>
        <ClickToSearchBox placeholder="Find tests" />
      </div>

      <div className="labcategory">
        <div className="labcategory__item">
          <img src="../images/flask.png" className="labcategory__image" />
          <p className="labcategory__text">Book Lab Tests</p>
        </div>
        <div className="labcategory__item">
          <img
            src="../images/medical-report.png"
            className="labcategory__image"
          />
          <p className="labcategory__text">Popular Health Checks</p>
        </div>
        <div className="labcategory__item">
          <img src="../images/x-ray.png" className="labcategory__image" />
          <p className="labcategory__text">X-Ray,Scan & MRI</p>
        </div>
      </div>

      <div
        className="labtitlebtn flex"
        style={{ marginBottom: "0px", marginTop: "1 0px" }}
      >
        <div>
          <h3 className="mobsecheadlab"> Health Concern Tests</h3>
        </div>
        <div class="primaryButton">
          <span>
            View More <i class="ri-arrow-right-up-line"></i>
          </span>
        </div>
      </div>

      <div className="healthconcerntest">
        <div className="healthconcerntest_item">
          <p className="labcategory__text">Cancer</p>
          <img
            src="../images/lab-technician.png"
            className="labcategory__image"
          />
        </div>
        <div className="healthconcerntest_item">
          <p className="labcategory__text">Diabetes</p>
          <img
            src="../images/lab-technician.png"
            className="labcategory__image"
          />
        </div>

        <div className="healthconcerntest_item">
          <p className="labcategory__text">Diabetes</p>
          <img
            src="../images/medical-report.png"
            className="labcategory__image"
          />
        </div>

        <div className="healthconcerntest_item">
          <p className="labcategory__text">Diabetes</p>
          <img
            src="../images/lab-technician.png"
            className="labcategory__image"
          />
        </div>

        <div className="healthconcerntest_item">
          <p className="labcategory__text">Diabetes</p>
          <img
            src="../images/lab-technician.png"
            className="labcategory__image"
          />
        </div>

        <div className="healthconcerntest_item">
          <p className="labcategory__text">Diabetes</p>
          <img
            src="../images/lab-technician.png"
            className="labcategory__image"
          />
        </div>
      </div>

      <div className="labtitlebtn flex">
        <div>
          <h3 className="mobsecheadlab">Book Popular Tests</h3>
        </div>
        <div class="primaryButton">
          <span>
            View More <i class="ri-arrow-right-up-line"></i>
          </span>
        </div>
      </div>

      <div className="filtersectionlab flex">
        <div className="filtersectionlabmain">
          <div className="filtersectionlabsec">
            <h4>
              <i class="ri-equalizer-line" style={{ marginRight: "8px" }}></i>
              Filter
            </h4>
          </div>
        </div>

        <div className="filtersectionlabsubs flex">
          <div className="filtersectionlabsec">
            <h4>
              Cancer
              <i class="ri-arrow-down-s-line" style={{ marginLeft: "8px" }}></i>
            </h4>
          </div>

          <div className="filtersectionlabsec">
            <h4>
              Filter
              <i class="ri-arrow-down-s-line" style={{ marginLeft: "8px" }}></i>
            </h4>
          </div>

          <div className="filtersectionlabsec">
            <h4>
              Filter
              <i class="ri-arrow-down-s-line" style={{ marginLeft: "8px" }}></i>
            </h4>
          </div>

          <div className="filtersectionlabsec">
            <h4>
              Filter
              <i class="ri-arrow-down-s-line" style={{ marginLeft: "8px" }}></i>
            </h4>
          </div>
        </div>
      </div>

      <div className="booklabtest flex">
        <div>
          <h4>Pap test (also called Pap smears)</h4>
          <h3>₹ 245</h3>
        </div>

        <button>Add</button>
      </div>

      <div className="booklabtest flex">
        <div>
          <h4>Prostate specific antigen (PSA)</h4>
          <h3>₹ 245</h3>
        </div>

        <button>Add</button>
      </div>

      <div className="booklabtest flex">
        <div>
          <h4>Diabetes or prediabetes</h4>
          <h3>₹ 245</h3>
        </div>

        <button>Add</button>
      </div>

      <div className="booklabtest flex">
        <div className="booklabtestdiv">
          <h4>Cholesterol measurements</h4>
          <h3>₹1000</h3>
        </div>

        <button>Add</button>
      </div>

      <div className="">
        <div
          className="labtitlebtn flex"
          style={{ marginBottom: "0px", marginTop: "30px" }}
        >
          <div>
            <h3 className="mobsecheadlab">Top Labs Near You</h3>
          </div>
          <div class="primaryButton">
            <span>
              View More <i class="ri-arrow-right-up-line"></i>
            </span>
          </div>
        </div>
      </div>

      <div
        className="filtersectionlab flex"
        style={{ marginBottom: "0px", marginTop: "10px" }}
      >
        <div className="filtersectionlabmain">
          <div className="filtersectionlabsec">
            <h4>
              <i class="ri-equalizer-line" style={{ marginRight: "8px" }}></i>
              Filter
            </h4>
          </div>
        </div>

        <div className="filtersectionlabsubs flex">
          <div className="filtersectionlabsec">
            <h4>
              Cancer
              <i class="ri-arrow-down-s-line" style={{ marginLeft: "8px" }}></i>
            </h4>
          </div>

          <div className="filtersectionlabsec">
            <h4>
              Filter
              <i class="ri-arrow-down-s-line" style={{ marginLeft: "8px" }}></i>
            </h4>
          </div>

          <div className="filtersectionlabsec">
            <h4>
              Filter
              <i class="ri-arrow-down-s-line" style={{ marginLeft: "8px" }}></i>
            </h4>
          </div>

          <div className="filtersectionlabsec">
            <h4>
              Filter
              <i class="ri-arrow-down-s-line" style={{ marginLeft: "8px" }}></i>
            </h4>
          </div>
        </div>
      </div>

      <div className="toptestcard2sec">
        <div className="toptestcard2">
          <h2>Docone basic health checkup</h2>
          <p>
            A doctor is a medical professional who diagnoses, treats, and
            prevents illnesses and injuries.
          </p>

          <span>42 Lab Tests</span>

          <div className="flex pkgicon">
            <h4 style={{ color: "#047857" }}>
              <i class="fi fi-ss-flask"></i> Center
            </h4>
            <h4 style={{ color: "#d97706" }}>
              <i class="fi fi-sr-house-blank"></i> Home
            </h4>
          </div>

          <div className="packages-card-price flex">
            <h3>₹ 1000</h3>
            <button>Add</button>
          </div>
        </div>

        <div className="toptestcard2">
          <h2>Docone basic health checkup</h2>
          <p>
            A doctor is a medical professional who diagnoses, treats, and
            prevents illnesses and injuries. They work in various{" "}
          </p>
          <span>42 Lab Tests</span>

          <div className="flex pkgicon">
            <h4 style={{ color: "#047857" }}>
              <i class="fi fi-ss-flask"></i> Center
            </h4>
            <h4 style={{ color: "#d97706" }}>
              <i class="fi fi-sr-house-blank"></i> Home
            </h4>
          </div>

          <div className="packages-card-price flex">
            <h3>₹ 1000</h3>
            <button>Add</button>
          </div>
        </div>
      </div>

      <div className="">
        <div className="labtitlebtn flex">
          <div>
            <h3 className="mobsecheadlab">Top Labs Near You</h3>
          </div>
          <div class="primaryButton">
            <span>
              View More <i class="ri-arrow-right-up-line"></i>
            </span>
          </div>
        </div>

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
