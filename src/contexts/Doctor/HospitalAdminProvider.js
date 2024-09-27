import { React, useState,createContext } from "react";


export const HospitalAdminContext = createContext();
const HospitalAdminProvider = ({ children }) => {
  const [selectedDoc, setSelectedDoc] = useState({});
  const value = {
    selectedDoc,
    setSelectedDoc,
  };
  return (
    <HospitalAdminContext.Provider value={value}>
      {children}
    </HospitalAdminContext.Provider>
  );
};

export default HospitalAdminProvider;
