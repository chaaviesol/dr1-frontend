import React from "react";
import "./Searchpage.css";
import ScrollableButtonRow from "../Pharmacy/components/ScrollableButtons";
import AvatarWithLocation from "../components/AvatarWithLocation/AvatarWithLocation";


const Searchpage = () => {
  const location="/images/mobile/musthu/images/"
  const doctors = [
    {
      name: "Dr. Cameron Williamson",
      specialty: "Dentist, Cosmetic",
      image: "/images/mobile/musthu/images/user.png",
    },
    {
      name: "Dr. Brooklyn Simmons",
      specialty: "Dentist, Cosmetic",
      image: "/images/mobile/musthu/images/user.png",
    },
    {
      name: "Dr. Brooklyn Simmons",
      specialty: "Dentist, Cosmetic",
      image: "/images/mobile/musthu/images/user.png",
    },
    {
      name: "Dr. Brooklyn Simmons",
      specialty: "Dentist, Cosmetic",
      image: "/images/mobile/musthu/images/user.png",
    },
    {
      name: "Dr. Brooklyn Simmons",
      specialty: "Dentist, Cosmetic",
      image: "/images/mobile/musthu/images/user.png",
    },
    {
      name: "Dr. Brooklyn Simmons",
      specialty: "Dentist, Cosmetic",
      image: "/images/mobile/musthu/images/user.png",
    },
  ];

  return (
    <div className="doctor-search-container">
      <AvatarWithLocation/>


      <ScrollableButtonRow />

      <div className="doctor-list">
        {doctors.map((doctor, index) => (
          <div key={index} className="doctor-card">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="doctor-image"
            />
            <h3 className="doctor-name">{doctor.name}</h3>
            <p className="doctor-specialty">{doctor.specialty}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Searchpage;
