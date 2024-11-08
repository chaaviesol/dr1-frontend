import React from "react";
import "./searchlocationmodal.css";
import { Modal } from "@mui/material";
import { useLocationContext } from "../../../../../contexts/LocationContext";

function SearchLocationModal({ isOpen, setOpen }) {
  const { location, getCurrentLocation, fetchingLocationPending } =
    useLocationContext();
  return (
    <>
      <Modal open={isOpen} onClose={() => setOpen(false)}>
        <div className="setlocationmodal">
          <div className="searchmoblocation">
            <input
              type="text"
              placeholder="Search Location"
              maxLength={40}
            ></input>
            <i className="ri-search-2-line searchmoblocationi"></i>
          </div>
          <button
            className="use-currentlocation-btn"
            onClick={getCurrentLocation}
            disabled={fetchingLocationPending}
          >
            <i
              className={`ri-focus-3-line ${
                fetchingLocationPending ? "blinking" : ""
              }`}
            ></i>
            {fetchingLocationPending
              ? "Fetching location..."
              : "Use Current Location"}
          </button>

          <div className="avilablelocation">
            <h3>Recent Locations</h3>
            <div className="flex">
              <i className="ri-map-pin-line"></i> <h4>Kozikode</h4>
            </div>
            <div className="flex">
              <i className="ri-map-pin-line"></i> <h4>Kannur</h4>
            </div>
            <div className="flex">
              <i className="ri-map-pin-line"></i> <h4>Malapuram</h4>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default SearchLocationModal;
