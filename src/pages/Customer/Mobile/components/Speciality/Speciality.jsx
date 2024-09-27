import React from "react";

function Speciality({ text }) {
  return (
    <div
      style={{
        borderRadius: "18px",
        width: "fit-content",
        color: "white",
        padding: "10px 15px 10px 15px",
        border: "1px solid white",
      }}
    >
      {text}
    </div>
  );
}

export default Speciality;
