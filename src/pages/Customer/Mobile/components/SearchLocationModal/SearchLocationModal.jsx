import React from "react";
import "./searchlocationmodal.css";
import { Modal } from "@mui/material";

function SearchLocationModal({isOpen,setOpen}) {
  return (
    <>
      <Modal open={isOpen} onClose={() => setOpen(false)}>
        <div className="setlocationmodal">
          <div className="searchmoblocation">
            <input type="text" placeholder="Search Location" maxLength={40}></input>
            <i class="ri-search-2-line searchmoblocationi"></i>
          </div>
          <button>
            <i class="ri-focus-3-line"></i> Auto Detect location
          </button>

          <div className="avilablelocation">
            <h3>Recent Locations</h3>
            <div className="flex">
              <i class="ri-map-pin-line"></i> <h4>Kozikode</h4>
            </div>
            <div className="flex">
              <i class="ri-map-pin-line"></i> <h4>Kannur</h4>
            </div>
            <div className="flex">
              <i class="ri-map-pin-line"></i> <h4>Malapuram</h4>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default SearchLocationModal;
