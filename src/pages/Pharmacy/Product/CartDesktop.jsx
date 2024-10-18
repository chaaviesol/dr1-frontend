import React, { useState } from "react";

import CartItemTile from "../../Customer/Mobile/Pharmacy/cart/CartItemTIle";
import Footer from "../../../components/Footer";
import styles from "./styles.module.css";
import Navbar from "../../../components/Navbar";
import "./cartDesktop.css";
import { usePharmacyContext } from "../../../contexts/PharmacyContext";
import { Loader } from "../../../components/Loader/Loader";
import { toast } from "react-toastify";
import Headroom from "react-headroom";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";

export default function CartDesktop({
  selectedItemId,
  handleCheckout,
  totalPrice,
  handleSelect,
  orderPending,
}) {
  const { cartItems, isCartLoading } = usePharmacyContext();
  const [details, setDetails] = useState({
    delivery_details: "",
    contact_no: "",
    pincode: "",
  });
  console.log({ details });
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const navigate = useNavigate();

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    if (name === "contact_no") {
      const sanitizedValue = value.replace(/[.-]/g, "");
      const truncatedValue = sanitizedValue.slice(0, 10);
      setDetails({ ...details, [name]: truncatedValue });
    } else if (name === "pincode") {
      const sanitizedValue = value.replace(/[.-]/g, "");
      const truncatedValue = sanitizedValue.slice(0, 6);
      setDetails({ ...details, [name]: truncatedValue });
    } else {
      setDetails((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const HandleOnclick = async (e) => {
    if (!details.contact_no) {
      toast.error("Contact Number is missing");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(details.contact_no)) {
      toast.error(
        "Invalid Contact Number. It should be a valid 10-digit number."
      );
      return;
    }
    if (!details.delivery_details || details.delivery_details === "") {
      toast.error("Delivery details is missing");
      return;
    }
    if (!details.pincode) {
      toast.error("Pincode is missing");
      return false;
    }

    const pincodeLength = details.pincode.toString().length;
    if (!details.pincode) {
      toast.error("Pincode is missing");
      return false;
    }
    if (pincodeLength !== 6) {
      toast.error("Pincode must be 6 digits long");
      return false;
    }

    handleCheckout(details);
  };

  const handleKeyPress = (event) => {
    // Check if the pressed key is '.' or '-'
    if (
      event?.key === "." ||
      event?.key === "-" ||
      event?.key === "e" ||
      event?.key === "+" ||
      event?.key === "E"
    ) {
      // Prevent the default behavior for these keys
      event.preventDefault();
    }
  };

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
                // onClick={handleCheckout}
                onClick={() => setIsModalOpen2(!isModalOpen2)}
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
      <Modal open={isModalOpen2} onClose={() => setIsModalOpen2(false)}>
        <div className="checkoutmodal">
          <h2 className="checkoutmodalhead">Complete Your Order</h2>
          <div
            className="flex"
            style={{ justifyContent: "space-between", gap: "10px" }}
          >
            <div className="checkoutmodalcontact">
              <h4>Contact Number</h4>
              <input
                onChange={handleOnchange}
                type="number"
                name="contact_no"
                value={details?.contact_no}
                onKeyDown={handleKeyPress}
                maxLength={10}
                placeholder="Enter Your Contact Number "
              />
            </div>
            <div className="checkoutmodalcontact">
              <h4>Pincode</h4>
              <input
                onChange={handleOnchange}
                onKeyDown={handleKeyPress}
                type="number"
                name="pincode"
                value={details?.pincode}
                maxLength={6}
                placeholder="Enter Your Pincode "
              />
            </div>
          </div>

          <div className="checkoutmodaladdress">
            <div className="flex checkoutmodaladdressget">
              <h4>Address</h4>
              <button>
                {" "}
                <i class="ri-map-pin-line"></i> Get Current Address
              </button>
            </div>
            <textarea
              onChange={handleOnchange}
              value={details?.delivery_details}
              name="delivery_details"
              maxLength={100}
              placeholder="Enter Delivery Address"
            ></textarea>
            <p className="codcheckout">Cash On Delivery</p>
          </div>

          <div className="checkoutmodalbutton flex">
            <button
              onClick={() => {
                setIsModalOpen2(false);
                setDetails({
                  contact_no: "",
                  delivery_details: "",
                  pincode: "",
                });
              }}
            >
              Cancel
            </button>
            <button onClick={HandleOnclick}>Place Order</button>
          </div>
        </div>
      </Modal>
    </>
  );
}
