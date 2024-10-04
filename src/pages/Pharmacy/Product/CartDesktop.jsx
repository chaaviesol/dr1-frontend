import React from "react";

import CartItemTile from "../../Customer/Mobile/Pharmacy/cart/CartItemTIle";
import Footer from "../../../components/Footer";
import styles from "./styles.module.css";
import Navbar from "../../../components/Navbar";

import { usePharmacyContext } from "../../../contexts/PharmacyContext";
import { Loader } from "../../../components/Loader/Loader";
import CartTopbarWithBackButton from "../../../components/CartTopbarWithBackButton";
import Headroom from "react-headroom";
import { useNavigate } from "react-router-dom";

export default function CartDesktop({
  selectedItemId,
  handleCheckout,
  totalPrice,
  handleSelect,
  orderPending,
}) {
  const { cartItems, isCartLoading } = usePharmacyContext();

  const navigate = useNavigate();

  if (cartItems?.length === 0) {
    return (
      <>
        <Navbar />
        <div
          style={{
            height: "88vh",
            display: "flex",
            padding: "1rem",
            flexDirection: "column",
          }}
        >
          <div style={{ paddingLeft: "7rem", paddingRight: "7rem" }}>
            <div
              className="pharamacyproductstopbar"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <div
                className="backbuttoncarttop"
                style={{
                  backgroundColor: "#f3f3f8",
                  color: "black",
                  cursor: "pointer",
                }}
                onClick={() => navigate(-1)}
              >
                <i class="ri-arrow-left-line"></i>
              </div>
              <div>Cart</div>
            </div>
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
      </>
    );
  }
  return (
    <>
      <Headroom>
        <Navbar />
      </Headroom>
      {isCartLoading && <Loader />}
      <div className="cart" style={{ padding: "2rem 6rem" }}>
        <div style={{ padding: "0rem 2rem" }}>
          <div
            className="pharamacyproductstopbar"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <div
              className="backbuttoncarttop"
              style={{
                backgroundColor: "#f3f3f8",
                color: "black",
                cursor: "pointer",
              }}
              onClick={() => navigate(-1)}
            >
              <i class="ri-arrow-left-line"></i>
            </div>
            <div>Cart</div>
          </div>
        </div>
        <div className={styles.cartItemTileWrapper}>
          {cartItems &&
            cartItems.length > 0 &&
            cartItems.map((ele) => (
              <div key={ele.id} className={styles.productTile}>
                <CartItemTile
                  key={ele.product_id}
                  product={ele}
                  isSelected={ele.product_id === selectedItemId}
                  handleSelect={() => handleSelect(ele.product_id)}
                />
              </div>
            ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "2rem",
          }}
        >
          <div className={styles.cartDesktop}>
            <div className="footer_content">
              <div
                className="footer_item_count"
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <p className="footer_item_count">
                  {cartItems && (cartItems.length || 0)} Items in the cart
                </p>
                <span className="footer_total_price"> ₹ {totalPrice()}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="checkout_button"
                disabled={isCartLoading === true || orderPending === true}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
