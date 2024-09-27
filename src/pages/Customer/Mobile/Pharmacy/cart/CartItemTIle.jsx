import React from "react";
import "./cart.css";
import { IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import CartControl from "../Category/CartControl";

export default function CartItemTile({
  product,
  isSelected,
  handleSelect,
  isLoading,
}) {
  console.log(product);
  return (
    <div
      className={`cart_item_tile ${isSelected ? "selected" : ""}`}
      onClick={handleSelect}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <div className="product_image_wrap2">
        <img src={product?.images?.image1} alt={product?.product_id} />
      </div>
      <div className="">
        <h3 className="product_name">{product?.product_name}</h3>
        <p className="product_price">₹ {product?.mrp}</p>
      </div>
      <div className="count_controls" onClick={(e) => e.stopPropagation()}>
        <CartControl isLoading={isLoading} product={product} />
      </div>
    </div>
  );
}
