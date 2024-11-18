import React from "react";
import CartItemTile from "./CartItemTIle";
import "./cart.css";

import { useNavigate } from "react-router-dom";
import { usePharmacyContext } from "../../../../../contexts/PharmacyContext";
import { Loader } from "../../../../../components/Loader/Loader";
import { CircularProgress, Modal } from "@mui/material";
import BackButtonWithTitle from "../../../../../components/BackButtonWithTitle";

const CartList=React.memo(({
  selectedItemId,
  handleCheckout,
  totalPrice,
  handleSelect,
  orderPending,
  isModalOpen2,
  setIsModalOpen2,
  details,
  setDetails,
  handleOnchange,
  HandleOnclick,
  handleKeyPress,
  getCurrentLocation,
  fetchLocationMutationPending,
  gettingLocationLoading,
  errors,
  setErrors,
})=> {
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
      <BackButtonWithTitle title="My cart"/>
        {isCartLoading && <Loader />}
        <div style={{ height: "70vh", overflow: "auto" }}>
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
              onClick={() => setIsModalOpen2(!isModalOpen2)}
              style={{ WebkitTapHighlightColor: "transparent" }}
              className="checkout_button"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
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
               {errors.contact_norequired
                ? errors.contact_norequired && (
                    <p
                      style={{ color: "red", fontSize: "0.9rem" }}
                      className="error-message"
                    >
                      {errors.contact_norequired}
                    </p>
                  )
                : errors.contact_no && (
                    <p
                      style={{ color: "red", fontSize: "0.9rem" }}
                      className="error-message"
                    >
                      {errors.contact_no}
                    </p>
                  )}
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
               {errors.pincoderequired
                ? errors.pincoderequired && (
                    <p
                      style={{ color: "red", fontSize: "0.9rem" }}
                      className="error-message"
                    >
                      {errors.pincoderequired}
                    </p>
                  )
                : errors.pincode && (
                    <p
                      style={{ color: "red", fontSize: "0.9rem" }}
                      className="error-message"
                    >
                      {errors.pincode}
                    </p>
                  )}
            </div>
          </div>
          <div
            className="flex"
            style={{ justifyContent: "space-between", gap: "10px" }}
          >
            <div className="checkoutmodalcontact">
            <h4>City</h4>
              <input
                onChange={handleOnchange}
                type="text"
                name="city"
                value={details?.city}
                onKeyDown={handleKeyPress}
                maxLength={40}
                placeholder="Enter Your City "
              />
              {errors.city && (
                <p
                  style={{ color: "red", fontSize: "0.9rem" }}
                  className="error-message"
                >
                  {errors.city}
                </p>
              )}
            </div>
            <div className="checkoutmodalcontact">
              <h4>District</h4>
              <input
                onChange={handleOnchange}
                onKeyDown={handleKeyPress}
                type="text"
                name="district"
                value={details?.district}
                maxLength={30}
                placeholder="Enter Your district "
              />
              {errors.district && (
                <p
                  style={{ color: "red", fontSize: "0.9rem" }}
                  className="error-message"
                >
                  {errors.district}
                </p>
              )}
            </div>
          </div>

          <div className="checkoutmodaladdress">
            <div className="flex checkoutmodaladdressget">
              <h4>Address</h4>
              <button
                onClick={getCurrentLocation}
                disabled={gettingLocationLoading || fetchLocationMutationPending}
                style={{ width: "160px" }}
              >
                {" "}
                {(gettingLocationLoading ||fetchLocationMutationPending) ? (
                  <CircularProgress size="1.5rem" sx={{ color: "white" }} />
                ) : (
                  <>
                    <i className="ri-map-pin-line"></i> Get current location
                  </>
                )}
              </button>
            </div>
            <textarea
              onChange={handleOnchange}
              value={details?.delivery_details}
              name="delivery_details"
              maxLength={100}
              placeholder="Enter Delivery Address"
            ></textarea>
             {errors.delivery_details && (
              <p
                style={{ color: "red", fontSize: "0.9rem" }}
                className="error-message"
              >
                {errors.delivery_details}
              </p>
            )}
            <p className="codcheckout">Cash On Delivery Only</p>
          </div>

          <div className="checkoutmodalbutton flex">
            <button
              onClick={() => {
                setErrors("")
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
            <button onClick={HandleOnclick}>Confirm Order</button>
          </div>
        </div>
      </Modal>
    </>
  );
})
export default CartList