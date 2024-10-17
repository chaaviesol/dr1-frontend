import React from "react";
import { useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";

function CartTopbarWithBackButton() {
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
        <CartIcon />
      </div>
    </>
  );
}

export default CartTopbarWithBackButton;
