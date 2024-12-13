import { CircularProgress } from "@mui/material";
import React, { useEffect, useRef } from "react";
import styles from "./useCurrentLocation.module.css";
import useCurrentLocation from "./useCurrentLocation"; // Import the custom hook

function UseCurrentLocationButton({ onLocationFetched }) {
  const { gettingLocationLoading, getCurrentLocation, location } =
    useCurrentLocation();
    const hasFetchedLocation = useRef(false);
  // If the location is fetched, pass it to the parent component (if needed)
  useEffect(() => {
    if (location.state && !hasFetchedLocation.current) {
      hasFetchedLocation.current = true;
      onLocationFetched(location); // Call the callback when location is fetched
    }
  }, [location, onLocationFetched]);

  return (
    <>
      <button
        className={styles.container}
        onClick={getCurrentLocation}
        disabled={gettingLocationLoading} // Disable button if loading
        style={{ width: "180px" }}
      >
        {gettingLocationLoading ? ( // Show CircularProgress while loading
          <CircularProgress size="1.5rem" sx={{ color: "white" }} />
        ) : (
          <>
            <i className="ri-map-pin-line"></i> Use my current location
          </>
        )}
      </button>
    </>
  );
}

export default UseCurrentLocationButton;
