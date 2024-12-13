import { useState } from "react";
import axios from "axios";
import { PHARMACY_URL } from "../config";

function useCurrentLocation() {
  const [gettingLocationLoading, setGettingLocationLoading] = useState(false);
  const [location, setLocation] = useState({ lat: null, lng: null });

  // Fetch location details from your API
  const fetchLocation = async (lat, lng) => {
    try {
      setGettingLocationLoading(true);
      const response = await axios.post(
        `${PHARMACY_URL}/googlemap/getcurrentlocation`,
        {
          lat,
          lng,
        }
      );
      console.log(response.data);
      setLocation(response.data);
      return response.data;
    } catch (err) {
      console.error("Error fetching location:", err);
    } finally {
      setGettingLocationLoading(false);
    }
  };

  // Get user's current position using the Geolocation API
  const getCurrentLocation = () => {
    setGettingLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      alert("Geolocation is not supported by this browser.");
      setGettingLocationLoading(false);
    }
  };

  const success = (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    fetchLocation(lat, lng);
  };

  const error = () => {
    alert("Unable to retrieve your location.");
    setGettingLocationLoading(false);
  };

  return {
    gettingLocationLoading,
    getCurrentLocation,
    location, // Return the location data
  };
}

export default useCurrentLocation;
