import React from "react";
import { useNavigate } from "react-router-dom";

function BackButtonWithTitle({ title }) {
  const navigate = useNavigate();
  const handleNavigate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(-1);
  };
  return (
    <>
      <div
        className="pharamacyproductstopbar"
        style={{
          WebkitTapHighlightColor: "transparent",
          justifyContent: "flex-start",
        }}
      >
        <div
          className="backbuttonsecondopinion"
          style={{
            backgroundColor: "#f3f3f8",
            color: "black",
            cursor: "pointer",
          }}
          onClick={handleNavigate}
        >
          <i className="ri-arrow-left-line"></i>
        </div>
        <div>{title || "Title"}</div>
      </div>
    </>
  );
}

export default BackButtonWithTitle;
