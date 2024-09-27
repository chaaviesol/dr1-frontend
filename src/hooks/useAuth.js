import { useContext } from "react";
import { AuthContext } from "../contexts/Auth/AuthProvider";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
