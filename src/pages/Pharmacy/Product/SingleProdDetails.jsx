import React, { useEffect, useState } from "react";
import { useIsMobileScreen } from "../../../hooks/useIsMobileScreen";
import { Loader } from "../../../components/Loader/Loader";
import ProductPage from "../../Customer/Mobile/Pharmacy/Product/ProductPage";
import SingleProductDetailsPC from "./SingleProdPc";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { BASE_URL, PHARMACY_URL } from "../../../config";
import { useMutation } from "@tanstack/react-query";
import { usePharmacyContext } from "../../../contexts/PharmacyContext";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function SingleProdDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);
  const { cartItems, setCartItems, refetchCart } = usePharmacyContext();
  const { auth } = useAuth();
  const isMobile = useIsMobileScreen();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const product = location?.state?.clickedProductDetails;
  useEffect(() => {
    if (isMobile !== undefined) {
      setIsLoading(false);
    }
  }, [isMobile]);

  const addTocart = async (payload) => {
    console.log(payload);
    const finalPayload = {
      ...payload,
      prod_id: payload.prodId,
    };
    const response = await axiosPrivate.post(
      `${PHARMACY_URL}/pharmacy/addToCart`,
      finalPayload
    );
    return response.data.data;
  };

  const addTocartMutation = useMutation({
    mutationKey: ["fetchBotCallResultMutation"],
    mutationFn: (data) => addTocart(data),
    onSuccess: () => {
      refetchCart();
    },
    onError: (error) => {
      console.log("popo");
    },
  });

  const handleAddToCart = async (event, prodId) => {
    event.stopPropagation();

    if (auth.userId && auth.userType === "customer") {
      const quantity = 1;
      const data = {
        prodId,
        quantity,
      };
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.product_id === prodId ? { ...item, quantity: 1 } : item
        )
      );
      await addTocartMutation.mutateAsync(data);
    } else {
      setIsShowLoginModal(true);
    }
  };

  const productInCart =
    cartItems &&
    cartItems.length > 0 &&
    cartItems.find((cartItem) => cartItem.product_id === product.id);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {isMobile ? (
        <ProductPage
          handleAddToCart={handleAddToCart}
          productInCart={productInCart}
          product={product}
          isAddingToCart={addTocartMutation.isPending}
        />
      ) : (
        <SingleProductDetailsPC
          handleAddToCart={handleAddToCart}
          productInCart={productInCart}
          product={product}
          isAddingToCart={addTocartMutation.isPending}
          isShowLoginModal={isShowLoginModal}
          setIsShowLoginModal={setIsShowLoginModal}
        />
      )}
    </>
  );
}

export default SingleProdDetails;
