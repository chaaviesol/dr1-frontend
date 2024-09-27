import React, { useContext, useEffect, useState } from "react";
import "./HospitalFiltering.css";
import Footer from "../../../../components/Footer";
import axios from "axios";
import styles from "../../doctor/DoctorSearch/DesktopView/searchdoc.module.css";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
} from "@mui/material";
import Navbar from "../../../../components/Navbar";
import { SearchBox } from "../SearchComponent/SearchBox";
import { port } from "../../../../config";
import { Loader } from "../../../../components/Loader/Loader";
import { HospitalCard } from "../HospitalCard/HospitalCard";
import { useLocation } from "react-router-dom";
import { MyContext } from "../../../../contexts/Contexts";
export const HospitalFiltering = () => {
  const [filters, setFilters] = useState({
    speciality: "",
    type: "",
    features: "",
    focusArea:""
  });
  const location = useLocation();
  const [notFound, setnotFound] = useState(false);
  const [hospitals, sethospitals] = useState([]);
  const [speciality, setspeciality] = useState([]);
  const [hospitalsFilter, sethospitalsFilter] = useState([]);
  const [loading, setloading] = useState(false);
  const { Categories, setCategories } = useContext(MyContext);

  const speacializationNames = Categories?.allopathySpecs;
  const homeoDept = Categories?.homeopathySpecs;
  const ayurSpec = Categories?.ayurvedicSpecs;
  const type = Categories?.types;
  const features = Categories?.hospitalFeatures;

  const updateDocByPlace = (value, Place) => {
    if (value?.length > 0) {
      sethospitals(value);
    } else {
      sethospitals([]);
      sethospitalsFilter([]);
    }
  };
  console.log("hospitalsFilter>>>>>", hospitalsFilter);
  useEffect(() => {
    if (hospitals.length === 0) {
      return;
    }
    const targetArray = [...hospitals];
    const filteredDocs = targetArray.filter((hospital) => {
      const typeMatch =
        !filters?.type ||
        hospital?.type?.toLowerCase() === filters?.type?.toLowerCase();
      const speciality =
        filters?.speciality.length === 0 ||
        filters?.speciality?.every((spec) => {
          return hospital?.speciality && hospital?.speciality?.includes(spec);
        });
      const features =
        filters?.features.length === 0 ||
        filters?.features?.every((spec) => {
          return hospital?.feature && hospital?.feature?.includes(spec);
        });
      const nameMatch =
        !filters.CheckingName ||
        hospital.name
          .toLowerCase()
          .includes(filters.CheckingName.toLowerCase());
          const focusArea =
          filters?.focusArea.length === 0 ||
          filters?.focusArea?.some((area) => {
            return hospital?.focusarea && hospital?.focusarea?.includes(area);
          });
      return typeMatch && speciality && nameMatch && features && focusArea;
    });

    if (hospitalsFilter.length > 0) {
      if (filteredDocs.length === 0) {
        setnotFound(true);
      } else {
        sethospitalsFilter(filteredDocs);
        setnotFound(false);
      }
    } else {
      if (filteredDocs.length === 0) {
        setnotFound(true);
      } else {
        sethospitalsFilter(filteredDocs);
        setnotFound(false);
      }
    }
  }, [filters, hospitals]);

  const handleDocNameSearch = (value) => {
    const query = value.toLowerCase();
    setFilters({ ...filters, CheckingName: query });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    setloading(true);
    callApi();
  }, []);
  const callApi = () => {
    axios.get(`${port}/hospital/list`).then((res) => {
      console.log(res);
      sethospitals(res.data.data);
      setloading(false);
    });
  };
  console.log("hospitals>>>", hospitals);
  useEffect(() => {
    if (filters?.type === "Allopathy") {
      setspeciality(speacializationNames);
    } else if (filters?.type === "Ayurvedic") {
      setspeciality(ayurSpec);
    } else {
      setspeciality(homeoDept);
    }
  }, [filters]);

  const handleTypeChanges = (e) => {
    const { name, value } = e?.target;
    if (name === "speciality") {
      if (filters.speciality.includes(value)) {
        // If the value already exists, remove it
        setFilters({
          ...filters,
          speciality: filters.speciality.filter((item) => item !== value),
        });
      } else {
        setFilters({
          ...filters,
          speciality: [...filters.speciality, value],
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
  console.log("Filters>>>>>>", filters);
  useEffect(() => {
    // Set initial filters based on location state
    if (location?.state?.type || location?.state?.speciality || location?.state?.focusArea) {
      setFilters({
        type: location?.state?.type,
        speciality: location?.state?.speciality
          ? [location?.state?.speciality]
          : [],
          focusArea: location?.state?.focusArea
          ? [location?.state?.focusArea]
          : [],
        features: [], // You might want to set other properties here too
      });
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.section1}>
          <div className={styles.box}>
            <SearchBox
              updateDocs={updateDocByPlace}
              docNames={handleDocNameSearch}
            />
          </div>
        </div>
        <div className={styles.section2}></div>
        <div className={styles.section3}>
          <div className={styles.leftSide}>
            <div className={styles.gender}>
              <div>
                <span className={styles.leftHeadings}>Type</span>
              </div>
              <div>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue=""
                  name="radio-buttons-group"
                >
                  {type?.map((types, index) => (
                    <FormControlLabel
                      // disabled={location?.state?.type ? true : false}
                      onChange={handleTypeChanges}
                      key={index}
                      value={types}
                      name="type"
                      control={
                        <Radio
                          checked={types === filters?.type}
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
                        />
                      }
                      label={<span style={{ fontSize: 16 }}>{types}</span>}
                    />
                  ))}
                </RadioGroup>
              </div>
            </div>
            <div className={styles.types}>
              <div>
                <span className={styles.leftHeadings}>Specialties</span>
              </div>
              <div className="HosFilteringSpeciHeight">
                <FormGroup
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  {speciality?.map((name, index) => (
                    <FormControlLabel
                      name="speciality"
                      disabled={
                        !filters.type ||
                        (!hospitalsFilter.length > 0 &&
                          !filters.speciality.length > 0) ||
                        filters.type === "Others"
                          ? true
                          : false
                      }
                      value={name}
                      onChange={handleTypeChanges}
                      key={index}
                      control={
                        <Checkbox
                          checked={filters?.speciality.includes(name)}
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
                      disabled={!filters.type || notFound ? true : false}
                      onChange={handleTypeChanges}
                      key={index}
                      value={name}
                      control={
                        <Checkbox
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

          <div className={styles.rightSide}>
            <div className={styles.cardMainContainer}>
              {hospitalsFilter.length > 0 ||
              filters.type ||
              filters?.speciality?.length > 0 ||
              filters?.features?.length > 0 ? (
                hospitalsFilter.length > 0 && !notFound ? (
                  hospitalsFilter.map((details, index) => (
                    <HospitalCard
                      screen="/hospitaldetailed"
                      key={index}
                      data={{ details: details, hospitals: true }}
                    />
                  ))
                ) : (
                  <div className="HospitalNotfound">
                    <h3>Hospitals were not found.</h3>
                  </div>
                )
              ) : (
                <>
                  {hospitals.length > 0 && !notFound ? (
                    hospitals.map((details, index) => (
                      <HospitalCard
                        key={index}
                        data={{ details: details, hospitals: true }}
                      />
                    ))
                  ) : (
                    <div className="HospitalNotfound">
                      <h3>Hospitals were not found.</h3>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {loading && <Loader />}

      <Footer />
    </>
  );
};
