import React, { useContext, useEffect, useState } from "react";
import styles from "./index.module.css";
import Navbar from "../../../../../components/Navbar";
import SearchBox from "../MobileView/SearchBox/Index";
import { genderData } from "../../constants/filter";
import DocCard from "./DocCard/Index";

import { SearchDocContext } from "../../../../../contexts/Doctor/SearchDoctorProvider";
import { Loader } from "../../../../../components/Loader/Loader";
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Modal,
  Slider,
  Stack,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { MyContext } from "../../../../../contexts/Contexts";

const SearchDocMobileScreen = () => {
const { Categories } = useContext(MyContext);
  const speacializationNames = Categories?.allopathySpecs;
  const homeoDept = Categories?.homeopathySpecs;
  const ayurSpec = Categories?.ayurvedicSpecs;
  const types = Categories?.types;
  const [isShowSpecModal, setIsShowSpecModal] = useState(false);
  const [isShowExpModal, setIsShowExpModal] = useState(false);
  const [selectedSpecs, setSelectedSpecs] = useState([]);
  const {
    loading,
    filteredDoctors,
    docsBySearch,
    emptyResults,
    passedSpecialization,
    filters,
    setFilters,
    selectedFilter,
    // functions
    handleTypeChanges,
    handleGenderChanges,
    handleExpChange,
    handleExpChangeBtn,
    updateDocByPlace,
    handleDocNameSearch,
  } = useContext(SearchDocContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTempSelectedSpecs = (event) => {
    const { checked, name } = event.target;
    const specialization = name.toLowerCase();
    let data = [...selectedSpecs];
    if (checked) {
      data.push(specialization);
      setSelectedSpecs(data);
    } else {
      const specIndex = selectedSpecs.indexOf(specialization);
      data.splice(specIndex, 1);
      setSelectedSpecs(data);
    }
  };
  console.log(selectedSpecs);
  //apply button
  const handleMoveTempSpecs = () => {
    setFilters({ ...filters, specializations: selectedSpecs });
    setIsShowSpecModal(false);
  };
  //return true or false..manage checkbox is checked or not
  const handleCheckBoxChecked = (specialization) => {
    const lowerCasedSpec = specialization.toLowerCase();
    if (selectedSpecs.includes(lowerCasedSpec)) {
      return true;
    }
    return false;
  };

  const getSpecsBasedOnTypes = () => {
    if (!filters.type) return null;
    let targetArray = [];
    switch (filters.type) {
      case "Allopathy":
        targetArray = speacializationNames;
        break;
      case "Ayurvedic":
        targetArray = ayurSpec;
        break;
      case "Homeopathy":
        targetArray = homeoDept;
        break;
      default:
        return null;
    }
    return targetArray?.map((specialization, index) => (
      <>
        <FormControlLabel
          key={index}
          name={specialization}
          checked={handleCheckBoxChecked(specialization)}
          sx={{
            "& .MuiFormControlLabel-label": {
              fontSize: "16px", // Set font size for the label
            },
            "& .MuiSvgIcon-root": {
              width: "1.7em", // Set checkbox size
              height: "2em", // Set checkbox size
            },
          }}
          control={<Checkbox onChange={handleTempSelectedSpecs} />}
          label={specialization}
          value={specialization}
        />
        <Divider />
      </>
    ));
  };

  return (
    <>
      <Navbar />
      <div className={styles.mainContainer}>
        <div className={styles.searchBox}>
          <SearchBox
            updateDocs={updateDocByPlace}
            docNames={handleDocNameSearch}
          />
        </div>
        <div className={styles.filterSection}>
          <select
            disabled={passedSpecialization ? true : false}
            onChange={(e) => {
              handleTypeChanges(e);
              setSelectedSpecs([]);
            }}
            name=""
            value={filters.type ?? ""}
            id=""
          >
            <option value="" disabled selected>
              Type
            </option>
            {types?.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsShowSpecModal(!isShowSpecModal)}
            disabled={!filters.type || filters.type === "Others" ? true : false}
          >
            Specializations
          </button>
          <Modal
            open={isShowSpecModal}
            onClose={() => {
              setIsShowSpecModal(false);
              // setSelectedSpecs([])
            }}
          >
            <div className={styles.modalContainer}>
              <FormControl className={styles.formControl} component="fieldset">
                <FormGroup>{getSpecsBasedOnTypes()}</FormGroup>
              </FormControl>
              <div className={styles.specSaveBtnContainer}>
                <button type="button" onClick={handleMoveTempSpecs}>
                  Apply
                </button>
              </div>
            </div>
          </Modal>
          <select
            name=""
            id=""
            onChange={handleGenderChanges}
            value={filters.gender ?? ""}
          >
            <option value="" disabled selected>
              Gender
            </option>
            {genderData?.map((gender, index) => (
              <option key={index} value={gender}>
                {gender}
              </option>
            ))}
          </select>
          <button onClick={() => setIsShowExpModal(true)}>Experience</button>
          <Modal open={isShowExpModal} onClose={() => setIsShowExpModal(false)}>
            <div className={styles.modalContainer}>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
              >
                <IconButton onClick={() => handleExpChangeBtn("minus")}>
                  <Remove />
                </IconButton>
                <Slider
                  aria-label="experience"
                  defaultValue={0}
                  shiftstep={30}
                  valueLabelDisplay="on"
                  step={1}
                  value={filters?.experience}
                  onChange={handleExpChange}
                  min={0}
                  max={50}
                  valueLabelFormat={(value) => `${value} year${value !== 1 ? 's' : ''}`}
                />
                <IconButton onClick={() => handleExpChangeBtn("add")}>
                  <Add />
                </IconButton>
              </Stack>
            </div>
          </Modal>
        </div>
        <div className={styles.cardSection}>
          {loading ? (
            <Loader />
          ) : emptyResults ? (
            <h4> No Doctors found</h4>
          ) : docsBySearch.length > 0 ? (
            docsBySearch?.map((details, index) => (
              <DocCard key={index} data={{ details: details }} />
            ))
          ) : (
            filteredDoctors?.map((details, index) => (
              <DocCard key={index} data={{ details: details }} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default SearchDocMobileScreen;
