import React from "react";
import "./cart.css";
import { IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import CartControl from "../Category/CartControl";

const CartItemTile = React.memo(
  ({ product, isSelected, handleSelect, isLoading }) => {
    return (
      <div
        className={`cart_item_tile ${isSelected ? "selected" : ""}`}
        onClick={handleSelect}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <div className="product_image_wrap2">
          <div className="cartitem_img">
            <img src={product?.images?.image1} alt={product?.product_id} />
          </div>
          <div className="">
            <h3 className="product_name">{product?.product_name}</h3>
            <p className="product_price">₹ {product?.mrp}</p>
          </div>
        </div>
        <div className="count_controls" onClick={(e) => e.stopPropagation()}>
          <CartControl isLoading={isLoading} product={product} />
        </div>
      </div>
    );
  }
);

export default CartItemTile;
