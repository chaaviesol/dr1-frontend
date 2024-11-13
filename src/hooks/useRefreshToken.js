import axios from "../api/PrivateAxios/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth} = useAuth();
  const refreshToken = sessionStorage.getItem("refreshToken");

  const headers = {
    Authorization: `Bearer ${refreshToken}`,
  };
  const refresh = async () => {
    const response = await axios.post("/auth/refreshtoken", null, {
      headers,
    });
    console.log(response);
    const accessToken = response.data.accessToken;
    sessionStorage.setItem("accessToken", accessToken);
    setAuth((prev) => {
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
