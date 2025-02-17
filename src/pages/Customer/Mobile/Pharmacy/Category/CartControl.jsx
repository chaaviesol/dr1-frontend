import React, { useState } from "react";
import "./CartControl.css"; // Import the CSS file
import { useTabBarContext } from "../../../../../contexts/MobileScreen/TabBarProvider";
import { Add, Remove } from "@mui/icons-material";
import { usePharmacyContext } from "../../../../../contexts/PharmacyContext";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { BASE_URL, PHARMACY_URL } from "../../../../../config";
import { useMutation } from "@tanstack/react-query";
import { debounce } from "lodash";

const CartControl = React.memo(({ product, isLoading }) => {
  const { cartItems, setCartItems, refetchCart } = usePharmacyContext();
  const productId = product.product_id;
  const axiosPrivate = useAxiosPrivate();

  // const addTocart = async (id) => {
  //   const finalPayload = {
  //     quantity: product.quantity,
  //     prod_id: id,
  //   };
  //   const response = await axiosPrivate.post(
  //     `${PHARMACY_URL}/pharmacy/addToCart`,
  //     finalPayload
  //   );
  //   return response.data.data;
  // };

  // const addTocartMutation = useMutation({
  //   mutationKey: ["fetchBotCallResultMutation"],
  //   mutationFn: (id) => addTocart(id),
  //   onSuccess: () => {
      
  //   },
  //   onError: (error) => {
  //     console.log("popo");
  //   },
  // });

  // const removeFromCart = async (id) => {
  //   const payload = { prod_id: id };

  //   const response = await axiosPrivate.post(
  //     `${PHARMACY_URL}/pharmacy/removeFromCart`,
  //     payload
  //   );
  //   return response.data.data;
  // };

  // const removeFromCartMutation = useMutation({
  //   mutationKey: ["fetchBotCallResultMutation"],
  //   mutationFn: (data) => removeFromCart(data),
  //   onSuccess: (data) => {
     
  //   },
  //   onError: (error) => {
  //     console.log("popo");
  //   },
  // });
  const increaseQuantity = () => {};

  // const debouncedUpdateCart = debounce(async (productId) => {
  //   try {
  //     await addTocartMutation.mutateAsync(productId);
  //     console.log("Cart updated successfully");
  //   } catch (error) {
  //     console.error("Failed to update cart:", error);
  //   }
  // }, 500); 

  // const updateCount = async (currentQuantity, variant) => {
  //   if (isLoading) return;
  //   const newQuantity =
  //     variant === "increase"
  //       ? parseInt(currentQuantity) + 1
  //       : parseInt(currentQuantity) - 1;

  //   const currentProductIndex = cartItems.findIndex(
  //     (item) => item.product_id === productId
  //   );

  //   // Proceed only if the product exists in cart
  //   if (currentProductIndex === -1) return;

  //   // Optimistically update cart items in local state
  //   setCartItems((prevCartItems) =>
  //     prevCartItems.map((item) =>
  //       item.product_id === productId
  //         ? { ...item, quantity: newQuantity }
  //         : item
  //     )
  //   );

  //   debouncedUpdateCart(productId);
  // };


  // const decreaseCount = async (currentQuantity) => {
  //   if (isLoading) {
  //     return;
  //   }
  //   if (currentQuantity > 1) {
  //     updateCount(currentQuantity, "decrease");
  //   } else {
  //     setCartItems((prev) =>
  //       prev.filter((ele) => ele.product_id !== productId)
  //     );
  //     try {
  //       await removeFromCartMutation.mutateAsync(productId);
  //       console.log("Cart updated successfully");
  //     } catch (error) {
  //       console.error("Failed to update cart:", error);
        
  //     }
  //   }
  // };

  return (
    <div className="cart-control">
      <button
        disabled={isLoading}
        className="cart-button"
        // onClick={() => decreaseCount(product.quantity)}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <Remove />
      </button>
      <div className="cart-count">{product?.quantity || 0}</div>
      <button
        style={{ WebkitTapHighlightColor: "transparent" }}
        disabled={isLoading}
        className="cart-button"
        // onClick={() => updateCount(product.quantity, "increase")}
      >
        <Add />
      </button>
    </div>
  );
});

export default CartControl;
