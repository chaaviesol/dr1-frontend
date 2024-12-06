import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { BASE_URL, PHARMACY_URL } from "../config";

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);

  const [gettingLocationLoading, setGettingLocationLoading] = useState(false);
  const fetchLocation = async (lat, lng) => {
    const response = await axios.post(
      `${PHARMACY_URL}/googlemap/getcurrentlocation`,
      {
        lat,
        lng,
      }
    );
    return response.data;
  };

  const fetchLocationMutation = useMutation({
    mutationKey: ["fetchLocationMutation"],
    mutationFn: ({ lat, lng }) => fetchLocation(lat, lng),
    onMutate: () => setGettingLocationLoading(true),
    onSuccess: (data) => {
      console.log({ data });
      setLocation(data);
      setGettingLocationLoading(false);
    },
    onError: () => setGettingLocationLoading(false),
  });
  // Get user's current position using the Geolocation API
  function getCurrentLocation() {
    setGettingLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      alert("Geolocation is not supported by this browser.");
      setGettingLocationLoading(false);
    }
  }

  function success(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    fetchLocationMutation.mutateAsync({ lat, lng });
  }

  function error() {
    alert("Unable to retrieve your location.");
    setGettingLocationLoading(false);
  }
  const values = {
    location,
    fetchingLocationPending:
      gettingLocationLoading || fetchLocationMutation.isPending,
    getCurrentLocation,
  };
  return (
    <LocationContext.Provider value={values}>
      {children}
    </LocationContext.Provider>
  );
};
export default LocationProvider;
export const useLocationContext = () => useContext(LocationContext);
