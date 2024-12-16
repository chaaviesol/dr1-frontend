import { React, createContext, useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ userId: "", userType: "" });
  const [isLoading, setIsLoading] = useState(false); //validating token
  const axiosPrivate = useAxiosPrivate();
  const accessToken = sessionStorage.getItem("accessToken");

  const validateAccessToken = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPrivate.post("/auth/accesstoken");
      const user = response.data;
      setAuth({
        userId: user.userId,
        userType: user.userType,
      });
    } catch (err) {
      authLogout(); // Log out if there's an error validating the token
      toast.error("Session expired please login")
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      validateAccessToken();
    }
  }, []);

  const authLogout = () => {
    setAuth({});
    sessionStorage.removeItem("accessToken"); //remove both tokens
    sessionStorage.removeItem("refreshToken");
  };
  // console.log("auth context =>", auth);
  return (
    <AuthContext.Provider value={{ auth, setAuth, authLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
