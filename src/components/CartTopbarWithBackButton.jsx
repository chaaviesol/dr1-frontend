import React from "react";
import { useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";

function CartTopbarWithBackButton({ hideIcon }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="pharamacyproductstopbar"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <div
          className="backbuttonsecondopinion"
          style={{
            backgroundColor: "#f3f3f8",
            color: "black",
            cursor: "pointer",
          }}
          onClick={() => navigate(-1)}
        >
          <i className="ri-arrow-left-line"></i>
        </div>
        {!hideIcon && (
          <div style={{ height: "50px", width: "50px" }}>
            <CartIcon />{" "}
          </div>
        )}
      </div>
    </>
  );
}

export default CartTopbarWithBackButton;
