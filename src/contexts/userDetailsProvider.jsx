import { createContext, useContext, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { PHARMACY_URL } from "../config";

export const UserDetailsContext = createContext();

const UserDetailsProvider = ({ children }) => {
  const [customerDetails, setCustomerDetails] = useState();

  const axiosPrivate = useAxiosPrivate();
  const fetchCustomerDetails = async () => {
    try {
      const response = await axiosPrivate.post(
        `${PHARMACY_URL}/user/getprofile`
      );
      console.log({response})
      setCustomerDetails(response)
    } catch (err) {
      console.error("Error fetching details:", err);
    } finally {
    }
  };

  console.log(customerDetails)

  return (
    <UserDetailsContext.Provider value={{fetchCustomerDetails,customerDetails}}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export default UserDetailsProvider;

export const useUserDetails = () => useContext(UserDetailsContext);
