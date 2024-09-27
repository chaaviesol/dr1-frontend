import React, { useState } from "react";
import CartItemTile from "./CartItemTIle";
import "./cart.css";

import { useNavigate } from "react-router-dom";
import { usePharmacyContext } from "../../../../../contexts/PharmacyContext";
import { Loader } from "../../../../../components/Loader/Loader";
import CartTopbarWithBackButton from "../../../../../components/CartTopbarWithBackButton";

export default function Cart({
  selectedItemId,
  handleCheckout,
  totalPrice,
  handleSelect,
  orderPending,
}) {
  const { cartItems, isCartLoading } = usePharmacyContext();
  const navigate = useNavigate();
  if (cartItems && cartItems.length === 0) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          padding: "1rem",
          // justifyContent: "center",
          // alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          className="backbuttonsecondopinion"
          style={{ backgroundColor: "#f3f3f8", color: "black" }}
          onClick={() => navigate(-1)}
        >
          <i class="ri-arrow-left-line"></i>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <img
            style={{ objectFit: "contain", height: "200px", width: "200px" }}
            src="/images/mobile/empty-cart.png"
            alt=""
          />
          <p>Your cart is empty!!</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="cart" style={{ overflow: "hidden" }}>
        <CartTopbarWithBackButton />
        {isCartLoading && <Loader />}
        <div style={{ height: "70vh", overflow: "auto"}}>
          {cartItems &&
            cartItems.length > 0 &&
            cartItems.map((ele) => (
              <CartItemTile
                key={ele.product_id}
                product={ele}
                isSelected={ele.product_id === selectedItemId}
                handleSelect={() => handleSelect(ele.product_id)}
              />
            ))}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <div className="cart_footer">
          <div className="footer_content">
            <div className="footer_item_count">
              <p className="footer_item_count">
                {" "}
                {cartItems && (cartItems.length || 0)} Items in the cart
              </p>
              <span className="footer_total_price"> ₹ {totalPrice()}</span>
            </div>
            <button
              disabled={isCartLoading === true || orderPending === true}
              onClick={handleCheckout}
              style={{ WebkitTapHighlightColor: "transparent" }}
              className="checkout_button"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
