import React from "react";

function RoundedCart() {
  return (
    <div
      style={{
        backgroundColor: "#F2F5FF",
        borderRadius: "50%",
        padding: "1rem",
        height: "100%",
        width: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <i className="ri-shopping-cart-line"></i>
    </div>
  );
}

export default RoundedCart;
