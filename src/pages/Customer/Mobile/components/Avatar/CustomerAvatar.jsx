import React from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { BASE_URL, PHARMACY_URL } from "../../../../../config";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../../hooks/useAuth";
import { CircularProgress } from "@mui/material";

function CustomerAvatar({ image }) {
  const tempImg = "./images/man.jpg";
  const navigate = useNavigate();
  const { auth, isLoading } = useAuth();
  const { userId, userType } = auth;
  const axiosPrivate = useAxiosPrivate();

  const fetchUserProfileDetails = async (userId) => {
    const payload = { id: userId };
    const response = await axiosPrivate.post(
      `${PHARMACY_URL}/user/getprofile`,
      payload
    );
    return response.data;
  };

  const { data: userProfile } = useQuery({
    queryKey: ["fetchUserProfileDetails", userId],
    queryFn: async () => {
      const data = await fetchUserProfileDetails(userId);
      return data.userDetails;
    },
    enabled: !!userId && userType === "customer",
  });

  return (
    <>
      <img
        // onClick={() => navigate("/profile")}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "50%",
          objectFit: "cover",
        }}
        src={
          isLoading === true || !userProfile?.image
            ? "/images/newavatar.jpg"
            : userProfile?.image
        }
        alt=""
      />
    </>
  );
}

export default CustomerAvatar;
