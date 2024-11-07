import React, { useEffect } from "react";
import "../Aboutus/about.css";
import Headroom from "react-headroom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <Headroom>
        <Navbar />
      </Headroom>

      <div className="container-third about-us flex">
        <div className="about-us-image">
          <img src="images/doc.jpg" alt="" />
        </div>

        <div className="about-para">
          <h1>
            About <span className="color-blue"> Us</span>
          </h1>
          <p style={{fontWeight:"500",fontSize:"20px"}}>
            Dr1 (Doctor One) is a comprehensive Online Healthcare Platform
            streamlining access to essential healthcare services. It functions
            as a one-stop solution where users can easily connect with doctors,
            hospitals, clinics, and diagnostic laboratories. Additionally, this
            online healthcare platform offers an online pharmacy, enabling users
            to conveniently order prescription and over-the-counter medicines.
            One of the standout features is the ability to obtain second
            opinions from an expert panel of doctors, ensuring patients receive
            the best possible advice and care. Dr1, the online healthcare
            platform, will also foster a medical community, where users can post
            health-related queries and receive guidance from qualified doctors.
            Our mission is to provide affordable and effective treatments,
            giving the public timely directions toward the right care, thus
            improving healthcare access. In addition to its core services, Dr1
            will offer medication management, including dosage instructions,
            reminders, and notifications to ensure proper usage. Our platform
            will provide vital information on potential adverse drug reactions
            (ADRs) and contribute to the fight against antibiotic resistance by
            educating users on safe antibiotic use. Finally, Dr1, in
            collaboration with healthcare professionals, will work to build
            caregiver capacity through training and support, further enhancing
            the health outcomes for patients and their families. Dr1 is an
            Online Healthcare Platform catering to those in need.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
