import React, { useEffect, useState } from "react";
import { useIsMobileScreen } from "../../../hooks/useIsMobileScreen";
import CartList from "../../../pages/Customer/Mobile/Pharmacy/cart/CartList";
import { Loader } from "../../../components/Loader/Loader";
import CartDesktop from "./CartDesktop";
import { BASE_URL } from "../../../config";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { usePharmacyContext } from "../../../contexts/PharmacyContext";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

function Cart() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const isMobile = useIsMobileScreen();
  const { cartItems,  refetchCart } =
    usePharmacyContext();
  const { auth } = useAuth();
  const { userId, userType } = auth;
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    if (isMobile !== undefined) {
      setIsLoading(false);
    }
  }, [isMobile]);

  const handleSelect = (id) => {
    setSelectedItemId(id);
  };

  const totalPrice = () => {
    if (cartItems && cartItems.length > 0) {
      const totalMRP = cartItems.reduce((accumulator, product) => {
        return (accumulator + product.mrp) * product.quantity;
      }, 0);
      return totalMRP;
    } else {
      return 0;
    }
  };

  console.log(cartItems);

  const placeOrder = async () => {
    const payload = {
      order_type: "salesorder",
      products: cartItems,
      total_amount: totalPrice(),
    };

    const response = await axiosPrivate.post(
      `${BASE_URL}/pharmacy/salesorder`,
      payload
    );
    return response;
  };

  const placeOrderMutation = useMutation({
    mutationKey: ["placeOrder", userId],
    mutationFn: () => placeOrder(),
    onSuccess: (res) => {
      toast.success(res.data.message);
      refetchCart();
      navigate(-1);
    },
  });
  const handleCheckout = async () => {
    if (!userId && userType !== "customer") {
      toast.info("Please login as a customer!");
      return;
    }

    try {
      await placeOrderMutation.mutateAsync();
    } catch (err) {
      toast.error("Error in order placing");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const cartProps = {
    selectedItemId,
    handleCheckout,
    totalPrice,
    handleSelect,
    orderPending: placeOrderMutation.isPending,
  };

  return (
    <>
      {isMobile ? <CartList {...cartProps} /> : <CartDesktop {...cartProps} />}
    </>
  );
}

export default Cart;
