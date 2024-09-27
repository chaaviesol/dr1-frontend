import React, { useContext, useEffect, useState } from "react";
import Footer from "../../../../components/Footer";
import axios from "axios";
import { Checkbox, FormControlLabel, FormGroup, Modal } from "@mui/material";
import "./MobileLabFilter.css";
import { port } from "../../../../config";
import Searchbox from "./SearchBox/Index";
import { features, services } from "../constatnts/Filter";
import { Filter } from "@mui/icons-material";
import { LabCard } from "../LabCard/LabCard";
import { Loader } from "../../../../components/Loader/Loader";
import Navbar from "../../../../components/Navbar";
import { useLocation } from "react-router-dom";
import { MyContext } from "../../../../contexts/Contexts";
export const MobileLabFilter = () => {
  const [filters, setFilters] = useState({
    services: "",
    type: "",
    features: "",
  });
  const [lab, setlab] = useState([]);
  const [labFilter, setlabFilter] = useState([]);
  const [loading, setloading] = useState(false);
  const [notFound, setnotFound] = useState(false);
  const [OpenModals, setOpenModals] = useState(false);
  const location = useLocation();

  const { Categories, setCategories } = useContext(MyContext);
  const services = Categories?.laboratoryServices;
  const features = Categories?.laboratoryFeatures;
  const updateDocByPlace = (value) => {
    if (value?.length > 0) {
      setlab(value);
    } else {
      setlab([]);
      setlabFilter([]);
    }
  };
  useEffect(() => {
    if (lab.length === 0) {
      return;
    }
    const targetArray = [...lab];
    const filteredDocs = targetArray.filter((lab) => {
      const services =
        filters?.services?.length === 0 ||
        filters?.services?.every((spec) => {
          return lab?.services && lab?.services?.includes(spec);
        });
      const features =
        filters?.features?.length === 0 ||
        filters?.features?.every((spec) => {
          return lab?.features && lab?.features?.includes(spec);
        });
      const nameMatch =
        !filters.CheckingName ||
        lab.name.toLowerCase().includes(filters.CheckingName.toLowerCase());
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
    // if (labFilter?.length > 0) {
    //     const filteredData = labFilter.filter((data) => {
    //         const lowerCaseName = data?.name?.toLowerCase();
    //         return lowerCaseName?.startsWith(query[0]) &&
    //             lowerCaseName.includes(query);
    //     });
    //     if (filteredData?.length > 0) {
    //         setnotFound(false)
    //     } else {
    //         if (!query) {
    //             setlabFilter(lab);
    //         } else {
    //             setnotFound(true)
    //         }
    //     }
    //     setlabFilter(filteredData);
    // } else {
    //     const filteredData = lab?.filter((data) => {
    //         const lowerCaseName = data?.name?.toLowerCase();
    //         return lowerCaseName?.startsWith(query[0]) &&
    //             lowerCaseName?.includes(query);
    //     });
    //     if (filteredData?.length > 0) {
    //         setnotFound(false)
    //     } else {
    //         if (!query) {
    //             setlabFilter(lab);
    //         } else {
    //             setnotFound(true)
    //         }
    //     }
    //     setlabFilter(filteredData);
    // }
  };

  console.log("Lab>>>>", labFilter.length > 0 ? labFilter : lab);
  // const handleDocNameSearch = (value) => {
  //     const query = value.toLowerCase();
  //     setFilters({ ...filters, CheckingName: query })
  // }

  useEffect(() => {
    setloading(true);
    window.scrollTo(0, 0);

    axios.get(`${port}/lab/getlab`).then((res) => {
      console.log("res>>>", res);
      setlab(res.data.data);
      setloading(false);
    });
  }, []);

  console.log("filters>>>>", filters);
  const openModal = (e) => {
    const value = e?.target?.value;
    if (value === "features") {
      if (OpenModals?.features) {
        setOpenModals({ features: false });
      } else {
        setOpenModals({ features: true });
      }
    } else {
      if (OpenModals?.services) {
        setOpenModals({ services: false });
      } else {
        setOpenModals({ services: true });
      }
    }
  };
  const closeModal = () => {
    setOpenModals({ services: false, features: false });
  };
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
    <div className="MobileLabAlign">
      <Navbar />
      <div className="MobileLabAlignFilter">
        <div className="MobileLabAlignFilterSearch">
          <Searchbox
            updateDocs={updateDocByPlace}
            docNames={handleDocNameSearch}
          />
        </div>
        <div className="MobileLabAlignFilterSec">
          <button
            onClick={openModal}
            value={"services"}
            className="MobileLabAlignFilterSecButton"
          >
            Services
          </button>
          <button
            onClick={openModal}
            value={"features"}
            className="MobileLabAlignFilterSecButton"
          >
            Features
          </button>
        </div>
      </div>

      <div className="MobileLabAlignShowSec">
        {labFilter?.length > 0 ||
        filters?.services?.length > 0 ||
        filters?.features?.length > 0 ? (
          labFilter?.length > 0 && !notFound ? (
            labFilter?.map((details, index) => (
              <LabCard
                screen="/mobilelabprofile"
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
                <LabCard key={index} data={{ details: details, lab: true }} />
              ))
            ) : (
              <div className="HospitalNotfound">
                <h3>lab were not found.</h3>
              </div>
            )}
          </>
        )}
      </div>
      {loading && <Loader />}

      <Modal
        open={OpenModals?.services || OpenModals?.features}
        onClose={closeModal}
        className="MobileLabAlignModal"
      >
        <div className="MobileLabAlignModalSec">
          <FormGroup>
            {OpenModals?.services
              ? services?.map((name, index) => (
                  <FormControlLabel
                    name="services"
                    // disabled={
                    //     !filters.type || !labFilter.length > 0 && !filters.services.length > 0 ? true : false
                    // }
                    sx={{ borderBottom: "1px solid #00000021" }}
                    value={name}
                    onChange={handleTypeChanges}
                    key={index}
                    control={
                      <Checkbox
                        checked={filters?.services.includes(name)}
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 26 } }}
                      />
                    }
                    label={<span style={{ fontSize: 20 }}>{name}</span>}
                  />
                ))
              : features?.map((name, index) => (
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
          <div className="MobileLabAlignModalSecBtnApply">
            <button onClick={() => setOpenModals({ features: false })}>
              Apply
            </button>
          </div>
        </div>
      </Modal>
      <Footer />
    </div>
  );
};
