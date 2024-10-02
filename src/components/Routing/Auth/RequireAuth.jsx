import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const RequireAuth = ({ allowedRoles }) => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.post("/auth/accesstoken");
        const { userId, userType } = response.data;
        setAuth({
          userId,
          userType,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [location]);
  if (!isLoading) {
    return auth?.userType === allowedRoles[0] ? (
      <Outlet />
    ) : auth?.userId ? (
      // <Outlet />
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
      // <Outlet />
    );
  }
};

export default RequireAuth;
