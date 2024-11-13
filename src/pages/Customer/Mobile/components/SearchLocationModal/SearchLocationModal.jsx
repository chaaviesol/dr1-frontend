import React, { useEffect, useState } from "react";
import "./searchlocationmodal.css";
import { Modal } from "@mui/material";
import { useLocationContext } from "../../../../../contexts/LocationContext";
import axios from "axios";
import { BASE_URL } from "../../../../../config";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";

const fetchPlaces = async (searchTerm) => {
  const response = await axios.post(`${BASE_URL}/googlemap/searchlocation`, {
    query: searchTerm,
  });
  return response.data || [];
};

function SearchLocationModal({ isOpen, setOpen }) {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { getCurrentLocation, fetchingLocationPending } = useLocationContext();

  const close = () => {
    setOpen(false);
    clearSearchInput();
  };

  const debouncedSearch = debounce((value) => {
    setSearchTerm(value);
  }, 300);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["fetchPlaces", searchTerm],
    queryFn: () => fetchPlaces(searchTerm),
    enabled: !!searchTerm && searchTerm?.length > 2,
  });
  useEffect(() => {
    if (data?.data?.length > 0) {
      setSuggestions(data.data);
    } else if (data?.data?.length === 0 && suggestions.length > 0) {
      setSuggestions([]);
    }
  }, [data, suggestions.length]);

  const handleSearchLocation = (event) => {
    const value = event.target.value;
    // Set the input value and initiate the search
    setInputValue(value);
    if (value.length < 3) {
      if (suggestions.length > 0) setSuggestions([]);
    } else {
      debouncedSearch(value);
    }
  };

  //clear search inputs
  const clearSearchInput = () => {
    setSearchTerm("");
    setInputValue("");
    setSuggestions([]);
  };

  return (
    <Modal open={isOpen} onClose={close}>
      <div
        className="setlocationmodal"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <div className="searchmoblocation">
          <input
            type="text"
            onChange={handleSearchLocation}
            placeholder="Search Location"
            maxLength={40}
            value={inputValue}
          ></input>
          <i className="ri-search-2-line searchmoblocationi"></i>
          {inputValue && (
            <i
              onClick={clearSearchInput}
              className="ri-close-line searchmoblocationicross"
            ></i>
          )}
        </div>
        {inputValue.length > 2 && suggestions && suggestions.length > 0 && (
          <div className="searchlocationsuggestionscontainer">
            {suggestions.map((data, index) => (
              <div
                key={index}
                className="searchlocationsuggestionplaces"
                onClick={close}
              >
                <i className="ri-map-pin-line"></i> <h3>{data?.description}</h3>
              </div>
            ))}
          </div>
        )}
        {!inputValue && (
          <div>
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
        )}
      </div>
    </Modal>
  );
}

export default SearchLocationModal;
