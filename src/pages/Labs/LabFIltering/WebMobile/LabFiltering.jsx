import React, { useContext, useEffect, useState } from "react";
import Footer from "../../../../components/Footer";
import axios from "axios";
import styles from "../../../Customer/doctor/DoctorSearch/DesktopView/searchdoc.module.css";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Navbar from "../../../../components/Navbar";
import { SearchBox } from "../SearchComponent/SearchBox";
import { features, services } from "../constatnts/Filter";
import { port } from "../../../../config";
import { Loader } from "../../../../components/Loader/Loader";
import { LabCard } from "../LabCard/LabCard";
import { useLocation } from "react-router-dom";
import { MyContext } from "../../../../contexts/Contexts";
export const LabFiltering = () => {
  const [filters, setFilters] = useState({
    services: "",
    type: "",
    features: "",
  });
  const { Categories, setCategories } = useContext(MyContext);

  const [lab, setlab] = useState([]);
  const [labFilter, setlabFilter] = useState([]);
  const [loading, setloading] = useState(false);
  const [notFound, setnotFound] = useState(false);
  const location = useLocation();
  const updateDocByPlace = (value) => {
    if (value?.length > 0) {
      setlab(value);
    } else {
      setlab([]);
      setlabFilter([]);
    }
  };

  const services = Categories?.laboratoryServices;
  const features = Categories?.laboratoryFeatures;

  useEffect(() => {
    if (lab.length === 0) {
      return;
    }
    const targetArray = [...lab];
    const filteredDocs = targetArray.filter((hospital) => {
      const services =
        filters?.services?.length === 0 ||
        filters?.services?.every((spec) => {
          return hospital?.services && hospital?.services?.includes(spec);
        });
      const features =
        filters?.features?.length === 0 ||
        filters?.features?.every((spec) => {
          return hospital?.features && hospital?.features?.includes(spec);
        });
      const nameMatch =
        !filters.CheckingName ||
        hospital.name
          .toLowerCase()
          .includes(filters.CheckingName.toLowerCase());
      return services && nameMatch && features;
    });

    if (labFilter.length > 0) {
      if (filteredDocs.length === 0) {
        setnotFound(true);
      } else {
        console.log({ filteredDocs });
        setlabFilter(filteredDocs);
        setnotFound(false);
      }
    } else {
      if (filteredDocs.length === 0) {
        setnotFound(true);
      } else {
        console.log({ filteredDocs });
        setlabFilter(filteredDocs);
        setnotFound(false);
      }
    }
  }, [filters, lab]);
  console.log("Lab>>>>", labFilter.length > 0 ? labFilter : lab);

  useEffect(() => {
    setloading(true);
    window.scrollTo(0, 0);
    axios.get(`${port}/lab/getlab`).then((res) => {
      console.log("res>>>", res);
      setlab(res.data.data);
      setloading(false);
    });
  }, []);
  const handleTypeChanges = (e) => {
    const { name, value } = e?.target;
    if (name === "services") {
      if (filters.services.includes(value)) {
        // If the value already exists, remove it
        setFilters({
          ...filters,
          services: filters.services.filter((item) => item !== value),
        });
      } else {
        // If it doesn't exist, add it
        setFilters({
          ...filters,
          services: [...filters.services, value],
        });
      }
    } else if (name === "features") {
      if (filters.features.includes(value)) {
        setFilters({
          ...filters,
          features: filters.features.filter((item) => item !== value),
        });
      } else {
        setFilters({
          ...filters,
          features: [...filters.features, value],
        });
      }
    } else if (name === "type") {
      setFilters({ ...filters, [name]: value });
    }
  };
  const handleDocNameSearch = (value) => {
    const query = value.toLowerCase();
    setFilters({ ...filters, CheckingName: query });
  };

  console.log("Filters>>>>>>", filters);
  useEffect(() => {
    // Set initial filters based on location state
    if (location?.state?.services) {
      setFilters({
        type: location?.state?.type,
        services: location?.state?.services ? [location?.state?.services] : [],
        features: [], // You might want to set other properties here too
      });
    }
  }, [location]);
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.section1}>
          <SearchBox
            updateDocs={updateDocByPlace}
            docNames={handleDocNameSearch}
          />
        </div>
        <div className={styles.section2}></div>
        <div className={styles.section3}>
          <div className={styles.leftSide}>
            <div className={styles.types}>
              <div>
                <span className={styles.leftHeadings}>Services</span>
              </div>
              <div>
                <FormGroup>
                  {services?.map((name, index) => (
                    <FormControlLabel
                      name="services"
                      value={name}
                      onChange={handleTypeChanges}
                      key={index}
                      control={
                        <Checkbox
                          checked={filters?.services?.includes(name)}
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
                        />
                      }
                      label={<span style={{ fontSize: 16 }}>{name}</span>}
                    />
                  ))}
                </FormGroup>
              </div>
            </div>
            <div className={styles.specialization}>
              <div>
                <span className={styles.leftHeadings}>Features</span>
              </div>
              <div>
                <FormGroup>
                  {features?.map((name, index) => (
                    <FormControlLabel
                      name="features"
                      onChange={handleTypeChanges}
                      key={index}
                      value={name}
                      control={
                        <Checkbox
                          checked={filters?.features?.includes(name)}
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
                        />
                      }
                      label={<span style={{ fontSize: 16 }}>{name}</span>}
                    />
                  ))}
                </FormGroup>
              </div>
            </div>
          </div>

          <div className="HospitalFilterHosSec">
            <div className={styles.rightSide}>
              <div className={styles.cardMainContainer}>
                {labFilter?.length > 0 ||
                filters?.services?.length > 0 ||
                filters?.features?.length > 0 ? (
                  labFilter?.length > 0 && !notFound ? (
                    labFilter?.map((details, index) => (
                      <LabCard
                        screen="/labdetails"
                        key={index}
                        data={{ details: details, lab: true }}
                      />
                    ))
                  ) : (
                    <div className="HospitalNotfound">
                      <h3>lab were not found.</h3>
                    </div>
                  )
                ) : (
                  <>
                    {lab?.length > 0 && !notFound ? (
                      lab?.map((details, index) => (
                        <LabCard
                          key={index}
                          data={{ details: details, lab: true }}
                        />
                      ))
                    ) : (
                      <div className="HospitalNotfound">
                        <h3>lab were not found.</h3>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading && <Loader />}
      <Footer />
    </>
  );
};
