import axios from "axios";
import { React, useEffect, useState } from "react";
import { createContext } from "react";
import { port } from "../config";
import { toast } from "react-toastify";

export const MyContext = createContext();

export default function Contexts({ children }) {
  const [Data, setData] = useState({});
  const [HospitalAdminRg, setHospitalAdminRg] = useState({});
  const [LabAdminRg, setLabAdminRg] = useState({});
  const [editDoc, seteditDoc] = useState({});
  const [Categories, setCategories] = useState({});
  const [editHos, seteditHos] = useState({});
  const [passedSpecialization, setPassedSpecialization] = useState("");
  const [passedType, setPassedType] = useState("");
  const [speed, setSpeed] = useState(null);
  const value = {
    Data,
    setData,
    HospitalAdminRg,
    setHospitalAdminRg,
    passedSpecialization,
    LabAdminRg,
    setLabAdminRg,
    setPassedSpecialization,
    passedType,
    setPassedType,
    editDoc,
    seteditDoc,
    editHos,
    seteditHos,
    Categories,
    setCategories,
  };

  // const fetchAllMedicalCategories = async () => {
  //   const startTime = Date.now();
  //   try {
  //     const response = await axios.get(`${port}/admin/getallcategories`);
  //     const endTime = Date.now();
  //     const timeTaken = endTime - startTime;
  //     setSpeed(timeTaken);
  //     const fullCategories = response?.data;
  //     setCategories(fullCategories);
  //   } catch (err) {
  //     toast.error(err.message);
  //     console.error(err);
  //   } finally {
  //   }
  // };
  useEffect(() => {
    // fetchAllMedicalCategories(); //commented for new db
  }, []);


  return (
    <>
      <MyContext.Provider value={value}>{children}</MyContext.Provider>
    </>
  );
}
