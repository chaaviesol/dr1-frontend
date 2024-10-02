import React from "react";

import { useNavigate } from "react-router-dom";

import { usePharmacyContext } from "../contexts/PharmacyContext";

function CartIcon() {
  const { cartItems} = usePharmacyContext();
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/cart")}
      style={{
        position: "relative",
        height: "50px",
        width: "50px",
        borderRadius: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3f3f8",
        cursor: "pointer",
      }}
    >
      {!cartItems || cartItems.length === 0 ? (
        ""
      ) : (
        <span
          style={{
            position: "absolute",
            top: "-5px", // Adjust as needed
            right: "-7px", // Adjust as needed
            backgroundColor: "green",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "20px",
            width: "20px",
            fontSize: "12px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {cartItems && cartItems.length}
        </span>
      )}
      <i className="ri-shopping-cart-2-line" style={{ fontWeight: "300" }}></i>
    </div>
  );
}

export default CartIcon;
