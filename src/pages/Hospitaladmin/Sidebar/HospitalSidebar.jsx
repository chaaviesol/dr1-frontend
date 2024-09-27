import React from "react";

function HospitalSidebar({ data: { SentData, selected } }) {
  const FindButtonValue = (data) => {
    SentData(data);
  };
  return (
    <div className="mainadminsidebar">
      <div
        onClick={() => {
          FindButtonValue("overview");
        }}
        className={
          selected?.overview
            ? "admimmenuicon admimmenuicon2 flex"
            : "admimmenuicon flex"
        }
      >
        <i class="ri-file-chart-fill"></i>
        <h4>Overview</h4>
      </div>

      <div
        onClick={() => {
          FindButtonValue("doctor");
        }}
        className={
          (selected?.doctor || selected?.manageDoc)
            ? "admimmenuicon admimmenuicon2 flex"
            : "admimmenuicon flex"
        }
      >
        <i class="fi fi-sr-stethoscope"></i>
        <h4>Doctor</h4>
      </div>
      <div
        onClick={() => {
          FindButtonValue("viewers");
        }}
        className={
          selected?.viewers
            ? "admimmenuicon admimmenuicon2 flex"
            : "admimmenuicon flex"
        }
      >
        <i class="fi fi-sr-users-alt"></i>
        <h4>Viewers</h4>
      </div>
      <div
        onClick={() => {
          FindButtonValue("feedbacks");
        }}
        className={
          selected?.feedbacks
            ? "admimmenuicon admimmenuicon2 flex"
            : "admimmenuicon flex"
        }
      >
        <i class="fi fi-sr-hospital"></i>
        <h4>Feedback</h4>
      </div>
    </div>
  );
}

export default HospitalSidebar;
