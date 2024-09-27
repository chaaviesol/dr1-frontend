import React, { useContext } from "react";
import styles from "./styles.module.css";
import HealthConcern from "../HealthConcern/HealthConcern";
import { useNavigate } from "react-router-dom";
import { SearchDocContext } from "../../../../../contexts/Doctor/SearchDoctorProvider";
import { MyContext } from "../../../../../contexts/Contexts";

function HealthConcernSlider() {
  const navigate = useNavigate();
  const { setFilters, setFilteredDoctors } = useContext(SearchDocContext);
  const { Categories } = useContext(MyContext);
  const speacializationNames = Categories?.allopathySpecs;
  const homeoDept = Categories?.homeopathySpecs;
  const ayurSpec = Categories?.ayurvedicSpecs;

  const handleSelectSpecialization = (specialization) => {
    setFilteredDoctors([]);
    const lowerCasedSpecialization = specialization.toLowerCase();
    let type = "Allopathy";
    if (
      ayurSpec.includes(lowerCasedSpecialization) ||
      ayurSpec.includes(specialization)
    ) {
      type = "Ayurvedic";
    } else if (
      homeoDept.includes(lowerCasedSpecialization) ||
      homeoDept.includes(specialization)
    ) {
      type = "Homeopathy";
    }
    // handleSearchData(type, lowerCasedSpecialization);
    setFilters({
      type: type,
      specializations: [lowerCasedSpecialization],
      gender: "",
      experience: 0,
      name: "",
    });
    navigate("/searchdoctor", { state: "hii" });
  };
  return (
    <>
      <div className={styles.healthConcernSlider}>
        {[1, 2, 3, 4, 5].map((index, issue) => (
          <HealthConcern
            key={index}
            image="/images/1 (6).jpg"
            concern={["Acne, pimple or ", <br key="break" />, "skin issues"]}
            onClick={() => handleSelectSpecialization("dermatology")}
          />
        ))}
      </div>
    </>
  );
}

export default HealthConcernSlider;
