import React from "react";
import { useNavigate } from "react-router-dom";

function ClickableNavigationIcon({ icon, navigateTo }) {
  const navigate = useNavigate();
  return (
    <div
    onClick={() => navigate(`/${navigateTo || ''}`)}
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F2F5FF",
        cursor: "pointer",
      }}
    >
      <i className={icon} style={{ fontWeight: "300" }}></i>
    </div>
  );
}

export default ClickableNavigationIcon;
