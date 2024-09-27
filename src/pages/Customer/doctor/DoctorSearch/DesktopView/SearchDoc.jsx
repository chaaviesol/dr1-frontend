import { React, useContext, useEffect } from "react";
import Navbar from "../../../../../components/Navbar";
import SearchBox from "../MobileView/SearchBox/Index";
import styles from "./searchdoc.module.css";
import {
  FormControlLabel,
  FormGroup,
  IconButton,
  Radio,
  RadioGroup,
  Slider,
  Stack,
} from "@mui/material";
import {
  genderData,
} from "../../constants/filter";
import Footer from "../../../../../components/Footer";
import DocCard from "./DocCard/DocCard";
import { Add, Remove } from "@mui/icons-material";
import { Loader } from "../../../../../components/Loader/Loader";
import { SearchDocContext } from "../../../../../contexts/Doctor/SearchDoctorProvider";

export default function SearchDoc() {
  const {
    loading,
    filteredDoctors,
    docsBySearch,
    emptyResults,
    filters,
    selectedFilter,
    // functions---------------------------------------
    handleTypeChanges,
    handleGenderChanges,
    handleExpChange,
    handleExpChangeBtn,
    updateDocByPlace,
    handleDocNameSearch,
    types,
    getSpecializationOptions
  } = useContext(SearchDocContext);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  console.log(docsBySearch)

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
            <div className={styles.types}>
              <div>
                <span className={styles.leftHeadings}>Type</span>
              </div>
              <div>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue=""
                  name="radio-buttons-group"
                  value={selectedFilter?.type ?? ""}
                >
                  {types?.map((type, index) => (
                    <FormControlLabel
                      key={index}
                      value={type}
                      checked={filters.type === type}
                      onChange={handleTypeChanges}
                      control={
                        <Radio
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
                        />
                      }
                      label={<span style={{ fontSize: 16 }}>{type}</span>}
                    />
                  ))}
                </RadioGroup>
              </div>
            </div>
            <div className={styles.specialization}>
              <div>
                <span className={styles.leftHeadings}>
                  Specializations{" "}
                  {(filters.type === "Others" && 
                      <span style={{ fontSize: "14px", fontWeight: 300 }}>
                        (Not Applicable)
                      </span>
                    )}
                </span>
              </div>
              <div>
                <FormGroup>
                 {getSpecializationOptions()}
                </FormGroup>
              </div>
            </div>
            <div className={styles.gender}>
              <div>
                <span className={styles.leftHeadings}>Gender</span>
              </div>
              <div>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue=""
                  name="radio-buttons-group"
                  value={selectedFilter?.gender ?? ""}
                >
                  {genderData?.map((gender, index) => (
                    <FormControlLabel
                      onChange={handleGenderChanges}
                      key={index}
                      value={gender}
                      control={
                        <Radio
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
                        />
                      }
                      label={<span style={{ fontSize: 16 }}>{gender}</span>}
                    />
                  ))}
                </RadioGroup>
              </div>
            </div>
            <div className={styles.exp}>
              <div>
                <span className={styles.leftHeadings}>Experience </span>
              </div>
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
          </div>
          <div className={styles.rightSide}>
            <div className={styles.cardMainContainer}>
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
        </div>
      </div>
      <Footer />
    </>
  );
}
