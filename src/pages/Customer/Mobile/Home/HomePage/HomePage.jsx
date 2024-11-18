import React from "react";
import "./homepage.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useTabBarContext } from "../../../../../contexts/MobileScreen/TabBarProvider";

function HomePage() {
  const navigate = useNavigate(); 
  const { handleUpdateActiveTab } = useTabBarContext();

  const { auth } = useAuth();
  const OnchatBot=()=>{
    if (auth.userId && auth.userType === "customer") {
      navigate("/bot")
    } else {
      navigate("/login")
    }
  }
  return (
    <div
      className="mobilehomemain"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* Mob Home */}

      <section>
        <div className="mobhometopnew flex">
          <div className="mobhometopnew-left flex">
            <div className="mobhometopnew-left-one">
              <h2
                style={{
                  width: "fit-content",
                  background:
                    "linear-gradient(45deg, #F02A2A, #E928E2, #3A65FD, #3DDBF0)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                2000 +
              </h2>
              <h3 style={{ marginTop: "5px" }}>Doctors </h3>

              <h3>Are Ready to </h3>
              <h3>Assist</h3>
            </div>
            <button
              className="btnwithclickableeffect"
              onClick={() => navigate("/searchdoctor")}
            >
              Search Doctor
            </button>
            <img src="../images/ex.png" alt="" />
          </div>
          <div className="mobhometopnew-right flex">
            <div
               onClick={() => navigate("/hospitalfilter")}
              className="mobhometopnew-rightcard flex"
              style={{ backgroundColor: "#FFDFD7" }}
            >
              <img src="./images/man.jpg" alt="" />

              <div>
                <h2 className="mobsearchtext">Search</h2>
                <h2 className="mobsearchtext2">Hospitals</h2>
              </div>
            </div>
            <div
             onClick={() => navigate("/labfiltering")}
              className="mobhometopnew-rightcard flex"
              style={{ backgroundColor: "#C4E3C5" }}
            >
              <img src="./images/man.jpg" alt="" />

              <div>
                <h2 className="mobsearchtext">Search</h2>
                <h2 className="mobsearchtext2">Labs</h2>
              </div>
            </div>
            <div
              onClick={() => navigate("/pharmacyproducts")}
              className="mobhometopnew-rightcard flex"
              style={{ backgroundColor: "#D6D8FF" }}
            >
              <img src="./images/man.jpg" alt="" />

              <div>
                <h2 className="mobsearchtext">Search</h2>
                <h2 className="mobsearchtext2">Products</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* bot Section */}

      <section className="">
        <div className="botintro flex">
          <div className="botintro-left">
            <h2
              style={{
                background:
                  "linear-gradient(45deg, #EF2A51, #EB29C2,#4462FC,#EB29C2)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Next Gen
            </h2>

            <h2
              style={{
                background: "linear-gradient(45deg, #EB29C2, #4462FC, #3CB4F5)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Medical <i className="ri-bard-fill"></i> Ai Is
            </h2>
            <h2
              style={{
                background: "linear-gradient(45deg, #EB29C2, #3C96F8)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Here
            </h2>
          </div>
          <div className="botintro-right flex">
            <button onClick={OnchatBot}>
              <span>Chat Now</span>
            </button>
          </div>
        </div>
      </section>

      {/* Discover Our Features */}

      <section className="">
        <div className="discover">
          <h1>Discover</h1>
          <h1>Our Features</h1>
        </div>
        <div className="featurescardsectionmob">
          <div
            style={{ backgroundColor: "#D7EBFF" }}
            className="featurescard1mob flex"
          >
            <div className="featurescard1mobtitle">
              <h2 style={{ fontWeight: "400" }}>Expert Insight for</h2>
              <h2>Your Health</h2>
              <h4 style={{ marginTop: "15px" }}>Question & Answer</h4>
              <h4 style={{ marginTop: "2px" }}>Second Opinion</h4>
            </div>
            <button onClick={()=>navigate("/secondopinion")}>
              Get Now <i className="ri-arrow-right-line"></i>
            </button>

            <img src="../images/ex.png" alt="" />
          </div>
          <div
            style={{ backgroundColor: "#FFDFD7" }}
            className="featurescard1mob flex"
          >
            <div className="featurescard1mobtitle">
              <h2 style={{ fontWeight: "400" }}>Medicine at</h2>
              <h2> Your Doorstep</h2>
              <h4 style={{ marginTop: "15px" }}>Get your Medicines</h4>
              <h4 style={{ marginTop: "2px" }}>Pharmacy</h4>
            </div>
            <button onClick={()=>navigate("/pharmacyproducts")}>
              Get Now <i className="ri-arrow-right-line"></i>
            </button>

            <img src="../images/medmain.png" alt="" />
          </div>

          <div
            style={{ backgroundColor: "#D6D8FF" }}
            className="featurescard1mob flex"
          >
            <div className="featurescard1mobtitle">
              <h2 style={{ fontWeight: "400" }}>Your Smile,</h2>
              <h2>Our Priority</h2>
              <h4 style={{ marginTop: "15px" }}>Home Nurse, Technician &More</h4>
              <h4 style={{ marginTop: "2px" }}>Home Services</h4>
            </div>
            <button onClick={()=>navigate("/homeservice")}>
              Get Now <i className="ri-arrow-right-line"></i>
            </button>

            <img src="../images/ser.png" alt="" />
          </div>

          <div
            style={{ backgroundColor: "#C4E3C5" }}
            className="featurescard1mob flex"
          >
            <div className="featurescard1mobtitle">
              <h2 style={{ fontWeight: "400" }}>Opportunities Towards</h2>
              <h2>Your Dream</h2>
              <h4 style={{ marginTop: "15px" }}>Doctor ,Home Nurse &More</h4>
              <h4 style={{ marginTop: "2px" }}>Careers</h4>
            </div>
            <button onClick={()=>navigate("/careers")}>
              Get Now <i className="ri-arrow-right-line"></i>
            </button>

            <img src="../images/job.png" alt="" />
          </div>
        </div>
      </section>

      {/* End Mob Home */}
    </div>
  );
}

export default HomePage;
