import { useState, createContext, useContext, useEffect } from "react";
import { MyContext } from "../Contexts";
import axios from "axios";
import { port } from "../../config";
import { Checkbox, FormControlLabel } from "@mui/material";

export const SearchDocContext = createContext();

export default function SearchDoctorProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [allDocData, setAllDocData] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [docsBySearch, setDocsBySearch] = useState([]);
  const [allDocsBySearch, setAllDocsBySearch] = useState([]);
  const [emptyResults, setEmptyResults] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    type: "",
    gender: "",
  }); //for maintaining selected items in both screens
  const { passedSpecialization, passedType } = useContext(MyContext); //coming from doctor main page..by selecting specialization
  const [filters, setFilters] = useState({
    type: "",
    specializations: [],
    gender: "",
    experience: 0,
    name: "",
  });
  const { Categories } = useContext(MyContext);

  const types = Categories?.types;
  const speacializationNames = Categories?.allopathySpecs;
  const homeoDept = Categories?.homeopathySpecs;
  const ayurSpec = Categories?.ayurvedicSpecs;

  const handleTypeChanges = (event) => {
    const { value } = event.target;
    setSelectedFilter({
      ...selectedFilter,
      type: value,
    });
    setFilters({ ...filters, specializations: [], type: value });
  };
  const handleSpecializationChanges = (event) => {
    const { checked, name } = event.target;
    const specialization = name.toLowerCase();

    if (checked && !filters.specializations.includes(specialization)) {
      const updatedSpecializations = [
        ...filters.specializations,
        specialization,
      ];
      setFilters({ ...filters, specializations: updatedSpecializations });
    } else if (!checked) {
      setFilters((prev) => ({
        ...prev,
        specializations: prev.specializations.filter(
          (spec) => spec !== specialization
        ),
      }));
    }
  };

  const handleGenderChanges = (event) => {
    const { value } = event.target;
    setFilters({ ...filters, gender: value });
    setSelectedFilter({ ...selectedFilter, gender: value });
  };

  useEffect(() => {
    if (allDocData?.length === 0) {
      return;
    }
    const targetArray =
      allDocsBySearch?.length > 0 ? [...allDocsBySearch] : [...allDocData];

    const filteredDocs = targetArray.filter((doctor) => {
      const typeMatch =
        !filters?.type ||
        doctor?.type?.toLowerCase() === filters?.type?.toLowerCase();
      const specializationsMatch =
        filters?.specializations.length === 0 ||
        filters?.specializations.includes(doctor.specialization?.toLowerCase());
      const genderMatch =
        !filters?.gender ||
        doctor.gender.toLowerCase() === filters.gender?.toLowerCase();
      const doctorExperince = new Date().getFullYear() - doctor?.experience;

      const experienceMatch =
        !filters.experience || doctorExperince >= filters.experience;

      const nameMatch =
        !filters.name ||
        doctor.name.toLowerCase().includes(filters.name.toLowerCase());
      return (
        typeMatch &&
        genderMatch &&
        specializationsMatch &&
        experienceMatch &&
        nameMatch
      );
    });

    if (allDocsBySearch.length > 0) {
      if (filteredDocs.length === 0) {
        // setAllDocsBySearch([])
        setEmptyResults(true);
      } else {
        // console.log({ filteredDocs });
        setDocsBySearch(filteredDocs);
        setEmptyResults(false);
      }
    } else {
      if (filteredDocs.length === 0) {
        setEmptyResults(true);
      } else {
        // console.log({ filteredDocs });
        setFilteredDoctors(filteredDocs);
        setEmptyResults(false);
      }
    }
  }, [filters]);

  const getAllDoctorsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${port}/doctor/complete_data`);
      const allDoctorsDetails = response.data.data;
      if (passedSpecialization) {
        handlePassedSpecialization(allDoctorsDetails);
      } else {
        setAllDocData(allDoctorsDetails);
        setFilteredDoctors(allDoctorsDetails);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllDoctorsData();
  }, [passedSpecialization]);

  const handlePassedSpecialization = (DoctorsDetails) => {
    setFilters((prev) => ({
      specializations: [passedSpecialization],
      type: passedType,
    }));
    setAllDocData(DoctorsDetails);
    setFilteredDoctors(DoctorsDetails);
  };

  // console.log({ allDocData });
  // console.log({ filteredDoctors });
  // console.log({ filters });
  //

  const handleExpChange = (event) => {
    const experience = event.target.value;

    setFilters({ ...filters, experience });
  };

  const handleExpChangeBtn = (clickedBtn) => {
    if (clickedBtn === "add" && filters?.experience < 75) {
      setFilters((prev) => ({
        ...prev,
        experience: prev.experience + 1,
      }));
    } else if (clickedBtn === "minus" && filters?.experience > 0) {
      setFilters((prev) => ({
        ...prev,
        experience: prev.experience - 1,
      }));
    }
  };
  //handle location click and filter docs function
  const updateDocByPlace = (data) => {
    if (data?.length === 0) {
      setEmptyResults(true);
      setDocsBySearch([]);
      return;
    }
    if (passedSpecialization && passedType) {
      //if specialization coming from doc page filter the search results also
      handlePassedSpecialization(data);
    } else {
      setAllDocsBySearch(data);
      setFilters({ ...filters, kk: "kk" });
    }
  };

  const handleDocNameSearch = (value) => {
    setFilters({ ...filters, name: value });
  };

  // return specializations based on the selected type//
  const getSpecializationOptions = () => {
    // if (!filters.type) return null; now showing default specs allopathy if no stype selected

    switch (filters.type) {
      case "Allopathy":
        return speacializationNames?.map((name, index) => (
          <FormControlLabel
            name={name}
            checked={
              filters.specializations.length !== 0 &&
              filters.specializations.includes(name.toLowerCase())
            }
            disabled={filters.type === "Others" && true}
            onChange={handleSpecializationChanges}
            key={index}
            control={
              <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }} />
            }
            label={<span style={{ fontSize: 16 }}>{name}</span>}
          />
        ));
      case "Ayurvedic":
        return ayurSpec?.map((name, index) => (
          <FormControlLabel
            name={name}
            checked={
              filters.specializations.length !== 0 &&
              filters.specializations.includes(name.toLowerCase())
            }
            disabled={filters.type === "Others" || (!filters.type && true)}
            onChange={handleSpecializationChanges}
            key={index}
            control={
              <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }} />
            }
            label={<span style={{ fontSize: 16 }}>{name}</span>}
          />
        ));
      case "Homeopathy":
        return homeoDept?.map((name, index) => (
          <FormControlLabel
            name={name}
            checked={
              filters.specializations.length !== 0 &&
              filters.specializations.includes(name.toLowerCase())
            }
            disabled={filters.type === "Others" || (!filters.type && true)}
            onChange={handleSpecializationChanges}
            key={index}
            control={
              <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }} />
            }
            label={<span style={{ fontSize: 16 }}>{name}</span>}
          />
        ));
      default:
        return speacializationNames?.map((name, index) => (
          <FormControlLabel
            name={name}
            checked={
              filters.specializations.length !== 0 &&
              filters.specializations.includes(name.toLowerCase())
            }
            disabled={filters.type === "Others" || (!filters.type && true)}
            onChange={handleSpecializationChanges}
            key={index}
            control={
              <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }} />
            }
            label={<span style={{ fontSize: 16 }}>{name}</span>}
          />
        ));
    }
  };

  const value = {
    loading,
    setLoading,
    allDocData,
    setAllDocData,
    filteredDoctors,
    setFilteredDoctors,
    docsBySearch,
    setDocsBySearch,
    allDocsBySearch,
    setAllDocsBySearch,
    emptyResults,
    setEmptyResults,
    passedSpecialization,
    filters,
    setFilters,
    selectedFilter,
    setSelectedFilter,
    // functions
    handleTypeChanges,
    handleSpecializationChanges,
    handleGenderChanges,
    getAllDoctorsData,
    handlePassedSpecialization,
    handleExpChange,
    handleExpChangeBtn,
    updateDocByPlace,
    handleDocNameSearch,
    getSpecializationOptions,
    types
  };

  return (
    <>
      <SearchDocContext.Provider value={value}>
        {children}
      </SearchDocContext.Provider>
    </>
  );
}
