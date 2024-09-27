import React, { useContext, useEffect, useState } from "react";
import Footer from "../../../../components/Footer";
import axios from "axios";
import "./MobileHosFiltering.css";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import { port } from "../../../../config";
import SearchBox from "./SearchBox/Index";
import { HospitalCard } from "../HospitalCard/HospitalCard";
import { Loader } from "../../../../components/Loader/Loader";
import Navbar from "../../../../components/Navbar";
import { useLocation } from "react-router-dom";
import { MyContext } from "../../../../contexts/Contexts";

export const MobileHosFiltering = () => {
  const [filters, setFilters] = useState({
    speciality: "",
    type: "",
    features: "",
  });
  const [notFound, setnotFound] = useState(false);
  const [hospitals, sethospitals] = useState([]);
  const [hospitalsFilter, sethospitalsFilter] = useState([]);
  const [speciality, setspeciality] = useState([]);
  const [loading, setloading] = useState(false);
  const [OpenModals, setOpenModals] = useState({
    speciality: false,
    features: false,
    type: false,
  });
  const { Categories } = useContext(MyContext);
  const speacializationNames = Categories?.allopathySpecs;
  const homeoDept = Categories?.homeopathySpecs;
  const ayurSpec = Categories?.ayurvedicSpecs;
  const type = Categories?.types;
  const features = Categories?.hospitalFeatures;
  const location = useLocation();
  const updateDocByPlace = (value) => {
    if (value?.length > 0) {
      sethospitals(value);
    } else {
      sethospitals([]);
    }
  };
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
      return typeMatch && speciality && nameMatch && features;
    });

    if (hospitalsFilter.length > 0) {
      if (filteredDocs.length === 0) {
        setnotFound(true);
      } else {
        console.log({ filteredDocs });
        sethospitalsFilter(filteredDocs);
        setnotFound(false);
      }
    } else {
      if (filteredDocs.length === 0) {
        setnotFound(true);
      } else {
        console.log({ filteredDocs });
        sethospitalsFilter(filteredDocs);
        setnotFound(false);
      }
    }
  }, [filters, hospitals]);

  const handleDocNameSearch = (value) => {
    const query = value.toLowerCase();
    setFilters({ ...filters, CheckingName: query });
    // if (hospitalsFilter?.length > 0) {
    //     const filteredData = hospitalsFilter.filter((data) => {
    //         const lowerCaseName = data?.name?.toLowerCase();
    //         return lowerCaseName?.startsWith(query[0]) &&
    //             lowerCaseName.includes(query);
    //     });
    //     if (filteredData?.length > 0) {
    //         setnotFound(false)
    //     } else {
    //         if (!query) {
    //             sethospitalsFilter(hospitals);
    //         } else {
    //             setnotFound(true)
    //         }
    //     }
    //     sethospitalsFilter(filteredData);
    // } else {
    //     const filteredData = hospitals?.filter((data) => {
    //         const lowerCaseName = data?.name?.toLowerCase();
    //         return lowerCaseName?.startsWith(query[0]) &&
    //             lowerCaseName?.includes(query);
    //     });
    //     if (filteredData?.length > 0) {
    //         setnotFound(false)
    //     } else {
    //         if (!query) {
    //             sethospitalsFilter(hospitals);
    //         } else {
    //             setnotFound(true)
    //         }
    //     }
    //     sethospitalsFilter(filteredData);
    // }
  };
  useEffect(() => {
    setloading(true);
    window.scrollTo(0, 0);
    axios.get(`${port}/hospital/list`).then((res) => {
      sethospitals(res.data.data);
      setloading(false);
    });
  }, []);
  const handleTypeChanges = (e) => {
    const { name, value } = e?.target;
    console.log("values>>>>", name, value);

    if (name === "speciality") {
      if (filters.speciality.includes(value)) {
        // If the value already exists, remove it
        setFilters({
          ...filters,
          speciality: filters.speciality.filter((item) => item !== value),
        });
      } else {
        // If it doesn't exist, add it
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
  const openModal = (e) => {
    const value = e?.target?.value;
    if (value === "features") {
      if (OpenModals?.features) {
        setOpenModals({ features: false });
      } else {
        setOpenModals({ features: true });
      }
    } else if (value === "speciality") {
      if (OpenModals?.speciality) {
        setOpenModals({ speciality: false });
      } else {
        setOpenModals({ speciality: true });
      }
    }
  };
  const closeModal = () => {
    setOpenModals({ speciality: false, features: false });
  };
  useEffect(() => {
    if (filters?.type === "Allopathy") {
      setspeciality(speacializationNames);
    } else if (filters?.type === "Ayurvedic") {
      setspeciality(ayurSpec);
    } else {
      setspeciality(homeoDept);
    }
  }, [filters]);
  useEffect(() => {
    // Set initial filters based on location state
    if (location?.state?.type || location?.state?.speciality) {
      setFilters({
        type: location?.state?.type,
        speciality: location?.state?.speciality
          ? [location?.state?.speciality]
          : [],
        features: [], // You might want to set other properties here too
      });
    }
  }, [location]);
  return (
    <>
      <div className="MobileLabAlign">
        <Navbar />
        <div className="MobileLabAlignFilter">
          <div className="MobileLabAlignFilterSearch">
            <SearchBox
              updateDocs={updateDocByPlace}
              docNames={handleDocNameSearch}
            />
          </div>
          <div className="MobileLabAlignFilterSec">
            <select
              onChange={handleTypeChanges}
              className="MobileLabAlignFilterSecButton"
              name="type"
              value={filters.type ?? ""}
              id=""
            >
              <option selected disabled>
                Type
              </option>
              {type?.map((name) => (
                <option value={name}>{name}</option>
              ))}
            </select>
            <button
              onClick={openModal}
              value={"speciality"}
              disabled={
                !filters.type ||
                filters.type === "Others" ||
                (!hospitalsFilter.length > 0 && !filters.speciality.length > 0)
                  ? true
                  : false
              }
              className={
                !filters.type ||
                (!hospitalsFilter.length > 0 &&
                  !filters.speciality.length > 0) ||
                filters.type === "Others"
                  ? "MobileLabAlignFilterSecButton2"
                  : "MobileLabAlignFilterSecButton"
              }
            >
              Speciality
            </button>
            <button
              onClick={openModal}
              value={"features"}
              disabled={
                !filters.type ||
                (!hospitalsFilter.length > 0 && !filters.features.length > 0) ||
                filters.type === "Others"
                  ? true
                  : false
              }
              className={
                !filters.type ||
                (!hospitalsFilter.length > 0 && !filters.features.length > 0) ||
                filters.type === "Others"
                  ? "MobileLabAlignFilterSecButton2"
                  : "MobileLabAlignFilterSecButton"
              }
            >
              Features
            </button>
          </div>
        </div>

        <div className="MobileLabAlignShowSec">
          {hospitalsFilter?.length > 0 ||
          filters.type ||
          filters?.speciality?.length > 0 ||
          filters?.features?.length > 0 ? (
            hospitalsFilter?.length > 0 && !notFound ? (
              hospitalsFilter?.map((details, index) => (
                <HospitalCard
                screen="/mobilehospitalprofile"
                  key={index}
                  data={{ details: details, hospital: true }}
                />
              ))
            ) : (
              <div className="HospitalNotfound">
                <h3>hospitals were not found.</h3>
              </div>
            )
          ) : (
            <>
              {hospitals?.length > 0 && !notFound ? (
                hospitals?.map((details, index) => (
                  <HospitalCard
                    key={index}
                    data={{ details: details, hospital: true }}
                  />
                ))
              ) : (
                <div className="HospitalNotfound">
                  <h3>hospital were not found.</h3>
                </div>
              )}
            </>
          )}
        </div>
        {loading && <Loader />}

        <Modal
          open={OpenModals?.speciality || OpenModals?.features}
          onClose={closeModal}
          className="MobileLabAlignModal"
        >
          <>
            <div className="MobileLabAlignModalSec">
              <div className="MobileLabAlignModalSecScroll">
                <FormGroup>
                  {OpenModals?.speciality
                    ? speciality?.map((name, index) => (
                        <FormControlLabel
                          name="speciality"
                          // disabled={
                          //     !filters.type || !hospitalsFilter.length > 0 && !filters.services.length > 0 ? true : false
                          // }
                          sx={{ borderBottom: "1px solid #00000021" }}
                          value={name}
                          onChange={handleTypeChanges}
                          key={index}
                          control={
                            <Checkbox
                              checked={filters?.speciality.includes(name)}
                              sx={{ "& .MuiSvgIcon-root": { fontSize: 26 } }}
                            />
                          }
                          label={<span style={{ fontSize: 20 }}>{name}</span>}
                        />
                      ))
                    : OpenModals?.features &&
                      features?.map((name, index) => (
                        <FormControlLabel
                          name="features"
                          value={name}
                          sx={{ borderBottom: "1px solid #00000021" }}
                          onChange={handleTypeChanges}
                          key={index}
                          control={
                            <Checkbox
                              checked={filters?.features.includes(name)}
                              sx={{ "& .MuiSvgIcon-root": { fontSize: 26 } }}
                            />
                          }
                          label={<span style={{ fontSize: 20 }}>{name}</span>}
                        />
                      ))}
                </FormGroup>
              </div>
              <div className="MobileLabAlignModalSecBtnApply">
                <button onClick={()=>setOpenModals({speciality:false})}>Apply</button>
              </div>
            </div>
          </>
        </Modal>
      </div>
      {/* <Footer /> */}
    </>
  );
};
